<template lang="html">
  <v-form class="c-file-input">
    <v-file-input
      label="Selecione o diretório onde contém as legendas"
      append-outer-icon="mdi-arrow-right-bold"
      outlined
      directory
      multiple
      webkitdirectory
      chips
      @change="$emit('input', $event)"
      @click:append-outer="$emit('send', $event)"
    ></v-file-input>
  </v-form>
</template>

<script>
export default {
  name: "FileInput"
};
</script>

<style lang="css"></style>
