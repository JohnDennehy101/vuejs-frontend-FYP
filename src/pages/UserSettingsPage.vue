<template>
  <UserSettingsProfileImage
    v-if="user"
    :userId="user.id"
    :image="user.profileImageUrl"
  />
  <UserSettingsForm v-if="user" :user="user" />
</template>

<script>
import UserSettingsForm from "../components/UserSettingsForm";
import UserSettingsProfileImage from "../components/UserSettingsProfileImage";
import UserService from "../services/UserService";
import { mapGetters } from "vuex";
const userService = new UserService();
export default {
  data() {
    return {
      user: null,
    };
  },
  components: {
    UserSettingsForm,
    UserSettingsProfileImage,
  },
  computed: {
    ...mapGetters({
      userId: "userId",
    }),
  },
  methods: {
    async getUserInfo() {
      console.log(this.userId);
      const response = await userService.getUser(await this.userId);

      console.log(response);

      if ("error" in response) {
        this.invalidEventCreation = true;
      } else {
        this.user = response.data;
      }
    },
  },
  async created() {
    await this.getUserInfo();
  },
};
</script>

<style scoped lang="scss"></style>
