<template>
  <q-page class="q-pa-xs">
  <q-card flat bordered>
    <q-card-section class="q-pa-xs">
      <div class="text-right">
        <q-btn color="primary" label="Generar CUI" icon="add" no-caps @click="generarCUI" />
      </div>
    </q-card-section>
  </q-card>
  </q-page>
</template>
<script>
export default {
  name: 'ImpuestosPage',
  data() {
    return {
    }
  },
  methods: {
    generarCUI() {
      this.$axios.post('impuestos/generar-cui').then(response => {
        this.$q.notify({
          type: 'positive',
          message: 'CUI generado correctamente'
        });
      }).catch(error => {
        this.$q.notify({
          type: 'negative',
          message: error.response.data.message || 'Error al generar CUI'
        });
      });
    }
  }
}
</script>
