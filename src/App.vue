<template>
  <v-app>
<!-- opcao 'app' coloca a lista dentro da applicacao e fixa o navigation-->     <v-navigation-drawer v-model="drawer" app >

        <v-list>
          <v-list-item>
            <v-list-item-avatar>
                    <v-btn fab dark color="white"
                        @click="dialog = !dialog"
                        v-if="userIsAuthenticated">
                        <v-avatar size="62" >
                            <v-img :src="user.photoUrl">
                            </v-img>
                        </v-avatar>
                    </v-btn>
                    <v-btn fab dark color="white"
                        @click="dialog = !dialog"
                        v-else>
                        <v-avatar size="62" >
                            <v-img src="./profile.png">
                            </v-img>
                        </v-avatar>
                    </v-btn>

            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="title" v-if="userIsAuthenticated">
                  {{user.name}}
              </v-list-item-title>
              <v-list-item-subtitle v-if="userIsAuthenticated">
                  {{user.email}}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

        </v-list>
        <v-divider></v-divider>
<!-- menu -->
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

<!-- sair -->
        <v-list-item
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-item-icon>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Sair</v-list-item-content>
        </v-list-item>

    </v-navigation-drawer>

<!-- barra -->
    <v-app-bar app color="primary" dark >

      <v-app-bar-nav-icon  @click.stop="drawer = !drawer"/>
      <!-- So mostra PORTOCARODOS quando nao e utilizador -->
        <v-toolbar-title class="display-1 hidden-xs-and-down">
            <span class="font-weight-light text-capitalize">Portocaro</span>
            <span class="text-uppercase red--text">Dos</span>
        </v-toolbar-title>
      <v-spacer></v-spacer>


      <!-- camera -->
      <v-btn icon large v-if="$route.name=='post'" @click="$router.push({name:'camera'})">
        <v-icon>camera_alt</v-icon>
     </v-btn>

     <!-- sair -->
     <v-btn v-if="userIsAuthenticated"
            text
            @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>
            Sair
     </v-btn>
     <!-- back -->
      <v-btn icon v-if="$route.name !== 'home'" @click="$router.go(-1)">
            <v-icon large color="red">arrow_back</v-icon>
      </v-btn>
    </v-app-bar>

<!-- main -->
    <v-content>
      <v-container class="fill-height" flui >
        <router-view></router-view>
      </v-container>
    </v-content>

<!-- rodape -->
    <v-footer color="grey-light2" app >
        <span class="grey--text">&copy;xani</span>
        <v-spacer></v-spacer>
        <v-bottom-sheet v-model="sheet">
            <template v-slot:activator="{ on }">
            <v-btn text color="red" v-on="on">
                Redes Sociais
            </v-btn>
            </template>
            <v-sheet class="text-center" height="40px">
                <v-btn v-for="(icon,i) in icons"
                 :key="i"
                 :href="icon.link"
                 icon
                 class="hidden-xs-and-down">
                    <v-icon size="28px">{{ icon.icon }}</v-icon>
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
    dialog: false,
    drawer: false,
    sheet: false,
    tab: null,
    itemsTab: ["Login", "SigIn"],
    item: 0,
    items: [
      { icon: "lock_open", title: "Entrar", link: "signin" },
      { icon: "mdi-car", title: "Regatas", link: "regatas" },
      { icon: "mdi-image", title: "Fotos", link: "home" },
      { icon: "mdi-dumbbell", title: "Treino", link: "fotos" },
      { icon: "face", title: "Registar", link: "signup" },
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
    },
    /* profilePicUrl() {
      return this.$store.getters.profilePicUrl;
    }, */
    user() {
      return this.$store.state.user;
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
@import url("https://code.getmdl.io/1.2.1/material.blue-red.min.css");
</style>

