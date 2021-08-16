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
        <div v-for="(item, index) in userdata" :key="index">
          <User :card="item" />
        </div>
      </div>
      <div>
        <vue-final-modal
          v-model="showModal"
          classes="modal-container"
          content-class="modal-content"
        >
          <span class="modal__title">Add user</span>
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
import User from "../../components/userCards/card.vue";
import Card from "../../components/wide-card/card.vue";
import axios from "axios";

export default {
  name: "users",
  components: {
    Sidebar,
    Topbar,
    User,
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
      userdata: [],
      cards: [
        {
          number: "1",
          name: "Voeg gebruiker toe",
          icon: "fa fa-plus",
        },
      ],
      users: [
        {
          img: "https://avatars.githubusercontent.com/u/33514521?v=4",
          name: "Rowin",
          proffesion: "Front-end Developer",
        },
        {
          img: "https://uifaces.co/our-content/donated/VxDQx_gA.jpg",
          name: "David",
          proffesion: "Content maker",
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showSign() {
      this.$notify({
        group: "foo",
        title: "<h2>Sucess</h2>",
        text: `${this.userName} is toegevoegd aan gebruikers`,
        position: "top left",
        type: "success",
        duration: 15000,
      });
    },
  },
  mounted() {
    const token = localStorage.getItem("token");
    axios
      .get("/api/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        this.userdata = res.data.getUsers;
      })
      .catch((err) => {
        this.error = err;
        console.log(err);
      });
  },
};
</script>

<style lang="scss">
@import "users.scss";
@import "@/components/modal/modal.scss";
</style>
