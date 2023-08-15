export function jsonValidator(jsonString){

    var jsonObject;
    
    try {
        jsonObject = JSON.parse(jsonString);
    } catch (e) {
        return false;
    }

    return jsonObject;
}