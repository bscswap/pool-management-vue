<template>
  <div>
    <div class="px-0 px-md-5">
      <ListPools
        v-if="Object.keys(subgraph.poolShares).length > 0"
        :query="queryMyLiquidity"
        title="My liquidity"
        class="pt-4"
      />
    </div>
    <div class="px-0 px-md-5">
      <ListPools
        :query="querySharedPools"
        :key="JSON.stringify(querySharedPools)"
        title="Pools"
        withFilters="1"
        class="mb-4 pt-4"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    queryMyLiquidity() {
      const poolShares = this.subgraph.poolShares;
      const ids = Object.keys(poolShares).map(share => share.toLowerCase());
      return {
        where: {
          id_in: ids
        }
      };
    },
    querySharedPools() {
      return {
        where: {
          finalized: true
        }
      };
    }
  }
};
</script>
