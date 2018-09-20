<template>
    <div>
        <h1>Create Gallery</h1>
        <form @submit.prevent>
            <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" id="title" v-model="newGallery.title">
                <p class="alert alert-danger" v-if="errors.title">{{errors.title[0]}}</p>
            </div>
            <div class="form-group">
                <label for="descriptions">Descriptions:</label>
                <input type="text" class="form-control" id="description"  v-model="newGallery.description">
                <p class="alert alert-danger" v-if="errors.description">{{errors.description[0]}}</p>
            </div>
            <div>
                <label for="descriptions">Images:</label>
                <div class="form-group" v-for="(img, index) in range" :key="index">
                    <input type="text" class="form-control" placeholder="image url" v-model="newGallery.images[index]">
                    <p class="alert alert-danger" v-if="errors.images">{{errors.images[0]}}</p>
                    <p class="alert alert-danger" v-if="errors[`images.${img-1}`]">Wrong format of image</p>
                    <button v-if="range !== 1" @click="removeImage(index)">Remove</button>
                    <button @click="moveUpOnePositon(index)">Up</button>
                    <button @click="moveDownOnePositon(index)">Down</button>
                </div>
                <button @click="addImage">Add image</button>
            </div>
            <button type="submit" class="btn btn-default" @click="saveNewGallery">Submit</button>
            <button type="submit" class="btn btn-default" @click="cancel">Cancel</button>
        </form>
    </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js";

export default {
  name: "CreateGallery",
  data() {
    return {
      newGallery: {
        title: "",
        description: "",
        images: []
      },
      range: 1,
      errors: []
    };
  },
  methods: {
    addImage() {
      this.range++;
    },
    removeImage(positon) {
      this.newGallery.images.splice(positon, 1);
      this.range--;
    },
    moveUpOnePositon(positon) {
      if (positon !== 0) {
        this.newGallery.images.splice(
          positon - 1,
          0,
          this.newGallery.images.splice(positon, 1)[0]
        );
      }
      return;
    },
    moveDownOnePositon(positon) {
      if (positon !== this.range - 1)
        this.newGallery.images.splice(
          positon,
          0,
          this.newGallery.images.splice(positon + 1, 1)[0]
        );
    },

    submitGallery() {
      this.$route.params.id? this.editGallery() : this.saveNewGallery()
    },

    saveNewGallery() {
      galleryService
        .addGallery(this.newGallery)
        .then(() => {
          this.$router.push({ name: "all-galleries" });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    editGallery() {
      galleryService.update(this.$route.params.id, this.newGallery).then(() => {
        this.$router.push({
          name: "view-gallery",
          params: { id: this.$route.params.id }
        });
      });
    },
    cancel() {
      if(this.$route.params.id) {
        this.$router.push({
          name: "view-gallery",
          params: { id: this.$route.params.id }
        });
      }else {
        this.$router.push({name: 'all-galleries'})
      }
      
    },
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      return galleryService.show(to.params.id).then(response => {
        next(vm => {
          vm.newGallery.title = response.data.title;
          vm.newGallery.descripton = response.data.descripton;
          response.data.images.forEach(image => {
            vm.newGallery.images.push(image.image_url);
          });
          vm.range = response.data.images.length;
        });
      });
    }
    next();
  }
};
</script>
<style scoped>
form {
  margin: 0 auto;
  width: 70%;
}
form input {
  border-radius: 20px;
}
</style>

