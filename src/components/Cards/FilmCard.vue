<template>
  <q-card class="q-pa-sm">
    <q-card-section>
      <CardTitle
        :title="film.title"
        :subtitle="formatEpisode(film.episode_id)"
        :icon="getResourceIcon('films')"
        :icon-color="getResourceColor('films')" />

      <div class="q-gutter-xs">
        <div class="row">
          <div class="col-6">
            <CardItem icon-name="person" icon-color="blue" :field-name="t('films.fields.director')" :field-value="film.director" />
          </div>
          <div class="col-6">
            <CardItem icon-name="business" icon-color="green" :field-name="t('films.fields.producer')" :field-value="film.producer" />
          </div>
        </div>

        <CardItem
          icon-name="event"
          icon-color="purple"
          :field-name="t('films.fields.release_date')"
          :field-value="formatReleaseDate(film.release_date)" />

        <!-- Opening Crawl -->
        <div class="q-mt-lg">
          <q-item-label class="text-weight-medium q-mb-sm">{{ t('films.labels.openingCrawlTitle') }}</q-item-label>
          <q-card flat bordered class="q-pa-md bg-grey-1">
            <div class="opening-crawl">
              {{ film.opening_crawl }}
            </div>
          </q-card>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getResourceIcon, getResourceColor } from '~/config/resource-icons'
import type { Film } from '~/types'

/**
 * FilmCard Component
 * Displays detailed information about a Star Wars film
 * Extracted from FilmsDetailPage for better modularity and reusability
 * Now with full i18n support using the films translations
 */

interface Props {
  film: Film
}

defineProps<Props>()

// Initialize i18n
const { t } = useI18n()

/**
 * Format episode ID to Roman numerals with i18n support
 * @param episodeId - Episode ID number from SWAPI
 * @returns Formatted episode string with Roman numerals
 */
const formatEpisode = (episodeId: number): string => {
  const romanNumerals = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX']
  const roman = romanNumerals[episodeId] || episodeId.toString()
  return t('films.labels.episodeRoman', { roman })
}

/**
 * Format release date for display with i18n support
 * @param dateString - Date string from SWAPI
 * @returns Formatted date string
 */
const formatReleaseDate = (dateString: string): string => {
  const date = new Date(dateString)
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  return t('films.formatting.releaseDate', { date: formattedDate })
}
</script>

<style lang="scss" scoped></style>
