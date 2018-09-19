<template>
    <div>
        <h1>{{gallery.title}}</h1>
        <h5 v-if="gallery.user">
            created by: {{gallery.user.first_name}} {{gallery.user.last_name}}
        </h5>
        <p>
            {{gallery.description}}
        </p>
        <b-carousel id="carousel1"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
            <div v-for="image in gallery.images" :key="image.id">   
              <a :href="image.image_url"  target="_blank">
                <b-carousel-slide>
                    <img slot="img" class="d-block img-fluid w-100" width="1024" height="480"
                        :src="image.image_url" alt="image slot">
                </b-carousel-slide>
              </a>
            </div>
        </b-carousel>
        <!-- Comments -->
        <div>
          <h5>Comments: </h5>
          <ul class="list-group">
            <li class="list-group-item disabled"
                v-for="comment in gallery.comments"
                :key="comment.id"
            >
              <p>{{comment.body}}</p>
              <p>Commented by: {{comment.user.first_name}} {{comment.user.last_name}}</p>
              <small>{{comment.created_at}}</small>
            </li>
          </ul>
        </div>
        <!-- adding comment form -->
        <div>
            <form @submit.prevent="addComment">
              <div class="form-group">
                <label for="exampleInputEmail1">Add comment</label>
                <textarea v-model="body" id="" cols="30" rows="10"></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js";
import { commentService } from "./../services/CommentService.js";
export default {
  name: "MyGalleries",
  data() {
    return {
      slide: 0,
      sliding: null,
      gallery: {},
      body: '',
      errors: {},
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    addComment() {
     
      commentService.addComment(this.gallery.id,this.body).then((response) =>{
         this.gallery.comments.push(response.data[0])
         this.body = ''
      }).then((error) =>{
        this.errors = error;
      })
      
    }
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

