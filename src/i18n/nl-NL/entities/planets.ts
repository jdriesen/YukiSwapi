// Dutch planets translations

export default {
  title: 'Planeten',
  entityName: 'Planeet',
  entityNamePlural: 'Planeten',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Naam',
    diameter: 'Diameter',
    rotation_period: 'Rotatieperiode',
    orbital_period: 'Omloopperiode',
    gravity: 'Zwaartekracht',
    population: 'Bevolking',
    climate: 'Klimaat',
    terrain: 'Terrein',
    surface_water: 'Oppervlaktewater',
    residents: 'Bewoners',
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
    confirmDelete: 'Weet u zeker dat u deze {entity} wilt verwijderen?',
  },

  // Planet-specific labels and sections
  labels: {
    planetDetails: 'Planeet Details',
    physicalCharacteristics: 'Fysieke Kenmerken',
    environmentalConditions: 'Omgevingsomstandigheden',
    orbitalInformation: 'Baangegevens',
    populationData: 'Bevolkingsgegevens',
    astronomicalData: 'Astronomische Gegevens',
    surfaceConditions: 'Oppervlakteomstandigheden',
    residentsCount: '{count} Bewoners',
    filmsCount: '{count} Films',
  },

  // Units and measurements
  units: {
    diameter: 'km',
    hours: 'uur',
    days: 'dagen',
    percent: '%',
    gravity: 'standaard',
    diameterFormat: '{value} km',
    hoursFormat: '{value} uur',
    daysFormat: '{value} dagen',
    percentFormat: '{value}%',
    gravityFormat: '{value} standaard',
    populationFormat: '{value}',
    unknown: 'Onbekend',
    notApplicable: 'N.v.t.',
  },

  // Climate types
  climate: {
    temperate: 'Gematigd',
    arid: 'Droog',
    tropical: 'Tropisch',
    frozen: 'bevroren',
    murky: 'Troebel',
    windy: 'Winderig',
    hot: 'Heet',
    humid: 'Vochtig',
    polluted: 'Vervuild',
    unknown: 'Onbekend Klimaat',
  },

  // Terrain types
  terrain: {
    desert: 'Woestijn',
    grasslands: 'Graslanden',
    mountains: 'Bergen',
    jungle: 'Jungle',
    rainforests: 'Regenwouden',
    tundra: 'Toendra',
    swamp: 'Moeras',
    gas: 'Gasreus',
    ocean: 'Oceaan',
    cityscape: 'Stadslandschap',
    unknown: 'Onbekend Terrein',
  },

  // Astronomical terms
  astronomical: {
    rotationPeriod: 'Rotatieperiode',
    orbitalPeriod: 'Omloopperiode',
    planetaryRotation: 'Planetaire Rotatie',
    orbitalMechanics: 'Baanmechanica',
    celestialBody: 'Hemellichaam',
    planetarySystem: 'Planetenstelsel',
  },

  // Environmental conditions
  environmental: {
    climate: 'Klimaat',
    terrain: 'Terrein',
    surfaceWater: 'Oppervlaktewater',
    atmosphere: 'Atmosfeer',
    conditions: 'Omstandigheden',
    environment: 'Omgeving',
  },

  // Population and demographics
  population: {
    inhabitants: 'Inwoners',
    residents: 'Bewoners',
    populationSize: 'Bevolkingsomvang',
    demographics: 'Demografie',
    populated: 'Bewoond',
    uninhabited: 'Onbewoond',
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
