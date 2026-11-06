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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
        <Link href="/" className="hover:text-zinc-900 transition-colors duration-150">หน้าแรก</Link>
        <span>/</span>
        <Link href="/articles" className="hover:text-zinc-900 transition-colors duration-150">สาระน่ารู้</Link>
        <span>/</span>
        <span className="text-zinc-800 font-bold truncate max-w-sm">{article.title}</span>
      </nav>

      {/* Main Grid: Article Content (2 cols) + Sticky Sidebar (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Article Body */}
        <article className="lg:col-span-2 space-y-6">
          
          {/* Article Header Card */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {article.category_name || 'ความรู้การเงิน'}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400">
                <Clock className="w-3.5 h-3.5" /> {article.reading_time_minutes} นาที
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author & Publishing Date */}
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-100">
              <div className="w-9 h-9 rounded-full bg-zinc-100 text-zinc-800 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-zinc-200">
                {article.author_name ? article.author_name.charAt(0) : 'A'}
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span>{article.author_name}</span>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                    <ShieldCheck className="w-3 h-3 text-zinc-600" /> คปภ. รับรอง
                  </span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 mt-0.5 flex items-center gap-2">
                  <span>{article.author_license || 'ผู้เชี่ยวชาญการเงิน'}</span>
                  <span>•</span>
                  <span>{article.published_at}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {article.cover_image_url && (
            <div className="rounded-xl overflow-hidden border border-zinc-200 bg-zinc-100">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="w-full h-[280px] sm:h-[380px] object-cover"
              />
            </div>
          )}

          {/* Excerpt Summary Box */}
          <div className="bg-zinc-50 border-l-2 border-zinc-900 p-4 sm:p-5 rounded-r-lg space-y-1">
            <h4 className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
              สรุปใจความสำคัญ
            </h4>
            <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
              {article.excerpt}
            </p>
          </div>

          {/* Full Markdown Content Render */}
          <div className="bg-white rounded-xl border border-zinc-200 p-6 sm:p-8 space-y-5 text-zinc-700 leading-relaxed text-sm sm:text-base">
            {article.content ? (
              <div className="space-y-5 leading-relaxed">
                {article.content.split('\n\n').map((paragraph, index) => {
                  // H2 Heading
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-lg sm:text-xl font-bold text-zinc-900 pt-4 border-t border-zinc-100">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  // H3 Heading
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-base font-bold text-zinc-900 pt-2">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  // Table or code block
                  if (paragraph.includes('|')) {
                    return (
                      <div key={index} className="overflow-x-auto my-3">
                        <pre className="text-xs bg-zinc-50 p-4 rounded-lg font-mono text-zinc-800 border border-zinc-200 whitespace-pre-wrap">
                          {paragraph}
                        </pre>
                      </div>
                    );
                  }
                  // Bullet lists
                  if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
                    return (
                      <ul key={index} className="space-y-1.5 pl-2 text-xs sm:text-sm">
                        {paragraph.split('\n').map((line, lIdx) => (
                          <li key={lIdx} className="flex items-start gap-2 text-zinc-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 shrink-0"></span>
                            <span>{line.replace(/^[-*]|\d+\.\s*/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Divider
                  if (paragraph.trim() === '---') {
                    return <hr key={index} className="border-zinc-200 my-4" />;
                  }
                  // Regular paragraph
                  return (
                    <p key={index} className="text-zinc-700 text-xs sm:text-sm leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            ) : (
              <p className="text-zinc-600 text-xs sm:text-sm">{article.excerpt}</p>
            )}
          </div>

          {/* Bottom Callout & Back to Articles */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors duration-150"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ดูบทความทั้งหมด</span>
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 hover:underline"
            >
              <span>ดูแผนประกันที่เกี่ยวข้อง</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </article>

        {/* Right Column: Sticky Consultation & Calculators Sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-24 space-y-4">
          
          {/* Free Advisory Box */}
          <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-4">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center border border-zinc-200">
              <PhoneCall className="w-4 h-4" />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900">
                ปรึกษาผู้เชี่ยวชาญฟรี
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                ต้องการวางแผนประกันสุขภาพเหมาจ่าย หรือลดหย่อนภาษีตามโจทย์ของคุณ? ปรึกษาตัวแทนมืออาชีพได้ฟรี ไม่มีข้อผูกมัด
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <Link
                href="/consultation"
                className="w-full h-10 inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-lg text-xs text-center active:scale-[0.98] transition duration-150 cursor-pointer"
              >
                <span>ขอรับคำปรึกษาและคำนวณเบี้ยฟรี</span>
              </Link>
              <Link
                href="/calculators/tax"
                className="w-full h-9 inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-zinc-700 font-medium rounded-lg border border-zinc-200 text-xs text-center transition-colors duration-150"
              >
                <Receipt className="w-3.5 h-3.5 text-zinc-500" />
                <span>คำนวณสิทธิลดหย่อนภาษี</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-zinc-100 text-[10px] font-mono text-zinc-400 text-center">
              🔒 PDPA Verified • ข้อมูลปลอดภัย
            </div>
          </div>

          {/* Related Articles Box */}
          {relatedArticles.length > 0 && (
            <div className="bg-white rounded-xl border border-zinc-200 p-5 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>บทความที่เกี่ยวข้อง</span>
              </h4>

              <div className="divide-y divide-zinc-100">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.slug}`}
                    className="block py-2.5 first:pt-0 last:pb-0 group"
                  >
                    <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">
                      {rel.category_name}
                    </span>
                    <h5 className="text-xs font-bold text-zinc-800 group-hover:text-zinc-600 transition-colors duration-150 line-clamp-2 leading-snug">
                      {rel.title}
                    </h5>
                    <span className="text-[10px] font-mono text-zinc-400 mt-0.5 block">
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
