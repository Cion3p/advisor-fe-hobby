import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  PhoneCall, 
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
    title: `${article.title} | ModtanoyAdvisor`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | ModtanoyAdvisor`,
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

  const allArticles = await fetchArticles();
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors duration-150">หน้าแรก</Link>
        <span className="text-stone-300">/</span>
        <Link href="/articles" className="hover:text-stone-900 transition-colors duration-150">ESSAYS</Link>
        <span className="text-stone-300">/</span>
        <span className="text-stone-900 font-bold truncate max-w-sm">{article.title}</span>
      </nav>

      {/* Main Grid: Article Content (2 cols) + Sticky Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column: Article Body */}
        <article className="lg:col-span-2 space-y-8">
          
          {/* Article Header Card */}
          <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-300">
                {article.category_name || 'FINANCIAL ESSAY'}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-stone-400">
                <Clock className="w-3.5 h-3.5 text-[#c5a059]" /> {article.reading_time_minutes} นาทีในการอ่าน
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author & Publishing Date */}
            <div className="flex items-center gap-3.5 pt-5 border-t border-stone-100">
              <div className="w-10 h-10 rounded-none bg-stone-100 text-stone-800 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-stone-200">
                {article.author_name ? article.author_name.charAt(0) : 'A'}
              </div>
              <div>
                <div className="text-xs font-serif font-bold text-stone-900 flex items-center gap-2">
                  <span>{article.author_name}</span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.2 rounded-none bg-stone-100 text-[#8c6d46] border border-stone-200">
                    <ShieldCheck className="w-3 h-3 text-[#c5a059]" /> คปภ. รับรอง
                  </span>
                </div>
                <div className="text-[11px] font-mono text-stone-400 mt-0.5 flex items-center gap-2">
                  <span>{article.author_license || 'ผู้เชี่ยวชาญการเงิน'}</span>
                  <span>•</span>
                  <span>{article.published_at}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {article.cover_image_url && (
            <div className="rounded-none overflow-hidden border border-stone-200 bg-stone-100">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-[300px] sm:h-[420px] object-cover"
              />
            </div>
          )}

          {/* Excerpt Summary Box */}
          <div className="bg-stone-50 border-l-2 border-[#c5a059] p-6 rounded-none space-y-2">
            <h4 className="text-[10px] font-mono font-bold text-[#8c6d46] uppercase tracking-[0.25em]">
              EXECUTIVE SUMMARY
            </h4>
            <p className="text-sm text-stone-800 leading-relaxed font-light italic">
              &quot;{article.excerpt}&quot;
            </p>
          </div>

          {/* Full Markdown Content Render */}
          <div className="bg-white rounded-none border border-stone-200/80 p-6 sm:p-10 space-y-6 text-stone-800 leading-loose text-sm sm:text-base font-light">
            {article.content ? (
              <div className="space-y-6 leading-loose">
                {article.content.split('\n\n').map((paragraph, index) => {
                  // H2 Heading
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl sm:text-2xl font-serif font-bold text-stone-900 pt-6 border-t border-stone-100 leading-snug">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  // H3 Heading
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-lg font-serif font-bold text-stone-900 pt-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  // Table or code block
                  if (paragraph.includes('|')) {
                    return (
                      <div key={index} className="overflow-x-auto my-4">
                        <pre className="text-xs bg-stone-50 p-4 rounded-none font-mono text-stone-800 border border-stone-200 whitespace-pre-wrap">
                          {paragraph}
                        </pre>
                      </div>
                    );
                  }
                  // Bullet lists
                  if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                    return (
                      <ul key={index} className="space-y-2 pl-2 text-xs sm:text-sm font-normal">
                        {paragraph.split('\n').map((line, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2.5 text-stone-700">
                            <span className="w-1.5 h-1.5 rounded-none bg-[#c5a059] mt-2 shrink-0"></span>
                            <span className="leading-relaxed">{line.replace(/^[-*]|\d+\.\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Divider
                  if (paragraph.trim() === '---') {
                    return <hr key={index} className="border-stone-200 my-6" />;
                  }
                  // Regular paragraph
                  return (
                    <p key={index} className="text-stone-700 text-sm sm:text-base leading-loose font-light">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">{article.excerpt}</p>
            )}
          </div>

          {/* Bottom Callout & Back to Articles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 transition-colors duration-150"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>กลับสู่หน้าบทความทั้งหมด</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-900 hover:text-[#c5a059] transition-colors duration-150 font-semibold"
            >
              <span>ชมแผนประกันที่เกี่ยวข้อง</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c5a059]" />
            </Link>
          </div>
        </article>

        {/* Right Column: Sticky Consultation & Related Essays Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
          
          {/* Free Advisory Box - Obsidian Luxury Style */}
          <div className="bg-[#0c0b0a] text-stone-100 rounded-none border border-stone-800 p-6 space-y-5 shadow-xl">
            <div className="w-10 h-10 rounded-none bg-stone-900 text-[#c5a059] flex items-center justify-center border border-stone-800">
              <PhoneCall className="w-4 h-4" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                ปรึกษาผู้เชี่ยวชาญการเงิน
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                ต้องการวางแผนประกันสุขภาพเหมาจ่าย หรือลดหย่อนภาษีตามโจทย์ของคุณ? ปรึกษาตัวแทนมืออาชีพได้ฟรี ไม่มีข้อผูกมัด
              </p>
            </div>

            <div className="space-y-2.5 pt-1">
              <Link
                href="/consultation"
                className="w-full h-11 inline-flex items-center justify-center gap-2 bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-mono font-semibold uppercase tracking-wider rounded-none text-xs text-center active:scale-[0.98] transition duration-200 cursor-pointer"
              >
                <span>ขอรับคำปรึกษา & คำนวณเบี้ยฟรี</span>
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full h-10 inline-flex items-center justify-center gap-2 bg-transparent hover:bg-stone-900 text-stone-300 font-mono uppercase tracking-wider rounded-none border border-stone-700 text-xs text-center transition-colors duration-200"
              >
                <Receipt className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>คำนวณสิทธิลดหย่อนภาษี</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-stone-900 text-[10px] font-mono text-stone-500 text-center uppercase tracking-widest">
              PDPA VERIFIED • CONFIDENTIAL
            </div>
          </div>

          {/* Related Articles Box */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-none border border-stone-200/80 p-6 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#8c6d46] flex items-center gap-2 border-b border-stone-100 pb-2">
                <BookOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>บทความที่เกี่ยวข้อง</span>
              </h4>

              <div className="divide-y divide-stone-100">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.slug}`}
                    className="block py-3 first:pt-0 last:pb-0 group"
                  >
                    <span className="text-[10px] font-mono text-[#8c6d46] block mb-1 uppercase tracking-wider">
                      {rel.category_name}
                    </span>
                    <h5 className="text-xs font-serif font-bold text-stone-900 group-hover:text-[#c5a059] transition-colors duration-200 line-clamp-2 leading-snug">
                      {rel.title}
                    </h5>
                    <span className="text-[10px] font-mono text-stone-400 mt-1 block">
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
