// Dutch film translations

export default {
  title: 'Films',
  entityName: 'Film',
  entityNamePlural: 'Films',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    title: 'Titel',
    episode_id: 'Episode',
    opening_crawl: 'Openingscrawl',
    director: 'Regisseur',
    producer: 'Producent',
    release_date: 'Releasedatum',
    characters: 'Personages',
    planets: 'Planeten',
    starships: 'Ruimteschepen',
    vehicles: 'Voertuigen',
    species: 'Soorten',
    created: 'Aangemaakt',
    edited: 'Laatst gewijzigd',
    url: 'URL',
  },

  // Templates for different contexts
  templates: {
    fieldLabel: '{entity} {field}',
    tableHeader: '{field}',
    filterLabel: 'Filteren op {field}',
    placeholder: 'Voer {entity} {field} in',
  },

  // Messages specific to this entity
  messages: {
    created: '{entity} succesvol aangemaakt',
    updated: '{entity} succesvol bijgewerkt',
    deleted: '{entity} succesvol verwijderd',
    confirmDelete: 'Weet u zeker dat u deze {entity} wilt verwijderen?',
  },

  // Film-specific labels and formatting
  labels: {
    episodeFormat: 'Episode {episode}',
    episodeRoman: 'Episode {roman}',
    openingCrawlTitle: 'Openingscrawl',
    releaseInfo: 'Release-informatie',
    productionInfo: 'Productie-informatie',
    relatedContent: 'Gerelateerde inhoud',
    charactersCount: '{count} Personages',
    planetsCount: '{count} Planeten',
    starshipsCount: '{count} Ruimteschepen',
    vehiclesCount: '{count} Voertuigen',
    speciesCount: '{count} Soorten',
  },

  // Date and formatting contexts
  formatting: {
    releaseDate: 'Uitgebracht op {date}',
    episodeNumber: 'Episode {number}',
    longDate: '{day} {month} {year}',
    shortDate: '{day}-{month}-{year}',
  },

  // UI specific labels
  ui: {
    viewDetails: '{entity} details bekijken',
    backToList: 'Terug naar {entityPlural}',
    loading: '{entity} laden...',
    notFound: '{entity} niet gevonden',
    error: 'Fout bij het laden van {entity}',
    retry: '{entity} opnieuw laden',
  },
}
