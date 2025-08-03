// Dutch species translations

export default {
  title: 'Soorten',
  entityName: 'Soort',
  entityNamePlural: 'Soorten',

  // Base field names (without entity prefix)
  fields: {
    id: 'ID',
    name: 'Naam',
    classification: 'Classificatie',
    designation: 'Aanduiding',
    average_height: 'Gemiddelde Lengte',
    skin_colors: 'Huidskleuren',
    hair_colors: 'Haarkleuren',
    eye_colors: 'Oogkleuren',
    average_lifespan: 'Gemiddelde Levensduur',
    homeworld: 'Thuiswereld',
    language: 'Taal',
    people: 'Mensen',
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

  // Species-specific labels and sections
  labels: {
    speciesDetails: 'Soort Details',
    physicalCharacteristics: 'Fysieke Kenmerken',
    biologicalInfo: 'Biologische Informatie',
    culturalInfo: 'Culturele Informatie',
    appearance: 'Uiterlijk',
    lifespan: 'Levensduur',
    peopleCount: '{count} Mensen',
    filmsCount: '{count} Films',
    homeworldInfo: 'Thuiswereld Informatie',
  },

  // Units and measurements
  units: {
    height: 'cm',
    years: 'jaar',
    heightFormat: '{value} cm',
    lifespanFormat: '{value} jaar',
    indefinite: 'Onbepaald',
    unknown: 'Onbekend',
    notApplicable: 'N.v.t.',
  },

  // Biological classifications
  classifications: {
    mammal: 'Zoogdier',
    reptile: 'Reptiel',
    amphibian: 'Amfibie',
    sentient: 'Bewust',
    artificial: 'Kunstmatig',
    gastropod: 'Buikpotige',
    unknown: 'Onbekende Classificatie',
  },

  // Designations
  designations: {
    sentient: 'Bewust',
    semiSentient: 'Semi-bewust',
    reptilian: 'Reptielachtig',
    unknown: 'Onbekende Aanduiding',
  },

  // Physical characteristics
  physical: {
    skinColors: 'Huidskleuren',
    hairColors: 'Haarkleuren',
    eyeColors: 'Oogkleuren',
    averageHeight: 'Gemiddelde Lengte',
    colorVariations: 'Kleurvariaties',
    physicalTraits: 'Fysieke Eigenschappen',
  },

  // Lifespan and biological terms
  biological: {
    lifespan: 'Levensduur',
    averageLifespan: 'Gemiddelde Levensduur',
    indefiniteLifespan: 'Onbepaalde Levensduur',
    mortal: 'Sterfelijk',
    immortal: 'Onsterfelijk',
    biologicalType: 'Biologisch Type',
  },

  // Cultural and linguistic
  cultural: {
    language: 'Taal',
    nativeLanguage: 'Moedertaal',
    communication: 'Communicatie',
    culture: 'Cultuur',
    homeworld: 'Thuiswereld',
    originPlanet: 'Oorsprongsplaneet',
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
