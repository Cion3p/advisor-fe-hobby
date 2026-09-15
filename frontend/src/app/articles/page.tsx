import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'สาระน่ารู้การเงิน ภาษี และประกันชีวิต | FinAdvisor TH',
  description: 'รวมบทความให้ความรู้เรื่องการวางแผนการเงิน เคล็ดลับการเลือกซื้อประกันสุขภาพเหมาจ่าย และสรุปสิทธิลดหย่อนภาษี 2567 เขียนโดยที่ปรึกษาการเงินมืออาชีพ',
};

const SAMPLE_ARTICLES = [
  {
    id: 1,
    title: 'วิธีเลือกประกันสุขภาพเหมาจ่าย 2567 ฉบับเข้าใจง่าย ไม่โดนเท ไม่จ่ายเบี้ยทิ้ง',
    slug: 'how-to-choose-health-insurance-2026',
    excerpt: 'เจาะลึก 5 จุดเช็กพอยต์สำคัญก่อนตัดสินใจซื้อประกันสุขภาพเหมาจ่าย ทั้งเงื่อนไขค่าห้อง การรักษา OPD และข้อควรระวังเรื่องระยะเวลารอคอย (Waiting Period)',
    author_name: 'กิตติศักดิ์ โภคทรัพย์ (CFP®)',
    author_license: 'ใบอนุญาต คปภ. 6401029384',
    reading_time: 6,
    date: '15 ก.ย. 2567',
    category: 'ประกันสุขภาพ',
  },
  {
    id: 2,
    title: 'สรุปสิทธิลดหย่อนภาษีกลุ่มประกันและกองทุน ลดหย่อนได้สูงสุดเท่าไหร่ ปี 2567',
    slug: 'tax-deduction-insurance-summary-2026',
    excerpt: 'คู่มือวางแผนลดหย่อนภาษีส่งท้ายปีด้วยประกันชีวิต 100,000 แรก ประกันสุขภาพ 25,000 ประกันบำนาญ 200,000 และกองทุน ThaiESG รวมลดหย่อนได้สูงสุดหลักแสนบาท',
    author_name: 'วราภรณ์ วงศ์สวัสดิ์',
    author_license: 'ใบอนุญาต คปภ. 6202081726',
    reading_time: 7,
    date: '10 ก.ย. 2567',
    category: 'ภาษีและการวางแผน',
  },
];

export default function ArticlesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
          <BookOpen className="w-3.5 h-3.5 text-brand-600" /> ศูนย์รวมสาระน่ารู้การเงินและภาษี
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          บทความและคู่มือวางแผนการเงิน
        </h1>
        <p className="text-sm text-slate-500">
          อัปเดตกฎหมายภาษี เทคนิคการเคลมประกัน และข้อควรรู้ก่อนทำสัญญากรมธรรม์
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {SAMPLE_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-2xl border border-slate-200/80 hover:border-brand-300 shadow-sm hover:shadow-lg transition-all p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-50 text-brand-700">
                {article.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 hover:text-brand-600 transition-colors leading-snug">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="space-y-0.5">
                <div className="font-semibold text-slate-800 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  {article.author_name}
                </div>
                <div className="text-[11px] text-slate-400">{article.author_license}</div>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {article.reading_time} นาที
                </span>
                <Link
                  href={`/articles/${article.slug}`}
                  className="font-bold text-brand-600 hover:text-brand-800 flex items-center gap-0.5"
                >
                  อ่านต่อ <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
