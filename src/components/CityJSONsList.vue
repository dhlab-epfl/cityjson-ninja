<template>
    <table class="table table-striped">
        <thead class="thead-dark">
        <tr>
            <th scope="col" v-for="title,col in this.columns" :key="col">
                {{ title }}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in Object.values(this.cityjsons.models).map(cityjson=>{return {cityjson, 'columns':this.columns}})">
            <!-- X.map(...) ~ stupid hackery needed to overcome "this" unavailable in inner v-for loop...-->
            <td v-for="title,col in row.columns" :key="col">{{row.cityjson[col]}}</td>
        </tr>
        </tbody>
    </table>
</template>
  
<script>

export default {
    name: "CityJSONsList",
    props: {
        cityjsons: Object,
        columns: Object,
        ApiConsumer: Object
    },
    mounted(){
        console.log("this.cityjsons:")
        console.log(Object.entries(this.cityjsons.models))
        console.log("this.columns:")
        console.log(this.columns)
        console.log("Object.entries(this.columns):")
        console.table(Object.entries(this.columns))
    }
};
</script>
  
<style scoped>
</style>
  