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

  @include for-phone-only {
    flex-direction: column;
  }
}
div {
  width: 50%;
  margin: auto;
  text-align: center;

  @include for-phone-only {
    width: 90%;
    margin: 1rem auto;
  }
}
h1 {
  font-size: 3rem;

  @include for-phone-only {
    font-size: 1.2rem;
  }
}
p {
  font-size: 1.2rem;
}
img {
  width: 40%;
  height: 80%;
  margin: auto;

  @include for-phone-only {
    width: 80%;
  }
}
button {
  border-radius: 10px;
  border: none;
  width: 40%;
  height: 2.5rem;
  margin: 1rem 0;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;

  @include for-phone-only {
    height: 2rem;
  }
}
button:hover {
  cursor: pointer;
}
</style>
