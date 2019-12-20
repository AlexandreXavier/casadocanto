<template>
  <div class="regatas">
    <h2 class="subheading grey--text">Regatas</h2>

     <v-container class="my-5">

      <v-layout row justify-start class="mb-3">

          <v-btn small text color="grey"
          @click="sortBy('title')"
          >
            <v-icon small left>folder</v-icon>
            <span class="caption text-lowercase">By regata name</span>
          </v-btn>

          <v-btn small text color="grey" @click="sortBy('person')">
            <v-icon small left>person</v-icon>
            <span class="caption text-lowercase">By Person</span>
          </v-btn>

      </v-layout>

<v-card text v-for="regata in regatas" :key="regata.title">
        <v-layout row wrap :class="`pa-3 project ${regata.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Regata</div>
            <div>{{ regata.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ regata.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>
                     <!-- <Calendar @projectAdded="snackbar = true" /> -->
                <!-- {{ regata.due }} -->
                <Calendar/>
            </div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
               <v-chip small :class="`${regata.status} white--text my-2 caption`">{{ regata.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
  </div>
</template>

<script>
//import db from "@/fb";
//import db from "../configFirebase.js";
//import Popup from "../components/Popup";
import Calendar from "../components/Calendar";
export default {
  components: { Calendar },
  //components: { Popup },
  data: () => ({
    snackbar: false
  }),
  methods: {
    sortBy(prop) {
      this.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    }
  },
  computed: {
    regatas() {
      return this.$store.getters.loadedRegatas;
      //return this.$store.state.regatas;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid #ffaa2c;
}
.project.overdue {
  border-left: 4px solid #f83e70;
}
.v-chip.complete {
  background: #3cd1c2;
}
.v-chip.ongoing {
  background: #ffaa2c;
}
.v-chip.overdue {
  background: #f83e70;
}
</style>
