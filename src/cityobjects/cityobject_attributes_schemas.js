
export const CITYOBJECT_ATTRIBUTES_HTML_CLASS="cityobject-attributes-editor"
export const SUB_CITYOBJECT_ATTRIBUTES_HTML_CLASS="sub-cityobject-attributes-editor"


/// sources schema done:
export const sourcesSchema = {
  "title": "Sources",
  "type": "array",
  "className": SUB_CITYOBJECT_ATTRIBUTES_HTML_CLASS,
  //"description": "a description example",
  "items": {
    "type": "object",
    "properties": {
      "name": {
        "title": "Name of the source",
        "type": "string",
        //"description": "a string description example",
        "default": "",
      },
      "type": {
        "title": "Type of the source",
        "type": "select",
        "enum": sourceTypes
      },
      "notes": {
        "title": "Notes",
        "type": "string",
        "format": "textarea",
        "default": ""
        //"description": "a string description example",
      },
    }
  }
}


/// paradata schema done:
export const paradataSchema = {
  "title": "Paradata",
  "type": "object",
  "className": SUB_CITYOBJECT_ATTRIBUTES_HTML_CLASS,
  //"description": "a description example",
  "properties": {
    "author": {
      "title": "Author",
      "type": "string",
      //"description": "a string description example",
      "default": "",
    },
    "date": {
      "title": "Date",
      "type": "string",
      "format": "date",
      //"description": "a string description example",
      "default": "",
    },
    "comments": {
      "title": "Comments",
      "type": "string",
      "format": "textarea",
      //"description": "a string description example",
      "default": "",
    },
    "uncertainty": {
      "title": "Level of uncertainty",
      "type": "select",
      "enum": uncertaintyLevels,
    },
    "version": {
      "title": "Version",
      "type": "string",
      "default": "0",
    },
  },
  "required": [
    "author",
    "date"
  ]
}

/**
 * Template for a simple main attribute: meaning a int/str/bool/number main attribute
 * @param {str} title the displayed attribute title.
 * @param {object} valueSchema the schema of the "value" property 
 * @returns a schema for a simple main attribute with its value, sources and paradata definition
 */
export function simpleMainAttributeSchema(title, valueSchema){
  valueSchema["title"] = "Value"
  return {
    "title": title,
      "type": "object",
      "className": CITYOBJECT_ATTRIBUTES_HTML_CLASS,
      //"description": "a description example",
      "properties": {
        "value": valueSchema,
        "sources": {...sourcesSchema, "collapsed": true},
        "paradata": {...paradataSchema, "collapsed": true}
      },
      required: ["sources", "paradata"]
  }
}

///done
export const heightSchema = simpleMainAttributeSchema("Height", {
  "title": "Value",
  "type": "number",
  //"description": "a number description example",
  
  "minimum": 0.2,
  "exclusiveMinimum": false,
  "maximum": 200,
  "exclusiveMaximum": true
})


///done
export const floorHeightSchema = simpleMainAttributeSchema("Floor height", {
  "type": "number",
  //"description": "a number description example",
  
  "minimum": 0.2,
  "exclusiveMinimum": false,
  "maximum": 10,
  "exclusiveMaximum": true
})

///done
export const numberOfFloorsSchema = simpleMainAttributeSchema("Number of floors", {
  "type": "number",
  //"description": "a number description example",
  
  "minimum": 1,
  "exclusiveMinimum": false,
  "maximum": 100,
  "exclusiveMaximum": true
})





/// done
export const uncertaintyLevels = [
  "low",
  "medium",
  "high"
]

/// done
export const sourceTypes = [
  "cartography",
  "technical drawing",
  "photo",
  "perspective drawing",
  "written document",
  "random",
  "inferred"
]


export const roofTypes = [
  "hip",
  "gable",
  "flat",
  "domed"
]


/**
 * Template for a simple secondary attribute: meaning a int/str/bool/number secondary attribute
 * The difference with simpleMainAttributeSchema() are the css classes and the fact that the object starts collapsed
 * @param {str} title the displayed attribute title.
 * @param {object} valueSchema the schema of the "value" property 
 * @returns a schema for a simple secondary attribute with its value, sources and paradata definition
 */
export function secondaryAttributeSchema(title, valueSchema){
  const schema = simpleMainAttributeSchema(title, valueSchema)
  schema["collapsed"] = true
  schema["className"] = SUB_CITYOBJECT_ATTRIBUTES_HTML_CLASS
  return schema
}


export const slopeSchema = secondaryAttributeSchema("Roof slope", {
  "type": "number",
})


export const roofTypeSchema = secondaryAttributeSchema("Roof type", {
  "type": "string",
  "format": "select",
  "enum": roofTypes
})

export const roofSlopeSchema = secondaryAttributeSchema("Roof slope", {"type": "number"})
roofSlopeSchema["requiredWhen"] = [
  "slope",
  "===",
  "any"
]

export const upperFloorThicknessSchema = secondaryAttributeSchema("Upper floor thickness", {"type": "number"})
upperFloorThicknessSchema["requiredWhen"] = [
  "upperFloorThickness",
  "===",
  "any"
]

export const eavesOverhangSchema = secondaryAttributeSchema("Eaves Overhang", {"type": "number"})
eavesOverhangSchema["requiredWhen"] = [
  "eavesOverhang",
  "===",
  "any"
]

export const railingHeightSchema = secondaryAttributeSchema("Railing height", {"type": "number"})
railingHeightSchema["requiredWhen"] = [
  "railingHeight",
  "===",
  "any"
]
export const railingWidthSchema = secondaryAttributeSchema("Railing width", {"type": "number"})
railingWidthSchema["requiredWhen"] = [
  "railingWidth",
  "===",
  "any"
]

export const baseFloorThicknessSchema = secondaryAttributeSchema("Base floor thickness", {"type": "number"})
baseFloorThicknessSchema["requiredWhen"] = [
  "baseFloorThickness",
  "===",
  "any"
]

export const domePercentVertRadiusSchema = secondaryAttributeSchema("Dome vertical radius (%)", {"type": "number"})
domePercentVertRadiusSchema["requiredWhen"] = [
  "domePercentVertRadius",
  "===",
  "any"
]

export const domePercentBaseRadiusSchema = secondaryAttributeSchema("Dome base radius (%)", {"type": "number"})
domePercentBaseRadiusSchema["requiredWhen"] = [
  "domePercentBaseRadius",
  "===",
  "any"
]

export const roofSchema = {
  "title": "Roof",
  "type": "object",
  "className": CITYOBJECT_ATTRIBUTES_HTML_CLASS,
  //"description": "a description example",
  "properties": {
    "type": roofTypeSchema,
    "parameters": {
      "title": "Roof Parameters",
      "type": "object",
      "className": SUB_CITYOBJECT_ATTRIBUTES_HTML_CLASS,
      "properties": {
        "slope": roofSlopeSchema,
        "upperFloorThickness": upperFloorThicknessSchema,
        "eavesOverhang": eavesOverhangSchema,
        // only for flat roof
        "railingHeight": railingHeightSchema,
        "railingWidth": railingWidthSchema,
        "baseFloorThickness": baseFloorThicknessSchema,
        "domePercentVertRadius": domePercentVertRadiusSchema,
        "domePercentBaseRadius": domePercentBaseRadiusSchema,
      },
    },
  },
  
}



export const schemas = {
  height: heightSchema,
  numberOfFloors: numberOfFloorsSchema,
  floorHeight: floorHeightSchema,
  roof: roofSchema,
  sources: sourcesSchema,
  paradata: paradataSchema,
}
export default schemas

export const cityobjectAttributesSchema = {
  "type": "object",
  "title": "Attributes",
  "properties": {
    height: {...heightSchema, collapsed: true},
    numberOfFloors: {...numberOfFloorsSchema, collapsed: true},
    floorHeight: {...floorHeightSchema, collapsed: true},
    roof: {...roofSchema, collapsed: true},
    //sources: {...sourcesSchema, collapsed: true},
    //paradata: {...paradataSchema, collapsed: true},
  },
  required: ["height", "numberOfFloors", "floorHeight", "roof"]
}

export const getAttributesPathWithNumberValuesRecursive = (keys, schema) =>{
  console.log("getAttributesPathWithNumberValuesRecursive() keys", keys, "schema",schema)
  if("type" in schema && schema.type=="number"){
    return [keys]
  }
  if("properties" in schema){
    const result = Object.entries(schema.properties).map(([subPropertyName, propertySchema]) => getAttributesPathWithNumberValuesRecursive([...keys, subPropertyName], propertySchema))
    return result.flat()
  }
  return []
}

console.log("cityobjectAttributesSchema", cityobjectAttributesSchema)
console.log("heightSchema", heightSchema)
export const attributesPathWithNumberValues=getAttributesPathWithNumberValuesRecursive([], cityobjectAttributesSchema)
/**
 * algorithm to get properties with numbers:
 * - recursive: propertyName, schema
 * 
 * 
 */
