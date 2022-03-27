<template>
  <div id="parent-container">
    <h1>404 not found</h1>
    <p>
      No site route found with this URL structure. Use
      <router-link
        :to="{
          name: 'Home Page',
        }"
      >
        this link
      </router-link>
      to go back to the home page.
    </p>
  </div>
</template>

<script></script>

<style scoped lang="scss">
#parent-container {
  height: 90vh;
  width: 90vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
p {
  margin-top: 0.5rem;
  text-align: center;
}
</style>
