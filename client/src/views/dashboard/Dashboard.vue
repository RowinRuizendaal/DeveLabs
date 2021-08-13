<template>
  <div class="container">
    <Sidebar />
    <main class="main">
      <Topbar />
      <div class="cardBox">
        <div v-for="(item, index) in cards" :key="index">
          <Card :card="item" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar.vue";
import Topbar from "../../components/topbar/topbar.vue";
import Card from "../../components/wide-card/card.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Topbar,
    Card,
  },
  data() {
    return {
      name: "",
      cards: [
        {
          number: "1.042",
          name: "Daily views",
          icon: "fa fa-eye",
        },
        {
          number: "80",
          name: "Sales",
          icon: "fa fa-shopping-cart",
        },
        {
          number: "208",
          name: "Comments",
          icon: "fa fa-comment",
        },
        {
          number: "€ 6.042",
          name: "Earning",
          icon: "fa fa-eur",
        },
      ],
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

<style>
/* need to refactor this later */
.main .topbar {
  width: 100%;
  background-color: var(--white);
  height: 60px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.container {
  position: relative;
  width: 100%;
}

.main {
  position: absolute;
  width: calc(100% - 300px);
  left: 300px;
  min-height: 100vh;
  background-color: #f5f5f5;
  transition: 0.5s;
}

.main.active {
  width: calc(100% - 60px);
  left: 60px;
}

.main .topbar {
  width: 100%;
  background-color: var(--white);
  height: 60px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle {
  position: relative;
  height: 60px;
  width: 60px;
  cursor: pointer;
}

.toggle::before {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 60px;
  font-size: 24px;
  text-align: center;
  color: #111;
}

.cardBox {
  position: relative;
  width: 100%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
