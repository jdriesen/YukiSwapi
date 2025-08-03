// English planets translations

export default {
  title: 'Planets',
  entityName: 'Planet',
  entityNamePlural: 'Planets',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Name',
    diameter: 'Diameter',
    rotation_period: 'Rotation Period',
    orbital_period: 'Orbital Period',
    gravity: 'Gravity',
    population: 'Population',
    climate: 'Climate',
    terrain: 'Terrain',
    surface_water: 'Surface Water',
    residents: 'Residents',
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

  // Planet-specific labels and sections
  labels: {
    planetDetails: 'Planet Details',
    physicalCharacteristics: 'Physical Characteristics',
    environmentalConditions: 'Environmental Conditions',
    orbitalInformation: 'Orbital Information',
    populationData: 'Population Data',
    astronomicalData: 'Astronomical Data',
    surfaceConditions: 'Surface Conditions',
    residentsCount: '{count} Residents',
    filmsCount: '{count} Films',
  },

  // Units and measurements
  units: {
    diameter: 'km',
    hours: 'hours',
    days: 'days',
    percent: '%',
    gravity: 'standard',
    diameterFormat: '{value} km',
    hoursFormat: '{value} hours',
    daysFormat: '{value} days',
    percentFormat: '{value}%',
    gravityFormat: '{value} standard',
    populationFormat: '{value}',
    unknown: 'Unknown',
    notApplicable: 'N/A',
  },

  // Climate types
  climate: {
    temperate: 'Temperate',
    arid: 'Arid',
    tropical: 'Tropical',
    frozen: 'Frozen',
    murky: 'Murky',
    windy: 'Windy',
    hot: 'Hot',
    humid: 'Humid',
    polluted: 'Polluted',
    unknown: 'Unknown Climate',
  },

  // Terrain types
  terrain: {
    desert: 'Desert',
    grasslands: 'Grasslands',
    mountains: 'Mountains',
    jungle: 'Jungle',
    rainforests: 'Rainforests',
    tundra: 'Tundra',
    swamp: 'Swamp',
    gas: 'Gas Giant',
    ocean: 'Ocean',
    cityscape: 'Cityscape',
    unknown: 'Unknown Terrain',
  },

  // Astronomical terms
  astronomical: {
    rotationPeriod: 'Rotation Period',
    orbitalPeriod: 'Orbital Period',
    planetaryRotation: 'Planetary Rotation',
    orbitalMechanics: 'Orbital Mechanics',
    celestialBody: 'Celestial Body',
    planetarySystem: 'Planetary System',
  },

  // Environmental conditions
  environmental: {
    climate: 'Climate',
    terrain: 'Terrain',
    surfaceWater: 'Surface Water',
    atmosphere: 'Atmosphere',
    conditions: 'Conditions',
    environment: 'Environment',
  },

  // Population and demographics
  population: {
    inhabitants: 'Inhabitants',
    residents: 'Residents',
    populationSize: 'Population Size',
    demographics: 'Demographics',
    populated: 'Populated',
    uninhabited: 'Uninhabited',
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
