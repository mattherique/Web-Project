export function defaultText(component){
    component["changeText"] = (e, field, callback=null) => {
        var changeObj = {};
        changeObj[field] = e.target.value;
        component.setState(changeObj, callback);
    }
}