import { referenceVariableEnums } from "../utils/stores";
const userRecord = [];

export async function setRecord(referenceVariable,key, value){
  try{
       if(referenceVariable === referenceVariableEnums.localStorage){
        userRecord.push(value);
         const stringifyData = JSON.stringify(userRecord);
        localStorage.setItem(key,stringifyData)
     }
     return userRecord;
  }catch(error){
    console.error("error from setData>>", error);
  }
}

export async function getRecord(){
  try{
      const getData = localStorage.getItem("user");
    let userRecord = [];
    if(getData !== null){
        const parseData = JSON.parse(getData);
        userRecord = parseData;
    }
    return userRecord;

  }catch(error){
    console.error("error from get user data>>", error);
  }
}