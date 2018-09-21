<template>
    <div>
        <div class="input-group mb-3">
           <input type="text"  @input="clearSearch" v-model="searchTerm" class="form-control" placeholder="Search..." aria-label="Search..." aria-describedby="basic-addon2">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary input-button"  @click="filterGalleries" type="button">Filter</button>
        </div>
</div>
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
<style scoped>
.input-group {
  width: 30% !important;
  margin: 0 auto;
}

input {
  box-shadow: inset 0 0 10px #000000;
}
input:focus {
  outline: 0;
  box-shadow: none;
}
.input-button {
  color: #48494b;
  font-weight: 900;
}
</style>
