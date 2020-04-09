<template>
  <div class="app">
    <header class="header">
      <h1 class="logo">
        <a href="#">Corona Virus Updates</a>
      </h1>

      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/coronavirus">Covid-19 Queries</router-link>
      <router-link class="router-link" to="/johnhopkins">John Hopkins</router-link>
    </header>

    <!-- ========== Views for App will be rendered here ========== -->
    <router-view />
  </div>
</template>

<style>
/* 
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com 
Twitter: @rich_clark
*/

html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

body {
  line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

/* change colours to suit your needs */
ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

/* change colours to suit your needs */
mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* change border colour to suit your needs */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

/* ======== End CSS Reset ================= */

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Navbar Stylings */
h2,
h3,
a {
  color: #34495e;
}

a {
  text-decoration: none;
}

.logo {
  flex-basis: 60%;
  font-size: 1.45em;
}

.logo a {
  color: #a90302;
  padding: 10px 15px;
  text-transform: uppercase;
  font-weight: 700;
  cursor: none;
}

.header {
  display: flex;
  flex-direction: row;
  margin: 0 -10px;
  justify-content: space-around;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: rgba(202, 202, 202, 0.6);
  -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}

.router-link {
  font-size: 1.3rem;
  font-weight: 600;
  color: #a90302;
  padding: 10px 15px;
  text-transform: uppercase;
  margin-top: 5px;
  transition: 0.8s;
}
.router-link:hover {
  -webkit-transform: rotateX(360deg);
  transform: rotateX(360deg);
  color: #ca0e0e5e;
}

@media (max-width: 769px) {
  .header,
  .main-nav {
    display: flex;
  }
  .header {
    flex-direction: column;
    align-items: center;
  }
}
</style>
