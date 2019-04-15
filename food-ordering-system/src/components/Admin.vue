<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- add a new pizza type -->
      <new-pizza></new-pizza>
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- broswer pizza types -->
      <h3 class="text-muted my-5">Pizza Menu</h3>
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>Types</th>
            <th>Delete</th>
          </tr>
        </thead>
        <p v-if="getPizzaMenu.length <= 0" class="text-center">{{ getPizzaMenu }}</p>
        <tbody v-else v-for="item in getPizzaMenu" :key="item.id">
          <tr>
            <td>{{ item.name }}</td>
            <td>
              <button @click="unshelfPizza(item)" class="btn btn-outline-danger btn-sm">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import NewPizza from "./NewPizza.vue";
export default {
  data() {
    return {
      // getPizzaMenu: [],
      menuInfor: "the Pizza Menu is empty."
    };
  },
  components: {
    "new-pizza": NewPizza
  },
  methods: {
    unshelfPizza(item) {
      fetch(
        "https://wd1695319840sjftof.wilddogio.com/wenxw-menu/" +
          item.id +
          "/.json",
        {
          method: "DELETE",
          headers: { "Content-type": "application/json" }
        }
      )
        .then(() => {
          // location.reload();
          // this.$router.push({ name: "tempLink" });
          // return res.json();
          this.$store.commit("removeMenuItems", item);
        })
        // .then(data => this.$router.push({ name: "menuLink" }))
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    getPizzaMenu: {
      get() {
        // return this.$store.state.menuItems;
        return this.$store.getters.getMenuItems;
      },
      set() {}
    }
  },
  created() {
    fetch("https://wd1695319840sjftof.wilddogio.com/wenxw-menu.json")
      .then(res => {
        return res.json();
      })
      .then(data => {
        // console.log(data);
        let menuArr = [];
        //data is an object
        for (let key in data) {
          // console.log(key);
          data[key].id = key;
          menuArr.push(data[key]);
        }
        // this.getPizzaMenu = menuArr;
        this.$store.commit("setMenuItems", menuArr);
      });
  }
  /*
  beforeRouteEnter: (to, from, next) => {
    // alert("hola, " + this.name);
    // next();
    next(vm => {
      alert("hola " + vm.name);
    });
  },
  beforeRouteLeave: (to, from, next) => {
    if (confirm("Sure to leave?")) {
      next();
    } else {
      next(false);
    }
  }
  */
};
</script>

