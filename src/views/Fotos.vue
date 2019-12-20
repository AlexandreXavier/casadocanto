<template>
    <v-container grid-list-xs>
        <v-layout row wrap>
            <v-flex  v-for="(image, index) in images" :key="image.id" xs12 md6 xl3 pa-2>
                <v-card @click="$router.push({name: 'details', params:{ id:image.id, imageProp:images[index] }})">
                    <v-img
                    height="170"
                    :src="image.url"
                    aspect-ratio="2.75"
                    ></v-img>
                    <v-card-title primary-title style="padding-top:13px">
                        <div>
                            <h3 class="headline">{{ image.comment }}</h3>
                            <div> {{ image.info }}</div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <v-btn @click="$router.push({ name: 'post'})"  color="primary" dark fixed bottom right fab>
            <v-icon>add</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import db from "../configFirebase.js";

export default {
  data() {
    return {
      images: [
        {
          id: 0,
          url: "https://s3-eu-west-1.amazonaws.com/xanioptimist/52.webp",
          comment: "Regata Principe",
          info: ""
        }
      ]
    };
  },
  mounted() {
    db
      .collection("images")
      .orderBy("created_at", "desc")
      .onSnapshot(snapShot => {
        this.images = [];
        snapShot.forEach(image => {
          this.images.push({
            id: image.id,
            url: image.data().url,
            comment: image.data().comment,
            info: image.data().info
          });
        });
      });
  }
};
</script>
