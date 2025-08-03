import { BaseSwapiService } from './base-swapi.service'
import type { Vehicle, VehiclesResponse } from '~/types'

/**
 * Vehicles Service for handling SWAPI Vehicles API calls
 * Extends BaseSwapiService to eliminate code duplication
 * Provides methods for fetching vehicles data with proper error handling
 */
export class VehiclesService extends BaseSwapiService {
  /**
   * Fetch vehicles with pagination and optional search
   * @param page - Page number (1-based)
   * @param search - Optional search query
   * @returns Promise<VehiclesResponse>
   */
  static getVehicles = async (page: number = 1, search?: string): Promise<VehiclesResponse> =>
    BaseSwapiService.fetchResources<VehiclesResponse>('vehicles', page, search)

  /**
   * Fetch a specific vehicle by ID
   * @param id - Vehicle ID
   * @returns Promise<Vehicle>
   */
  static getVehicleById = async (id: number): Promise<Vehicle> => BaseSwapiService.fetchResourceById<Vehicle>('vehicles', id)
}
