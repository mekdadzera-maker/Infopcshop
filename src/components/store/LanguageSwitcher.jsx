import React from 'react';
import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const langs = [
  { code: 'fr', label: 'FR' },
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={cn(
            "px-2 py-1 text-xs font-medium rounded-md transition-all",
            lang === l.code
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}