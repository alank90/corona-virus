<template>
  <div class="display-results">
    <div v-if="Object.keys(propsCumulativeCoronaVirusStatsTotal).length !== 0">
      <h2>
        {{ propsCoronaVirusStatsTotal[0].Country }} Corona Virus Stats as of
        {{ today }}
      </h2>
      <table id="corona-virus-table">
        <thead>
          <tr>
            <th>Active Cases</th>
            <th>Confirmed</th>
            <th>Deaths</th>
            <th>Recovered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ propsCumulativeCoronaVirusStatsTotal.Active }}</td>
            <td>{{ propsCumulativeCoronaVirusStatsTotal.Confirmed }}</td>
            <td>{{ propsCumulativeCoronaVirusStatsTotal.Deaths }}</td>
            <td>{{ propsCumulativeCoronaVirusStatsTotal.Recovered }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="propsCumulativeCoronaVirusStatsTotal.Active === 0">No Active Cases</div>

    <!-- =========== Markup for the States Table ================ -->
    <div
      v-if="
        Object.keys(propsCumulativeCoronaVirusStatsTotal).length !== 0 &&
          propsCoronaVirusStatsTotal[0].CountryCode === 'US'
      "
    >
      <div @click="showStates" class="hideTableArrow" title="Click to See Breakdown by State">&#187;</div>

      <div v-if="visibility">
        <table id="corona-virus-table">
          <thead>
            <tr @click="sortTable">
              <th
                v-for="(col, index) in columns"
                :data-col-num="index"
                :data-col-name="col"
                title="Click Header to Sort"
                :key="index"
              >
                {{ col == 'Province' ? 'State' : col }}
                <div
                  class="arrow"
                  v-if="columnName == col"
                  v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"
                ></div>
              </th>
              <!-- === End v-for === -->
            </tr>
          </thead>

          <tbody>
            <tr v-for="state in get_rows()" :key="state.Province">
              <td v-for="col in columns" :key="col">{{ state[col] }}</td>
            </tr>
          </tbody>
        </table>

        <!-- ======= Pagination Markup ===== -->
        <div class="pagination">
          <div
            class="number"
            v-for="i in num_pages()"
            v-bind:class="[i == currentPage ? 'active' : '']"
            v-on:click="change_page(i)"
            :key="i"
          >{{ i }}</div>
        </div>
        <!-- === End Pagination === -->
      </div>
      <!-- ==== End v-if for visibility on state's table ===== -->
    </div>
    <!-- =========== End of Markup for the States Table =========== -->
  </div>
  <!-- ======= End .display-results ======== -->
</template>

<script>
export default {
  name: "DisplayQueryResults",
  props: ["propsCoronaVirusStatsTotal", "propsCumulativeCoronaVirusStatsTotal"],
  data: function() {
    return {
      visibility: false,
      degrees: 90,
      currentPage: 1,
      elementsPerPage: 20,
      ascending: false,
      sortColumn: "",
      columnName: "",
      columns: ["Province", "Active", "Confirmed", "Deaths", "Recovered"]
    };
  },
  computed: {
    today: function() {
      // create a date object using Date constructor
      let dateObj = new Date();
      dateObj = dateObj.toISOString().substring(0, 10);
      return dateObj;
    }
  },
  methods: {
    showStates: function() {
      this.visibility = !this.visibility;
      const el = document.querySelector(".hideTableArrow");
      if (this.visibility) {
        // Arrow needs to shift up
        el.style.transform = `rotate(${this.degrees}deg)`;
        el.style.paddingBottom = "20px";
        this.degrees -= 90;
      } else {
        // Shift arrow down and show table
        el.style.transform = `rotate(${this.degrees}deg)`;
        el.style.paddingBottom = "0";
        this.degrees += 90;
      }
    },
    sortTable: function(e) {
      e.preventDefault;
      const el = e.target;
      const columnNumber = el.dataset.colNum;
      this.columnName = el.dataset.colName;

      if (this.sortColumn === this.columnName) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = this.columnName;
      }
      // Need to do redefine these variables because
      // vue's "this" is not same scope as Array.Prototype.sort function
      let ascending = this.ascending;
      let columnName = this.columnName;

      this.propsCoronaVirusStatsTotal.sort(function(a, b) {
        if (a[columnName] > b[columnName]) {
          return ascending ? 1 : -1;
        } else if (a[columnName] < b[columnName]) {
          return ascending ? -1 : 1;
        }

        return 0;
      });
    },
    num_pages: function() {
      return Math.ceil(
        this.propsCoronaVirusStatsTotal.length / this.elementsPerPage
      );
    },
    get_rows: function () {
      /* Changing pages is as simple as updating the field we added 
      which stores the current page. We don’t need to worry about re-sorting 
      or re-rendering the page, or even re-splitting the array into a new 
      sub-array. If the method used to return a subset of the array uses the 
      property "currentPage", then just by updating the value(via change_page()), 
      everything will update automatically. Isn't Vue nice. Sssswwwweeeettttt */
      let start = (this.currentPage - 1) * this.elementsPerPage;
      let end = start + this.elementsPerPage;
      return this.propsCoronaVirusStatsTotal.slice(start, end);
    },
    change_page: function change_page(page) {
      this.currentPage = page; // Forces a rerender of state table to new page
    }
  }
};
</script>

<style scoped>
h2 {
  color: rgba(49, 2, 2, 0.966);
  text-align: center;
  font-size: 1.6rem;
  margin: 25px 5px 25px 5px;
}

table {
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 10px auto;
}

table th {
  font-size: 1.3rem;
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table th[data-col-name] {
  cursor: pointer;
}
table th:not(:last-child) {
  border-right: solid 3px rgba(14, 0, 0, 0.459);
}

table td {
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}

table tbody tr:nth-child(2n) td {
  background: rgba(241, 22, 22, 0.24);
}

table tr:hover {
  background: rgba(248, 167, 167, 0.24);
}

.pagination {
  text-align: right;
  width: 750px;
  padding: 8px;
}
.number {
  display: inline-block;
  padding: 4px 10px;
  color: #fff;
  border-radius: 4px;
  background: #44475c;
  margin: 0px 5px;
  cursor: pointer;
}
.number:hover,
.number.active {
  background: #717699;
}

p {
  font-size: 1.2rem;
  color: #005;
}

.hideTableArrow {
  width: 75px;
  color: #d92b24;
  margin: 10px auto;
  font-size: 6rem;
  font-weight: 700;
  text-shadow: 3px 3px 0px #810e05;
  cursor: pointer;
  transform-origin: center left;
  transition: all 0.5s;
}
.hideTableArrow:hover {
  color: #f79f98c7;
}

.arrow_down {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC");
}
.arrow_up {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=");
}
.arrow {
  float: right;
  width: 12px;
  height: 15px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
}
</style>
