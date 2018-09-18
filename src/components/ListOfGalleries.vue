<template>
    <div>
        <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Image</th>
                <th scope="col">Date of created</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="gallery in galleries" :key="gallery.id">
            <th>{{gallery.title}}</th>
             <th>{{gallery.user.first_name}} {{gallery.user.first_name}}</th>
            <th><img :src="gallery.images[0].image_url" alt="img" width="200px"></th>
            <th>{{gallery.created_at}}</th>
            </tr>
        </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: "ListOfGalleries",
    props: {
        galleries: {
            type: Array,
            required: true
        }
    }
}
</script>

