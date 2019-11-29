import Vue from 'vue'
import Vuex from 'vuex'
//import firebase from "./configFirebase.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedImages: [
            {
                id: "000",
                src: "https://s3-eu-west-1.amazonaws.com/xanivouga/16.jpg",
                thumbnail: "https://s3-eu-west-1.amazonaws.com/xanivouga/16.jpg",
                caption: ""
            },
            {
                id: "111",
                src: "https://s3-eu-west-1.amazonaws.com/xanivouga/9.jpg",
                thumbnail: "https://s3-eu-west-1.amazonaws.com/xanivouga/9.jpg",
                caption: ""
            }
        ]
    },
    mutations: {
        setLoadedImages(state, payload) {
            state.loadedImages = payload;
        },
    },
    actions: {
        loadImages({ commit }) {
            const images = [];
            const base = parseInt(Math.random() * 12, 10) + 10;
            for (let i = 0; i < 65; i++) {
                images.push({
                    id: i,
                    src:
                        "https://s3-eu-west-1.amazonaws.com/xanivouga/" +
                        (base + i) +
                        ".jpg",
                    thumbnail:
                        "https://s3-eu-west-1.amazonaws.com/xanivouga/" +
                        (base + i) +
                        ".jpg",
                    caption: ""
                });
            }
            //Carrega a variavel images com as imagens da amazon s3
            commit("setLoadedImages", images);
        }
    },
    getters: {
        loadedImages(state) {
            return state.loadedImages.sort((imagesA, imagesB) => {
                return imagesA.date > imagesB.date;
            });
        },
        featuredImages(state, getters) {
            return getters.loadedImages.slice(0, 66);
        },
        loadedImage(state) {
            return imageId => {
                return state.loadedImages.find(image => {
                    return image.id === imageId;
                });
            };
        },
        /*  profilePicUrl() {
             return firebase.auth().currentUser.photoURL || "./profile.png";
         } */
    }
})
