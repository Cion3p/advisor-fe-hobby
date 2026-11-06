export interface CompanyBrandInfo {
  code: string;
  name: string;
  fullName: string;
  brandColor: string;
  lightBg: string;
  borderColor: string;
  textColor: string;
  phone: string;
}

export const COMPANY_BRANDS: Record<string, CompanyBrandInfo> = {
  MTL: {
    code: 'MTL',
    name: 'เมืองไทยประกันชีวิต',
    fullName: 'บมจ. เมืองไทยประกันชีวิต (Muang Thai Life)',
    brandColor: '#e11482', // Signature MTL Fuchsia Pink
    lightBg: '#fdf2f8',
    borderColor: '#fbcfe8',
    textColor: '#be185d',
    phone: '1766',
  },
  AIA: {
    code: 'AIA',
    name: 'เอไอเอ ประเทศไทย',
    fullName: 'เอไอเอ ประเทศไทย (AIA Thailand)',
    brandColor: '#d31145', // AIA Crimson Red
    lightBg: '#fef2f2',
    borderColor: '#fecaca',
    textColor: '#b91c1c',
    phone: '1581',
  },
  AZAY: {
    code: 'AZAY',
    name: 'อลิอันซ์ อยุธยา',
    fullName: 'บมจ. อลิอันซ์ อยุธยา ประกันชีวิต (Allianz Ayudhya)',
    brandColor: '#003781', // Allianz Royal Blue
    lightBg: '#eff6ff',
    borderColor: '#bfdbfe',
    textColor: '#1d4ed8',
    phone: '1373',
  },
  KTAXA: {
    code: 'KTAXA',
    name: 'กรุงไทย-แอกซ่า',
    fullName: 'บมจ. กรุงไทย-แอกซ่า ประกันชีวิต (Krungthai-AXA)',
    brandColor: '#00205b', // AXA Navy & Cyan
    lightBg: '#f0fdfa',
    borderColor: '#99f6e4',
    textColor: '#0f766e',
    phone: '1159',
  },
  FWD: {
    code: 'FWD',
    name: 'เอฟดับบลิวดี ประกันชีวิต',
    fullName: 'บมจ. เอฟดับบลิวดี ประกันชีวิต (FWD Life)',
    brandColor: '#e87722', // FWD Bright Orange
    lightBg: '#fff7ed',
    borderColor: '#fed7aa',
    textColor: '#c2410c',
    phone: '1351',
  },
  BLA: {
    code: 'BLA',
    name: 'กรุงเทพประกันชีวิต',
    fullName: 'บมจ. กรุงเทพประกันชีวิต (Bangkok Life Assurance)',
    brandColor: '#002d72', // BLA Ocean Deep Blue
    lightBg: '#f0f9ff',
    borderColor: '#bae6fd',
    textColor: '#0369a1',
    phone: '02-777-8888',
  },
};

export function resolveCompanyBrand(codeOrName?: string): CompanyBrandInfo {
  if (!codeOrName) {
    return {
      code: 'INSURER',
      name: 'บริษัทประกันชั้นนำ',
      fullName: 'พันธมิตรบริษัทประกันชีวิตที่ได้รับใบอนุญาต คปภ.',
      brandColor: '#0284c7',
      lightBg: '#f0f9ff',
      borderColor: '#bae6fd',
      textColor: '#0369a1',
      phone: '1186',
    };
  }

  const upper = codeOrName.toUpperCase();
  if (upper.includes('MTL') || upper.includes('เมืองไทย') || upper.includes('MUANG THAI')) {
    return COMPANY_BRANDS.MTL;
  }
  if (upper.includes('AIA') || upper.includes('เอไอเอ')) {
    return COMPANY_BRANDS.AIA;
  }
  if (upper.includes('AZAY') || upper.includes('ALLIANZ') || upper.includes('อลิอันซ์') || upper.includes('อยุธยา')) {
    return COMPANY_BRANDS.AZAY;
  }
  if (upper.includes('KTAXA') || upper.includes('AXA') || upper.includes('กรุงไทย') || upper.includes('แอกซ่า')) {
    return COMPANY_BRANDS.KTAXA;
  }
  if (upper.includes('FWD') || upper.includes('เอฟดับบลิวดี')) {
    return COMPANY_BRANDS.FWD;
  }
  if (upper.includes('BLA') || upper.includes('BANGKOK LIFE') || upper.includes('กรุงเทพประกัน')) {
    return COMPANY_BRANDS.BLA;
  }

  return {
    code: codeOrName.slice(0, 5).toUpperCase(),
    name: codeOrName,
    fullName: codeOrName,
    brandColor: '#0284c7',
    lightBg: '#f0f9ff',
    borderColor: '#bae6fd',
    textColor: '#0369a1',
    phone: '1186',
  };
}
