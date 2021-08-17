<template>
  <div class="container">
    <Sidebar />
    <main
      class="main"
      :class="{ active: $store.state.openmenu }"
      v-if="!loading"
    >
      <Topbar />
      <div class="cardBox">
        <div v-for="(item, index) in cards" :key="index">
          <Card :card="item" @click.native="openDialog" />
        </div>
      </div>
      <div class="wrapper">
        <!-- <div v-for="(item, index) in userdata" :key="index">
          <User :card="item" />
        </div> -->
      </div>
      <div>
        <vue-final-modal
          v-model="showModal"
          classes="modal-container"
          content-class="modal-content"
        >
          <span class="modal__title">Voeg blog toe</span>
          <div class="modal__content">
            <form
              v-on:submit="submit"
              method="POST"
              enctype="application/x-www-form-urlencoded"
            >
              <input
                type="text"
                name="username"
                id="name"
                placeholder="Username"
                v-model="userName"
                required
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                v-model="email"
                required
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                v-model="password"
                required
              />
              <input type="submit" value="Add user" />
            </form>
          </div>
        </vue-final-modal>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from "../../components/sidebar/sidebar.vue";
import Topbar from "../../components/topbar/topbar.vue";
// import User from "../../components/userCards/card.vue";
import Card from "../../components/wide-card/card.vue";
import axios from "axios";

export default {
  name: "users",
  components: {
    Sidebar,
    Topbar,
    // User,
    Card,
  },
  data() {
    return {
      loading: false,
      showModal: false,
      userName: "",
      email: "",
      password: "",
      error: "",
      popup: false,
      blogdata: [],
      cards: [
        {
          number: "2",
          name: "Voeg blog toe",
          icon: "fa fa-plus",
        },
      ],
    };
  },
  methods: {
    openDialog() {
      this.showModal = true;
    },
    submit(e) {
      e.preventDefault();
      const token = localStorage.getItem("token");

      const data = {
        name: this.userName,
        emailAddress: this.email,
        password: this.password,
      };

      if (
        data.name === "" ||
        !data.name ||
        !data.emailAddress === "" ||
        !data.emailAddress ||
        data.password === "" ||
        !data.password
      ) {
        return (this.error = "Not a valid user");
      }

      axios
        .post("/api/register", data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.showModal = false;
            this.popup = true;
            this.showSign();
            this.updateUi();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("/api/blogs", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.blogdata = res.data.getBlogs;
      })
      .catch((err) => {
        this.error = err;
        console.log(err);
      });
  },
  watch: {
    blogdata: function (val) {
      this.cards[0].number = val.length;
    },
  },
};
</script>

<style lang="scss">
@import "blogs.scss";
</style>
