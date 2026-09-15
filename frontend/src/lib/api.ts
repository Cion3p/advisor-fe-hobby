import { Product, Category, TaxCalculationResult, LifeValueResult, Article } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// Fallback initial data in case backend/MySQL is not yet started by user
export const FALLBACK_CATEGORIES: Category[] = [
  {
    id: 1,
    slug: 'health-insurance',
    name_th: 'ประกันสุขภาพเหมาจ่าย',
    name_en: 'Health Insurance',
    category_type: 'INSURANCE',
    description: 'คุ้มครองค่ารักษาพยาบาล ค่าห้อง ผ่าตัด และโรคร้ายแรง ครอบคลุมทั้ง IPD และ OPD',
    icon: 'HeartPulse',
    product_count: 2,
  },
  {
    id: 2,
    slug: 'life-protection',
    name_th: 'ประกันชีวิตและมรดก',
    name_en: 'Life & Protection',
    category_type: 'INSURANCE',
    description: 'สร้างหลักประกันทางการเงินมั่นคงและส่งต่อมรดกให้คนที่คุณรักด้วยทุนประกันสูง',
    icon: 'ShieldCheck',
    product_count: 1,
  },
  {
    id: 3,
    slug: 'savings-insurance',
    name_th: 'ประกันสะสมทรัพย์',
    name_en: 'Endowment / Savings',
    category_type: 'INSURANCE',
    description: 'ออมเงินอย่างมีวินัย พร้อมความคุ้มครองชีวิตและการันตีเงินคืนสม่ำเสมอทุกปี',
    icon: 'PiggyBank',
    product_count: 1,
  },
  {
    id: 4,
    slug: 'annuity-pension',
    name_th: 'ประกันบำนาญ',
    name_en: 'Annuity / Pension',
    category_type: 'INSURANCE',
    description: 'วางแผนเพื่อวัยเกษียณ รับเงินบำนาญแน่นอนทุกปีจนถึงอายุ 85-99 ปี พร้อมสิทธิลดหย่อนภาษี',
    icon: 'SunMedium',
    product_count: 1,
  },
  {
    id: 5,
    slug: 'tax-saving-funds',
    name_th: 'ผลิตภัณฑ์ลดหย่อนภาษี & การลงทุน',
    name_en: 'Tax & Wealth',
    category_type: 'TAX',
    description: 'วางแผนภาษีส่งท้ายปีด้วยประกันชีวิต ประกันสุขภาพ และกองทุนรวม ThaiESG / RMF',
    icon: 'ReceiptPercent',
    product_count: 2,
  },
];

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    category_id: 1,
    company_id: 2,
    code: 'MTL-ELITE-HEALTH',
    title: 'เมืองไทย อีลิท เฮลท์ พลัส (Elite Health Plus)',
    slug: 'elite-health-plus-mtl',
    summary: 'ประกันสุขภาพเหมาจ่ายระดับพรีเมียม วงเงินคุ้มครองสูง 20 - 100 ล้านบาทต่อปี ครอบคลุมค่าห้องเดี่ยวมาตรฐาน และการรักษามะเร็งแบบ Targeted Therapy',
    full_description: 'สัญญาเพิ่มเติมการประกันภัยสุขภาพแบบ อีลิท เฮลท์ พลัส คุ้มครองทั้งกรณีเจ็บป่วยจากโรคทั่วไป โรคร้ายแรง โรคระบาด และอุบัติเหตุ พร้อมดูแลสุขภาพตลอด 24 ชม. ทั่วโลกตามพื้นที่ความคุ้มครองที่เลือก',
    highlight_points: [
      'เหมาจ่ายค่ารักษาพยาบาล 20 - 100 ล้านบาท/ปี',
      'คุ้มครองค่าห้องเดี่ยวมาตรฐานทุกโรงพยาบาล',
      'ครอบคลุมการรักษามะเร็ง Targeted Therapy & Immunotherapy',
      'ต่ออายุสัญญาได้ถึงอายุ 99 ปี',
    ],
    min_entry_age: 11,
    max_entry_age: 75,
    min_premium: 24500,
    premium_payment_term: 'ชำระเบี้ยรายปี',
    coverage_term: 'คุ้มครองถึงอายุ 99 ปี',
    is_tax_deductible: true,
    max_tax_deduction: 25000,
    is_featured: true,
    rating: 4.9,
    category_name: 'ประกันสุขภาพเหมาจ่าย',
    category_slug: 'health-insurance',
    company_name: 'เมืองไทยประกันชีวิต (Muang Thai Life)',
    company_code: 'MTL',
    company_logo: '/images/companies/mtl.png',
    company_phone: '1766',
    benefits: [
      { id: 1, product_id: 1, benefit_category: 'IPD_OPD', benefit_title: 'ค่ารักษาพยาบาลกรณีผู้ป่วยใน (IPD)', coverage_amount_desc: 'เหมาจ่ายตามจริงสูงสุด 20 - 100 ล้านบาท/ปี', sort_order: 1 },
      { id: 2, product_id: 1, benefit_category: 'IPD_OPD', benefit_title: 'ค่าห้อง ค่าอาหาร ค่าบริการพยาบาล', coverage_amount_desc: 'ห้องเดี่ยวมาตรฐาน ไม่จำกัดจำนวนวัน', sort_order: 2 },
      { id: 3, product_id: 1, benefit_category: 'CRITICAL_ILLNESS', benefit_title: 'การรักษามะเร็งแบบพุ่งเป้า (Targeted Therapy)', coverage_amount_desc: 'เหมาจ่ายตามจริงในวงเงินผลประโยชน์', sort_order: 3 },
    ],
    plans: [
      { id: 1, product_id: 1, plan_name: 'แผน 20 ล้านบาท', base_sum_assured: 20000000, base_premium_male: 24500, base_premium_female: 26800 },
      { id: 2, product_id: 1, plan_name: 'แผน 50 ล้านบาท', base_sum_assured: 50000000, base_premium_male: 38200, base_premium_female: 42100 },
    ],
  },
  {
    id: 2,
    category_id: 1,
    company_id: 1,
    code: 'AIA-HEALTH-HAPPY',
    title: 'เอไอเอ เฮลท์ แฮปปี้ (AIA Health Happy)',
    slug: 'aia-health-happy',
    summary: 'เหมาเบิ้ลคุ้มครองสูงสุด 4 เท่าเมื่อตรวจพบโรคร้ายแรง แผนเหมาจ่ายเข้าใจง่าย ไม่มีข้อจำกัดค่าห้องจุกจิก',
    full_description: 'เอไอเอ เฮลท์ แฮปปี้ ให้คุณแฮปปี้กับความคุ้มครองแบบเหมาจ่ายค่ารักษาพยาบาล 1 - 25 ล้านบาทต่อรอบปีกรมธรรม์ เบิ้ลความคุ้มครองเป็น 2 เท่าต่อเนื่อง 4 ปีกรมธรรม์เมื่อตรวจพบ 3 กลุ่มโรคร้ายแรง',
    highlight_points: [
      'เหมาจ่ายค่ารักษาพยาบาล 1 - 25 ล้านบาท/ปี',
      'เบิ้ลความคุ้มครอง 2 เท่าเมื่อตรวจพบโรคร้ายแรง รวมสูงสุด 4 ปีกรมธรรม์',
      'ไม่จำกัดค่าห้อง (ตามค่าห้องเดี่ยวมาตรฐาน)',
      'เบี้ยประกันสามารถนำไปลดหย่อนภาษีได้',
    ],
    min_entry_age: 6,
    max_entry_age: 75,
    min_premium: 18200,
    premium_payment_term: 'ชำระเบี้ยรายปี',
    coverage_term: 'คุ้มครองถึงอายุ 99 ปี',
    is_tax_deductible: true,
    max_tax_deduction: 25000,
    is_featured: true,
    rating: 4.8,
    category_name: 'ประกันสุขภาพเหมาจ่าย',
    category_slug: 'health-insurance',
    company_name: 'เอไอเอ ประเทศไทย (AIA)',
    company_code: 'AIA',
    company_logo: '/images/companies/aia.png',
    company_phone: '1581',
    benefits: [
      { id: 4, product_id: 2, benefit_category: 'IPD_OPD', benefit_title: 'ค่ารักษาพยาบาลเหมาจ่ายต่อรอบปีกรมธรรม์', coverage_amount_desc: 'สูงสุด 5 - 25 ล้านบาท', sort_order: 1 },
      { id: 5, product_id: 2, benefit_category: 'CRITICAL_ILLNESS', benefit_title: 'ผลประโยชน์เพิ่มเป็น 2 เท่าสำหรับโรคร้ายแรง', coverage_amount_desc: 'รวมสูงสุด 4 ปีกรมธรรม์', sort_order: 2 },
    ],
    plans: [
      { id: 3, product_id: 2, plan_name: 'แผน 5 ล้านบาท', base_sum_assured: 5000000, base_premium_male: 18200, base_premium_female: 20500 },
    ],
  },
  {
    id: 3,
    category_id: 3,
    company_id: 3,
    code: 'AZAY-MY-DOUBLE-PLUS',
    title: 'อลิอันซ์ มาย ดับเบิล พลัส 10/5 (My Double Plus 10/5)',
    slug: 'allianz-my-double-plus-10-5',
    summary: 'ออมสั้นเพียง 5 ปี คุ้มครองนาน 10 ปี รับเงินจ่ายคืนประจำปีสูง พร้อมเงินก้อนคืนเมื่อครบกำหนดสัญญา',
    highlight_points: [
      'จ่ายเบี้ยสั้นเพียง 5 ปี คุ้มครองยาว 10 ปี',
      'รับเงินคืนทุกปี ปีละ 8% ของทุนประกันภัย',
      'ครบกำหนดสัญญารับเงินก้อนใหญ่ 500% ของทุนประกัน',
      'ลดหย่อนภาษีได้สูงสุด 100,000 บาท/ปี',
    ],
    min_entry_age: 1,
    max_entry_age: 65,
    min_premium: 30000,
    premium_payment_term: '5 ปี',
    coverage_term: '10 ปี',
    is_tax_deductible: true,
    max_tax_deduction: 100000,
    is_featured: true,
    rating: 4.7,
    category_name: 'ประกันสะสมทรัพย์',
    category_slug: 'savings-insurance',
    company_name: 'อลิอันซ์ อยุธยา (Allianz Ayudhya)',
    company_code: 'AZAY',
    company_logo: '/images/companies/azay.png',
    company_phone: '1373',
    benefits: [
      { id: 6, product_id: 3, benefit_category: 'SAVINGS_RETURN', benefit_title: 'เงินจ่ายคืนประจำปีกรมธรรม์', coverage_amount_desc: 'ปีละ 8% ของจำนวนเงินเอาประกันภัย', sort_order: 1 },
      { id: 7, product_id: 3, benefit_category: 'SAVINGS_RETURN', benefit_title: 'เงินครบกำหนดสัญญา ณ สิ้นปีกรมธรรม์ที่ 10', coverage_amount_desc: '500% ของจำนวนเงินเอาประกันภัย', sort_order: 2 },
    ],
  },
  {
    id: 4,
    category_id: 4,
    company_id: 4,
    code: 'KTAXA-RETIRE-READY',
    title: 'กรุงไทย-แอกซ่า รีไทร์ เรดดี้ 85/55 (Retire Ready)',
    slug: 'ktaxa-retire-ready-pension',
    summary: 'วางแผนเกษียณแบบสบายใจ รับเงินบำนาญทุกปีตั้งแต่อายุ 55 ถึง 85 ปี การันตีเงินคืนรวมสูงสุดกว่า 600%',
    highlight_points: [
      'รับเงินบำนาญสม่ำเสมอ 15% ของทุนประกัน ทุกปีตั้งแต่อายุ 55 - 85 ปี',
      'การันตีจ่ายเงินบำนาญขั้นต่ำ 15 ปี',
      'สิทธิลดหย่อนภาษีส่วนบำนาญสูงสุด 200,000 บาท',
      'ไม่ต้องตรวจสุขภาพสำหรับบางช่วงทุน',
    ],
    min_entry_age: 20,
    max_entry_age: 50,
    min_premium: 35000,
    premium_payment_term: 'ถึงอายุ 55 หรือ 60 ปี',
    coverage_term: 'คุ้มครองถึงอายุ 85 ปี',
    is_tax_deductible: true,
    max_tax_deduction: 200000,
    is_featured: false,
    rating: 4.8,
    category_name: 'ประกันบำนาญ',
    category_slug: 'annuity-pension',
    company_name: 'กรุงไทย-แอกซ่า (Krungthai-AXA)',
    company_code: 'KTAXA',
    company_logo: '/images/companies/ktaxa.png',
    company_phone: '1159',
    benefits: [
      { id: 8, product_id: 4, benefit_category: 'TAX_SAVING', benefit_title: 'สิทธิลดหย่อนภาษีเงินได้บุคคลธรรมดา', coverage_amount_desc: 'สูงสุด 200,000 บาท ตามเกณฑ์กรมสรรพากร', sort_order: 1 },
    ],
  },
];

export async function fetchCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data || FALLBACK_CATEGORIES;
  } catch {
    return FALLBACK_CATEGORIES;
  }
}

export async function fetchProducts(params: {
  category?: string;
  minAge?: number;
  maxBudget?: number;
  isTaxDeductible?: boolean;
  search?: string;
} = {}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.minAge) query.append('minAge', params.minAge.toString());
    if (params.maxBudget) query.append('maxBudget', params.maxBudget.toString());
    if (params.isTaxDeductible !== undefined) query.append('isTaxDeductible', params.isTaxDeductible.toString());
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data || FALLBACK_PRODUCTS;
  } catch {
    // Filter fallback
    let list = [...FALLBACK_PRODUCTS];
    if (params.category) list = list.filter((p) => p.category_slug === params.category);
    if (params.minAge) list = list.filter((p) => p.min_entry_age <= params.minAge! && p.max_entry_age >= params.minAge!);
    if (params.maxBudget) list = list.filter((p) => p.min_premium <= params.maxBudget!);
    if (params.isTaxDeductible !== undefined) list = list.filter((p) => p.is_tax_deductible === params.isTaxDeductible);
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(s) || p.summary.toLowerCase().includes(s));
    }
    return list;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    return json.data;
  } catch {
    const found = FALLBACK_PRODUCTS.find((p) => p.slug === slug);
    return found || null;
  }
}

export async function calculateTaxAPI(data: any): Promise<TaxCalculationResult> {
  const res = await fetch(`${API_BASE_URL}/calculators/tax-deduction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Calculation failed');
  const json = await res.json();
  return json.data;
}

export async function calculateLifeValueAPI(data: any): Promise<LifeValueResult> {
  const res = await fetch(`${API_BASE_URL}/calculators/life-value`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Calculation failed');
  const json = await res.json();
  return json.data;
}

export async function submitLeadAPI(data: any) {
  const res = await fetch(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'ส่งข้อมูลไม่สำเร็จ');
  return json.data;
}

export const FALLBACK_LEADS = [
  {
    id: 1,
    customer_name: 'คุณธีรพงศ์ รัตนศิริ',
    customer_phone: '081-234-5678',
    customer_email: 'theerapong@gmail.com',
    product_title: 'เมืองไทย อีลิท เฮลท์ พลัส (Elite Health Plus)',
    preferred_contact_time: 'ช่วงบ่าย (13:00 - 17:00 น.)',
    province: 'กรุงเทพมหานคร',
    budget_range: '20,000 - 40,000 บาท/ปี',
    user_notes: 'ต้องการเปรียบเทียบค่าห้องเดี่ยวมาตรฐานของโรงพยาบาลในเครือ BDMS',
    status: 'NEW',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    pdpa_consent: true,
  },
  {
    id: 2,
    customer_name: 'คุณพิมพ์ใจ สุขสวัสดิ์',
    customer_phone: '089-876-5432',
    customer_email: 'pimjai.s@hotmail.com',
    product_title: 'อลิอันซ์ มาย ดับเบิล พลัส 10/5 (My Double Plus 10/5)',
    preferred_contact_time: 'ช่วงเย็นหลังเลิกงาน (17:00 - 20:00 น.)',
    province: 'เชียงใหม่',
    budget_range: '70,000 - 100,000 บาท/ปี',
    user_notes: 'สนใจลดหย่อนภาษี 100,000 บาทแรก ออมสั้น 5 ปี มีเงินคืนทุกปี',
    status: 'CONTACTED',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    pdpa_consent: true,
  },
  {
    id: 3,
    customer_name: 'คุณอนันต์ วงศ์ไพศาล',
    customer_phone: '086-555-4321',
    customer_email: 'anan.w@yahoo.com',
    product_title: 'กรุงไทย-แอกซ่า รีไทร์ เรดดี้ 85/55 (Retire Ready)',
    preferred_contact_time: 'สะดวกทุกเวลา',
    province: 'นนทบุรี',
    budget_range: '40,000 - 70,000 บาท/ปี',
    user_notes: 'วางแผนเกษียณอายุ 55 ปี ต้องการทราบเงินบำนาญต่อปี',
    status: 'CONSULTING',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    pdpa_consent: true,
  },
];

export async function fetchLeadsAPI(status?: string) {
  try {
    const url = status ? `${API_BASE_URL}/leads?status=${status}` : `${API_BASE_URL}/leads`;
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch leads');
    const json = await res.json();
    return json.data || FALLBACK_LEADS;
  } catch {
    return status ? FALLBACK_LEADS.filter((l) => l.status === status) : FALLBACK_LEADS;
  }
}

export async function updateLeadStatusAPI(id: number, status: string, notes?: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, notes }),
    });
    if (!res.ok) throw new Error('Failed to update status');
    return await res.json();
  } catch {
    return { success: true, leadId: id, status };
  }
}

export async function fetchAdminStatsAPI() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/stats`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch stats');
    const json = await res.json();
    return json.data;
  } catch {
    return {
      totalLeads: FALLBACK_LEADS.length,
      newLeads: FALLBACK_LEADS.filter((l) => l.status === 'NEW').length,
      contactedLeads: FALLBACK_LEADS.filter((l) => l.status === 'CONTACTED').length,
      consultingLeads: FALLBACK_LEADS.filter((l) => l.status === 'CONSULTING').length,
      closedLeads: 0,
      totalProducts: FALLBACK_PRODUCTS.length,
    };
  }
}

