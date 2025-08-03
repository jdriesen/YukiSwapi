<template>
  <div class="language-selector">
    <q-btn-dropdown flat no-caps :label="currentLanguage" color="white" class="language-dropdown-btn">
      <q-list>
        <q-item
          v-for="lang in availableLanguages"
          :key="lang"
          clickable
          v-close-popup
          @click="setLanguage(lang)"
          :active="currentLanguage === lang">
          <q-item-section>
            <q-item-label>{{ languageLabels[lang] }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from '~/composables/useI18n'
// import { computed } from 'vue'

// Use our custom i18n composable
const { currentLanguage, setLanguage, getAvailableLanguages } = useI18n()

// Get available languages
const availableLanguages = getAvailableLanguages()

// Language display labels
const languageLabels: Record<string, string> = {
  EN: 'English',
  NL: 'Nederlands',
  ES: 'Español',
}
</script>

<style lang="scss" scoped>
.language-selector {
  display: flex;
  align-items: center;

  .language-dropdown-btn {
    font-weight: 500;
    min-height: unset;
    line-height: 1;
    padding: 5px;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
