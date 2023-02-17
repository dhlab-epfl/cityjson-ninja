<template>
  <div>
      <json-editor :schema="schema"
        :initial-value="initialValue"
        @update-value="updateNumberExample($event)"
        theme="bootstrap3"
        icon="fontawesome4">
      </json-editor>
  </div>
</template>

<script>
//import { getIconStyle } from '../../cityjson-vue-components/src/helpers/icons';

//import ExpandableBadge from "./common/ExpandableBadge.vue";
//import GeometryBadge from "./common/GeometryBadge.vue";

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
      schema: {
        "type": "number",
        "title": "A number example",
        "description": "a number description example",
        "default": 123.4,
        "minimum": 10,
        "exclusiveMinimum": true,
        "maximum": 1000,
        "exclusiveMaximum": true
      },
      initialValue: {
        numberExample: 123.4
      }
		};

	},
	computed: {
		
	},
	methods: {
    updateNumberExample(c){
      console.log("updateNumberExample value:", c)
    },
	},
};
</script>
