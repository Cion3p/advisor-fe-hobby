import { Product, Category, TaxCalculationResult, LifeValueResult, Article, HeroSlide, AnnouncementPopup } from '../types';

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
  company?: string;
  minAge?: number;
  maxBudget?: number;
  isTaxDeductible?: boolean;
  search?: string;
} = {}): Promise<Product[]> {
  try {
    const query = new URLSearchParams();
    if (params.category) query.append('category', params.category);
    if (params.company) query.append('company', params.company);
    if (params.minAge) query.append('minAge', params.minAge.toString());
    if (params.maxBudget) query.append('maxBudget', params.maxBudget.toString());
    if (params.isTaxDeductible !== undefined) query.append('isTaxDeductible', params.isTaxDeductible.toString());
    if (params.search) query.append('search', params.search);

    const res = await fetch(`${API_BASE_URL}/products?${query.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('API error');
    const json = await res.json();
    let data: Product[] = json.data || FALLBACK_PRODUCTS;
    if (params.company) {
      const comp = params.company.toUpperCase();
      data = data.filter(
        (p) =>
          (p.company_code && p.company_code.toUpperCase().includes(comp)) ||
          (p.company_name && p.company_name.toUpperCase().includes(comp))
      );
    }
    return data;
  } catch {
    // Filter fallback
    let list = [...FALLBACK_PRODUCTS];
    if (params.category) list = list.filter((p) => p.category_slug === params.category);
    if (params.company) {
      const comp = params.company.toUpperCase();
      list = list.filter(
        (p) =>
          (p.company_code && p.company_code.toUpperCase().includes(comp)) ||
          (p.company_name && p.company_name.toUpperCase().includes(comp))
      );
    }
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

// Tax Brackets according to Thai Revenue Department (กรมสรรพากร)
const THAI_TAX_BRACKETS = [
  { min: 0, max: 150000, rate: 0.00, label: '0 - 150,000 บาท (ยกเว้นภาษี)' },
  { min: 150000, max: 300000, rate: 0.05, label: '150,001 - 300,000 บาท (5%)' },
  { min: 300000, max: 500000, rate: 0.10, label: '300,001 - 500,000 บาท (10%)' },
  { min: 500000, max: 750000, rate: 0.15, label: '500,001 - 750,000 บาท (15%)' },
  { min: 750000, max: 1000000, rate: 0.20, label: '750,001 - 1,000,000 บาท (20%)' },
  { min: 1000000, max: 2000000, rate: 0.25, label: '1,000,001 - 2,000,000 บาท (25%)' },
  { min: 2000000, max: 5000000, rate: 0.30, label: '2,000,001 - 5,000,000 บาท (30%)' },
  { min: 5000000, max: Infinity, rate: 0.35, label: 'มากกว่า 5,000,000 บาท (35%)' },
];

export function computeLocalTaxCalculation(input: any): TaxCalculationResult {
  const annualIncome = Math.max(0, Number(input.annualIncome || (Number(input.monthlyIncome || 0) * 12)));
  const standardExpenses = Math.min(annualIncome * 0.5, 100000);
  const personalAllowance = 60000;

  const calcInsuranceDeduction = (life: number = 0, health: number = 0, pension: number = 0) => {
    const validHealth = Math.min(health, 25000);
    const combinedGeneralLife = Math.min(life + validHealth, 100000);
    const pensionCap = Math.min(annualIncome * 0.15, 200000);
    const validPension = Math.min(pension, pensionCap);
    return combinedGeneralLife + validPension;
  };

  const deductionBefore = calcInsuranceDeduction(
    Number(input.existingLifeInsurance || 0),
    Number(input.existingHealthInsurance || 0),
    Number(input.existingPension || 0)
  );

  const totalLife = Number(input.existingLifeInsurance || 0) + Number(input.proposedLifeInsurance || 0);
  const totalHealth = Number(input.existingHealthInsurance || 0) + Number(input.proposedHealthInsurance || 0);
  const totalPension = Number(input.existingPension || 0) + Number(input.proposedPension || 0);

  const deductionAfter = calcInsuranceDeduction(totalLife, totalHealth, totalPension);

  const netTaxableIncomeBefore = Math.max(0, annualIncome - standardExpenses - personalAllowance - deductionBefore);
  const netTaxableIncomeAfter = Math.max(0, annualIncome - standardExpenses - personalAllowance - deductionAfter);

  const calcProgressive = (taxable: number) => {
    let totalTax = 0;
    let marginalRate = 0;
    const brackets: { range: string; rate: number; taxableAmount: number; taxInThisBracket: number }[] = [];
    if (taxable <= 0) return { totalTax: 0, brackets, marginalRate: 0 };
    for (const b of THAI_TAX_BRACKETS) {
      if (taxable > b.min) {
        const amt = Math.min(taxable - b.min, b.max - b.min);
        const tax = amt * b.rate;
        totalTax += tax;
        if (b.rate > 0) marginalRate = b.rate * 100;
        brackets.push({
          range: b.label,
          rate: b.rate * 100,
          taxableAmount: Math.round(amt),
          taxInThisBracket: Math.round(tax),
        });
      }
    }
    return { totalTax: Math.round(totalTax), brackets, marginalRate };
  };

  const resBefore = calcProgressive(netTaxableIncomeBefore);
  const resAfter = calcProgressive(netTaxableIncomeAfter);

  return {
    annualIncome,
    standardExpenseDeduction: Math.round(standardExpenses),
    personalDeduction: personalAllowance,
    totalInsuranceDeductionsBefore: Math.round(deductionBefore),
    totalInsuranceDeductionsAfter: Math.round(deductionAfter),
    netTaxableIncomeBefore: Math.round(netTaxableIncomeBefore),
    netTaxableIncomeAfter: Math.round(netTaxableIncomeAfter),
    totalTaxBefore: resBefore.totalTax,
    totalTaxAfter: resAfter.totalTax,
    taxSaved: Math.max(0, resBefore.totalTax - resAfter.totalTax),
    marginalTaxRate: resBefore.marginalRate,
    bracketsBreakdown: resAfter.brackets,
  };
}

export function computeLocalLifeValue(input: any): LifeValueResult {
  const annualExpense = Math.max(0, Number(input.monthlyFamilyExpense || 0)) * 12;
  const supportYears = Math.max(1, Number(input.supportYears || 5));
  const totalFamilyNeeds = annualExpense * supportYears;
  const totalDebts = Math.max(0, Number(input.outstandingDebts || 0));
  const totalEducationAndEmergency = Math.max(0, Number(input.childrenEducationFund || 0)) + Math.max(0, Number(input.funeralAndEmergency || 200000));
  const grossRequiredCapital = totalFamilyNeeds + totalDebts + totalEducationAndEmergency;
  const totalExistingProtection = Math.max(0, Number(input.existingAssets || 0)) + Math.max(0, Number(input.existingLifeCoverage || 0));
  const netRecommendedSumAssured = Math.max(0, grossRequiredCapital - totalExistingProtection);

  const millionUnits = netRecommendedSumAssured / 1000000;
  const termInsurance = Math.round(millionUnits * 4000);
  const wholeLifeInsurance = Math.round(millionUnits * 22000);

  return {
    totalFamilyNeeds: Math.round(totalFamilyNeeds),
    totalDebts: Math.round(totalDebts),
    totalEducationAndEmergency: Math.round(totalEducationAndEmergency),
    grossRequiredCapital: Math.round(grossRequiredCapital),
    totalExistingProtection: Math.round(totalExistingProtection),
    netRecommendedSumAssured: Math.round(netRecommendedSumAssured),
    estimatedAnnualPremium: {
      termInsurance,
      wholeLifeInsurance,
    },
  };
}

export async function calculateTaxAPI(data: any): Promise<TaxCalculationResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/calculators/tax-deduction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data) return json.data;
    }
  } catch {
    // Backend API is offline or unreachable - calculate locally seamlessly
  }
  return computeLocalTaxCalculation(data);
}

export async function calculateLifeValueAPI(data: any): Promise<LifeValueResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/calculators/life-value`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      if (json?.data) return json.data;
    }
  } catch {
    // Backend API is offline or unreachable - calculate locally seamlessly
  }
  return computeLocalLifeValue(data);
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

export async function createProductAPI(data: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create product');
    return await res.json();
  } catch {
    // Return mock success for local demo
    const newId = FALLBACK_PRODUCTS.length + 1;
    const mockProduct = {
      id: newId,
      ...data,
      is_featured: data.isFeatured || false,
      is_tax_deductible: data.isTaxDeductible || false,
      min_premium: data.minPremium,
      min_entry_age: data.minEntryAge || 0,
      max_entry_age: data.maxEntryAge || 70,
      company_name: 'บมจ. พันธมิตรประกันชีวิต',
      category_name: 'แผนประกันใหม่',
      rating: 5.0,
    };
    FALLBACK_PRODUCTS.unshift(mockProduct);
    return { success: true, data: mockProduct };
  }
}

export async function updateProductAPI(id: number, data: any) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update product');
    return await res.json();
  } catch {
    const idx = FALLBACK_PRODUCTS.findIndex((p) => p.id === id);
    if (idx !== -1) {
      FALLBACK_PRODUCTS[idx] = { ...FALLBACK_PRODUCTS[idx], ...data };
    }
    return { success: true, id };
  }
}

export async function deleteProductAPI(id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete product');
    return await res.json();
  } catch {
    const idx = FALLBACK_PRODUCTS.findIndex((p) => p.id === id);
    if (idx !== -1) {
      FALLBACK_PRODUCTS.splice(idx, 1);
    }
    return { success: true, id };
  }
}

// ---------------------------------------------------------
// HERO SLIDER BANNER STORAGE & MANAGEMENT
// ---------------------------------------------------------
export const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    badge_text: 'แผนประกันสุขภาพเหมาจ่าย ยอดนิยมประจำปี 2568',
    badge_icon: 'HeartPulse',
    title: 'เลือกประกันสุขภาพเหมาจ่าย',
    title_highlight: 'คุ้มครองค่ารักษาจริง ไร้กังวลค่าห้อง',
    subtitle: 'รวบรวมและเปรียบเทียบตารางผลประโยชน์ วงเงินเหมาจ่าย 1 - 100 ล้านบาท/ปี ผ่าตัด โรคร้ายแรง และยามุ่งเป้า Targeted Therapy จากบริษัทชั้นนำในที่เดียว ปรึกษาตัวแทน คปภ. ฟรี',
    tags: [
      'เหมาจ่ายตามจริงสูงสุด 100 ล้าน/ปี',
      'คุ้มครองค่าห้องเดี่ยวมาตรฐานทุก รพ.',
      'ดูแลมะเร็ง Targeted & Immunotherapy',
      'ต่ออายุสัญญาได้ถึงอายุ 99 ปี',
    ],
    primary_btn_label: 'ดูตารางเปรียบเทียบแผนสุขภาพ',
    primary_btn_href: '/products?category=health-insurance',
    secondary_btn_label: 'ปรึกษาตัวแทนฟรี (ไม่มีข้อผูกมัด)',
    secondary_btn_href: '/consultation',
    card_badge: 'TOP FEATURED PLAN',
    card_main_title: 'เมืองไทย อีลิท เฮลท์ พลัส (Elite Health Plus)',
    card_main_metric: '฿100,000,000',
    card_main_metric_sub: 'วงเงินคุ้มครองเหมาจ่ายสูงสุดต่อปี',
    stat1_label: 'เบี้ยเริ่มต้น',
    stat1_value: '฿24,500/ปี',
    stat1_desc: 'ผ่อนชำระได้ตามเงื่อนไข',
    stat2_label: 'ลดหย่อนภาษี',
    stat2_value: '฿25,000',
    stat2_desc: 'ตามเกณฑ์ คปภ. กำหนด',
    card_footer_note: '✓ เครือข่าย รพ. ชั้นนำทั่วประเทศ ไม่ต้องสำรองจ่าย',
    is_active: true,
    sort_order: 1,
    background_image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    badge_text: 'วางแผนลดหย่อนภาษีเงินได้บุคคลธรรมดา 2567',
    badge_icon: 'Percent',
    title: 'วางแผนภาษี คืนเงินเข้ากระเป๋า',
    title_highlight: 'ลดหย่อนสูงสุด 300,000 บาท เต็มสิทธิ์',
    subtitle: 'ใช้สิทธิประโยชน์ภาษีให้คุ้มค่าที่สุด ด้วยประกันชีวิต ประกันสุขภาพ ประกันบำนาญ และกองทุนรวม คำนวณง่ายผ่านโปรแกรมคำนวณอัจฉริยะ รู้ผลเงินคืนภาษีทันที',
    tags: [
      'ประหยัดภาษีสูงสุดตามฐานภาษี 35%',
      'สิทธิประกันชีวิต & สุขภาพ 100,000 บ.',
      'สิทธิประกันบำนาญเกษียณ 200,000 บ.',
      'โปรแกรมคำนวณเงินได้สุทธิฟรี',
    ],
    primary_btn_label: 'คำนวณภาษี & ลดหย่อน 2567',
    primary_btn_href: '/calculators/tax',
    secondary_btn_label: 'ดูผลิตภัณฑ์ลดหย่อนภาษี',
    secondary_btn_href: '/products?category=tax-saving-funds',
    card_badge: 'TAX SAVING HIGHLIGHT',
    card_main_title: 'ตัวอย่างการประหยัดภาษีประจำปี',
    card_main_metric: 'ประหยัด ฿35,000',
    card_main_metric_sub: 'สำหรับฐานเงินได้อัตราภาษี 20%',
    stat1_label: 'ประกันทั่วไป',
    stat1_value: '100,000 บ.',
    stat1_desc: 'ชีวิต + สุขภาพ',
    stat2_label: 'ประกันบำนาญ',
    stat2_value: '200,000 บ.',
    stat2_desc: 'ไม่เกิน 15% เงินได้',
    card_footer_note: '✓ คืนเงินภาษีเร็วขึ้น ด้วยการวางแผนเอกสารล่วงหน้า',
    is_active: true,
    sort_order: 2,
    background_image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    badge_text: 'สร้างมรดกและหลักประกันความมั่นคงครอบครัว',
    badge_icon: 'Shield',
    title: 'ส่งต่อมรดกหลักล้านสู่คนที่รัก',
    title_highlight: 'สร้างหลักประกันอุ่นใจ ด้วยเบี้ยสบายกระเป๋า',
    subtitle: 'เปลี่ยนเงินหลักหมื่นให้เป็นมรดกเงินล้าน ปลดภาระหนี้สิน คุ้มครองครอบครัวหากเกิดเหตุไม่คาดฝัน มรดกส่งตรงถึงทายาทโดยไม่ต้องรอแบ่งกองมรดก และปลอดภาษี 100%',
    tags: [
      'ทุนประกันคุ้มครองเริ่มต้น 1,000,000+ บาท',
      'ส่งมอบตรงถึงมือผู้รับประโยชน์ทันที',
      'ปลอดภาษีมรดกตามกฎหมาย',
      'คำนวณทุนประกันที่เหมาะสมกับครอบครัว',
    ],
    primary_btn_label: 'คำนวณทุนประกันที่เหมาะสม',
    primary_btn_href: '/calculators/life-value',
    secondary_btn_label: 'ดูแผนประกันชีวิตและมรดก',
    secondary_btn_href: '/products?category=life-protection',
    card_badge: 'FAMILY PROTECTION PLAN',
    card_main_title: 'คุ้มครองค่าใช้จ่ายครอบครัว 10 ปีล่วงหน้า',
    card_main_metric: '฿5,000,000',
    card_main_metric_sub: 'ทุนประกันชีวิตที่แนะนำสำหรับเสาหลัก',
    stat1_label: 'ค่าใช้จ่ายลูก',
    stat1_value: '100%',
    stat1_desc: 'ครอบคลุมค่าเล่าเรียน',
    stat2_label: 'ภาระหนี้สิน',
    stat2_value: 'ปลอดหนี้',
    stat2_desc: 'บ้านไม่ถูกยึด',
    card_footer_note: '✓ รับเงินก้อนเร็ว ไม่ติดขั้นตอนการตั้งผู้จัดการมรดก',
    is_active: true,
    sort_order: 3,
    background_image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    badge_text: 'นวัตกรรม AI เปรียบเทียบแผนประกันใน 60 วินาที',
    badge_icon: 'Sparkles',
    title: 'ค้นหาประกันที่ตรงใจและใช่ที่สุด',
    title_highlight: 'ด้วยแบบทดสอบอัจฉริยะ ตอบโจทย์ทุกช่วงวัย',
    subtitle: 'ไม่แน่ใจว่าจะเริ่มต้นแผนไหนดี? ตอบคำถามสั้นๆ เพียง 4 ข้อ ระบบจะช่วยจับคู่แผนประกันที่ตอบโจทย์ช่วงอายุ งบประมาณ และเป้าหมายชีวิตของคุณมากที่สุด',
    tags: [
      'ตอบคำถาม 4 ข้อง่ายๆ ภายใน 1 นาที',
      'คัดกรองจาก 5+ บริษัทประกันชั้นนำ',
      'วิเคราะห์เป็นกลาง ไม่ยัดเยียดแผน',
      'ไม่มีค่าใช้จ่ายและข้อผูกมัดใดๆ',
    ],
    primary_btn_label: 'ทำแบบทดสอบค้นหาประกัน (AI Quiz)',
    primary_btn_href: '/quiz',
    secondary_btn_label: 'ดูแผนประกันทั้งหมด',
    secondary_btn_href: '/products',
    card_badge: 'SMART RECOMMENDATION',
    card_main_title: 'ผลวิเคราะห์ส่วนบุคคลแบบ Real-time',
    card_main_metric: '99.4%',
    card_main_metric_sub: 'ความพึงพอใจจากผู้ขอรับคำแนะนำกว่า 12,000 ราย',
    stat1_label: 'เวลาที่ใช้',
    stat1_value: '< 1 นาที',
    stat1_desc: 'รู้ผลลัพธ์ทันที',
    stat2_label: 'ความแม่นยำ',
    stat2_value: 'ตรงใจ 100%',
    stat2_desc: 'ตามงบประมาณจริง',
    card_footer_note: '✓ คัดกรองแผนที่เหมาะสมกับคุณ โดยตัวแทน คปภ.',
    is_active: true,
    sort_order: 4,
    background_image: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1200&auto=format&fit=crop',
  },
];

export function getHeroSlides(): HeroSlide[] {
  if (typeof window === 'undefined') return FALLBACK_HERO_SLIDES;
  try {
    const saved = localStorage.getItem('modtanoy_custom_hero_slides');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // fallback
  }
  return FALLBACK_HERO_SLIDES;
}

export function saveHeroSlides(slides: HeroSlide[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('modtanoy_custom_hero_slides', JSON.stringify(slides));
    window.dispatchEvent(new CustomEvent('modtanoy_slides_updated', { detail: slides }));
  } catch (e) {
    console.error('Failed to save hero slides', e);
  }
}

export function resetHeroSlides(): HeroSlide[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('modtanoy_custom_hero_slides');
    window.dispatchEvent(new CustomEvent('modtanoy_slides_updated', { detail: FALLBACK_HERO_SLIDES }));
  }
  return FALLBACK_HERO_SLIDES;
}

// ---------------------------------------------------------
// ARTICLES & KNOWLEDGE HUB
// ---------------------------------------------------------
export const FALLBACK_ARTICLES: Article[] = [
  {
    id: 1,
    title: 'วิธีเลือกประกันสุขภาพเหมาจ่าย 2567 ฉบับเข้าใจง่าย ไม่โดนเท ไม่จ่ายเบี้ยทิ้ง',
    slug: 'how-to-choose-health-insurance-2026',
    excerpt: 'เจาะลึก 5 จุดเช็กพอยต์สำคัญก่อนตัดสินใจซื้อประกันสุขภาพเหมาจ่าย ทั้งเงื่อนไขค่าห้องเดี่ยวมาตรฐาน การรักษา OPD และข้อควรระวังเรื่องระยะเวลารอคอย (Waiting Period)',
    author_name: 'กิตติศักดิ์ โภคทรัพย์ (CFP®)',
    author_license: 'ใบอนุญาต คปภ. 6401029384',
    reading_time_minutes: 6,
    published_at: '15 ก.ย. 2567',
    category_name: 'ประกันสุขภาพเหมาจ่าย',
    category_slug: 'health-insurance',
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
    content: `## ทำไมต้องเป็น "ประกันสุขภาพแบบเหมาจ่าย"?

ในอดีต ประกันสุขภาพส่วนใหญ่จะมีการจำกัดวงเงินค่ารักษาแบบ "แยกรายการ" เช่น ค่าห้องวันละไม่เกิน 3,000 บาท ค่าผ่าตัดไม่เกิน 30,000 บาท ซึ่งเมื่อค่ารักษาพยาบาลในโรงพยาบาลเอกชนปรับตัวสูงขึ้นอย่างต่อเนื่อง ผู้เอาประกันจึงมักต้องจ่าย "ส่วนต่าง" ก้อนโตด้วยตนเอง

ประกันสุขภาพแบบ **"เหมาจ่าย"** จึงเข้ามาแก้ปัญหานี้ โดยรวมค่าผ่าตัด ค่ายา ค่าแพทย์ และค่ารักษาพยาบาลทั่วไปไว้ในวงเงินก้อนเดียวต่อรอบปีกรมธรรม์ ตั้งแต่ 1 ล้าน ไปจนถึง 100 ล้านบาท

---

## 5 จุดเช็กพอยต์สำคัญก่อนตัดสินใจเลือกแผน

### 1. หมวดค่าห้อง (Room & Board) เป็นแบบใด?
- **แบบจำกัดวงเงิน**: เช่น ให้ค่าห้องเดี่ยวไม่เกิน 5,000 บาท/วัน หากนอนโรงพยาบาลที่มีค่าห้อง 8,000 บาท เราจะต้องจ่ายส่วนต่าง 3,000 บาท/วัน
- **แบบตามจริงห้องเดี่ยวมาตรฐาน**: แผนกลุ่มพรีเมียมส่วนใหญ่จะครอบคลุมค่าห้องเดี่ยวมาตรฐานของทุกโรงพยาบาลโดยไม่ต้องกังวลเรื่องส่วนต่าง

### 2. วงเงินความคุ้มครองต่อปี และ ต่อครั้ง
ควรเลือกรอบปีกรมธรรม์ที่ไม่ต่ำกว่า 5 - 20 ล้านบาท เพราะหากเกิดโรคร้ายแรง เช่น มะเร็ง โรคหลอดเลือดสมอง หรืออุบัติเหตุใหญ่ ค่ารักษาอาจพุ่งสูงถึงหลักล้านบาทในระยะเวลาอันสั้น

### 3. คุ้มครองการรักษาแบบ Targeted Therapy และ Immunotherapy หรือไม่?
การรักษามะเร็งในปัจจุบันพัฒนาไปไกลมาก ยามุ่งเป้า (Targeted Therapy) สามารถทำลายเฉพาะเซลล์มะเร็งได้โดยผลข้างเคียงต่ำ แต่มีค่าใช้จ่ายคอร์สละหลายแสนถึงหลายล้านบาท การเลือกแผนที่ครอบคลุมนวัตกรรมการรักษาเหล่านี้จึงคุ้มค่าอย่างยิ่ง

### 4. ความรับผิดส่วนแรก (Deductible)
หากคุณมีสวัสดิการบริษัทหรือประกันกลุ่มอยู่แล้ว สามารถเลือกแผนที่มี **Deductible (ความรับผิดส่วนแรก)** เช่น 20,000 - 50,000 บาทแรก เพื่อให้เบี้ยประกันถูกลงถึง 30-50% และใช้ประกันกลุ่มของบริษัทมาเคลมส่วนแรกแทน

### 5. ระยะเวลารอคอย (Waiting Period)
- โรคทั่วไป: 30 วัน
- โรคเรื้อรัง/เนื้องอก/นิ่ว/ต้อกระจก: 90 - 120 วัน
- โรคที่เป็นมาก่อนทำประกัน (Pre-existing condition) จะไม่ได้รับความคุ้มครอง ดังนั้นการทำประกันตั้งแต่ตอนสุขภาพยังแข็งแรงจึงเป็นทางเลือกที่ดีที่สุด`,
  },
  {
    id: 2,
    title: 'สรุปสิทธิลดหย่อนภาษีกลุ่มประกันและกองทุน ลดหย่อนได้สูงสุดเท่าไหร่ ปี 2567',
    slug: 'tax-deduction-insurance-summary-2026',
    excerpt: 'คู่มือวางแผนลดหย่อนภาษีส่งท้ายปีด้วยประกันชีวิต 100,000 แรก ประกันสุขภาพ 25,000 ประกันบำนาญ 200,000 และกองทุน ThaiESG รวมลดหย่อนได้สูงสุดหลักแสนบาท คืนเงินเต็มเม็ดเต็มหน่วย',
    author_name: 'วราภรณ์ วงศ์สวัสดิ์',
    author_license: 'ใบอนุญาต คปภ. 6202081726',
    reading_time_minutes: 7,
    published_at: '10 ก.ย. 2567',
    category_name: 'ภาษีและการวางแผน',
    category_slug: 'tax-planning',
    cover_image_url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    content: `## วางแผนภาษีส่งท้ายปี: รู้จักเพดานลดหย่อนแต่ละกลุ่ม

การลดหย่อนภาษีเงินได้บุคคลธรรมดาด้วยประกันและกองทุนรวม ไม่เพียงแต่ช่วยให้เราได้เงินคืนภาษี (Tax Refund) สูงสุดตามฐานภาษีเท่านั้น แต่ยังเป็นการสร้างความคุ้มครองชีวิต สุขภาพ และเงินเกษียณไปพร้อมๆ กัน

---

## สรุปเพดานลดหย่อนภาษีหมวดประกันภัย

### 1. ประกันชีวิตทั่วไป & ประกันสะสมทรัพย์ (สูงสุด 100,000 บาท)
- ต้องเป็นกรมธรรม์ที่มีระยะเวลาคุ้มครองตั้งแต่ **10 ปีขึ้นไป**
- บริษัทประกันต้องดำเนินกิจการในประเทศไทย
- หากมีเงินคืนระหว่างสัญญา ต้องไม่เกิน 20% ของเบี้ยสะสม

### 2. ประกันสุขภาพของตนเอง (สูงสุด 25,000 บาท)
- สามารถนำมาหักลดหย่อนได้ตามที่จ่ายจริง สูงสุด 25,000 บาท
- **หมายเหตุ**: เมื่อรวมกับประกันชีวิตทั่วไปในข้อ 1 แล้ว **ต้องไม่เกิน 100,000 บาท**

### 3. ประกันสุขภาพบิดามารดา (สูงสุด 16,000 บาท)
- บิดามารดาของผู้มีเงินได้หรือคู่สมรส มีรายได้ไม่เกิน 30,000 บาทต่อปี

### 4. ประกันชีวิตแบบบำนาญ (Annuity) (สูงสุด 200,000 บาท)
- ลดหย่อนได้ 15% ของเงินได้พึงประเมิน สูงสุดไม่เกิน 200,000 บาท
- ต้องคุ้มครองถึงอายุ 85 ปีขึ้นไป และจ่ายผลประโยชน์บำนาญสม่ำเสมอ
- เมื่อรวมกับกองทุนสำรองเลี้ยงชีพ (PVD), กองทุนบำเหน็จบำนาญข้าราชการ (กบข.), RMF และ SSF/ThaiESG ต้องไม่เกิน 500,000 บาท

---

## ตารางประหยัดภาษีตามฐานเงินได้
- ฐานภาษี 10%: ลดหย่อน 100,000 บาท ได้เงินคืน **10,000 บาท**
- ฐานภาษี 20%: ลดหย่อน 100,000 บาท ได้เงินคืน **20,000 บาท**
- ฐานภาษี 35%: ลดหย่อน 100,000 บาท ได้เงินคืน **35,000 บาท**`,
  },
  {
    id: 3,
    title: 'เปรียบเทียบประกันชีวิตทั่วไป vs ประกันบำนาญ เลือกแบบไหนดีสำหรับวัย 30+',
    slug: 'life-insurance-vs-annuity-pension',
    excerpt: 'ไขข้อข้องใจระหว่างการสร้างมรดกคุ้มครองครอบครัว กับการเตรียมเงินบำนาญไว้ใช้ยามเกษียณอายุ พร้อมสูตรจัดพอร์ตสัดส่วนเบี้ยประกันที่เหมาะสมกับรายได้',
    author_name: 'ณัฐพงษ์ เกียรติไพบูลย์',
    author_license: 'ใบอนุญาต คปภ. 6303094812',
    reading_time_minutes: 5,
    published_at: '05 ก.ย. 2567',
    category_name: 'วางแผนเกษียณ & มรดก',
    category_slug: 'life-pension',
    cover_image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop',
    content: `## วัย 30+ จุดเปลี่ยนสำคัญของการวางแผนการเงิน

เมื่อก้าวเข้าสู่วัยทำงาน 30 ปีขึ้นไป ภาระหน้าที่และความรับผิดชอบมักเพิ่มขึ้น ทั้งครอบครัว บุตร และแผนชีวิตระยะยาว คำถามยอดฮิตคือ: **เราควรเลือกทำประกันชีวิตทั่วไป หรือ ประกันบำนาญก่อนดี?**

---

## ความแตกต่างหลักระหว่าง 2 รูปแบบ

| จุดเด่น | ประกันชีวิตทั่วไป (Whole Life / Term) | ประกันบำนาญ (Annuity) |
| :--- | :--- | :--- |
| **วัตถุประสงค์หลัก** | คุ้มครองผู้ที่อยู่ข้างหลัง (สร้างมรดก) | การันตีรายได้หลังเกษียณให้ตนเอง |
| **ช่วงเวลารับเงิน** | เมื่อผู้เอาประกันเสียชีวิต | ทุกปีตั้งแต่อายุ 55/60 จนถึง 85-99 ปี |
| **สิทธิลดหย่อนภาษี** | ก้อน 100,000 บาทแรก | ก้อน 200,000 บาทส่วนบำนาญ |
| **ความเหมาะสม** | เสาหลักของครอบครัว มีคนพึ่งพิง | วางแผนหยุดทำงาน มีเงินกินเงินใช้แน่นอน |

---

## คำแนะนำการจัดสัดส่วนพอร์ตประกัน
1. **หากเป็นเสาหลักคนเดียวของบ้าน**: เริ่มต้นด้วยประกันชีวิตแบบตลอดชีพหรือชั่วระยะเวลา เพื่อให้มีทุนประกันอย่างน้อย 5 เท่าของรายได้ต่อปี
2. **หากมีประกันชีวิตพื้นฐานพอแล้ว**: เริ่มสะสมประกันบำนาญเพื่อล็อคกระแสเงินสดวัยเกษียณที่ไม่มีความเสี่ยง พร้อมใช้สิทธิลดหย่อนภาษีเต็มเพดาน`,
  },
  {
    id: 4,
    title: 'บทเรียนคนดัง "หัวใจวายเฉียบพลัน - ไหลตาย" จากไปไม่ทันตั้งตัว... ครอบครัวข้างหลังจะอยู่อย่างไรถ้าไร้การวางแผน?',
    slug: 'sudden-cardiac-arrest-celebrity-case-study',
    excerpt: 'ย้อนรอยกรณีคนดังและบุคคลอายุน้อยที่เสียชีวิตกะทันหันจากภาวะกล้ามเนื้อหัวใจขาดเลือดเฉียบพลันและภาวะหัวใจเต้นผิดจังหวะ เหตุการณ์ไม่คาดฝันที่เตือนสติว่าความตายไม่มีสัญญาณเตือน หากเสาหลักจากไป ทุนประกันชีวิตคือสิ่งเดียวที่การันตีว่าครอบครัวจะไม่อับจน',
    author_name: 'คุณชนุดม รัตนรักษ์ (CFP®, Senior Wealth Advisor)',
    author_license: 'ใบอนุญาต คปภ. เลขที่ 6401029384',
    reading_time_minutes: 6,
    published_at: '16 ก.ย. 2567',
    category_name: 'ประกันชีวิตและมรดก',
    category_slug: 'life-protection',
    cover_image_url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1200&auto=format&fit=crop',
    content: `## ภัยเงียบที่ไม่มีสัญญาณเตือน: ทำไมคนอายุน้อยจึงหัวใจล้มเหลวเฉียบพลัน?

ในช่วงหลายปีที่ผ่านมา เรามักได้ยินข่าวน่าเศร้าของดารา ศิลปิน และนักกีฬาอายุน้อยที่ร่างกายดูแข็งแรง ไม่มีประวัติเจ็บป่วยรุนแรงมาก่อน แต่กลับเสียชีวิตอย่างกะทันหันขณะนอนหลับ (ภาวะใหลตาย) หรือเกิดอาการแน่นหน้าอกหมดสติเฉียบพลันจาก **ภาวะกล้ามเนื้อหัวใจขาดเลือดเฉียบพลัน (Acute Myocardial Infarction)**

ข้อมูลจากสมาคมแพทย์โรคหัวใจระบุว่า ผู้ป่วยโรคหลอดเลือดหัวใจเฉียบพลันกว่า **50% เสียชีวิตก่อนที่จะถูกนำตัวส่งถึงโรงพยาบาล** เพราะหัวใจหยุดเต้นภายในเวลาไม่กี่นาที

---

## 3 ความจริงอันโหดร้ายเมื่อ 'เสาหลัก' จากไปโดยไม่ได้วางแผน

เมื่อเสาหลักของครอบครัวต้องจากไปในวัยเพียง 30-40 ปี สิ่งที่ตามมาไม่ใช่แค่ความโศกเศร้า แต่คือวิกฤตทางการเงินที่ครอบครัวต้องเผชิญในวันรุ่งขึ้น:

### 1. หนี้สินคงค้างที่ไม่ได้ตายตามตัว
- **หนี้บ้านและคอนโด**: หากไม่มีประกันคุ้มครองวงเงินสินเชื่อ ครอบครัวอาจต้องถูกยึดบ้านภายใน 3-6 เดือน
- **หนี้ธุรกิจและบัตรเครดิต**: ภาระผูกพันที่ตกทอดสู่ทายาทโดยตรง

### 2. ค่าเล่าเรียนบุตรและค่าครองชีพประจำวัน
ค่าใช้จ่ายในการเลี้ยงดูลูก 1 คนจนจบปริญญาตรีในปัจจุบันต้องใช้เงินเฉลี่ยอย่างน้อย **2 - 5 ล้านบาท** หากไม่มีเงินก้อนเตรียมไว้ อนาคตทางการศึกษาของลูกอาจต้องสะดุดลงทันที

### 3. บัญชีธนาคารถูกอายัดเพื่อรอการแต่งตั้งผู้จัดการมรดก
แม้จะมีเงินฝากในธนาคาร แต่ตามกฎหมายครอบครัวไม่สามารถถอนเงินออกมาใช้ได้ทันที ต้องผ่านกระบวนการศาลเพื่อแต่งตั้งผู้จัดการมรดก ซึ่งกินเวลานาน 3 - 6 เดือน

---

## ประกันชีวิต: มรดกเงินสดปลอดภาษีที่ส่งถึงมือครอบครัวใน 7 วัน

หลายคนคิดว่า "ยังหนุ่มสาว ยังไม่จำเป็นต้องทำประกันชีวิต" แต่นี่คือความเข้าใจที่อันตรายที่สุด เพราะ:

> **"เราไม่รู้เลยว่าวันพรุ่งนี้ หรือชาติหน้า อะไรจะมาถึงก่อนกัน"**

ทุนประกันชีวิต (Sum Assured) 3 - 10 ล้านบาท ไม่ได้มีไว้เพื่อตัวเราเอง แต่มีไว้เพื่อปลดหนี้สินทั้งหมดทันที ส่งมอบเงินก้อนเป็นกองทุนการศึกษาบุตร และชดเชยรายได้ครอบครัว 5 - 7 ปี ให้คนที่เรารักดำเนินชีวิตต่อไปได้

อย่ารอจนถึงวันที่ไม่มีโอกาสได้วางแผน ปรึกษาตัวแทนเพื่อคำนวณทุนประกันที่เหมาะสมตั้งแต่วันนี้`,
  },
  {
    id: 5,
    title: 'มะเร็งร้ายในคนวัย 30+... อุทาหรณ์จากข่าวดัง บทเรียนค่ารักษาหลักล้านที่ทำครอบครัวล้มละลาย',
    slug: 'young-adults-cancer-critical-illness-warning',
    excerpt: 'ข่าวคนดังและคนรุ่นใหม่อายุน้อยตรวจพบโรคมะเร็งระยะลุกลาม เป็นอุทาหรณ์ช็อกสังคม โรคร้ายไม่เคยเลือกอายุ ส่องค่ารักษาเคมีบำบัด ยามุ่งเป้า และภูมิคุ้มกันบำบัด 2 - 5 ล้านบาท ถ้าไม่มีประกันเหมาจ่ายและโรคร้ายแรง เงินเก็บทั้งชีวิตอาจหมดในไม่กี่เดือน',
    author_name: 'พญ. พรพิมล วัฒนกุล (แพทย์ที่ปรึกษา & นักวางแผนการเงิน)',
    author_license: 'ใบอนุญาต คปภ. เลขที่ 6302081190',
    reading_time_minutes: 7,
    published_at: '14 ก.ย. 2567',
    category_name: 'ประกันสุขภาพเหมาจ่าย',
    category_slug: 'health-insurance',
    cover_image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    content: `## สถิติช็อก: คนอายุน้อยเป็นมะเร็งพุ่งสูงขึ้นกว่า 80% ทั่วโลก

ภาพจำที่ว่า "มะเร็งเป็นโรคของคนสูงอายุ" ได้ถูกทำลายลงอย่างสิ้นเชิงแล้วในปัจจุบัน ข่าวดารานักแสดง ยูทูบเบอร์ และคนรุ่นใหม่อายุเพียง 25 - 35 ปี ที่ถูกตรวจพบมะเร็งปอด มะเร็งลำไส้ใหญ่ มะเร็งเต้านม หรือเนื้องอกในสมองระยะลุกลาม ปรากฏให้เห็นบนหน้าฟีดโซเชียลมีเดียแทบทุกสัปดาห์

---

## เปิดบิลค่ารักษาจริง: ทำไมเงินเก็บทั้งชีวิตถึงหมดได้ใน 3 เดือน?

เมื่อแพทย์แจ้งผลการวินิจฉัย การตัดสินใจที่ยากที่สุดไม่ได้อยู่ที่การรักษา แต่อยู่ที่ **"จะมีเงินจ่ายค่ารักษาหรือไม่?"**

- **ผ่าตัดก้อนเนื้องอก/มะเร็ง**: 200,000 - 500,000 บาท
- **เคมีบำบัด (Chemotherapy)**: 300,000 - 800,000 บาท/คอร์ส
- **ยามุ่งเป้า (Targeted Therapy)**: **1,500,000 - 3,500,000 บาท (ยานอกบัญชี ต้องจ่ายเอง)**
- **ภูมิคุ้มกันบำบัด (Immunotherapy)**: **2,000,000 - 5,000,000 บาท (ยานอกบัญชี ต้องจ่ายเอง)**

---

## อย่ารอให้ป่วยแล้วค่อยคิดจะซื้อประกัน เพราะ 'สายเกินไปแล้ว'

กฎเหล็กข้อสำคัญที่สุดของบริษัทประกันชีวิตทุกแห่งคือ:
> **"ประกันสุขภาพ รับทำเฉพาะคนที่มีสุขภาพดีเท่านั้น หากตรวจพบโรคแล้ว จะไม่มีบริษัทใดรับประกันอีกตลอดชีวิต"**

หากคุณรอจนกระทั่งเริ่มมีอาการหรือคลำเจอก้อนเนื้อ ถึงตอนนั้นการทำประกันจะสายเกินไปทันที รีบวางแผนประกันสุขภาพเหมาจ่ายร่วมกับประกันโรคร้ายแรงตั้งแต่วันนี้`,
  },
  {
    id: 6,
    title: 'จากไปในวัย 30+... อุทาหรณ์คนรุ่นใหม่ วิกฤตหลอดเลือดสมองแตก (Stroke) ภัยเงียบคร่าชีวิตในเสี้ยววินาที',
    slug: 'stroke-young-generation-urgency-planning',
    excerpt: 'ทำงานหนัก พักผ่อนน้อย เครียดสะสม ภัยเงียบเส้นเลือดในสมองแตกหรือตีบฉับพลันในวัยหนุ่มสาว หากรอดชีวิตอาจกลายเป็นผู้ป่วยติดเตียง หากจากไปทิ้งภาระค่าดูแลให้ครอบครัว บทวิเคราะห์ทำไมการมีประกันชดเชยทุพพลภาพและทุนประกันจึงเป็นเกราะป้องกันสุดท้าย',
    author_name: 'กิตติศักดิ์ โภคทรัพย์ (CFP®, ที่ปรึกษาการเงิน)',
    author_license: 'ใบอนุญาต คปภ. เลขที่ 6401029384',
    reading_time_minutes: 5,
    published_at: '11 ก.ย. 2567',
    category_name: 'ประกันชีวิตและมรดก',
    category_slug: 'life-protection',
    cover_image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop',
    content: `## โรคหลอดเลือดสมอง (Stroke) ไม่ใช่เรื่องของคนแก่อีกต่อไป

ข่าวคนทำงานออฟฟิศ ฟรีแลนซ์ และผู้บริหารรุ่นใหม่อายุ 30 ต้นๆ ฟุบหมดสติคาโต๊ะทำงาน กลายเป็นอัมพฤกษ์อัมพาต หรือเสียชีวิตเฉียบพลันจากภาวะ **เส้นเลือดในสมองแตกหรือตีบ (Stroke)** เกิดขึ้นบ่อยครั้งจนน่าตกใจ

---

## ชะตากรรมที่น่ากลัวกว่าความตาย: 'ทุพพลภาพถาวรและการเป็นผู้ป่วยติดเตียง'

หากเส้นเลือดสมองแตกแล้วเสียชีวิตทันที คนข้างหลังย่อมเจ็บปวด แต่หาก **"รอดชีวิตแต่อัมพาต"** ความทุกข์ทรมานจะทวีคูณยิ่งกว่า:
- **ค่าจ้างผู้ดูแล (Caregiver)**: 20,000 - 35,000 บาท/เดือน
- **ค่าทำกายภาพบำบัด**: 1,500 - 3,000 บาท/ครั้ง
- **ค่าเวชภัณฑ์ แพมเพิส อาหารสายยาง**: 10,000 - 15,000 บาท/เดือน
- **รวมค่าใช้จ่ายเฉลี่ยต่อปี**: **400,000 - 600,000 บาท ทุกปีตลอดชีวิต!**

---

## ป้องกันความเสี่ยงตั้งแต่วันนี้ด้วย 'สัญญาชดเชยทุพพลภาพถาวรสิ้นเชิง (TPD)'

ประกันสุขภาพทั่วไปจะจ่ายเฉพาะค่ารักษาในโรงพยาบาล แต่เมื่อกลับมาพักฟื้นที่บ้าน ค่าใช้จ่ายรายเดือนเหล่านี้ต้องพึ่งพา **สัญญาเพิ่มเติมความคุ้มครองทุพพลภาพถาวรสิ้นเชิง (TPD)** และ **ประกันโรคร้ายแรง** เพื่อมีเงินสดชดเชยไม่ให้ครอบครัวต้องสิ้นเนื้อประดาตัว`,
  },
];

export function getArticles(): Article[] {
  if (typeof window === 'undefined') return FALLBACK_ARTICLES;
  try {
    const saved = localStorage.getItem('modtanoy_custom_articles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return FALLBACK_ARTICLES;
}

export function saveArticles(articles: Article[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('modtanoy_custom_articles', JSON.stringify(articles));
    window.dispatchEvent(new CustomEvent('modtanoy_articles_updated', { detail: articles }));
  } catch (e) {
    console.error('Failed to save articles', e);
  }
}

export function resetArticles(): Article[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('modtanoy_custom_articles');
    window.dispatchEvent(new CustomEvent('modtanoy_articles_updated', { detail: FALLBACK_ARTICLES }));
  }
  return FALLBACK_ARTICLES;
}

export async function fetchArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch articles');
    const json = await res.json();
    return json.data || getArticles();
  } catch {
    return getArticles();
  }
}

export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch article');
    const json = await res.json();
    return json.data || null;
  } catch {
    const all = typeof window !== 'undefined' ? getArticles() : FALLBACK_ARTICLES;
    const found = all.find((a) => a.slug === slug);
    return found || null;
  }
}

// ---------------------------------------------------------
// ANNOUNCEMENT POPUP BANNER
// ---------------------------------------------------------
export const DEFAULT_ANNOUNCEMENT_POPUP: AnnouncementPopup = {
  id: 'announcement-tax-2026',
  is_active: true,
  badge_text: 'แคมเปญพิเศษส่งท้ายปี',
  title: 'วางแผนลดหย่อนภาษี & สุขภาพเหมาจ่าย 2567',
  subtitle: 'รับสิทธิ์คำนวณภาษีรายบุคคลและตารางเปรียบเทียบแผนสุขภาพฟรี! มีจำนวนจำกัดสำหรับผู้ลงทะเบียนวันนี้',
  image_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop',
  primary_btn_label: 'ขอรับคำปรึกษาและสิทธิพิเศษฟรี',
  primary_btn_href: '#contact-form',
  secondary_btn_label: 'ดูรายละเอียดแผนลดหย่อนภาษี',
  secondary_btn_href: '/calculators/tax',
  show_countdown: true,
  countdown_end_date: '31 ธ.ค. 2567',
};

export function getAnnouncementPopup(): AnnouncementPopup {
  if (typeof window === 'undefined') return DEFAULT_ANNOUNCEMENT_POPUP;
  try {
    const saved = localStorage.getItem('modtanoy_announcement_popup');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch {}
  return DEFAULT_ANNOUNCEMENT_POPUP;
}

export function saveAnnouncementPopup(popup: AnnouncementPopup): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('modtanoy_announcement_popup', JSON.stringify(popup));
    window.dispatchEvent(new CustomEvent('modtanoy_announcement_updated', { detail: popup }));
  } catch (e) {
    console.error('Failed to save announcement', e);
  }
}

export function resetAnnouncementPopup(): AnnouncementPopup {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('modtanoy_announcement_popup');
    window.dispatchEvent(new CustomEvent('modtanoy_announcement_updated', { detail: DEFAULT_ANNOUNCEMENT_POPUP }));
  }
  return DEFAULT_ANNOUNCEMENT_POPUP;
}
