// Dutch vehicles translations

export default {
  title: 'Voertuigen',
  entityName: 'Voertuig',
  entityNamePlural: 'Voertuigen',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Naam',
    model: 'Model',
    manufacturer: 'Fabrikant',
    cost_in_credits: 'Kosten in Credits',
    length: 'Lengte',
    max_atmosphering_speed: 'Max Atmosferische Snelheid',
    crew: 'Bemanning',
    passengers: 'Passagiers',
    cargo_capacity: 'Vrachtcapaciteit',
    consumables: 'Voorraden',
    vehicle_class: 'Voertuig Klasse',
    pilots: 'Piloten',
    films: 'Films',
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
    confirmDelete: 'Weet u zeker dat u dit {entity} wilt verwijderen?',
  },

  // Vehicle-specific labels and sections
  labels: {
    vehicleDetails: 'Voertuig Details',
    operationalDetails: 'Operationele Details',
    technicalSpecs: 'Technische Specificaties',
    costInformation: 'Kosten Informatie',
    performanceData: 'Prestatie Gegevens',
    capacityInfo: 'Capaciteit Informatie',
    pilotsCount: '{count} Piloten',
    filmsCount: '{count} Films',
  },

  // Units and measurements
  units: {
    length: 'm',
    speed: 'km/u',
    cargo: 'kg',
    credits: 'credits',
    lengthFormat: '{value} m',
    speedFormat: '{value} km/u',
    cargoFormat: '{value} kg',
    creditsFormat: '{value} credits',
    unknown: 'Onbekend',
    notApplicable: 'N.v.t.',
  },

  // Vehicle classes and categories
  classes: {
    speeder: 'Speeder',
    walker: 'Walker',
    airspeeder: 'Luchtspecder',
    landspeeder: 'Landspeeder',
    transport: 'Transport',
    assault: 'Aanvalsvoertuig',
    tank: 'Tank',
    repulsorcraft: 'Repulsorvaartuig',
    wheeled: 'Wielvoeruig',
    sail: 'Zeilschuit',
    unknown: 'Onbekende Klasse',
  },

  // Technical specifications
  technical: {
    atmosphericSpeed: 'Atmosferische Snelheid',
    groundSpeed: 'Grondsnelheid',
    crewSize: 'Bemanningsgrootte',
    passengerCapacity: 'Passagierscapaciteit',
    cargoSpace: 'Vrachtruimte',
    consumableSupply: 'Voorraad Benodigdheden',
    vehicleType: 'Voertuigtype',
  },

  // Operational terms
  operational: {
    crew: 'Bemanning',
    passengers: 'Passagiers',
    cargo: 'Vracht',
    consumables: 'Voorraden',
    capacity: 'Capaciteit',
    operations: 'Operaties',
    performance: 'Prestatie',
  },

  // Cost and value formatting
  cost: {
    expensive: 'Hoge Waarde',
    moderate: 'Gematigde Kosten',
    affordable: 'Betaalbaar',
    unknown: 'Kosten Onbekend',
    credits: 'Credits',
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
