import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeEventEmitter } from "react-native";


const kSelected = "kSelected";
const kgroupsArray = "kGroupsArray";
const kFirstLaunch = "kFirstLaunch";

class UserData extends NativeEventEmitter {
  selected = 0;
  groupsArray = [];
  isFirst=true;

    constructor(props) {
    super(props);
    this.getAllDataFromStorage();
    
  }

  
  async getAllDataFromStorage() {
    console.log("gettingAllDataFromStorage")
    var a = AsyncStorage.getItem(kSelected)
      .then((el) => (this.selected = el && !isNaN(el) ? parseInt(el) : 0))
      .catch((e) => {
        this.selected = 0;
      });

    var b = AsyncStorage.getItem(kgroupsArray)
      .then((el) => {
        this.groupsArray = el ? JSON.parse(el) : [];
      })
      .catch((e) => {
        this.groupsArray = [];
      });
    var c = AsyncStorage.getItem(kFirstLaunch)
      .then((el) => {
        this.isFirst = el ? JSON.parse(el) : true;
      })
      .catch((e) => {
        this.isFirst = true;
      });
    await a;
    await b;
    await c;

    //console.log(this.selected, this.groupsArray)
    this.emitChange();
  }

  // getDataToShow() {
  //   //console.log(this.qrArray, "to show");
  //   if (this.groupsArray.length == 0) {
  //     return { content: null };
  //   } else {
  //     return {
  //       //false: this.firstCode,
  //       selected: this.selected,
  //       ...this.groupsArray[this.selected],
  //       //type: this.typeArray[this.selected],
  //     };
  //   }
  // }

  async selectGroup(index){
    this.selected=index;
    console.log(this.selected, "selected");
    this.storeData();
    this.emitChange();
  }

  async deleteGroup(groupName) {
    if (this.groupsArray.length==1) return console.log("Должна быть добавлена хотя бы 1 группа")
    console.log("deleting", groupName);
    let index = this.groupsArray.findIndex(function(item) {
      console.log('findIndex', item);
      return item == groupName;
    })
    console.log(index);
    this.groupsArray.splice(index,1);

    if(this.selected==index){
      this.selected=0;
    }
    this.storeData();
    this.emitChange();
  }

  async insertGroup(elem) {
    this.groupsArray.push(elem);
    console.log(this.groupsArray, "insertED");
    //this.typeArray.set(type);
    this.storeData();
    this.emitChange();
  }

  async storeData() {
    console.log("storing", this.groupsArray)
    await AsyncStorage.setItem(kSelected, this.selected.toString());
    await AsyncStorage.setItem(kgroupsArray, JSON.stringify(this.groupsArray));
    await AsyncStorage.setItem(kFirstLaunch, JSON.stringify(false));
    
  }

  async clearCache() {
    await AsyncStorage.clear();
  }

  addChangeListener(callback) {
    this.addListener("data.change", callback);
  }

  removeChangeListener(callback) {
    this.removeAllListeners("data.change", callback);
  }

  emitChange() {
    this.emit("data.change");
  }
}

export default new UserData();
