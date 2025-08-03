import { createSwapiStore } from './base.store'
import { PeopleService } from '~/services/people.service'
import type { Person, PeopleResponse } from '~/types'

/**
 * Pinia store for managing SWAPI People data
 * Uses generic store factory to eliminate code duplication
 * Provides the same API as before: fetchItems, fetchItemById, etc.
 *
 * Usage in components:
 * - peopleStore.fetchItems(page, search) // was fetchPeople
 * - peopleStore.fetchItemById(id) // was fetchPersonById
 * - peopleStore.items // was people
 * - peopleStore.currentItem // was currentPerson
 * - peopleStore.isItemLoading // was isPersonLoading
 */
export const usePeopleStore = createSwapiStore<Person, PeopleResponse>({
  storeName: 'people',
  resourceName: 'people',
  fetchMany: (page, search) => PeopleService.getPeople(page, search),
  fetchOne: (id) => PeopleService.getPersonById(id),
  errorMessages: {
    fetchMany: 'Failed to fetch people',
    fetchOne: 'Failed to fetch person',
  },
})
