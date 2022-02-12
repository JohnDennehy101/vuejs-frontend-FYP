<template>
  <div id="image-display-parent-container">
    <img v-if="profileImage" :src="profileImage" />
    <i v-else class="fas fa-map-marker-alt"></i>

    <input
      type="file"
      id="image-upload"
      @change="previewFiles($event)"
      accept="image/*"
    />
    <label for="image-upload">Update Image</label>
    <!--<button @click="updateUserImage">Submit</button>-->
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
    async previewFiles(event) {
      this.newImage = event.target.files[0];
      this.$emit("updateUserImage", true);

      await this.updateUserImage();
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
        this.$emit("updateUserImage", false);
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
  border: 1px solid #eeeeee;

  @include for-phone-only {
    width: 90%;
  }
}
img {
  max-width: 80%;
  max-height: 20%;
  display: block;
  margin: 2rem auto 2rem auto;
}
input[type="file"] {
  opacity: 0;
  z-index: -1;
  position: absolute;
}
label {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: none;
  width: 30%;
  font-size: 1rem;
  height: 2.5rem;
  margin: 2rem auto;
  background-color: $primary-button-background-colour;
  color: $primary-button-text-colour;

  @include for-phone-only {
    width: 80%;
  }
}
label:hover {
  cursor: pointer;
}
</style>
