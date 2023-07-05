
import * as cas from './cityobject_attributes_schemas';

const debugging = false

function ensureNumberValuesRecursive(attributesRec, path, pathIndex){
    console.log("\tensureNumberValuesRecursive() pathIndex", pathIndex, "path", path, "attributesRec", JSON.parse(JSON.stringify(attributesRec)))
    Object.entries(attributesRec).forEach(([entryName,entry])=>{
        if( entryName===path[pathIndex]){
            if(pathIndex==(path.length-1)){
                console.log("\t\tensureNumberValuesRecursive FOUND NUMBER TO ENSURE with path", path)
                if(parseFloat(entry)==entry){
                    console.log("\t\t\t...and it worked")
                    attributesRec[entryName] = parseFloat(entry)
                }
            }else if(typeof entry === 'object' && entry !== null){
                ensureNumberValuesRecursive(entry, path, pathIndex+1)
            }

        }
    })
}

export function ensureNumberValues(cityobject){
    console.log("ensureNumberValues()")
    const attributes = cityobject["attributes"]
    console.log("\tattributes before 1:", attributes)
    console.log("\tattributes before 2:", JSON.parse(JSON.stringify(attributes)))
    if(attributes){
        cas.attributesPathWithNumberValues.forEach(path=>ensureNumberValuesRecursive(attributes, path, 0))
    }else{
        console.warn("cityobject with id", cityobject["id"],"doesn't have the 'attributes' field.")
    }
    console.log("\tattributes after:", attributes)
    return cityobject
}

export function JsonComparison(is_identical, keys, reason, left, right){
    return {
        is_identical: is_identical,
        keys: keys,
        reason: reason,
        left: left,
        right: right
    }
}

/**Compares two supposed JSONs made exclusively of types [bool, int, float, str, list, dict]

Does a depth first search to find non-matching values.
Note: as Sequences, only lists are supported (no tuple, set, range, ...)

arguments:
- left, right: jsons to be compared
- stop_on_first_diff: whether to stop once a single difference has been found (=whether to simply check for any difference or find all differences)
- compare_func (optional): a custom comparison function taking two arguments and returning a boolean
- raise_exception_for_unsupported_type: whether to raise an exception if any entry is not of type [bool, int, float, str, list, dict]
- keys: do not set, used for recursion, indicates which keys have been traversed

returns: a list of JsonComparison namedtuple, each with elements:
- is_identical: whether the two JSONs are identical
- keys: the list of keys indicating where the equality test first failed.
- reason: why the test failed
- left: the left value where the test failed.
- right: the right value where the test failed.
If the two JSONs are identical, the list will consist of a single JsonComparison with is_identical=true.
If they are different and stop_on_first_diff==true, the list will consist of a single JsonComparison for the first place where the test failed.
If they are different and stop_on_first_diff==false, it will return one JsonComparison per difference.
*/
export function compareJsons(
    left, right, stop_on_first_diff=false, compare_func=null, 
    raise_exception_for_unsupported_type = true, keys=[]
){
    if(debugging){
        print("compareJsons() key: ", keys, "left:",left, "right:",right, "left==right:",left==right)
    }
    if((typeof left) != (typeof right)){
        return [JsonComparison(false, keys, "different types", left, right)]
    }
    // simple equality test for number, string and boolean
    else if(typeof left==="number" || typeof left==="string" || typeof left==="boolean" || typeof left==="undefined" || left ===null){
        if(compare_func == null){
            const result = [JsonComparison(left==right, keys, "equality test", left, right)]
            return result
        }else{
            return [JsonComparison(compare_func(left, right, keys), keys, "compare_func test", left, right)]
        }
    }
    // object comparison
    else if(typeof left==="object" && Object.prototype.toString.apply(left) !== '[object Array]'){
        const leftKeys = Object.keys(left)
        const rightKeys = new Set(Object.keys(left))
        if(leftKeys.length!=rightKeys.size || !leftKeys.every(k=>rightKeys.has(k))){
            return [JsonComparison(false, keys, "dicts with different keys", left, right)]
        }
        let results = []
        let both_identical = true
        
        for(let k in left){
            const new_results = compareJsons(left[k], right[k], stop_on_first_diff, compare_func, raise_exception_for_unsupported_type, [...keys, k])
            both_identical = both_identical && new_results[0].is_identical
            if(stop_on_first_diff && !both_identical){
                return new_results
            }
            results= [...results, ...new_results]
        }
        if(both_identical){
            return [JsonComparison(true, keys, "dict equality success", left, right)]
        }else{
            return results.filter(r=>!r.is_identical) //[r for r in results if !r.is_identical]
        }
    // list comparison
    }else if(typeof left==="object" && Object.prototype.toString.apply(left) === '[object Array]'){
        if(left.length != right.length){
            return [JsonComparison(false, keys, "lists with different length", left, right)]
        }
        let results = []
        let both_identical = true
        for(let i=0; i<left.length; i++){
            const new_results = compareJsons(left[i], right[i], stop_on_first_diff, compare_func, raise_exception_for_unsupported_type, [...keys, i])
            both_identical = both_identical && new_results[0].is_identical
            if(stop_on_first_diff && !both_identical){
                return new_results
            }
            results= [...results, ...new_results]
        }
        if(both_identical){
            return [JsonComparison(true, keys, "list equality success", left, right)]
        }else{
            return results.filter(r=>!r.is_identical) //[r for r in results if !r.is_identical]
        }
    // other types are unsupported -> error or false
    }else{
        if(raise_exception_for_unsupported_type){
            throw "compareJsons(): typeof left=="+(typeof left)+" !in [boolean, number, string, Array, object, undefined]."+ 
                "\n\tkeys="+(keys) + 
                "\n\ttypeof left="+(typeof left)+", left="+left+ 
                "\n\ttypeof right="+(typeof right)+", right="+right
        }else{
            return [JsonComparison(false, keys, "unsupported types", left, right)]
        }
    }
}