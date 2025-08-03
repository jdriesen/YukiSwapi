// Traducciones de especies en español

export default {
  title: 'Especies',
  entityName: 'Especie',
  entityNamePlural: 'Especies',

  // Nombres de campos base (sin prefijo de entidad)
  fields: {
    id: 'ID',
    name: 'Nombre',
    classification: 'Clasificación',
    designation: 'Designación',
    average_height: 'Altura Promedio',
    skin_colors: 'Colores de Piel',
    hair_colors: 'Colores de Cabello',
    eye_colors: 'Colores de Ojos',
    average_lifespan: 'Esperanza de Vida Promedio',
    homeworld: 'Mundo Natal',
    language: 'Idioma',
    people: 'Personas',
    films: 'Películas',
    created: 'Creado',
    edited: 'Última Modificación',
    url: 'URL',
  },

  // Plantillas para diferentes contextos
  templates: {
    fieldLabel: '{entity} {field}',
    tableHeader: '{field}',
    filterLabel: 'Filtrar por {field}',
    placeholder: 'Ingrese {entity} {field}',
  },

  // Mensajes específicos de esta entidad
  messages: {
    created: '{entity} creada exitosamente',
    updated: '{entity} actualizada exitosamente',
    deleted: '{entity} eliminada exitosamente',
    confirmDelete: '¿Está seguro de que desea eliminar esta {entity}?',
  },

  // Etiquetas y secciones específicas de especies
  labels: {
    speciesDetails: 'Detalles de la Especie',
    physicalCharacteristics: 'Características Físicas',
    biologicalInfo: 'Información Biológica',
    culturalInfo: 'Información Cultural',
    appearance: 'Apariencia',
    lifespan: 'Esperanza de Vida',
    peopleCount: '{count} Personas',
    filmsCount: '{count} Películas',
    homeworldInfo: 'Información del Mundo Natal',
  },

  // Unidades y medidas
  units: {
    height: 'cm',
    years: 'años',
    heightFormat: '{value} cm',
    lifespanFormat: '{value} años',
    indefinite: 'Indefinida',
    unknown: 'Desconocido',
    notApplicable: 'N/A',
  },

  // Clasificaciones biológicas
  classifications: {
    mammal: 'Mamífero',
    reptile: 'Reptil',
    amphibian: 'Anfibio',
    sentient: 'Sensible',
    artificial: 'Artificial',
    gastropod: 'Gasterópodo',
    unknown: 'Clasificación Desconocida',
  },

  // Designaciones
  designations: {
    sentient: 'Sensible',
    semiSentient: 'Semi-sensible',
    reptilian: 'Reptiliano',
    unknown: 'Designación Desconocida',
  },

  // Características físicas
  physical: {
    skinColors: 'Colores de Piel',
    hairColors: 'Colores de Cabello',
    eyeColors: 'Colores de Ojos',
    averageHeight: 'Altura Promedio',
    colorVariations: 'Variaciones de Color',
    physicalTraits: 'Rasgos Físicos',
  },

  // Esperanza de vida y términos biológicos
  biological: {
    lifespan: 'Esperanza de Vida',
    averageLifespan: 'Esperanza de Vida Promedio',
    indefiniteLifespan: 'Esperanza de Vida Indefinida',
    mortal: 'Mortal',
    immortal: 'Inmortal',
    biologicalType: 'Tipo Biológico',
  },

  // Cultural y lingüístico
  cultural: {
    language: 'Idioma',
    nativeLanguage: 'Idioma Nativo',
    communication: 'Comunicación',
    culture: 'Cultura',
    homeworld: 'Mundo Natal',
    originPlanet: 'Planeta de Origen',
  },

  // Etiquetas específicas de la interfaz
  ui: {
    viewDetails: 'Ver Detalles de {entity}',
    backToList: 'Volver a {entityPlural}',
    loading: 'Cargando {entity}...',
    notFound: '{entity} no encontrada',
    error: 'Error al cargar {entity}',
    retry: 'Reintentar cargar {entity}',
  },
}
