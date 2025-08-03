// Traducciones de películas en español

export default {
  title: 'Películas',
  entityName: 'Película',
  entityNamePlural: 'Películas',

  // Nombres de campos base (sin prefijo de entidad)
  fields: {
    id: 'ID',
    title: 'Título',
    episode_id: 'Episodio',
    opening_crawl: 'Texto de Apertura',
    director: 'Director',
    producer: 'Productor',
    release_date: 'Fecha de Estreno',
    characters: 'Personajes',
    planets: 'Planetas',
    starships: 'Naves Espaciales',
    vehicles: 'Vehículos',
    species: 'Especies',
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

  // Etiquetas y formato específicos de películas
  labels: {
    episodeFormat: 'Episodio {episode}',
    episodeRoman: 'Episodio {roman}',
    openingCrawlTitle: 'Texto de Apertura',
    releaseInfo: 'Información de Estreno',
    productionInfo: 'Información de Producción',
    relatedContent: 'Contenido Relacionado',
    charactersCount: '{count} Personajes',
    planetsCount: '{count} Planetas',
    starshipsCount: '{count} Naves Espaciales',
    vehiclesCount: '{count} Vehículos',
    speciesCount: '{count} Especies',
  },

  // Contextos de fecha y formato
  formatting: {
    releaseDate: 'Estrenada el {date}',
    episodeNumber: 'Episodio {number}',
    longDate: '{day} de {month} de {year}',
    shortDate: '{day}/{month}/{year}',
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
