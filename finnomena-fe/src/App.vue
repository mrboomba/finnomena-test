<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="./assets/logo-finnomena.png"
        transition="scale-transition"
        width="150"
        height="50"
      />
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main class="body-bg">
      <FundRanking class="ma-15"/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import FundRanking from "./components/FundRanking.vue";

export default Vue.extend({
  name: "App",
  components: {
    FundRanking,
  },
});
</script>
<style>
.body-bg {
  background-color: #EEEEEE;
}
</style>
