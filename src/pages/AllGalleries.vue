<template>
    <div>
        <h1>All Galleries</h1>
        <searach @searchTerm="searchDatabase"></searach>
        <list-of-galleries :galleries="galleries"></list-of-galleries>
        <div v-if="count > galleries.length">
             <button @click="loadMore">Load More</button>
        </div>

    </div>
</template>
<script>
import { galleryService } from "./../services/GalleryService.js"
import ListOfGalleries from "./../components/ListOfGalleries.vue"
import Searach from "./../components/Searach.vue"

export default {
    name: "AllGalleries",
    components:{
        ListOfGalleries,
        Searach
    },
    data() {
        return {
            galleries: [],
            page: 1,
            count: 0,
            searchTerm: ''
        }
    },
    methods:{
        loadMore() {
            this.page +=1;
            this.getGalleries();
        },
        searchDatabase(value) {
           this.searchTerm = value;
            this.searchGalleries();
        },
        getGalleries() {
            galleryService.getAll(this.page, this.searchTerm).then((response)=>{
                this.galleries.push(...response.data.galleries)
            })
        },
        searchGalleries() {
            this.count = 0,
            this.page = 1
          
            galleryService.getAll(this.page, this.searchTerm).then((response)=>{
                this.galleries = response.data.galleries; 
                
            })
        }
        
    },
    computed: {

    },
    beforeRouteEnter(to, from, next) {
        galleryService.getAll().then((response)=>{
            next((vm)=>{
                vm.galleries = response.data.galleries;
                vm.count = response.data.count;
            })
        })
    }
}
</script>

