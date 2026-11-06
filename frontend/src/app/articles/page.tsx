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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* 1. Header Banner (Taste.md Dark Theme Specification) */}
      <div className="bg-[#09090b] rounded-xl p-8 sm:p-10 text-white border border-zinc-800 space-y-4">
        <div className="max-w-3xl space-y-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>KNOWLEDGE & CASE STUDIES</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-snug">
            ความไม่แน่นอนเกิดขึ้นได้ทุกวินาที <br />
            <span className="text-zinc-400">สร้างเกราะคุ้มครองคนที่รักก่อนเกิดเหตุไม่คาดฝัน</span>
          </h1>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            ถอดบทเรียนจากกรณีคนดังและคนรุ่นใหม่อายุน้อยที่ต้องเผชิญวิกฤตค่ารักษาโรคร้ายแรงหลักล้านบาท เพื่อเป็นแนวทางวางแผนประกันและส่งต่อมรดกอย่างรอบคอบ
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-1.5 bg-zinc-100 hover:bg-white text-zinc-900 font-medium text-xs px-4 py-2.5 rounded-lg active:scale-[0.98] transition duration-150 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>ปรึกษาตัวแทนฟรี</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 bg-transparent hover:bg-zinc-800 text-zinc-200 font-medium text-xs px-4 py-2.5 rounded-lg border border-zinc-700 transition duration-150"
            >
              <span>ดูแผนประกันทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-zinc-200">
        {categories.map((cat) => {
          const isSelected = (!activeCategory && cat.slug === '') || activeCategory === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={cat.slug ? `/articles?category=${cat.slug}` : '/articles'}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors duration-150 border ${
                isSelected
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => {
          const isCautionary = article.slug.includes('sudden-cardiac') || 
                               article.slug.includes('cancer') || 
                               article.slug.includes('stroke');

          return (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 p-5 transition-colors duration-150 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Article Cover Image */}
                <Link href={`/articles/${article.slug}`} className="block relative h-48 rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200/60 mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                  
                  {/* Category Badge & Urgent Tag */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-white/95 text-zinc-800 border border-zinc-200/80">
                      {article.category_name || 'บทความการเงิน'}
                    </span>
                    {isCautionary && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-900 text-white border border-zinc-800">
                        <AlertTriangle className="w-3 h-3 text-amber-400" /> อุทาหรณ์
                      </span>
                    )}
                  </div>
                </Link>

                {/* Article Info */}
                <div className="space-y-2">
                  <h2 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors duration-150 leading-snug line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer: Author, Reading Time, and Read More */}
              <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 truncate pr-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-100 text-zinc-800 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 border border-zinc-200">
                    {article.author_name ? article.author_name.charAt(0) : 'A'}
                  </div>
                  <div className="truncate">
                    <div className="font-medium text-zinc-800 truncate text-xs">{article.author_name}</div>
                    <div className="text-[10px] font-mono text-zinc-400">{article.published_at}</div>
                  </div>
                </div>

                <Link
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center gap-1 font-medium text-xs text-zinc-900 hover:text-zinc-600 transition-colors duration-150 shrink-0"
                >
                  <span>อ่านต่อ</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
