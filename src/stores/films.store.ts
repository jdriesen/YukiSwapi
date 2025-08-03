import { createSwapiStore } from './base.store'
import { FilmsService } from '~/services/films.service'
import type { Film, FilmsResponse } from '~/types'

/**
 * Pinia store for managing SWAPI Films data
 * Uses generic store factory to eliminate code duplication
 * Provides the same API as before: fetchItems, fetchItemById, etc.
 *
 * Usage in components:
 * - filmsStore.fetchItems(page, search) // was fetchFilms
 * - filmsStore.fetchItemById(id) // was fetchFilmById
 * - filmsStore.items // was films
 * - filmsStore.currentItem // was currentFilm
 * - filmsStore.isItemLoading // was isFilmLoading
 */
export const useFilmsStore = createSwapiStore<Film, FilmsResponse>({
  storeName: 'films',
  resourceName: 'films',
  fetchMany: (page, search) => FilmsService.getFilms(page, search),
  fetchOne: (id) => FilmsService.getFilmById(id),
  errorMessages: {
    fetchMany: 'Failed to fetch films',
    fetchOne: 'Failed to fetch film',
  },
})
