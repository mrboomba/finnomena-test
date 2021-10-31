<template>
  <div>
    <v-col cols="12" class="py-2">
      <p>Choose time range</p>
      <v-btn-toggle v-model="range" tile color="yellow accent-4" group>
        <v-btn value="1D"> 1D </v-btn>
        <v-btn value="1M"> 1M </v-btn>
        <v-btn value="1W"> 1W </v-btn>
        <v-btn value="1Y"> 1Y </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-data-table
      :loading="isLoading"
      :headers="headers"
      :items="fundRanking"
      class="elevation-1"
    >
      <template v-slot:[`item.nav_date`]="{ item }">
        {{ item.nav_date | displayDate }}
      </template>
      <template v-slot:[`item.nav_return`]="{ item }">
        {{ item.nav_return | displayFloat }}
      </template>
      <template v-slot:[`item.nav`]="{ item }">
        {{ item.nav | displayFloat }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small @click="navigateToDetail(item)"> mdi-eye </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { FundRanking } from "../model/fundRanking.model";
import { displayDate } from "../filters/formatDate";
import { displayFloat } from "../filters/formatNumber";

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
        { text: "", value: "actions", sortable: false },
      ],
      fundRanking: [] as FundRanking[],
      range: "1Y",
      isLoading: false,
    };
  },
  mounted() {
    this.updatedData();
  },
  filters: {
    displayDate,
    displayFloat,
  },
  watch: {
    range(newRange: string) {
      this.updatedData();
    },
  },
  methods: {
    updatedData() {
      this.isLoading = true;
      axios
        .get(`http://localhost:3000/data?range=${this.range}`)
        .then((response) => {
          const data: FundRanking[] = response.data.fundRanking;
          this.fundRanking = data
            .sort((a: FundRanking, b: FundRanking) => {
              return b.nav_return - a.nav_return;
            })
            .map((data: FundRanking, index: number) => {
              data.rank = index + 1;
              return data;
            });
          
          this.isLoading = false;
        })
        .catch((err) => {});
    },
    navigateToDetail(fund: FundRanking) {
      const w = window.open(
        `https://www.finnomena.com/fund/${fund.mstar_id}`,
        "_blank"
      );
      if (w) {
        w.focus();
      }
    },
  },
});
</script>
