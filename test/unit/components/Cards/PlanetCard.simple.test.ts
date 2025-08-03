/**
 * Simple PlanetCard Component Test
 * Basic test focusing on core planet display functionality
 */

import { describe, it, expect, vi } from 'vitest'
import PlanetCard from '~/components/Cards/PlanetCard.vue'
import { mountComponent } from '../../../helpers/mount-factory'
import type { Planet } from '~/types'

// Mock the resource icons functions
vi.mock('~/config/resource-icons', () => ({
  getResourceIcon: vi.fn(() => 'public'),
  getResourceColor: vi.fn(() => 'green'),
}))

// Simple mock planet data
const mockPlanet: Planet = {
  name: 'Tatooine',
  climate: 'arid',
  terrain: 'desert',
  population: '200000',
  diameter: '10465',
  gravity: '1 standard',
  surface_water: '1',
  rotation_period: '23',
  orbital_period: '304',
  residents: [],
  films: [],
  created: '2014-12-09T13:50:49.641000Z',
  edited: '2014-12-20T20:58:18.411000Z',
  url: 'https://swapi.dev/api/planets/1/',
}

// Mock planet with unknown values
const mockPlanetUnknown: Planet = {
  ...mockPlanet,
  name: 'Unknown Planet',
  population: 'unknown',
  diameter: 'unknown',
  surface_water: 'unknown',
}

describe('PlanetCard - Simple Tests', () => {
  it('renders the planet card component', () => {
    const wrapper = mountComponent(PlanetCard, {
      props: { planet: mockPlanet },
    })

    expect(wrapper.find('.q-card').exists()).toBe(true)
  })

  it('displays the planet name', () => {
    const wrapper = mountComponent(PlanetCard, {
      props: { planet: mockPlanet },
    })

    expect(wrapper.text()).toContain('Tatooine')
  })

  it('displays basic planet properties', () => {
    const wrapper = mountComponent(PlanetCard, {
      props: { planet: mockPlanet },
    })

    const cardText = wrapper.text()
    expect(cardText).toContain('arid') // climate
    expect(cardText).toContain('desert') // terrain
    expect(cardText).toContain('1 standard') // gravity
  })

  it('handles unknown values gracefully', () => {
    const wrapper = mountComponent(PlanetCard, {
      props: { planet: mockPlanetUnknown },
    })

    const cardText = wrapper.text()
    expect(cardText).toContain('Unknown Planet')
    // Component should still render without errors
    expect(wrapper.find('.q-card').exists()).toBe(true)
  })
})
