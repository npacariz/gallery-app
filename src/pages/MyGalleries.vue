<template>
    <div>
        <h1>My Galleries</h1>
    </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js"
export default {
  name: "MyGalleries",
  data() {
      return {
          galleries: []
      }
  },
  beforeRouteEnter(to, from, next) {
      galleryService.getAll().then(()=>{
           
          next();
         
      })
      
  }
};
</script>

