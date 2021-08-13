<template>
  <div class="card">
    <div>
      <div class="numbers">{{ card.number }}</div>
      <div class="cardName">{{ card.name }}</div>
    </div>
    <div class="iconBox">
      <i :class="card.icon" aria-hidden="true"></i>
    </div>
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
