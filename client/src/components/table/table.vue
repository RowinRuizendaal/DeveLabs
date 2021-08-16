<template>
  <div class="recentOrders">
    <div class="cardHeader">
      <h2>{{ header }}</h2>
      <router-link to="" class="btn"> {{ cta }}</router-link>
    </div>
    <table>
      <thead>
        <tr>
          <td v-for="(item, index) in tableHeading" :key="index">
            {{ item.header }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="index">
          <td>{{ item.productName }}</td>
          <td>{{ item.Price }}</td>
          <td>{{ item.Payment }}</td>
          <td>
            <span class="status" :class="item.Status">
              {{ capitalizeFirstLetter(item.Status) }}</span
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table",
  components: {},
  props: {
    tableData: {
      type: Array,
      default: undefined,
    },
    tableHeading: {
      type: Array,
      default: undefined,
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
  data() {
    return {
      header: "Recent Orders",
      cta: "View All",
    };
  },
};
</script>

<style lang="scss">
@import "table.scss";
</style>
