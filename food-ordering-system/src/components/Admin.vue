<template>
  <div class="row">
    <div class="col-sm-12 col-md-8">
      <!-- add a new pizza type -->
    </div>
    <div class="col-sm-12 col-md-4">
      <!-- broswer pizza types -->
      <h3 class="text-muted my-5">Menu</h3>
      <table class="table">
        <thead class="thead-default">
          <tr>
            <th>Types</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Durian Pizza</td>
            <td>
              <button class="btn btn-outline-danger btn-sm">&times;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "wenxw"
    };
  }
  // beforeRouteEnter: (to, from, next) => {
  //   // alert("hola, " + this.name);
  //   // next();
  //   next(vm => {
  //     alert("hola " + vm.name);
  //   });
  // }

  // beforeRouteLeave: (to, from, next) => {
  //   if (confirm("Sure to leave?")) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // }
};
</script>

