<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <CardTitle
        :title="planet.name"
        :subtitle="t('planets.labels.planetDetails')"
        :icon="getResourceIcon('planets')"
        :icon-color="getResourceColor('planets')" />

      <div class="q-gutter-xs">
        <div class="row">
          <div class="col-6">
            <CardItem icon-name="thermostat" icon-color="orange" :field-name="t('planets.fields.climate')" :field-value="planet.climate" />
          </div>
          <div class="col-6">
            <CardItem icon-name="terrain" icon-color="brown" :field-name="t('planets.fields.terrain')" :field-value="planet.terrain" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="groups"
              icon-color="blue"
              :field-name="t('planets.fields.population')"
              :field-value="formatPopulation(planet.population)" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="straighten"
              icon-color="purple"
              :field-name="t('planets.fields.diameter')"
              :field-value="formatDiameter(planet.diameter)" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem icon-name="gravity" icon-color="red" :field-name="t('planets.fields.gravity')" :field-value="planet.gravity" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="water_drop"
              icon-color="cyan"
              :field-name="t('planets.fields.surface_water')"
              :field-value="formatSurfaceWater(planet.surface_water)" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="rotate_right"
              icon-color="green"
              :field-name="t('planets.fields.rotation_period')"
              :field-value="formatPeriod(planet.rotation_period, 'hours')" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="orbit"
              icon-color="indigo"
              :field-name="t('planets.fields.orbital_period')"
              :field-value="formatPeriod(planet.orbital_period, 'days')" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getResourceIcon, getResourceColor } from '~/config/resource-icons'
import type { Planet } from '~/types'

/**
 * PlanetCard Component
 * Displays detailed information about a Star Wars planet
 * Extracted from PlanetsDetailPage for better modularity and reusability
 * Now with full i18n support using the planets translations
 */

interface Props {
  planet: Planet
}

defineProps<Props>()

// Initialize i18n
const { t } = useI18n()

/**
 * Format population value for display with i18n support
 * @param population - Population string from SWAPI
 * @returns Formatted population string with locale formatting
 */
const formatPopulation = (population: string): string => {
  if (population === 'unknown') return t('planets.units.unknown')
  const num = parseInt(population, 10)
  if (isNaN(num)) return population
  return t('planets.units.populationFormat', { value: num.toLocaleString() })
}

/**
 * Format diameter value for display with i18n support
 * @param diameter - Diameter string from SWAPI
 * @returns Formatted diameter string with km unit
 */
const formatDiameter = (diameter: string): string => {
  if (diameter === 'unknown') return t('planets.units.unknown')
  return t('planets.units.diameterFormat', { value: diameter })
}

/**
 * Format surface water value for display with i18n support
 * @param surfaceWater - Surface water string from SWAPI
 * @returns Formatted surface water string with percentage
 */
const formatSurfaceWater = (surfaceWater: string): string => {
  if (surfaceWater === 'unknown') return t('planets.units.unknown')
  return t('planets.units.percentFormat', { value: surfaceWater })
}

/**
 * Format period value for display with i18n support
 * @param period - Period string from SWAPI
 * @param unit - Unit type ('hours' or 'days')
 * @returns Formatted period string with unit
 */
const formatPeriod = (period: string, unit: 'hours' | 'days'): string => {
  if (period === 'unknown') return t('planets.units.unknown')
  if (unit === 'hours') {
    return t('planets.units.hoursFormat', { value: period })
  } else {
    return t('planets.units.daysFormat', { value: period })
  }
}
</script>

<style lang="scss" scoped></style>
