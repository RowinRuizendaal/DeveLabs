<template>
  <div class="container">
    <Sidebar />
    <main
      class="main"
      :class="{ active: $store.state.openmenu }"
      v-if="!loading"
    >
      <Topbar />
      <div class="cardBox" v-if="!loading">
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
          <span class="modal__title">Voeg gebruiker toe</span>
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
      loading: true,
      showModal: false,
      userName: "",
      email: "",
      password: "",
      error: "",
      popup: false,
      userdata: [],
      cards: [
        {
          number: "",
          name: "Voeg gebruiker toe",
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
        .post("/api/register", data)
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
    updateUi() {
      axios
        .get("/api/users")
        .then((res) => {
          this.userdata = res.data.getUsers;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
          console.log(err);
        });
    },
  },
  mounted() {
    this.updateUi();
  },
  computed: {},
  watch: {
    userdata: function (val) {
      this.cards[0].number = val.length;
    },
  },
};
</script>

<style lang="scss">
@import "users.scss";
@import "@/components/modal/modal.scss";
</style>
