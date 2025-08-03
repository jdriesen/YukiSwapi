// Traducciones de vehículos en español

export default {
  title: 'Vehículos',
  entityName: 'Vehículo',
  entityNamePlural: 'Vehículos',

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
    vehicle_class: 'Clase de Vehículo',
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
    created: '{entity} creado exitosamente',
    updated: '{entity} actualizado exitosamente',
    deleted: '{entity} eliminado exitosamente',
    confirmDelete: '¿Está seguro de que desea eliminar este {entity}?',
  },

  // Etiquetas y secciones específicas de vehículos
  labels: {
    vehicleDetails: 'Detalles del Vehículo',
    operationalDetails: 'Detalles Operacionales',
    technicalSpecs: 'Especificaciones Técnicas',
    costInformation: 'Información de Costo',
    performanceData: 'Datos de Rendimiento',
    capacityInfo: 'Información de Capacidad',
    pilotsCount: '{count} Pilotos',
    filmsCount: '{count} Películas',
  },

  // Unidades y medidas
  units: {
    length: 'm',
    speed: 'km/h',
    cargo: 'kg',
    credits: 'créditos',
    lengthFormat: '{value} m',
    speedFormat: '{value} km/h',
    cargoFormat: '{value} kg',
    creditsFormat: '{value} créditos',
    unknown: 'Desconocido',
    notApplicable: 'N/A',
  },

  // Clases y categorías de vehículos
  classes: {
    speeder: 'Speeder',
    walker: 'Caminante',
    airspeeder: 'Aerodeslizador',
    landspeeder: 'Deslizador Terrestre',
    transport: 'Transporte',
    assault: 'Vehículo de Asalto',
    tank: 'Tanque',
    repulsorcraft: 'Nave Repulsora',
    wheeled: 'Vehículo con Ruedas',
    sail: 'Barcaza de Vela',
    unknown: 'Clase Desconocida',
  },

  // Especificaciones técnicas
  technical: {
    atmosphericSpeed: 'Velocidad Atmosférica',
    groundSpeed: 'Velocidad Terrestre',
    crewSize: 'Tamaño de Tripulación',
    passengerCapacity: 'Capacidad de Pasajeros',
    cargoSpace: 'Espacio de Carga',
    consumableSupply: 'Suministro de Consumibles',
    vehicleType: 'Tipo de Vehículo',
  },

  // Términos operacionales
  operational: {
    crew: 'Tripulación',
    passengers: 'Pasajeros',
    cargo: 'Carga',
    consumables: 'Suministros',
    capacity: 'Capacidad',
    operations: 'Operaciones',
    performance: 'Rendimiento',
  },

  // Formato de costo y valor
  cost: {
    expensive: 'Alto Valor',
    moderate: 'Costo Moderado',
    affordable: 'Asequible',
    unknown: 'Costo Desconocido',
    credits: 'Créditos',
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
