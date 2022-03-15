<template>
  <nav>
    <ul class="nav-links">
      <li v-for="list in navLinks" :key="list.key">
        <a :href="list.link">{{ list.name }}</a>
      </li>
    </ul>

    <div
      data-testid="hamburgerIcon"
      v-on:click="openMobileMenu()"
      id="hamburger-icon"
    >
      <div class="line1"></div>
      <div class="line2"></div>
      <div class="line3"></div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["navLinks"],
  methods: {
    openMobileMenu() {
      const hamburgerIcon = document.getElementById("hamburger-icon");
      const nav = document.querySelector(".nav-links");
      const navLinks = document.querySelectorAll(".nav-links li");
      // Toggle navigation on mobile
      nav.classList.toggle("nav-active");
      // Burger toggler
      hamburgerIcon.classList.toggle("toggle");
      // Animate navigation links
      navLinks.forEach((link, index) => {
        if (link.style.animation || link.style.webkitAnimation) {
          link.style.animation = "";
          link.style.webkitAnimation = "";
        } else {
          link.style.webkitAnimation = `navLinkFade 0.5s ease forwards ${
            index / 7
          }s`;
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`;
        }
      });
    },
  },
};
</script>

<style>
nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #373f68;
  min-height: 8vh;
}
ul.nav-links {
  display: flex;
  justify-content: space-between;
  width: 40%;
  line-height: 75px;
}
ul.nav-links li {
  list-style: none;
}
ul.nav-links a {
  text-decoration: none;
  color: #fefefe;
  font-size: 1.2rem;
  font-weight: 500;
  display: block;
}
#hamburger-icon {
  display: none;
  cursor: pointer;
}
#hamburger-icon div {
  width: 30px;
  height: 3px;
  margin: 8px;
  background-color: #fff;
  transition: all 0.3s ease-in;
}
/* Tablet */
@media screen and (max-width: 1024px) {
  ul.nav-links {
    width: 50%;
  }
}
/* Mobile */
@media screen and (max-width: 768px) {
  ul.nav-links {
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: 92vh;
    top: 12.5vh;
    right: 0;
    padding: 100px;
    align-items: center;
    justify-content: flex-start;
    background-color: #373f68;
    opacity: 0.9;
    transform: translateX(100%);
    transition: transform 0.5s ease-in;
  }
  ul.nav-links li {
    opacity: 0;
  }
  ul.nav-links a {
    width: 100%;
  }
  div#hamburger-icon {
    display: block;
  }
}
.nav-active {
  transform: translateX(0) !important;
}
@keyframes navLinkFade {
  from {
    opacity: 0;
    transform: translateX(-60px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}
.toggle .line1 {
  transform: rotate(-45deg) translate(-9px, 10px);
}
.toggle .line2 {
  opacity: 0;
}
.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}
</style>
