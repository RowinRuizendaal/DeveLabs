<template>
  <div class="recentCustomers">
    <div class="cardHeader">
      <h2>Recent Customers</h2>
    </div>
    <table>
      <tbody>
        <tr v-for="(item, index) in customer" :key="index">
          <td width="60px">
            <div class="imgBx">
              <img :src="item.image" :alt="item.name" />
            </div>
          </td>
          <td>
            <h4>
              {{ item.name }}<br /><span>{{ item.country }}</span>
            </h4>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Customers",
  components: {},
  props: {
    customer: {
      type: Array,
      default: undefined,
    },
  },
};
</script>

<style lang="scss">
@import "customers.scss";
</style>
