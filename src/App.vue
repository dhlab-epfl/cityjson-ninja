<template>
  <div class="h-100">
    <div
      id="helpModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="helpModelLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5
              id="helpModelLabel"
              class="modal-title"
            >
              <i class="far fa-question-circle mr-1"></i> Help
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>This is ninja, our viewer for CityJSON.</p>
            <p>The source code is available in <a href="https://github.com/cityjson/ninja">GitHub</a>. Have fun and, please, report any issues found <a href="https://github.com/cityjson/ninja/issues">here</a>.</p>
            <p>Here is what you can do:</p>
            <ul>
              <li>Click on an object ID in the tree view on the left to select it.</li>
              <li>Click or tap on an object in the 3D view to select it.</li>
              <li>When an object is selected you see a card with it's information (oh, wow)! If you click on a surface with semantics, its information will also be accessible.</li>
              <li>Toggle between different LoDs by clicking on the corresponding buttons on the bottom left corner of the viewer.</li>
              <li>Toggle the editing mode with the <i class="fas fa-pen mx-1 text-muted"></i> icon to edit it. Then save the changes.</li>
              <li>Download the city model with your changes by clicking on <b>Download</b>.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div
      id="configModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="helpModelLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header text-info">
            <h5
              id="helpModelLabel"
              class="modal-title"
            >
              <i class="fas fa-sliders-h mr-1"></i> Settings
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row custom-control custom-switch ml-1">
              <input
                id="cameraLightSwitch"
                v-model="cameraLight"
                type="checkbox"
                class="custom-control-input"
              >
              <label
                class="custom-control-label"
                for="cameraLightSwitch"
              >Camera light</label>
            </div>
            <ColorEditor
              v-model="background_color"
              name="Background"
            ></ColorEditor>
            <ColorEditor
              v-model="selectionColor"
              name="Selection"
            ></ColorEditor>
            <div
              id="accordionExample"
              class="accordion"
            >
              <div class="card">
                <div
                  id="headingOne"
                  class="card-header"
                >
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Object Colours
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <ColorEditor
                      v-for="(color, type) in object_colors"
                      :key="type"
                      v-model="object_colors[type]"
                      :name="type"
                    ></ColorEditor>
                  </div>
                </div>
              </div>
              <div class="card">
                <div
                  id="headingTwo"
                  class="card-header"
                >
                  <h2 class="mb-0">
                    <button
                      class="btn btn-link btn-block text-left collapsed"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Surface Colours
                    </button>
                  </h2>
                </div>
                <div
                  id="collapseTwo"
                  class="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordionExample"
                >
                  <div class="card-body">
                    <ColorEditor
                      v-for="(color, type) in surface_colors"
                      :key="type"
                      v-model="surface_colors[type]"
                      :name="type"
                    ></ColorEditor>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav
      class="navbar navbar-dark"
      :class="[ file_loaded ? 'bg-dark' : 'bg-white' ]"
    >
      <a
        class="navbar-brand"
        :class="[ file_loaded ? 'text-white' : 'text-dark' ]"
        href="#"
      ><img
        :src="logoUrl"
        :class="[ file_loaded ? 'logo-regular' : 'logo-big' ]"
      > <span :class="{ 'text-big' : !file_loaded }">ninja</span></a>
      <div
        v-show="error_message"
        class="alert alert-danger mb-0 mt-1 py-1 px-2"
        role="alert"
      >
        {{ error_message }}
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
        <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="d-flex justify-content-end align-items-center col-auto p-0">
        <div
          v-show="loading"
          class="spinner-border text-warning mr-2"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
        <button
          type="button"
          class="btn mr-1"
          :class="[ file_loaded ? 'btn-outline-light' : 'btn-outline-dark' ]"
          @click="clickUserButton()"
        >
          <i class="fas fa-user mr-1"></i> {{username? username: "Login"}}
        </button><button
          type="button"
          class="btn btn-outline-info mr-1"
          data-toggle="modal"
          data-target="#configModal"
        >
          <i class="fas fa-sliders-h mr-1"></i> Settings
        </button>
        <button
          type="button"
          class="btn"
          :class="[ file_loaded ? 'btn-outline-light' : 'btn-outline-dark' ]"
          data-toggle="modal"
          data-target="#helpModal"
        >
          <i class="far fa-question-circle mr-1"></i> Help
        </button>
      </div>
    </nav>
    <div
      v-if="file_loaded"
      id="main_content"
    >
      <div class="container-fluid h-100">
        <div class="row h-100">
          <div class="d-sm-none d-lg-block col-lg-1 bg-dark p-0">
            <ninja-sidebar
              v-model="active_sidebar"
              :with_versions="has_versions"
            ></ninja-sidebar>
          </div>
          <div class="col-4 p-0 h-100">
            <div
              v-show="active_sidebar == 'objects'"
              class="h-100"
            >
              <div class="h-100 d-flex flex-column">
                <div class="p-3 shadow-sm">
                  <h5>
                    City Objects
                    <span
                      v-if="active_version != null"
                      class="badge badge-primary mr-1"
                    >
                      Version: {{ active_version | truncate(7) }}
                    </span>
                    <span class="badge badge-secondary">
                      {{ Object.keys(activeCityModel.CityObjects).length }} total
                    </span>
                  </h5>
                  <input
                    v-model="search_term"
                    type="search"
                    class="form-control col mb-2 shadow-sm"
                    placeholder="Search for IDs, object type or attributes..."
                  >
                  <div
                    v-show="file_loaded"
                    class="d-flex justify-content-end col-auto p-0"
                  >
                    <button
                      class="btn btn-warning col-auto"
                      @click="remodelCityModelAndReload()"
                    >
                      <i class="fas fa-redo mr-1"></i> Update modelling
                    </button>
                    <button
                      class="btn btn-primary col-auto ml-2"
                      @click="downloadModel()"
                    >
                      <i class="fas fa-download mr-1"></i> Download
                    </button>
                    <button
                      class="btn btn-danger col-auto ml-2"
                      @click="reset()"
                    >
                      <i class="fas fa-times mr-1"></i> Close
                    </button>
                  </div>
                </div>
                <CityObjectsTree
                  :citymodel="activeCityModel"
                  :cityobjects="firstLevelObjects"
                  :selected_objid="selected_objid"
                  :matches="matches"
                  @object_clicked="move_to_object( [ $event, - 1, - 1 ] )"
                ></CityObjectsTree>
              </div>
            </div>
            <div
              v-if="has_versions"
              v-show="active_sidebar == 'versions'"
              class="p-3"
            >
              <branch-selector
                v-model="active_branch"
                :versioning="citymodel.versioning"
              ></branch-selector>
              <version-list
                :versioning="citymodel.versioning"
                :active_branch="active_branch"
                :active_version.sync="active_version"
              ></version-list>
            </div>
          </div>
          <div class="col-7 p-0 h-100">
            <div
              class="col-auto m-2"
              style="position: absolute; z-index: 1"
            >
              <div
                v-if="existsSelected"
                :id="selected_objid? selected_objid: ''"
                class="card mb-2"
                :class="{ 'border-primary' : false }"
              >
                <div
                  class="card-body"
                  style="overflow: auto; max-height: 600px"
                >
                <HistoricalCityObjectInfo
                  :citymodel="activeCityModel"
                  :cityobject="activeCityModel.CityObjects[selected_objid]"
                  :cityobject_id="selected_objid"
                  :geometry-id="selectedGeometryId"
                  :boundary-id="selectedBoundaryId"
                  :editable="true"
                  @cityobject-attributes-update="saveCityObject($event)"
                  @close="selected_objid = null"
                ></HistoricalCityObjectInfo>
              </div>
            </div>
            </div>
            <ThreeJsViewer
              ref="viewer"
              :citymodel="activeCityModel"
              :selected-objid="selected_objid"
              :selected-geom-idx="selectedGeometryId"
              :selected-boundary-idx="selectedBoundaryId"
              :object-colors="object_colors"
              :surface-colors="surface_colors"
              :background-color="background_color"
              :selection-color="selectionColor"
              :show-semantics="showSemantics"
              :active-lod="activeLoD"
              :camera-spotlight="cameraLight"
              :highlight-selected-surface="highlightSurface"
              @object_clicked="move_to_object($event)"
              @rendering="loading = $event"
              @chunkLoaded="availableLoDs = $refs.viewer.getLods()"
            ></ThreeJsViewer>
            <div
              style="position: absolute; z-index: 1; bottom: 0px; left: 0px"
            >
              <div class="custom-control custom-switch ml-1">
                <input
                  id="surfaceSwitch"
                  v-model="highlightSurface"
                  type="checkbox"
                  class="custom-control-input"
                >
                <label
                  class="custom-control-label"
                  for="surfaceSwitch"
                >Select surface</label>
              </div>
              <div class="custom-control custom-switch ml-1">
                <input
                  id="semanticsSwitch"
                  v-model="showSemantics"
                  type="checkbox"
                  class="custom-control-input"
                >
                <label
                  class="custom-control-label"
                  for="semanticsSwitch"
                >Semantics</label>
              </div>
              <div
                class="btn-group ml-1 mb-1 bg-white"
                role="group"
                aria-label="Basic example"
              >
                <button
                  type="button"
                  :class="['btn', activeLoD == - 1 ? 'btn-primary' : 'btn-outline-primary']"
                  @click="activeLoD = - 1"
                >
                  All
                </button>
                <button
                  v-for="( lod, idx ) in availableLoDs"
                  :key="lod"
                  type="button"
                  :class="['btn', activeLoD == idx ? 'btn-primary' : 'btn-outline-primary']"
                  @click="activeLoD = idx"
                >
                  LoD{{ lod }}
                </button>
              </div>
            </div>
            <div
              class="card"
              style="position: absolute; z-index: 1; bottom: 0px; right: 0px"
            >
              <div class="m-1 px-2">
                <a
                  href="https://cityjson.org"
                  target="_blank"
                ><img
                  src="https://www.cityjson.org/assets/images/cityjson_logo.svg"
                  alt=""
                ></a>
              </div>
              <div class="m-1 px-2">
                <a
                  class="card-link"
                  href="https://github.com/cityjson/ninja"
                  target="_blank"
                ><i class="fab fa-github"></i> ninja v0.6.1</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="container"
        style="width:75%; max-width: 680px"
      >
      <main>
          <div class="row">
            <div class="col-12 py-md-3 pl-md-5">
              <h2>Choose a model</h2>
              <p>Click on a model to have fun!</p>
              <CityJSONsList
                :cityjsons="cityModels"
                :columns="{nbCityObjects:'# cityObjects', created:'creation', 'updated': 'last updated'}"
                @modelSelected="getCityModel"
                @deleteModel="deleteModelFromList"
              />
            </div>
            </div>
          <div class="row">
            <div class="col-12 py-md-3 pl-md-5">
              <h2>Upload a model</h2>
              <p>Upload a new model to the server</p>
              <UploadCityJSON
                @loading="modelUploading"
                @loaded="modelUploaded"
                @error="modelUploadError"
              />
            </div>
            </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import ColorEditor from './components/ColorEditor.vue';
import NinjaSidebar from './components/NinjaSidebar.vue';
import BranchSelector from './components/Versioning/BranchSelector.vue';
import VersionList from './components/Versioning/VersionList.vue';
import HcjApiConsumer from "./HcjApiConsumer.js";
import CityJSONsList from './components/CityJSONsList.vue';
import UploadCityJSON from './components/UploadCityJSON.vue';
import HistoricalCityObjectInfo from './components/HistoricalCityObjectInfo.vue';
import $ from 'jquery';
import _ from 'lodash';

const apiUrl = process.env.VUE_APP_API_ENDPOINT //"http://localhost:8080/v1"
const MESSAGE_TIMEOUT = 5000

export default {
	name: 'App',
	components: {
		ColorEditor,
		NinjaSidebar,
		BranchSelector,
		VersionList,
    CityJSONsList,
    UploadCityJSON,
    HistoricalCityObjectInfo
	},
	data: function () {

		return {
      apiUrl: apiUrl,
      api: new HcjApiConsumer(apiUrl),
      cityModels: {models:{}},
			file_loaded: false,
			search_term: "",
			citymodel_id: null,
			citymodel: {},
			selected_objid: null,
			selectedGeometryId: - 1,
			selectedBoundaryId: - 1,
			loading: false,
      username: false,
			error_message: null,
			active_sidebar: 'objects', // objects/versions
			has_versions: false,
			active_branch: 'master',
			active_version: null,
			object_colors: {
				"Building": 0x7497df,
				"BuildingPart": 0x7497df,
				"BuildingInstallation": 0x7497df,
				"Bridge": 0x999999,
				"BridgePart": 0x999999,
				"BridgeInstallation": 0x999999,
				"BridgeConstructionElement": 0x999999,
				"CityObjectGroup": 0xffffb3,
				"CityFurniture": 0xcc0000,
				"GenericCityObject": 0xcc0000,
				"LandUse": 0xffffb3,
				"PlantCover": 0x39ac39,
				"Railway": 0x000000,
				"Road": 0x999999,
				"SolitaryVegetationObject": 0x39ac39,
				"TINRelief": 0xffdb99,
				"TransportSquare": 0x999999,
				"Tunnel": 0x999999,
				"TunnelPart": 0x999999,
				"TunnelInstallation": 0x999999,
				"WaterBody": 0x4da6ff
			},
			surface_colors: {
				"GroundSurface": 0x999999,
				"WallSurface": 0xffffff,
				"RoofSurface": 0xff0000,
				"TrafficArea": 0x6e6e6e,
				"AuxiliaryTrafficArea": 0x2c8200,
				"Window": 0x0059ff,
				"Door": 0x640000
			},
			background_color: 0xd9eefc,
			selectionColor: 0xffc107,
			showSemantics: true,
			highlightSurface: false,
			availableLoDs: [],
			activeLoD: - 1,
			cameraLight: false,
      cityobjectsToRemodel: []
		};

	},
	computed: {
		activeCityModel() {

			if ( this.active_version != null ) {

				return this.extract_citymodel( this.active_version );

			} else {

				return this.citymodel;

			}

		},
		logoUrl: function () {

			if ( this.file_loaded ) {

				return "logoWhite.svg";

			}

			return "logoBlack.svg";

		},
		firstLevelObjects: function () {

			return _.pickBy( this.activeCityModel.CityObjects, function ( cityobject ) {

				return ! ( cityobject.parents && cityobject.parents.length > 0 );

			} );

		},
		filteredCityObjects: function () {

			var result = _.pickBy( this.activeCityModel.CityObjects, function ( value, key ) {

				var regex = RegExp( this.search_term, "i" );
				var obj_json = JSON.stringify( value );
				return regex.test( key ) | regex.test( obj_json );

			} );

			return result;

		},
		existsSelected: function () {

			return this.selected_objid != null;

		}
	},
	watch: {
    apiUrl(){
      this.api = new HcjApiConsumer(this.apiUrl)
    }
		/*selected_objid () {

			if ( this.selected_objid != null ) {
        console.log("App.watch.selected_objid() selected_objid: ", this.selected_objid)
				var card_id = $.escapeSelector( this.selected_objid );
				$( `#${card_id}` )[ 0 ].scrollIntoViewIfNeeded();

			}

		}*/
	},
	methods: {
    getCityModels(){
      return this.api.getCityJsonsList().then(cityModels=>{
        this.cityModels=cityModels
        //console.log("this.cityModels", this.cityModels)
      }).catch(e =>{
        this.catch_api_error("getCityModels", this.api.modelsUrl(), e)
        throw e
      })
    },
    getCityModel(cityjson_id){
      this.loading = true
      this.api.getCityJson(cityjson_id).then(cityjson=>{
        //console.log("this.api.getCityJson(), cityjson_id: ", cityjson_id, " cityjson:", cityjson)
				this.citymodel = cityjson;
        this.citymodel_id = cityjson_id;
				this.file_loaded = true;
      }).then(()=>{
        this.loading = false
      }).catch(e =>{
        this.loading = false
        this.catch_api_error("getCityModel", this.api.cityjsonUrl(cityjson_id), e)
        throw e
      })
			//this.loading = true;
    },
    /**
     * Post a citymodel to the backend.
     * Inform the user if any error occurs.
     */
    postCityModel(cityjson_id, cityjson) {
      this.loading = true
      return this.api.postCityJson(cityjson_id, cityjson).then(()=>{
        this.loading = false
      }).catch(e =>{
        this.loading = false
        this.catch_api_error("postCityModel", this.api.cityjsonUrl(cityjson_id), e)
      })
    },
    /**
     * Post a cityObject to the backend.
     * Inform the user if any error occurs.
     */
    postCityObject(cityjson_id, cityobject_id, cityobject, edit_author="missing_user", edit_message=false) {
      return this.api.postCityObject(cityjson_id, cityobject_id, cityobject, edit_author, edit_message).catch(e =>{
        this.catch_api_error("postCityObject", this.api.cityobjectUrl(cityobject_id), e)
        throw e
      })
    },
    /**
     * Update a cityjson modelling using a list of cityobject_ids
     * Inform the user if any error occurs.
     * Show the loading wheel while the operation is ongoing.
     */
    updateCityModelling(cityjson_id) {
      this.loading = true
      return this.api.updateCityJsonModelling(cityjson_id
      ).then(()=>{
        this.loading = false
      }).catch(e =>{
        this.loading = false
        this.catch_api_error("updateCityModelling", this.api.cityjsonUpdateUrl(cityjson_id), e)
        throw e
      })
    },
    /**
     * Update a list of cityobject_ids modelling
     * Inform the user if any error occurs.
     * Show the loading wheel while the operation is ongoing.
     */
    updateCityObjectsModelling(cityjson_id, cityobject_ids) {
      this.loading = true
      console.log("App.updateCityObjectsModelling() cityobject_ids:", cityobject_ids)
      return Promise.all(
        cityobject_ids.map(cityobject_id=>this.api.updateCityObjectModelling(cityjson_id, cityobject_id))
      ).then(()=>{
        console.log("App.updateCityObjectsModelling() DONE!")
        this.loading = false
      }).catch(e =>{
        this.loading = false
        this.catch_api_error("updateCityObjectModelling", this.api.cityobjectUpdateUrl(cityjson_id), e)
        throw e
      })
    },
    /**
     * Delete a cityjson
     * Inform the user if any error occurs.
     */
    deleteCityModel(citymodel_id){
      return this.api.deleteCityJson(citymodel_id).catch(e =>{
        this.catch_api_error("getCityModels", this.api.modelsUrl(), e)
      })
    },
    catch_api_error(method, url, error){
      const default_error_message = "App."+method+"() ERROR: "
      let error_message = default_error_message+error.message
      if(error.message.indexOf("NetworkError")>-1){
        error_message="HistoricalCityJSON server unreachable at "+url
      } 
      this.alert_error(error_message)
    },
		extract_citymodel( vid ) {

			var object_dict = this.citymodel.versioning.versions[ vid ].objects;
			var original_objects = this.citymodel.CityObjects;

			var result = $.extend( {}, this.citymodel );

			result[ "CityObjects" ] = {};

			delete result[ "versioning" ];

			Object.keys( object_dict ).forEach( ( key ) => {

				result[ "CityObjects" ][ key ] = $.extend( {}, original_objects[ object_dict[ key ] ] );

			} );

			return result;

		},
		move_to_object( ids ) {

			if ( ids ) {

				// `ids` is in the form of [ objectId, geometryId, boudnaryId ]
				this.selected_objid = ids[ 0 ];
				this.selectedGeometryId = ids[ 1 ];
				this.selectedBoundaryId = ids[ 2 ];

			}/* else {

				this.selected_objid = null;
				this.selectedGeometryId = - 1;
				this.selectedBoundaryId = - 1;

			}*/

		},
    loadUsername(){
      const username = localStorage.getItem("username")
      if(username){
        this.username = username 
      }
      return username
    },
    login(){
      const prompt = this.username?
        "Your current username is '"+this.username+"'.\n Please enter your new user name (or cancel to keep current one):" :
        "Please enter your user name:"
      const newUsername = window.prompt(prompt)
      if(newUsername){
        this.username = newUsername 
        localStorage.setItem("username", this.username);
      }
    },
    /**
     * Get username from localStorage and if absent ask for it and save it to LocalStorage
     * Not intended as a safety feature: expect only trusted user
     */
    getUsername(){
      if(!this.username){
        this.loadUsername()
        if(!this.username){
          this.login()
        }
      }
      return this.username
    },
    logout(){
      if(window.confirm("Logged in as '"+this.username+"'.\nAre you sure you want to logout?")){
        this.username=false
        localStorage.removeItem("username");
      }
    },
    clickUserButton(){
      if(!this.username){
        this.login()
      }else{
        this.logout()
      }
    },
		reset() {

			this.citymodel = {};
      this.citymodel_id = null;
			this.search_term = "";
			this.file_loaded = false;

		},
		matches( coid, cityobject ) {

			var regex = RegExp( this.search_term, "i" );
			var obj_json = JSON.stringify( cityobject );
			if ( cityobject.children && cityobject.children.length > 0 ) {

				return regex.test( coid ) || regex.test( obj_json ) || cityobject.children.some( obj_id => {

					return this.matches( obj_id, this.citymodel.CityObjects[ obj_id ] );

				} );

			} else {

				return regex.test( coid ) || regex.test( obj_json );

			}

		},
    deleteModelFromList(cityjson_id){
      const confirmDelete = window.confirm("This will delete the model from the server. Are you sure?")
      if(confirmDelete){
        this.deleteCityModel(cityjson_id).then(()=>{
          return this.getCityModels()
        })
      }
    },
    modelUploading() {
        this.loading = true

    },
    modelUploaded([cityjson_id, cityjson]) {
      this.loading = false
      this.postCityModel(cityjson_id, cityjson).then(()=>{
        return this.getCityModels()
      })
    },
    modelUploadError(error_message) {
      this.loading = false
      this.alert_error(error_message)
    },
    alert_error(error_message){
      console.error(error_message)
      this.error_message = error_message
      setTimeout(()=>{
        this.error_message = null
      },MESSAGE_TIMEOUT)
    },
		download( filename, text ) {

			var element = document.createElement( 'a' );
			element.setAttribute( 'href', 'data:application/json;charset=utf-8,' + encodeURIComponent( text ) );
			element.setAttribute( 'download', filename );

			element.style.display = 'none';
			document.body.appendChild( element );

			element.click();

			document.body.removeChild( element );

		},
		downloadModel() {

			var text = JSON.stringify( this.citymodel );

			this.download( "citymodel.json", text );

		},
    /**
     * Remodel a cityjson and load the updated
     * Inform the user if any error occurs.
     */
    remodelCityModelAndReload(){
      console.log("App.remodelCityModelAndReload() pre-request cityobjectsToRemodel: ", this.cityobjectsToRemodel)
      return this.updateCityModelling(this.citymodel_id).then(()=>{
        this.cityobjectsToRemodel=[]
        console.log("App.remodelCityModelAndReload() post-request cityobjectsToRemodel: ", this.cityobjectsToRemodel)
        return this.getCityModel(this.citymodel_id)
      })
    },
    remodelCityObjectsAndReload(){
      return this.updateCityObjectsModelling(this.citymodel_id, this.cityobjectsToRemodel).then(()=>
        this.getCityModel(this.citymodel_id)
      )
    },
    saveCityObject({cityobject_id, new_cityobject}){
      const username = this.getUsername()
      //console.log("App.saveCityObject() cityobject_id: ", cityobject_id, " new_cityobject: ", new_cityobject, ", username: ", username)
      if(username){
        window.prompt("Save message:", 'modified CityObject with id "'+cityobject_id+'"')
        this.activeCityModel.CityObjects[cityobject_id] = new_cityobject
        this.postCityObject(this.citymodel_id, cityobject_id, new_cityobject).then(()=>{
          this.getCityModel(this.citymodel_id)
        })
        console.log("App.saveCityObject() cityobjectsToRemodel: ", this.cityobjectsToRemodel)
        return this.cityobjectsToRemodel.push(cityobject_id)
      }else{
        this.alert_error("No username provided, save canceled. Please provide a username to allow saving. ")
      }
    }
	},
  mounted(){
    this.getCityModels()
    this.loadUsername()
  }
};
</script>

<style scoped>
.logo-big {
  position: absolute;
  height: 120px;
}

.logo-regular {
  height: 24px;
}

.text-big {
  padding-left: 140px;
}
</style>
