<template>
  <div class="profile-card">
    <div class="profile-card-header">
      <img :src="card.profilepicture" alt="" />
    </div>

    <div class="profile-card-body">
      <h3>{{ card.name }}</h3>
      <p>{{ card.emailAddress }}</p>
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
