<template>
  <div class="profile-card">
    <div class="profile-card-header">
      <img :src="card.image" alt="" />
    </div>

    <div class="profile-card-body">
      <h3>{{ card.title }}</h3>
      <p>Author: {{ card.author }}</p>
    </div>
    <div class="profile-card-footer"></div>
  </div>
</template>

<script>
export default {
  name: "Card",
  components: {},
  props: {
    card: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "card.scss";
</style>
