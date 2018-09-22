<template>
  <div>
    <h1 class="title-style">All Galleries</h1>
    <searach @searchTerm="searchDatabase"></searach>
    <div v-if="!errors">
      <list-of-galleries :galleries="galleries"></list-of-galleries>
    </div>
    <div v-else>
      <h4>{{errors}}</h4>
    </div>
    <div v-if="count > galleries.length && !errors">
      <button class="btn btn-custom" @click="loadMore">Load More</button>
    </div>
  </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js";
import ListOfGalleries from "./../components/ListOfGalleries.vue";
import Searach from "./../components/Searach.vue";

export default {
  name: "AllGalleries",
  components: {
    ListOfGalleries,
    Searach
  },
  data() {
    return {
      galleries: [],
      page: 1,
      count: 0,
      searchTerm: "",
      errors: null
    };
  },
  methods: {
    loadMore() {
      this.page += 1;
      galleryService.getAll(this.page, this.searchTerm).then(response => {
        this.galleries.push(...response.data.galleries);
      });
    },
    searchDatabase(value) {
      this.searchTerm = value;
      this.searchGalleries();
    },
    searchGalleries() {
      this.page = 1;
      galleryService
        .getAll(this.page, this.searchTerm)
        .then(response => {
          this.errors = null;
          this.galleries = response.data.galleries;
          this.count = response.data.count;
        })
        .catch(error => {
          this.errors = error.response.data.message;
          this.galleries = [];
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.searchGalleries();
    });
  }
};
</script>
<style>
</style>