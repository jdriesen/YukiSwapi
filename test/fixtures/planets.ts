/**
 * Planet Test Fixtures
 * Mock data for testing planet-related functionality
 */

import type { Planet, PlanetsResponse } from '~/types'

/**
 * Base API URL - always use the working SWAPI alternative
 */
const API_BASE_URL = 'https://swapi-api.hbtn.io/api'

/**
 * Build a complete API URL for a specific resource
 */
const buildApiUrl = (endpoint: string, id?: number): string => {
  return id ? `${API_BASE_URL}/${endpoint}/${id}/` : `${API_BASE_URL}/${endpoint}/`
}

/**
 * Build URLs for related resources (residents, films)
 */
const buildResourceUrls = (endpoint: string, ids: number[]): string[] => {
  return ids.map((id) => buildApiUrl(endpoint, id))
}

/**
 * Mock planet data based on Tatooine from SWAPI
 */
export const mockPlanet: Planet = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  surface_water: '1',
  population: '200000',
  residents: buildResourceUrls('people', [1, 2, 4, 6, 7, 8, 9, 11, 43, 62]),
  films: buildResourceUrls('films', [1, 3, 4, 5, 6]),
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  url: buildApiUrl('planets', 1),
}

/**
 * Additional mock planets for testing variety
 */
export const mockPlanetAlderaan: Planet = {
  name: 'Alderaan',
  rotation_period: '24',
  orbital_period: '364',
  diameter: '12500',
  climate: 'temperate',
  gravity: '1 standard',
  terrain: 'grasslands, mountains',
  surface_water: '40',
  population: '2000000000',
  residents: buildResourceUrls('people', [5, 68]),
  films: buildResourceUrls('films', [1, 6]),
  created: '2014-12-10T11:35:48.479000Z',
  edited: '2014-12-20T20:58:18.420000Z',
  url: buildApiUrl('planets', 2),
}

export const mockPlanetYavin: Planet = {
  name: 'Yavin IV',
  rotation_period: '24',
  orbital_period: '4818',
  diameter: '10200',
  climate: 'temperate, tropical',
  gravity: '1 standard',
  terrain: 'jungle, rainforests',
  surface_water: '8',
  population: '1000',
  residents: [],
  films: buildResourceUrls('films', [1]),
  created: '2014-12-10T11:37:19.144000Z',
  edited: '2014-12-20T20:58:18.421000Z',
  url: buildApiUrl('planets', 3),
}

/**
 * Mock planet with unknown values for testing edge cases
 */
export const mockPlanetUnknown: Planet = {
  name: 'Unknown Planet',
  rotation_period: 'unknown',
  orbital_period: 'unknown',
  diameter: 'unknown',
  climate: 'unknown',
  gravity: 'unknown',
  terrain: 'unknown',
  surface_water: 'unknown',
  population: 'unknown',
  residents: [],
  films: [],
  created: '2014-12-10T11:37:19.144000Z',
  edited: '2014-12-20T20:58:18.421000Z',
  url: buildApiUrl('planets', 999),
}

/**
 * Mock planets response for list endpoints
 */
export const mockPlanetsResponse: PlanetsResponse = {
  count: 60,
  next: buildApiUrl('planets') + '?page=2',
  previous: null,
  results: [mockPlanet, mockPlanetAlderaan, mockPlanetYavin],
}

/**
 * Mock empty planets response
 */
export const mockEmptyPlanetsResponse: PlanetsResponse = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

/**
 * Mock error response for 404 scenarios
 */
export const mockPlanetNotFound = {
  detail: 'Not found.',
}

/**
 * Mock error response for server errors
 */
export const mockServerError = {
  detail: 'Internal server error',
}

/**
 * Helper function to create a mock planet with custom properties
 */
export const createMockPlanet = (overrides: Partial<Planet> = {}): Planet => ({
  ...mockPlanet,
  ...overrides,
})

/**
 * Helper function to create a mock planets response with custom data
 */
export const createMockPlanetsResponse = (
  planets: Planet[] = [mockPlanet],
  count: number = planets.length,
  next: string | null = null,
  previous: string | null = null,
): PlanetsResponse => ({
  count,
  next,
  previous,
  results: planets,
})

/**
 * Test data sets for different scenarios
 */
export const testScenarios = {
  // Single planet scenarios
  singlePlanet: mockPlanet,
  planetWithUnknownValues: mockPlanetUnknown,

  // Multiple planets scenarios
  multiplePlanets: [mockPlanet, mockPlanetAlderaan, mockPlanetYavin],
  emptyPlanets: [],

  // Response scenarios
  successResponse: mockPlanetsResponse,
  emptyResponse: mockEmptyPlanetsResponse,

  // Error scenarios
  notFoundError: mockPlanetNotFound,
  serverError: mockServerError,
}
