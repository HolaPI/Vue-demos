<template>
  <div class="row">
    <!-- pizza menu -->
    <div class="col-sm-12 col-md-8">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>
              <strong>Size</strong>
              <small>/inches</small>
            </th>
            <th>
              <strong>Price</strong>
              <small>/RMB</small>
            </th>
            <th>
              <strong>Add to Cart</strong>
            </th>
          </tr>
        </thead>
        <tbody v-for="item in getMenuItems" :key="item.name">
          <tr>
            <td>
              <strong>{{ item.name }}</strong>
            </td>
          </tr>
          <tr v-for="option in item.options" :key="option.size">
            <td>{{ option.size }}</td>
            <td>{{ option.price }}</td>
            <td>
              <button @click="addToCart(item, option)" class="btn btn-sm btn-outline-success">+</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- my cart -->
    <div v-if="cart.length > 0" class="col-sm-12 col-md-4">
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>Quantity</th>
            <th>Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <!-- set :key="item.name + item.size" instead of single "item.name" in order to avoid keys duplicated -->
        <tbody v-for="item in cart" :key="item.name + item.size">
          <tr>
            <td>
              <button @click="deQuantity(item)" class="btn btn-sm">-</button>
              <span>&nbsp;{{ item.quantity }}&nbsp;</span>
              <button @click="inQuantity(item)" class="btn btn-sm">+</button>
            </td>
            <td>{{ item.name }} - {{ item.size }}</td>
            <td>{{ item.price * item.quantity }}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Total Fare:</strong>
        &nbsp;&nbsp;&nbsp;{{totalFare}}&nbsp;RMB
      </p>
      <button class="btn btn-block btn-success">Confirm</button>
    </div>
    <div v-else>{{ cartInfo }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cart: [],
      cartInfo: "Oops, your cart is empty!"
      /*
      // original data
      getMenuItems: {
        1: {
          name: "Durian Pizza",
          description: "Best choice for buddies loving durian.",
          options: [
            {
              size: 9,
              price: 38
            },
            {
              size: 12,
              price: 48
            }
          ]
        },
        2: {
          name: "Cheese Pizza",
          description: "Pizza lover killer, grab your stamoch",
          options: [
            {
              size: 9,
              price: 30
            },
            {
              size: 12,
              price: 42
            }
          ]
        },
        3: {
          name: "Hawaii Pizza",
          description: "People's default choice",
          options: [
            {
              size: 9,
              price: 36
            },
            {
              size: 12,
              price: 44
            }
          ]
        }
      }
      */
    };
  },
  computed: {
    getMenuItems() {
      // return this.$store.state.menuItems;
      return this.$store.getters.getMenuItems;
    },
    totalFare() {
      let total = 0;
      for (let item in this.cart) {
        let singleItem = this.cart[item];
        total += singleItem.price * singleItem.quantity;
      }
      return total;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.cart.length && this.cart.length > 0) {
      if (confirm("Your cart is loaded with delicious pizza, sure to leave?")) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  created() {
    this.fetchMenuItem();
  },
  methods: {
    fetchMenuItem() {
      //fetch method to get data from remote database
      // fetch("https://wd1695319840sjftof.wilddogio.com/wenxw-menu.json")
      //   .then(res => {
      //     return res.json();
      //   })
      //   .then(data => {
      //     this.getMenuItems = data;
      //   });

      //axios method to get data from remote database
      this.http.get("/wenxw-menu.json").then(res => {
        // this.getMenuItems = res.data;

        // save res.data to vuex by invorking method getMenuItems of store
        this.$store.commit("setMenuItems", res.data);
      });
    },
    addToCart(item, option) {
      let cartItem = {
        name: item.name,
        size: option.size,
        price: option.price,
        quantity: 1
      };
      if (this.cart.length > 0) {
        //filter data
        let result = this.cart.filter(cartItem => {
          return cartItem.name === item.name && cartItem.size === option.size;
        });
        if (result.length != null && result.length > 0) {
          result[0].quantity++;
        } else {
          this.cart.push(cartItem);
        }
      } else {
        this.cart.push(cartItem);
      }
    },
    inQuantity(item) {
      item.quantity++;
    },
    deQuantity(item) {
      item.quantity--;
      if (item.quantity <= 0) {
        this.removeItem(item);
      }
    },
    removeItem(item) {
      this.cart.splice(this.cart.indexOf(item), 1);
    }
  }
};
</script>

