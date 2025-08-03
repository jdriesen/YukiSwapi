<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <CardTitle
        :title="starship.name"
        :subtitle="t('starships.labels.starshipDetails')"
        :icon="getResourceIcon('starships')"
        :icon-color="getResourceColor('starships')" />

      <div class="q-gutter-xs">
        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="precision_manufacturing"
              icon-color="blue"
              :field-name="t('starships.fields.model')"
              :field-value="starship.model" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="business"
              icon-color="green"
              :field-name="t('starships.fields.manufacturer')"
              :field-value="starship.manufacturer" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="category"
              icon-color="blue"
              :field-name="t('starships.fields.starship_class')"
              :field-value="starship.starship_class" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="straighten"
              icon-color="purple"
              :field-name="t('starships.fields.length')"
              :field-value="formatLength(starship.length)" />
          </div>
        </div>

        <!-- Space-Specific Details -->
        <div class="q-my-lg">
          <q-item-label class="text-weight-medium q-mb-sm">{{ t('starships.labels.spaceTravelSpecs') }}</q-item-label>

          <div class="row">
            <div class="col-6">
              <CardItem
                icon-name="flash_on"
                icon-color="amber"
                :field-name="t('starships.fields.hyperdrive_rating')"
                :field-value="formatHyperdrive(starship.hyperdrive_rating)" />
            </div>
            <div class="col-6">
              <CardItem
                icon-name="speed"
                icon-color="orange"
                :field-name="t('starships.fields.MGLT')"
                :field-value="formatMGLT(starship.MGLT)" />
            </div>
          </div>

          <!----- -->
          <div class="row">
            <div class="col-6">
              <CardItem
                icon-name="air"
                icon-color="cyan"
                :field-name="t('starships.fields.max_atmosphering_speed')"
                :field-value="formatSpeed(starship.max_atmosphering_speed)" />
            </div>
            <div class="col-6">
              <CardItem
                icon-name="attach_money"
                icon-color="amber"
                :field-name="t('starships.fields.cost_in_credits')"
                :field-value="formatCost(starship.cost_in_credits)" />
            </div>
          </div>
          <!----- -->
        </div>

        <!-- Operational Details -->
        <div class="q-my-lg">
          <q-item-label class="text-weight-medium q-mb-sm">{{ t('starships.labels.operationalDetails') }}</q-item-label>

          <div class="row">
            <div class="col-6">
              <CardItem
                icon-name="group"
                icon-color="indigo"
                :field-name="t('starships.fields.crew')"
                :field-value="formatCrew(starship.crew)" />
            </div>
            <div class="col-6">
              <CardItem
                icon-name="airline_seat_recline_normal"
                icon-color="teal"
                :field-name="t('starships.fields.passengers')"
                :field-value="formatPassengers(starship.passengers)" />
            </div>
          </div>

          <!----- -->
          <div class="row">
            <div class="col-6">
              <CardItem
                icon-name="inventory"
                icon-color="brown"
                :field-name="t('starships.fields.cargo_capacity')"
                :field-value="formatCargo(starship.cargo_capacity)" />
            </div>
            <div class="col-6">
              <CardItem
                icon-name="schedule"
                icon-color="pink"
                :field-name="t('starships.fields.consumables')"
                :field-value="formatConsumables(starship.consumables)" />
            </div>
          </div>
          <!----- -->
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getResourceIcon, getResourceColor } from '~/config/resource-icons'
import type { Starship } from '~/types'

/**
 * StarshipCard Component
 * Displays detailed information about a Star Wars starship
 * Extracted from StarshipsDetailPage for better modularity and reusability
 * Now with full i18n support using the starships translations
 */

interface Props {
  starship: Starship
}

defineProps<Props>()

// Initialize i18n
const { t } = useI18n()

/**
 * Format length value for display with i18n support
 * @param length - Length string from SWAPI
 * @returns Formatted length string with meters unit
 */
const formatLength = (length: string): string => {
  if (length === 'n/a' || length === 'unknown') return t('starships.units.unknown')
  return t('starships.units.lengthFormat', { value: length })
}

/**
 * Format hyperdrive rating for display with i18n support
 * @param rating - Hyperdrive rating string from SWAPI
 * @returns Formatted hyperdrive rating as "Class X"
 */
const formatHyperdrive = (rating: string): string => {
  if (rating === 'n/a' || rating === 'unknown') return t('starships.units.unknown')
  return t('starships.units.hyperdriveClass', { rating })
}

/**
 * Format MGLT value for display with i18n support
 * @param mglt - MGLT string from SWAPI
 * @returns Formatted MGLT string with unit
 */
const formatMGLT = (mglt: string): string => {
  if (mglt === 'n/a' || mglt === 'unknown') return t('starships.units.unknown')
  return t('starships.units.mgltFormat', { value: mglt })
}

/**
 * Format speed value for display with i18n support
 * @param speed - Speed string from SWAPI
 * @returns Formatted speed string with km/h unit
 */
const formatSpeed = (speed: string): string => {
  if (speed === 'n/a' || speed === 'unknown') return t('starships.units.unknown')
  return t('starships.units.speedFormat', { value: speed })
}

/**
 * Format crew value for display with i18n support
 * @param crew - Crew string from SWAPI
 * @returns Formatted crew string
 */
const formatCrew = (crew: string): string => {
  if (crew === 'n/a' || crew === 'unknown') return t('starships.units.unknown')
  return crew
}

/**
 * Format passengers value for display with i18n support
 * @param passengers - Passengers string from SWAPI
 * @returns Formatted passengers string
 */
const formatPassengers = (passengers: string): string => {
  if (passengers === 'n/a' || passengers === 'unknown') return t('starships.units.unknown')
  return passengers
}

/**
 * Format cargo capacity for display with i18n support
 * @param cargo - Cargo capacity string from SWAPI
 * @returns Formatted cargo string with kg unit
 */
const formatCargo = (cargo: string): string => {
  if (cargo === 'n/a' || cargo === 'unknown') return t('starships.units.unknown')
  return t('starships.units.cargoFormat', { value: cargo })
}

/**
 * Format consumables value for display with i18n support
 * @param consumables - Consumables string from SWAPI
 * @returns Formatted consumables string
 */
const formatConsumables = (consumables: string): string => {
  if (consumables === 'n/a' || consumables === 'unknown') return t('starships.units.unknown')
  return consumables
}

/**
 * Format cost value for display with i18n support
 * @param cost - Cost string from SWAPI
 * @returns Formatted cost string with locale formatting and credits unit
 */
const formatCost = (cost: string): string => {
  if (cost === 'n/a' || cost === 'unknown') return t('starships.cost.unknown')
  const numCost = parseInt(cost, 10)
  if (isNaN(numCost)) return cost
  return t('starships.units.creditsFormat', { value: numCost.toLocaleString() })
}
</script>

<style lang="scss" scoped></style>
