<template>
  <v-app>
      <v-app-bar
      min-height="100"
      max-height="400"
        absolute
        color="#004d40"
        dark
        shrink-on-scroll
        prominent
        src="https://s3-eu-west-1.amazonaws.com/xanivouga/54.jpg"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-3"
      >
        <template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(23,140,17,.7), rgba(25,32,27,.7)"
          ></v-img>
        </template>

        <v-btn icon v-if="$route.name !== 'home'" @click="$router.go(-1)">
            <v-icon>arrow_back</v-icon>
        </v-btn>

        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>casadocanto.pt</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu
          bottom
          left
        >
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              color="red"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

         <v-btn icon large v-if="$route.name=='post'" @click="$router.push({name:'camera'})">
        <v-icon>camera_alt</v-icon>
        </v-btn>

      </v-app-bar>
       <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="200"
      >
        <v-container style="height: 1000px;"></v-container>
      </v-sheet>

    <v-content>
      <router-view></router-view>
    </v-content>


  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {
    //Home
  },
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ],
    icons: [
      {
        icon: "fab fa-facebook",
        link: "https://www.facebook.com/portocaro.dos"
      },
      {
        icon: "fab fa-youtube",
        link: "https://www.youtube.com/channel/UC6D7Ogkw37GpnSiixGTyuqA"
      },
      {
        icon: "fab fa-instagram",
        link: "https://www.instagram.com/portocarodos/"
      },
      {
        icon: "fab fa-twitter",
        link: "https://twitter.com/portocarodos/"
      }
    ]
  }),
  mounted() {},
  methods: {}
};
</script>
