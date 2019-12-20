<template>
    <v-img :src="image"></v-img>
</template>

<script>
export default {
  data() {
    return {
      image: undefined
    };
  },
  mounted() {
    this.image = this.$route.params.src;
  }
};
</script>

