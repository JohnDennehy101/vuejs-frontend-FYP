<template>
  <div id="chat-messages-container">
    <h4 data-testid="oneMessage" v-if="messages.length === 1">
      {{ messages.length }} Comment
    </h4>
    <h4 data-testid="multipleMessages" v-else>
      {{ messages.length }} Comments
    </h4>

    <div
      class="individual-message-container"
      v-for="message in messages"
      :key="message.id"
    >
      <div id="user-image-container">
        <img
          data-testid="userImageProvided"
          v-if="message.author.profileImageUrl"
          :src="message.author.profileImageUrl"
        />
        <img v-else src="../assets/defaultUserImage.png" />
      </div>
      <div id="user-online-icon-container">
        <i
          v-if="
            presentUsers.find((user) => user.email === message.author.email)
          "
          class="fas fa-circle"
          style="color: green"
          data-testid="greenIconOnlineUser"
        ></i>
        <i
          v-else
          class="fas fa-circle"
          data-testid="redIconOfflineUser"
          style="color: red"
        ></i>
      </div>
      <div class="message-info-container">
        <div class="message-author-info">
          <p>
            User:
            <span data-testid="userEmail">{{ message.author.email }}</span>
          </p>
          <p>
            Timestamp:
            <span data-testid="messageTimestamp">{{
              transformTimeStampFormat(new Date(message.created_at))
            }}</span>
          </p>
        </div>
        <div class="message-content-info">
          <p data-testid="messageContent">{{ message.content }}</p>
        </div>
      </div>
      <div class="message-delete-icon-container">
        <span
          v-if="message.author.id === user"
          data-testid="deleteMessageIcon"
          @click.prevent="deleteComment(message.id)"
        >
          <i class="fas fa-times-circle"></i
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import DateUtils from "../utils/dateUtils";
export default {
  props: ["chatMessages", "userId", "onlineUsers"],
  data() {
    return {
      messages: this.chatMessages,
      user: this.userId,
      presentUsers: this.onlineUsers,
    };
  },
  methods: {
    transformTimeStampFormat(date) {
      return DateUtils.returnFormattedDateWithTime(date);
    },
    deleteComment(messageId) {
      this.$emit("deleteComment", messageId);
    },
  },
};
</script>

<style scoped lang="scss">
#chat-messages-container {
  width: 80%;

  margin: 1rem auto;
  border-radius: 5px;
  background-color: #ffffff;

  @include for-phone-only {
    width: 90%;
  }
}
h4 {
  margin: 1rem;
}
.individual-message-container {
  display: flex;

  margin: 1.5rem;
  min-height: 10vh;
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 1rem;

  @include for-phone-only {
    flex-direction: column;
    justify-content: center;
    margin: 1rem;
  }
}
#user-image-container {
  max-width: 50px;
  max-height: 50px;
  overflow: hidden;

  display: inline-block;
  vertical-align: middle;

  align-items: center;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
.message-info-container {
  margin-left: 1rem;
  min-width: 80%;

  @include for-phone-only {
    margin: 0;
  }

  p {
    font-weight: bold;
    margin-left: 2.5rem;
    min-width: 320px;

    @include for-phone-only {
      margin-left: 0;
      min-width: 100%;
      font-size: 0.8rem;
    }
  }
}
.message-author-info p {
  display: inline-block;

  @include for-phone-only {
    display: block;
    margin-top: 0.5rem;
  }
}
.message-author-info span {
  font-weight: normal;
  margin-left: 1.5rem;

  @include for-phone-only {
    display: block;
    margin: 0;
  }
}
.message-content-info {
  margin: 1.5rem auto;

  p {
    font-weight: normal;
  }
}
.message-delete-icon-container {
  width: 20%;
  display: flex;
  justify-content: flex-end;

  @include for-phone-only {
    justify-content: start;
  }
}
svg:hover {
  cursor: pointer;
}
#user-online-icon-container {
  margin: 0 0 0 3rem;

  @include for-phone-only {
    margin: 0;
  }

  svg {
    padding-top: 1rem;
  }
}
</style>
