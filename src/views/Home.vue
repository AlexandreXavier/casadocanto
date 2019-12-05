<template>
<v-card  tile>
    <v-container fluid>
            <v-row>
              <v-col
                v-for="card in cards"
                :key="card.id"
                cols="12"
                md="4"
              >
                <v-img :src="card.src"
                        :lazy-src="card.src"
                        aspect-ratio="1"
                        @click="$router.push({name: 'fotodetails', params:{ id:card.id,src:card.src }})"
                >
                </v-img>
              </v-col>
            </v-row>
          </v-container>
</v-card>
</template>

<script>
export default {
  data: () => ({
    currentImage: null,
    currentIndex: 0,
    card: [{ id: "", src: null, thumbnail: "", caption: "" }]
  }),
  computed: {
    cards() {
      return this.$store.getters.featuredImages;
    }
  }
};
</script>
