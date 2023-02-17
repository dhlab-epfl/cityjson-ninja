<template>
  <div>
      <json-editor
        class="historical-city-json-editor"
        :schema="schema"
        :initial-value="initialValue"
        @update-value="updateExample($event)"
        theme="bootstrap3"
        icon="fontawesome4">
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
      schema: cas.roofSchema,
      initialValue: cas.roofDefaultValue
		};

	},
	computed: {
		
	},
	methods: {
    updateExample(c){
      console.log("updateExample value:", c)
    },
	},
};
</script>
