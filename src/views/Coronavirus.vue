<template>
  <div class="coronavirus">
    <h2>Query Database</h2>

    <select id="countries">
      <option value="united-states" selected>United States</option>
      <option value="united-kingdom">United Kingdom</option>
      <option value="canada">Canada</option>
      <option value="china">China</option>
      <option value="france">France</option>
      <option value="germany">Germany</option>
      <option value="greece">Greece</option>
      <option value="hong-kong">Hong Kong</option>
      <option value="india">India</option>
      <option value="italy">Italy</option>
      <option value="japan">Japan</option>
      <option value="mexico">Mexico</option>
      <option value="spain">Spain</option>
    </select>

    <button class="myButton" @click="retrieveData">Get Case Summary</button>
  </div>
</template>

<script>
export default {
  name: "Coronavirus",
  methods: {
    retrieveData: function() {
      fetch("https://api.covid19api.com/summary")
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
        });
    }
  }
};
</script>

<style scoped>
h2 {
  margin: 10px auto;
  font-size: 2rem;
  text-align: center;
}

select {
  display: block;
  width: 140px;
  height: 35px;
  padding: 4px;
  margin: 15px auto;
  border-radius: 4px;
  box-shadow: 2px 2px 8px #999;
  background: #eee;
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
}

select:after {
  content: "<>";
  font: 11px "Consolas", monospace;
  color: #666;
}

.myButton {
  box-shadow: 3px 4px 0px 0px #8a2a21;
  background: linear-gradient(to bottom, #b9090b 5%, #f24437 100%);
  background-color: #b9090b;
  border-radius: 18px;
  border: 1px solid #d02718;
  display: block;
  margin: 10px auto;
  cursor: pointer;
  color: #ffffff;
  font-family: Trebuchet MS;
  font-size: 19px;
  padding: 10px 30px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #810e05;
}
.myButton:hover {
  background: linear-gradient(to bottom, #f24437 5%, #b9090b 100%);
  background-color: #f24437;
}
.myButton:active {
  position: relative;
  top: 1px;
}
</style>