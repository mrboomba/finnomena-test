<template>
  <div>
    <v-col cols="12" class="py-2">
      <p>Choose time range</p>
      <v-btn-toggle
        v-model="range"
        tile
        color="yellow accent-4"
        group
      >
        <v-btn value="1D"> 1D </v-btn>
        <v-btn value="1M"> 1M </v-btn>
        <v-btn value="1W"> 1W </v-btn>
        <v-btn value="1Y"> 1Y </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-data-table :loading="isLoading" :headers="headers" :items="fundRanking" class="elevation-1">
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { FundRanking } from "../model/fundRanking.model";

export default Vue.extend({
  name: "FundRanking",
  data() {
    return {
      headers: [
        {
          text: "Name ",
          align: "left",
          sortable: false,
          value: "thailand_fund_code",
        },
        { text: "Rank of fund", value: "rank" },
        { text: "Updated date", value: "nav_date" },
        { text: "Performance ", value: "nav_return" },
        { text: "Price ", value: "nav" },
      ],
      fundRanking: [] as FundRanking[],
      range: "1Y",
      isLoading: false
    };
  },
  mounted() {
    this.updatedData();
  },
  watch:{
    range(newRange: string){
      this.updatedData();
    }
  },
  methods: {
    updatedData() {
      this.isLoading = true;
      axios
        .get(`http://localhost:3000/data?range=${this.range}`)
        .then((response) => {
          const data: FundRanking[] = response.data.fundRanking;
          console.log(response);
          this.fundRanking = data
            .sort((a: FundRanking, b: FundRanking) => {
              return b.nav_return - a.nav_return ;
            })
            .map((data: FundRanking, index: number) => {
              data.rank = index + 1;
              return data;
            });
            this.isLoading  = false
        })
        .catch((err) => {});
    },
  },
});
</script>
