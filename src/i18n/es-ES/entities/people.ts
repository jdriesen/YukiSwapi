// Traducciones de personas en español

export default {
  title: 'Personas',
  entityName: 'Persona',
  entityNamePlural: 'Personas',

  // Nombres de campos base (sin prefijo de entidad)
  fields: {
    id: 'ID',
    name: 'Nombre',
    birth_year: 'Año de Nacimiento',
    eye_color: 'Color de Ojos',
    gender: 'Género',
    hair_color: 'Color de Cabello',
    height: 'Altura',
    mass: 'Masa',
    skin_color: 'Color de Piel',
    homeworld: 'Mundo Natal',
    films: 'Películas',
    species: 'Especies',
    starships: 'Naves Espaciales',
    vehicles: 'Vehículos',
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

  // Etiquetas y formato específicos de personas
  labels: {
    characterDetails: 'Detalles del Personaje',
    physicalCharacteristics: 'Características Físicas',
    personalInfo: 'Información Personal',
    relatedContent: 'Contenido Relacionado',
    appearance: 'Apariencia',
    measurements: 'Medidas',
    filmsCount: '{count} Películas',
    starshipsCount: '{count} Naves Espaciales',
    vehiclesCount: '{count} Vehículos',
    speciesCount: '{count} Especies',
  },

  // Unidades y medidas
  units: {
    height: 'cm',
    mass: 'kg',
    heightFormat: '{value} cm',
    massFormat: '{value} kg',
    unknown: 'Desconocido',
    notApplicable: 'N/A',
  },

  // Género y atributos personales
  attributes: {
    male: 'Masculino',
    female: 'Femenino',
    hermaphrodite: 'Hermafrodita',
    none: 'Ninguno',
    unknown: 'Desconocido',
  },

  // Formato de año de nacimiento (específico de Star Wars)
  birthYear: {
    bby: '{year} ABY',
    aby: '{year} DBY',
    unknown: 'Desconocido',
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
