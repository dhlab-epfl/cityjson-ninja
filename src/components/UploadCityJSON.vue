<template>
<div class="input-group mb-3">
    <div class="input-group-prepend">
        <span class="input-group-text"><i class="fas fa-upload mr-1"></i> Upload</span>
    </div>
    <div class="custom-file">
        <input
            id="inputGroupFile01"
            ref="cityJSONFile"
            type="file"
            class="custom-file-input"
            @change="selectedFile"
        >
        <label
            class="custom-file-label"
            for="inputGroupFile01"
        >Choose file or drop it here...</label>
    </div>
</div>
</template>


<script>

export default {
	name: 'UploadCityJSON',
    emits: ["loading", "loaded", "error"],
	methods: {
        validateCityJSON( citymodel ) {
            return citymodel.type == "CityJSON"
            /*if ( citymodel.type != "CityJSON" ) {
                this.error_message = "This is not a CityJSON file!";
                return false;
            }
            return true;*/
		},
		selectedFile() {
            console.log("UploadCityJSON selectedFile")
            this.$emit("loading", true)
			//this.loading = true;

			let file = this.$refs.cityJSONFile.files[ 0 ];
            console.log("UploadCityJSON file:", file)
            const citymodel_id = file.name

			if ( ! file || file.type != "application/json" ) {
				//this.error_message = "This is not a JSON file!";
                this.$emit("error", "This is not a JSON file!")
				return;
			}

			let reader = new FileReader();
			reader.readAsText( file, "UTF-8" );

			reader.onload = evt => {
				const citymodel = JSON.parse( evt.target.result );

				if ( this.validateCityJSON( citymodel ) == false ) {
                    this.$emit("error", "This is not a CityJSON file!")
					//this.loading = false;
					return;

				}

                this.$emit("loaded", [citymodel_id, citymodel])
				/*this.citymodel = citymodel;
				this.file_loaded = true;
				this.loading = false;*/
			};

		}
	}
};
</script>