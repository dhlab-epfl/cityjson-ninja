
const CITYJSON_PATH="models"
const CITYOBJECT_PATH="cityobjects"
const UPDATE_PATH="update"

/**
 * HcjApiConsumer defines js functions to call the HistoricalCityJSON API.
 * Each function returns the accompagnanying js Promise that will succeed or fail.
 * It doesn't handle any frontend aspect (notifying the user of errors, showing the new cityjson, etc...)
 */
export default class HcjApiConsumer{
    constructor(baseurl){
        this.baseurl = baseurl
    }

    modelsUrl(){
        return [this.baseurl, CITYJSON_PATH].join("/")
    }
    cityjsonUrl(cityjsonId){
        return [this.modelsUrl(),cityjsonId].join("/")
    }
    cityjsonUpdateUrl(cityjsonId){
        return [this.cityjsonUrl(cityjsonId),UPDATE_PATH].join("/")
    }
    cityobjectUrl(cityjsonId, cityobjectId){
        return [this.cityjsonUrl(cityjsonId), CITYOBJECT_PATH, cityobjectId].join("/")
    }
    cityobjectUpdateUrl(cityjsonId, cityobjectId){
        return [this.cityobjectUrl(cityjsonId, cityobjectId), UPDATE_PATH].join("/")
    }

    getCityJsonsList(){
        return fetch(this.modelsUrl()).then(response=>response.json())
    }

    getCityJson(cityjsonId){
        return fetch(this.cityjsonUrl(cityjsonId)).then(response=>response.json())
    }
    postCityJson(cityjsonId, cityjson){
        return fetch(this.cityjsonUrl(cityjsonId), {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cityjson)
        }).then( (response) => { 
            console.log("CJ POST response", response)
            return response
        });
    }
    updateCityJsonModelling(cityjsonId){
        return fetch(this.cityjsonUpdateUrl(cityjsonId), {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then( (response) => { 
            console.log("CJ UPDATE response", response)
            return response
        });
    }
    deleteCityJson(cityjsonId){
        return fetch(this.cityjsonUrl(cityjsonId), {
            method: "delete",
        }).then( (response) => { 
            console.log("CJ DELETE response", response)
            return response
        });
        
    }
    getCityObject(cityjsonId, cityobjectId){
        return fetch(this.cityobjectUrl(cityjsonId, cityobjectId)).then(response=>response.json())
    }
    postCityObject(cityjsonId, cityobjectId, cityobject){
        return fetch(this.cityobjectUrl(cityjsonId, cityobjectId), {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cityobject)
        }).then( (response) => { 
            console.log("CO POST response", response)
            return response
        });
    }
    updateCityObjectModelling(cityjsonId, cityobjectId){
        return fetch(this.cityobjectUpdateUrl(cityjsonId, cityobjectId), {
            method: "post"
        }).then( (response) => { 
            console.log("CO UPDATE response", response)
            return response
        });
    }
    deleteCityObject(cityjsonId, cityobjectId){
        return fetch(this.cityobjectUrl(cityjsonId, cityobjectId), {
            method: "delete",
        }).then( (response) => { 
            console.log("CO DELETE response", response)
            return response
        });
    }
}