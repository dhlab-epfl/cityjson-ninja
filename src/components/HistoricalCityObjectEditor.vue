<template>
  <div>

      <json-editor
        v-for="sgf in supportedGeomFeatures"
        :key="sgf"
        class="historical-city-json-editor"
        :schema="schemas[sgf]"
        :initial-value="latestSaves[sgf]"
        @update-value="($event)=>updateGeomFeature(sgf, $event)"
        theme="bootstrap3"
        icon="fontawesome4"
        noSelect2
        >
      </json-editor>
  </div>
</template>


<style>

.historical-city-json-editor.schema-based-json-editor--row {
  /* correct weird -15px margins */
  margin-left: 0px;
  margin-right: 0px;
  display: flex;
  flex-direction: column;
}
.historical-city-json-editor .schema-based-json-editor--row {
  /* correct weird -15px margins */
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 1em;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #efefef;
}


.historical-city-json-editor h3{
  font-size: 1.2em;
  /*color: red;*/
}

.sub-object-editor h3{
  font-size: 1em;
  /*color: red;*/
}
.sub-object-editor h3 .schema-based-json-editor--checkbox{
  font-size: 0.8em;
  /*color: pink;*/
}

.schema-based-json-editor--checkbox{
  /* ensure "not exists" checkboxes are bottom aligned */
  display:flex;
  align-items:flex-end;
  padding: 0.2em;
}

</style>

<script>
//import { getIconStyle } from '../../cityjson-vue-components/src/helpers/icons';
//import './css/bootstrap.min.v3.3.7.css'

import * as cas from "../cityobject_attributes_schemas.js";

export default {
	name: "HistoricalCityObjectEditor",
	components: {},
	props: {
		cityobject: Object,
		cityobject_id: String,
	},
	data() {
		return {
			edit_mode: false,
			expanded: 0,
      schemas: {},
      initialValue: cas.roofDefaultValue,
      supportedGeomFeatures: [],
      unsupportedGeomFeatures: [], // unused.
      latestSaves: {}, // per geomFeature: last saved version
      latestUpdates: {} // per geomFeature: last updated version
		};

	},
	computed: {
    existingGeomFeatures: function(){
      if(
        typeof this.cityobject["attributes"] === 'object' &&
        this.cityobject["attributes"] !== null &&
        typeof this.cityobject["attributes"]["geomFeatures"] === 'object' &&
        this.cityobject["attributes"]["geomFeatures"] !== null
      ){
        return Object.keys(this.cityobject["attributes"]["geomFeatures"])
      }else{
        return []
      }
    }
	},
	methods: {
    updateGeomFeature(geomFeature, event){
      console.log("updateExample geomFeature:", geomFeature, ", event", event)
    },
    init(){
      const geomFeatures = this.existingGeomFeatures
      // supportedGeomFeatures in correct order
      this.supportedGeomFeatures = Object.keys(cas.schemas).filter(gf=>geomFeatures.includes(gf))
      this.unsupportedGeomFeatures = geomFeatures.filter(gf=>cas.schemas[gf])

      this.schemas = {}
      this.latestSaves = {}
      this.latestUpdates = {}
      this.supportedGeomFeatures.forEach(sgf =>{
        this.latestSaves[sgf] = {...this.cityobject["attributes"]["geomFeatures"][sgf]}
        this.latestUpdates[sgf] = false
        this.schemas[sgf] = {...cas.schemas[sgf], collapsed: true}
      })

      console.log("init() this.supportedGeomFeatures", this.supportedGeomFeatures)
    },
    reset(){
      this.init()
    }
	},
  watch: {
    cityobject(){
      this.reset()
    }
  },
  mounted(){
    this.init()
  }
};
</script>
