
'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
}

interface StyleProps {
  en?: string
  hi?: string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en')
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageSwitchProps {
  en: string
  hi: string
  className?: string
  tailwindStyles?: StyleProps
}

export function LanguageSwitch({ en, hi, className, tailwindStyles }: LanguageSwitchProps) {
  const { language } = useLanguage()
  
  return (
    <span className={`inline-block relative ${className || ''}`}>
      {/* Container with fixed width based on the longest text */}
      <span className="inline-block" >
        {/* English text */}
        <span 
          className={`block transition-all duration-300 ${
            language === 'en' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 absolute top-0 left-0 -translate-y-5'
          } ${tailwindStyles?.en || ''}`}
        >
          {en}
        </span>
        {/* Hindi text */}
        <span 
          className={`block transition-all duration-300 ${
            language === 'hi' 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 absolute top-0 left-0 translate-y-5'
          } ${tailwindStyles?.hi || ''}`}
        >
          {hi}
        </span>
      </span>
    </span>
  )
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  return (
    <label className="switch">
      <input
        className="cb"
        type="checkbox"
        checked={language === 'hi'}
        onChange={toggleLanguage}
        aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
      />
      <span className="toggle">
        <span className="left">EN</span>
        <span className="right">हिंदी</span>
      </span>
    </label>
  )
}