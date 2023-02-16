<template>
  <div>
    <feather-icon
      v-b-tooltip.hover.top="'View messages'"
      icon="MessageCircleIcon"
      size="50"
      class="rounded-circle p-2 text-white bg-primary cursor-pointer"
      @click="$refs['MessengerModal'].show()"
    />

    <b-modal title="Messenger" ref="MessengerModal">
      <b-card p-3>
        <b-row
          v-for="data in messages"
          :key="data.id"
          :align-h="data.fromUser == 1 ? 'start' : 'end'"
        >
          <b-badge
            :class="data.fromUser == 1 ? 'bg-primary' : 'bg-secondary'"
            class="p-2"
            pill
          >
            {{ data.message }}
          </b-badge>
        </b-row>
      </b-card>
      <span>Select a Message</span>
      <b-card p-3>
        <b-badge
          v-for="{ message, index } in predeterminedMessages"
          :key="index"
          class="bg-primary p-2 mr-1 mb-1 cursor-pointer"
          pill
          @click="sendMessage(message)"
        >
          {{ message }}
        </b-badge>
      </b-card>

      <!-- <b-form-textarea
        id="textarea"
        v-model="text"
        placeholder="Enter a new message..."
        rows="3"
        max-rows="6"
      ></b-form-textarea> -->
      <!-- <template #modal-footer>
        <b-button @click="sendMessage()"> Enviar </b-button>
      </template> -->
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "",
      predeterminedMessages: [
        {
          message: "Mensaje Predeterminado 1",
        },
        {
          message: "Mensaje Predeterminado 2",
        },
        {
          message: "Mensaje Predeterminado 3",
        },
        {
          message: "Mensaje Predeterminado 4",
        },
        {
          message: "Mensaje Predeterminado 5",
        },
        {
          message: "Mensaje Predeterminado 6",
        },
      ],
      messages: [
        {
          fromUser: 1,
          message: "Lorem Ipsum Dolor Sit Amet",
        },
        {
          fromUser: 2,
          message: "Lorem Ipsum Dolor Sit Amet",
        },
      ],
    };
  },
  methods: {
    sendMessage(predeterminedMessage) {
      this.messages.push({
        fromUser: 1,
        message: predeterminedMessage,
      });
      this.text = "";
    },
  },
};
</script>