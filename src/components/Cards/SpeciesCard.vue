<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <CardTitle
        :title="species.name"
        :subtitle="t('species.labels.speciesDetails')"
        :icon="getResourceIcon('species')"
        :icon-color="getResourceColor('species')" />

      <div class="q-gutter-xs">
        <div class="row">
          <div class="col-4">
            <CardItem
              icon-name="category"
              icon-color="orange"
              :field-name="t('species.fields.classification')"
              :field-value="species.classification" />
          </div>
          <div class="col-4">
            <CardItem
              icon-name="psychology"
              icon-color="purple"
              :field-name="t('species.fields.designation')"
              :field-value="species.designation" />
          </div>
          <div class="col-4">
            <CardItem
              icon-name="height"
              icon-color="blue"
              :field-name="t('species.fields.average_height')"
              :field-value="formatHeight(species.average_height)" />
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <CardItem
              icon-name="schedule"
              icon-color="green"
              :field-name="t('species.fields.average_lifespan')"
              :field-value="formatLifespan(species.average_lifespan)" />
          </div>

          <div class="col-4">
            <CardItem
              icon-name="translate"
              icon-color="indigo"
              :field-name="t('species.fields.language')"
              :field-value="species.language" />
          </div>
        </div>

        <!-- Physical Characteristics -->
        <div class="q-mt-lg">
          <q-item-label class="text-weight-medium q-mb-sm">{{ t('species.labels.physicalCharacteristics') }}</q-item-label>

          <div class="row q-gutter-md">
            <div class="row">
              <div class="col-4">
                <CardItem
                  icon-name="palette"
                  icon-color="pink"
                  :field-name="t('species.fields.skin_colors')"
                  :field-value="species.skin_colors" />
              </div>
              <div class="col-4">
                <CardItem
                  icon-name="face"
                  icon-color="brown"
                  :field-name="t('species.fields.hair_colors')"
                  :field-value="species.hair_colors" />
              </div>

              <div class="col-4">
                <CardItem
                  icon-name="visibility"
                  icon-color="cyan"
                  :field-name="t('species.fields.eye_colors')"
                  :field-value="species.eye_colors" />
              </div>
            </div>
          </div>
        </div>

        <!-- Homeworld -->
        <div v-if="species.homeworld" class="q-mt-lg"></div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CardItem from './CardItem.vue'
import { getResourceIcon, getResourceColor } from '~/config/resource-icons'

import type { Species } from '~/types'

/**
 * SpeciesCard Component
 * Displays detailed information about a Star Wars species
 * Extracted from SpeciesDetailPage for better modularity and reusability
 * Now with full i18n support using the species translations
 */

interface Props {
  species: Species
}

defineProps<Props>()

// Initialize i18n
const { t } = useI18n()

/**
 * Format height value for display with i18n support
 * @param height - Height string from SWAPI
 * @returns Formatted height string with cm unit
 */
const formatHeight = (height: string): string => {
  if (height === 'n/a' || height === 'unknown') return t('species.units.unknown')
  return t('species.units.heightFormat', { value: height })
}

/**
 * Format lifespan value for display with i18n support
 * @param lifespan - Lifespan string from SWAPI
 * @returns Formatted lifespan string with special handling for indefinite
 */
const formatLifespan = (lifespan: string): string => {
  if (lifespan === 'n/a' || lifespan === 'unknown') return t('species.units.unknown')
  if (lifespan === 'indefinite') return t('species.units.indefinite')
  return t('species.units.lifespanFormat', { value: lifespan })
}
</script>

<style lang="scss" scoped></style>
