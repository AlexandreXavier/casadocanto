import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import db from "./configFirebase.js";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        loading: false,
        regatas: [
            {
                title: "Regata Figueira",
                person: "Diogo",
                due: "1st Jun 2019",
                status: "overdue",
                content:
                    "Regata da Figueira da Foz!"
            },
            {
                title: "Regata Cascais",
                person: "Tito",
                due: "1st Abr 2019",
                status: "complete",
                content:
                    "Regata da Clube Naval de Cascais"
            }
        ],
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
        ],
        loadedUsers: [
            {
                name: "xani",
                email: "xani@getnada.com",
                password: "123456",
                country: "Portugal",
                nivel: 0,
                Id: ""
            },
            {
                name: "xico",
                email: "xico@getnada.com",
                password: "123456",
                country: "Portugal",
                nivel: 3,
                Id: ""
            }
        ],
    },
    mutations: {
        setLoadedImages(state, payload) {
            state.loadedImages = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setLoadedUsers(state, payload) {
            state.loadedUsers = payload;
        },
        setLoadedRegatas(state, payload) {
            state.regatas = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
    },
    actions: {
        loadImages({ commit }) {
            commit("setLoading", true);
            const images = [];
            //const base = parseInt(Math.random() * 12, 10) + 10;
            for (let i = 75; i > 0; i--) {
                images.push({
                    id: i,
                    src:
                        "https://s3-eu-west-1.amazonaws.com/xanioptimist/" +
                        i +
                        ".webp",
                    thumbnail:
                        "https://s3-eu-west-1.amazonaws.com/xanioptimist/" +
                        i +
                        ".webp",
                    caption: ""
                });
            }
            //Carrega a variavel images com as imagens da amazon s3
            commit("setLoadedImages", images);
            commit("setLoading", false);
        },
        loadRegatas({ commit }) {
            commit("setLoading", true);
            db.collection("regatas")
                .get()
                .then(snap => {
                    const regatas = [];
                    snap.forEach(doc => {
                        regatas.push({
                            id: doc.id,
                            title: doc.data().title,
                            person: doc.data().person,
                            due: doc.data().due,
                            status: doc.data().status,
                            content: doc.data().content
                        })
                    });
                    commit("setLoadedRegatas", regatas);
                    commit("setLoading", false);
                })
                .catch(error => {
                    alert(error);
                    commit("setLoading", false);
                });
        },
        signUserUp({ commit }, payload) {
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    alert(error);
                });
        },
        signUserIn({ commit }, payload) {
            //alert("signUserIn " + payload.email + " - " + payload.password)
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid,
                        email: user.email
                    };
                    //alert("USER_ID " + newUser);
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    alert(error);
                });
        },
        signUserInGoogle({ commit }) {
            //alert("DENTRO GOOGLE")
            commit("setLoading", true);
            commit("clearError");
            firebase
                .auth()
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                .then(user => {
                    commit("setLoading", false);
                    const newUser = {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,
                        registeredMeetups: ["Google"]
                    };
                    commit("setUser", newUser);
                })
                .catch(error => {
                    commit("setLoading", false);
                    commit("setError", error);
                    alert(error);
                });
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', {
                id: payload.uid,
                name: payload.displayName,
                email: payload.email,
                photoUrl: payload.photoURL
            })
        },
        logout({ commit }) {
            firebase.auth().signOut();
            commit("setUser", null);
        },
        clearError({ commit }) {
            commit("clearError");
        },
        resetPasswordWithEmail({ commit }, payload) {
            const { email } = payload
            commit('setLoading', true)
            firebase.auth().sendPasswordResetEmail(email)
                .then(
                    () => {
                        commit('setLoading', false)
                        //console.log('Email Sent')
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        //console.log(error)
                    }
                )
        }
    },
    getters: {
        loadedImages(state) {
            return state.loadedImages.sort((imagesA, imagesB) => {
                return imagesA.date > imagesB.date;
            });
        },
        loadedRegatas(state) {
            return state.regatas
        },
        featuredImages(state, getters) {
            return getters.loadedImages.slice(0, 75);
        },
        loadedImage(state) {
            return imageId => {
                return state.loadedImages.find(image => {
                    return image.id === imageId;
                });
            };
        },
        user(state) {
            return state.user;
        },
        error(state) {
            return state.error;
        },
        profilePicUrl() {
            return firebase.auth().currentUser.photoURL || "./profile.png";
        }
    }
})
