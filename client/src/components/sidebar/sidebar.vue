<template>
  <div class="navigation">
    <ul>
      <li>
        <a href="#">
          <span class="title"
            ><h2>{{ brand }}</h2></span
          >
        </a>
      </li>
      <li v-for="(item, index) in navigation" :key="index">
        <router-link :to="item.slug">
          <span class="icon">
            <i :class="item.icon" aria-hidden="true"></i>
          </span>
          <span class="title">{{ item.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  components: {},
  data() {
    return {
      brand: "Clip Path",
      navigation: [
        {
          title: "Dashboard",
          slug: "",
          icon: "fa fa-home",
        },
        {
          title: "Customers",
          slug: "",
          icon: "fa fa-users",
        },
        {
          title: "Message",
          slug: "",
          icon: "fa fa-comment",
        },
        {
          title: "Help",
          slug: "",
          icon: "fa fa-question-circle",
        },
        {
          title: "Settings",
          slug: "",
          icon: "fa fa-cog",
        },
        {
          title: "Password",
          slug: "",
          icon: "fa fa-lock",
        },
        {
          title: "Sign out",
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
