<template>
  <div class="navigation" :class="{ active: $store.state.openmenu }">
    <ul>
      <li>
        <a href="#">
          <span class="title">
            <h2>{{ brand }}</h2>
          </span>
        </a>
      </li>
      <li v-for="(item, index) in navigation" :key="index">
        <router-link :to="item.slug" v-if="item.title !== 'Log uit'">
          <span class="icon">
            <i :class="item.icon" aria-hidden="true"></i>
          </span>
          <span class="title">{{ item.title }}</span>
        </router-link>

        <router-link :to="item.slug" v-else @click="logout">
          <span class="icon">
            <i :class="item.icon" aria-hidden="true"></i>
          </span>
          <span @click="logout" class="title">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  data() {
    return {
      brand: "Clip Path",
      navigation: [
        {
          title: "Home",
          slug: "dashboard",
          icon: "fa fa-home",
        },
        {
          title: "Gebruikers",
          slug: "users",
          icon: "fa fa-users",
        },
        {
          title: "Instellingen",
          slug: "",
          icon: "fa fa-cog",
        },
        {
          title: "Log uit",
          slug: "",
          icon: "fa fa-sign-out",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "sidebar.scss";
</style>
