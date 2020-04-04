<template>
  <div class="carousel">
    <h2>Life In The Corona Virus Age</h2>
    <ul id="slides">
      <li class="slide showing">
        <figure>
          <img :src="imgSource" alt="Slide Picture" />
          <caption>{{ figCaption }}</caption>
        </figure>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "slideShow",
  data() {
    return {
      currentSlide: 0,
      imgSource: "",
      figCaption: "",
      slides: [
        {
          image: require("@/assets/img/carousel/couple.jpg"),
          caption:
            "A couple wearing masks kiss in a shopping area in downtown Shanghai, China, on February 16, 2020."
        },
        {
          image: require("@/assets/img/carousel/dogs.jpg"),
          caption:
            "Dogs wearing masks are seen in a shopping area in downtown Shanghai on February 16, 2020."
        },
        {
          image: require("@/assets/img/carousel/family.jpg"),
          caption: "Family wave from Balcony"
        },
        {
          image: require("@/assets/img/carousel/hospital_workers.jpg"),
          caption: "Hospital Workers attending a patient"
        },
        {
          image: require("@/assets/img/carousel/stock_market.jpg"),
          caption:
            "A trader puts on his vest on an empty floor at the New York Stock Exchange after the closing bell on Wall Street in New York City on March 20. The New York Stock Exchange will close down the floor and will move temporarily to fully electronic trading on March 23 due to the coronavirus pandemic."
        },
        {
          image: require("@/assets/img/carousel/nyc.jpg"),
          caption: "Street in NYC during Pandemic"
        },
        {
          image: require("@/assets/img/carousel/pope.jpg"),
          caption: "Pope Says Mass Alone in St. Peters Square"
        },
        {
          image: require("@/assets/img/carousel/volunteers.jpg"),
          caption: "Volunteers spray city during pandemic"
        },
        {
          image: require("@/assets/img/carousel/shopper.jpg"),
          caption: "Shopper waits behind line at checkout"
        }
      ]
    };
  },
  mounted: function() {
    this.playSlides();
  },
  methods: {
    playSlides() {
      this.imgSource = this.slides[this.currentSlide].image;
      this.figCaption = this.slides[this.currentSlide].caption;
      let slideInterval = setInterval(nextSlide.bind(this), 2000);

      function nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length; // % is same as mod operator
        this.imgSource = this.slides[this.currentSlide].image;
        this.figCaption = this.slides[this.currentSlide].caption;
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