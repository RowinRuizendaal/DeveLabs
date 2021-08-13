<template>
  <div class="user-avatar">
    <img :src="avatar" alt="person" />
  </div>
</template>

<script>
export default {
  name: "Topbar",
  components: {},
  data() {
    return {
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
    };
  },
};
</script>

<style lang="scss">
@import "avatar.scss";
</style>
