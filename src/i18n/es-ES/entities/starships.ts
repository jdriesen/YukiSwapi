// Traducciones de naves espaciales en español

export default {
  title: 'Naves Espaciales',
  entityName: 'Nave Espacial',
  entityNamePlural: 'Naves Espaciales',

  // Nombres de campos base (sin prefijo de entidad)
  fields: {
    id: 'ID',
    name: 'Nombre',
    model: 'Modelo',
    manufacturer: 'Fabricante',
    cost_in_credits: 'Costo en Créditos',
    length: 'Longitud',
    max_atmosphering_speed: 'Velocidad Máxima Atmosférica',
    crew: 'Tripulación',
    passengers: 'Pasajeros',
    cargo_capacity: 'Capacidad de Carga',
    consumables: 'Suministros',
    hyperdrive_rating: 'Clasificación de Hiperimpulsor',
    MGLT: 'MGLT',
    starship_class: 'Clase de Nave Espacial',
    pilots: 'Pilotos',
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

  // Etiquetas y secciones específicas de naves espaciales
  labels: {
    starshipDetails: 'Detalles de la Nave Espacial',
    spaceTravelSpecs: 'Especificaciones de Viaje Espacial',
    operationalDetails: 'Detalles Operacionales',
    costInformation: 'Información de Costo',
    technicalSpecs: 'Especificaciones Técnicas',
    capacityInfo: 'Información de Capacidad',
    performanceData: 'Datos de Rendimiento',
    pilotsCount: '{count} Pilotos',
    filmsCount: '{count} Películas',
  },

  // Unidades y medidas
  units: {
    length: 'm',
    speed: 'km/h',
    cargo: 'kg',
    credits: 'créditos',
    mglt: 'MGLT',
    lengthFormat: '{value} m',
    speedFormat: '{value} km/h',
    cargoFormat: '{value} kg',
    creditsFormat: '{value} créditos',
    mgltFormat: '{value} MGLT',
    hyperdriveClass: 'Clase {rating}',
    unknown: 'Desconocido',
    notApplicable: 'N/A',
  },

  // Especificaciones técnicas
  technical: {
    hyperdriveRating: 'Clasificación de Hiperimpulsor',
    mgltExplanation: 'Megaluz por hora',
    atmosphericSpeed: 'Velocidad Atmosférica',
    spaceSpeed: 'Velocidad Espacial',
    crewSize: 'Tamaño de Tripulación',
    passengerCapacity: 'Capacidad de Pasajeros',
    cargoSpace: 'Espacio de Carga',
    consumableSupply: 'Suministro de Consumibles',
  },

  // Clases y categorías de naves espaciales
  classes: {
    fighter: 'Caza',
    transport: 'Transporte',
    cruiser: 'Crucero',
    destroyer: 'Destructor',
    frigate: 'Fragata',
    corvette: 'Corbeta',
    dreadnought: 'Acorazado',
    battleship: 'Nave de Guerra',
    carrier: 'Portanaves',
    unknown: 'Clase Desconocida',
  },

  // Formato de costo y valor
  cost: {
    expensive: 'Alto Valor',
    moderate: 'Costo Moderado',
    affordable: 'Asequible',
    priceless: 'Invaluable',
    unknown: 'Costo Desconocido',
    credits: 'Créditos',
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
