import { referenceVariableData } from "../utils/stores";

const userRecord = [];
const fileData = [];


export async function setRecord(referenceVariable, key, value) {
  try {
    if (referenceVariable === referenceVariableData.localStorage) {
      userRecord.push(value);
      const stringifyData = JSON.stringify(userRecord);
      localStorage.setItem(key, stringifyData);
    }
    return userRecord;
  } catch (error) {
    console.error("Error setting record:", error);
    throw error;
  }
}

export async function getRecord() {
  try {
    const getData = localStorage.getItem("user");
    let userRecord = [];
    if (getData !== null) {
      userRecord = JSON.parse(getData);
    }
    return userRecord;
  } catch (error) {
    console.error("Error getting record:", error);
    throw error;
  }
}

// File Transmission of data

export async function setUploadedFileData(file){
 try{
   fileData.push(file);
   console.log("set fileData>>",fileData)
  return fileData;
 }catch(err){
console.error("error from set record>>", err);
 }
}

export async function getUploadedFile(){
  try{
    console.log("get fileData>>",fileData)
  return fileData;
  }catch(err){
    console.error("error from get record")
  }
}