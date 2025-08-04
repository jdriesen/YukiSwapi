<template>
  <q-card class="" flat bordered>
    <q-card-section>
      <CardTitle
        :title="vehicle.name"
        :subtitle="t('vehicles.labels.vehicleDetails')"
        :icon="getResourceIcon('vehicles')"
        :icon-color="getResourceColor('vehicles')" />

      <div class="q-gutter-xs">
        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="precision_manufacturing"
              icon-color="blue"
              :field-name="t('vehicles.fields.model')"
              :field-value="vehicle.model" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="business"
              icon-color="green"
              :field-name="t('vehicles.fields.manufacturer')"
              :field-value="vehicle.manufacturer" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="category"
              icon-color="red"
              :field-name="t('vehicles.fields.vehicle_class')"
              :field-value="vehicle.vehicle_class" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="straighten"
              icon-color="purple"
              :field-name="t('vehicles.fields.length')"
              :field-value="formatLength(vehicle.length)" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="speed"
              icon-color="orange"
              :field-name="t('vehicles.fields.max_atmosphering_speed')"
              :field-value="formatSpeed(vehicle.max_atmosphering_speed)" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="attach_money"
              icon-color="amber"
              :field-name="t('vehicles.fields.cost_in_credits')"
              :field-value="formatCost(vehicle.cost_in_credits)" />
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions>
      <q-space />

      <q-btn color="grey" round flat dense :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" @click="expanded = !expanded" />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subtitle2">
          <!-- Operational Details -->
          <div class="q-mt-sm">
            <q-item-label class="text-weight-medium q-mt-sm q-mb-sm">{{ t('vehicles.labels.operationalDetails') }}</q-item-label>

            <div class="q-gutter-sm">
              <div class="row">
                <div class="col-6">
                  <CardItem
                    icon-name="group"
                    icon-color="indigo"
                    :field-name="t('vehicles.fields.crew')"
                    :field-value="formatCrew(vehicle.crew)" />
                </div>
                <div class="col-6">
                  <CardItem
                    icon-name="airline_seat_recline_normal"
                    icon-color="teal"
                    :field-name="t('vehicles.fields.passengers')"
                    :field-value="formatPassengers(vehicle.passengers)" />
                </div>
              </div>

              <div class="row">
                <div class="col-6">
                  <CardItem
                    icon-name="inventory"
                    icon-color="brown"
                    :field-name="t('vehicles.fields.cargo_capacity')"
                    :field-value="formatCargo(vehicle.cargo_capacity)" />
                </div>
                <div class="col-6">
                  <CardItem
                    icon-name="schedule"
                    icon-color="pink"
                    :field-name="t('vehicles.fields.consumables')"
                    :field-value="formatConsumables(vehicle.consumables)" />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getResourceIcon, getResourceColor } from '~/config/resource-icons'
import type { Vehicle } from '~/types'

/**
 * VehicleCard Component
 * Displays detailed information about a Star Wars vehicle
 * Extracted from VehiclesDetailPage for better modularity and reusability
 * Now with full i18n support using the vehicles translations
 */

interface Props {
  vehicle: Vehicle
}

defineProps<Props>()

// Initialize i18n
const { t } = useI18n()

const expanded = ref(false)
// const lorem = ref('Lorem ipsum dolor sit ameta commodo consequat.')

/**
 * Format length value for display with i18n support
 * @param length - Length string from SWAPI
 * @returns Formatted length string with meters unit
 */
const formatLength = (length: string): string => {
  if (length === 'n/a' || length === 'unknown') return t('vehicles.units.unknown')
  return t('vehicles.units.lengthFormat', { value: length })
}

/**
 * Format speed value for display with i18n support
 * @param speed - Speed string from SWAPI
 * @returns Formatted speed string with km/h unit
 */
const formatSpeed = (speed: string): string => {
  if (speed === 'n/a' || speed === 'unknown') return t('vehicles.units.unknown')
  return t('vehicles.units.speedFormat', { value: speed })
}

/**
 * Format crew value for display with i18n support
 * @param crew - Crew string from SWAPI
 * @returns Formatted crew string
 */
const formatCrew = (crew: string): string => {
  if (crew === 'n/a' || crew === 'unknown') return t('vehicles.units.unknown')
  return crew
}

/**
 * Format passengers value for display with i18n support
 * @param passengers - Passengers string from SWAPI
 * @returns Formatted passengers string
 */
const formatPassengers = (passengers: string): string => {
  if (passengers === 'n/a' || passengers === 'unknown') return t('vehicles.units.unknown')
  return passengers
}

/**
 * Format cargo capacity for display with i18n support
 * @param cargo - Cargo capacity string from SWAPI
 * @returns Formatted cargo string with kg unit
 */
const formatCargo = (cargo: string): string => {
  if (cargo === 'n/a' || cargo === 'unknown') return t('vehicles.units.unknown')
  return t('vehicles.units.cargoFormat', { value: cargo })
}

/**
 * Format consumables value for display with i18n support
 * @param consumables - Consumables string from SWAPI
 * @returns Formatted consumables string
 */
const formatConsumables = (consumables: string): string => {
  if (consumables === 'n/a' || consumables === 'unknown') return t('vehicles.units.unknown')
  return consumables
}

/**
 * Format cost value for display with i18n support
 * @param cost - Cost string from SWAPI
 * @returns Formatted cost string with locale formatting and credits unit
 */
const formatCost = (cost: string): string => {
  if (cost === 'n/a' || cost === 'unknown') return t('vehicles.cost.unknown')
  const numCost = parseInt(cost, 10)
  if (isNaN(numCost)) return cost
  return t('vehicles.units.creditsFormat', { value: numCost.toLocaleString() })
}
</script>

<style lang="scss" scoped></style>
