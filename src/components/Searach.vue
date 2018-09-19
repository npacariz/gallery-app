<template>
    <div>
        <input type="text" @input="clearSearch" v-model="searchTerm">
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
    },
    clearSearch() {
      if (event.target.value === "") {
        this.filterGalleries();
      }
    }
  }
};
</script>

