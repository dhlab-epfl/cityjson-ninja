<template>
  <div>
      <json-editor
        class="historical-city-json-editor"
        :key="cityobject_id"
        :schema="schema"
        :initial-value='cityobjectAttributes'
        @update-value="updateCityobjectAttributes($event)"
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
  display: flex;
  flex-direction: column;
  /*padding-left: 1em;
  border-left: 2px solid #efefef;*/
}
.historical-city-json-editor .schema-based-json-editor--card {
  padding-left: 1em;
  border-left: 2px solid #efefef;
}
.historical-city-json-editor .schema-based-json-editor--card:hover {
  border-left: 2px solid #cce5ff /*#99caff; /*#bbeff7;*/
}


.historical-city-json-editor h3{
  font-size: 1.2em;
  margin: 0px;
  /*color: red;*/
}

.cityobject-attributes-editor h3{
  font-size: 1em;
  /*color: red;*/
}

.cityobject-attributes-editor input{
  font-size: 1em;
  /*color: red;*/
}
.sub-cityobject-attributes-editor h3{
  font-size: 0.9em;
  /*color: red;*/
}
.sub-cityobject-attributes-editor h3 .schema-based-json-editor--checkbox{
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

import * as cas from "../cityobjects/cityobject_attributes_schemas.js";
import * as u from "../cityobjects/utils.js";

export default {
	name: "HistoricalCityObjectEditor",
	components: {},
	props: {
    cityobject_id: String,
		cityobjectAttributes: Object
	},
  emits: [
    "cityobject-attributes-update" // sends new version of the cityobjectAttributes
  ],
	data() {
		return {
			edit_mode: false,
      latestSavedCityObjectAttribues: {},
      schema: cas.cityobjectAttributesSchema,
      //supportedCityobjectAttributes: [],
      //unsupportedCityobjectAttributes: [], // unused.
		};

	},
	computed: {
    existingCityobjectAttributes(){
      if(
        typeof this.cityobjectAttributes === 'object' &&
        this.cityobjectAttributes !== null
      ){
        return Object.keys(this.cityobjectAttributes)
      }else{
        return []
      }
    }
	},
	methods: {
    updateCityobjectAttributes(event){
      if(event.isValid){
        const comparisonFunk= (l,r,ks)=>{

        }
        const comparison = u.compareJsons(this.latestSavedCityObjectAttribues, event.value)
        console.log("compareJsons, len: ",comparison.length, "result:", comparison[0].is_identical, "whole:", comparison, "keys: ",  comparison[0].keys)
        if(!comparison.every(c=>c.is_identical)){
          this.latestSavedCityObjectAttribues = event.value
          this.$emit( "cityobject-attributes-update", event.value );
        }
      }
    },
	},
  mounted(){
    console.log("HistoricalCityObjectEditor mounted, cityobjectAttributes:",  JSON.parse(JSON.stringify(this.cityobjectAttributes)))
    console.log("\tattributesPathWithNumberValues:",  JSON.parse(JSON.stringify(cas.attributesPathWithNumberValues)))
    this.latestSavedCityObjectAttribues = JSON.parse(JSON.stringify(this.cityobjectAttributes))
  }
};
</script>
