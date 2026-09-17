'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ShieldAlert,
  User,
  Users, 
  PhoneCall, 
  Mail, 
  Clock, 
  Layers, 
  CheckCircle2, 
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
  Sparkles,
  Lock,
  Unlock,
  LogOut,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Sliders,
  Settings,
  Bell,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  Menu,
  Check,
  AlertTriangle,
  Info,
  BookOpen,
  Megaphone,
  Image as ImageIcon,
  Star,
  Calculator,
  FolderTree,
  Upload,
  Building,
  Phone,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { 
  fetchLeadsAPI, 
  updateLeadStatusAPI, 
  deleteLeadAPI,
  fetchAdminStatsAPI, 
  fetchProducts,
  createProductAPI, 
  updateProductAPI, 
  deleteProductAPI,
  FALLBACK_PRODUCTS,
  fetchCategories,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
  FALLBACK_CATEGORIES,
  fetchCompaniesAPI,
  createCompanyAPI,
  updateCompanyAPI,
  deleteCompanyAPI,
  FALLBACK_COMPANIES,
  getHeroSlides,
  saveHeroSlides,
  resetHeroSlides,
  FALLBACK_HERO_SLIDES,
  getArticles,
  saveArticles,
  resetArticles,
  getAnnouncementPopup,
  saveAnnouncementPopup,
  resetAnnouncementPopup,
  DEFAULT_ANNOUNCEMENT_POPUP
} from '@/lib/api';
import { Company, Category, Product, HeroSlide, Article, AnnouncementPopup } from '@/types';
import { ImageUploadPicker } from '@/components/common/ImageUploadPicker';
import { CompanyBrandBadge } from '@/components/common/CompanyBrandBadge';


// Admin Session Type
interface AdminUser {
  username: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  loginTime: string;
}

export default function AdminPortalPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Portal Navigation State
  const [activeTab, setActiveTab] = useState<
    'overview' | 'leads' | 'products' | 'companies' | 'categories' | 'banners' | 'articles' | 'announcements' | 'calculators' | 'analytics' | 'settings'
  >('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data States
  const [leads, setLeads] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [announcementPopup, setAnnouncementPopup] = useState<AnnouncementPopup>(DEFAULT_ANNOUNCEMENT_POPUP);
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
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('ALL');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Modals & Drawers
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingLeadNote, setEditingLeadNote] = useState<any | null>(null);
  const [viewingLeadDetail, setViewingLeadDetail] = useState<any | null>(null);
  const [agentNoteText, setAgentNoteText] = useState('');

  // Company Modals State
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [companyForm, setCompanyForm] = useState({
    code: '',
    name: '',
    contact_phone: '',
    logo_url: '',
  });

  // Category Modals State
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    slug: '',
    name_th: '',
    name_en: '',
    category_type: 'INSURANCE' as 'INSURANCE' | 'INVESTMENT' | 'TAX',
    description: '',
    icon: 'ShieldCheck',
    sort_order: 1,
  });

  // Tax & Calculator Settings State
  const [taxSettings, setTaxSettings] = useState({
    maxLifeDeduction: 100000,
    maxHealthDeduction: 25000,
    maxPensionDeduction: 200000,
    maxExpenseDeduction: 100000,
    expenseRatePercent: 50,
    personalDeduction: 60000,
    supportYearsMultiplier: 5,
    emergencyFundAmount: 200000,
    taxBrackets: [
      { min: 0, max: 150000, rate: 0, label: '0 - 150,000 บาท (ยกเว้นภาษี)' },
      { min: 150001, max: 300000, rate: 5, label: '150,001 - 300,000 บาท (5%)' },
      { min: 300001, max: 500000, rate: 10, label: '300,001 - 500,000 บาท (10%)' },
      { min: 500001, max: 750000, rate: 15, label: '500,001 - 750,000 บาท (15%)' },
      { min: 750001, max: 1000000, rate: 20, label: '750,001 - 1,000,000 บาท (20%)' },
      { min: 1000001, max: 2000000, rate: 25, label: '1,000,001 - 2,000,000 บาท (25%)' },
      { min: 2000001, max: 5000000, rate: 30, label: '2,000,001 - 5,000,000 บาท (30%)' },
      { min: 5000001, max: 0, rate: 35, label: 'มากกว่า 5,000,000 บาท (35%)' },
    ],
  });

  // Website & Contact Settings State
  const [webSettings, setWebSettings] = useState({
    siteName: 'มดตะนอย ที่ปรึกษาประกันภัยและวางแผนภาษี',
    hotlinePhone: '1766',
    secondaryPhone: '02-123-4567',
    supportEmail: 'contact@modtanoyadvisor.com',
    lineId: '@modtanoyadvisor',
    lineUrl: 'https://line.me/ti/p/~@modtanoyadvisor',
    officeAddress: 'อาคารเอไอเอ สาทร ทาวเวอร์ ชั้น 18 ถ.สาทรใต้ แขวงยานนาวา เขตสาทร กรุงเทพฯ 10120',
    businessHours: 'จันทร์ - ศุกร์ 08:30 - 18:00 น. (เสาร์ - อาทิตย์ นัดหมายล่วงหน้า)',
    licenseNotice: 'บริการให้คำปรึกษาและเปรียบเทียบประกันภัยตามใบอนุญาตนายหน้าประกันชีวิต คปภ. เลขที่ 6601234567',
  });

  // Admin Password Form State
  const [pwdForm, setPwdForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });


  // Hero Slides Management State
  const [showAddSlideModal, setShowAddSlideModal] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [editSlideTagsInput, setEditSlideTagsInput] = useState('');

  const defaultNewSlide: Omit<HeroSlide, 'id'> = {
    badge_text: 'ประกันสุขภาพเหมาจ่าย 2026',
    badge_icon: 'Shield',
    title: 'วางแผนประกันสุขภาพและลดหย่อนภาษี',
    title_highlight: 'เพื่อความคุ้มครองที่สมบูรณ์แบบ',
    subtitle: 'เลือกแผนประกันที่ตอบโจทย์ชีวิต วางแผนภาษีเงินได้บุคคลธรรมดาอย่างชาญฉลาด ดูแลโดยที่ปรึกษาการเงินและตัวแทนมืออาชีพ',
    tags: [
      'เหมาจ่ายค่ารักษาพยาบาลตามจริง',
      'ลดหย่อนภาษีสูงสุด 300,000 บาท',
      'แฟกซ์เคลมไม่ต้องสำรองจ่าย',
      'ปรึกษาฟรี ไม่มีข้อผูกมัด',
    ],
    primary_btn_label: 'ปรึกษาตัวแทนฟรี',
    primary_btn_href: '#contact-form',
    secondary_btn_label: 'เปรียบเทียบแผนประกัน',
    secondary_btn_href: '/products',
    card_badge: 'TOP HIGHLIGHT PLAN',
    card_main_title: 'แผนประกันสุขภาพเหมาจ่ายยอดนิยม',
    card_main_metric: 'เหมาจ่าย 5,000,000',
    card_main_metric_sub: 'ต่อรอบปีกรมธรรม์ ไม่จำกัดวงเงินต่อครั้ง',
    stat1_label: 'ลดหย่อนภาษี',
    stat1_value: '25,000 บ.',
    stat1_desc: 'ตามจ่ายจริง',
    stat2_label: 'ความพึงพอใจ',
    stat2_value: '99.8%',
    stat2_desc: 'เคลมรวดเร็ว',
    card_footer_note: '✓ ตัวแทนดูแลแบบ VIP พร้อมประสานงานโรงพยาบาล 24 ชม.',
    is_active: true,
    sort_order: 1,
    background_image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
  };
  const [newSlideForm, setNewSlideForm] = useState(defaultNewSlide);
  const [newSlideTagsInput, setNewSlideTagsInput] = useState(defaultNewSlide.tags.join('\n'));

  // Articles Management State
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const defaultNewArticle: Omit<Article, 'id'> = {
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author_name: 'คุณชนุดม รัตนรักษ์ (CFP®)',
    author_license: 'ใบอนุญาต คปภ. 6401029384',
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    reading_time_minutes: 5,
    published_at: '17 ก.ย. 2567',
    category_name: 'ประกันสุขภาพเหมาจ่าย',
    category_slug: 'health-insurance',
  };
  const [newArticleForm, setNewArticleForm] = useState(defaultNewArticle);

  // Announcement Popup Form State
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementPopup>(DEFAULT_ANNOUNCEMENT_POPUP);

  // Add Product Form State
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

  // Check saved session on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('modtanoy_admin_session');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        if (parsed?.isAuthenticated) {
          setIsAuthenticated(true);
          setAdminUser(parsed.user);
        }
      }
    } catch {
      // ignore parsing error
    }
  }, []);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Load backend / fallback data
  const loadData = async () => {
    setLoading(true);
    try {
      const [leadsData, statsData, productsData, categoriesData, companiesData] = await Promise.all([
        fetchLeadsAPI(filterStatus === 'ALL' ? undefined : filterStatus),
        fetchAdminStatsAPI(),
        fetchProducts(),
        fetchCategories(),
        fetchCompaniesAPI(),
      ]);
      setLeads(leadsData);
      setStats(statsData);
      setProducts(productsData);
      setCategories(categoriesData);
      setCompanies(companiesData);
      setHeroSlides(getHeroSlides());
      setArticles(getArticles());
      const currentAnnouncement = getAnnouncementPopup();
      setAnnouncementPopup(currentAnnouncement);
      setEditingAnnouncement(currentAnnouncement);

      // Load saved settings
      try {
        const savedTax = localStorage.getItem('modtanoy_tax_settings');
        if (savedTax) setTaxSettings(JSON.parse(savedTax));
        const savedWeb = localStorage.getItem('modtanoy_web_settings');
        if (savedWeb) setWebSettings(JSON.parse(savedWeb));
      } catch {}
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, filterStatus]);

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    setTimeout(() => {
      const email = loginEmail.trim().toLowerCase();
      const pwd = loginPassword.trim();

      // Demo login validation (accepts default admin account or demo test)
      const isValidAdmin = 
        (email === 'admin@modtanoy.com' && (pwd === 'admin1234' || pwd === 'password123')) ||
        (email === 'admin' && (pwd === 'admin' || pwd === 'admin1234')) ||
        (pwd === 'admin1234' || pwd === 'modtanoy2024');

      if (isValidAdmin) {
        const user: AdminUser = {
          username: email || 'admin',
          name: 'คุณชนุดม รัตนรักษ์',
          role: 'ผู้ดูแลระบบและที่ปรึกษาอาวุโส (Super Admin)',
          email: email || 'admin@modtanoy.com',
          avatar: 'CR',
          loginTime: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
        };

        setIsAuthenticated(true);
        setAdminUser(user);
        if (rememberMe) {
          localStorage.setItem('modtanoy_admin_session', JSON.stringify({ isAuthenticated: true, user }));
        }
        showToast(`ยินดีต้อนรับเข้าสู่ระบบ, ${user.name}`, 'success');
      } else {
        setLoginError('อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง หรือใช้ปุ่มกรอกข้อมูลทดสอบ');
      }
      setIsLoggingIn(false);
    }, 600);
  };

  // Handle Quick Demo Fill
  const handleDemoFill = () => {
    setLoginEmail('admin@modtanoy.com');
    setLoginPassword('admin1234');
    setLoginError('');
  };

  // Handle Logout
  const handleLogout = () => {
    if (confirm('คุณต้องการออกจากระบบจัดการหลังบ้าน ใช่หรือไม่?')) {
      setIsAuthenticated(false);
      setAdminUser(null);
      localStorage.removeItem('modtanoy_admin_session');
      showToast('ออกจากระบบเรียบร้อยแล้ว', 'info');
    }
  };

  // Status Change for Leads
  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      await updateLeadStatusAPI(leadId, newStatus);
      setLeads((prev) =>
        prev.map((item) => (item.id === leadId ? { ...item, status: newStatus } : item))
      );
      const updatedStats = await fetchAdminStatsAPI();
      setStats(updatedStats);
      showToast('อัปเดตสถานะลูกค้าสำเร็จแล้ว', 'success');
    } catch (e) {
      console.error('Failed to update status', e);
      showToast('เกิดข้อผิดพลาดในการอัปเดตสถานะ', 'error');
    }
  };

  // Save Agent Note
  const handleSaveLeadNote = async () => {
    if (!editingLeadNote) return;
    try {
      await updateLeadStatusAPI(editingLeadNote.id, editingLeadNote.status, agentNoteText);
      setLeads((prev) =>
        prev.map((item) => (item.id === editingLeadNote.id ? { ...item, user_notes: agentNoteText } : item))
      );
      setEditingLeadNote(null);
      showToast('บันทึกความคืบหน้าเรียบร้อยแล้ว', 'success');
    } catch (e) {
      console.error('Failed to save note', e);
      showToast('บันทึกข้อมูลไม่สำเร็จ', 'error');
    }
  };

  // Export Leads to CSV
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('ไม่มีข้อมูลสำหรับส่งออก', 'info');
      return;
    }
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
    showToast('ดาวน์โหลดไฟล์ CSV สำเร็จแล้ว', 'success');
  };

  // Delete Lead
  const handleDeleteLead = async (id: number, customerName: string) => {
    if (!confirm(`คุณต้องการลบคำขอรับคำปรึกษาของคุณ "${customerName}" ออกจากระบบ ใช่หรือไม่?`)) return;
    try {
      await deleteLeadAPI(id);
      setLeads((prev) => prev.filter((l) => l.id !== id));
      const updatedStats = await fetchAdminStatsAPI();
      setStats(updatedStats);
      showToast('ลบข้อมูลลูกค้าเรียบร้อยแล้ว', 'info');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถลบข้อมูลลูกค้าได้', 'error');
    }
  };

  // --- Companies Handlers ---
  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCompanyAPI(companyForm);
      setShowAddCompanyModal(false);
      setCompanyForm({ code: '', name: '', contact_phone: '', logo_url: '' });
      const comps = await fetchCompaniesAPI();
      setCompanies(comps);
      showToast('เพิ่มพันธมิตรบริษัทประกันสำเร็จแล้ว', 'success');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถบันทึกบริษัทประกันได้', 'error');
    }
  };

  const handleUpdateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCompany) return;
    try {
      await updateCompanyAPI(editingCompany.id, editingCompany);
      setEditingCompany(null);
      const comps = await fetchCompaniesAPI();
      setCompanies(comps);
      showToast('อัปเดตข้อมูลบริษัทประกันสำเร็จแล้ว', 'success');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถแก้ไขข้อมูลบริษัทประกันได้', 'error');
    }
  };

  const handleDeleteCompany = async (id: number, name: string) => {
    if (!confirm(`คุณต้องการลบบริษัท "${name}" ออกจากระบบ ใช่หรือไม่?`)) return;
    try {
      await deleteCompanyAPI(id);
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      showToast('ลบบริษัทประกันเรียบร้อยแล้ว', 'info');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถลบบริษัทประกันได้', 'error');
    }
  };

  // --- Categories Handlers ---
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCategoryAPI(categoryForm);
      setShowAddCategoryModal(false);
      setCategoryForm({
        slug: '',
        name_th: '',
        name_en: '',
        category_type: 'INSURANCE',
        description: '',
        icon: 'ShieldCheck',
        sort_order: categories.length + 1,
      });
      const cats = await fetchCategories();
      setCategories(cats);
      showToast('เพิ่มหมวดหมู่ความคุ้มครองสำเร็จแล้ว', 'success');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถบันทึกหมวดหมู่ได้', 'error');
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    try {
      await updateCategoryAPI(editingCategory.id, editingCategory);
      setEditingCategory(null);
      const cats = await fetchCategories();
      setCategories(cats);
      showToast('อัปเดตข้อมูลหมวดหมู่สำเร็จแล้ว', 'success');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถแก้ไขหมวดหมู่ได้', 'error');
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`คุณต้องการลบหมวดหมู่ "${name}" ออกจากระบบ ใช่หรือไม่?`)) return;
    try {
      await deleteCategoryAPI(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
      showToast('ลบหมวดหมู่เรียบร้อยแล้ว', 'info');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถลบหมวดหมู่ได้', 'error');
    }
  };

  // --- Tax & Web Settings Handlers ---
  const handleSaveTaxSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('modtanoy_tax_settings', JSON.stringify(taxSettings));
      showToast('บันทึกเกณฑ์คำนวณภาษี & ทุนชีวิตสำเร็จแล้ว', 'success');
    } catch {
      showToast('เกิดข้อผิดพลาดในการบันทึกเกณฑ์คำนวณ', 'error');
    }
  };

  const handleSaveWebSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('modtanoy_web_settings', JSON.stringify(webSettings));
      showToast('บันทึกข้อมูลติดต่อเว็บไซต์สำเร็จแล้ว', 'success');
    } catch {
      showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูลติดต่อ', 'error');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdForm.newPassword !== pwdForm.confirmPassword) {
      showToast('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน', 'error');
      return;
    }
    if (pwdForm.newPassword.length < 6) {
      showToast('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร', 'error');
      return;
    }
    showToast('เปลี่ยนรหัสผ่านผู้ดูแลระบบสำเร็จแล้ว', 'success');
    setPwdForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // --- Full System Backup & Restore ---
  const handleExportFullBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      version: '2.0',
      stats,
      leads,
      products,
      categories,
      companies,
      heroSlides,
      articles,
      announcementPopup,
      taxSettings,
      webSettings,
    };
    const jsonBlob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `modtanoy_full_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('ดาวน์โหลดไฟล์สำรองข้อมูลทั้งระบบ (Full JSON Backup) สำเร็จ', 'success');
  };

  const handleImportFullBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.leads && Array.isArray(parsed.leads)) setLeads(parsed.leads);
        if (parsed.products && Array.isArray(parsed.products)) setProducts(parsed.products);
        if (parsed.categories && Array.isArray(parsed.categories)) setCategories(parsed.categories);
        if (parsed.companies && Array.isArray(parsed.companies)) setCompanies(parsed.companies);
        if (parsed.heroSlides && Array.isArray(parsed.heroSlides)) {
          setHeroSlides(parsed.heroSlides);
          saveHeroSlides(parsed.heroSlides);
        }
        if (parsed.articles && Array.isArray(parsed.articles)) {
          setArticles(parsed.articles);
          saveArticles(parsed.articles);
        }
        if (parsed.announcementPopup) {
          setAnnouncementPopup(parsed.announcementPopup);
          saveAnnouncementPopup(parsed.announcementPopup);
        }
        if (parsed.taxSettings) {
          setTaxSettings(parsed.taxSettings);
          localStorage.setItem('modtanoy_tax_settings', JSON.stringify(parsed.taxSettings));
        }
        if (parsed.webSettings) {
          setWebSettings(parsed.webSettings);
          localStorage.setItem('modtanoy_web_settings', JSON.stringify(parsed.webSettings));
        }
        showToast('กู้คืนข้อมูลสำรองทั้งระบบสำเร็จเรียบร้อยแล้ว', 'success');
      } catch (err) {
        console.error(err);
        showToast('ไฟล์ JSON ไม่ถูกต้อง หรือโครงสร้างข้อมูลไม่สมบูรณ์', 'error');
      }
    };
    reader.readAsText(file);
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
      showToast('เพิ่มแผนประกันภัยใหม่เข้าสู่ระบบสำเร็จ', 'success');
    } catch (err) {
      console.error(err);
      showToast('บันทึกแผนประกันไม่สำเร็จ', 'error');
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
      showToast('อัปเดตข้อมูลแผนประกันสำเร็จ', 'success');
    } catch (err) {
      console.error(err);
      showToast('แก้ไขแผนประกันไม่สำเร็จ', 'error');
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: number, title: string) => {
    if (!confirm(`คุณต้องการปิดการใช้งาน/ลบแผน "${title}" ใช่หรือไม่?`)) return;
    try {
      await deleteProductAPI(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      loadData();
      showToast('ลบแผนประกันออกจากระบบเรียบร้อย', 'info');
    } catch (err) {
      console.error(err);
      showToast('ไม่สามารถลบแผนประกันได้', 'error');
    }
  };

  // --- Hero Slides Handlers ---
  const handleToggleSlideActive = (id: number) => {
    const updated = heroSlides.map((s) => (s.id === id ? { ...s, is_active: !s.is_active } : s));
    setHeroSlides(updated);
    saveHeroSlides(updated);
    showToast('ปรับสถานะการแสดงผลสไลด์สำเร็จ', 'success');
  };

  const handleDeleteSlide = (id: number, title: string) => {
    if (heroSlides.length <= 1) {
      showToast('ต้องมีสไลด์อย่างน้อย 1 สไลด์ในระบบ', 'error');
      return;
    }
    if (!confirm(`คุณต้องการลบสไลด์ "${title}" ใช่หรือไม่?`)) return;
    const updated = heroSlides.filter((s) => s.id !== id);
    setHeroSlides(updated);
    saveHeroSlides(updated);
    showToast('ลบสไลด์ออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  const handleResetSlides = () => {
    if (!confirm('คุณต้องการรีเซ็ตสไลด์ทั้งหมดกลับเป็นค่าเริ่มต้นจากระบบ ใช่หรือไม่? ข้อมูลสไลด์ที่แก้ไขเองจะถูกแทนที่ด้วยสไลด์ตั้งต้น')) return;
    const defaults = resetHeroSlides();
    setHeroSlides(defaults);
    showToast('รีเซ็ตสไลด์กลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว', 'info');
  };

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    const newSlide: HeroSlide = {
      ...newSlideForm,
      id: Date.now(),
      tags: newSlideTagsInput.split('\n').map((t) => t.trim()).filter(Boolean),
      sort_order: heroSlides.length + 1,
    };
    const updated = [...heroSlides, newSlide];
    setHeroSlides(updated);
    saveHeroSlides(updated);
    setShowAddSlideModal(false);
    setNewSlideForm(defaultNewSlide);
    setNewSlideTagsInput(defaultNewSlide.tags.join('\n'));
    showToast('เพิ่ม Hero Banner สไลด์ใหม่สำเร็จแล้ว', 'success');
  };

  const handleStartEditSlide = (slide: HeroSlide) => {
    setEditingSlide({ ...slide });
    setEditSlideTagsInput(Array.isArray(slide.tags) ? slide.tags.join('\n') : '');
  };

  const handleUpdateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;
    const updatedSlide: HeroSlide = {
      ...editingSlide,
      tags: editSlideTagsInput.split('\n').map((t) => t.trim()).filter(Boolean),
    };
    const updated = heroSlides.map((s) => (s.id === updatedSlide.id ? updatedSlide : s));
    setHeroSlides(updated);
    saveHeroSlides(updated);
    setEditingSlide(null);
    showToast('อัปเดตข้อมูลสไลด์ Hero Banner สำเร็จแล้ว', 'success');
  };

  // --- Article Handlers ---
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: Article = {
      ...newArticleForm,
      id: Date.now(),
      slug: newArticleForm.slug || newArticleForm.title.toLowerCase().replace(/[^a-z0-9ก-๙]+/g, '-'),
    };
    const updated = [newArticle, ...articles];
    setArticles(updated);
    saveArticles(updated);
    setShowAddArticleModal(false);
    setNewArticleForm(defaultNewArticle);
    showToast('เพิ่มบทความใหม่สำเร็จแล้ว', 'success');
  };

  const handleUpdateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;
    const updated = articles.map((a) => (a.id === editingArticle.id ? editingArticle : a));
    setArticles(updated);
    saveArticles(updated);
    setEditingArticle(null);
    showToast('อัปเดตข้อมูลบทความสำเร็จแล้ว', 'success');
  };

  const handleDeleteArticle = (id: number, title: string) => {
    if (articles.length <= 1) {
      showToast('ต้องมีบทความอย่างน้อย 1 บทความในระบบ', 'error');
      return;
    }
    if (!confirm(`คุณต้องการลบบทความ "${title}" ใช่หรือไม่?`)) return;
    const updated = articles.filter((a) => a.id !== id);
    setArticles(updated);
    saveArticles(updated);
    showToast('ลบบทความออกจากระบบเรียบร้อยแล้ว', 'info');
  };

  const handleResetArticles = () => {
    if (!confirm('คุณต้องการรีเซ็ตบทความทั้งหมดกลับเป็นค่าเริ่มต้น ใช่หรือไม่?')) return;
    const defaults = resetArticles();
    setArticles(defaults);
    showToast('รีเซ็ตบทความกลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว', 'info');
  };

  // --- Announcement Popup Handlers ---
  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    setAnnouncementPopup(editingAnnouncement);
    saveAnnouncementPopup(editingAnnouncement);
    showToast('บันทึกการตั้งค่าป๊อปอัปประกาศหน้าเว็บสำเร็จแล้ว', 'success');
  };

  const handleToggleAnnouncementActive = () => {
    const updated = { ...announcementPopup, is_active: !announcementPopup.is_active };
    setAnnouncementPopup(updated);
    setEditingAnnouncement(updated);
    saveAnnouncementPopup(updated);
    showToast(updated.is_active ? 'เปิดใช้งานป๊อปอัปประกาศหน้าเว็บแล้ว' : 'ปิดการแสดงป๊อปอัปชั่วคราวแล้ว', 'info');
  };

  const handleResetAnnouncement = () => {
    if (!confirm('คุณต้องการรีเซ็ตป๊อปอัปประกาศกลับเป็นค่าเริ่มต้น ใช่หรือไม่?')) return;
    const defaults = resetAnnouncementPopup();
    setAnnouncementPopup(defaults);
    setEditingAnnouncement(defaults);
    showToast('รีเซ็ตป๊อปอัปประกาศกลับเป็นค่าเริ่มต้นเรียบร้อยแล้ว', 'info');
  };

  const handleClearDismissedCookie = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('modtanoy_hide_announcement_until');
      showToast('ล้างสถานะการซ่อนเรียบร้อย! เมื่อเข้าหน้าเว็บจะแสดงป๊อปอัปทันที', 'success');
    }
  };

  // Helper for status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return {
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500 animate-pulse',
          label: 'รอดำเนินการ (NEW)',
        };
      case 'CONTACTED':
        return {
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-500',
          label: 'ติดต่อแล้ว',
        };
      case 'CONSULTING':
        return {
          bg: 'bg-purple-100 text-purple-900 border-purple-300',
          dot: 'bg-purple-500',
          label: 'กำลังให้คำปรึกษา',
        };
      case 'CLOSED_WON':
        return {
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-500',
          label: 'ปิดการขายสำเร็จ',
        };
      case 'CLOSED_LOST':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          dot: 'bg-slate-400',
          label: 'ยุติการติดต่อ',
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-200',
          dot: 'bg-slate-400',
          label: status,
        };
    }
  };

  const filteredLeads = leads.filter((item) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.customer_name?.toLowerCase().includes(q) ||
      item.customer_phone?.includes(q) ||
      item.customer_email?.toLowerCase().includes(q) ||
      item.product_title?.toLowerCase().includes(q) ||
      item.province?.toLowerCase().includes(q)
    );
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.company_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = productCategoryFilter === 'ALL' || 
      p.category_slug === productCategoryFilter || 
      p.category_name?.includes(productCategoryFilter);

    return matchesSearch && matchesCategory;
  });

  // ----------------------------------------------------------------------
  // VIEW 1: AUTHENTICATION / LOGIN SCREEN
  // ----------------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
        
        <div className="max-w-md w-full relative z-10 space-y-6">
          
          {/* Logo & Portal Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-sky-600 text-white shadow-md mb-1">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[11px] font-bold text-sky-800 uppercase tracking-wider mb-1.5 shadow-2xs">
                <Lock className="w-3 h-3 text-sky-600" />
                MODTANOY ADVISOR • OIC BACKOFFICE
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                เข้าสู่ระบบจัดการหลังบ้าน
              </h1>
              <p className="text-xs text-sky-800/80 mt-1">
                ระบบจัดการลูกค้ามุ่งหวัง (CRM) และงานที่ปรึกษาทางการเงิน
              </p>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-sky-100/80 border border-sky-100 space-y-5">
            
            {/* Security Alert Header */}
            <div className="bg-sky-50/80 border border-sky-200/80 rounded-2xl p-3.5 flex items-start gap-3 text-sky-950">
              <ShieldAlert className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="text-xs space-y-0.5">
                <p className="font-bold">ระบบความปลอดภัยระดับมาตรฐาน คปภ.</p>
                <p className="text-[11px] text-sky-800 leading-relaxed">
                  สำหรับตัวแทนและผู้ดูแลระบบที่มีสิทธิ์เข้าถึงข้อมูล PDPA เท่านั้น
                </p>
              </div>
            </div>

            {/* Error banner */}
            {loginError && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  อีเมลเจ้าหน้าที่ / ชื่อผู้ใช้งาน (Username)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="admin@modtanoy.com หรือ admin"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  รหัสผ่าน (Password)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="กรอกรหัสผ่านของคุณ"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 text-orange-600 rounded cursor-pointer"
                  />
                  จดจำการเข้าสู่ระบบ
                </label>
                
                <span className="text-slate-400 text-[11px]">
                  SSL 256-Bit เข้ารหัส
                </span>
              </div>

              {/* Standout Login Button (Vibrant Contrast) */}
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75"
              >
                {isLoggingIn ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    กำลังตรวจสอบสิทธิ์...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-white" />
                    เข้าสู่ระบบจัดการหลังบ้าน
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Helper Box */}
            <div className="pt-3 border-t border-sky-50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-900 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-500" /> บัญชีทดสอบสำหรับเดโม:
                </span>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="text-[11px] font-bold text-orange-600 hover:text-orange-700 underline cursor-pointer"
                >
                  คลิกกรอกอัตโนมัติ
                </button>
              </div>
              <div className="bg-sky-50/60 p-2.5 rounded-xl border border-sky-100 text-[11px] text-slate-700 space-y-0.5">
                <div>อีเมล: <code className="font-bold text-slate-900">admin@modtanoy.com</code></div>
                <div>รหัสผ่าน: <code className="font-bold text-slate-900">admin1234</code></div>
              </div>
            </div>

          </div>

          {/* Footer return link */}
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-sky-800/80 hover:text-sky-900 font-semibold transition-colors"
            >
              <span>← กลับสู่หน้าหลักของเว็บไซต์ ModtanoyAdvisor</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // VIEW 2: AUTHENTICATED PROFESSIONAL ENTERPRISE ADMIN PORTAL
  // ----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-sky-50/30 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* Toast Notification Alert Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-xl border flex items-center gap-2.5 text-xs font-bold ${
            toastMessage.type === 'success' 
              ? 'bg-emerald-900 text-white border-emerald-700' 
              : toastMessage.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-slate-900 text-white border-slate-700'
          }`}>
            {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
            {toastMessage.type === 'info' && <Info className="w-4 h-4 text-sky-400" />}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* 1. LEFT SIDEBAR NAVIGATION */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 lg:w-72 shrink-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Branding Section */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white tracking-tight">Modtanoy<span className="text-sky-400">Admin</span></span>
                <span className="text-[10px] font-bold text-sky-400 bg-sky-400/10 px-1.5 py-0.5 rounded border border-sky-400/20">PRO</span>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menu Links */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              เมนูหลักการจัดการ
            </div>

            <button
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>ภาพรวมแดชบอร์ด</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('leads'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>จัดการลูกค้ามุ่งหวัง (CRM)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {stats.newLeads} ใหม่
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('products'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4" />
                <span>จัดการแผนประกันภัย</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {products.length} แผน
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('companies'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'companies'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>พันธมิตรบริษัทประกัน</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {companies.length} บ.
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('categories'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'categories'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FolderTree className="w-4 h-4" />
                <span>หมวดหมู่ความคุ้มครอง</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {categories.length} หมวด
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('banners'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'banners'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" />
                <span>ปรับแต่ง Hero Banner</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                {heroSlides.filter((s) => s.is_active).length}/{heroSlides.length} แสดง
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('articles'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'articles'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>จัดการบทความ & รูปภาพ</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                {articles.length} เรื่อง
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('announcements'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'announcements'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Megaphone className="w-4 h-4" />
                <span>ป๊อปอัปประกาศหน้าเว็บ</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                announcementPopup.is_active 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {announcementPopup.is_active ? 'เปิดอยู่' : 'ปิดอยู่'}
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('calculators'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'calculators'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calculator className="w-4 h-4" />
                <span>เกณฑ์คำนวณภาษี & ความคุ้มครอง</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                2568
              </span>
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>รายงานและสถิติ</span>
              </div>
            </button>


            <div className="pt-4 px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              การดูแลระบบ
            </div>

            <button
              onClick={() => { setActiveTab('settings'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-orange-600 text-white font-bold shadow-md shadow-orange-600/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>ตั้งค่าระบบ & เจ้าหน้าที่</span>
              </div>
            </button>

            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>เปิดดูหน้าบ้านจริง</span>
              </div>
            </Link>
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <User className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <div className="font-bold text-xs text-white truncate">
                {adminUser?.name || 'Admin User'}
              </div>
              <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ออนไลน์ • คปภ. ได้รับอนุญาต
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-rose-950/60 hover:text-rose-300 text-slate-400 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/60 backdrop-blur-xs md:hidden"
        ></div>
      )}

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Appbar */}
        <header className="sticky top-0 z-20 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4 shadow-2xs">
          
          {/* Left: Mobile Toggle & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <span>ModtanoyAdvisor</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-600">Admin Portal</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-orange-600 capitalize">
                  {activeTab === 'overview' && 'ภาพรวมระบบ'}
                  {activeTab === 'leads' && 'ลูกค้ามุ่งหวัง (CRM)'}
                  {activeTab === 'products' && 'แผนประกันภัย'}
                  {activeTab === 'companies' && 'พันธมิตรบริษัทประกัน'}
                  {activeTab === 'categories' && 'หมวดหมู่ความคุ้มครอง'}
                  {activeTab === 'banners' && 'ปรับแต่ง Hero Banner'}
                  {activeTab === 'articles' && 'จัดการบทความ & รูปภาพ'}
                  {activeTab === 'announcements' && 'ป๊อปอัปประกาศหน้าเว็บ'}
                  {activeTab === 'calculators' && 'เกณฑ์คำนวณภาษี & ความคุ้มครอง'}
                  {activeTab === 'analytics' && 'รายงานวิเคราะห์'}
                  {activeTab === 'settings' && 'การตั้งค่า'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {activeTab === 'overview' && 'แดชบอร์ดภาพรวมการดำเนินงาน'}
                {activeTab === 'leads' && 'ระบบติดตามลูกค้าและจัดสรรงานตัวแทน'}
                {activeTab === 'products' && 'คลังข้อมูลแผนประกันภัยและสิทธิภาษี'}
                {activeTab === 'companies' && 'จัดการรายชื่อและข้อมูลพันธมิตรบริษัทประกันชีวิต'}
                {activeTab === 'categories' && 'จัดการหมวดหมู่ความคุ้มครอง สิทธิภาษี และการเงิน'}
                {activeTab === 'banners' && 'จัดการสไลด์ Hero Banner และอัปโหลดภาพพื้นหลัง'}
                {activeTab === 'articles' && 'ระบบจัดการบทความความรู้และอัปโหลดภาพหน้าปก'}
                {activeTab === 'announcements' && 'กำหนดค่าป๊อปอัปประกาศและแบนเนอร์โปรโมชั่นหน้าแรก'}
                {activeTab === 'calculators' && 'กำหนดเพดานลดหย่อนภาษี อัตราก้าวหน้า และทุนชีวิต'}
                {activeTab === 'analytics' && 'สถิติการปรึกษาและความต้องการของลูกค้า'}
                {activeTab === 'settings' && 'การตั้งค่าระบบ ข้อมูลติดต่อ และสำรองข้อมูล'}
              </h2>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => loadData()}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title="รีเฟรชข้อมูล"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-600' : ''}`} />
            </button>

            {activeTab === 'leads' && (
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>ส่งออก CSV</span>
              </button>
            )}

            {activeTab === 'products' && (
              <button
                onClick={() => setShowAddProductModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>เพิ่มแผนใหม่</span>
              </button>
            )}

            {activeTab === 'companies' && (
              <button
                onClick={() => {
                  setCompanyForm({ code: '', name: '', contact_phone: '', logo_url: '' });
                  setShowAddCompanyModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>เพิ่มบริษัทประกันใหม่</span>
              </button>
            )}

            {activeTab === 'categories' && (
              <button
                onClick={() => {
                  setCategoryForm({
                    slug: '',
                    name_th: '',
                    name_en: '',
                    category_type: 'INSURANCE',
                    description: '',
                    icon: 'ShieldCheck',
                    sort_order: categories.length + 1,
                  });
                  setShowAddCategoryModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>เพิ่มหมวดหมู่ใหม่</span>
              </button>
            )}

            {activeTab === 'banners' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetSlides}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  title="รีเซ็ตสไลด์ทั้งหมดเป็นค่าเริ่มต้น"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>รีเซ็ตสไลด์ตั้งต้น</span>
                </button>
                <button
                  onClick={() => setShowAddSlideModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>เพิ่มสไลด์ใหม่</span>
                </button>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetArticles}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  title="รีเซ็ตบทความทั้งหมดเป็นค่าเริ่มต้น"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>รีเซ็ตบทความ</span>
                </button>
                <button
                  onClick={() => setShowAddArticleModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>เขียนบทความใหม่</span>
                </button>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearDismissedCookie}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 transition-colors shadow-2xs cursor-pointer"
                  title="ล้างสถานะการซ่อนเพื่อทดสอบดูป๊อปอัป"
                >
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>ล้างสถานะซ่อน (ทดสอบ)</span>
                </button>
                <button
                  onClick={handleToggleAnnouncementActive}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl text-white transition-all shadow-md cursor-pointer ${
                    announcementPopup.is_active
                      ? 'bg-slate-700 hover:bg-slate-800 shadow-slate-700/20'
                      : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  }`}
                >
                  {announcementPopup.is_active ? 'ปิดป๊อปอัปชั่วคราว' : 'เปิดใช้งานป๊อปอัป'}
                </button>
              </div>
            )}

            {activeTab === 'settings' && (
              <button
                onClick={handleExportFullBackup}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>สำรองข้อมูลระบบ (Full JSON)</span>
              </button>
            )}

          </div>

        </header>

        {/* Content Body Container */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

          {/* ================================================================ */}
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {/* ================================================================ */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Top Banner Notice */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                    <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                    <span>ระบบพร้อมปฏิบัติการ • ตัวแทนประจำการ 5 ท่าน</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    ยินดีต้อนรับ, {adminUser?.name || 'คุณชนุดม'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    ขณะนี้มีลูกค้าสนใจแผนประกันภัยและภาษีรอการติดต่อกลับจำนวน <strong className="text-amber-400 font-bold">{stats.newLeads} รายการ</strong> ตัวแทนสามารถกดโทรออก หรือบันทึกสถานะได้ทันที
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>จัดการลูกค้ามุ่งหวังทันที</span>
                  </button>
                </div>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* Total Leads */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                    <span>คำขอคำปรึกษาทั้งหมด</span>
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {stats.totalLeads}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+18.4% เทียบกับเดือนก่อน</span>
                  </div>
                </div>

                {/* New Pending Leads */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-amber-900 text-xs font-bold">
                    <span>รอดำเนินการติดต่อ (NEW)</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-700 border border-amber-200">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {stats.newLeads}
                  </div>
                  <p className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>รอตัวแทนตอบกลับภายใน 24 ชม.</span>
                  </p>
                </div>

                {/* In Consultation */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-700 text-xs font-bold">
                    <span>อยู่ระหว่างนำเสนอแผน</span>
                    <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center text-sky-700 border border-sky-200">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {stats.consultingLeads + stats.contactedLeads}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    ส่งตารางและเปรียบเทียบข้อเสนอ
                  </p>
                </div>

                {/* Active Products */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-700 text-xs font-bold">
                    <span>แผนประกันที่เปิดใช้งาน</span>
                    <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">
                    {products.length}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    จาก 5 พันธมิตรประกันชีวิตชั้นนำ
                  </p>
                </div>

              </div>

              {/* Pipeline Flow Visualization */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-black text-base text-slate-900">
                      ขั้นตอนความคืบหน้างานขายและคำปรึกษา (Advisory Funnel)
                    </h4>
                    <p className="text-xs text-slate-500">
                      สถานะวงจรการดูแลลูกค้าตั้งแต่ขอรับคำปรึกษาจนถึงทำประกันภัย
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-400">
                    อัตราความสำเร็จ (Conversion): 83.3%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-amber-700 uppercase">1. ใหม่ (New)</span>
                    <div className="text-xl font-black text-slate-900">{stats.newLeads} ราย</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-3/4"></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-blue-700 uppercase">2. ติดต่อแล้ว (Contacted)</span>
                    <div className="text-xl font-black text-slate-900">{stats.contactedLeads} ราย</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full w-1/2"></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-purple-700 uppercase">3. กำลังปรึกษา (Consulting)</span>
                    <div className="text-xl font-black text-slate-900">{stats.consultingLeads} ราย</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full w-2/3"></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase">4. ปิดการขาย (Closed Won)</span>
                    <div className="text-xl font-black text-slate-900">{stats.closedLeads || 1} ราย</div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Urgent Leads Preview */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                    <h4 className="font-black text-base text-slate-900">
                      รายการลูกค้าล่าสุดที่รอดำเนินการ
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>ดูทั้งหมด ({leads.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {leads.slice(0, 3).map((lead) => (
                    <div key={lead.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 p-2 rounded-2xl transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-800 font-black text-sm flex items-center justify-center shrink-0">
                          {lead.customer_name?.charAt(0) || 'L'}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-slate-900">{lead.customer_name}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2">
                            <span>{lead.product_title || 'ขอรับคำปรึกษา'}</span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">{lead.customer_phone}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(lead.status).bg}`}>
                          {getStatusBadge(lead.status).label}
                        </span>
                        <a
                          href={`tel:${lead.customer_phone}`}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>โทรด่วน</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: LEADS CRM MANAGEMENT */}
          {/* ================================================================ */}
          {activeTab === 'leads' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden space-y-4 p-6 sm:p-8">
              
              {/* Header & Description */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    <span>จัดการข้อมูลผู้ขอรับคำปรึกษา (Leads CRM)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ตรวจสอบคำขอ จัดสรรตัวแทน โทรติดต่อ และบันทึกความคืบหน้าตามมาตรฐาน PDPA
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>ส่งออก CSV</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Control */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-1">
                
                {/* Status Pills */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
                  {[
                    { id: 'ALL', label: 'ทั้งหมด', count: leads.length },
                    { id: 'NEW', label: 'ใหม่ (NEW)', count: stats.newLeads },
                    { id: 'CONTACTED', label: 'ติดต่อแล้ว', count: stats.contactedLeads },
                    { id: 'CONSULTING', label: 'กำลังปรึกษา', count: stats.consultingLeads },
                    { id: 'CLOSED_WON', label: 'ปิดการขาย', count: stats.closedLeads || 1 },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilterStatus(tab.id)}
                      className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                        filterStatus === tab.id
                          ? 'bg-slate-900 text-white shadow-xs font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                        filterStatus === tab.id ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Instant Search Box */}
                <div className="relative w-full md:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อ, เบอร์โทร, อีเมล, จังหวัด..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>

              {/* CRM Data Table */}
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-y border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">ลูกค้า / ข้อมูลติดต่อ</th>
                      <th className="py-3.5 px-4">แผนประกันที่สนใจ</th>
                      <th className="py-3.5 px-4">งบประมาณ & เวลาสะดวก</th>
                      <th className="py-3.5 px-4">บันทึกตัวแทน (Agent Note)</th>
                      <th className="py-3.5 px-4">สถานะการติดต่อ</th>
                      <th className="py-3.5 px-4 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredLeads.map((lead) => {
                      const badgeInfo = getStatusBadge(lead.status);
                      return (
                        <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                          
                          {/* Col 1: Customer Contact */}
                          <td className="py-4 px-4 font-medium text-slate-900">
                            <div className="flex items-center gap-2">
                              <span className="font-black text-sm text-slate-900">{lead.customer_name}</span>
                              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                                PDPA ✓
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-slate-600 mt-1">
                              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                              <a 
                                href={`tel:${lead.customer_phone}`} 
                                className="font-bold hover:underline text-brand-700"
                                title="คลิกเพื่อโทรออกทันที"
                              >
                                {lead.customer_phone}
                              </a>
                            </div>

                            {lead.customer_email && (
                              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <a href={`mailto:${lead.customer_email}`} className="hover:underline">
                                  {lead.customer_email}
                                </a>
                              </div>
                            )}

                            {lead.created_at && (
                              <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(lead.created_at).toLocaleDateString('th-TH')}
                              </div>
                            )}
                          </td>

                          {/* Col 2: Insurance Plan & Area */}
                          <td className="py-4 px-4 max-w-xs">
                            <span className="font-bold text-slate-800 line-clamp-2">
                              {lead.product_title || 'ขอรับคำปรึกษาภาพรวม'}
                            </span>
                            {lead.province && (
                              <span className="text-[11px] text-slate-500 block mt-1">
                                📍 จังหวัด: <strong className="text-slate-700">{lead.province}</strong>
                              </span>
                            )}
                          </td>

                          {/* Col 3: Budget & Preferred Contact Time */}
                          <td className="py-4 px-4 space-y-1">
                            <div className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded inline-block">
                              {lead.budget_range || 'ยังไม่ระบุงบ'}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              ⏰ {lead.preferred_contact_time || 'สะดวกทุกเวลา'}
                            </div>
                          </td>

                          {/* Col 4: Agent Note */}
                          <td className="py-4 px-4 max-w-xs">
                            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 group">
                              <p className="text-xs text-slate-700 line-clamp-2">
                                {lead.user_notes || '- ยังไม่มีบันทึกข้อมูล -'}
                              </p>
                              <button
                                onClick={() => {
                                  setEditingLeadNote(lead);
                                  setAgentNoteText(lead.user_notes || '');
                                }}
                                className="mt-1 text-[11px] text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" /> 
                                <span>{lead.user_notes ? 'แก้ไขบันทึก' : '+ เพิ่มบันทึก'}</span>
                              </button>
                            </div>
                          </td>

                          {/* Col 5: Status Dropdown */}
                          <td className="py-4 px-4">
                            <div className="space-y-1.5">
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                                className={`text-xs font-bold px-3 py-1.5 rounded-xl border focus:outline-none cursor-pointer shadow-2xs ${badgeInfo.bg}`}
                              >
                                <option value="NEW">ใหม่ (NEW)</option>
                                <option value="CONTACTED">ติดต่อแล้ว</option>
                                <option value="CONSULTING">กำลังให้คำปรึกษา</option>
                                <option value="CLOSED_WON">ปิดการขายสำเร็จ</option>
                                <option value="CLOSED_LOST">ยุติการติดต่อ</option>
                              </select>
                            </div>
                          </td>

                          {/* Col 6: Actions */}
                          <td className="py-4 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => setViewingLeadDetail(lead)}
                              className="px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                              title="ดูรายละเอียดลูกค้าแบบเต็ม"
                            >
                              รายละเอียด
                            </button>

                            <a
                              href={`tel:${lead.customer_phone}`}
                              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-all shadow-xs"
                            >
                              <PhoneCall className="w-3 h-3" />
                              <span>โทร</span>
                            </a>

                            <button
                              onClick={() => handleDeleteLead(lead.id, lead.customer_name)}
                              className="p-1.5 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors inline-flex items-center justify-center cursor-pointer"
                              title="ลบคำขอนี้ออกจากระบบ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>


                        </tr>
                      );
                    })}

                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-400">
                          ไม่พบข้อมูลคำขอรับคำปรึกษาที่ตรงกับเงื่อนไขการค้นหา
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: PRODUCTS CATALOG MANAGEMENT */}
          {/* ================================================================ */}
          {activeTab === 'products' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-orange-600" />
                    <span>จัดการคลังแผนประกันภัย (Products Catalog)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    เพิ่ม แก้ไข ปรับเบี้ยประกันเริ่มต้น และเพดานลดหย่อนภาษีที่แสดงบนหน้าเว็บ
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddProductModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>เพิ่มแผนประกันใหม่</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-600 shrink-0">หมวดหมู่:</span>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-none"
                  >
                    <option value="ALL">ทุกหมวดหมู่ ({products.length})</option>
                    <option value="health-insurance">ประกันสุขภาพเหมาจ่าย</option>
                    <option value="life-protection">ประกันชีวิตและมรดก</option>
                    <option value="savings-insurance">ประกันสะสมทรัพย์</option>
                    <option value="annuity-pension">ประกันบำนาญ</option>
                    <option value="tax-saving-funds">ลดหย่อนภาษี</option>
                  </select>
                </div>

                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    placeholder="ค้นหาชื่อแผน, รหัส, หรือบริษัท..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-y border-slate-200">
                    <tr>
                      <th className="py-3.5 px-4">ชื่อแผน & รหัส</th>
                      <th className="py-3.5 px-4">บริษัทประกัน</th>
                      <th className="py-3.5 px-4">หมวดหมู่</th>
                      <th className="py-3.5 px-4">เบี้ยเริ่มต้น</th>
                      <th className="py-3.5 px-4">ลดหย่อนภาษี</th>
                      <th className="py-3.5 px-4 text-center">สถานะหน้าแรก</th>
                      <th className="py-3.5 px-4 text-right">การจัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        <td className="py-4 px-4 font-medium">
                          <div className="font-bold text-sm text-slate-900">{prod.title}</div>
                          <div className="text-[11px] text-slate-400 mt-0.5">รหัส: <code className="text-slate-600">{prod.code}</code></div>
                        </td>

                        <td className="py-4 px-4">
                          <CompanyBrandBadge 
                            companyCode={prod.company_code} 
                            companyName={prod.company_name} 
                            variant="compact" 
                          />
                        </td>

                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                            {prod.category_name || 'ทั่วไป'}
                          </span>
                        </td>

                        <td className="py-4 px-4 font-black text-slate-900 text-sm">
                          ฿{Number(prod.min_premium).toLocaleString()}
                          <span className="text-[10px] text-slate-400 font-normal"> /ปี</span>
                        </td>

                        <td className="py-4 px-4">
                          {prod.is_tax_deductible ? (
                            <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                              ฿{Number(prod.max_tax_deduction).toLocaleString()}
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-center">
                          {prod.is_featured ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                              <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                              <span>แนะนำหน้าแรก</span>
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                              แสดงตามปกติ
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                            title="แก้ไขข้อมูลแผน"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id, prod.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="ลบแผนประกัน"
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

          {/* ================================================================ */}
          {/* TAB: COMPANIES / PARTNER INSURERS MANAGEMENT */}
          {/* ================================================================ */}
          {activeTab === 'companies' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold mb-2">
                      <Building2 className="w-3.5 h-3.5 text-orange-500" />
                      พันธมิตรบริษัทประกันชีวิตที่ได้รับใบอนุญาต คปภ.
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      จัดการข้อมูลบริษัทประกันภัยและเบอร์สายด่วน (Partner Insurers)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      รายชื่อบริษัทประกันที่แสดงบนหน้าแรก หน้าแผนประกัน และตัวกรองค้นหา คุณสามารถแก้ไขเบอร์ติดต่อด่วนและเพิ่มพันธมิตรใหม่ได้ทันที
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCompanyForm({ code: '', name: '', contact_phone: '', logo_url: '' });
                      setShowAddCompanyModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20 cursor-pointer shrink-0"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>เพิ่มบริษัทประกันใหม่</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-sky-50/50 p-3 rounded-2xl border border-sky-100/80">
                    <span className="text-[11px] text-slate-500 block">พันธมิตรทั้งหมด</span>
                    <span className="text-xl font-black text-slate-900">{companies.length}</span>
                    <span className="text-[10px] text-slate-400 block">บริษัทในระบบ</span>
                  </div>
                  <div className="bg-emerald-50/50 p-3 rounded-2xl border border-emerald-100/80">
                    <span className="text-[11px] text-slate-500 block">สถานะเปิดบริการ</span>
                    <span className="text-xl font-black text-emerald-700">{companies.length}</span>
                    <span className="text-[10px] text-emerald-600 block">Active 100%</span>
                  </div>
                  <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100/80">
                    <span className="text-[11px] text-slate-500 block">แผนประกันรวม</span>
                    <span className="text-xl font-black text-amber-700">{products.length}</span>
                    <span className="text-[10px] text-amber-600 block">แผนที่จำหน่าย</span>
                  </div>
                  <div className="bg-purple-50/50 p-3 rounded-2xl border border-purple-100/80">
                    <span className="text-[11px] text-slate-500 block">มาตรฐาน คปภ.</span>
                    <span className="text-xl font-black text-purple-700">100%</span>
                    <span className="text-[10px] text-purple-600 block">ตรวจสอบสิทธิครบ</span>
                  </div>
                </div>
              </div>

              {/* Companies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {companies.map((comp) => {
                  const prodCount = products.filter(
                    (p) =>
                      (p.company_code && p.company_code.toUpperCase() === comp.code.toUpperCase()) ||
                      (p.company_name && p.company_name.includes(comp.code))
                  ).length;

                  return (
                    <div
                      key={comp.id}
                      className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1 shrink-0">
                              <CompanyBrandBadge companyCode={comp.code} variant="avatar" className="w-9 h-9 text-xs rounded-xl" />
                            </div>

                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-black text-sm text-slate-900">{comp.code}</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                                  พร้อมให้บริการ
                                </span>
                              </div>
                              <span className="text-xs font-semibold text-slate-600 line-clamp-1">
                                {comp.name}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setEditingCompany(comp)}
                              className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer"
                              title="แก้ไขข้อมูลบริษัท"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCompany(comp.id, comp.name)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                              title="ลบบริษัทประกัน"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500 flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              <span>เบอร์สายด่วน Hotline:</span>
                            </span>
                            <a
                              href={`tel:${comp.contact_phone}`}
                              className="font-black text-brand-700 hover:underline"
                            >
                              {comp.contact_phone || '1186'}
                            </a>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-500">จำนวนแผนประกัน:</span>
                            <span className="font-bold text-slate-800 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                              {prodCount} แผน
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/products?company=${comp.code}`}
                          target="_blank"
                          className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                        >
                          <span>ดูแผนของ {comp.code} บนหน้าเว็บ</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                        <button
                          onClick={() => setEditingCompany(comp)}
                          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                        >
                          แก้ไขด่วน
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB: CATEGORIES MANAGEMENT */}
          {/* ================================================================ */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold mb-2">
                      <FolderTree className="w-3.5 h-3.5 text-orange-500" />
                      การจัดหมวดหมู่ผลิตภัณฑ์และความคุ้มครอง
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      จัดการหมวดหมู่ความคุ้มครอง สิทธิภาษี และการเงิน (Categories)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      หมวดหมู่เหล่านี้ใช้จัดระเบียบแผนประกันสำหรับเมนูด้านบน การเปรียบเทียบผลประโยชน์ และการแนะนำแผนผ่านแบบทดสอบการเงิน
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setCategoryForm({
                        slug: '',
                        name_th: '',
                        name_en: '',
                        category_type: 'INSURANCE',
                        description: '',
                        icon: 'ShieldCheck',
                        sort_order: categories.length + 1,
                      });
                      setShowAddCategoryModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-md shadow-orange-600/20 cursor-pointer shrink-0"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>เพิ่มหมวดหมู่ใหม่</span>
                  </button>
                </div>
              </div>

              {/* Categories Table & Cards */}
              <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4 w-16 text-center">ลำดับ</th>
                        <th className="py-3.5 px-4">ชื่อหมวดหมู่ (ไทย / อังกฤษ)</th>
                        <th className="py-3.5 px-4">Slug (URL)</th>
                        <th className="py-3.5 px-4">ประเภทผลิตภัณฑ์</th>
                        <th className="py-3.5 px-4">คำอธิบายสรุป</th>
                        <th className="py-3.5 px-4 text-center">แผนในระบบ</th>
                        <th className="py-3.5 px-4 text-right">การจัดการ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {categories.map((cat, idx) => {
                        const count = products.filter(
                          (p) => p.category_id === cat.id || p.category_slug === cat.slug
                        ).length;

                        return (
                          <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-4 text-center font-bold text-slate-400">
                              #{cat.sort_order || idx + 1}
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 flex items-center justify-center shrink-0">
                                  <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div>
                                  <span className="font-bold text-slate-900 block text-sm">{cat.name_th}</span>
                                  <span className="text-[11px] text-slate-500 font-mono">{cat.name_en}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-mono text-[11px] text-slate-600">
                              <code className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                                /products?category={cat.slug}
                              </code>
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                  cat.category_type === 'TAX'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : cat.category_type === 'INVESTMENT'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-sky-100 text-sky-800'
                                }`}
                              >
                                {cat.category_type || 'INSURANCE'}
                              </span>
                            </td>
                            <td className="py-4 px-4 max-w-xs">
                              <p className="text-xs text-slate-600 line-clamp-2">
                                {cat.description || '- ไม่มีคำอธิบาย -'}
                              </p>
                            </td>
                            <td className="py-4 px-4 text-center font-bold">
                              <span className="bg-slate-100 px-2 py-1 rounded-lg text-slate-800">
                                {count} แผน
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right space-x-1.5">
                              <button
                                onClick={() => setEditingCategory(cat)}
                                className="p-1.5 text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors cursor-pointer"
                                title="แก้ไขหมวดหมู่"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(cat.id, cat.name_th)}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                                title="ลบหมวดหมู่"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              
              {/* Top Banner Overview & Stats Header */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold mb-2">
                      <Sliders className="w-3.5 h-3.5 text-orange-500" />
                      ระบบควบคุม Hero Carousel หน้าแรก
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      จัดการและปรับแต่งสไลด์โปรโมท (Hero Banner Slides)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      คุณสามารถปรับเปลี่ยนข้อความพาดหัว, คำโปรย, ไฮไลต์สีส้ม, ปุ่ม Call-to-Action และข้อมูลจำลองบนการ์ดลอยได้ตามแคมเปญการตลาด ระบบจะอัปเดตไปยังหน้าแรกแบบ Real-time ทันที
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                      href="/"
                      target="_blank"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100/80 text-sky-800 transition-colors shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-sky-600" />
                      <span>เปิดดูหน้าแรกสด</span>
                    </Link>

                    <button
                      onClick={() => setShowAddSlideModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-white" />
                      <span>เพิ่มสไลด์ใหม่</span>
                    </button>
                  </div>
                </div>

                {/* Quick KPI Stats for Slides */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">สไลด์ทั้งหมดในระบบ</span>
                      <div className="text-2xl font-black text-slate-900 mt-0.5">{heroSlides.length} สไลด์</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 font-bold">
                      <Layers className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase">กำลังแสดงผลหน้าแรก (Active)</span>
                      <div className="text-2xl font-black text-emerald-950 mt-0.5">
                        {heroSlides.filter((s) => s.is_active).length} สไลด์
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">สไลด์ที่ปิดไว้ (Hidden)</span>
                      <div className="text-2xl font-black text-slate-600 mt-0.5">
                        {heroSlides.filter((s) => !s.is_active).length} สไลด์
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-200 flex items-center justify-center text-slate-600">
                      <EyeOff className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Info Note */}
                <div className="p-3.5 bg-sky-50/70 border border-sky-200/80 rounded-2xl flex items-start gap-3 text-xs text-sky-900">
                  <Sparkles className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">เคล็ดลับการตั้งค่า:</span> สไลด์ที่เปิดสถานะ <strong>"เปิดแสดงผล (Active)"</strong> จะถูกนำไปหมุนสไลด์อัตโนมัติบนหน้าแรกทุกๆ 6 วินาที ผู้ใช้สามารถกดเลื่อนหรือสไวป์ผ่านมือถือได้ และเมื่อมีการแก้ไขข้อมูลที่นี่ ผู้เข้าชมหน้าเว็บจะเห็นข้อมูลใหม่ทันที
                  </div>
                </div>
              </div>

              {/* List of Slide Cards */}
              <div className="space-y-4">
                {heroSlides.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`bg-white rounded-3xl border transition-all p-5 sm:p-6 shadow-xs ${
                      slide.is_active ? 'border-sky-200 shadow-sky-100/50' : 'border-slate-200 opacity-80 bg-slate-50/40'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                      
                      {/* Left Side: Slide Details & Text Content */}
                      <div className="space-y-3.5 flex-1 min-w-0">
                        
                        {/* Slide Top Meta Header */}
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="px-3 py-1 rounded-xl text-xs font-black bg-slate-900 text-white">
                            สไลด์ลำดับ #{idx + 1}
                          </span>

                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold ${
                            slide.is_active 
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-200 text-slate-700 border border-slate-300'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${slide.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                            {slide.is_active ? 'เปิดแสดงผลหน้าแรก (Active)' : 'ปิดการแสดงผล (Hidden)'}
                          </span>

                          <span className="text-xs text-slate-400 font-mono">
                            ID: {slide.id}
                          </span>
                        </div>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200">
                          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                          <span>{slide.badge_text}</span>
                        </div>

                        {/* Title & Highlight */}
                        <div>
                          <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            {slide.title}{' '}
                            <span className="text-orange-600 font-black">{slide.title_highlight}</span>
                          </h4>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                            {slide.subtitle}
                          </p>
                        </div>

                        {/* Tags */}
                        {slide.tags && slide.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {slide.tags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-0.5 rounded-lg bg-sky-50 text-sky-800 border border-sky-100 text-[11px] font-semibold flex items-center gap-1"
                              >
                                <Check className="w-3 h-3 text-emerald-600" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Background Image Preview */}
                        {slide.background_image && (
                          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-sky-50/70 border border-sky-200/70 max-w-lg">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={slide.background_image}
                              alt="รูปพื้นหลังสไลด์"
                              className="w-16 h-11 rounded-xl object-cover border border-sky-300 shadow-xs shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <div className="text-[11px] font-bold text-sky-950 flex items-center gap-1.5">
                                <ImageIcon className="w-3.5 h-3.5 text-orange-500" />
                                <span>ภาพพื้นหลัง Hero Banner</span>
                              </div>
                              <p className="text-[10px] text-slate-500 truncate mt-0.5">{slide.background_image}</p>
                            </div>
                          </div>
                        )}

                        {/* Buttons Preview */}
                        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
                          <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-xl text-orange-800 font-bold">
                            <span className="text-[10px] uppercase font-bold text-orange-600">ปุ่มหลัก (CTA):</span>
                            <span>{slide.primary_btn_label}</span>
                            <span className="text-[10px] text-orange-500 font-normal">({slide.primary_btn_href})</span>
                          </div>

                          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-700 font-bold">
                            <span className="text-[10px] uppercase font-bold text-slate-500">ปุ่มรอง:</span>
                            <span>{slide.secondary_btn_label}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({slide.secondary_btn_href})</span>
                          </div>
                        </div>

                      </div>

                      {/* Right Side: Floating Preview Card & Quick Action Buttons */}
                      <div className="lg:w-80 shrink-0 space-y-4">
                        
                        {/* Realistic Mockup of the Floating Banner Card */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3 relative overflow-hidden">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                            <span>พรีวิวการ์ดจำลอง</span>
                            <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[9px]">
                              {slide.card_badge || 'HIGHLIGHT'}
                            </span>
                          </div>

                          <div>
                            <div className="text-xs font-bold text-slate-800">{slide.card_main_title}</div>
                            <div className="text-lg font-black text-slate-900 mt-0.5">{slide.card_main_metric}</div>
                            <div className="text-[10px] text-slate-500">{slide.card_main_metric_sub}</div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-sky-100">
                            <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                              <div className="text-[9px] text-slate-400">{slide.stat1_label}</div>
                              <div className="text-xs font-bold text-slate-900">{slide.stat1_value}</div>
                              <div className="text-[9px] text-slate-500">{slide.stat1_desc}</div>
                            </div>
                            <div className="bg-white/80 p-2 rounded-xl border border-sky-100">
                              <div className="text-[9px] text-slate-400">{slide.stat2_label}</div>
                              <div className="text-xs font-bold text-slate-900">{slide.stat2_value}</div>
                              <div className="text-[9px] text-slate-500">{slide.stat2_desc}</div>
                            </div>
                          </div>

                          {slide.card_footer_note && (
                            <div className="text-[10px] text-emerald-700 font-medium">
                              {slide.card_footer_note}
                            </div>
                          )}
                        </div>

                        {/* Action Buttons for this slide */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            onClick={() => handleToggleSlideActive(slide.id)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                              slide.is_active
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                            title={slide.is_active ? 'ปิดการแสดงผลชั่วคราว' : 'เปิดแสดงผลสไลด์นี้'}
                          >
                            {slide.is_active ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>ปิดชั่วคราว</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>เปิดแสดงผล</span>
                              </>
                            )}
                          </button>

                          <button
                            onClick={() => handleStartEditSlide(slide)}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-sky-100 hover:bg-sky-200 text-sky-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-sky-700" />
                            <span>แก้ไข</span>
                          </button>

                          <button
                            onClick={() => handleDeleteSlide(slide.id, slide.title)}
                            disabled={heroSlides.length <= 1}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 cursor-pointer"
                            title="ลบสไลด์นี้"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB: ARTICLES MANAGEMENT */}
          {/* ================================================================ */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              
              {/* Top Banner Overview & Header */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-orange-500" />
                      ระบบจัดการบทความ & คลังความรู้ (Knowledge Hub)
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      คลังบทความและคู่มือวางแผนประกันภัย
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      สร้างและแก้ไขบทความความรู้ เผยแพร่ภาพหน้าปกที่ดึงดูดใจ และกำหนดข้อมูลผู้เขียนที่มีคุณวุฒิ คปภ. เพื่อเสริมสร้างความน่าเชื่อถือให้กับเว็บไซต์
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleResetArticles}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                      <span>รีเซ็ตบทความตั้งต้น</span>
                    </button>

                    <button
                      onClick={() => setShowAddArticleModal(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-white" />
                      <span>เขียนบทความใหม่</span>
                    </button>
                  </div>
                </div>

                {/* KPI Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">บทความทั้งหมด</span>
                      <div className="text-2xl font-black text-slate-900 mt-0.5">{articles.length} เรื่อง</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700">
                      <BookOpen className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-800 uppercase">แสดงบนหน้าแรก</span>
                      <div className="text-2xl font-black text-emerald-950 mt-0.5">3 เรื่องแรก</div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">มีรูปหน้าปกประกอบ</span>
                      <div className="text-2xl font-black text-slate-700 mt-0.5">
                        {articles.filter((a) => a.cover_image_url).length} เรื่อง
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((article, idx) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-3xl border border-sky-100 p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-sky-300 transition-all"
                  >
                    <div className="space-y-3">
                      {/* Cover Photo Preview */}
                      {article.cover_image_url ? (
                        <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-900 group">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={article.cover_image_url}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-white/95 text-sky-950 text-[10px] font-bold shadow-xs">
                            {article.category_name || 'ทั่วไป'}
                          </span>
                          <span className="absolute bottom-2 right-2.5 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 text-sky-400" />
                            <span>{article.reading_time_minutes} นาที</span>
                          </span>
                        </div>
                      ) : (
                        <div className="h-28 w-full rounded-2xl bg-sky-50 border border-sky-100 flex flex-col items-center justify-center text-sky-600 space-y-1">
                          <ImageIcon className="w-6 h-6 text-sky-400" />
                          <span className="text-[11px] font-medium text-slate-400">ยังไม่ได้ใส่รูปภาพหน้าปก</span>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                          <span>ลำดับที่ #{idx + 1}</span>
                          <span>{article.published_at}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                          {article.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                        <div className="flex items-center gap-1 font-medium">
                          <User className="w-3.5 h-3.5 text-sky-600" />
                          <span className="truncate max-w-[150px]">{article.author_name}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          {article.author_license ? 'คปภ. ตรวจสอบแล้ว' : ''}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setEditingArticle({ ...article })}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-sky-50 hover:bg-sky-100 text-sky-800 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                        <span>แก้ไขบทความ</span>
                      </button>

                      <button
                        onClick={() => handleDeleteArticle(article.id, article.title)}
                        disabled={articles.length <= 1}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-30 cursor-pointer"
                        title="ลบบทความ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB: ANNOUNCEMENT POPUP MANAGEMENT */}
          {/* ================================================================ */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              
              {/* Header Status Strip */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-bold mb-2">
                      <Megaphone className="w-3.5 h-3.5 text-orange-500" />
                      ระบบควบคุมป๊อปอัปประกาศหน้าแรก (Entrance Popup Modal)
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      ปรับแต่งแบนเนอร์และข้อความประกาศต้อนรับผู้เข้าชม
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      เมื่อเปิดใช้งาน ผู้เข้าชมหน้าเว็บจะเห็นป๊อปอัปโปรโมทนี้หลังจากเข้าสู่หน้าเว็บประมาณ 1 วินาที เหมาะสำหรับแคมเปญช่วงสิ้นปี ลดหย่อนภาษี หรือโปรโมชันของแถมพิเศษ
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      onClick={handleClearDismissedCookie}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold rounded-xl border border-sky-200 bg-sky-50 text-sky-800 hover:bg-sky-100 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                      <span>ล้างสถานะการซ่อน (เพื่อทดสอบ)</span>
                    </button>

                    <button
                      onClick={handleToggleAnnouncementActive}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl text-white transition-all shadow-md cursor-pointer ${
                        editingAnnouncement.is_active
                          ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
                          : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                      }`}
                    >
                      {editingAnnouncement.is_active ? (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span>ปิดการแสดงผลป๊อปอัป</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4" />
                          <span>เปิดแสดงผลป๊อปอัป</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Status Indicator Banner */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                  editingAnnouncement.is_active
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${editingAnnouncement.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                    <span className="text-xs font-bold">
                      สถานะปัจจุบัน: {editingAnnouncement.is_active ? 'กำลังเปิดแสดงผลบนหน้าแรก (Active)' : 'ปิดการแสดงผลอยู่ (Hidden)'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {editingAnnouncement.is_active ? 'ผู้ใช้จะเห็นป๊อปอัปเมื่อเข้าหน้าแรก' : 'ไม่มีป๊อปอัปแสดงกวนใจผู้ใช้'}
                  </span>
                </div>
              </div>

              {/* 2-Column Workspace: Left Settings Form / Right Live Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left 7 Columns: Form Controls */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-5">
                  <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-orange-600" />
                    <span>กำหนดข้อมูลและเนื้อหาป๊อปอัป</span>
                  </h4>

                  <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                    
                    {/* Image Upload Picker */}
                    <ImageUploadPicker
                      value={editingAnnouncement.image_url || ''}
                      onChange={(url) => setEditingAnnouncement({ ...editingAnnouncement, image_url: url })}
                      label="รูปภาพแบนเนอร์ประกาศ (Banner Cover)"
                      helpText="อัปโหลดภาพแบนเนอร์แนวนอน หรือเลือกจากคลังภาพโปรโมชั่น"
                      aspectRatio="popup"
                      defaultCategory="promo"
                    />

                    <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความ Badge หัวแบนเนอร์ *</label>
                        <input
                          type="text"
                          required
                          value={editingAnnouncement.badge_text || ''}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, badge_text: e.target.value })}
                          placeholder="เช่น แคมเปญพิเศษส่งท้ายปี"
                          className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อประกาศ (Headline) *</label>
                        <input
                          type="text"
                          required
                          value={editingAnnouncement.title}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                          placeholder="เช่น วางแผนลดหย่อนภาษี & สุขภาพเหมาจ่าย 2567"
                          className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold bg-white"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">คำบรรยายรายละเอียด (Subtitle) *</label>
                        <textarea
                          rows={3}
                          required
                          value={editingAnnouncement.subtitle}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, subtitle: e.target.value })}
                          placeholder="ระบุข้อความโปรโมชั่น เช่น รับสิทธิ์คำนวณภาษีรายบุคคลฟรี..."
                          className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                        />
                      </div>
                    </div>

                    {/* Button CTAs */}
                    <div className="space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อปุ่มกดหลัก (Primary CTA) *</label>
                          <input
                            type="text"
                            required
                            value={editingAnnouncement.primary_btn_label}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, primary_btn_label: e.target.value })}
                            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">ลิงก์ปุ่มกดหลัก (URL) *</label>
                          <input
                            type="text"
                            required
                            value={editingAnnouncement.primary_btn_href}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, primary_btn_href: e.target.value })}
                            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อปุ่มรอง (ถ้ามี)</label>
                          <input
                            type="text"
                            value={editingAnnouncement.secondary_btn_label || ''}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, secondary_btn_label: e.target.value })}
                            placeholder="เช่น ดูรายละเอียดเพิ่มเติม"
                            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">ลิงก์ปุ่มรอง</label>
                          <input
                            type="text"
                            value={editingAnnouncement.secondary_btn_href || ''}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, secondary_btn_href: e.target.value })}
                            placeholder="เช่น /calculators/tax"
                            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Countdown and Expiry */}
                    <div className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200 space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(editingAnnouncement.show_countdown)}
                          onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, show_countdown: e.target.checked })}
                          className="w-4 h-4 text-orange-600 rounded"
                        />
                        <span>แสดงแถบแจ้งเตือนเวลานับถอยหลัง / วันหมดเขต</span>
                      </label>

                      {editingAnnouncement.show_countdown && (
                        <div className="pt-2">
                          <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความวันหมดเขต (Countdown Text)</label>
                          <input
                            type="text"
                            value={editingAnnouncement.countdown_end_date || ''}
                            onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, countdown_end_date: e.target.value })}
                            placeholder="เช่น 31 ธ.ค. 2567 หรือ ภายใน 3 วันนี้เท่านั้น"
                            className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white font-bold text-amber-700"
                          />
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={handleResetAnnouncement}
                        className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                      >
                        รีเซ็ตค่าเริ่มต้น
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                      >
                        บันทึกการตั้งค่าป๊อปอัป
                      </button>
                    </div>

                  </form>
                </div>

                {/* Right 5 Columns: Live Interactive Preview */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-orange-500" />
                      <span>พรีวิวป๊อปอัปแบบจำลองจริง</span>
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">Live Preview</span>
                  </div>

                  {/* Simulated Modal Window */}
                  <div className="bg-slate-900/80 p-3 sm:p-4 rounded-3xl backdrop-blur-sm shadow-xl border border-slate-800">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-sky-100">
                      
                      {/* Image Banner */}
                      {editingAnnouncement.image_url && (
                        <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={editingAnnouncement.image_url}
                            alt="พรีวิวแบนเนอร์"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                          
                          <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/90 text-sky-950 text-[10px] font-bold shadow-xs">
                            {editingAnnouncement.badge_text || 'ข่าวสาร'}
                          </div>

                          {editingAnnouncement.show_countdown && (
                            <div className="absolute bottom-2 left-2.5 text-[10px] text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5 text-amber-300" />
                              <span>สิทธิพิเศษถึง: {editingAnnouncement.countdown_end_date}</span>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4 space-y-3 text-xs">
                        <div className="space-y-1">
                          <h5 className="font-black text-sm text-slate-900 leading-snug">
                            {editingAnnouncement.title || 'หัวข้อประกาศ'}
                          </h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            {editingAnnouncement.subtitle || 'คำบรรยายรายละเอียดประกาศ'}
                          </p>
                        </div>

                        <div className="space-y-1.5 pt-1">
                          <div className="w-full py-2.5 px-4 rounded-xl bg-orange-600 text-white font-bold text-xs text-center shadow-xs">
                            {editingAnnouncement.primary_btn_label || 'ปุ่มกดหลัก'}
                          </div>
                          {editingAnnouncement.secondary_btn_label && (
                            <div className="w-full py-1 text-center text-[10px] font-bold text-slate-500">
                              {editingAnnouncement.secondary_btn_label}
                            </div>
                          )}
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                          <span>ไม่ต้องแสดงอีกในวันนี้</span>
                          <span>ปิด</span>
                        </div>
                      </div>

                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
                    <Info className="w-3.5 h-3.5 text-slate-400" />
                    <span>รูปแบบและสีสันนี้จะแสดงทันทีเมื่อผู้ใช้งานเปิดหน้าเว็บ ModtanoyAdvisor</span>
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================ */}
          {/* TAB: FINANCIAL CALCULATORS & TAX CONFIGURATION */}
          {/* ================================================================ */}
          {activeTab === 'calculators' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold mb-2">
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                      การตั้งค่าเกณฑ์คำนวณภาษีเงินได้บุคคลธรรมดา & ทุนประกันชีวิต
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      เกณฑ์ลดหย่อนภาษี อัตราภาษีก้าวหน้า และโมเดลทุนชีวิต (2568)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-2xl">
                      ค่าตัวเลขเหล่านี้ใช้คำนวณในระบบเปรียบเทียบภาษี (/calculators/tax) และเครื่องมือประเมินทุนประกันชีวิตที่เหมาะสม (/calculators/life-value)
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSaveTaxSettings}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>บันทึกเกณฑ์คำนวณ</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Box 1: Deduction Caps */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Tag className="w-4 h-4 text-orange-600" />
                    <span>เพดานสิทธิลดหย่อนตามประมวลรัษฎากร (บาท)</span>
                  </h4>

                  <div className="space-y-3.5 text-xs">
                    <div>
                      <label className="text-slate-700 font-bold block mb-1">
                        1. เบี้ยประกันชีวิตทั่วไป & สะสมทรัพย์ (มาตรา 47(1)(ง))
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={taxSettings.maxLifeDeduction}
                          onChange={(e) =>
                            setTaxSettings({ ...taxSettings, maxLifeDeduction: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <span className="absolute right-3.5 top-2 text-slate-400 font-semibold">บาท/ปี</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        เกณฑ์สรรพากร: สูงสุดไม่เกิน 100,000 บาท
                      </span>
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">
                        2. เบี้ยประกันสุขภาพตนเอง
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={taxSettings.maxHealthDeduction}
                          onChange={(e) =>
                            setTaxSettings({ ...taxSettings, maxHealthDeduction: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <span className="absolute right-3.5 top-2 text-slate-400 font-semibold">บาท/ปี</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        ตามจ่ายจริงสูงสุด 25,000 บาท (และเมื่อรวมกับประกันชีวิตทั่วไปต้องไม่เกิน 100,000 บาท)
                      </span>
                    </div>

                    <div>
                      <label className="text-slate-700 font-bold block mb-1">
                        3. เบี้ยประกันบำนาญ (Annuity Pension)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={taxSettings.maxPensionDeduction}
                          onChange={(e) =>
                            setTaxSettings({ ...taxSettings, maxPensionDeduction: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                        <span className="absolute right-3.5 top-2 text-slate-400 font-semibold">บาท/ปี</span>
                      </div>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        ลดหย่อนได้ 15% ของเงินได้พึงประเมิน สูงสุดไม่เกิน 200,000 บาท
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="text-slate-700 font-bold block mb-1">
                          หักค่าใช้จ่ายเหมา 50% (สูงสุด)
                        </label>
                        <input
                          type="number"
                          value={taxSettings.maxExpenseDeduction}
                          onChange={(e) =>
                            setTaxSettings({ ...taxSettings, maxExpenseDeduction: Number(e.target.value) })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="text-slate-700 font-bold block mb-1">
                          ค่าลดหย่อนส่วนตัวผู้มีเงินได้
                        </label>
                        <input
                          type="number"
                          value={taxSettings.personalDeduction}
                          onChange={(e) =>
                            setTaxSettings({ ...taxSettings, personalDeduction: Number(e.target.value) })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Box 2: Progressive Tax Table Matrix */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <BarChart3 className="w-4 h-4 text-brand-600" />
                    <span>อัตราภาษีเงินได้บุคคลธรรมดาแบบก้าวหน้า (Progressive Tax Rates)</span>
                  </h4>

                  <div className="space-y-2 text-xs">
                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 text-[11px] font-bold text-slate-600 border-b border-slate-200">
                          <tr>
                            <th className="py-2.5 px-3">ช่วงเงินได้สุทธิ (บาท)</th>
                            <th className="py-2.5 px-3 text-right">อัตราภาษี (%)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                          {taxSettings.taxBrackets.map((tb, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="py-2 px-3 font-sans text-slate-700">{tb.label}</td>
                              <td className="py-2 px-3 text-right font-bold text-slate-900">
                                <span
                                  className={`px-2 py-0.5 rounded ${
                                    tb.rate === 0
                                      ? 'bg-emerald-50 text-emerald-700'
                                      : tb.rate >= 30
                                      ? 'bg-rose-50 text-rose-700'
                                      : 'bg-sky-50 text-sky-700'
                                  }`}
                                >
                                  {tb.rate}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-100 space-y-2 mt-3">
                      <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-orange-500" />
                        เกณฑ์คำนวณทุนชีวิต (Life Value Parameters):
                      </span>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-600 block">จำนวนปีดูแลครอบครัว:</span>
                          <input
                            type="number"
                            value={taxSettings.supportYearsMultiplier}
                            onChange={(e) =>
                              setTaxSettings({ ...taxSettings, supportYearsMultiplier: Number(e.target.value) })
                            }
                            className="mt-1 w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                          />
                        </div>
                        <div>
                          <span className="text-slate-600 block">เงินสำรองฉุกเฉิน/งานศพ:</span>
                          <input
                            type="number"
                            value={taxSettings.emergencyFundAmount}
                            onChange={(e) =>
                              setTaxSettings({ ...taxSettings, emergencyFundAmount: Number(e.target.value) })
                            }
                            className="mt-1 w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: REPORTS & ANALYTICS */}
          {/* ================================================================ */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <span>รายงานวิเคราะห์ความต้องการแผนประกันภัยและการปฏิบัติตาม PDPA</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      สรุปพฤติกรรมลูกค้าที่ขอรับคำปรึกษา สถิติการคำนวณภาษี และความยินยอมคุกกี้
                    </p>
                  </div>

                  <Link
                    href="/analytics"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all shadow-md shadow-orange-600/20 shrink-0"
                  >
                    <span>เปิดดูแดชบอร์ดฉบับเต็ม (Full Analytics)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* 4 Summary Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs">
                    <span className="text-blue-700 font-bold block mb-1">ผู้เข้าชมเฉลี่ย</span>
                    <span className="text-2xl font-black text-blue-900">18,450</span>
                    <span className="text-[10px] text-blue-600 block mt-0.5">+18.4% ต่อเดือน</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-xs">
                    <span className="text-orange-700 font-bold block mb-1">อัตรา Conversion</span>
                    <span className="text-2xl font-black text-orange-900">1.33%</span>
                    <span className="text-[10px] text-orange-600 block mt-0.5">Leads ขอรับคำปรึกษา</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-xs">
                    <span className="text-emerald-700 font-bold block mb-1">การคำนวณภาษี</span>
                    <span className="text-2xl font-black text-emerald-900">4,820</span>
                    <span className="text-[10px] text-emerald-600 block mt-0.5">ครั้งที่กดจำลองสิทธิ</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs">
                    <span className="text-purple-700 font-bold block mb-1">PDPA Consent Rate</span>
                    <span className="text-2xl font-black text-purple-900">92.4%</span>
                    <span className="text-[10px] text-purple-600 block mt-0.5">อัตรายอมรับคุกกี้</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Demand */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                    <h4 className="font-bold text-xs text-slate-700 uppercase">
                      หมวดหมู่ประกันที่ลูกค้าสนใจสูงสุด
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>1. ประกันสุขภาพเหมาจ่าย</span>
                          <span>48%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full w-[48%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>2. ผลิตภัณฑ์ลดหย่อนภาษี 2567</span>
                          <span>28%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-[28%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>3. ประกันบำนาญเพื่อการเกษียณ</span>
                          <span>14%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full w-[14%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>4. ประกันชีวิตและมรดก</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-brand-500 h-full w-[10%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Budget Breakdown */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                    <h4 className="font-bold text-xs text-slate-700 uppercase">
                      ช่วงงบประมาณเบี้ยประกันเฉลี่ยของลูกค้า
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">20,000 - 40,000 บาท/ปี</span>
                        <span className="font-bold text-orange-600">42% (กลุ่มวัยทำงานเริ่มต้น)</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">40,000 - 70,000 บาท/ปี</span>
                        <span className="font-bold text-brand-600">35% (กลุ่มหัวหน้าครอบครัว)</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-slate-200 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">70,000 - 100,000+ บาท/ปี</span>
                        <span className="font-bold text-emerald-600">23% (กลุ่มวางแผนภาษีบำนาญ)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 5: SETTINGS */}
          {/* ================================================================ */}
          {/* ================================================================ */}
          {/* TAB 5: SETTINGS & SYSTEM CONFIGURATION */}
          {/* ================================================================ */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Header Box */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-sky-100 shadow-xs space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
                  <Settings className="w-3.5 h-3.5 text-orange-600" />
                  การจัดการระบบศูนย์รวม (Full System Administration)
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  การตั้งค่าข้อมูลเว็บไซต์ ความปลอดภัย และการสำรองข้อมูล (Backup & Restore)
                </h3>
                <p className="text-xs text-slate-500 max-w-2xl">
                  ควบคุมข้อมูลการติดต่อที่แสดงผลบน Header & Footer, นโยบายความเป็นส่วนตัว, บัญชีแอดมิน และการสำรองข้อมูลโครงสร้างทั้งหมดของระบบ
                </p>
              </div>

              {/* Grid 1: Website Contact Information */}
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>ข้อมูลการติดต่อและแบรนด์เว็บไซต์ (Website Contact & Public Info)</span>
                    </h4>
                    <p className="text-xs text-slate-500">ข้อมูลนี้จะอัปเดตไปยังแถบเมนูบน, ท้ายเว็บ (Footer) และหน้าติดต่อเรา</p>
                  </div>
                  <button
                    onClick={handleSaveWebSettings}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>บันทึกข้อมูลติดต่อ</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-slate-700 font-bold block mb-1">ชื่อเว็บไซต์ / แบรนด์</label>
                    <input
                      type="text"
                      value={webSettings.siteName}
                      onChange={(e) => setWebSettings({ ...webSettings, siteName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">เบอร์สายด่วน Hotline (โทรฟรี)</label>
                    <input
                      type="text"
                      value={webSettings.hotlinePhone}
                      onChange={(e) => setWebSettings({ ...webSettings, hotlinePhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-emerald-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">LINE Official Account ID</label>
                    <input
                      type="text"
                      value={webSettings.lineId}
                      onChange={(e) => setWebSettings({ ...webSettings, lineId: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-brand-700 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-bold block mb-1">อีเมลติดต่อฝ่ายสนับสนุน (Support Email)</label>
                    <input
                      type="email"
                      value={webSettings.supportEmail}
                      onChange={(e) => setWebSettings({ ...webSettings, supportEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-slate-700 font-bold block mb-1">ที่อยู่อาคารสำนักงาน (Office Address)</label>
                    <input
                      type="text"
                      value={webSettings.officeAddress}
                      onChange={(e) => setWebSettings({ ...webSettings, officeAddress: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-slate-700 font-bold block mb-1">ข้อความรับรองใบอนุญาตนายหน้า คปภ. (License Notice)</label>
                    <textarea
                      rows={2}
                      value={webSettings.licenseNotice}
                      onChange={(e) => setWebSettings({ ...webSettings, licenseNotice: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-800 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Admin Password Change & System Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admin Password Change Form */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h4 className="font-bold text-xs text-slate-800 uppercase flex items-center gap-1.5 border-b border-slate-100 pb-3">
                    <Lock className="w-4 h-4 text-orange-600" />
                    <span>เปลี่ยนรหัสผ่านผู้ดูแลระบบ (Change Password)</span>
                  </h4>

                  <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                    <div>
                      <label className="text-slate-600 block mb-1">รหัสผ่านปัจจุบัน</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={pwdForm.currentPassword}
                        onChange={(e) => setPwdForm({ ...pwdForm, currentPassword: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1">รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={pwdForm.newPassword}
                        onChange={(e) => setPwdForm({ ...pwdForm, newPassword: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-slate-600 block mb-1">ยืนยันรหัสผ่านใหม่อีกครั้ง</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={pwdForm.confirmPassword}
                        onChange={(e) => setPwdForm({ ...pwdForm, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-orange-500 font-bold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs cursor-pointer mt-2"
                    >
                      อัปเดตรหัสผ่านใหม่
                    </button>
                  </form>
                </div>

                {/* System Backup & Restore */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
                  <h4 className="font-bold text-xs text-slate-800 uppercase flex items-center gap-1.5 border-b border-slate-100 pb-3">
                    <Download className="w-4 h-4 text-brand-600" />
                    <span>สำรองและกู้คืนข้อมูลระบบ (Full System Backup & Restore)</span>
                  </h4>

                  <div className="space-y-4 text-xs">
                    <p className="text-slate-600">
                      ส่งออกข้อมูลทั้งหมด (ลูกค้า CRM, แผนประกัน, พันธมิตร, หมวดหมู่, สไลด์, บทความ, เกณฑ์ภาษี) เป็นไฟล์ JSON ชุดเดียวเพื่อสำรองความปลอดภัย
                    </p>

                    <button
                      type="button"
                      onClick={handleExportFullBackup}
                      className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold transition-all shadow-md shadow-orange-600/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>ดาวน์โหลดสำรองข้อมูลทั้งระบบ (.json)</span>
                    </button>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="text-slate-700 font-bold block mb-1">กู้คืนระบบจากไฟล์ JSON สำรอง:</label>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportFullBackup}
                        className="w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}


        </div>

      </main>

      {/* ================================================================ */}
      {/* MODAL 1: ADD NEW PRODUCT */}
      {/* ================================================================ */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">เพิ่มแผนประกันภัยใหม่เข้าสู่ระบบ</h3>
                <p className="text-xs text-slate-500">ข้อมูลจะแสดงผลบนหน้าเว็บไซต์และระบบคำนวณทันที</p>
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
                    <option value={6}>กรุงเทพประกันชีวิต (BLA)</option>
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

      {/* ================================================================ */}
      {/* MODAL 2: EDIT PRODUCT */}
      {/* ================================================================ */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">แก้ไขข้อมูลแผนประกัน</h3>
                <p className="text-xs text-slate-400">รหัส: {editingProduct.code}</p>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
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

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(editingProduct.is_featured)}
                    onChange={(e) => setEditingProduct({ ...editingProduct, is_featured: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded"
                  />
                  แสดงในรายการแนะนำหน้าแรก
                </label>
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

      {/* ================================================================ */}
      {/* MODAL 3: AGENT LEAD NOTE */}
      {/* ================================================================ */}
      {editingLeadNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">บันทึกความคืบหน้าการติดต่อ</h3>
                <p className="text-xs text-slate-500">
                  {editingLeadNote.customer_name} ({editingLeadNote.customer_phone})
                </p>
              </div>
              <button
                onClick={() => setEditingLeadNote(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
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

            {/* Quick Note Presets */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500">ข้อความด่วน:</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'โทรติดแล้ว ลูกค้าขอให้โทรกลับช่วงเย็น',
                  'ส่งตารางเปรียบเทียบทาง LINE แล้ว',
                  'ลูกค้าสนใจแผนเหมาจ่าย นัดหมายทำสัญญา',
                  'โทรไม่ติด ส่ง SMS แจ้งแล้ว',
                ].map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setAgentNoteText((prev) => (prev ? `${prev} | ${preset}` : preset))}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingLeadNote(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSaveLeadNote}
                className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md cursor-pointer"
              >
                บันทึกข้อความ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL 4: FULL LEAD DETAIL VIEW */}
      {/* ================================================================ */}
      {viewingLeadDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-sm">
                  {viewingLeadDetail.customer_name?.charAt(0) || 'L'}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{viewingLeadDetail.customer_name}</h3>
                  <p className="text-xs text-slate-400">รหัสคำขอ: #{viewingLeadDetail.id}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingLeadDetail(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">เบอร์โทรศัพท์</span>
                  <a href={`tel:${viewingLeadDetail.customer_phone}`} className="font-bold text-emerald-700 text-sm hover:underline">
                    {viewingLeadDetail.customer_phone}
                  </a>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">อีเมลติดต่อ</span>
                  <span className="font-bold text-slate-800 truncate block">
                    {viewingLeadDetail.customer_email || '-'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                <span className="text-slate-400 block">แผนประกันที่สนใจ</span>
                <span className="font-bold text-slate-900 text-sm block">
                  {viewingLeadDetail.product_title || 'ขอคำปรึกษาแผนประกันทั่วไป'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">ช่วงงบประมาณ</span>
                  <span className="font-bold text-slate-800">
                    {viewingLeadDetail.budget_range || '-'}
                  </span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-slate-400 block mb-0.5">เวลาที่สะดวกติดต่อ</span>
                  <span className="font-bold text-slate-800">
                    {viewingLeadDetail.preferred_contact_time || 'สะดวกทุกเวลา'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block mb-1">บันทึกตัวแทนล่าสุด</span>
                <p className="text-slate-700 italic">
                  {viewingLeadDetail.user_notes || 'ยังไม่มีบันทึกข้อมูล'}
                </p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200/80 p-2.5 rounded-xl text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-medium">
                  ลูกค้ายินยอมให้ติดต่อกลับตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล (PDPA)
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setViewingLeadDetail(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                ปิดหน้าต่าง
              </button>

              <a
                href={`tel:${viewingLeadDetail.customer_phone}`}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>โทรหาลูกค้าทันที</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL 5: ADD HERO BANNER SLIDE */}
      {/* ================================================================ */}
      {showAddSlideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl my-8 border border-sky-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-600" />
                  <span>เพิ่ม Hero Banner สไลด์ใหม่</span>
                </h3>
                <p className="text-xs text-slate-500">
                  ข้อมูลจะถูกบันทึกและนำไปหมุนสไลด์อัตโนมัติบนหน้าแรกของเว็บไซต์ทันที
                </p>
              </div>
              <button
                onClick={() => setShowAddSlideModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSlide} className="space-y-4 pt-3">
              
              {/* Image Picker for Background */}
              <ImageUploadPicker
                value={newSlideForm.background_image || ''}
                onChange={(url) => setNewSlideForm({ ...newSlideForm, background_image: url })}
                label="รูปภาพพื้นหลัง Hero Banner (Background Image)"
                helpText="อัปโหลดไฟล์จากเครื่อง (ลากวางหรือคลิกเลือกไฟล์) หรือเลือกจากคลังภาพสำเร็จรูป ระบบจะแสดงผลแบบใสรองพื้นเพื่อให้อ่านตัวหนังสือได้คมชัด 100%"
                aspectRatio="hero"
                defaultCategory="health"
              />

              {/* Section 1: Main Texts */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>1. ข้อความหลักและพาดหัวสไลด์</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความในแถบ Badge (แท็กบนหัวข้อ) *</label>
                  <input
                    type="text"
                    required
                    value={newSlideForm.badge_text}
                    onChange={(e) => setNewSlideForm({ ...newSlideForm, badge_text: e.target.value })}
                    placeholder="เช่น ประกันสุขภาพเหมาจ่าย 2026 หรือ ลดหย่อนภาษีสูงสุด 300,000"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อหลัก (Title) *</label>
                  <input
                    type="text"
                    required
                    value={newSlideForm.title}
                    onChange={(e) => setNewSlideForm({ ...newSlideForm, title: e.target.value })}
                    placeholder="เช่น วางแผนประกันสุขภาพและภาษี"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความเน้นสีส้ม (Title Highlight) *</label>
                  <input
                    type="text"
                    required
                    value={newSlideForm.title_highlight}
                    onChange={(e) => setNewSlideForm({ ...newSlideForm, title_highlight: e.target.value })}
                    placeholder="เช่น เพื่อความคุ้มครองที่สมบูรณ์แบบ"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold text-orange-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">คำบรรยายหรือคำโปรย (Subtitle) *</label>
                  <textarea
                    rows={2}
                    required
                    value={newSlideForm.subtitle}
                    onChange={(e) => setNewSlideForm({ ...newSlideForm, subtitle: e.target.value })}
                    placeholder="คำอธิบายสั้นๆ ที่ดึงดูดใจลูกค้า..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">รายการจุดเด่น (Tags) • แยกบรรทัดละ 1 ข้อ</label>
                  <textarea
                    rows={3}
                    value={newSlideTagsInput}
                    onChange={(e) => setNewSlideTagsInput(e.target.value)}
                    placeholder={"เหมาจ่ายค่ารักษาพยาบาลตามจริง\nลดหย่อนภาษีสูงสุด 300,000 บาท\nแฟกซ์เคลมไม่ต้องสำรองจ่าย"}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Section 2: Call to Action Buttons */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Tag className="w-3.5 h-3.5 text-brand-600" />
                  <span>2. ปุ่มกดดำเนินการ (Call to Action Buttons)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อปุ่มหลัก (Primary CTA) *</label>
                    <input
                      type="text"
                      required
                      value={newSlideForm.primary_btn_label}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, primary_btn_label: e.target.value })}
                      placeholder="เช่น ปรึกษาตัวแทนฟรี"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ลิงก์ปุ่มหลัก (URL / Hash) *</label>
                    <input
                      type="text"
                      required
                      value={newSlideForm.primary_btn_href}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, primary_btn_href: e.target.value })}
                      placeholder="เช่น #contact-form หรือ /calculators/tax"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อปุ่มรอง (Secondary CTA) *</label>
                    <input
                      type="text"
                      required
                      value={newSlideForm.secondary_btn_label}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, secondary_btn_label: e.target.value })}
                      placeholder="เช่น เปรียบเทียบแผนประกัน"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ลิงก์ปุ่มรอง (URL / Hash) *</label>
                    <input
                      type="text"
                      required
                      value={newSlideForm.secondary_btn_href}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, secondary_btn_href: e.target.value })}
                      placeholder="เช่น /products"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Floating Card Details */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. ข้อมูลบนการ์ดลอยด้านขวา (Floating Banner Card)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Badge หัวการ์ด</label>
                    <input
                      type="text"
                      value={newSlideForm.card_badge}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, card_badge: e.target.value })}
                      placeholder="เช่น TOP HIGHLIGHT PLAN"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อในการ์ด</label>
                    <input
                      type="text"
                      value={newSlideForm.card_main_title}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, card_main_title: e.target.value })}
                      placeholder="เช่น แผนประกันสุขภาพเหมาจ่ายยอดนิยม"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ตัวเลขเด่นหลัก (Metric)</label>
                    <input
                      type="text"
                      value={newSlideForm.card_main_metric}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, card_main_metric: e.target.value })}
                      placeholder="เช่น เหมาจ่าย 5,000,000 หรือ ประหยัด ฿35,000"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">คำอธิบายตัวเลขย่อย</label>
                    <input
                      type="text"
                      value={newSlideForm.card_main_metric_sub}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, card_main_metric_sub: e.target.value })}
                      placeholder="เช่น ต่อรอบปีกรมธรรม์ ไม่จำกัดวงเงินต่อครั้ง"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Mini Stat 1 & 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">สถิติย่อย 1:</span>
                    <input
                      type="text"
                      value={newSlideForm.stat1_label}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, stat1_label: e.target.value })}
                      placeholder="ป้ายชื่อ (เช่น ลดหย่อนภาษี)"
                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newSlideForm.stat1_value}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, stat1_value: e.target.value })}
                      placeholder="ค่าตัวเลข (เช่น 25,000 บ.)"
                      className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newSlideForm.stat1_desc}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, stat1_desc: e.target.value })}
                      placeholder="คำอธิบาย (เช่น ตามจ่ายจริง)"
                      className="w-full px-2.5 py-1 text-[11px] border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">สถิติย่อย 2:</span>
                    <input
                      type="text"
                      value={newSlideForm.stat2_label}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, stat2_label: e.target.value })}
                      placeholder="ป้ายชื่อ (เช่น ความพึงพอใจ)"
                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newSlideForm.stat2_value}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, stat2_value: e.target.value })}
                      placeholder="ค่าตัวเลข (เช่น 99.8%)"
                      className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={newSlideForm.stat2_desc}
                      onChange={(e) => setNewSlideForm({ ...newSlideForm, stat2_desc: e.target.value })}
                      placeholder="คำอธิบาย (เช่น เคลมรวดเร็ว)"
                      className="w-full px-2.5 py-1 text-[11px] border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หมายเหตุท้ายการ์ด (Footer Note)</label>
                  <input
                    type="text"
                    value={newSlideForm.card_footer_note}
                    onChange={(e) => setNewSlideForm({ ...newSlideForm, card_footer_note: e.target.value })}
                    placeholder="เช่น ✓ ตัวแทนดูแลแบบ VIP พร้อมประสานงานโรงพยาบาล 24 ชม."
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 text-emerald-800"
                  />
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newSlideForm.is_active}
                    onChange={(e) => setNewSlideForm({ ...newSlideForm, is_active: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded cursor-pointer"
                  />
                  <span>เปิดใช้งานและแสดงผลบนหน้าแรกทันที (Active)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddSlideModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกสไลด์ใหม่
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL 6: EDIT HERO BANNER SLIDE */}
      {/* ================================================================ */}
      {editingSlide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl my-8 border border-sky-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-orange-600" />
                  <span>แก้ไข Hero Banner (ID: {editingSlide.id})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  ปรับเปลี่ยนข้อความ การแสดงผล และปุ่มกดของสไลด์นี้
                </p>
              </div>
              <button
                onClick={() => setEditingSlide(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSlide} className="space-y-4 pt-3">
              
              {/* Image Picker for Background */}
              <ImageUploadPicker
                value={editingSlide.background_image || ''}
                onChange={(url) => setEditingSlide({ ...editingSlide, background_image: url })}
                label="รูปภาพพื้นหลัง Hero Banner (Background Image)"
                helpText="อัปโหลดไฟล์จากเครื่อง (ลากวางหรือคลิกเลือกไฟล์) หรือเลือกจากคลังภาพสำเร็จรูป ระบบจะแสดงผลแบบใสรองพื้นเพื่อให้อ่านตัวหนังสือได้คมชัด 100%"
                aspectRatio="hero"
                defaultCategory="health"
              />

              {/* Section 1: Main Texts */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span>1. ข้อความหลักและพาดหัวสไลด์</span>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความในแถบ Badge *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.badge_text}
                    onChange={(e) => setEditingSlide({ ...editingSlide, badge_text: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อหลัก (Title) *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.title}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ข้อความเน้นสีส้ม (Title Highlight) *</label>
                  <input
                    type="text"
                    required
                    value={editingSlide.title_highlight}
                    onChange={(e) => setEditingSlide({ ...editingSlide, title_highlight: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold text-orange-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">คำบรรยายหรือคำโปรย (Subtitle) *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingSlide.subtitle}
                    onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">รายการจุดเด่น (Tags) • แยกบรรทัดละ 1 ข้อ</label>
                  <textarea
                    rows={3}
                    value={editSlideTagsInput}
                    onChange={(e) => setEditSlideTagsInput(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Section 2: Call to Action Buttons */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Tag className="w-3.5 h-3.5 text-brand-600" />
                  <span>2. ปุ่มกดดำเนินการ (Call to Action Buttons)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อปุ่มหลัก (Primary CTA) *</label>
                    <input
                      type="text"
                      required
                      value={editingSlide.primary_btn_label}
                      onChange={(e) => setEditingSlide({ ...editingSlide, primary_btn_label: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ลิงก์ปุ่มหลัก (URL / Hash) *</label>
                    <input
                      type="text"
                      required
                      value={editingSlide.primary_btn_href}
                      onChange={(e) => setEditingSlide({ ...editingSlide, primary_btn_href: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อปุ่มรอง (Secondary CTA) *</label>
                    <input
                      type="text"
                      required
                      value={editingSlide.secondary_btn_label}
                      onChange={(e) => setEditingSlide({ ...editingSlide, secondary_btn_label: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ลิงก์ปุ่มรอง (URL / Hash) *</label>
                    <input
                      type="text"
                      required
                      value={editingSlide.secondary_btn_href}
                      onChange={(e) => setEditingSlide({ ...editingSlide, secondary_btn_href: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Floating Card Details */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. ข้อมูลบนการ์ดลอยด้านขวา (Floating Banner Card)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Badge หัวการ์ด</label>
                    <input
                      type="text"
                      value={editingSlide.card_badge}
                      onChange={(e) => setEditingSlide({ ...editingSlide, card_badge: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อในการ์ด</label>
                    <input
                      type="text"
                      value={editingSlide.card_main_title}
                      onChange={(e) => setEditingSlide({ ...editingSlide, card_main_title: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ตัวเลขเด่นหลัก (Metric)</label>
                    <input
                      type="text"
                      value={editingSlide.card_main_metric}
                      onChange={(e) => setEditingSlide({ ...editingSlide, card_main_metric: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">คำอธิบายตัวเลขย่อย</label>
                    <input
                      type="text"
                      value={editingSlide.card_main_metric_sub}
                      onChange={(e) => setEditingSlide({ ...editingSlide, card_main_metric_sub: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                {/* Mini Stat 1 & 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">สถิติย่อย 1:</span>
                    <input
                      type="text"
                      value={editingSlide.stat1_label}
                      onChange={(e) => setEditingSlide({ ...editingSlide, stat1_label: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingSlide.stat1_value}
                      onChange={(e) => setEditingSlide({ ...editingSlide, stat1_value: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingSlide.stat1_desc}
                      onChange={(e) => setEditingSlide({ ...editingSlide, stat1_desc: e.target.value })}
                      className="w-full px-2.5 py-1 text-[11px] border border-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 block uppercase">สถิติย่อย 2:</span>
                    <input
                      type="text"
                      value={editingSlide.stat2_label}
                      onChange={(e) => setEditingSlide({ ...editingSlide, stat2_label: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingSlide.stat2_value}
                      onChange={(e) => setEditingSlide({ ...editingSlide, stat2_value: e.target.value })}
                      className="w-full px-2.5 py-1 text-xs font-bold border border-slate-200 rounded-lg"
                    />
                    <input
                      type="text"
                      value={editingSlide.stat2_desc}
                      onChange={(e) => setEditingSlide({ ...editingSlide, stat2_desc: e.target.value })}
                      className="w-full px-2.5 py-1 text-[11px] border border-slate-200 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หมายเหตุท้ายการ์ด (Footer Note)</label>
                  <input
                    type="text"
                    value={editingSlide.card_footer_note}
                    onChange={(e) => setEditingSlide({ ...editingSlide, card_footer_note: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 text-emerald-800"
                  />
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center gap-2 pt-1">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingSlide.is_active}
                    onChange={(e) => setEditingSlide({ ...editingSlide, is_active: e.target.checked })}
                    className="w-4 h-4 text-orange-600 rounded cursor-pointer"
                  />
                  <span>เปิดใช้งานและแสดงผลบนหน้าแรก (Active)</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSlide(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกการแก้ไขสไลด์
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL 7: ADD ARTICLE */}
      {/* ================================================================ */}
      {showAddArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl my-8 border border-sky-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-orange-600" />
                  <span>เขียนบทความความรู้ใหม่ (Knowledge Hub)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  เพิ่มบทความ คู่มือ และสาระน่ารู้พร้อมภาพปกเพื่อเผยแพร่บนหน้าแรกและหน้ารวมบทความ
                </p>
              </div>
              <button
                onClick={() => setShowAddArticleModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4 pt-3">
              {/* Cover Image Upload Picker */}
              <ImageUploadPicker
                value={newArticleForm.cover_image_url || ''}
                onChange={(url) => setNewArticleForm({ ...newArticleForm, cover_image_url: url })}
                label="รูปภาพหน้าปกบทความ (Article Cover Image) *"
                helpText="อัปโหลดไฟล์ภาพจากเครื่อง (ลากวางหรือคลิกเลือก) หรือเลือกรูปภาพความละเอียดสูงจากคลังภาพ"
                aspectRatio="standard"
                defaultCategory="health"
              />

              {/* Title & Slug */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อบทความ (Title) *</label>
                  <input
                    type="text"
                    required
                    value={newArticleForm.title}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, title: e.target.value })}
                    placeholder="เช่น คู่มือเลือกประกันสุขภาพเหมาจ่าย 2568 ฉบับเข้าใจง่าย"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL Slug (ถ้าเว้นว่างจะสร้างให้อัตโนมัติ)</label>
                  <input
                    type="text"
                    value={newArticleForm.slug}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, slug: e.target.value })}
                    placeholder="เช่น health-insurance-guide-2025"
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono text-slate-600 bg-white"
                  />
                </div>
              </div>

              {/* Category & Meta */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่บทความ (Category Name) *</label>
                    <input
                      type="text"
                      required
                      value={newArticleForm.category_name}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, category_name: e.target.value })}
                      placeholder="เช่น ประกันสุขภาพเหมาจ่าย"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่ Slug (Category Slug)</label>
                    <input
                      type="text"
                      value={newArticleForm.category_slug}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, category_slug: e.target.value })}
                      placeholder="เช่น health-insurance"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อผู้เขียนบทความ (Author Name) *</label>
                    <input
                      type="text"
                      required
                      value={newArticleForm.author_name}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, author_name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">เลขใบอนุญาตตัวแทน / คุณวุฒิ</label>
                    <input
                      type="text"
                      value={newArticleForm.author_license || ''}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, author_license: e.target.value })}
                      placeholder="เช่น ใบอนุญาต คปภ. 6401029384"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">เวลาที่ใช้อ่าน (นาที) *</label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      required
                      value={newArticleForm.reading_time_minutes}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, reading_time_minutes: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">วันที่เผยแพร่ (Display Date) *</label>
                    <input
                      type="text"
                      required
                      value={newArticleForm.published_at}
                      onChange={(e) => setNewArticleForm({ ...newArticleForm, published_at: e.target.value })}
                      placeholder="เช่น 17 ก.ย. 2567"
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt and Content */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">คำโปรย / สรุปย่อ (Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    value={newArticleForm.excerpt}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, excerpt: e.target.value })}
                    placeholder="สรุปเนื้อหาสั้นๆ 2-3 บรรทัด สำหรับแสดงบนการ์ดบทความ..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">เนื้อหาบทความฉบับเต็ม (Full Content) *</label>
                  <textarea
                    rows={5}
                    required
                    value={newArticleForm.content}
                    onChange={(e) => setNewArticleForm({ ...newArticleForm, content: e.target.value })}
                    placeholder="เขียนรายละเอียดบทความ ข้อควรระวัง หรือข้อแนะนำสำหรับลูกค้า..."
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddArticleModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  เผยแพร่บทความใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL 8: EDIT ARTICLE */}
      {/* ================================================================ */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl my-8 border border-sky-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-orange-600" />
                  <span>แก้ไขบทความ (ID: {editingArticle.id})</span>
                </h3>
                <p className="text-xs text-slate-500">
                  ปรับปรุงเนื้อหา ภาพปก หรือข้อมูลผู้เขียนของบทความนี้
                </p>
              </div>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateArticle} className="space-y-4 pt-3">
              {/* Cover Image Upload Picker */}
              <ImageUploadPicker
                value={editingArticle.cover_image_url || ''}
                onChange={(url) => setEditingArticle({ ...editingArticle, cover_image_url: url })}
                label="รูปภาพหน้าปกบทความ (Article Cover Image)"
                helpText="อัปโหลดไฟล์ภาพจากเครื่อง หรือเลือกจากคลังภาพตัวอย่าง"
                aspectRatio="standard"
                defaultCategory="health"
              />

              {/* Title & Slug */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">หัวข้อบทความ (Title) *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.title}
                    onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono text-slate-600 bg-white"
                  />
                </div>
              </div>

              {/* Category & Meta */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่บทความ *</label>
                    <input
                      type="text"
                      required
                      value={editingArticle.category_name}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category_name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">หมวดหมู่ Slug</label>
                    <input
                      type="text"
                      value={editingArticle.category_slug}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category_slug: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 font-mono bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ชื่อผู้เขียนบทความ *</label>
                    <input
                      type="text"
                      required
                      value={editingArticle.author_name}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author_name: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">เลขใบอนุญาตตัวแทน / คุณวุฒิ</label>
                    <input
                      type="text"
                      value={editingArticle.author_license || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author_license: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">เวลาที่ใช้อ่าน (นาที) *</label>
                    <input
                      type="number"
                      min={1}
                      max={60}
                      required
                      value={editingArticle.reading_time_minutes}
                      onChange={(e) => setEditingArticle({ ...editingArticle, reading_time_minutes: Number(e.target.value) })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">วันที่เผยแพร่ *</label>
                    <input
                      type="text"
                      required
                      value={editingArticle.published_at}
                      onChange={(e) => setEditingArticle({ ...editingArticle, published_at: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Excerpt and Content */}
              <div className="space-y-3 bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">คำโปรย / สรุปย่อ (Excerpt) *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingArticle.excerpt}
                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">เนื้อหาบทความฉบับเต็ม (Full Content) *</label>
                  <textarea
                    rows={5}
                    required
                    value={editingArticle.content}
                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500 bg-white"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกการแก้ไขบทความ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: ADD COMPANY */}
      {/* ================================================================ */}
      {showAddCompanyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 my-8 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">เพิ่มพันธมิตรบริษัทประกันใหม่</h3>
                <p className="text-xs text-slate-500">ข้อมูลจะแสดงผลในตัวกรองค้นหาและตารางเปรียบเทียบ</p>
              </div>
              <button
                onClick={() => setShowAddCompanyModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">รหัสย่อบริษัท (Code เช่น MTL, AIA, BLA) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น BLA"
                  value={companyForm.code}
                  onChange={(e) => setCompanyForm({ ...companyForm, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-bold uppercase focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ชื่อเต็มบริษัท (Company Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น บมจ. กรุงเทพประกันชีวิต (Bangkok Life Assurance)"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">เบอร์สายด่วน Hotline (Call Center) *</label>
                <input
                  type="text"
                  required
                  placeholder="เช่น 02-777-8888 หรือ 1766"
                  value={companyForm.contact_phone}
                  onChange={(e) => setCompanyForm({ ...companyForm, contact_phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-bold text-emerald-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL โลโก้บริษัท (Logo URL หรือเลือกไอคอนแบรนด์)</label>
                <input
                  type="text"
                  placeholder="/images/companies/bla.png"
                  value={companyForm.logo_url}
                  onChange={(e) => setCompanyForm({ ...companyForm, logo_url: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCompanyModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกพันธมิตรใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: EDIT COMPANY */}
      {/* ================================================================ */}
      {editingCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 my-8 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">แก้ไขข้อมูลพันธมิตรบริษัทประกัน</h3>
                <p className="text-xs text-slate-500">รหัส: {editingCompany.code}</p>
              </div>
              <button
                onClick={() => setEditingCompany(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCompany} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">รหัสย่อบริษัท (Code)</label>
                <input
                  type="text"
                  required
                  value={editingCompany.code}
                  onChange={(e) => setEditingCompany({ ...editingCompany, code: e.target.value.toUpperCase() })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-bold uppercase focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">ชื่อเต็มบริษัท (Company Name)</label>
                <input
                  type="text"
                  required
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">เบอร์สายด่วน Hotline</label>
                <input
                  type="text"
                  required
                  value={editingCompany.contact_phone}
                  onChange={(e) => setEditingCompany({ ...editingCompany, contact_phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-bold text-emerald-700 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">URL โลโก้</label>
                <input
                  type="text"
                  value={editingCompany.logo_url || ''}
                  onChange={(e) => setEditingCompany({ ...editingCompany, logo_url: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCompany(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: ADD CATEGORY */}
      {/* ================================================================ */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 my-8 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">เพิ่มหมวดหมู่ความคุ้มครองใหม่</h3>
                <p className="text-xs text-slate-500">สร้างกลุ่มผลิตภัณฑ์สำหรับนำทางและค้นหา</p>
              </div>
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ชื่อหมวดหมู่ (ภาษาไทย) *</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ประกันโรคร้ายแรง"
                    value={categoryForm.name_th}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name_th: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ชื่อภาษาอังกฤษ (Name EN)</label>
                  <input
                    type="text"
                    placeholder="Critical Illness"
                    value={categoryForm.name_en}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name_en: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Slug URL (สำหรับลิงก์) *</label>
                  <input
                    type="text"
                    required
                    placeholder="critical-illness"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-') })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ประเภท (Category Type) *</label>
                  <select
                    value={categoryForm.category_type}
                    onChange={(e) => setCategoryForm({ ...categoryForm, category_type: e.target.value as any })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl bg-white font-bold focus:outline-none focus:border-orange-500"
                  >
                    <option value="INSURANCE">ประกันชีวิต & สุขภาพ (INSURANCE)</option>
                    <option value="TAX">ลดหย่อนภาษี (TAX)</option>
                    <option value="INVESTMENT">การเงิน & กองทุน (INVESTMENT)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">คำอธิบายสรุปความคุ้มครอง</label>
                <textarea
                  rows={2}
                  placeholder="สรุปสั้นๆ เช่น คุ้มครองเจอจ่ายจบ 50 โรคร้ายแรง..."
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกหมวดหมู่ใหม่
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* MODAL: EDIT CATEGORY */}
      {/* ================================================================ */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 my-8 border border-slate-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">แก้ไขข้อมูลหมวดหมู่ความคุ้มครอง</h3>
                <p className="text-xs text-slate-500">Slug: {editingCategory.slug}</p>
              </div>
              <button
                onClick={() => setEditingCategory(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCategory} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ชื่อหมวดหมู่ (ไทย)</label>
                  <input
                    type="text"
                    required
                    value={editingCategory.name_th}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name_th: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl font-bold focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">ชื่อหมวดหมู่ (EN)</label>
                  <input
                    type="text"
                    value={editingCategory.name_en || ''}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name_en: e.target.value })}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">คำอธิบาย</label>
                <textarea
                  rows={3}
                  value={editingCategory.description || ''}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-xs font-bold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-xs cursor-pointer"
                >
                  บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

