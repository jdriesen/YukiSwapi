// Traducciones de planetas en español

export default {
  title: 'Planetas',
  entityName: 'Planeta',
  entityNamePlural: 'Planetas',

  // Nombres de campos base (sin prefijo de entidad)
  fields: {
    id: 'ID',
    name: 'Nombre',
    diameter: 'Diámetro',
    rotation_period: 'Período de Rotación',
    orbital_period: 'Período Orbital',
    gravity: 'Gravedad',
    population: 'Población',
    climate: 'Clima',
    terrain: 'Terreno',
    surface_water: 'Agua Superficial',
    residents: 'Residentes',
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
    created: '{entity} creado exitosamente',
    updated: '{entity} actualizado exitosamente',
    deleted: '{entity} eliminado exitosamente',
    confirmDelete: '¿Está seguro de que desea eliminar este {entity}?',
  },

  // Etiquetas y secciones específicas de planetas
  labels: {
    planetDetails: 'Detalles del Planeta',
    physicalCharacteristics: 'Características Físicas',
    environmentalConditions: 'Condiciones Ambientales',
    orbitalInformation: 'Información Orbital',
    populationData: 'Datos de Población',
    astronomicalData: 'Datos Astronómicos',
    surfaceConditions: 'Condiciones de Superficie',
    residentsCount: '{count} Residentes',
    filmsCount: '{count} Películas',
  },

  // Unidades y medidas
  units: {
    diameter: 'km',
    hours: 'horas',
    days: 'días',
    percent: '%',
    gravity: 'estándar',
    diameterFormat: '{value} km',
    hoursFormat: '{value} horas',
    daysFormat: '{value} días',
    percentFormat: '{value}%',
    gravityFormat: '{value} estándar',
    populationFormat: '{value}',
    unknown: 'Desconocido',
    notApplicable: 'N/A',
  },

  // Tipos de clima
  climate: {
    temperate: 'Templado',
    arid: 'Árido',
    tropical: 'Tropical',
    frozen: 'Congelado',
    murky: 'Turbio',
    windy: 'Ventoso',
    hot: 'Caliente',
    humid: 'Húmedo',
    polluted: 'Contaminado',
    unknown: 'Clima Desconocido',
  },

  // Tipos de terreno
  terrain: {
    desert: 'Desierto',
    grasslands: 'Praderas',
    mountains: 'Montañas',
    jungle: 'Selva',
    rainforests: 'Bosques Tropicales',
    tundra: 'Tundra',
    swamp: 'Pantano',
    gas: 'Gigante Gaseoso',
    ocean: 'Océano',
    cityscape: 'Paisaje Urbano',
    unknown: 'Terreno Desconocido',
  },

  // Términos astronómicos
  astronomical: {
    rotationPeriod: 'Período de Rotación',
    orbitalPeriod: 'Período Orbital',
    planetaryRotation: 'Rotación Planetaria',
    orbitalMechanics: 'Mecánica Orbital',
    celestialBody: 'Cuerpo Celeste',
    planetarySystem: 'Sistema Planetario',
  },

  // Condiciones ambientales
  environmental: {
    climate: 'Clima',
    terrain: 'Terreno',
    surfaceWater: 'Agua Superficial',
    atmosphere: 'Atmósfera',
    conditions: 'Condiciones',
    environment: 'Ambiente',
  },

  // Población y demografía
  population: {
    inhabitants: 'Habitantes',
    residents: 'Residentes',
    populationSize: 'Tamaño de Población',
    demographics: 'Demografía',
    populated: 'Poblado',
    uninhabited: 'Deshabitado',
  },

  // Etiquetas específicas de la interfaz
  ui: {
    viewDetails: 'Ver Detalles de {entity}',
    backToList: 'Volver a {entityPlural}',
    loading: 'Cargando {entity}...',
    notFound: '{entity} no encontrado',
    error: 'Error al cargar {entity}',
    retry: 'Reintentar cargar {entity}',
  },
}
