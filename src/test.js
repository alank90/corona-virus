// Multiple fetches for stats yesterday and last week
Promise.all([
  fetch(
    `https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=${yesterday}&name=${this.selected}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "9dec5a52c8msh3cacbb8feb21b54p18cf22jsn6f95168693d6",
      },
    }
  ).then((res) => (res.ok && res.json()) || Promise.reject(res)),
  fetch("https://covid-19-data.p.rapidapi.com/country?format=json&name=italy", {
    method: "GET",
    headers: {
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
      "x-rapidapi-key": "9dec5a52c8msh3cacbb8feb21b54p18cf22jsn6f95168693d6",
    },
  }).then((res) => (res.ok && res.json()) || Promise.reject(res)),
]).then((data) => {
  // handle data array here from multiple fetches here.
  this.totalWorldWideVirusStats = data[0];
  this.totalUSAVirusStats = data[1];

  if (typeof Intl === "undefined" || !Intl.NumberFormat) {
    console.log("This browser doesn't support Intl.NumberFormat");
  } else {
    const nf = Intl.NumberFormat();
    this.totalWorldWideVirusStats.confirmed = nf.format(
      this.totalWorldWideVirusStats.confirmed
    );
    this.totalWorldWideVirusStats.deaths = nf.format(
      this.totalWorldWideVirusStats.deaths
    );

    this.totalUSAVirusStats.confirmed = nf.format(
      this.totalUSAVirusStats.confirmed
    );
    this.totalUSAVirusStats.deaths = nf.format(this.totalUSAVirusStats.deaths);
  }
});
