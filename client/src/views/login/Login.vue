<template>
  <main>
    <section class="login">
      <div class="container">
        <div class="user signinBx">
          <div class="imgBx">
            <img src="@/assets/Login/singin.jpg" alt="Image" />
          </div>
          <div class="formBx">
            <form
              v-on:submit="onSubmit"
              method="POST"
              enctype="application/x-www-form-urlencoded"
            >
              <h2>Sign In</h2>
              <p v-if="error">{{ error }}</p>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                v-model="userName"
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
              <input type="submit" value="Login" />
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      userName: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      let data = {
        userName: this.userName.toLowerCase(),
        password: this.password,
      };

      if (
        data.userName === "" ||
        !data.userName ||
        !data.password === "" ||
        !data.password
      ) {
        return (this.error = "Not a valid user");
      }
      axios
        .post("/api/login", data)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            this.$router.push("/dashboard");
          }
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    },
    onSubmit(e) {
      e.preventDefault();
      this.login();
    },
  },
};
</script>

<style lang="scss">
@import "@/components/Login/login.scss";
</style>
