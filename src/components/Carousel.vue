<template>
  <div class="carousel">
    <h2>Life In The Corona Virus Age</h2>
    <ul id="slides">
      <li class="slide showing">
        <figure>
          <img src="../assets/img/carousel/couple.jpg" alt="couple in Beijing" />
          <figcaption>A couple wearing masks kiss in a shopping area in downtown Shanghai, China, on February 16, 2020.</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/dogs.jpg" alt="dogs" />
          <figcaption>Dogs wearing masks are seen in a shopping area in downtown Shanghai on February 16, 2020.</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/family.jpg" alt="family" />
          <figcaption>Family wave from Balcony</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/hospital_workers.jpg" alt="Hospital Workers" />
          <figcaption>Hospital Workers attending a patient</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/stock_market.jpg" alt="Floor ofStock Market" />
          <figcaption>A trader puts on his vest on an empty floor at the New York Stock Exchange after the closing bell on Wall Street in New York City on March 20. The New York Stock Exchange will close down the floor and will move temporarily to fully electronic trading on March 23 due to the coronavirus pandemic.</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/nyc.jpg" alt="NYC Street" />
          <figcaption>NYC Street View</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/pope.jpg" alt="Pope Saying Mass" />
          <figcaption>Pope Says Mass Alone in St. Peters Square</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/volunteers.jpg" alt="Volunteers" />
          <figcaption>Volunteers spray city</figcaption>
        </figure>
      </li>
      <li class="slide">
        <figure>
          <img src="../assets/img/carousel/shopper.jpg" alt="Shopper" />
          <figcaption>Shopper waits behind line at checkout</figcaption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "carousel",
  mounted: function() {
    this.playSlides();
  },
  methods: {
    playSlides() {
      const slides = document.querySelectorAll("#slides .slide");
      let currentSlide = 0;
      let slideInterval = setInterval(nextSlide, 2000);

      function nextSlide() {
        slides[currentSlide].className = "slide";
        currentSlide = (currentSlide + 1) % slides.length; // % is same as mod operator
        slides[currentSlide].className = "slide showing";
      }
    }
  }
};
</script>

<style scoped>
/*
essential styles:
these make the slideshow work
*/

#slides {
  position: relative;
  height: 300px;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

.slide {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;

  -webkit-transition: opacity 1s;
  -moz-transition: opacity 1s;
  -o-transition: opacity 1s;
  transition: opacity 1s;
}

.showing {
  opacity: 1;
  z-index: 2;
}

/* =================================================
non-essential styles:
just for appearance; change whatever you want
================================================== */
.slide {
  font-size: 40px;
  padding: 40px;
  box-sizing: border-box;
  color: #fff;
}
</style>