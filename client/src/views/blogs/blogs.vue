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
        <div v-for="(item, index) in blogdata" :key="index">
          <User :card="item" />
        </div>
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
                name="title"
                id="title"
                placeholder="title"
                v-model="title"
                required
              />
              <input
                type="text"
                name="image"
                id="image"
                placeholder="image url"
                v-model="image"
                required
              />
              <textarea
                name="content"
                id="content"
                placeholder="content"
                v-model="content"
                required
              />
              <input type="submit" value="Add blog" />
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
import User from "../../components/blogCards/card.vue";
import Card from "../../components/wide-card/card.vue";
import axios from "axios";

export default {
  name: "blogs",
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
      title: "",
      image: "",
      content: "",
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
    showSign() {
      this.$notify({
        group: "foo",
        title: "<h2>Sucess</h2>",
        text: `${this.title} is toegevoegd aan blogs`,
        position: "top left",
        type: "success",
        duration: 15000,
      });
    },
    updateUi() {
      axios
        .get("/api/blogs")
        .then((res) => {
          this.blogdata = res.data.getBlogs;
        })
        .catch((err) => {
          this.error = err;
          console.log(err);
        });
    },
    submit(e) {
      e.preventDefault();

      const data = {
        title: this.title,
        image: this.image,
        content: this.content,
      };

      if (
        data.title === "" ||
        !data.title ||
        !data.image === "" ||
        !data.image ||
        data.content === "" ||
        !data.content
      ) {
        return (this.error = "Something went wrong");
      }

      axios
        .post("/api/addblog", data)
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
    this.updateUi();
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
