<template>
  <div>
    <h1 class="title-style">{{gallery.title}}</h1>
    <h5 v-if="gallery.user">
      created by:
      <router-link :to="{name:'author-galleries', params:{id:gallery.user.id}}">
        {{gallery.user.first_name}} {{gallery.user.last_name}}
      </router-link>
    </h5>
    <p>
      {{gallery.description}}
    </p>
    <div class="carousel-box">
      <b-carousel id="carousel1" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab" :interval="4000"
        img-width="1024" img-height="480" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
        <div v-for="image in gallery.images" :key="image.id">
          <a :href="image.image_url" target="_blank">
            <b-carousel-slide>
              <img slot="img" class="d-block img-fluid w-100" width="1024" height="480" :src="image.image_url" alt="image slot">
            </b-carousel-slide>
          </a>
        </div>
      </b-carousel>
    </div>
    <!-- Button for deleting and editing gallery -->
    <div v-if="isAuthenticated && getUserId === gallery.user_id">
      <button class="btn btn-custom" @click="deleteGallery">Delete Gallery</button>
      <router-link type="button" class="btn btn-custom" :to="{name:'edit-gallery', params:{id:gallery.id}}">
        Edit Gallery
      </router-link>
    </div>
    <!-- Comments -->
    <div class="comments-section">
      <h5>Comments: </h5>
      <ul class="list-group">
        <li class="list-group-item" v-for="(comment, index) in gallery.comments" :key="comment.id">
          <p>{{comment.body}}</p>
          <p>Commented by: {{comment.user.first_name}} {{comment.user.last_name}}</p>
          <small>{{comment.created_at | diffForHumans}}</small>
          <div v-if="comment.user_id === getUserId">
            <button @click="deleteComment(comment.id, index)">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </li>
      </ul>
    </div>
    <!-- adding comment form -->
    <div v-if="isAuthenticated">
      <form @submit.prevent="addComment">
        <div class="form-group">
          <textarea v-model="body" id="" cols="10" rows="7" placeholder="Comment..."></textarea>
          <p class="alert alert-danger" v-if="errors.body">{{errors.body[0]}}</p>
        </div>
        <button type="submit" class="btn btn-custom">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js";
import { commentService } from "./../services/CommentService.js";
import { mapGetters } from "vuex";
import { mixins } from "../mixins/DateMixin.js";
export default {
  name: "MyGalleries",
  mixins: [mixins],
  data() {
    return {
      slide: 0,
      sliding: null,
      gallery: {},
      body: "",
      errors: {}
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    deleteGallery() {
      if (confirm("Are you sure you want to delete gallery?")) {
        galleryService.delete(this.gallery.id).then(() => {
          this.$router.push({ name: "all-galleries" });
        });
      }
    },
    deleteComment(id, index) {
      if (confirm("Are you sure you want to delete comment?")) {
        commentService.delete(id).then(() => {
          this.gallery.comments.splice(index, 1);
        });
      }
    },
    addComment() {
      commentService
        .addComment(this.gallery.id, this.body)
        .then(response => {
          this.gallery.comments.push(response.data[0]);
          this.body = "";
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getUserId"])
  },
  beforeRouteEnter(to, from, next) {
    galleryService.show(to.params.id).then(response => {
      next(vm => {
        vm.gallery = response.data;
      });
    });
  }
};
</script>
<style scoped>
.comments-section {
  margin: 0 auto;
  margin-top: 10%;
  max-width: 600px;
  background-color: none;
}

.list-group-item {
  background-color: transparent !important;
  border: #48494b solid 2px !important;
}

.form-group {
  margin-top: 3% !important;
}

textarea {
  width: 600px;
}
</style>