<template>
  <div>
    <h1 class="title-style">My Galleries</h1>
    <searach @searchTerm="searchDatabase"></searach>
    <div v-if="galleries.length">
      <list-of-galleries :galleries="galleries"></list-of-galleries>
      <div v-if="count > galleries.length">
        <button class="btn btn-custom" @click="loadMore">Load More</button>
      </div>
     </div>
     <div v-if="!galleries.length">
      <h4>No galleries found</h4>
    </div>
  </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js";
import ListOfGalleries from "./../components/ListOfGalleries.vue";
import Searach from "./../components/Searach.vue";

export default {
  name: "MyGalleries",
  components: {
    ListOfGalleries,
    Searach
  },
  data() {
    return {
      galleries: [],
      page: 1,
      count: 0,
      searchTerm: ""
    };
  },
  methods: {
    loadMore() {
      this.page += 1;
      galleryService
        .getMyGalleries(this.page, this.searchTerm)
        .then(response => {
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
        .getMyGalleries(this.page, this.searchTerm)
        .then(response => {
          this.galleries = response.data.galleries;
          this.count = response.data.count;
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    galleryService.getMyGalleries().then(response => {
      next(vm => {
        vm.galleries = response.data.galleries;
        vm.count = response.data.count;
      });
    });
  }
};
</script>