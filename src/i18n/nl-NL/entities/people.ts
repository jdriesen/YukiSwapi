// Dutch people translations

export default {
  title: 'Mensen',
  entityName: 'Persoon',
  entityNamePlural: 'Mensen',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Naam',
    birth_year: 'Geboortejaar',
    eye_color: 'Oogkleur',
    gender: 'Geslacht',
    hair_color: 'Haarkleur',
    height: 'Lengte',
    mass: 'Gewicht',
    skin_color: 'Huidskleur',
    homeworld: 'Thuiswereld',
    films: 'Films',
    species: 'Soorten',
    starships: 'Ruimteschepen',
    vehicles: 'Voertuigen',
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

  // People-specific labels and formatting
  labels: {
    characterDetails: 'Personage Details',
    physicalCharacteristics: 'Fysieke Kenmerken',
    personalInfo: 'Persoonlijke Informatie',
    relatedContent: 'Gerelateerde Inhoud',
    appearance: 'Uiterlijk',
    measurements: 'Afmetingen',
    filmsCount: '{count} Films',
    starshipsCount: '{count} Ruimteschepen',
    vehiclesCount: '{count} Voertuigen',
    speciesCount: '{count} Soorten',
  },

  // Units and measurements
  units: {
    height: 'cm',
    mass: 'kg',
    heightFormat: '{value} cm',
    massFormat: '{value} kg',
    unknown: 'Onbekend',
    notApplicable: 'N.v.t.',
  },

  // Gender and personal attributes
  attributes: {
    male: 'Mannelijk',
    female: 'Vrouwelijk',
    hermaphrodite: 'Hermafrodiet',
    none: 'Geen',
    unknown: 'Onbekend',
  },

  // Birth year formatting (Star Wars specific)
  birthYear: {
    bby: '{year} BBY',
    aby: '{year} ABY',
    unknown: 'Onbekend',
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
