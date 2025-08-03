import type { RouteRecordRaw } from 'vue-router'

/**
 * Centralized route names constants
 * This prevents typos and makes route names reusable across the application
 */
export const ROUTE_NAMES = {
  HOME: 'home',
  PEOPLE: 'people',
  PEOPLE_DETAIL: 'personDetail',
  PLANETS: 'planets',
  PLANETS_DETAIL: 'planetDetail',
  FILMS: 'films',
  FILMS_DETAIL: 'filmDetail',
  SPECIES: 'species',
  SPECIES_DETAIL: 'speciesDetail',
  VEHICLES: 'vehicles',
  VEHICLES_DETAIL: 'vehicleDetail',
  STARSHIPS: 'starships',
  STARSHIPS_DETAIL: 'starshipDetail',
  NOT_FOUND: 'notFound',
} as const

/**
 * Type for route names to ensure type safety
 */
export type RouteNameType = (typeof ROUTE_NAMES)[keyof typeof ROUTE_NAMES]

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: ROUTE_NAMES.HOME,
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/people',
        name: ROUTE_NAMES.PEOPLE,
        component: () => import('pages/PeoplePage.vue'),
      },
      {
        path: '/people/:id',
        name: ROUTE_NAMES.PEOPLE_DETAIL,
        component: () => import('pages/PeopleDetailPage.vue'),
        props: true,
      },
      {
        path: '/planets',
        name: ROUTE_NAMES.PLANETS,
        component: () => import('pages/PlanetsPage.vue'),
      },
      {
        path: '/planets/:id',
        name: ROUTE_NAMES.PLANETS_DETAIL,
        component: () => import('pages/PlanetsDetailPage.vue'),
        props: true,
      },
      {
        path: '/films',
        name: ROUTE_NAMES.FILMS,
        component: () => import('pages/FilmsPage.vue'),
      },
      {
        path: '/films/:id',
        name: ROUTE_NAMES.FILMS_DETAIL,
        component: () => import('pages/FilmsDetailPage.vue'),
        props: true,
      },
      {
        path: '/species',
        name: ROUTE_NAMES.SPECIES,
        component: () => import('pages/SpeciesPage.vue'),
      },
      {
        path: '/species/:id',
        name: ROUTE_NAMES.SPECIES_DETAIL,
        component: () => import('pages/SpeciesDetailPage.vue'),
        props: true,
      },
      {
        path: '/vehicles',
        name: ROUTE_NAMES.VEHICLES,
        component: () => import('pages/VehiclesPage.vue'),
      },
      {
        path: '/vehicles/:id',
        name: ROUTE_NAMES.VEHICLES_DETAIL,
        component: () => import('pages/VehiclesDetailPage.vue'),
        props: true,
      },
      {
        path: '/starships',
        name: ROUTE_NAMES.STARSHIPS,
        component: () => import('pages/StarshipsPage.vue'),
      },
      {
        path: '/starships/:id',
        name: ROUTE_NAMES.STARSHIPS_DETAIL,
        component: () => import('pages/StarshipsDetailPage.vue'),
        props: true,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
