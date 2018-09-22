<template>
  <div>
    <div  v-if="galleries[0]">
      <h1 class="title-style">Galleries of {{galleries[0].user.first_name}}  {{galleries[0].user.last_name}}</h1>
    </div>
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
  name: "AuhtorGalleries",
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
        .getAuthorGalleries(this.$route.params.id, this.page, this.searchTerm)
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
        .getAuthorGalleries(this.$route.params.id, this.page, this.searchTerm)
        .then(response => {
          this.galleries = response.data.galleries;
          this.count = response.data.count;
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    galleryService.getAuthorGalleries(to.params.id).then(response => {
      next(vm => {
        vm.galleries = response.data.galleries;
        vm.count = response.data.count;
      });
    });
  }
};
</script>