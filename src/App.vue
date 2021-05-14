<template>
  <v-app>
    <c-app-bar></c-app-bar>

    <v-content>
      <v-container class="v-container" fluid>
        <c-file-input v-model="files" @send="handleFileInput"></c-file-input>

        <div class="pills">
          <c-pill
            v-for="word in words"
            :key="word.name"
            :name="word.name"
            :amount="word.amount"
          ></c-pill>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import { ipcRenderer } from "electron";

import Pill from "@/components/Pill";
import AppBar from "@/components/AppBar";
import FileInput from "@/components/FileInput";

import { Observable } from 'rxjs';

export default {
  name: "App",
  components: {
    "c-pill": Pill,
    "c-app-bar": AppBar,
    "c-file-input": FileInput
  },
  data: () => ({
    files: [],
    words: []
  }),
  methods: {
    handleFileInput() {
      const paths = this.files.map(file => file.path);

      ipcRenderer.send("process-subtitles", paths);
      ipcRenderer.on("process-subtitles", (event, words) => {
        this.words = words;
      });
      
    }
  }
};

</script>

<style lang="css">
:root {
  --primary: #f1fa8c;
  --secondary: #282a36;
}

html {
  overflow-y: hidden !important;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background-color: #eee;
}

::-webkit-scrollbar-thumb {
  background-color: #Ffffff;
}

.v-container {
  overflow-y: auto;
  max-height: calc(100vh - 48px); /* total app height - appbar */
}

.pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
