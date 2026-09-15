# FinAdvisor TH - เว็บไซต์แนะนำและเปรียบเทียบประกันและผลิตภัณฑ์ทางการเงิน
(Financial & Insurance Advisory Platform)

โปรเจกต์สถาปัตยกรรมแบบแยกเซิร์ฟเวอร์ (Decoupled Architecture) ระหว่าง Frontend (Next.js / React) และ Backend API (Node.js + Express + MySQL)

---

## โครงสร้างโปรเจกต์ (Directory Structure)

```
web-hobby/
├── backend/                  # RESTful API Server (Node.js, Express, TypeScript, MySQL)
│   ├── src/
│   │   ├── config/           # Database pool & auto table migration (db.ts)
│   │   ├── controllers/      # Route controllers (product, calculator, lead, article)
│   │   ├── services/         # Business logic (tax calculation, life value, matching)
│   │   ├── routes/           # API routes (/api/v1/...)
│   │   ├── middlewares/      # Error handler, CORS, Helmet
│   │   └── scripts/          # Database seed script with sample data
│   ├── .env                  # Port, DB credentials, CORS settings
│   └── package.json
│
├── frontend/                 # Web Application (Next.js 15, React 19, TailwindCSS, TypeScript)
│   ├── src/
│   │   ├── app/              # App Router (Home, Products, Detail, Calculators, Quiz, Articles)
│   │   │   ├── sitemap.ts    # Dynamic XML Sitemap (SEO)
│   │   │   └── robots.ts     # Dynamic robots.txt (SEO)
│   │   ├── components/       # UI Components & Schema.org JSON-LD (SEO)
│   │   ├── lib/              # API Client & Fallback data
│   │   └── types/            # TypeScript interfaces
│   ├── .env.local            # API endpoint URL (http://localhost:5000/api/v1)
│   └── package.json
│
└── PROJECT_PLAN.md           # แผนงานระบบ สเปก API ฐานข้อมูล ERD และกลยุทธ์ SEO ฉบับเต็ม
```

---

## วิธีการรันโปรเจกต์ (Getting Started)

### 1. การเปิดใช้งานฐานข้อมูล MySQL
- หากใช้ **XAMPP**: เปิดโปรแกรม XAMPP Control Panel และกดปุ่ม **Start** ที่โมดูล **MySQL**
- ฐานข้อมูลจะสร้างชื่อ `financial_advisory_db` ให้อัตโนมัติเมื่อสตาร์ท Backend พร้อม Seed ข้อมูลประกันตัวอย่างทันที

### 2. รัน Backend API Server
```bash
cd backend
npm run dev
```
- API จะรันอยู่ที่: `http://localhost:5000`
- Health check: `http://localhost:5000/api/v1/health`

### 3. รัน Frontend Server (Next.js)
เปิด Terminal อีกหน้าต่างหนึ่ง:
```bash
cd frontend
npm run dev
```
- เว็บไซต์จะเปิดที่: `http://localhost:3000`

---

## ฟังก์ชันเด่นของระบบ (Key Features)
1. **แคตตาล็อกและเปรียบเทียบประกัน (`/products`, `/products/[slug]`):**
   - เปรียบเทียบผลประโยชน์ ค่าห้อง วงเงินเหมาจ่าย และเบี้ยประกัน
   - ฝัง Schema.org (FinancialProduct, FAQPage, BreadcrumbList) สำหรับ Google Rich Snippets
2. **โปรแกรมคำนวณภาษี 2567 (`/calculators/tax`):**
   - คำนวณตามฐานภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได 0% - 35%
   - แสดงภาษีที่ประหยัดได้จริงเมื่อซื้อประกันสุขภาพ (25,000) ประกันชีวิต (100,000) และประกันบำนาญ (200,000)
3. **โปรแกรมคำนวณทุนประกันคุ้มครองครอบครัว (`/calculators/life-value`):**
   - คำนวณมูลค่าความคุ้มครองชีวิตตามภาระครอบครัว หนี้สิน และทุนการศึกษาบุตร
4. **แบบทดสอบค้นหาแผนประกันที่ใช่ (`/quiz`):**
   - วิเคราะห์ความต้องการ 4 ขั้นตอน แนะนำแผนที่ตรงใจตามงบประมาณ
5. **ระบบรับคำปรึกษาและ Lead Management (`/consultation`):**
   - รองรับความยินยอมตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA Consent)
