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
          <Card :card="item" />
        </div>
      </div>
      <div class="details">
        <Table :tableData="tableData" :tableHeading="tableHeading" />
        <Customers :customer="customer" />
      </div>
    </main>
    <main v-else class="main loading">
      <bounce :loading="loading"></bounce>
      <p v-if="error">{{ error }}</p>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import Sidebar from "../../components/sidebar/sidebar.vue";
import Topbar from "../../components/topbar/topbar.vue";
import Card from "../../components/wide-card/card.vue";
import Table from "../../components/table/table.vue";
import Customers from "../../components/customers/customers.vue";

export default {
  name: "Dashboard",
  components: {
    Sidebar,
    Topbar,
    Card,
    Table,
    Customers,
  },
  data() {
    return {
      name: "",
      loading: false,
      error: "",
      blogData: [],
      cards: [
        {
          number: "1.042",
          name: "Views",
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
      tableHeading: [
        {
          header: "Name",
        },
        {
          header: "Price",
        },
        {
          header: "Payment",
        },
        {
          header: "Status",
        },
      ],
      tableData: [
        {
          productName: "Star Refrigerator",
          Price: "€ 1200",
          Payment: "Paid",
          Status: "delivered",
        },
        {
          productName: "Window Coolers",
          Price: "€ 110",
          Payment: "Due",
          Status: "pending",
        },
        {
          productName: "Speakers",
          Price: "€ 620",
          Payment: "Paid",
          Status: "delivered",
        },
        {
          productName: "HP Laptop",
          Price: "€ 6000",
          Payment: "Due",
          Status: "in-progress",
        },
        {
          productName: "Star Refrigerator",
          Price: "€ 1200",
          Payment: "Paid",
          Status: "delivered",
        },
        {
          productName: "Window Coolers",
          Price: "€ 110",
          Payment: "Due",
          Status: "pending",
        },
        {
          productName: "Speakers",
          Price: "€ 620",
          Payment: "Paid",
          Status: "return",
        },
        {
          productName: "HP Laptop",
          Price: "€ 6000",
          Payment: "Due",
          Status: "in-progress",
        },
        {
          productName: "Apple Watch",
          Price: "€ 620",
          Payment: "Paid",
          Status: "return",
        },
      ],
      customer: [
        {
          name: "David",
          country: "Italy",
          image: "https://uifaces.co/our-content/donated/VxDQx_gA.jpg",
        },
        {
          name: "Bernard",
          country: "England",
          image: "https://randomuser.me/api/portraits/men/47.jpg",
        },
        {
          name: "Tobias",
          country: "Germany",
          image: "https://uifaces.co/our-content/donated/IPh6PTBx.jpg",
        },
        {
          name: "Oliva",
          country: "The Netherlands",
          image:
            "https://images.pexels.com/photos/61100/pexels-photo-61100.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb",
        },
        {
          name: "Peter",
          country: "Africa",
          image: "https://uifaces.co/our-content/donated/L7wQctBt.jpg",
        },
        {
          name: "Mohammed",
          country: "Turkey",
          image: "https://uifaces.co/our-content/donated/ZCkJgJIH.png",
        },
        {
          name: "Moffel mol",
          country: "Moffe land",
          image:
            "data:image/jpeg;base64,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",
        },
        {
          name: "Barney",
          country: "Barney Island",
          image: "https://avatars.githubusercontent.com/u/47493725?v=4",
        },
      ],
    };
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
        // this.name = res.data.userData.firstName;
        // this.blogData = res.data.getBlogs;
        this.loading = false;
      })
      .catch((err) => {
        this.error = err;
        console.log(err);
      });
  },
};
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
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

.details {
  position: relative;
  width: 100%;
  padding: 20px;
  padding-top: 0;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 2fr 1fr;
}

/* Responsive */

@media (max-width: 992px) {
  .navigation {
    left: -300px;
  }
  .navigation.active {
    left: 0;
    width: 300px;
  }
  .main {
    width: 100%;
    left: 0;
  }
  .main.active {
    width: calc(100% - 300px);
    left: 300px;
  }
  .cardBox {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .details {
    grid-template-columns: repeat(1, 1fr);
  }
  .cardHeader h2 {
    font-weight: 600;
    font-size: 18px;
  }
}

@media (max-width: 480px) {
  .cardBox {
    grid-template-columns: repeat(1, 1fr);
  }
  .details .recentOrders {
    overflow-x: auto;
  }
  .details .recentOrders table {
    width: 600px;
  }
  .navigation {
    width: 100%;
    left: -100%;
    z-index: 1000;
    overflow: hidden;
  }
  .navigation.active {
    width: 100%;
    left: 0;
    overflow: hidden;
  }
  .toggle.active {
    z-index: 10000;
    right: 0;
    left: initial;
    position: fixed;
  }
  .toggle.active::before {
    color: #fff;
  }
  .main,
  .main.active {
    overflow: hidden;
  }
}

.toggles {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.ml {
  background-color: #e0119d;
  color: var(--white);
  padding: 10px;
  border: none;
}

.bloom {
  background-color: #f07904;
  color: var(--white);
  padding: 10px;
  border: none;
}
</style>
