import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  ShieldCheck, 
  PhoneCall, 
  CheckCircle2,
  Receipt,
  ArrowRight
} from 'lucide-react';
import { fetchArticleBySlug, fetchArticles } from '@/lib/api';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await fetchArticleBySlug(resolvedParams.slug);

  if (!article) {
    return { title: 'ไม่พบบทความ' };
  }

  return {
    title: `${article.title} | FinAdvisor TH`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | FinAdvisor TH`,
      description: article.excerpt,
      images: article.cover_image_url ? [article.cover_image_url] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await fetchArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Fetch other articles for "Related Articles" section
  const allArticles = await fetchArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-sky-700 transition-colors">หน้าแรก</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-sky-700 transition-colors">สาระน่ารู้ & บทความ</Link>
        <span>/</span>
        <span className="text-slate-800 font-semibold truncate max-w-sm">{article.title}</span>
      </nav>

      {/* Main Grid: Article Content (2 cols) + Sticky Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Article Body */}
        <article className="lg:col-span-2 space-y-8">
          
          {/* Article Header Card */}
          <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-100">
                {article.category_name || 'ความรู้การเงิน'}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> ใช้เวลาอ่าน {article.reading_time_minutes} นาที
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>

            {/* Author & Publishing Date */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div className="w-11 h-11 rounded-full bg-sky-100 text-sky-700 font-black text-base flex items-center justify-center shrink-0 border border-sky-200">
                {article.author_name ? article.author_name.charAt(0) : 'A'}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{article.author_name}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" /> คปภ. รับรอง
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                  <span>{article.author_license || 'ผู้เชี่ยวชาญการเงิน'}</span>
                  <span>•</span>
                  <span>{article.published_at}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {article.cover_image_url && (
            <div className="rounded-3xl overflow-hidden border border-sky-100 shadow-sm">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-[320px] sm:h-[420px] object-cover"
              />
            </div>
          )}

          {/* Excerpt Summary Box */}
          <div className="bg-sky-50/70 border-l-4 border-sky-600 p-6 rounded-r-2xl space-y-2">
            <h4 className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              สรุปใจความสำคัญ
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              {article.excerpt}
            </p>
          </div>

          {/* Full Markdown Content Render */}
          <div className="bg-white rounded-3xl border border-sky-100 p-6 sm:p-10 shadow-xs space-y-6 text-slate-800 leading-relaxed">
            {article.content ? (
              <div className="space-y-6 text-sm sm:text-base leading-relaxed">
                {article.content.split('\n\n').map((paragraph, index) => {
                  // H2 Heading
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl sm:text-2xl font-black text-slate-900 pt-4 border-t border-slate-100">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  // H3 Heading
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-bold text-slate-900 pt-2 text-sky-900">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  // Table or special syntax
                  if (paragraph.includes('|')) {
                    return (
                      <div key={index} className="overflow-x-auto my-4">
                        <pre className="text-xs bg-slate-50 p-4 rounded-xl font-mono text-slate-700 border border-slate-200 whitespace-pre-wrap">
                          {paragraph}
                        </pre>
                      </div>
                    );
                  }
                  // Bullet lists
                  if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                    return (
                      <ul key={index} className="space-y-2 pl-2">
                        {paragraph.split('\n').map((line, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2 text-slate-700 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-2 shrink-0"></span>
                            <span>{line.replace(/^[-*]|\d+\.\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Divider
                  if (paragraph.trim() === '---') {
                    return <hr key={index} className="border-slate-100 my-6" />;
                  }
                  // Regular paragraph
                  return (
                    <p key={index} className="text-slate-700">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-600">{article.excerpt}</p>
            )}
          </div>

          {/* Bottom Callout & Back to Articles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-sky-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> ดูบทความทั้งหมด
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700"
            >
              ดูแผนประกันที่เกี่ยวข้อง <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>

        {/* Right Column: Sticky Consultation & Calculators Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
          
          {/* Free Advisory Box */}
          <div className="bg-white rounded-3xl border border-sky-100 p-6 shadow-sm space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shadow-2xs">
              <PhoneCall className="w-6 h-6" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg font-black text-slate-900">
                ปรึกษาผู้เชี่ยวชาญฟรี
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                ต้องการวางแผนประกันสุขภาพเหมาจ่าย หรือลดหย่อนภาษีตามโจทย์เฉพาะของคุณ? ปรึกษาตัวแทนมืออาชีพได้ฟรี ไม่มีข้อผูกมัด
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/consultation"
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-orange-600/20 text-xs text-center transition-all cursor-pointer"
              >
                <span>ขอรับคำปรึกษาและคำนวณเบี้ยฟรี</span>
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full inline-flex items-center justify-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold py-2.5 px-4 rounded-xl border border-sky-100 text-xs text-center transition-all"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span>คำนวณสิทธิลดหย่อนภาษี</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              🔒 ข้อมูลของคุณปลอดภัยตามมาตรฐาน PDPA
            </div>
          </div>

          {/* Related Articles Box */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-3xl border border-sky-100 p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-sky-600" /> บทความที่คุณอาจสนใจ
              </h4>

              <div className="divide-y divide-slate-100">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.slug}`}
                    className="block py-3 first:pt-0 last:pb-0 group"
                  >
                    <span className="text-[11px] font-bold text-sky-700 block mb-1">
                      {rel.category_name}
                    </span>
                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {rel.reading_time_minutes} นาที • {rel.published_at}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
