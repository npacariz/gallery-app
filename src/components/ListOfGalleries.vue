<template>
  <div class="container">
    <div class="grid">
      <div class="cell" v-for="gallery in galleries" :key="gallery.id">
        <h2>
          <router-link class="box-title" :to="{name:'view-gallery', params:{id:gallery.id}}">
            {{gallery.title}}
          </router-link>
        </h2>
        <p>Author:
          <router-link class="box-title" :to="{name:'author-galleries', params:{id:gallery.user.id}}">
            {{gallery.user.first_name}} {{gallery.user.last_name}}
          </router-link>
        </p>
        <small>Created at: {{gallery.created_at | formatDate() }}</small>
        <img :src="gallery.images[0].image_url" class="responsive-image">
      </div>
    </div>
  </div>
</template>
<script>
import { mixins } from "../mixins/DateMixin.js";

export default {
  mixins: [mixins],
  name: "ListOfGalleries",
  props: {
    galleries: {
      type: Array,
      required: true
    }
  }
};
</script>
<style scoped>
.container {
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
}

.responsive-image {
  width: 100%;
  border: 1px solid #8a4419;
  border-style: inset;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cell {
  padding: 10px 10px 20px 10px;
  border: 1px solid #bfbfbf;
  background-color: #e2e1db;
  box-shadow: 10px 10px 5px #aaaaaa;
  width: 40%;
  margin: 15px;
}

.box-title {
  color: black;
  font-family: Didot, serif;
}
</style>