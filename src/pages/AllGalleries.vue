<template>
    <div>
        <h1>All Galleries</h1>
        <list-of-galleries :galleries="galleries"></list-of-galleries>
    </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js"
import ListOfGalleries from "./../components/ListOfGalleries.vue"

export default {
    name: "AllGalleries",
    components:{
        ListOfGalleries
    },
    data() {
        return {
            galleries: []
        }
    },
    beforeRouteEnter(to, from, next) {
        galleryService.getAll().then((response)=>{
            next((vm)=>{
                vm.galleries = response.data
            })
        })
    }
}
</script>

