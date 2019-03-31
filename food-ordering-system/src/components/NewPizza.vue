<template>
  <form>
    <h3 class="text-muted my-5">NEW Kind Pizza</h3>
    <div class="form-group row">
      <label class="col-sm-1">Type</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.name">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">Describe</label>
      <div class="col-sm-11">
        <textarea rows="5" class="form-control" v-model="newPizza.description"></textarea>
      </div>
    </div>
    <p>
      <strong>Option 1</strong>
    </p>
    <div class="form-group row">
      <label class="col-sm-1">Size</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size1">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">Price</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price1">
      </div>
    </div>
    <p>
      <strong>Option 2</strong>
    </p>
    <div class="form-group row">
      <label class="col-sm-1">Size</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.size2">
      </div>
    </div>
    <div class="form-group row">
      <label class="col-sm-1">Price</label>
      <div class="col-sm-11">
        <input type="text" class="form-control" v-model="newPizza.price2">
      </div>
    </div>
    <div class="form-group row">
      <button @click="addNewPizza" type="button" class="btn btn-block btn-success">Add to Shelf</button>
    </div>
  </form>
</template>
<script>
export default {
  data() {
    return {
      newPizza: {}
    };
  },
  methods: {
    addNewPizza() {
      let pizzaData = {
        name: this.newPizza.name,
        description: this.newPizza.description,
        options: [
          {
            size: this.newPizza.size1,
            price: this.newPizza.price1
          },
          {
            size: this.newPizza.size2,
            price: this.newPizza.price2
          }
        ]
      };
      //axios method to add a new kind pizza
      this.http
        .post("/wenxw-menu.json", pizzaData)
        .then(() => {
          this.$store.commit("pushMenuItems", pizzaData);
        })
        .catch(err => {
          console.log(err);
        });

      //fetch method to add a new kind pizza
      //   fetch("https://wd1695319840sjftof.wilddogio.com/wenxw-menu.json", {
      //     method: "POST",
      //     headers: { "Content-type": "application/json" },
      //     body: JSON.stringify(pizzaData)
      //   })
      //     .then(() => {
      //       this.$router.push({ name: "tempLink" });
      //       //   location.reload();

      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    }
  }
};
</script>

