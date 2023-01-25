<template>
    <table class="table table-striped">
        <thead class="thead-dark">
        <tr>
            <th scope="col">id</th>
            <th scope="col" v-for="title,col in this.columns" :key="col">
                {{ title }}
            </th>
            <th scope="col">actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row in Object.values(this.cityjsons.models).map(cityjson=>{return {cityjson, 'columns':this.columns}})">
            <!-- X.map(...) ~ stupid hackery needed to overcome "this" unavailable in inner v-for loop...-->
            <a href="#" @click="modelSelected(row.cityjson.id)">
                <td>{{row.cityjson["id"]}}</td>
            </a>
            <td v-for="title,col in row.columns" :key="col">{{row.cityjson[col]}}</td>
            <td>
                <button
                    class="btn btn-danger col-auto ml-2"
                    @click="deleteModel(row.cityjson.id)"
                >
                    <i class="fas fa-trash mr-1"></i>
                </button>
            </td>
        </tr>
        </tbody>
    </table>
</template>
  
<script>

export default {
    name: "CityJSONsList",
    emits:["modelSelected", "deleteModel"],
    props: {
        cityjsons: Object,
        columns: Object,
        ApiConsumer: Object
    },
    methods: {
        modelSelected(cityjson_id){
            this.$emit('modelSelected', cityjson_id)
        },
        deleteModel(cityjson_id){
            this.$emit('deleteModel', cityjson_id)
        }
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
  