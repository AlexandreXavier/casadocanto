<template>
  <v-app>
<!-- opcao 'app' coloca a lista tentro da applicacao -->    <v-navigation-drawer v-model="drawer" app >

    <v-list>
          <v-list-item>
            <v-list-item-avatar>
                    <!-- <v-btn fab dark color="white"
                        @click="dialog = !dialog"
                        v-if="userIsAuthenticated">
                        <v-avatar size="52" >
                            <v-img :src="profilePicUrl">
                            </v-img>
                        </v-avatar>
                    </v-btn> -->
              <v-img src="profile.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title">Anonimo</v-list-item-title>
                <v-list-item-subtitle>
                  anonimo@portocaro.pt
                </v-list-item-subtitle>
            </v-list-item-content>

            <!-- <v-list-item-action>
              <v-icon>mdi-menu-down</v-icon>
            </v-list-item-action> -->
          </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <v-list nav dense>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title" @click="$router.push({ name: item.link})" > </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

    </v-navigation-drawer>

    <v-app-bar app color="primary" dark >

      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"/>

      <!-- So mostra PORTOCARODOS quando nao e utilizador -->
            <router-link to="/" tag="span" style="cursor: pointer" class="font-weight-regular title hidden-md-and-down" >
                    <div v-if="userIsAuthenticated"> </div>
                    <div v-else>PORTOCARODOS &copy;</div>
            </router-link>
      <v-spacer></v-spacer>
      <v-btn icon large v-if="$route.name=='post'" @click="$router.push({name:'camera'})">
        <v-icon>camera_alt</v-icon>
     </v-btn>
      <v-btn icon v-if="$route.name !== 'home'" @click="$router.go(-1)">
            <v-icon large color="red">arrow_back</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer color="primary" app >
        <span class="white--text">&copy;xani</span>
        <v-spacer></v-spacer>
        <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on }">
            <v-btn color="red" v-on="on">
                Redes Sociais
            </v-btn>
            </template>
            <v-sheet class="text-center" height="100px">
                <!-- <div>
                Politica de Redes Sociais para a Equipa PortocaroDos
                </div> -->
                <v-btn v-for="(icon,i) in icons"
                 :key="i"
                 :href="icon.link"
                 icon
                 class="hidden-xs-and-down">
                    <v-icon size="28px">{{ icon.icon }}</v-icon>
                </v-btn>

             <v-spacer></v-spacer>
             <v-btn class="mt-6" small flat color="red" @click="sheet = !sheet">
                    close
                </v-btn>
            </v-sheet>
        </v-bottom-sheet>

    </v-footer>

  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    sheet: false,
    item: 0,
    items: [
      { icon: "mdi-image", title: "Fotos", link: "home" },
      { icon: "mdi-folder", title: "Treino", link: "fotos" },
      { icon: "mdi-help", title: "Ajuda", link: "ajuda" }
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
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
    /* profilePicUrl() {
      return this.$store.getters.profilePicUrl;
    } */
  },
  mounted() {},
  methods: {}
};
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://code.getmdl.io/1.2.1/material.blue-red.min.css");
</style>

