import React, { useState } from 'react';
import { X, BookOpen, Clock, Calendar, ArrowRight } from 'lucide-react';
import { JOURNAL_ARTICLES } from '../data/mockCoffeeData';
import { JournalArticle } from '../types/coffee';

interface OttenJournalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OttenJournal: React.FC<OttenJournalProps> = ({ isOpen, onClose }) => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-[#cbd5e1] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#cbd5e1] bg-[#f0f6fc]">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#2563eb]" />
            <div>
              <h2 className="text-base font-bold text-[#0f172a] font-serif-luxury">
                Jurnal & Majalah Sanubari Roastery
              </h2>
              <p className="text-[11px] text-[#64748b]">Panduan seduh, wawasan origin, dan teknik barista profesional</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#dbeafe] text-[#334155] transition-colors cursor-pointer"
            aria-label="Tutup jurnal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8">
          {selectedArticle ? (
            /* Single Article Full View */
            <div className="space-y-6 max-w-2xl mx-auto">
              <button
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-bold text-[#2563eb] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Kembali ke Daftar Artikel
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#64748b]">
                  <span className="font-semibold text-[#2563eb] uppercase">{selectedArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.date}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-serif-luxury leading-snug">
                  {selectedArticle.title}
                </h1>
                <p className="text-xs text-[#475569]">Ditulis oleh: {selectedArticle.author}</p>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#f0f6fc] border border-[#cbd5e1]">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4 text-sm text-[#334155] leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#cbd5e1] flex items-center gap-2 text-xs">
                <span className="font-semibold text-[#64748b]">Topik terkait:</span>
                {selectedArticle.tags.map((t, idx) => (
                  <span key={idx} className="bg-[#dbeafe] text-[#1e40af] px-2 py-1 rounded text-xs">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            /* Articles Grid */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {JOURNAL_ARTICLES.map((article) => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="group bg-white rounded-xl border border-[#cbd5e1] overflow-hidden hover:border-[#93c5fd] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col"
                >
                  <div className="aspect-[16/10] bg-[#f0f6fc] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#64748b]">
                        <span className="font-semibold text-[#2563eb] uppercase">{article.category}</span>
                        <span>·</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h3 className="font-bold text-sm text-[#0f172a] group-hover:text-[#2563eb] transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#475569] line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#e2e8f0] flex items-center justify-between text-xs font-semibold text-[#2563eb]">
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export const SanubariJournal = OttenJournal;
