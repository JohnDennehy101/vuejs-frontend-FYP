<template>
  <div id="image-display-parent-container">
    <img data-testid="userImage" v-if="profileImage" :src="profileImage" />
    <img
      data-testid="defaultImage"
      v-else
      src="../assets/defaultUserImage.png"
    />

    <input
      type="file"
      id="image-upload"
      @change="previewFiles($event)"
      accept="image/*"
    />
    <label for="image-upload">Update Image</label>
  </div>
</template>

<script>
import userService from "../services/UserService";
export default {
  props: {
    userService: {
      default: userService,
    },
    userId: String,
    image: String,
  },
  data() {
    return {
      profileImage: this.image,
      id: this.userId,
      newImage: null,
      invalidImageUpload: null,
    };
  },
  methods: {
    async previewFiles(event) {
      this.newImage = event.target.files[0];
      this.$emit("updateUserImage", true);

      await this.updateUserImage();
    },

    async updateUserImage() {
      const response = await this.userService.uploadUserProfileImage(
        this.id,
        this.newImage
      );

      if ("error" in response) {
        this.invalidImageUpload = true;
      } else {
        this.$emit("updateUserImage", false);
        setTimeout(() => this.$router.go(0), 5000);
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
  max-width: 250px;
  max-height: 250px;
  border-radius: 50%;
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
