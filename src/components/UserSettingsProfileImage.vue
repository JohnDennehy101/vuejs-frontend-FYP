<template>
  <div id="image-display-parent-container">
    <img v-if="profileImage" :src="profileImage" />
    <i v-else class="fas fa-map-marker-alt"></i>

    <input type="file" @change="previewFiles($event)" accept="image/*" />
    <button @click="updateUserImage">Submit</button>
  </div>

  {{ newImage }}
</template>

<script>
import UserService from "../services/UserService";
const userService = new UserService();
export default {
  props: ["image", "userId"],
  data() {
    return {
      profileImage: this.image,
      id: this.userId,
      newImage: null,
    };
  },
  methods: {
    previewFiles(event) {
      this.newImage = event.target.files[0];
    },

    async updateUserImage() {
      console.log(this.userId);
      const response = await userService.uploadUserProfileImage(
        this.id,
        this.newImage
      );

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.$router.go(0);
      }
    },
  },
};
</script>

<style scoped lang="scss">
#image-display-parent-container {
  width: 60%;
  margin: 1rem auto;
  text-align: center;
}
img {
  max-width: 50%;
  max-height: 30%;
  display: block;
  margin: 1rem auto;
}
</style>
