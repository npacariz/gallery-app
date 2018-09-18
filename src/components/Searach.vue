<template>
    <input type="text" @input="searchTerm">
</template>
<script>
export default {

    methods:{
        searchTerm() {
            const term = event.target.value;
            this.$emit('searchTerm', term);
        }
    }
}
</script>

