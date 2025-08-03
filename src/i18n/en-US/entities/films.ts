// English film translations

export default {
  title: 'Films',
  entityName: 'Film',
  entityNamePlural: 'Films',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    title: 'Title',
    episode_id: 'Episode',
    opening_crawl: 'Opening Crawl',
    director: 'Director',
    producer: 'Producer',
    release_date: 'Release Date',
    characters: 'Characters',
    planets: 'Planets',
    starships: 'Starships',
    vehicles: 'Vehicles',
    species: 'Species',
    created: 'Created',
    edited: 'Last Modified',
    url: 'URL',
  },

  // Templates for different contexts
  templates: {
    fieldLabel: '{entity} {field}',
    tableHeader: '{field}',
    filterLabel: 'Filter by {field}',
    placeholder: 'Enter {entity} {field}',
  },

  // Messages specific to this entity
  messages: {
    created: '{entity} created successfully',
    updated: '{entity} updated successfully',
    deleted: '{entity} deleted successfully',
    confirmDelete: 'Are you sure you want to delete this {entity}?',
  },

  // Film-specific labels and formatting
  labels: {
    episodeFormat: 'Episode {episode}',
    episodeRoman: 'Episode {roman}',
    openingCrawlTitle: 'Opening Crawl',
    releaseInfo: 'Release Information',
    productionInfo: 'Production Information',
    relatedContent: 'Related Content',
    charactersCount: '{count} Characters',
    planetsCount: '{count} Planets',
    starshipsCount: '{count} Starships',
    vehiclesCount: '{count} Vehicles',
    speciesCount: '{count} Species',
  },

  // Date and formatting contexts
  formatting: {
    releaseDate: 'Released on {date}',
    episodeNumber: 'Episode {number}',
    longDate: '{month} {day}, {year}',
    shortDate: '{month}/{day}/{year}',
  },

  // UI specific labels
  ui: {
    viewDetails: 'View {entity} Details',
    backToList: 'Back to {entityPlural}',
    loading: 'Loading {entity}...',
    notFound: '{entity} not found',
    error: 'Error loading {entity}',
    retry: 'Retry loading {entity}',
  },
}
