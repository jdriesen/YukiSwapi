// English vehicles translations

export default {
  title: 'Vehicles',
  entityName: 'Vehicle',
  entityNamePlural: 'Vehicles',

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
    vehicle_class: 'Vehicle Class',
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

  // Vehicle-specific labels and sections
  labels: {
    vehicleDetails: 'Vehicle Details',
    operationalDetails: 'Operational Details',
    technicalSpecs: 'Technical Specifications',
    costInformation: 'Cost Information',
    performanceData: 'Performance Data',
    capacityInfo: 'Capacity Information',
    pilotsCount: '{count} Pilots',
    filmsCount: '{count} Films',
  },

  // Units and measurements
  units: {
    length: 'm',
    speed: 'km/h',
    cargo: 'kg',
    credits: 'credits',
    lengthFormat: '{value} m',
    speedFormat: '{value} km/h',
    cargoFormat: '{value} kg',
    creditsFormat: '{value} credits',
    unknown: 'Unknown',
    notApplicable: 'N/A',
  },

  // Vehicle classes and categories
  classes: {
    speeder: 'Speeder',
    walker: 'Walker',
    airspeeder: 'Airspeeder',
    landspeeder: 'Landspeeder',
    transport: 'Transport',
    assault: 'Assault Vehicle',
    tank: 'Tank',
    repulsorcraft: 'Repulsorcraft',
    wheeled: 'Wheeled Vehicle',
    sail: 'Sail Barge',
    unknown: 'Unknown Class',
  },

  // Technical specifications
  technical: {
    atmosphericSpeed: 'Atmospheric Speed',
    groundSpeed: 'Ground Speed',
    crewSize: 'Crew Size',
    passengerCapacity: 'Passenger Capacity',
    cargoSpace: 'Cargo Space',
    consumableSupply: 'Consumable Supply',
    vehicleType: 'Vehicle Type',
  },

  // Operational terms
  operational: {
    crew: 'Crew',
    passengers: 'Passengers',
    cargo: 'Cargo',
    consumables: 'Consumables',
    capacity: 'Capacity',
    operations: 'Operations',
    performance: 'Performance',
  },

  // Cost and value formatting
  cost: {
    expensive: 'High Value',
    moderate: 'Moderate Cost',
    affordable: 'Affordable',
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
