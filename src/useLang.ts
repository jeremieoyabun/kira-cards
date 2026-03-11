'use client'

import { useState, useEffect, useCallback } from 'react'
import { translations, type Lang, type TranslationKey } from './i18n'

function detectLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const saved = localStorage.getItem('kira-lang')
  if (saved === 'th' || saved === 'en') return saved
  const nav = navigator.language || ''
  return nav.startsWith('th') ? 'th' : 'en'
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>('en')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setLangState(detectLang())
    setReady(true)
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem('kira-lang', l)
    document.documentElement.lang = l
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'th' : 'en')
  }, [lang, setLang])

  const t = useCallback((key: TranslationKey) => {
    return translations[lang][key]
  }, [lang])

  return { lang, setLang, toggle, t, ready }
}
