// English starships translations

export default {
  title: 'Starships',
  entityName: 'Starship',
  entityNamePlural: 'Starships',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Name',
    model: 'Model',
    manufacturer: 'Manufacturer',
    cost_in_credits: 'Cost in Credits',
    length: 'Length',
    max_atmosphering_speed: 'Max Atmosphering Speed',
    crew: 'Crew',
    passengers: 'Passengers',
    cargo_capacity: 'Cargo Capacity',
    consumables: 'Consumables',
    hyperdrive_rating: 'Hyperdrive Rating',
    MGLT: 'MGLT',
    starship_class: 'Starship Class',
    pilots: 'Pilots',
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

  // Starship-specific labels and sections
  labels: {
    starshipDetails: 'Starship Details',
    spaceTravelSpecs: 'Space Travel Specifications',
    operationalDetails: 'Operational Details',
    costInformation: 'Cost Information',
    technicalSpecs: 'Technical Specifications',
    capacityInfo: 'Capacity Information',
    performanceData: 'Performance Data',
    pilotsCount: '{count} Pilots',
    filmsCount: '{count} Films',
  },

  // Units and measurements
  units: {
    length: 'm',
    speed: 'km/h',
    cargo: 'kg',
    credits: 'credits',
    mglt: 'MGLT',
    lengthFormat: '{value} m',
    speedFormat: '{value} km/h',
    cargoFormat: '{value} kg',
    creditsFormat: '{value} credits',
    mgltFormat: '{value} MGLT',
    hyperdriveClass: 'Class {rating}',
    unknown: 'Unknown',
    notApplicable: 'N/A',
  },

  // Technical specifications
  technical: {
    hyperdriveRating: 'Hyperdrive Rating',
    mgltExplanation: 'Megalight per hour',
    atmosphericSpeed: 'Atmospheric Speed',
    spaceSpeed: 'Space Speed',
    crewSize: 'Crew Size',
    passengerCapacity: 'Passenger Capacity',
    cargoSpace: 'Cargo Space',
    consumableSupply: 'Consumable Supply',
  },

  // Starship classes and categories
  classes: {
    fighter: 'Fighter',
    transport: 'Transport',
    cruiser: 'Cruiser',
    destroyer: 'Destroyer',
    frigate: 'Frigate',
    corvette: 'Corvette',
    dreadnought: 'Dreadnought',
    battleship: 'Battleship',
    carrier: 'Carrier',
    unknown: 'Unknown Class',
  },

  // Cost and value formatting
  cost: {
    expensive: 'High Value',
    moderate: 'Moderate Cost',
    affordable: 'Affordable',
    priceless: 'Priceless',
    unknown: 'Cost Unknown',
    credits: 'Credits',
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
