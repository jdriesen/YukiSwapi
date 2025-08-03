import { boot as defineBoot } from 'quasar/wrappers'
import { createI18n } from 'vue-i18n'

import messages from '../i18n'

export type MessageLanguages = keyof typeof messages
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US']

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

// Available locales for the application
export const availableLocales: MessageLanguages[] = ['en-US', 'nl-NL', 'es-ES']

// Map UI language codes to i18n locale codes
export const langMap: Record<string, MessageLanguages> = {
  EN: 'en-US',
  NL: 'nl-NL',
  ES: 'es-ES',
}

// Map i18n locale codes to UI language codes
export const langMapReverse: Record<MessageLanguages, string> = {
  'en-US': 'EN',
  'nl-NL': 'NL',
  'es-ES': 'ES',
}

// Get the initial locale from localStorage or browser settings
const getInitialLocale = (): MessageLanguages => {
  // Check if user has previously selected a locale
  const storedLocale = localStorage.getItem('userLocale') as MessageLanguages | null
  if (storedLocale && availableLocales.includes(storedLocale)) {
    return storedLocale
  }

  // Try to detect browser language
  const browserLocale = navigator.language
  // Check if we have an exact match
  if (availableLocales.includes(browserLocale as MessageLanguages)) {
    return browserLocale as MessageLanguages
  }

  // Check if we have a match for the language part (e.g., 'nl' from 'nl-BE')
  const languagePart = browserLocale.split('-')[0]
  const matchingLocale = availableLocales.find((locale) => locale.startsWith(languagePart + '-'))

  if (matchingLocale) {
    return matchingLocale
  }

  // Default to English
  return 'en-US'
}

export default defineBoot(({ app }) => {
  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: getInitialLocale(),
    fallbackLocale: 'en-US',
    legacy: false,
    messages,
    missingWarn: true, // Warn about missing translations
    fallbackWarn: true, // Warn about fallback translations
  })

  // Set i18n instance on app
  app.use(i18n)

  // Log the loaded messages for debugging
  console.log('i18n initialized with locale:', i18n.global.locale)
  console.log('Available messages:', Object.keys(messages))

  // Log the teams translations specifically
  if (messages['en-US'] && messages['en-US'].planets) {
    console.log('Teams translations:', messages['en-US'].planets)
    console.log('Teams templates:', messages['en-US'].planets.messages)
    console.log('Teams fields:', messages['en-US'].planets.fields)
  } else {
    console.warn('Teams translations not found in messages')
  }
})
