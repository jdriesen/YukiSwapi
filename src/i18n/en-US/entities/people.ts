// English people translations

export default {
  title: 'People',
  entityName: 'Person',
  entityNamePlural: 'People',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Name',
    birth_year: 'Birth Year',
    eye_color: 'Eye Color',
    gender: 'Gender',
    hair_color: 'Hair Color',
    height: 'Height',
    mass: 'Mass',
    skin_color: 'Skin Color',
    homeworld: 'Homeworld',
    films: 'Films',
    species: 'Species',
    starships: 'Starships',
    vehicles: 'Vehicles',
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

  // People-specific labels and formatting
  labels: {
    characterDetails: 'Character Details',
    physicalCharacteristics: 'Physical Characteristics',
    personalInfo: 'Personal Information',
    relatedContent: 'Related Content',
    appearance: 'Appearance',
    measurements: 'Measurements',
    filmsCount: '{count} Films',
    starshipsCount: '{count} Starships',
    vehiclesCount: '{count} Vehicles',
    speciesCount: '{count} Species',
  },

  // Units and measurements
  units: {
    height: 'cm',
    mass: 'kg',
    heightFormat: '{value} cm',
    massFormat: '{value} kg',
    unknown: 'Unknown',
    notApplicable: 'N/A',
  },

  // Gender and personal attributes
  attributes: {
    male: 'Male',
    female: 'Female',
    hermaphrodite: 'Hermaphrodite',
    none: 'None',
    unknown: 'Unknown',
  },

  // Birth year formatting (Star Wars specific)
  birthYear: {
    bby: '{year} BBY',
    aby: '{year} ABY',
    unknown: 'Unknown',
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
