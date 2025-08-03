/**
 * People Table Composable
 * Provides reusable people table functionality for detail pages
 * Eliminates code duplication and follows the same pattern as useFilmsTable
 */

import { ref, computed, onMounted, type Ref, type ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { usePeopleStore } from '~/stores/people.store'
import { PeopleService } from '~/services/people.service'
import { ROUTE_NAMES } from '~/router/routes'
import type { Person, PeopleResponse, TablePagination, QTableRequestProps } from '~/types'

/**
 * Configuration interface for the people table composable
 */
interface UsePeopleTableConfig {
  /** Reactive reference to the resource that contains people array */
  resourceRef: Ref<{ people: string[] } | null>
  /** Function to extract ID from URL (from useDetail composable) */
  getIdFromUrl: (url: string) => number
}

/**
 * Return type for the composable
 */
interface UsePeopleTableReturn {
  /** Reactive filter value for search */
  peopleFilter: Ref<string>
  /** Reactive pagination configuration */
  peoplePagination: ComputedRef<TablePagination>
  /** Filtered people based on resource and search */
  filteredPeople: ComputedRef<Person[]>
  /** Handle person row click navigation */
  handlePersonRowClick: (person: Person) => void
  /** Handle search filter changes */
  handlePeopleFilterChange: (newFilter: string) => void
  /** Handle table pagination/sorting requests */
  handlePeopleTableRequest: (requestProps: QTableRequestProps) => void
  /** People store reference for loading state */
  peopleStore: ReturnType<typeof usePeopleStore>
}

/**
 * Composable for managing people table functionality in detail pages
 * Provides all necessary state, computed properties, and event handlers
 * for displaying and interacting with people/residents related to a specific resource
 *
 * @param config Configuration object with resource reference and utility functions
 * @returns Object with reactive data and methods for people table
 */
export function usePeopleTable(config: UsePeopleTableConfig): UsePeopleTableReturn {
  const router = useRouter()
  const peopleStore = usePeopleStore()

  // People table state
  const peopleFilter = ref('')

  // Mutable pagination state
  const paginationState = ref({
    sortBy: 'name',
    descending: false,
    page: 1,
    rowsPerPage: 5, // Smaller for detail page
  })

  // Get people related to current resource
  const resourcePeople = computed(() => {
    if (!config.resourceRef.value || !peopleStore.items.length) return []

    const personIds = config.resourceRef.value.people.map((url: string) => config.getIdFromUrl(url))
    return peopleStore.items.filter((person) => personIds.includes(config.getIdFromUrl(person.url)))
  })

  // Apply local search filter to resource people
  const filteredPeople = computed(() => {
    if (!peopleFilter.value) return resourcePeople.value

    const searchTerm = peopleFilter.value.toLowerCase()
    return resourcePeople.value.filter(
      (person) =>
        person.name.toLowerCase().includes(searchTerm) ||
        person.gender.toLowerCase().includes(searchTerm) ||
        person.birth_year.toLowerCase().includes(searchTerm),
    )
  })

  // Apply local pagination to filtered people
  const paginatedPeople = computed(() => {
    const start = (paginationState.value.page - 1) * paginationState.value.rowsPerPage
    const end = start + paginationState.value.rowsPerPage
    return filteredPeople.value.slice(start, end)
  })

  // Reactive pagination that updates with filtered people count
  const peoplePagination = computed<TablePagination>(() => ({
    ...paginationState.value,
    rowsNumber: filteredPeople.value.length,
  }))

  // Handle people table events
  const handlePersonRowClick = (person: Person) => {
    const personId = config.getIdFromUrl(person.url)
    void router.push({ name: ROUTE_NAMES.PEOPLE_DETAIL, params: { id: personId } })
  }

  const handlePeopleFilterChange = (newFilter: string) => {
    peopleFilter.value = newFilter
  }

  const handlePeopleTableRequest = (requestProps: QTableRequestProps) => {
    // Update mutable pagination state (rowsNumber is handled by computed)
    paginationState.value = {
      sortBy: requestProps.pagination.sortBy,
      descending: requestProps.pagination.descending,
      page: requestProps.pagination.page,
      rowsPerPage: requestProps.pagination.rowsPerPage,
    }
  }

  /**
   * Load all people from all pages to ensure complete dataset
   * This fixes the issue where only page 1 (10 people) was loaded,
   * but films can reference characters from any page
   */
  const loadAllPeople = async (): Promise<void> => {
    let page = 1
    let hasMore = true
    let allPeople: Person[] = []

    while (hasMore) {
      try {
        const response = await PeopleService.getPeople(page)
        allPeople = [...allPeople, ...response.results]
        hasMore = response.next !== null
        page++
      } catch (error) {
        console.error(`Failed to load people page ${page}:`, error)
        break
      }
    }

    // Update store with all people
    if (allPeople.length > 0) {
      peopleStore.setItemsFromResponse({
        count: allPeople.length,
        next: null,
        previous: null,
        results: allPeople,
      } as PeopleResponse)
    }
  }

  // Load all people data when composable is used
  onMounted(async () => {
    if (peopleStore.items.length === 0) {
      await loadAllPeople()
    }
  })

  return {
    peopleFilter,
    peoplePagination,
    filteredPeople: paginatedPeople,
    handlePersonRowClick,
    handlePeopleFilterChange,
    handlePeopleTableRequest,
    peopleStore,
  }
}

/**
 * Type helper for creating properly typed people table configs
 */
export type CreatePeopleTableConfig = UsePeopleTableConfig
