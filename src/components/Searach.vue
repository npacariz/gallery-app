<template>
    <div>
        <input type="text" v-model="searchTerm">
        <button @click="filterGalleries">Filter</button>
    </div>  
</template>
<script>
export default {
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    filterGalleries() {
      this.$emit("searchTerm", this.searchTerm);
    }
  }
};
</script>

