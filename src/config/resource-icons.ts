/**
 * Global Resource Icons and Colors Configuration
 * Centralized constants for all Star Wars data types
 * Eliminates hardcoded values and ensures consistency across the application
 */

import { useI18n } from '~/composables/useI18n'

export type ResourceType = 'people' | 'planets' | 'films' | 'species' | 'vehicles' | 'starships'

export interface ResourceConfig {
  /** Material/Quasar icon name */
  icon: string
  /** Quasar color name */
  color: string
  /** Description text for cards and pages */
  description: string
  /** Short caption for navigation */
  caption: string
}

export interface ResourceConfigWithLabels extends ResourceConfig {
  /** Singular display name (translated) */
  label: string
  /** Plural display name (translated) */
  labelPlural: string
}

/**
 * Global resource configuration mapping
 * Single source of truth for all resource-specific visual elements
 */
export const RESOURCE_CONFIGS: Record<ResourceType, ResourceConfig> = {
  people: {
    icon: 'people',
    color: 'blue',
    description: 'Discover characters from across the galaxy',
    caption: 'Characters from the galaxy',
  },
  planets: {
    icon: 'public',
    color: 'green',
    description: 'Explore worlds throughout the universe',
    caption: 'Worlds across the universe',
  },
  films: {
    icon: 'movie',
    color: 'purple',
    description: 'Browse through the epic saga',
    caption: 'Episodes of the saga',
  },
  species: {
    icon: 'pets',
    color: 'orange',
    description: 'Learn about different life forms',
    caption: 'Life forms in the galaxy',
  },
  vehicles: {
    icon: 'directions_car',
    color: 'red',
    description: 'View ground and air transport',
    caption: 'Ground and air transport',
  },
  starships: {
    icon: 'rocket_launch',
    color: 'indigo',
    description: 'Examine space vessels and cruisers',
    caption: 'Space vessels and cruisers',
  },
}

/**
 * Get complete resource configuration
 * @param type Resource type
 * @returns Complete resource configuration object
 */
export const getResourceConfig = (type: ResourceType): ResourceConfig => {
  return RESOURCE_CONFIGS[type]
}

/**
 * Get resource icon name
 * @param type Resource type
 * @returns Material/Quasar icon name
 */
export const getResourceIcon = (type: ResourceType): string => {
  return RESOURCE_CONFIGS[type].icon
}

/**
 * Get resource color
 * @param type Resource type
 * @returns Quasar color name
 */
export const getResourceColor = (type: ResourceType): string => {
  return RESOURCE_CONFIGS[type].color
}

/**
 * Get resource label (singular) - uses i18n translations
 * @param type Resource type
 * @returns Singular display name from i18n
 */
export const getResourceLabel = (type: ResourceType): string => {
  const { t } = useI18n()
  return t(`${type}.entityName`)
}

/**
 * Get resource label (plural) - uses i18n translations
 * @param type Resource type
 * @returns Plural display name from i18n
 */
export const getResourceLabelPlural = (type: ResourceType): string => {
  const { t } = useI18n()
  return t(`${type}.entityNamePlural`)
}

/**
 * Get all available resource types
 * @returns Array of all resource types
 */
export const getAllResourceTypes = (): ResourceType[] => {
  return Object.keys(RESOURCE_CONFIGS) as ResourceType[]
}

/**
 * Check if a string is a valid resource type
 * @param type String to check
 * @returns True if valid resource type
 */
export const isValidResourceType = (type: string): type is ResourceType => {
  return type in RESOURCE_CONFIGS
}

/**
 * Get resource type from route name
 * Converts route names like 'PEOPLE' to resource type 'people'
 * @param routeName Route name (e.g., 'PEOPLE', 'STARSHIPS')
 * @returns Resource type or null if not found
 */
export const getResourceTypeFromRoute = (routeName: string): ResourceType | null => {
  const type = routeName.toLowerCase() as ResourceType
  return isValidResourceType(type) ? type : null
}

/**
 * Resource type to route name mapping
 * Maps resource types to their corresponding route name keys
 */
const RESOURCE_TO_ROUTE_MAP: Record<ResourceType, string> = {
  people: 'PEOPLE',
  planets: 'PLANETS',
  films: 'FILMS',
  species: 'SPECIES',
  vehicles: 'VEHICLES',
  starships: 'STARSHIPS',
}

/**
 * Generate categories array for IndexPage
 * Creates the categories array with proper route mapping and i18n translations
 * @param routeNames Object containing route name constants
 * @returns Array of category objects for IndexPage
 */
export const generateCategoriesArray = (routeNames: Record<string, string>) => {
  return getAllResourceTypes().map((type) => {
    const config = getResourceConfig(type)
    const routeKey = RESOURCE_TO_ROUTE_MAP[type]
    const routeName = routeNames[routeKey]

    if (!routeName) {
      throw new Error(`Route name not found for resource type: ${type} (route key: ${routeKey})`)
    }

    return {
      title: getResourceLabelPlural(type),
      description: config.description,
      icon: config.icon,
      color: config.color,
      route: { name: routeName },
    }
  })
}

/**
 * Generate menu items array for MainLayout
 * Creates the menu items array with proper route mapping and i18n translations
 * @param routeNames Object containing route name constants
 * @returns Array of menu item objects for MainLayout
 */
export const generateMenuItemsArray = (routeNames: Record<string, string>) => {
  return getAllResourceTypes().map((type) => {
    const config = getResourceConfig(type)
    const routeKey = RESOURCE_TO_ROUTE_MAP[type]
    const routeName = routeNames[routeKey]

    if (!routeName) {
      throw new Error(`Route name not found for resource type: ${type} (route key: ${routeKey})`)
    }

    return {
      title: getResourceLabelPlural(type),
      caption: config.caption,
      icon: config.icon,
      route: { name: routeName },
    }
  })
}

/**
 * Default export for convenience
 */
export default RESOURCE_CONFIGS
