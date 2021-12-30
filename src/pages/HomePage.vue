<template>
  <div id="wrapper">
    <div>
      <h1>Group Activity Planning</h1>
      <p>
        A useful tool for planning domestic / international activities and trips
        with your friends and colleagues.
      </p>
      <button @click="$router.push('login')">Get Started</button>
    </div>
    <img src="../assets/homepageImage.jpg" />
  </div>
</template>

<script></script>

<style scoped lang="scss">
#wrapper {
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
div {
  width: 50%;
  margin: auto;
  text-align: center;
}
h1 {
  font-size: 3rem;
}
p {
  font-size: 1.2rem;
}
img {
  width: 40%;
  height: 80%;
  margin: auto;
}
button {
  border-radius: 10px;
  border: none;
  width: 30%;
  width: 40%;
  height: 2.5rem;
  margin: 1rem 0;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;
}
button:hover {
  cursor: pointer;
}
</style>
