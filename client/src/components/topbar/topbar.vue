<template>
  <div class="topbar">
    <div
      class="toggle"
      @click="toggle"
      :class="{ active: $store.state.openmenu }"
    ></div>
    <Search />
    <Avatar />
  </div>
</template>

<script>
import Search from "../search/search.vue";
import Avatar from "../topbar-avatar/avatar.vue";
export default {
  name: "Topbar",
  components: {
    Search,
    Avatar,
  },
  methods: {
    toggle() {
      return this.$store.commit("openMenu");
    },
  },
};
</script>

<style lang="scss">
@import "topbar.scss";
</style>
