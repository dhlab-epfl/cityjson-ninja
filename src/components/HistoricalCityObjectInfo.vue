<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <div class="text-secondary">
        <small><i :class="getIconStyle(cityobject)"></i>
          {{ cityobject.type }}</small>
      </div>
      <div
        class="col-auto p-0"
      >
      <button
        v-if="editable && !edit_mode"
        class="btn btn-sm btn-outline-warning"
        @click="edit_mode = edit_mode ? false : 'form'"
      >
        <i class="fas fa-pen mr-1"></i>
        Edit
      </button>
      <button
        type="button"
        class="close ml-2"
        aria-label="Close"
        @click="$emit('close')"
      >
        <span aria-hidden="true"><i class="fas fa-times small"></i></span>
      </button>
    </div>
  </div>
    <h5 class="card-title text-truncate">
      {{ cityobject_id }}
    </h5>
    <div v-if="citymodel != null">
      <small v-show="'parents' in cityobject">
        Parents:
        <a
          v-for="parent_id in cityobject.parents"
          :key="parent_id"
          :href="'#' + parent_id"
          :title="parent_id"
        >
          <i
            class="text-danger"
            :class="getIconStyle(getObject(parent_id), false)"
          ></i>
        </a>
      </small>
      <small v-show="'children' in cityobject">
        Children:
        <a
          v-for="child_id in cityobject.children"
          :key="child_id"
          :href="'#' + child_id"
          :title="child_id"
        >
          <i
            class="text-success"
            :class="getIconStyle(getObject(child_id), false)"
          ></i>
        </a>
      </small>
    </div>
    <div class="d-flex mt-2">
      <expandable-badge
        v-if="hasAttributes"
        color="info"
        :expanded="!edit_mode && is_mode(1)"
        @click="toggle_mode(1)"
      >
        {{ attributesCount }} Attributes
      </expandable-badge>
      <expandable-badge
        v-if="hasGeometries"
        color="danger"
        :expanded="!edit_mode && is_mode(2)"
        @click="toggle_mode(2)"
      >
        {{ cityobject.geometry.length }} Geometries
      </expandable-badge>
    </div>
    <div v-show="expanded || edit_mode">
      <hr>
      <div v-show="edit_mode == false && is_mode(1)">
        <div v-show="cityobjectAttributesCount > 0">
          <table class="table table-striped table-borderless overflow-auto">
            <tbody>
              <tr
                v-for="(value, key) in cityobject.attributes"
                :key="key"
              >
                <th
                  scope="row"
                  class="py-1"
                >
                  <small class="font-weight-bold">{{ key }}</small>
                </th>
                <td class="py-1">
                  <small>{{ value }}</small>
                </td>
              </tr>
            </tbody>
          </table>
          <hr>
        </div>
        <div v-if="Object.keys(surface).length > 0">
          <p class="h5">
            Active surface
          </p>
          <table
            class="table table-striped table-borderless overflow-auto"
          >
            <tbody>
              <tr
                v-for="(value, key) in surface"
                :key="key"
              >
                <th
                  scope="row"
                  class="py-1"
                >
                  <small class="font-weight-bold">{{ key }}</small>
                </th>
                <td class="py-1">
                  <small>{{ value }}</small>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="edit_mode == false && is_mode(2)">
        <ul class="list-unstyled">
          <li
            v-for="(geom, i) in cityobject.geometry"
            :key="i"
          >
            <div class="d-flex flex-inline align-items-center">
              <span class="pr-1">{{ geom.type }}</span>
              <geometry-badge :geometry="geom"></geometry-badge>
            </div>
          </li>
        </ul>
      </div>
      <div v-show="edit_mode=='raw'">
        <textarea
          id="json_data"
          v-model="jsonString"
          class="form-control"
        ></textarea>
      </div>
      <div v-if="edit_mode=='form'">
        <HistoricalCityObjectEditor
          :cityobject_id="cityobject_id"
          :cityobjectAttributes='cityobjectAttributes'
          @cityobject-attributes-update="cityobjectAttributesUpdate"
        ></HistoricalCityObjectEditor>
      </div>
      <div v-show="edit_mode">
        <div class="d-flex justify-content-end mt-2">
          <button
            v-if="edit_mode =='form'"
            class="btn btn-sm btn-outline-danger ml-1"
            @click="edit_mode = 'raw'"
          >
            <i class="fas fa-pen mr-1"></i>
            Edit raw
          </button>
          <button
            v-if="edit_mode"
            class="btn btn-sm btn-outline-warning ml-1"
            @click="edit_mode = edit_mode ? false : 'form'"
          >
            <i class="fas fa-times mr-1"></i>
            Cancel
          </button>
          <button
            type="button"
            class="btn btn-success btn-sm ml-1"
            @click="saveChanges($event)"
          >
            <i class="fas fa-save mr-1"></i>
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { getIconStyle } from '../../cityjson-vue-components/src/helpers/icons';

import HistoricalCityObjectEditor from "./HistoricalCityObjectEditor.vue";
//import GeometryBadge from "./common/GeometryBadge.vue";

export default {
	name: "HistoricalCityObjectInfo",
	components: {
    HistoricalCityObjectEditor
  },
  emits: [
    "cityobject-attributes-update" // sends new version of the cityobjectAttributes
  ],
	props: {
		citymodel: Object,
		cityobject: Object,
		cityobject_id: String,
		geometryId: {
			type: Number,
			default: - 1
		},
		boundaryId: {
			type: Number,
			default: - 1
		},
		selected: {
			type: Boolean,
			default: false,
		},
		editable: {
			type: Boolean,
			default: false,
		},
	},
	data() {

		return {
			edit_mode: false,
			expanded: 0,
      cityobjectAttributesLastUpdate: null
		};

	},
	computed: {
		attributesCount: function () {

			return this.cityobjectAttributesCount + Object.keys( this.surface ).length;

		},
		cityobjectAttributesCount: function () {

			if ( "attributes" in this.cityobject ) {

				return Object.keys( this.cityobject.attributes ).length;

			}

			return 0;

		},
		hasAttributes: function () {

			return ( "attributes" in this.cityobject && this.attributesCount > 0 )
				     || Object.keys( this.surface ).length > 0;

		},
		hasCityobjectAttributes() {
      return ( "attributes" in this.cityobject && this.attributesCount > 0 )
    },
		cityobjectAttributes() {
      return this.hasCityobjectAttributes? this.cityobject["attributes"] : {}
    },
		surface: function () {

			if ( this.cityobject.geometry === undefined ) {

				return {};

			}

			const geometry = this.cityobject.geometry[ this.geometryId ];

			if ( geometry === undefined ) {

				return {};

			}

			const geomType = geometry.type;

			if ( geometry.semantics ) {

				if ( geomType == "Solid" ) {

					const shells = geometry.boundaries;

					let boundaryCount = 0;

					for ( let i = 0; i < shells.length; i ++ ) {

						if ( this.boundaryId > boundaryCount + shells[ i ].length ) {

							continue;

						}

						const idx = geometry.semantics.values[ i ][ this.boundaryId - boundaryCount ];

						if ( idx != undefined ) {

							return geometry.semantics.surfaces[ idx ];

						} else {

							return {};

						}

					}

				} else if ( geomType == "MultiSurface" || geomType == "CompositeSurface" ) {

					const surfaceIdx = geometry.semantics.values[ this.boundaryId ];

					console.log( surfaceIdx );

					if ( surfaceIdx != undefined ) {

						return geometry.semantics.surfaces[ surfaceIdx ];

					}

				} else if ( geomType == "MultiSolid" || geomType == "CompositeSolid" ) {

					const solids = geometry.boundaries;

					for ( let i = 0; i < solids.length; i ++ ) {

						for ( let j = 0; j < solids[ i ].length; j ++ ) {

							const semantics = geometry.semantics ? geometry.semantics.values[ i ][ j ] : [];

							this.parseShell( solids[ i ][ j ], objectId, geomIdx, semantics, semanticSurfaces );

						}

					}

				}

			}

			return {};

		},
		hasGeometries: function () {

			return this.cityobject.geometry;

		},
		iconType: function () {

			return getIconStyle( this.cityobject );

		},
		jsonString: {
			get: function () {

				return JSON.stringify( this.cityobject, undefined, 4 );

			},
		},
	},
	methods: {
		toggle_mode( mode ) {

			if ( this.expanded == mode ) {

				this.expanded = 0;

			} else {

				this.expanded = mode;

			}

		},
		is_mode( mode ) {

			return this.expanded == mode;

		},
		getObject( objid ) {

			if ( this.citymodel ) {

				return this.citymodel.CityObjects[ objid ];

			} else {

				return {};

			}

		},
    cityobjectAttributesUpdate(cityobjectAttributes){
      console.log("cityobjectAttributesUpdate() cityobjectAttributes", cityobjectAttributes)
      this.cityobjectAttributesLastUpdate = cityobjectAttributes
    },
		saveChanges() {
      if(this.edit_mode==="form"){
        if(this.cityobjectAttributesLastUpdate !== null){
          const new_cityobject = {...this.cityobject}
          new_cityobject.attributes = {...this.cityobject.attributes}
          new_cityobject.attributes = {...this.cityobjectAttributesLastUpdate}
          this.$emit( "cityobject-attributes-update", {cityobject_id: this.cityobject_id, new_cityobject} );
        }
      }
      else if(this.edit_mode==="raw"){
        const card_id = $.escapeSelector( this.cityobject_id );
        const new_json = document.querySelector( `#${card_id} #json_data` ).value;
        const new_cityobject = JSON.parse( new_json );
        this.$emit( "cityobject-attributes-update", {cityobject_id: this.cityobject_id, new_cityobject} );
      }
      this.edit_mode=false
		},
		getIconStyle( cityobj, with_colours ) {

			return getIconStyle( cityobj, with_colours );

		}
	},
};
</script>
