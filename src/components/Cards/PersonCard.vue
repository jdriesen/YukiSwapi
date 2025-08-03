<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <CardTitle
        :title="person.name"
        :subtitle="t('people.labels.characterDetails')"
        :icon="getResourceIcon('people')"
        :icon-color="getResourceColor('people')" />

      <div class="q-gutter-xs">
        <div class="row">
          <div class="col-6">
            <CardItem icon-name="cake" icon-color="orange" :field-name="t('people.fields.birth_year')" :field-value="person.birth_year" />
          </div>
          <div class="col-6">
            <CardItem icon-name="wc" icon-color="purple" :field-name="t('people.fields.gender')" :field-value="person.gender" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="height"
              icon-color="blue"
              :field-name="t('people.fields.height')"
              :field-value="formatHeight(person.height)" />
          </div>
          <div class="col-6">
            <CardItem
              icon-name="fitness_center"
              icon-color="red"
              :field-name="t('people.fields.mass')"
              :field-value="formatMass(person.mass)" />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <CardItem
              icon-name="visibility"
              icon-color="green"
              :field-name="t('people.fields.eye_color')"
              :field-value="person.eye_color" />
          </div>
          <div class="col-6">
            <CardItem icon-name="face" icon-color="brown" :field-name="t('people.fields.hair_color')" :field-value="person.hair_color" />
          </div>
        </div>

        <CardItem icon-name="palette" icon-color="pink" :field-name="t('people.fields.skin_color')" :field-value="person.skin_color" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getResourceIcon, getResourceColor } from '~/config/resource-icons'
import type { Person } from '~/types'

/**
 * PersonCard Component
 * Displays detailed information about a Star Wars character
 * Extracted from PeopleDetailPage for better modularity and reusability
 * Now with full i18n support using the people translations
 */

interface Props {
  person: Person
}

defineProps<Props>()

// Initialize i18n
const { t } = useI18n()

/**
 * Format height value for display with i18n support
 * @param height - Height string from SWAPI
 * @returns Formatted height string
 */
const formatHeight = (height: string): string => {
  if (height === 'unknown') return t('people.units.unknown')
  return t('people.units.heightFormat', { value: height })
}

/**
 * Format mass value for display with i18n support
 * @param mass - Mass string from SWAPI
 * @returns Formatted mass string
 */
const formatMass = (mass: string): string => {
  if (mass === 'unknown') return t('people.units.unknown')
  return t('people.units.massFormat', { value: mass })
}
</script>

<style lang="scss" scoped></style>
