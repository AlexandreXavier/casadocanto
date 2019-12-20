<template>
   <div class="camera-modal">
        <video ref="video" class="camera-stream"/>
        <div class="camera-modal-container">
        </div>
            <v-btn large class="take-picture-button" @click="capture" color="primary" dark fab>
                <v-icon>camera</v-icon>
            </v-btn>
    </div>
</template>

<script>
import db from "../configFirebase.js";
//import postImage from "./mixins/postImage.js";

export default {
  data() {
    return {
      mediaStream: null
    };
  },
  mounted() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(mediaStream => {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
        })
        .catch(error => alert("getUserMedia() error:", error));
    } else if (navigator.getUserMedia) {
      // Standard
      navigator.getUserMedia(
        { video: true },
        function(mediaStream) {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
        },
        errBack
      );
    } else if (navigator.webkitGetUserMedia) {
      // WebKit-prefixed
      navigator.webkitGetUserMedia(
        { video: true },
        function(mediaStream) {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = window.webkitURL.createObjectURL(
            mediaStream
          );
          this.$refs.video.play();
        },
        errBack
      );
    } else if (navigator.mozGetUserMedia) {
      // Mozilla-prefixed
      navigator.mozGetUserMedia(
        { video: true },
        function(mediaStream) {
          this.mediaStream = mediaStream;
          this.$refs.video.srcObject = window.URL.createObjectURL(mediaStream);
          this.$refs.video.play();
        },
        errBack
      );
    }
  },
  methods: {
    capture() {
      const mediaStreamTrack = this.mediaStream.getVideoTracks()[0];
      const imageCapture = new window.ImageCapture(mediaStreamTrack);

      return imageCapture.takePhoto().then(blob => {
        db.storage
          .ref()
          .child(`images/${new Date().getTime()}`)
          .put(blob)
          .then(res => {
            res.ref.getDownloadURL().then(pictureUrl => {
              this.$router.push({
                name: "post",
                params: { pictureUrl }
              });
            });
          })
          .catch(err => {
            this.$router.go(-1);
          });
      });
    }
  },
  destroyed() {
    const tracks = this.mediaStream.getTracks();
    tracks.map(track => track.stop());
  }
};
</script>

<style scoped>
.camera-modal {
  width: 100%;
  height: 100%;
  top: 20;
  left: 0;
  position: absolute;
  background-color: white;
  z-index: 10;
}
.camera-stream {
  width: 100%;
  max-height: 100%;
}
.camera-modal-container {
  position: absolute;
  bottom: 0;
  width: 100%;
  align-items: center;
  margin-bottom: 24px;
}

.take-picture-button {
  display: block;
  margin: auto;
  margin-top: 20px;
}
</style>

