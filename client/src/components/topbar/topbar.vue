<template>
  <div class="topbar">
    <div class="toggle"></div>
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
};
</script>

<style lang="scss">
@import "topbar.scss";
</style>
