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
  Filter, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { fetchLeadsAPI, updateLeadStatusAPI, fetchAdminStatsAPI, FALLBACK_PRODUCTS } from '@/lib/api';

export default function AdminPortalPage() {
  const [activeTab, setActiveTab] = useState<'leads' | 'products'>('leads');
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({
    totalLeads: 0,
    newLeads: 0,
    contactedLeads: 0,
    consultingLeads: 0,
    closedLeads: 0,
    totalProducts: 4,
  });
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, statsData] = await Promise.all([
        fetchLeadsAPI(filterStatus === 'ALL' ? undefined : filterStatus),
        fetchAdminStatsAPI(),
      ]);
      setLeads(leadsData);
      setStats(statsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filterStatus]);

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      await updateLeadStatusAPI(leadId, newStatus);
      // update local state
      setLeads((prev) =>
        prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
      );
      // reload stats
      const updatedStats = await fetchAdminStatsAPI();
      setStats(updatedStats);
    } catch (e) {
      console.error('Failed to update status', e);
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">ใหม่ (NEW)</span>;
      case 'CONTACTED':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">ติดต่อแล้ว</span>;
      case 'CONSULTING':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">กำลังให้คำปรึกษา</span>;
      case 'CLOSED_WON':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">ปิดการขายสำเร็จ</span>;
      case 'CLOSED_LOST':
        return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">ยุติการติดต่อ</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{status}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> FinAdvisor Agent & Admin Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            ระบบจัดการหลังบ้านและติดตามลูกค้า (CRM)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            จัดการคำขอรับคำปรึกษา แผนประกัน และติดตามสถานะการติดต่อกับลูกค้า
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            รีเฟรชข้อมูล
          </button>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-700 text-white transition-colors"
          >
            เปิดหน้าเว็บหลัก
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>คำขอทั้งหมด (Total Leads)</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">
            {stats.totalLeads}
          </div>
          <p className="text-[11px] text-slate-400">จากทุกช่องทางและหน้าเว็บ</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between text-amber-700 text-xs font-semibold">
            <span>รอดำเนินการติดต่อ (NEW)</span>
            <AlertCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-900">
            {stats.newLeads}
          </div>
          <p className="text-[11px] text-amber-600 font-medium">ลูกค้าส่งแบบฟอร์มเข้ามาใหม่</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-purple-700 text-xs font-semibold">
            <span>กำลังให้คำปรึกษา</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-extrabold text-purple-900">
            {stats.consultingLeads + stats.contactedLeads}
          </div>
          <p className="text-[11px] text-purple-600">ตัวแทนอยู่ระหว่างนำเสนอแผน</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-emerald-700 text-xs font-semibold">
            <span>แผนประกันในระบบ</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-900">
            {stats.totalProducts}
          </div>
          <p className="text-[11px] text-emerald-600">แผนประกันที่เปิดให้เปรียบเทียบ</p>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('leads')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'leads'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          รายการคำขอรับคำปรึกษา ({leads.length})
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'products'
              ? 'border-brand-600 text-brand-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          แผนประกันในระบบ ({FALLBACK_PRODUCTS.length})
        </button>
      </div>

      {/* TAB 1: LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium w-full md:w-auto">
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
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    filterStatus === tab.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, เบอร์, หรือแผนประกัน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">ลูกค้า / เบอร์ติดต่อ</th>
                  <th className="py-3 px-4">แผนที่สนใจ</th>
                  <th className="py-3 px-4">งบประมาณ & เวลาสะดวก</th>
                  <th className="py-3 px-4">หมายเหตุลูกค้า</th>
                  <th className="py-3 px-4">สถานะ (คลิกเพื่อเปลี่ยน)</th>
                  <th className="py-3 px-4 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-4 font-medium text-slate-900">
                      <div className="font-bold text-sm text-slate-900">{lead.customer_name}</div>
                      <div className="flex items-center gap-1 text-slate-500 mt-1">
                        <PhoneCall className="w-3 h-3 text-slate-400" />
                        <a href={`tel:${lead.customer_phone}`} className="text-brand-600 hover:underline">
                          {lead.customer_phone}
                        </a>
                      </div>
                      {lead.customer_email && (
                        <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <Mail className="w-3 h-3" />
                          {lead.customer_email}
                        </div>
                      )}
                      <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                        ✓ ยินยอม PDPA เรียบร้อย
                      </div>
                    </td>

                    <td className="py-4 px-4 max-w-xs">
                      <span className="font-semibold text-slate-800 line-clamp-2">
                        {lead.product_title || 'ขอรับคำปรึกษาทั่วไป'}
                      </span>
                      {lead.province && (
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          จังหวัด: {lead.province}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 space-y-1">
                      <div className="text-slate-800 font-medium">
                        {lead.budget_range || '-'}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {lead.preferred_contact_time || 'สะดวกทุกเวลา'}
                      </div>
                    </td>

                    <td className="py-4 px-4 max-w-xs text-slate-600">
                      <p className="line-clamp-2 text-xs">
                        {lead.user_notes || '- ไม่มีหมายเหตุ -'}
                      </p>
                    </td>

                    <td className="py-4 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:border-brand-500 cursor-pointer shadow-sm"
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
                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        <PhoneCall className="w-3 h-3" />
                        โทรหาลูกค้า
                      </a>
                    </td>
                  </tr>
                ))}
                {filteredLeads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-10 text-slate-400">
                      ไม่พบข้อมูลคำขอรับคำปรึกษาที่ตรงกับเงื่อนไข
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS OVERVIEW */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-slate-900">
              รายการแผนประกันในฐานข้อมูล
            </h2>
            <Link
              href="/products"
              target="_blank"
              className="text-xs font-semibold text-brand-600 hover:underline inline-flex items-center gap-1"
            >
              เปิดดูหน้าเว็บแคตตาล็อก <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-y border-slate-200">
                <tr>
                  <th className="py-3 px-4">ชื่อผลิตภัณฑ์</th>
                  <th className="py-3 px-4">บริษัท</th>
                  <th className="py-3 px-4">หมวดหมู่</th>
                  <th className="py-3 px-4">เบี้ยเริ่มต้น</th>
                  <th className="py-3 px-4">สิทธิลดหย่อนภาษี</th>
                  <th className="py-3 px-4 text-right">ลิงก์หน้าผลิตภัณฑ์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {FALLBACK_PRODUCTS.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {prod.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {prod.company_name}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                        {prod.category_name}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-brand-900">
                      ฿{Number(prod.min_premium).toLocaleString()} / ปี
                    </td>
                    <td className="py-3.5 px-4">
                      {prod.is_tax_deductible ? (
                        <span className="text-emerald-700 font-semibold">
                          ✓ ได้สูงสุด ฿{Number(prod.max_tax_deduction).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        className="text-brand-600 hover:underline font-semibold"
                      >
                        ดูหน้ารายละเอียด &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
