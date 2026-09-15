export interface Company {
  id: number;
  name: string;
  code: string;
  logo_url: string;
  contact_phone: string;
}

export interface Category {
  id: number;
  slug: string;
  name_th: string;
  name_en: string;
  category_type: 'INSURANCE' | 'INVESTMENT' | 'TAX';
  description: string;
  icon: string;
  product_count?: number;
}

export interface ProductPlan {
  id: number;
  product_id: number;
  plan_name: string;
  base_sum_assured: number;
  base_premium_male: number;
  base_premium_female: number;
  details?: Record<string, any>;
}

export interface ProductBenefit {
  id: number;
  product_id: number;
  benefit_category: string;
  benefit_title: string;
  coverage_amount_desc: string;
  sort_order: number;
}

export interface Product {
  id: number;
  category_id: number;
  company_id: number;
  code: string;
  title: string;
  slug: string;
  summary: string;
  full_description?: string;
  highlight_points: string[] | string;
  min_entry_age: number;
  max_entry_age: number;
  min_premium: number;
  premium_payment_term: string;
  coverage_term: string;
  is_tax_deductible: boolean;
  max_tax_deduction: number;
  is_featured: boolean;
  rating: number;
  category_name?: string;
  category_slug?: string;
  company_name?: string;
  company_code?: string;
  company_logo?: string;
  company_phone?: string;
  plans?: ProductPlan[];
  benefits?: ProductBenefit[];
}

export interface TaxCalculationResult {
  annualIncome: number;
  standardExpenseDeduction: number;
  personalDeduction: number;
  totalInsuranceDeductionsBefore: number;
  totalInsuranceDeductionsAfter: number;
  netTaxableIncomeBefore: number;
  netTaxableIncomeAfter: number;
  totalTaxBefore: number;
  totalTaxAfter: number;
  taxSaved: number;
  marginalTaxRate: number;
  bracketsBreakdown: {
    range: string;
    rate: number;
    taxableAmount: number;
    taxInThisBracket: number;
  }[];
}

export interface LifeValueResult {
  totalFamilyNeeds: number;
  totalDebts: number;
  totalEducationAndEmergency: number;
  grossRequiredCapital: number;
  totalExistingProtection: number;
  netRecommendedSumAssured: number;
  estimatedAnnualPremium: {
    termInsurance: number;
    wholeLifeInsurance: number;
  };
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_license?: string;
  cover_image_url?: string;
  reading_time_minutes: number;
  published_at: string;
  category_name?: string;
  category_slug?: string;
}
