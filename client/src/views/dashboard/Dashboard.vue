<template>
  <main>
    <section>
      <h1>HELLO {{ name }}</h1>
      <button @click="logout">logout</button>
    </section>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      name: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
  mounted() {
    axios
      .get("/api/user", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.name = res.data.userData.firstName;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
