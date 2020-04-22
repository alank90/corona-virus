<template>
  <div class="display-graph">
    <h2 @click="sortChartData">
      Display Graph
      <i class="fa fa-bar-chart" style="font-size:36px" aria-hidden="true"></i>
    </h2>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";

export default {
  name: "displayGraph",
  extends: Bar,
  props: ["propsChartData"],
  data: function() {
    return {
      options: {}
    };
  },
  methods: {
    sortChartData: function() {
      // Need to do redefine these variables because
      // vue's "this" is not same scope as Array.Prototype.sort function
      let Deaths = this.propsChartData.Deaths;
      console.log(`Deaths = ${this.propsChartData[0].Deaths}`);
      this.propsChartData.sort(function(a, b) {
        if (a[Deaths] > b[Deaths]) {
          return -1;
        } else if (a[Deaths] < b[Deaths]) {
          return 1;
        }

        return 0;
      });
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>