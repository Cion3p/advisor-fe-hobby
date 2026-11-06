'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Article } from '@/types';
import { getArticles } from '@/lib/api';

interface HomeArticlesSectionProps {
  initialArticles: Article[];
}

export function HomeArticlesSection({ initialArticles }: HomeArticlesSectionProps) {
  const [articles, setArticles] = useState<Article[]>(initialArticles);

  useEffect(() => {
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
      
      {/* Section Header - Editorial Magazine Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-stone-200/80 pb-6">
        <div>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-stone-500 font-mono block mb-2">
            ESSAYS & EDITORIAL INSIGHTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-stone-950 tracking-tight">
            บทความคัดสรรและคู่มือวางแผนมรดก 2567
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-xl font-light leading-relaxed">
            เกร็ดความรู้ภาษี เงื่อนไขประกันสุขภาพเหมาจ่าย และเทคนิคการส่งต่อมรดก เขียนโดยทีมที่ปรึกษาการเงินมืออาชีพ
          </p>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-stone-900 hover:text-[#a88241] group transition-colors duration-300 pb-1"
        >
          <span>บทความทั้งหมด ({articles.length})</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>

      {/* Grid of Articles - Gallery Framing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featured.map((article) => (
          <article
            key={article.id}
            className="bg-white rounded-none border border-stone-200 hover:border-[#c5a059] p-6 transition-all duration-500 flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image Thumbnail with Aspect Ratio */}
              {article.cover_image_url && (
                <div className="relative aspect-[16/10] w-full rounded-none overflow-hidden mb-5 bg-stone-100 border border-stone-200/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 group-hover:opacity-0 transition-opacity duration-500"></div>
                  
                  {/* Category Eyebrow */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] font-mono px-2.5 py-1 bg-white/95 text-stone-900 border border-stone-200">
                      {article.category_name || 'FINANCE'}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-mono text-stone-200 bg-stone-950/70 px-2 py-0.5">
                    <Clock className="w-3 h-3 text-[#c5a059]" />
                    <span>{article.reading_time_minutes} นาที</span>
                  </div>
                </div>
              )}

              {/* Text Header (if no image) */}
              {!article.cover_image_url && (
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono px-2 py-0.5 border border-stone-200 text-stone-600">
                    {article.category_name || 'FINANCE'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{article.reading_time_minutes} นาที</span>
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="font-serif text-lg font-normal text-stone-950 group-hover:text-[#a88241] transition-colors duration-300 leading-snug line-clamp-2">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-stone-500 leading-loose line-clamp-3 mt-2.5 font-light">
                {article.excerpt}
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-5 mt-5 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="text-stone-800 flex items-center gap-1.5 text-xs font-medium">
                  <User className="w-3 h-3 text-[#c5a059]" />
                  <span>{article.author_name}</span>
                </div>
                {article.author_license && (
                  <div className="text-[10px] font-mono text-stone-400">
                    {article.author_license}
                  </div>
                )}
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] font-medium text-stone-900 group-hover:text-[#a88241] transition-colors duration-300"
              >
                <span>อ่านต่อ</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
