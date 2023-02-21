
export const GEOM_FEATURE_HTML_CLASS="geom-feature-editor"
export const SUB_GEOM_FEATURE_HTML_CLASS="sub-geom-feature-editor"

export const metadataDefaultValue = {
  "uncertainty": 1,
  "source": "",
  "notes": ""
}
export const metadataSchema = {
  "title": "Metadata",
  "type": "object",
  "className": SUB_GEOM_FEATURE_HTML_CLASS,
  //"description": "a description example",
  "properties": {
    "uncertainty": {
      "title": "Uncertainty",
      "type": "number",
      //"description": "a number description example",
      "default": 1,
      "minimum": 0,
      "exclusiveMinimum": false,
      "maximum": 1,
      "exclusiveMaximum": false
    },
    "source": {
      "title": "Source",
      "type": "string",
      //"description": "a string description example",
      "default": "",
    },
    "notes": {
      "title": "Notes",
      "type": "string",
      "format": "textarea",
      //"description": "a string description example",
      "default": "",
    },
  },
  "required": [
    "uncertainty",
    "source"
  ]
}

export const paradataDefaultValue = {
  "author": "",
  "date": "",
  "comments": ""
}
export const paradataSchema = {
  "title": "Paradata",
  "type": "object",
  "className": SUB_GEOM_FEATURE_HTML_CLASS,
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
  },
  "required": [
    "author",
    "date"
  ]
}

export const heightDefaultValue = {
  value: 1,
  metadata: {},
  paradata: {}
}
export const heightSchema = {
  "title": "Height",
    "type": "object",
    "className": GEOM_FEATURE_HTML_CLASS,
    //"description": "a description example",
    "properties": {
      "value": {
        "title": "Value",
        "type": "number",
        //"description": "a number description example",
        "default": 1,
        "minimum": 1,
        "exclusiveMinimum": false,
        "maximum": 1000,
        "exclusiveMaximum": true
      },
      "metadata": {...metadataSchema, "collapsed": true},
      "paradata": {...paradataSchema, "collapsed": true}
    },
    required: ["value"]
}


export const floorHeightDefaultValue = {
  value: 1,
  metadata: {},
  paradata: {}
}
export const floorHeightSchema = {
  "title": "Floor height",
    "type": "object",
    "className": GEOM_FEATURE_HTML_CLASS,
    //"description": "a description example",
    "properties": {
      "value": {
        "title": "Value",
        "type": "number",
        //"description": "a number description example",
        "default": 1,
        "minimum": 1,
        "exclusiveMinimum": false,
        "maximum": 500,
        "exclusiveMaximum": true
      },
      "metadata": {...metadataSchema, "collapsed": true},
      "paradata": {...paradataSchema, "collapsed": true}
    },
    required: ["value"]
}


export const numberOfFloorsDefaultValue = {
  value: 1,
  metadata: {},
  paradata: {}
}
export const numberOfFloorsSchema = {
  "title": "Number of floors",
    "type": "object",
    "className": GEOM_FEATURE_HTML_CLASS,
    //"description": "a description example",
    "properties": {
      "value": {
        "title": "Value",
        "type": "number",
        //"description": "a number description example",
        "default": 1,
        "minimum": 1,
        "exclusiveMinimum": false,
        "maximum": 1000,
        "exclusiveMaximum": true
      },
      "metadata": {...metadataSchema, "collapsed": true},
      "paradata": {...paradataSchema, "collapsed": true}
    },
    required: ["value"]
}










export const roofTypes = [
  "hip",
  "gable",
  "flat",
  "domed"
]

export const roofDefaultValue ={
  "type": {
    "value": "gable",
    "metadata": {
      "source": "random['hip', 'gable', 'flat']"
    }
  },
  "parameters": {
    "slope": {
      "value": 0.409,
      "metadata": {
        "source": "random[0.3, 0.6]"
      }
    },
    "upperFloorThickness": {
      "value": 0.248,
      "metadata": {
        "source": "random[0.2, 0.3]"
      }
    },
    "eavesOverhang": {
      "value": 0.374,
      "metadata": {
        "source": "random[0.2, 0.4]"
      }
    },
    "ids_gable": {
      "value": null,
      "metadata": {
        "source": "automatic"
      }
    }
  }
}
export const roofSchema = {
  "title": "Roof",
  "type": "object",
  "className": GEOM_FEATURE_HTML_CLASS,
  //"description": "a description example",
  "properties": {
    "type": {
      "title": "Roof type",
      "type": "object",
      "className": SUB_GEOM_FEATURE_HTML_CLASS,
      "properties": {
        "value": {
          "title": "Value",
          "type": "string",
          //"default": "hip",
          "format": "select",
          "enum": roofTypes
        },
        "metadata": {...metadataSchema, "collapsed": true},
        "paradata": {...paradataSchema, "collapsed": true}
      },
      required: ["value"]
    },
    "parameters": {
      "title": "Roof Parameters",
      "type": "object",
      "className": SUB_GEOM_FEATURE_HTML_CLASS,
      "properties": {
        "slope": {
          "title": "Roof slope",
          "type": "object",
          "collapsed": true,
          "className": SUB_GEOM_FEATURE_HTML_CLASS,
          "properties": {
            "value": {
              "title": "Value",
              "type": "number",
              "default": 0.3,
            },
            "metadata": {...metadataSchema, "collapsed": true},
            "paradata": {...paradataSchema, "collapsed": true}
          },
          required: ["value"]
        },
        "upperFloorThickness": {
          "title": "Upper floor thickness",
          "type": "object",
          "collapsed": true,
          "className": SUB_GEOM_FEATURE_HTML_CLASS,
          "properties": {
            "value": {
              "title": "Value",
              "type": "number",
              "default": 0.2,
            },
            "metadata": {...metadataSchema, "collapsed": true},
            "paradata": {...paradataSchema, "collapsed": true}
          },
          required: ["value"]
        },
        "eavesOverhang": {
          "title": "Eaves Overhang",
          "type": "object",
          "collapsed": true,
          "className": SUB_GEOM_FEATURE_HTML_CLASS,
          "properties": {
            "value": {
              "title": "Value",
              "type": "number",
              "default": 0.3,
            },
            "metadata": {...metadataSchema, "collapsed": true},
            "paradata": {...paradataSchema, "collapsed": true}
          },
          required: ["value"]
        },
        // only for flat roof
        "baseFloorThickness": {
          "title": "Base floor thickness",
          "type": "object",
          "collapsed": true,
          "className": SUB_GEOM_FEATURE_HTML_CLASS,
          "properties": {
            "value": {
              "title": "Value",
              "type": "number",
              "default": 0.3,
            },
            "metadata": {...metadataSchema, "collapsed": true},
            "paradata": {...paradataSchema, "collapsed": true}
          },
          required: ["value"]
        },
        "railingHeight": {
          "title": "Railing height",
          "type": "object",
          "collapsed": true,
          "className": SUB_GEOM_FEATURE_HTML_CLASS,
          "properties": {
            "value": {
              "title": "Value",
              "type": "number",
              "default": 1,
            },
            "metadata": {...metadataSchema, "collapsed": true},
            "paradata": {...paradataSchema, "collapsed": true}
          },
          required: ["value"]
        },
        "railingWidth": {
          "title": "Railing width",
          "type": "object",
          "collapsed": true,
          "className": SUB_GEOM_FEATURE_HTML_CLASS,
          "properties": {
            "value": {
              "title": "Value",
              "type": "number",
              "default": 0.15,
            },
            "metadata": {...metadataSchema, "collapsed": true},
            "paradata": {...paradataSchema, "collapsed": true}
          },
          required: ["value"]
        },
      },
    },
  },
  required: ["type"]
}



export const schemas = {
  height: heightSchema,
  numberOfFloors: numberOfFloorsSchema,
  floorHeight: floorHeightSchema,
  roof: roofSchema,
  metadata: metadataSchema,
  paradata: paradataSchema,
}
export default schemas

export const geomFeatureSchema = {
  "type": "object",
  "title": "Geometric Features",
  "properties": {
    height: {...heightSchema, collapsed: true},
    numberOfFloors: {...numberOfFloorsSchema, collapsed: true},
    floorHeight: {...floorHeightSchema, collapsed: true},
    roof: {...roofSchema, collapsed: true},
    //metadata: {...metadataSchema, collapsed: true},
    //paradata: {...paradataSchema, collapsed: true},
  },
  required: ["height", "numberOfFloors", "floorHeight", "roof"]
}

const compleetestSchema = {
    "type": "object",
    "title": "GUI:",
    "description": "a description example",
    "properties": {
      "stringExample": {
        "type": "string",
        "title": "A string example",
        "description": "a string description example",
        "default": "a default string example",
        "minLength": 15,
        "maxLength": 20,
        "propertyOrder": 1
      },
      "booleanExample": {
        "type": "boolean",
        "title": "A boolean example",
        "description": "a boolean description example",
        "default": true,
        "propertyOrder": 2
      },
      "numberExample": {
        "type": "number",
        "title": "A number example",
        "description": "a number description example",
        "default": 123.4,
        "minimum": 10,
        "exclusiveMinimum": true,
        "maximum": 1000,
        "exclusiveMaximum": true,
        "propertyOrder": 3
      },
      "integerExample": {
        "type": "integer",
        "title": "A integer example",
        "description": "a integer description example",
        "default": 124,
        "multipleOf": 2,
        "propertyOrder": 4
      },
      "nullExample": {
        "type": "null",
        "title": "A null example",
        "description": "a null description example",
        "default": null,
        "propertyOrder": 5
      },
      "objectExample": {
        "type": "object",
        "title": "A object example",
        "description": "a object description example",
        "properties": {
          "propertyExample1": {
            "type": "string"
          },
          "propertyExample2": {
            "type": "number"
          }
        },
        "default": {},
        "required": [
          "propertyExample1",
          "propertyExample2"
        ],
        "propertyOrder": 6
      },
      "arrayExample": {
        "type": "array",
        "title": "A array example",
        "description": "a array description example",
        "items": {
          "type": "string",
          "maxLength": 15
        },
        "default": [
          "default item 1",
          "default item 2"
        ],
        "minItems": 1,
        "uniqueItems": true,
        "propertyOrder": 7
      },
      "readOnlyExample": {
        "type": "string",
        "readonly": true,
        "default": "abc",
        "propertyOrder": 8
      },
      "readOnlyAndOptionalExample": {
        "type": "string",
        "readonly": true,
        "default": "abc",
        "propertyOrder": 9
      },
      "enumExample": {
        "type": "string",
        "enum": [
          "enum 1",
          "enum 2"
        ],
        "propertyOrder": 10
      },
      "optionalExample": {
        "type": "string",
        "propertyOrder": 11
      },
      "optionalAndDefaultExample": {
        "type": "string",
        "default": "abc",
        "propertyOrder": 12
      },
      "booleanOptionalExample": {
        "type": "boolean",
        "propertyOrder": 13
      },
      "colorExample": {
        "type": "string",
        "format": "color",
        "default": "#000000",
        "propertyOrder": 14
      },
      "textareaExample": {
        "type": "string",
        "format": "textarea",
        "propertyOrder": 15
      },
      "patternExample": {
        "type": "string",
        "pattern": "^[A-z]{3}$",
        "default": "abc",
        "propertyOrder": 16
      },
      "imagePreviewExample": {
        "type": "string",
        "default": "http://image2.sina.com.cn/bj/art/2004-08-02/U91P52T4D51657F160DT20040802125523.jpg",
        "propertyOrder": 17
      },
      "markdownExample": {
        "type": "string",
        "format": "markdown",
        "default": "###### markdown title and code example\n\n```js\nfunction foo(bar) {\n    console.log(bar);\n}\n```",
        "propertyOrder": 18
      },
      "codeExample": {
        "type": "string",
        "format": "code",
        "default": "function foo(bar) {\n    console.log(bar);\n}\n",
        "propertyOrder": 19
      },
      "itemTitleExample": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "propertyExample1": {
              "type": "string"
            },
            "propertyExample2": {
              "type": "number"
            }
          },
          "required": [
            "propertyExample1",
            "propertyExample2"
          ],
          "collapsed": true
        },
        "default": [
          {
            "propertyExample1": "foo",
            "propertyExample2": 1
          },
          {
            "propertyExample1": "bar",
            "propertyExample2": 2
          },
          {
            "propertyExample1": "baz",
            "propertyExample2": 3
          },
          {
            "propertyExample1": "abc",
            "propertyExample2": 4
          },
          {
            "propertyExample1": "def",
            "propertyExample2": 5
          },
          {
            "propertyExample1": "ghi",
            "propertyExample2": 6
          }
        ],
        "propertyOrder": 20
      },
      "optionalObjectExample": {
        "type": "object",
        "properties": {
          "propertyExample1": {
            "type": "string"
          },
          "propertyExample2": {
            "type": "number"
          }
        },
        "maxProperties": 1,
        "minProperties": 0,
        "propertyOrder": 21
      },
      "collapsedObjectExample": {
        "type": "object",
        "properties": {
          "propertyExample1": {
            "type": "string"
          }
        },
        "collapsed": true,
        "propertyOrder": 22
      },
      "emptyEnumExample": {
        "type": "string",
        "enum": [],
        "propertyOrder": 23
      },
      "uploadFileExample": {
        "type": "string",
        "format": "base64",
        "propertyOrder": 24
      },
      "requiredWhenExample": {
        "type": "object",
        "properties": {
          "kind": {
            "type": "string",
            "enum": [
              "enum 1",
              "enum 2",
              "enum 3"
            ]
          },
          "propertyExample1": {
            "type": "number",
            "requiredWhen": [
              "kind",
              "===",
              "enum 1"
            ]
          },
          "propertyExample2": {
            "type": "string",
            "requiredWhen": [
              "kind",
              "===",
              "enum 2"
            ]
          },
          "propertyExample3": {
            "type": "number",
            "requiredWhen": [
              "kind",
              "in",
              [
                "enum 1",
                "enum 2"
              ]
            ]
          },
          "propertyExample4": {
            "type": "string"
          },
          "propertyExample5": {
            "type": "string"
          },
          "propertyExample6": {
            "type": "string",
            "optionalWhen": [
              "kind",
              "===",
              "enum 2"
            ]
          }
        },
        "required": [
          "kind",
          "propertyExample4"
        ],
        "propertyOrder": 25
      },
      "checkboxBooleanExample": {
        "type": "boolean",
        "default": true,
        "format": "checkbox",
        "propertyOrder": 26
      },
      "enumTitlesExample": {
        "type": "string",
        "enum": [
          "enum 1",
          "enum 2"
        ],
        "enumTitles": [
          "enum title 1",
          "enum title 2"
        ],
        "propertyOrder": 27
      },
      "itemTitleEnumTitleExample": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "propertyExample1": {
              "type": "string",
              "enum": [
                "foo",
                "bar"
              ],
              "enumTitles": [
                "foo title",
                "bar title"
              ]
            }
          },
          "required": [
            "propertyExample1"
          ]
        },
        "default": [
          {
            "propertyExample1": "bar"
          }
        ],
        "propertyOrder": 28
      },
      "selectBooleanExample": {
        "type": "boolean",
        "default": false,
        "format": "select",
        "propertyOrder": 28
      },
      "select2BooleanExample": {
        "type": "boolean",
        "default": false,
        "format": "select2",
        "propertyOrder": 30
      },
      "stringEnumSelectExample": {
        "type": "string",
        "format": "select",
        "enum": [
          "enum 1",
          "enum 2"
        ],
        "enumTitles": [
          "enum title 1",
          "enum title 2"
        ],
        "propertyOrder": 31
      },
      "stringEnumRadioboxExample": {
        "type": "string",
        "format": "radiobox",
        "enum": [
          "enum 1",
          "enum 2"
        ],
        "enumTitles": [
          "enum title 1",
          "enum title 2"
        ],
        "propertyOrder": 32
      },
      "numberEnumSelectExample": {
        "type": "number",
        "format": "select",
        "enum": [
          1,
          2
        ],
        "enumTitles": [
          "one",
          "two"
        ],
        "propertyOrder": 33
      },
      "numberEnumRadioboxExample": {
        "type": "number",
        "format": "radiobox",
        "enum": [
          1,
          2
        ],
        "enumTitles": [
          "one",
          "two"
        ],
        "propertyOrder": 34
      },
      "classNameExample": {
        "type": "string",
        "className": "custom-class-string",
        "propertyOrder": 35
      },
      "enumArrayExample": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "enum": [
          "foo",
          "bar"
        ],
        "enumTitles": [
          "foo title",
          "bar title"
        ],
        "propertyOrder": 36
      },
      "enumArraySelect2Example": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "enum": [
          "foo",
          "bar"
        ],
        "enumTitles": [
          "foo title",
          "bar title"
        ],
        "format": "select2",
        "propertyOrder": 37
      }
    },
    "required": [
      "stringExample",
      "booleanExample",
      "numberExample",
      "integerExample",
      "nullExample",
      "objectExample",
      "arrayExample",
      "readOnlyExample",
      "enumExample",
      "colorExample",
      "textareaExample",
      "patternExample",
      "imagePreviewExample",
      "markdownExample",
      "codeExample",
      "performanceExample",
      "itemTitleExample",
      "optionalObjectExample",
      "propertyOrderExample",
      "collapsedObjectExample",
      "emptyEnumExample",
      "uploadFileExample",
      "requiredWhenExample",
      "checkboxBooleanExample",
      "enumTitlesExample",
      "itemTitleEnumTitleExample",
      "selectBooleanExample",
      "select2BooleanExample",
      "stringEnumSelectExample",
      "stringEnumRadioboxExample",
      "numberEnumSelectExample",
      "numberEnumRadioboxExample",
      "classNameExample",
      "enumArrayExample",
      "enumArraySelect2Example"
    ]
}