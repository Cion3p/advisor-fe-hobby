'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Users, 
  PhoneCall, 
  Mail, 
  Clock, 
  Layers, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  RefreshCw,
  ExternalLink,
  PlusCircle,
  Edit3,
  Trash2,
  Download,
  X,
  FileText,
  Save,
  DollarSign,
  Tag,
  Calendar,
  Sparkles
} from 'lucide-react';
import { 
  fetchLeadsAPI, 
  updateLeadStatusAPI, 
  fetchAdminStatsAPI, 
  fetchProducts,
  createProductAPI, 
  updateProductAPI, 
  deleteProductAPI,
  FALLBACK_PRODUCTS 
} from '@/lib/api';
import { Product } from '@/types';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'products'>('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<any>({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    consultingLeads: 0,
    closedLeads: 0,
    totalProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingLeadNote, setEditingLeadNote] = useState<any | null>(null);
  const [agentNoteText, setAgentNoteText] = useState('');

  // New Product Form State
  const [productForm, setProductForm] = useState({
    code: '',
    title: '',
    categoryId: 1,
    companyId: 2,
    summary: '',
    minPremium: 25000,
    minEntryAge: 11,
    maxEntryAge: 75,
    premiumPaymentTerm: 'ชำระรายปี',
    coverageTerm: 'ถึงอายุ 99 ปี',
    isTaxDeductible: true,
    maxTaxDeduction: 25000,
    isFeatured: false,
    highlightPoint1: 'คุ้มครองค่ารักษาพยาบาลเหมาจ่ายตามจริง',
    highlightPoint2: 'ค่าห้องเดี่ยวมาตรฐานทุกโรงพยาบาล',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, statsData, productsData] = await Promise.all([
        fetchLeadsAPI(filterStatus === 'ALL' ? undefined : filterStatus),
        fetchAdminStatsAPI(),
        fetchProducts(),
      ]);
      setLeads(leadsData);
      setStats(statsData);
      setProducts(productsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterStatus]);

  // Lead Status Change
  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      await updateLeadStatusAPI(leadId, newStatus);
      setLeads((prev) =>
        prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
      );
      const updatedStats = await fetchAdminStatsAPI();
      setStats(updatedStats);
    } catch (e) {
      console.error('Failed to update status', e);
    }
  };

  // Save Agent Lead Note
  const handleSaveLeadNote = async () => {
    if (!editingLeadNote) return;
    try {
      await updateLeadStatusAPI(editingLeadNote.id, editingLeadNote.status, agentNoteText);
      setLeads((prev) =>
        prev.map((item) => (item.id === editingLeadNote.id ? { ...item, user_notes: agentNoteText } : item))
      );
      setEditingLeadNote(null);
    } catch (e) {
      console.error('Failed to save note', e);
    }
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'ชื่อลูกค้า', 'เบอร์โทร', 'อีเมล', 'แผนที่สนใจ', 'จังหวัด', 'งบประมาณ', 'เวลาที่สะดวก', 'สถานะ', 'วันที่'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.customer_name || ''}"`,
      `"${l.customer_phone || ''}"`,
      `"${l.customer_email || ''}"`,
      `"${l.product_title || ''}"`,
      `"${l.province || ''}"`,
      `"${l.budget_range || ''}"`,
      `"${l.preferred_contact_time || ''}"`,
      l.status,
      l.created_at || '',
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `modtanoy_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Create Product Submit
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...productForm,
        slug: productForm.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        highlightPoints: [productForm.highlightPoint1, productForm.highlightPoint2].filter(Boolean),
      };
      await createProductAPI(payload);
      setShowAddProductModal(false);
      // Reset form
      setProductForm({
        code: '',
        title: '',
        categoryId: 1,
        companyId: 2,
        summary: '',
        minPremium: 25000,
        minEntryAge: 11,
        maxEntryAge: 75,
        premiumPaymentTerm: 'ชำระรายปี',
        coverageTerm: 'ถึงอายุ 99 ปี',
        isTaxDeductible: true,
        maxTaxDeduction: 25000,
        isFeatured: false,
        highlightPoint1: 'คุ้มครองค่ารักษาพยาบาลเหมาจ่ายตามจริง',
        highlightPoint2: 'ค่าห้องเดี่ยวมาตรฐานทุกโรงพยาบาล',
      });
      loadData();
    } catch (err) {
      console.error(err);
      alert('บันทึกแผนประกันไม่สำเร็จ');
    }
  };

  // Update Product Submit
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      await updateProductAPI(editingProduct.id, {
        title: editingProduct.title,
        summary: editingProduct.summary,
        minPremium: Number(editingProduct.min_premium),
        isTaxDeductible: Boolean(editingProduct.is_tax_deductible),
        maxTaxDeduction: Number(editingProduct.max_tax_deduction),
        isFeatured: Boolean(editingProduct.is_featured),
      });
      setEditingProduct(null);
      loadData();
    } catch (err) {
      console.error(err);
      alert('แก้ไขแผนประกันไม่สำเร็จ');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: number, title: string) => {
    if (!confirm(`คุณต้องการปิดการใช้งาน/ลบแผน "${title}" ใช่หรือไม่?`)) return;
    try {
      await deleteProductAPI(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredLeads = leads.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.customer_name?.toLowerCase().includes(q) ||
      item.customer_phone?.includes(q) ||
      item.product_title?.toLowerCase().includes(q) ||
      item.province?.toLowerCase().includes(q)
    );
  });

  const filteredProducts = products.filter((p) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.code?.toLowerCase().includes(q) ||
      p.company_name?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white mb-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            ModtanoyAdvisor CRM & Backoffice Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ระบบจัดการหลังบ้านและงานที่ปรึกษา
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            ศูนย์รวมข้อมูลลูกค้าขอรับคำปรึกษา การจัดสรรงานตัวแทน และเพิ่ม/ปรับแต่งแผนประกันภัย
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            ส่งออกไฟล์ CSV
          </button>

          <button
            onClick={() => setShowAddProductModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20"
          >
            <PlusCircle className="w-4 h-4" />
            เพิ่มแผนประกันใหม่
          </button>

          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            หน้าแรก
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>คำขอทั้งหมด (Total Leads)</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-3xl font-black text-slate-900">
            {stats.totalLeads}
          </div>
          <p className="text-[11px] text-slate-400">ลูกค้าสนใจแผนประกันและภาษี</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-1.5 bg-gradient-to-br from-white to-amber-50/40">
          <div className="flex items-center justify-between text-amber-800 text-xs font-bold">
            <span>รอดำเนินการติดต่อ (NEW)</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-900">
            {stats.newLeads}
          </div>
          <p className="text-[11px] text-amber-700 font-medium">รอตัวแทนติดต่อกลับด่วน</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-purple-700 text-xs font-bold">
            <span>กำลังให้คำปรึกษา</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-purple-900">
            {stats.consultingLeads + stats.contactedLeads}
          </div>
          <p className="text-[11px] text-purple-600">ตัวแทนอยู่ระหว่างนำเสนอแผน</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-1.5">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-bold">
            <span>แผนประกันที่เปิดใช้งาน</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-900">
            {products.length}
          </div>
          <p className="text-[11px] text-emerald-600">พร้อมเปรียบเทียบบนหน้าเว็บ</p>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-slate-200 gap-8 text-sm font-bold">
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'leads'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4" />
          ติดตามลูกค้าและคำขอคำปรึกษา ({leads.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          จัดการและปรับแต่งแผนประกัน ({products.length})
        </button>
      </div>

      {/* TAB 1: LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6 sm:p-8">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold w-full md:w-auto">
              {[
                { id: 'ALL', label: 'ทั้งหมด' },
                { id: 'NEW', label: 'ใหม่ (NEW)' },
                { id: 'CONTACTED', label: 'ติดต่อแล้ว' },
                { id: 'CONSULTING', label: 'กำลังปรึกษา' },
                { id: 'CLOSED_WON', label: 'ปิดการขาย' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id)}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    filterStatus === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, เบอร์โทร, แผนประกัน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-700 uppercase font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">ลูกค้า / เบอร์ติดต่อ</th>
                  <th className="py-3.5 px-4">แผนประกันที่สนใจ</th>
                  <th className="py-3.5 px-4">งบประมาณ & เวลาสะดวก</th>
                  <th className="py-3.5 px-4">บันทึกที่ปรึกษา (Agent Note)</th>
                  <th className="py-3.5 px-4">สถานะ (คลิกเพื่อเปลี่ยน)</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-900">
                      <div className="font-bold text-sm text-slate-900">{lead.customer_name}</div>
                      <div className="flex items-center gap-1.5 text-slate-600 mt-1">
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        <a href={`tel:${lead.customer_phone}`} className="font-semibold hover:underline text-brand-700">
                          {lead.customer_phone}
                        </a>
                      </div>
                      {lead.customer_email && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {lead.customer_email}
                        </div>
                      )}
                      <div className="text-[10px] text-emerald-600 font-bold mt-1">
                        ✓ ได้รับความยินยอม PDPA
                      </div>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <span className="font-bold text-slate-800 line-clamp-2">
                        {lead.product_title || 'ขอรับคำปรึกษาภาพรวม'}
                      </span>
                      {lead.province && (
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          พื้นที่: {lead.province}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 space-y-1">
                      <div className="text-slate-900 font-semibold">
                        {lead.budget_range || '-'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {lead.preferred_contact_time || 'สะดวกทุกเวลา'}
                      </div>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 group">
                        <p className="text-xs text-slate-700 line-clamp-2">
                          {lead.user_notes || '- ยังไม่มีบันทึก -'}
                        </p>
                        <button
                          onClick={() => {
                            setEditingLeadNote(lead);
                            setAgentNoteText(lead.user_notes || '');
                          }}
                          className="mt-1 text-[11px] text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-1"
                        >
                          <Edit3 className="w-3 h-3" /> แก้ไขบันทึก
                        </button>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:border-orange-500 cursor-pointer shadow-xs"
                      >
                        <option value="NEW">ใหม่ (NEW)</option>
                        <option value="CONTACTED">ติดต่อแล้ว</option>
                        <option value="CONSULTING">กำลังให้คำปรึกษา</option>
                        <option value="CLOSED_WON">ปิดการขายสำเร็จ</option>
                        <option value="CLOSED_LOST">ยุติการติดต่อ</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <a
                        href={`tel:${lead.customer_phone}`}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        โทรหาลูกค้า
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-slate-400">
                      ไม่พบข้อมูลคำขอรับคำปรึกษาที่ตรงกับเงื่อนไข
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                รายการแผนประกันในฐานข้อมูล ({filteredProducts.length})
              </h2>
              <p className="text-xs text-slate-500">
                เพิ่ม แก้ไข ปรับเบี้ยประกันเริ่มต้น หรือสิทธิลดหย่อนภาษี
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                เพิ่มแผนใหม่
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-y border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">ชื่อแผน & รหัส</th>
                  <th className="py-3.5 px-4">บริษัทประกัน</th>
                  <th className="py-3.5 px-4">หมวดหมู่</th>
                  <th className="py-3.5 px-4">เบี้ยเริ่มต้น</th>
                  <th className="py-3.5 px-4">ลดหย่อนภาษี</th>
                  <th className="py-3.5 px-4 text-center">สถานะ</th>
                  <th className="py-3.5 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 font-medium">
                      <div className="font-bold text-sm text-slate-900">{prod.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">รหัส: {prod.code}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-600 font-medium">
                      {prod.company_name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                        {prod.category_name}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900 text-sm">
                      ฿{Number(prod.min_premium).toLocaleString()}
                      <span className="text-[10px] text-slate-400 font-normal"> /ปี</span>
                    </td>
                    <td className="py-4 px-4">
                      {prod.is_tax_deductible ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                          ฿{Number(prod.max_tax_deduction).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                        เปิดแสดงผล
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => setEditingProduct(prod)}
                        className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                        title="แก้ไขแผนประกัน"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(prod.id, prod.title)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="ลบ/ซ่อนแผนประกัน"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD NEW PRODUCT */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">เพิ่มแผนประกันภัยใหม่เข้าสู่ระบบ</h3>
                <p className="text-xs text-slate-500">ข้อมูลจะแสดงผลบนหน้าเว็บไซต์ทันที</p>
              </div>
              <button
                onClick={() => setShowAddProductModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">รหัสแผน (Code) *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น MTL-HEALTH-01"
                    value={productForm.code}
                    onChange={(e) => setProductForm({ ...productForm, code: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อแผนประกัน (Title) *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เมืองไทย อีลิท แคร์ 2568"
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่</label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value={1}>ประกันสุขภาพเหมาจ่าย</option>
                    <option value={2}>ประกันชีวิตและมรดก</option>
                    <option value={3}>ประกันสะสมทรัพย์</option>
                    <option value={4}>ประกันบำนาญ</option>
                    <option value={5}>ผลิตภัณฑ์ลดหย่อนภาษี</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">บริษัทประกัน</label>
                  <select
                    value={productForm.companyId}
                    onChange={(e) => setProductForm({ ...productForm, companyId: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  >
                    <option value={1}>เอไอเอ ประเทศไทย (AIA)</option>
                    <option value={2}>เมืองไทยประกันชีวิต (MTL)</option>
                    <option value={3}>อลิอันซ์ อยุธยา (AZAY)</option>
                    <option value={4}>กรุงไทย-แอกซ่า (KTAXA)</option>
                    <option value={5}>เอฟดับบลิวดี (FWD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">เบี้ยประกันเริ่มต้น (บาท/ปี) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.minPremium}
                    onChange={(e) => setProductForm({ ...productForm, minPremium: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">เพดานลดหย่อนภาษี (บาท)</label>
                  <input
                    type="number"
                    value={productForm.maxTaxDeduction}
                    onChange={(e) => setProductForm({ ...productForm, maxTaxDeduction: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">คำอธิบายสรุปจุดเด่น *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="เช่น แผนประกันสุขภาพเหมาจ่าย วงเงิน 20 ล้านบาท ครอบคลุมค่าห้องเดี่ยว..."
                  value={productForm.summary}
                  onChange={(e) => setProductForm({ ...productForm, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ไฮไลต์ข้อที่ 1</label>
                  <input
                    type="text"
                    value={productForm.highlightPoint1}
                    onChange={(e) => setProductForm({ ...productForm, highlightPoint1: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ไฮไลต์ข้อที่ 2</label>
                  <input
                    type="text"
                    value={productForm.highlightPoint2}
                    onChange={(e) => setProductForm({ ...productForm, highlightPoint2: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isTaxDeductible}
                    onChange={(e) => setProductForm({ ...productForm, isTaxDeductible: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  สามารถนำไปลดหย่อนภาษีได้
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={(e) => setProductForm({ ...productForm, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  แสดงในรายการแนะนำหน้าแรก
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md shadow-orange-600/20 cursor-pointer"
                >
                  บันทึกข้อมูลแผนประกัน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">แก้ไขข้อมูลแผนประกัน</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อแผนประกัน</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">เบี้ยเริ่มต้น (บาท/ปี)</label>
                <input
                  type="number"
                  required
                  value={editingProduct.min_premium}
                  onChange={(e) => setEditingProduct({ ...editingProduct, min_premium: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold text-brand-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">เพดานลดหย่อนภาษี (บาท)</label>
                <input
                  type="number"
                  value={editingProduct.max_tax_deduction}
                  onChange={(e) => setEditingProduct({ ...editingProduct, max_tax_deduction: Number(e.target.value) })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold text-emerald-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">คำอธิบายสรุป</label>
                <textarea
                  rows={3}
                  value={editingProduct.summary}
                  onChange={(e) => setEditingProduct({ ...editingProduct, summary: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-md cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: AGENT LEAD NOTE */}
      {editingLeadNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">บันทึกความคืบหน้าการติดต่อ</h3>
                <p className="text-xs text-slate-500">{editingLeadNote.customer_name} ({editingLeadNote.customer_phone})</p>
              </div>
              <button
                onClick={() => setEditingLeadNote(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <textarea
              rows={4}
              value={agentNoteText}
              onChange={(e) => setAgentNoteText(e.target.value)}
              placeholder="เช่น โทรคุยรอบแรกแล้ว ลูกค้าสนใจแผน 20 ล้านบาท นัดส่งตารางเปรียบเทียบทาง LINE วันศุกร์นี้"
              className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingLeadNote(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSaveLeadNote}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl"
              >
                บันทึกข้อความ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
