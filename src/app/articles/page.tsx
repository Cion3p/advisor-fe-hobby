import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  AlertTriangle, 
  PhoneCall, 
  BookOpen
} from 'lucide-react';
import { fetchArticles } from '@/lib/api';

export const metadata: Metadata = {
  title: 'สาระน่ารู้ & อุทาหรณ์วางแผนการเงิน ประกันชีวิต และโรคร้ายแรง | ModtanoyAdvisor',
  description: 'ศูนย์รวมบทความและบทเรียนชีวิต ถอดบทเรียนกรณีศึกษาคนดังและคนรุ่นใหม่อายุน้อยจากไปกะทันหัน วิกฤตค่ารักษาโรคร้ายแรงหลักล้าน และแนวทางการวางแผนประกันเพื่อปกป้องครอบครัว',
};

interface ArticlesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams.category;

  const articles = await fetchArticles();

  const filteredArticles = activeCategory
    ? articles.filter((a) => a.category_slug === activeCategory)
    : articles;

  const categories = [
    { slug: '', label: `ทั้งหมด (${articles.length})` },
    { slug: 'life-protection', label: 'อุทาหรณ์ชีวิต & มรดก' },
    { slug: 'health-insurance', label: 'สุขภาพ & โรคร้ายแรง' },
    { slug: 'tax-planning', label: 'ภาษีและการวางแผน' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* 1. Header Banner - Taste v2 Obsidian Luxury Editorial Showcase */}
      <div className="bg-[#0c0b0a] rounded-none p-8 sm:p-12 text-stone-100 border border-stone-800 space-y-6 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] px-3 py-1 rounded-none bg-stone-900 text-[#c5a059] border border-stone-800">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ESSAYS & CASE STUDIES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight leading-tight text-stone-100">
            ความไม่แน่นอนเกิดขึ้นได้ทุกวินาที <br />
            <span className="italic text-[#c5a059]">สร้างเกราะคุ้มครองคนที่รักก่อนเกิดเหตุไม่คาดฝัน</span>
          </h1>

          <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-light">
            ถอดบทเรียนจากกรณีคนดังและคนรุ่นใหม่อายุน้อยที่ต้องเผชิญวิกฤตค่ารักษาโรคร้ายแรงหลักล้านบาท เพื่อเป็นแนวทางวางแผนประกันและส่งต่อมรดกอย่างรอบคอบ
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#d8b56f] text-stone-950 font-mono font-semibold uppercase tracking-wider text-xs px-5 py-3 rounded-none active:scale-[0.98] transition duration-200 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ปรึกษาตัวแทนฟรี</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-transparent hover:bg-stone-900 text-stone-300 font-mono uppercase tracking-wider text-xs px-5 py-3 rounded-none border border-stone-700 transition duration-200"
            >
              <span>ชมแผนประกันทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200">
        {categories.map((cat) => {
          const isSelected = (!activeCategory && cat.slug === '') || activeCategory === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={cat.slug ? `/articles?category=${cat.slug}` : '/articles'}
              className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                isSelected
                  ? 'bg-[#0c0b0a] text-stone-100 border-[#0c0b0a]'
                  : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Articles Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => {
          const isCautionary = article.slug.includes('sudden-cardiac') || 
                               article.slug.includes('cancer') || 
                               article.slug.includes('stroke');

          return (
            <article
              key={article.id}
              className="bg-white rounded-none border border-stone-200/80 hover:border-stone-400 p-6 transition-all duration-200 flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
            >
              <div>
                {/* Article Cover Image */}
                <Link href={`/articles/${article.slug}`} className="block relative aspect-[16/10] rounded-none overflow-hidden bg-stone-100 border border-stone-200 mb-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />
                  
                  {/* Category Badge & Urgent Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider uppercase px-2.5 py-0.5 rounded-none bg-stone-900/90 text-stone-100 border border-stone-800">
                      {article.category_name || 'FINANCIAL INSIGHT'}
                    </span>
                    {isCautionary && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-none bg-[#c5a059] text-stone-950 border border-[#c5a059]">
                        <AlertTriangle className="w-3 h-3" /> อุทาหรณ์
                      </span>
                    )}
                  </div>
                </Link>

                {/* Article Info */}
                <div className="space-y-2.5">
                  <h2 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#c5a059] transition-colors duration-200 leading-snug line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-stone-600 leading-relaxed font-light line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer: Author, Reading Time, and Read More */}
              <div className="pt-4 mt-5 border-t border-stone-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 truncate pr-2">
                  <div className="w-7 h-7 rounded-none bg-stone-100 text-stone-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border border-stone-200">
                    {article.author_name ? article.author_name.charAt(0) : 'A'}
                  </div>
                  <div className="truncate">
                    <div className="font-serif font-semibold text-stone-900 truncate text-xs">{article.author_name}</div>
                    <div className="text-[10px] font-mono text-stone-400">{article.published_at}</div>
                  </div>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider text-[11px] text-stone-900 group-hover:text-[#c5a059] transition-colors duration-200 shrink-0"
                >
                  <span>อ่านต่อ</span>
                  <ArrowRight className="w-3 h-3 text-[#c5a059]" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
