'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';
import { Article } from '@/types';
import { getArticles } from '@/lib/api';

interface HomeArticlesSectionProps {
  initialArticles: Article[];
}

export function HomeArticlesSection({ initialArticles }: HomeArticlesSectionProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  useEffect(() => {
    // Load custom articles from localStorage if available
    const custom = getArticles();
    if (custom && custom.length > 0) {
      setArticles(custom);
    }

    const handleArticlesUpdate = (e: any) => {
      if (e?.detail && Array.isArray(e.detail)) {
        setArticles(e.detail);
      } else {
        setArticles(getArticles());
      }
    };

    window.addEventListener('modtanoy_articles_updated', handleArticlesUpdate);
    window.addEventListener('storage', handleArticlesUpdate);

    return () => {
      window.removeEventListener('modtanoy_articles_updated', handleArticlesUpdate);
      window.removeEventListener('storage', handleArticlesUpdate);
    };
  }, []);

  const featured = articles.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-orange-500" />
            <span>คลังความรู้การเงินและภาษี (Knowledge Hub)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            บทความและคู่มือวางแผนประกันภัย 2567
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
            เกร็ดความรู้ภาษี เงื่อนไขประกันสุขภาพเหมาจ่าย และเทคนิคการส่งต่อมรดก เขียนโดยทีมที่ปรึกษาการเงินมืออาชีพ
          </p>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-orange-600 bg-white border border-sky-200 hover:border-orange-400 px-4 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
        >
          <span>ดูบทความทั้งหมด ({articles.length})</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featured.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-3xl border border-sky-100 hover:border-sky-300 p-5 sm:p-6 shadow-sm hover:shadow-xl hover:shadow-sky-100/80 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              {/* Cover Image Thumbnail (If Available) */}
              {article.cover_image_url && (
                <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-4 bg-sky-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                  
                  {/* Category Pill floating on image */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-xs text-sky-950 border border-sky-200/60 shadow-xs">
                      {article.category_name || 'ความรู้การเงิน'}
                    </span>
                  </div>

                  {/* Reading Time floating bottom right */}
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] text-white font-medium bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{article.reading_time_minutes} นาที</span>
                  </div>
                </div>
              )}

              {/* Text Meta Header (if no image) */}
              {!article.cover_image_url && (
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-100">
                    {article.category_name || 'ความรู้การเงิน'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Clock className="w-3 h-3 text-sky-500" />
                    <span>{article.reading_time_minutes} นาที</span>
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-base font-black text-slate-900 group-hover:text-sky-700 transition-colors leading-snug line-clamp-2">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mt-2">
                {article.excerpt}
              </p>
            </div>

            {/* Author Footer & Standout Read More CTA */}
            <div className="pt-4 mt-4 border-t border-sky-50 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-800 flex items-center gap-1 text-xs">
                  <User className="w-3 h-3 text-sky-600" />
                  <span>{article.author_name}</span>
                </div>
                {article.author_license && (
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    {article.author_license}
                  </div>
                )}
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 group-hover:translate-x-1 transition-all"
              >
                <span>อ่านต่อ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
