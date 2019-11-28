<template>
    <v-container grid-list-xs>
        <v-layout column v-if="!!image">
            <v-flex>
                <v-img
                :src="image.url"
                ></v-img>
            </v-flex>
            <v-flex>
                <h1>{{ image.comment }}</h1>
                <p class="subtitle">{{ image.info }}</p>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import firebase from "../configFirebase.js";
export default {
  props: {
    imageProp: {
      type: Object
    }
  },
  data() {
    return {
      image: undefined
    };
  },
  mounted() {
    if (!this.imageProp) {
      this.image = this.imageProp;
    } else {
      const id = this.$route.params.id;
      firebase.db
        .doc(`images/${id}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            this.image = doc.data();
          } else {
            // doc.data() will be undefined in this case
            alert("No such document!");
          }
        })
        .catch(error => {
          alert("Error getting document:", error);
        });
    }
  }
};
</script>

