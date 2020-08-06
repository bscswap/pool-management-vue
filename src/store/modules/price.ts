import Vue from 'vue';
import { getAddress } from '@ethersproject/address';

const ENDPOINT = 'https://api.coingecko.com/api/v3';

const state = {
  values: {}
};

const mutations = {
  GET_PRICE_REQUEST() {
    console.debug('GET_PRICE_REQUEST');
  },
  GET_PRICE_SUCCESS(_state, payload) {
    for (const address in payload) {
      const price = payload[address];
      Vue.set(_state.values, address, price);
    }
    console.debug('GET_PRICE_SUCCESS');
  }
};

const actions = {
  loadPricesByAddress: async ({ commit }, payload) => {
    commit('GET_PRICE_REQUEST');
    const contractString = payload.join('%2C');
    const url = `${ENDPOINT}/simple/token_price/ethereum?contract_addresses=${contractString}&vs_currencies=usd`;
    const response = await fetch(url);
    const data = await response.json();
    const prices = {};
    for (const address in data) {
      const price = data[address].usd;
      prices[getAddress(address)] = price;
    }
    commit('GET_PRICE_SUCCESS', prices);
  }
};

export default {
  state,
  mutations,
  actions
};
