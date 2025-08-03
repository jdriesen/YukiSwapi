<template>
  <q-footer elevated class="bg-grey-8 text-white footer-compact">
    <q-toolbar class="footer-toolbar">
      <div class="copyright-text">©2025 Johnny Driesen</div>
      <q-space />
      <div class="version-text">{{ fullVersion }}</div>
    </q-toolbar>
  </q-footer>
</template>

<script setup lang="ts">
// import { useQuasar } from 'quasar'
import { useAppInfo } from '~/composables/useAppInfo'

// const $q = useQuasar()
// const quasarVersion = $q.version
const { fullVersion } = useAppInfo()
</script>

<style scoped>
.footer-compact {
  min-height: 32px;
}

.footer-toolbar {
  min-height: 32px;
  padding: 0 12px;
}

.copyright-text,
.version-text {
  font-size: 0.8rem;
}

.version-text {
  opacity: 0.8;
}
</style>
