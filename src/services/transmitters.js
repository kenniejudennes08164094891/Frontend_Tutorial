import { referenceVariableEnums } from "../utils/stores";
const userRecord = [];

export function setRecord(referenceVariable,key, value){
     if(referenceVariable === referenceVariableEnums.localStorage){
        userRecord.push(value);
         const stringifyData = JSON.stringify(userRecord);
        localStorage.setItem(key,stringifyData)
     }
     return userRecord;
}

export function getRecord(){
    const getData = localStorage.getItem("user");
    let userRecord = [];
    if(getData !== null){
        const parseData = JSON.parse(getData);
        userRecord = parseData;
    }
    return userRecord;
}