'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  CheckCircle, 
  Send,
  AlertCircle
} from 'lucide-react';
import { submitLeadAPI } from '@/lib/api';

function ConsultationForm() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  const productTitle = searchParams.get('title');

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    preferredContactTime: 'ช่วงบ่าย (13:00 - 17:00 น.)',
    province: 'กรุงเทพมหานคร',
    budgetRange: '20,000 - 40,000 บาท/ปี',
    userNotes: productTitle ? `สนใจแผนประกัน: ${productTitle}` : '',
    pdpaConsent: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.customerName || !formData.customerPhone) {
      setError('กรุณากรอกชื่อและเบอร์โทรศัพท์');
      return;
    }

    if (!formData.pdpaConsent) {
      setError('กรุณากดยินยอมข้อตกลง PDPA เพื่อให้เจ้าหน้าที่ติดต่อกลับ');
      return;
    }

    setLoading(true);
    try {
      await submitLeadAPI({
        ...formData,
        interestedProductId: productId ? Number(productId) : undefined,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-zinc-200 text-center space-y-5">
        <div className="w-12 h-12 bg-zinc-100 text-zinc-900 border border-zinc-200 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900">
          ส่งคำขอรับคำปรึกษาเรียบร้อยแล้ว
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
          ขอบพระคุณคุณ <strong className="text-zinc-900 font-semibold">{formData.customerName}</strong> ที่ไว้วางใจ ModtanoyAdvisor ทางที่ปรึกษาการเงินที่มีใบอนุญาต คปภ. จะติดต่อกลับผ่านเบอร์ <strong className="text-zinc-900 font-mono font-semibold">{formData.customerPhone}</strong> ในช่วง {formData.preferredContactTime} เพื่อให้ข้อมูลเบี้ยประกันและผลประโยชน์อย่างละเอียด
        </p>
        <div className="pt-3 border-t border-zinc-100 flex justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center h-9 px-4 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 active:scale-[0.98] transition duration-150"
          >
            กลับสู่หน้าแรก
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 sm:p-8 rounded-xl border border-zinc-200 space-y-6">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
          <span>FREE ADVISORY</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
          ขอรับคำปรึกษาและคำนวณเบี้ยประกัน
        </h1>
        <p className="text-xs text-zinc-500">
          กรอกข้อมูลเพื่อให้ตัวแทนผู้เชี่ยวชาญ คปภ. ติดต่อกลับเพื่ออธิบายตารางผลประโยชน์
        </p>
      </div>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-700 block">
              ชื่อ - นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="เช่น สมชาย ใจดี"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-xs focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-700 block">
              เบอร์โทรศัพท์ติดต่อ <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="08X-XXX-XXXX"
              value={formData.customerPhone}
              onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-xs font-mono focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-700 block">
              อีเมล (ไม่บังคับ)
            </label>
            <input
              type="email"
              placeholder="yourname@example.com"
              value={formData.customerEmail}
              onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-xs focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-medium text-zinc-700 block">
              ช่วงเวลาที่สะดวกให้ติดต่อกลับ
            </label>
            <select
              value={formData.preferredContactTime}
              onChange={(e) => setFormData({ ...formData, preferredContactTime: e.target.value })}
              className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-xs bg-white focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              <option>ช่วงเช้า (09:00 - 12:00 น.)</option>
              <option>ช่วงบ่าย (13:00 - 17:00 น.)</option>
              <option>ช่วงเย็นหลังเลิกงาน (17:00 - 20:00 น.)</option>
              <option>สะดวกทุกเวลา</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-700 block">
            งบประมาณเบี้ยประกันที่ตั้งไว้ต่อปี
          </label>
          <select
            value={formData.budgetRange}
            onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-zinc-200 text-xs bg-white focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
          >
            <option>ต่ำกว่า 20,000 บาท/ปี</option>
            <option>20,000 - 40,000 บาท/ปี</option>
            <option>40,000 - 70,000 บาท/ปี</option>
            <option>70,000 - 100,000 บาท/ปี</option>
            <option>มากกว่า 100,000 บาท/ปี</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-medium text-zinc-700 block">
            ข้อมูลหรือข้อสงสัยเพิ่มเติม
          </label>
          <textarea
            rows={3}
            value={formData.userNotes}
            onChange={(e) => setFormData({ ...formData, userNotes: e.target.value })}
            placeholder="เช่น ต้องการเน้นค่าห้องเดี่ยว, สนใจประกันลดหย่อนภาษี, หรือมีโรคประจำตัว"
            className="w-full p-3 rounded-lg border border-zinc-200 text-xs focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
          />
        </div>

        {/* PDPA Consent Checkbox */}
        <div className="bg-zinc-50 p-3.5 rounded-lg border border-zinc-200 space-y-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.pdpaConsent}
              onChange={(e) => setFormData({ ...formData, pdpaConsent: e.target.checked })}
              className="w-4 h-4 text-zinc-900 rounded border-zinc-300 focus:ring-zinc-400 mt-0.5 cursor-pointer"
            />
            <span className="text-[11px] text-zinc-600 leading-relaxed">
              ข้าพเจ้ายินยอมให้ ModtanoyAdvisor และตัวแทนประกันชีวิต/ที่ปรึกษาการเงินที่มีใบอนุญาตติดต่อเพื่อนำเสนอข้อมูล เปรียบเทียบผลประโยชน์ และคำนวณเบี้ยประกันตามเงื่อนไขใน <a href="/privacy-policy" target="_blank" className="text-zinc-900 underline font-medium">นโยบายความเป็นส่วนตัว (PDPA)</a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-10 flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-lg text-xs active:scale-[0.98] transition duration-150 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            'กำลังส่งข้อมูล...'
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>ส่งข้อมูลขอรับคำปรึกษาฟรี</span>
            </>
          )}
        </button>

        <p className="text-[10px] font-mono text-zinc-400 text-center">
          🔒 ข้อมูลของคุณปลอดภัยตามมาตรฐาน PDPA ไม่มีการส่งต่อเบอร์โทร
        </p>
      </form>
    </div>
  );
}

export default function ConsultationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="text-center py-20 text-xs text-zinc-500 font-mono">กำลังโหลดแบบฟอร์ม...</div>}>
        <ConsultationForm />
      </Suspense>
    </div>
  );
}
