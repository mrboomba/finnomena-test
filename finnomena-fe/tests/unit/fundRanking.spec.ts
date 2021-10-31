import { createLocalVue, shallowMount, Wrapper } from "@vue/test-utils";
import FundRanking from "@/components/FundRanking.vue";
import { displayDate } from "@/filters/formatDate"
import axios from "axios";
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

const testFundRanking = [{
  "mstar_id": "F00000Q8V5",
  "thailand_fund_code": "TISCOJP",
  "nav_return": 6.98518,
  "nav": 20.4346,
  "nav_date": new Date("2021-09-07T00:00:00.000Z"),
  "avg_return": 5.024201
},{
  "mstar_id": "F000011HR9",
  "thailand_fund_code": "SCBNK225P",
  "nav_return": 6.85902,
  "nav": 21.6802,
  "nav_date": new Date("2021-09-06T00:00:00.000Z"),
  "avg_return": 5.024201
} ];

describe("FundRanking.vue", () => {
  const localVue = createLocalVue();
  localVue.filter('displayDate',displayDate);
  const wrapper: Wrapper<InstanceType<typeof FundRanking> & { [key: string]: any }> = shallowMount(FundRanking,{localVue});

  it("component init successfully", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('fund ranking should format date automatically ', async ()=>{
    expect(displayDate(testFundRanking[0].nav_date)).toBe('07 Sep 2021')
    expect(displayDate(testFundRanking[1].nav_date)).toBe('06 Sep 2021')
  })

  it('api should be called and automatically sort and add rank',async ()=>{
    mock
    .onGet(`http://localhost:3000/data?range=1Y`)
    .reply(200, {fundRanking:testFundRanking});
    wrapper.vm.updatedData();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$data.fundRanking).toHaveLength(2);
    expect(wrapper.vm.$data.fundRanking[0].rank).toBe(1);
  })


});