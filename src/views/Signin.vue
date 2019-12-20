<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">

                    <v-flex xs12>
                        <v-text-field
                        prepend-icon="person"
                        name="email"
                        label="Mail"
                        id="email"
                        v-model="email"
                        type="email"
                        :rules="emailRules"
                        :counter="20"
                        required></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                        <v-text-field
                        prepend-icon="lock"
                        name="password"
                        label="Password"
                        id="password"
                        v-model="password"
                        type="password"
                        :rules="passRules"
                        :counter="20"
                        required></v-text-field>
                    </v-flex>



                <v-layout>
                    <v-btn   type="submit" :disabled="loading" :loading="loading">
                      Sign in
                      <v-icon right>lock_open</v-icon>
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                    <v-spacer></v-spacer>

                      <v-btn  color="grey lighten-2" dark :disabled="loading" :loading="loading" @click.prevent="onResetPassword">Reset Password By Email
                        <v-icon right dark>email</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
            </v-layout>
            <br />
             <v-flex xs12>
                    <div align-center justify-center>
                        <!-- button facebook -->
                        <v-btn color="light-blue darken-4"
                            center
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninFacebook">
                            <svg width="24px" height="24px" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio>
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard-1" transform="translate(-332.000000, -456.000000)">
                                        <g id="facebook_buttn" transform="translate(332.000000, 456.000000)">
                                            <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                            <path d="M113.377146,0 L6.62285402,0 C2.96477253,0 0,2.96432291 0,6.62285402 L0,113.377146 C0,117.034778 2.96477253,120 6.62285402,120 L64.0955585,120 L64.0955585,73.5298658 L48.45744,73.5298658 L48.45744,55.419305 L64.0955585,55.419305 L64.0955585,42.0634409 C64.0955585,26.5638044 73.5622382,18.1240492 87.388851,18.1240492 C94.011705,18.1240492 99.7043021,18.6172788 101.362938,18.837591 L101.362938,35.0354823 L91.7735131,35.0399784 C84.2536737,35.0399784 82.7978149,38.6130823 82.7978149,43.8565123 L82.7978149,55.419305 L100.731676,55.419305 L98.3963671,73.5298658 L82.7978149,73.5298658 L82.7978149,120 L113.377146,120 C117.034778,120 120,117.034778 120,113.377146 L120,6.62285402 C120,2.96432291 117.034778,0 113.377146,0" id="Imported-Layers-Copy" fill="#FFFFFF"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

                        <!-- button twitter -->
                        <v-btn  color="info"
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninTwitter">
                            <svg width="24px" height="24px" viewBox="0 0 120 98" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="Artboard-1" transform="translate(-332.000000, -286.000000)">
                                        <g id="twitter_buttn" transform="translate(332.000000, 273.000000)">
                                            <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                            <path d="M120,24.8777205 C115.584769,26.8358023 110.839899,28.1591865 105.859761,28.7543802 C110.943048,25.7073046 114.846483,20.8825487 116.684736,15.1338381 C111.928015,17.954863 106.659058,20.0038041 101.051245,21.1081605 C96.560079,16.3233476 90.161747,13.3333333 83.0808735,13.3333333 C69.4840338,13.3333333 58.4606606,24.3562676 58.4606606,37.9522294 C58.4606606,39.8817806 58.6788105,41.7608545 59.0984308,43.562676 C38.6371118,42.5360108 20.4964337,32.7346282 8.35378031,17.8398625 C6.2346099,21.4759867 5.02052014,25.7051099 5.02052014,30.2169063 C5.02052014,38.7581111 9.36727752,46.2937196 15.9732251,50.7085117 C11.9372325,50.580782 8.14133655,49.4733531 4.82168331,47.6293939 C4.81992758,47.7321043 4.81992758,47.8352537 4.81992758,47.9388419 C4.81992758,59.8672958 13.3062658,69.8179158 24.5688577,72.0793006 C22.5027982,72.6420132 20.3278832,72.9426826 18.0823,72.9426826 C16.4959947,72.9426826 14.9535828,72.788617 13.4506749,72.5011156 C16.5833425,82.2823073 25.6754088,89.4000512 36.4485899,89.598888 C28.0228245,96.201763 17.4072205,100.137679 5.87292878,100.137679 C3.88587732,100.137679 1.92603972,100.021361 0,99.7939939 C10.8952047,106.77918 23.8362778,110.854676 37.739493,110.854676 C83.0233732,110.854676 107.786239,73.3403563 107.786239,40.8070522 C107.786239,39.7395662 107.762537,38.6777863 107.715132,37.6221515 C112.524964,34.1510662 116.699221,29.8148433 120,24.8777205" id="Fill-1" fill="#FFFFFF"></path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

                        <!-- button google -->
                        <v-btn  color="white"
                            dark
                            :disabled="loading"
                            :loading="loading"
                            @click.prevent="onSigninGoogle">
                            <svg width="24px" height="24px" viewBox="0 0 118 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Artboard-1" transform="translate(-332.000000, -639.000000)">
                                            <g id="google_buttn" transform="translate(332.000000, 639.000000)">
                                                <g id="logo_googleg_48dp">
                                                    <path d="M117.6,61.3636364 C117.6,57.1090909 117.218182,53.0181818 116.509091,49.0909091 L60,49.0909091 L60,72.3 L92.2909091,72.3 C90.9,79.8 86.6727273,86.1545455 80.3181818,90.4090909 L80.3181818,105.463636 L99.7090909,105.463636 C111.054545,95.0181818 117.6,79.6363636 117.6,61.3636364 L117.6,61.3636364 Z" id="Shape" fill="#4285F4"></path>
                                                    <path d="M60,120 C76.2,120 89.7818182,114.627273 99.7090909,105.463636 L80.3181818,90.4090909 C74.9454545,94.0090909 68.0727273,96.1363636 60,96.1363636 C44.3727273,96.1363636 31.1454545,85.5818182 26.4272727,71.4 L6.38181818,71.4 L6.38181818,86.9454545 C16.2545455,106.554545 36.5454545,120 60,120 L60,120 Z" id="Shape" fill="#34A853"></path>
                                                    <path d="M26.4272727,71.4 C25.2272727,67.8 24.5454545,63.9545455 24.5454545,60 C24.5454545,56.0454545 25.2272727,52.2 26.4272727,48.6 L26.4272727,33.0545455 L6.38181818,33.0545455 C2.31818182,41.1545455 0,50.3181818 0,60 C0,69.6818182 2.31818182,78.8454545 6.38181818,86.9454545 L26.4272727,71.4 L26.4272727,71.4 Z" id="Shape" fill="#FBBC05"></path>
                                                    <path d="M60,23.8636364 C68.8090909,23.8636364 76.7181818,26.8909091 82.9363636,32.8363636 L100.145455,15.6272727 C89.7545455,5.94545455 76.1727273,0 60,0 C36.5454545,0 16.2545455,13.4454545 6.38181818,33.0545455 L26.4272727,48.6 C31.1454545,34.4181818 44.3727273,23.8636364 60,23.8636364 L60,23.8636364 Z" id="Shape" fill="#EA4335"></path>
                                                    <path d="M0,0 L120,0 L120,120 L0,120 L0,0 Z" id="Shape"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            <span slot="loader" class="custom-loader">
                            <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>
                    </div>
             </v-flex>
<br />



              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      emailRules: [
        v => !!v || "E-mail é necessário",
        v => /.+@.+/.test(v) || "O e-mail tem que ser valido"
      ],
      passRules: [
        v => v.length <= 10 || "A password tem que ter menos que 8 caracteres",
        v => v.length > 2 || "A password tem que ter mais que 3 caracteres"
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/profile");
      }
    }
  },
  methods: {
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onSigninGoogle() {
      this.$store.dispatch("signUserInGoogle");
    },
    onSigninFacebook() {
      //this.$store.dispatch('signUserInFacebook')
    },
    onSigninTwitter() {
      //this.$store.dispatch('signUserInTwitter')
    },
    onResetPassword() {
      if (this.email === "") {
        return this.$store.dispatch("setError", {
          message: "Email can not be blank"
        });
      }
      this.$store.dispatch("resetPasswordWithEmail", { email: this.email });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    }
  }
};
</script>
