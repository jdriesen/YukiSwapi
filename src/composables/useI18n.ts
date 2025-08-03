import { useI18n as useVueI18n } from 'vue-i18n'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { availableLocales, langMap, langMapReverse } from '../boot/i18n'
import type { MessageLanguages, MessageSchema } from '../boot/i18n'

/**
 * Extended i18n composable with additional functionality
 */
export const useI18n = () => {
  const vueI18n = useVueI18n<{ message: MessageSchema }, MessageLanguages>()

  /**
   * Set the current locale and save it to localStorage
   * @param locale The locale to set
   */
  const setLocale = (locale: MessageLanguages): void => {
    vueI18n.locale.value = locale
    localStorage.setItem('userLocale', locale)
  }

  /**
   * Set the current locale using UI language code (EN, NL)
   * @param langCode The UI language code to set
   */
  const setLanguage = (langCode: string): void => {
    const locale = langMap[langCode]
    if (locale) {
      setLocale(locale)
    }
  }

  /**
   * Get the current UI language code (EN, NL)
   */
  const currentLanguage: ComputedRef<string> = computed(() => {
    return langMapReverse[vueI18n.locale.value] || 'EN'
  })

  /**
   * Get all available locales
   */
  const getAvailableLocales = (): MessageLanguages[] => {
    return [...availableLocales]
  }

  /**
   * Get all available UI language codes
   */
  const getAvailableLanguages = (): string[] => {
    return availableLocales.map((locale) => langMapReverse[locale])
  }

  /**
   * Format an entity field with the appropriate context
   *
   * @param entityKey The entity key (e.g., 'teams', 'players')
   * @param fieldKey The field key (e.g., 'name', 'description')
   * @param context The context to use (e.g., 'fieldLabel', 'tableHeader')
   * @returns The formatted string with entity name interpolated
   */
  const formatEntityField = (
    entityKey: string,
    fieldKey: string,
    context: 'fieldLabel' | 'tableHeader' | 'filterLabel' | 'placeholder' = 'fieldLabel',
  ): string => {
    // Log the keys we're trying to access for debugging
    console.log(`Accessing: ${entityKey}.entityName, ${entityKey}.fields.${fieldKey}, ${entityKey}.templates.${context}`)

    // Get and log the values with more robust error handling
    const entityPath = `${entityKey}.entityName`
    const fieldPath = `${entityKey}.fields.${fieldKey}`
    const templatePath = `${entityKey}.templates.${context}`

    // Get raw values and log them
    const entity = vueI18n.t(entityPath)
    const field = vueI18n.t(fieldPath)
    const template = vueI18n.t(templatePath)

    console.log('Raw values:', {
      entityPath,
      entity,
      fieldPath,
      field,
      templatePath,
      template,
    })

    // Check if we got actual values or just the keys back
    if (!entity || entity === entityPath || typeof entity !== 'string') {
      console.warn(`Translation missing for: ${entityPath}`)
      return `${entityKey} ${fieldKey}`
    }

    if (!field || field === fieldPath || typeof field !== 'string') {
      console.warn(`Translation missing for: ${fieldPath}`)
      return `${entityKey} ${fieldKey}`
    }

    if (!template || template === templatePath || typeof template !== 'string') {
      console.warn(`Translation missing for: ${templatePath}`)
      return `${entity} ${field}`
    }

    // Try different interpolation approaches
    try {
      // Method 1: Direct string replacement with named parameters
      const result1 = template.replace('{entity}', entity).replace('{field}', field)

      // Method 2: Try positional parameters as fallback
      const result2 = template.replace('{0}', entity).replace('{1}', field)

      // Method 3: Using Vue I18n's built-in interpolation
      const result3 = vueI18n.t(templatePath, { entity, field })

      console.log('Interpolation results:', { result1, result2, result3 })

      // Fallback mechanism based on context
      let fallback = `${entity} ${field}`
      if (context === 'tableHeader') fallback = String(field)
      if (context === 'filterLabel') fallback = `Filter by ${field}`
      if (context === 'placeholder') fallback = `Enter ${entity} ${field}`

      // Return the most appropriate result
      // If result3 is different from the template path, it means Vue I18n interpolation worked
      if (result3 !== templatePath && typeof result3 === 'string') {
        return result3
      }

      // If result1 contains both entity and field, it means named parameter replacement worked
      if (result1.includes(entity) && result1.includes(field)) {
        return result1
      }

      // If result2 contains both entity and field, it means positional parameter replacement worked
      if (result2.includes(entity) && result2.includes(field)) {
        return result2
      }

      // If all else fails, use the fallback
      return fallback
    } catch (error) {
      console.error('Error during interpolation:', error)

      // Fallback mechanism based on context
      if (context === 'tableHeader') return String(field)
      if (context === 'filterLabel') return `Filter by ${field}`
      if (context === 'placeholder') return `Enter ${entity} ${field}`

      return `${entity} ${field}`
    }
  }

  /**
   * Format an entity message with the entity name interpolated
   *
   * @param entityKey The entity key (e.g., 'teams', 'players')
   * @param messageKey The message key (e.g., 'created', 'updated')
   * @returns The formatted message with entity name interpolated
   */
  const formatEntityMessage = (entityKey: string, messageKey: string): string => {
    // Log the keys we're trying to access for debugging
    console.log(`Accessing: ${entityKey}.entityName, ${entityKey}.messages.${messageKey}`)

    // Get and log the values
    const entityPath = `${entityKey}.entityName`
    const messagePath = `${entityKey}.messages.${messageKey}`

    // Get raw values and log them
    const entity = vueI18n.t(entityPath)
    const message = vueI18n.t(messagePath)

    console.log('Raw values:', {
      entityPath,
      entity,
      messagePath,
      message,
    })

    // Check if we got actual values or just the keys back
    if (!entity || entity === entityPath || typeof entity !== 'string') {
      console.warn(`Translation missing for: ${entityPath}`)
      return `${messageKey} ${entityKey}`
    }

    if (!message || message === messagePath || typeof message !== 'string') {
      console.warn(`Translation missing for: ${messagePath}`)
      return `${messageKey} ${entity}`
    }

    // Try different interpolation approaches
    try {
      // Method 1: Direct string replacement with named parameters
      const result1 = String(message).replace('{entity}', String(entity))

      // Method 2: Try positional parameters as fallback
      const result2 = String(message).replace('{0}', String(entity))

      // Method 3: Using Vue I18n's built-in interpolation
      const result3 = vueI18n.t(messagePath, { entity })

      console.log('Interpolation results:', { result1, result2, result3 })

      // Fallback message
      const fallback = `${messageKey} ${entity}`

      // Return the most appropriate result
      // If result3 is different from the message path, it means Vue I18n interpolation worked
      if (result3 !== messagePath && typeof result3 === 'string') {
        return result3
      }

      // If result1 contains entity, it means named parameter replacement worked
      if (result1.includes(entity)) {
        return result1
      }

      // If result2 contains entity, it means positional parameter replacement worked
      if (result2.includes(entity)) {
        return result2
      }

      // If all else fails, use the fallback
      return fallback
    } catch (error) {
      console.error('Error during message interpolation:', error)
      return `${messageKey} ${entity}`
    }
  }

  return {
    ...vueI18n,
    setLocale,
    setLanguage,
    currentLanguage,
    getAvailableLocales,
    getAvailableLanguages,
    formatEntityField,
    formatEntityMessage,
  }
}
