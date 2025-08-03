// Dutch starships translations

export default {
  title: 'Ruimteschepen',
  entityName: 'Ruimteschip',
  entityNamePlural: 'Ruimteschepen',

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
    hyperdrive_rating: 'Hyperdrive Classificatie',
    MGLT: 'MGLT',
    starship_class: 'Ruimteschip Klasse',
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

  // Starship-specific labels and sections
  labels: {
    starshipDetails: 'Ruimteschip Details',
    spaceTravelSpecs: 'Ruimtereizen Specificaties',
    operationalDetails: 'Operationele Details',
    costInformation: 'Kosten Informatie',
    technicalSpecs: 'Technische Specificaties',
    capacityInfo: 'Capaciteit Informatie',
    performanceData: 'Prestatie Gegevens',
    pilotsCount: '{count} Piloten',
    filmsCount: '{count} Films',
  },

  // Units and measurements
  units: {
    length: 'm',
    speed: 'km/u',
    cargo: 'kg',
    credits: 'credits',
    mglt: 'MGLT',
    lengthFormat: '{value} m',
    speedFormat: '{value} km/u',
    cargoFormat: '{value} kg',
    creditsFormat: '{value} credits',
    mgltFormat: '{value} MGLT',
    hyperdriveClass: 'Klasse {rating}',
    unknown: 'Onbekend',
    notApplicable: 'N.v.t.',
  },

  // Technical specifications
  technical: {
    hyperdriveRating: 'Hyperdrive Classificatie',
    mgltExplanation: 'Megalicht per uur',
    atmosphericSpeed: 'Atmosferische Snelheid',
    spaceSpeed: 'Ruimte Snelheid',
    crewSize: 'Bemanningsgrootte',
    passengerCapacity: 'Passagierscapaciteit',
    cargoSpace: 'Vrachtruimte',
    consumableSupply: 'Voorraad Benodigdheden',
  },

  // Starship classes and categories
  classes: {
    fighter: 'Jager',
    transport: 'Transport',
    cruiser: 'Kruiser',
    destroyer: 'Vernietiger',
    frigate: 'Fregat',
    corvette: 'Korvet',
    dreadnought: 'Dreadnought',
    battleship: 'Slagschip',
    carrier: 'Drager',
    unknown: 'Onbekende Klasse',
  },

  // Cost and value formatting
  cost: {
    expensive: 'Hoge Waarde',
    moderate: 'Gematigde Kosten',
    affordable: 'Betaalbaar',
    priceless: 'Onbetaalbaar',
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
