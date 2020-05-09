<template>
  <div>
    <h2>Life In The Corona Virus Age</h2>

    <transition name="fade">
      <figure class="slide" v-if="show">
        <img :src="imgSource" alt="Slide Picture" />
        <caption>{{ figCaption }}</caption>
      </figure>
    </transition>
  </div>
</template>

<script>
export default {
  name: "slideShow",
  mounted: function() {
    this.playSlides();
  },
  methods: {
    playSlides() {
      this.imgSource = this.slides[this.currentSlide].image;
      this.figCaption = this.slides[this.currentSlide].caption;
      let slideInterval = setInterval(nextSlide.bind(this), 3500); // setInterval time should match css
      // transition time to avoid slide from jumping on change

      function nextSlide() {
        this.show = !this.show; // State change triggers vue transition
        this.currentSlide = (this.currentSlide + 1) % this.slides.length; // % is same as mod operator
        this.imgSource = this.slides[this.currentSlide].image;
        this.figCaption = this.slides[this.currentSlide].caption;
      }
    }
  },
  data() {
    return {
      currentSlide: 0,
      show: true,
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
            "A trader puts on his vest on an empty floor at the New York Stock Exchange after the closing bell on Wall Street in New York City on March 20."
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
  }
};
</script>

<style scoped>
/*
essential styles:
these make the slideshow work
*/

h2 {
  font-size: 1.8rem;
  margin: 20px 0;
  text-align: center;
}

.slide {
  position: relative;
  width: 102%;
  height: auto;
  max-height: 500px;
  margin: 0 auto;
  overflow: hidden;
}

img {
  width: 100%;
  height: auto;
}

caption {
  position: absolute;
  bottom: 0;
  max-width: 80%;
  margin: 0 auto;
  padding: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 3.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* =================================================
non-essential styles:
just for appearance; change whatever you want
================================================== */
caption {
  display: block;
  font-size: 20px;
  padding: 30px;
  color: #fff;
}

/* Media Queries */
@media only screen and (max-width: 768px) {
  /* For mobile phones: */
  caption {
    font-size: 18px;
  }
}
</style>