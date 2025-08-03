// English species translations

export default {
  title: 'Species',
  entityName: 'Species',
  entityNamePlural: 'Species',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Name',
    classification: 'Classification',
    designation: 'Designation',
    average_height: 'Average Height',
    skin_colors: 'Skin Colors',
    hair_colors: 'Hair Colors',
    eye_colors: 'Eye Colors',
    average_lifespan: 'Average Lifespan',
    homeworld: 'Homeworld',
    language: 'Language',
    people: 'People',
    films: 'Films',
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

  // Species-specific labels and sections
  labels: {
    speciesDetails: 'Species Details',
    physicalCharacteristics: 'Physical Characteristics',
    biologicalInfo: 'Biological Information',
    culturalInfo: 'Cultural Information',
    appearance: 'Appearance',
    lifespan: 'Lifespan',
    peopleCount: '{count} People',
    filmsCount: '{count} Films',
    homeworldInfo: 'Homeworld Information',
  },

  // Units and measurements
  units: {
    height: 'cm',
    years: 'years',
    heightFormat: '{value} cm',
    lifespanFormat: '{value} years',
    indefinite: 'Indefinite',
    unknown: 'Unknown',
    notApplicable: 'N/A',
  },

  // Biological classifications
  classifications: {
    mammal: 'Mammal',
    reptile: 'Reptile',
    amphibian: 'Amphibian',
    sentient: 'Sentient',
    artificial: 'Artificial',
    gastropod: 'Gastropod',
    unknown: 'Unknown Classification',
  },

  // Designations
  designations: {
    sentient: 'Sentient',
    semiSentient: 'Semi-sentient',
    reptilian: 'Reptilian',
    unknown: 'Unknown Designation',
  },

  // Physical characteristics
  physical: {
    skinColors: 'Skin Colors',
    hairColors: 'Hair Colors',
    eyeColors: 'Eye Colors',
    averageHeight: 'Average Height',
    colorVariations: 'Color Variations',
    physicalTraits: 'Physical Traits',
  },

  // Lifespan and biological terms
  biological: {
    lifespan: 'Lifespan',
    averageLifespan: 'Average Lifespan',
    indefiniteLifespan: 'Indefinite Lifespan',
    mortal: 'Mortal',
    immortal: 'Immortal',
    biologicalType: 'Biological Type',
  },

  // Cultural and linguistic
  cultural: {
    language: 'Language',
    nativeLanguage: 'Native Language',
    communication: 'Communication',
    culture: 'Culture',
    homeworld: 'Homeworld',
    originPlanet: 'Origin Planet',
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
