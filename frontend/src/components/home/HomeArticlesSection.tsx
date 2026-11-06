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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-medium text-zinc-700 font-mono mb-2">
            <BookOpen className="w-3 h-3 text-zinc-500" />
            <span>KNOWLEDGE HUB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            บทความและคู่มือวางแผนประกันภัย 2567
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 mt-1 max-w-xl">
            เกร็ดความรู้ภาษี เงื่อนไขประกันสุขภาพเหมาจ่าย และเทคนิคการส่งต่อมรดก เขียนโดยทีมที่ปรึกษาการเงินมืออาชีพ
          </p>
        </div>

        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-white border border-zinc-200 hover:border-zinc-300 px-3.5 py-2 rounded-lg transition-colors duration-150 cursor-pointer"
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
            className="bg-white rounded-xl border border-zinc-200 hover:border-zinc-300 p-5 transition-colors duration-150 flex flex-col justify-between group overflow-hidden"
          >
            <div>
              {/* Cover Image Thumbnail */}
              {article.cover_image_url && (
                <div className="relative h-44 sm:h-48 w-full rounded-lg overflow-hidden mb-4 bg-zinc-100 border border-zinc-200/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent"></div>
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-medium font-mono px-2 py-0.5 rounded bg-white/95 text-zinc-800 border border-zinc-200/80">
                      {article.category_name || 'ความรู้การเงิน'}
                    </span>
                  </div>

                  {/* Reading Time */}
                  <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] text-zinc-200 font-mono bg-black/60 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{article.reading_time_minutes} นาที</span>
                  </div>
                </div>
              )}

              {/* Text Meta Header (if no image) */}
              {!article.cover_image_url && (
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-medium font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 border border-zinc-200">
                    {article.category_name || 'ความรู้การเงิน'}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                    <Clock className="w-3 h-3 text-zinc-400" />
                    <span>{article.reading_time_minutes} นาที</span>
                  </div>
                </div>
              )}

              {/* Title */}
              <h3 className="text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors duration-150 leading-snug line-clamp-2">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3 mt-2">
                {article.excerpt}
              </p>
            </div>

            {/* Author Footer */}
            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-medium text-zinc-700 flex items-center gap-1 text-xs">
                  <User className="w-3 h-3 text-zinc-400" />
                  <span>{article.author_name}</span>
                </div>
                {article.author_license && (
                  <div className="text-[10px] font-mono text-zinc-400">
                    {article.author_license}
                  </div>
                )}
              </div>

              <Link
                href={`/articles/${article.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-900 hover:text-zinc-600 group-hover:translate-x-0.5 transition-all duration-150"
              >
                <span>อ่านต่อ</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </section>
  );
}
