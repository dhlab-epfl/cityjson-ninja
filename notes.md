


# Vue basics:

Those notes are taken from this [Vue tutorial](https://vuejs.org/tutorial/#step-1)

Each Vue file/component is a HTML-like file composed of a `<template>` tag containing the HTML template, a `<script>` tag containg the JS code and an optional `<style>` tag for css styling.

## HTML templating

`v-bind`: dynamically link this div's to the components property `dynamicId`:
- long: `<div v-bind:id="dynamicId"></div>`
- short: `<div :id="dynamicId"></div>`

`v-on`: handle the onClick event from this button event through the `increment()` method of the Vue component (passes the DOM event to the increment method):
- long: `<button v-on:click="increment">{{ count }}</button>`
- short: `<button @click="increment">{{ count }}</button>`

`v-model`: for input tags, sync up the `text` state property from the component with the input content: 
- `<input v-model="text">`

Conditional rendering with `v-if`, `v-else`:
```
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

List Rendering with `v-for`:
```
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

References:
-`<p ref="p">hello</p>` makes the DOM element accessible in JS through `this.$refs.p`

## JS 

The JS part of a Vue component should `export default` an object with the following properties:
- name
- components: the list of Vue subcomponents it is using
- props: fixed properties passed on from the parent component
- data: the state of the component, a function returning an object with the initial values of its state
- computed: object containing functions, each returns a computes property that is computed from `props` and `data`
- watch: functions to be executed once the property with the same name as the function is changed, args: `newValue`, `oldValue`
- methods: methods that can be called from the component, can access the data and props from `this.X`
- mounted: fn to execute once the component is mounted
- emits: list of event the component can send to its parent, can then be emitted with `this.$emits('event-name', value)`

### Watch

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark.'
    }
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion, oldQuestion) {
      // do something that makes the world a better palce
    }
  }
}
```
#### Deep Watchers 

To be best avoided:
```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // Note: `newValue` will be equal to `oldValue` here
        // on nested mutations as long as the object itself
        // hasn't been replaced.
      },
      deep: true
    }
  }
}
```

# Useful links

[Vue component lifecycle Diagram](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)

[Watchers](https://vuejs.org/guide/essentials/watchers.html)