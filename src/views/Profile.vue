<template>
  <v-container>
      <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="user.photoUrl"
      >
        <v-card-title>{{ user.name }}</v-card-title>
      </v-img>

      <v-card-subtitle class="pb-0">{{user.email}}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitehaven Beach</div>
        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="orange"
          text
        >
          Share
        </v-btn>

        <v-btn
          color="orange"
          text
        >
          Explore
        </v-btn>
      </v-card-actions>
    </v-card>


  </v-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
