<template>
  <div>
      <json-editor
        v-for="geomFeature in supportedGeomFeatures"
        :key="geomFeature"
        class="historical-city-json-editor"
        :schema="schemas[geomFeature]"
        :initial-value='cityobject["attributes"]["geomFeatures"][geomFeature]'
        @update-value="($event)=>updateGeomFeature(geomFeature, $event)"
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
  emits: [
    "cityobject_updated" // sends new version of the cityobject
  ],
	data() {
		return {
			edit_mode: false,
			expanded: 0,
      schemas: {},
      initialValue: cas.roofDefaultValue,
      supportedGeomFeatures: [],
      unsupportedGeomFeatures: [], // unused.
      latestUpdates: {} // per geomFeature: last updated version
		};

	},
	computed: {
    existingGeomFeatures(){
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
    },
    saveChanges(){
      Object.keys(this.latestUpdates).map(geomFeature=>{
        if(this.latestUpdates[geomFeature]!==undefined && this.latestUpdates[geomFeature]!==null){
          this.cityobject["attributes"]["geomFeatures"][geomFeature] = {...this.latestUpdates[geomFeature]}
          this.latestUpdates[geomFeature] = undefined
          this.$emit( "cityobject_updated", this.cityobject );
        }
      })
    },
    hasUnsavedChanges(){
      return Object.keys(this.latestUpdates).filter(k=> k!== undefined && k!==null).length>0
    }
	},
	methods: {
    updateGeomFeature(geomFeature, event){
      console.log("updateExample geomFeature:", geomFeature, ", event", event)
      if(this.latestUpdates[geomFeature]===null){
        this.latestUpdates[geomFeature] = undefined
      } else if(
        this.latestUpdates[geomFeature]===undefined &&
        event.isValid
      ){
        this.latestUpdates[geomFeature] = event.value
      }
    },
    resetSavesAndUpdates(){
      const geomFeatures = this.existingGeomFeatures
      // supportedGeomFeatures in correct order
      this.supportedGeomFeatures = Object.keys(cas.schemas).filter(gf=>geomFeatures.includes(gf))
      this.unsupportedGeomFeatures = geomFeatures.filter(gf=>cas.schemas[gf])

      this.latestUpdates = {}
      this.supportedGeomFeatures.forEach(sgf =>{
        this.latestUpdates[sgf] = null
      })
    },
    init(){
      // init this.schemas
      this.schemas = {}
      Object.keys(cas.schemas).forEach(schemaName =>{
        this.schemas[schemaName] = {...cas.schemas[schemaName], collapsed: true}
      })
      console.log("init() this.supportedGeomFeatures", this.supportedGeomFeatures)
      this.resetSavesAndUpdates()
    },
    reset(){
      this.resetSavesAndUpdates()
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
