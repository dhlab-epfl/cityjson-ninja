

# Missing objects bug

Bug statement: if an editable object is absent from "initial value" given to the editor (e.g. there is no "paradata" entry for an attribute), it is shown with the "not exists" tick.
Unticking the "not exists" tick doesn't make it available.

details:
- it is confirmed for objects and arrays
    - adding an empty array or empty object solves it
    - top-level attributes (height, nb floors, etc...) are not affected, but level-2 objects are (paradata, sources, ...)
        e.g. a missing top-level "height" object will be available to edit nonetheless, while a missing level-2 paradata will not
- simple types (int, str, bool, etc...) are not affected
- arrays elements that are added are not affected as well (e.g. sources array elementss)

open questions:
- what is the source of the bug?
- is it linked to non-"required" objects/arrays?

solution propositions:
1. ensure there is always an empty object for expected object attributes
    -> what about nested objects?

problematic:
- nested objects: 


# Questions Beatrice 4.4.2023

- json-editor schema: the "rule" entries are no longer required right?
- required dilemma:
    - if something is not required, unticking "not exists" doesn't work properly
    - if something is required: an empty object will be populated
        - for str fields (such as paradata author&message), it is not a problem
        - for numbers however, it is important they are NOT required: if required, it will initialize one with value 0, which might lead to countless bugs&misunderstanding (!)
- Is it ok for paradata&sources to be required?
    - sources will be an empty list, no pb
    - upon saving, if missing, a paradata object will automatically be added with empty author&date ("")