import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  HeartPulse, 
  PhoneCall,
  Flame
} from 'lucide-react';
import { fetchArticles } from '@/lib/api';
import { Article } from '@/types';

export const metadata: Metadata = {
  title: 'สาระน่ารู้ & อุทาหรณ์วางแผนการเงิน ประกันชีวิต และโรคร้ายแรง | FinAdvisor TH',
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

  // Filter if category is specified
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Header Banner with Emotive & Urgency Theme */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-5 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
            <Flame className="w-3.5 h-3.5 text-red-400" />
            <span>สาระน่ารู้ & อุทาหรณ์เตือนสติ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-snug">
            ความไม่แน่นอนเกิดขึ้นได้ทุกวินาที... <br />
            <span className="text-sky-300">อย่ารอจนวันที่สายเกินกว่าจะวางแผน</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ถอดบทเรียนจากกรณีคนดังและคนรุ่นใหม่อายุน้อยที่จากไปกะทันหัน หรือต้องเผชิญวิกฤตค่ารักษาโรคร้ายแรงหลักล้านบาท เพื่อเป็นอุทาหรณ์ให้คุณสร้างเกราะคุ้มครองคนที่รักก่อนเกิดเหตุไม่คาดฝัน
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>ปรึกษาตัวแทนและวางแผนคุ้มครองฟรี</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl border border-white/20 transition-all"
            >
              <span>ดูแผนประกันทั้งหมด</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Ambient subtle background decorative ring */}
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mb-20" />
      </div>

      {/* 2. Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
        {categories.map((cat) => {
          const isSelected = (!activeCategory && cat.slug === '') || activeCategory === cat.slug;
          return (
            <Link
              key={cat.slug}
              href={cat.slug ? `/articles?category=${cat.slug}` : '/articles'}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* 3. Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article) => {
          const isCautionary = article.slug.includes('sudden-cardiac') || 
                               article.slug.includes('cancer') || 
                               article.slug.includes('stroke');

          return (
            <article
              key={article.id}
              className="bg-white rounded-3xl border border-slate-200/80 hover:border-sky-300 shadow-sm hover:shadow-xl hover:shadow-sky-100/70 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Article Cover Image */}
                <Link href={`/articles/${article.slug}`} className="block relative h-52 overflow-hidden">
                  <img
                    src={article.cover_image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop'}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Category Badge & Urgent Tag */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 backdrop-blur-md shadow-xs">
                      {article.category_name || 'บทความการเงิน'}
                    </span>
                    {isCautionary && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg bg-red-600 text-white shadow-xs animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> อุทาหรณ์
                      </span>
                    )}
                  </div>
                </Link>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                    <Link href={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer: Author, Reading Time, and Read More */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-700 font-bold text-xs flex items-center justify-center shrink-0 border border-sky-200">
                      {article.author_name ? article.author_name.charAt(0) : 'A'}
                    </div>
                    <div className="truncate">
                      <div className="font-bold text-slate-800 truncate text-[11px]">{article.author_name}</div>
                      <div className="text-[10px] text-slate-400">{article.published_at}</div>
                    </div>
                  </div>

                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex items-center gap-1 font-bold text-xs text-sky-700 group-hover:text-orange-600 transition-colors shrink-0"
                  >
                    <span>อ่านต่อ</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* 4. Bottom Advisory Callout */}
      <div className="bg-sky-50/60 rounded-3xl border border-sky-100 p-8 text-center space-y-4 max-w-3xl mx-auto">
        <ShieldCheck className="w-10 h-10 text-sky-600 mx-auto" />
        <h3 className="text-xl font-black text-slate-900">
          ไม่แน่ใจว่าพอร์ตประกันของคุณคุ้มครองพอแล้วหรือยัง?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          ให้ตัวแทนและที่ปรึกษาการเงินที่ได้รับใบอนุญาต คปภ. ตรวจสุขภาพกรมธรรม์เดิมของคุณฟรี พร้อมช่วยคำนวณวงเงินคุ้มครองและเบี้ยประกันที่คุ้มค่าที่สุด
        </p>
        <div className="pt-2">
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md shadow-orange-600/20 transition-all cursor-pointer"
          >
            <span>รับคำปรึกษาและตรวจสุขภาพพอร์ตฟรี</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
