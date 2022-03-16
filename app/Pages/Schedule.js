import React, { Component } from 'react';
import { FlatList, View, StyleSheet, Text, Image, Dimensions, Button, Pressable,TouchableOpacity } from 'react-native';
import { shouldUseActivityState } from 'react-native-screens';
import Svg, {Path, Use} from 'react-native-svg';
import {styles} from "./constant/styles";
import Settings from "./assets/settings.svg";
import UserData from "../UserData";
import Loading from "./Loading";
import SelectDropdown from 'react-native-select-dropdown'
//import Settings from "./assets/settings.svg";
const c = "числитель";
const z = "знаменатель";
const { width, height } = Dimensions.get('screen');
var d = new Date();
//console.log(d);
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
if (d.getDay()==0) d.setDate(d.getDate() - 1);
let todayDayOfWeek = weekday[d.getDay()];
var arr = [];
let json = require("./assets/paru.json");
var currentWeekNumber = require('current-week-number');
let sepWeek = currentWeekNumber('September 1, 2021');
let nowWeek = currentWeekNumber() - sepWeek + 1;
let today="";
let data="";
var f = 0;
var idTime="";
//var timeToP = "";
var pToday =[];
var day="";
var cl="";
var times="бордюра НЕТ";
export default class Schedule extends Component {
  flatListRef = null;
  constructor(props) {
    super(props);
    //this.stte = UserData.getDataToShow();
    this.state = {
      isLoading: true,
      timeToPair:"",
      scrollPosition:nowWeek-1,
      cards:[],
    };
    //this.updateDataForWeek();
  }   
  async timeForPair(pairsToday){
    var timeToP = ""; 
    pToday = pairsToday;
    
    const help = function(n, type){
      if (n>9 && n<21 || n%10>4 ||n%10==0 ) return type?" часов ":" минут";
      else if(n%10==1) return type?" час ":" минуту";
      else if(n%10<6 && n%10>1) return type?" часа ":" минуты";
    }
    const helpOst = function(n, type){
      if (n>9 && n<21 || n%10>4 ||n%10==0 ) return type?" часов ":" минут";
      else if(n%10==1) return type?" час ":" минута";
      else if(n%10<6 && n%10>1) return type?" часа ":" минуты";
    }
    //console.log(pairsToday);
    pairsToday.forEach(element => {
      var time1 = element.get("time1");
      var time2 = element.get("time2");
      var id = element.get("id");
      var time = time1.split(":");
      var timee = time2.split(":");
      var datetime = new Date();
      var datetime2 = new Date();
      
      var d = new Date();
      //console.log(time, datetime);
      datetime.setHours(time[0]);
      datetime.setMinutes(time[1]);
      datetime2.setHours(timee[0]);
      datetime2.setMinutes(timee[1]);  
      var diffs = datetime.getTime()-d.getTime();
      var diffs3 = datetime2.getTime()-d.getTime();
      var min = Math.trunc((diffs3/1000)/60);
     var h = Math.trunc(min/60);
     //console.log(min,h);
      if (diffs>0) {
      //console.log(diffs, d, datetime);
      // if(times!="бордюра НЕТ") return false;
      // else times = "бордюр сделан";
      //console.log(times);
      var min = Math.trunc((diffs/1000)/60);
      var h = Math.trunc(min/60);
      min = min-h*60;
     
      if (id==idTime || idTime==""){
      idTime=id;
      //console.log(idTime);
      if (h==0){
        timeToP=min+help(min, 0);
      }
      else if (min==0){
        timeToP=h+help(h, 1);
      }
      else{ timeToP=h+help(h, 1)+min+help(min, 0);
      //console.log(timeToP);
    }
      f = 1;
      }
    }else if (min==0&&h==0){
      idTime="";
    } else if ( diffs3>0){
      //console.log(times);
      var min = Math.trunc((diffs3/1000)/60);
      var h = Math.trunc(min/60);
      min = min-h*60;
      
      if (id==idTime || idTime==""){
      idTime=id;
      //console.log(idTime);
      if (h==0){
        timeToP=min+helpOst(min, 0);
      }
      else if (min==0){
        timeToP=h+helpOst(h, 1);
      }
      else{ timeToP=h+helpOst(h, 1)+min+helpOst(min, 0);
      //console.log(timeToP);
    }
      }
      f = 0;
    }
    
    });
    //console.log(timeToP);
    await this.handleTextChange (timeToP);
    //setTimeout(this.forceUpdate(), 2500);
    //this.setState({timeToPair: timeToP});
    
  }
  handleTextChange = (timeToP)=> {
    this.setState({timeToPair: timeToP});
  }
  async componentDidMount(){
    
    console.log("componentDIDmount");
  }
 
  checkDayAndPair(date,id){
    //console.log("checkDayAndPair");
    var d=new Date();
    if(date.toDateString()!=d.toDateString()) return false;
    if(id!=idTime) return false;
    return true;
  }

  handleLoadChange = ()=> {
    this.setState({isLoading:false})
  }

  async componentWillMount() {
    //this.updateDataForWeek();
    
    //await UserData.getAllDataFromStorage();
    let timer2 = setTimeout(this.handleLoadChange,2000);
    let timer = setTimeout(this.scrollToIndex,2000);
    console.log(UserData.groupsArray);
    await this.fetchMoreData(todayDayOfWeek, d, UserData.groupsArray[UserData.selected]);
    

    console.log("componentWillMount");  
    
  }
  async fetchMoreData(dayOfWeek, clicked, group) {

    console.log(group);
    //console.log(this.state.data);
    day = dayOfWeek;
    cl=clicked;
    arr = [];
    idTime="";
    console.log("fetching...");
    times="бордюра НЕТ";
    if(clicked.toDateString()!=d.toDateString()) 
      today=clicked.toDateString();
    else
      today=d.toDateString();
    const pari = new Array();
    //console.log(dayOfWeek);
    for (let i = 1; i < 8; i++) {
      //console.log(this.state.scrollPosition);
      var s =   json["ИУ"]["ИУ5"][group][dayOfWeek][(this.state.scrollPosition+1) % 2 ? "C" : "Z"]['para' + i];
      if (s["subject"] != "") {
  
        const para = new Map();
        for (let p in s) {
          para.set(p, s[p]);
        }
        para.set('day', clicked)
        //console.log(para.get('id'));
        pari.push(para);
      }
    }
    await this.timeForPair(pari);
    setInterval(()=>{this.timeForPair(pToday)}, 10000);
    this.setState({cards: pari});
    //arr.length = pari.length;
    
  }

  getMonday(date) {
   // //console.log(date);
    //d = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    date.setDate(diff);
    return date;
  }
  getTuesday(date) {
    //d = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -7 : 2); // adjust when day is sunday
      date.setDate(diff);
      ////console.log(date);
      return date;
  }
  getWednesday(date) {
    //d = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -8 : 3); // adjust when day is sunday
      date.setDate(diff);
     // //console.log(date);
      return date;
  }
  getThursday(date) {
    //d = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -9 : 4); // adjust when day is sunday
      date.setDate(diff);
    ////console.log(date);
    return date;
  }
  getFriday(date) {
   // d = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -10 : 5); // adjust when day is sunday
      date.setDate(diff);
    ////console.log(date);
    return date;
  }
  getSaturday(date) {
   // d = new Date(d);
    var day = date.getDay(),
      diff = date.getDate() - day + (day == 0 ? -11 : 6); // adjust when day is sunday
      date.setDate(diff);
      //console.log(date);
      return date;
  }
  nextWeek(k){
    //console.log(firstWeek,k);
    let nextWeek = new Date('September 1, 2021');
 // nextWeek=firstWeek;
  nextWeek.setDate(7*k);
    //console.log(date.getDate());
    //console.log( k);
    return nextWeek;
  }
  updateDataForWeek(){
    // var firstWeek = new Date('September 1, 2021');
    
    // console.log(firstWeek);
    data = [
      {
        id: 1,
        monday: this.getMonday(this.nextWeek(0)),
        tuesday: this.getTuesday(this.nextWeek(0)),
        wednesday: this.getWednesday(this.nextWeek(0)),
        thursday: this.getThursday(this.nextWeek(0)),
        friday: this.getFriday(this.nextWeek(0)),
        saturday: this.getSaturday(this.nextWeek(0)),
      },
      {
        id: 2,
        monday: this.getMonday(this.nextWeek(1)),
        tuesday: this.getTuesday(this.nextWeek(1)),
        wednesday: this.getWednesday(this.nextWeek(1)),
        thursday: this.getThursday(this.nextWeek(1)),
        friday: this.getFriday(this.nextWeek(1)),
        saturday: this.getSaturday(this.nextWeek(1)),
      },
      {
        id: 3,
        monday: this.getMonday(this.nextWeek(2)),
        tuesday: this.getTuesday(this.nextWeek(2)),
        wednesday: this.getWednesday(this.nextWeek(2)),
        thursday: this.getThursday(this.nextWeek(2)),
        friday: this.getFriday(this.nextWeek(2)),
        saturday: this.getSaturday(this.nextWeek(2)),
      },
      {
        id: 4,
        monday: this.getMonday(this.nextWeek(3)),
        tuesday: this.getTuesday(this.nextWeek(3)),
        wednesday: this.getWednesday(this.nextWeek(3)),
        thursday: this.getThursday(this.nextWeek(3)),
        friday: this.getFriday(this.nextWeek(3)),
        saturday: this.getSaturday(this.nextWeek(3)),
      },
      {
        id: 5,
        monday: this.getMonday(this.nextWeek(4)),
        tuesday: this.getTuesday(this.nextWeek(4)),
        wednesday: this.getWednesday(this.nextWeek(4)),
        thursday: this.getThursday(this.nextWeek(4)),
        friday: this.getFriday(this.nextWeek(4)),
        saturday: this.getSaturday(this.nextWeek(4)),
      },
      {
        id: 6,
        monday: this.getMonday(this.nextWeek(5)),
        tuesday: this.getTuesday(this.nextWeek(5)),
        wednesday: this.getWednesday(this.nextWeek(5)),
        thursday: this.getThursday(this.nextWeek(5)),
        friday: this.getFriday(this.nextWeek(5)),
        saturday: this.getSaturday(this.nextWeek(5)),
      },
      {
        id: 7,
        monday: this.getMonday(this.nextWeek(6)),
        tuesday: this.getTuesday(this.nextWeek(6)),
        wednesday: this.getWednesday(this.nextWeek(6)),
        thursday: this.getThursday(this.nextWeek(6)),
        friday: this.getFriday(this.nextWeek(6)),
        saturday: this.getSaturday(this.nextWeek(6)),
      },
      {
        id: 8,
        monday: this.getMonday(this.nextWeek(7)),
        tuesday: this.getTuesday(this.nextWeek(7)),
        wednesday: this.getWednesday(this.nextWeek(7)),
        thursday: this.getThursday(this.nextWeek(7)),
        friday: this.getFriday(this.nextWeek(7)),
        saturday: this.getSaturday(this.nextWeek(7)),
      },
      {
        id: 9,
        monday: this.getMonday(this.nextWeek(8)),
        tuesday: this.getTuesday(this.nextWeek(8)),
        wednesday: this.getWednesday(this.nextWeek(8)),
        thursday: this.getThursday(this.nextWeek(8)),
        friday: this.getFriday(this.nextWeek(8)),
        saturday: this.getSaturday(this.nextWeek(8)),
      },
      {
        id: 10,
        monday: this.getMonday(this.nextWeek(9)),
        tuesday: this.getTuesday(this.nextWeek(9)),
        wednesday: this.getWednesday(this.nextWeek(9)),
        thursday: this.getThursday(this.nextWeek(9)),
        friday: this.getFriday(this.nextWeek(9)),
        saturday: this.getSaturday(this.nextWeek(9)),
      },
      {
        id: 11,
        monday: this.getMonday(this.nextWeek(10)),
        tuesday: this.getTuesday(this.nextWeek(10)),
        wednesday: this.getWednesday(this.nextWeek(10)),
        thursday: this.getThursday(this.nextWeek(10)),
        friday: this.getFriday(this.nextWeek(10)),
        saturday: this.getSaturday(this.nextWeek(10)),
      },
      {
        id: 12,
        monday: this.getMonday(this.nextWeek(11)),
        tuesday: this.getTuesday(this.nextWeek(11)),
        wednesday: this.getWednesday(this.nextWeek(11)),
        thursday: this.getThursday(this.nextWeek(11)),
        friday: this.getFriday(this.nextWeek(11)),
        saturday: this.getSaturday(this.nextWeek(11)),
      },
      {
        id: 13,
        monday: this.getMonday(this.nextWeek(12)),
        tuesday: this.getTuesday(this.nextWeek(12)),
        wednesday: this.getWednesday(this.nextWeek(12)),
        thursday: this.getThursday(this.nextWeek(12)),
        friday: this.getFriday(this.nextWeek(12)),
        saturday: this.getSaturday(this.nextWeek(12)),
      },
      {
        id: 14,
        monday: this.getMonday(this.nextWeek(13)),
        tuesday: this.getTuesday(this.nextWeek(13)),
        wednesday: this.getWednesday(this.nextWeek(13)),
        thursday: this.getThursday(this.nextWeek(13)),
        friday: this.getFriday(this.nextWeek(13)),
        saturday: this.getSaturday(this.nextWeek(13)),
      },
      {
        id: 15,
        monday: this.getMonday(this.nextWeek(14)),
        tuesday: this.getTuesday(this.nextWeek(14)),
        wednesday: this.getWednesday(this.nextWeek(14)),
        thursday: this.getThursday(this.nextWeek(14)),
        friday: this.getFriday(this.nextWeek(14)),
        saturday: this.getSaturday(this.nextWeek(14)),
      },
      {
        id: 16,
        monday: this.getMonday(this.nextWeek(15)),
        tuesday: this.getTuesday(this.nextWeek(15)),
        wednesday: this.getWednesday(this.nextWeek(15)),
        thursday: this.getThursday(this.nextWeek(15)),
        friday: this.getFriday(this.nextWeek(15)),
        saturday: this.getSaturday(this.nextWeek(15)),
      },
      {
        id: 17,
        monday: this.getMonday(this.nextWeek(16)),
        tuesday: this.getTuesday(this.nextWeek(16)),
        wednesday: this.getWednesday(this.nextWeek(16)),
        thursday: this.getThursday(this.nextWeek(16)),
        friday: this.getFriday(this.nextWeek(16)),
        saturday: this.getSaturday(this.nextWeek(16)),
      },
    ];
    return data;
  }
  scrollToIndex = () => {
    this.flatListRef.scrollToIndex({animated: true, index: nowWeek-1});
  }
  getItemLayout = (data, index) => (
    { length: width, offset: width * index, index }
  )
  handleScroll=(event)=> {
    //console.log(Math.round(event.nativeEvent.contentOffset.x/width))
    this.setState({ scrollPosition: Math.round(event.nativeEvent.contentOffset.x/width) });
  }


  
  render(){
    //UserData.getAllDataFromStorage();
    //UserData.getDataToShow();
    //UserData.clearCache();
    const {navigation} = this.props;
    console.log("state",this.state.isLoading);
    //console.log("UserData",UserData.isFirst);
    //const {selected, groupsArray, content } = this.stte;
    console.log(UserData.selected,UserData.groupsArray, "render");
    //console.log("rendering...");
    //console.log(f);
    //setTimeout(this.forceUpdate(), 10000);
    const renderSpisok = () =>
    <Svg
    width={19}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path d="M1 1l8.5 8.5L18 1" stroke="#000" strokeWidth={2} />
  </Svg>
    const renderItemWeek=({ item }) => 
    <View  style={{ flexDirection: "row", justifyContent: "space-evenly", width:width, height:50 }}>
      <Pressable style= {item.monday.toDateString()==today?styles.buttonOn:styles.buttonOff} onPress={() =>this.fetchMoreData(weekday[1],item.monday,UserData.groupsArray[UserData.selected])}>
      <Text style= {item.monday.toDateString()==today?styles.buttonOnText:styles.buttonOffText}>{item.monday.getDate()}</Text>
      </Pressable>
      <Pressable style= {item.tuesday.toDateString()==today?styles.buttonOn:styles.buttonOff} onPress={() =>this.fetchMoreData(weekday[2],item.tuesday,UserData.groupsArray[UserData.selected])}>
      <Text style= {item.tuesday.toDateString()==today?styles.buttonOnText:styles.buttonOffText}>{item.tuesday.getDate()}</Text>
      </Pressable>
      <Pressable style= {item.wednesday.toDateString()==today?styles.buttonOn:styles.buttonOff} onPress={() =>this.fetchMoreData(weekday[3],item.wednesday,UserData.groupsArray[UserData.selected])}>
      <Text style= {item.wednesday.toDateString()==today?styles.buttonOnText:styles.buttonOffText}>{item.wednesday.getDate()}</Text>
      </Pressable>
      <Pressable style= {item.thursday.toDateString()==today?styles.buttonOn:styles.buttonOff} onPress={() => this.fetchMoreData(weekday[4],item.thursday,UserData.groupsArray[UserData.selected])}>
      <Text style= {item.thursday.toDateString()==today?styles.buttonOnText:styles.buttonOffText}>{item.thursday.getDate()}</Text>
      </Pressable>
      <Pressable style= {item.friday.toDateString()==today?styles.buttonOn:styles.buttonOff} onPress={() =>this.fetchMoreData(weekday[5],item.friday,UserData.groupsArray[UserData.selected])}>
      <Text style= {item.friday.toDateString()==today?styles.buttonOnText:styles.buttonOffText}>{item.friday.getDate()}</Text>
      </Pressable>
      <Pressable style= {item.saturday.toDateString()==today?styles.buttonOn:styles.buttonOff} onPress={() =>this.fetchMoreData(weekday[6],item.saturday,UserData.groupsArray[UserData.selected])}>
      <Text style= {item.saturday.toDateString()==today?styles.buttonOnText:styles.buttonOffText}>{item.saturday.getDate()}</Text>
      </Pressable>
    </View>;
    const renderItem = ({ item }) =>
     <View style={[styles.card, this.checkDayAndPair(item.get("day"), item.get("id"))?(f?styles.borderTime:styles.borderTimeBottom):null]}>
       <View style={{ marginTop:-25, marginBottom:20}}>
         <Text style={styles.textTime}>
           Пара начинается через {this.state.timeToPair}
         </Text>
       </View>
       <TouchableOpacity delayLongPress={3000} onLongPress={()=>{console.log("pressed")}} activeOpacity={0.6}>
        <View style={{ flexDirection: 'row'}}>
        <View style={{ flexDirection: 'column', widht: 10, marginTop: -10 }}>
          <Text>
            {item.get('time1')}
          </Text>
          <Text>
            {item.get('time2')}
          </Text>
        </View>
        <View style={styles.palka} />
        
        <View style={{ flex: 1, flexDirection: 'column', marginTop: -10, widht: 100 }}>
          <Text>
            {item.get('subject')}
          </Text>
          <Text >
            {item.get('type')}
          </Text>
          <View style={{justifyContent:"space-between", flexDirection: "row", marginTop: 10, }}>
            <Text >
              {item.get('prepod')}
            </Text>
            
              <Text>
                {item.get('place')}
              </Text>
          </View>
          </View>
        </View>
       </TouchableOpacity>
       <View style={{ marginTop:10,marginBottom:-23}}>
         <Text style={styles.textTime}>
           Осталось {this.state.timeToPair}
         </Text>
       </View>
     </View>;
    
    // if (this.state.isLoading==true){
    //   return(
    //     <Loading loadingText="Loading..." />
    //   )
    // }
    return (
      <View style={styles.container}>
        <View style={{ height: 100, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#888888", alignItems: "center" }}>
        <Svg
      width={30}
      height={30}
      marginLeft={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M23.75 5H6.25a2.5 2.5 0 00-2.5 2.5V25a2.5 2.5 0 002.5 2.5h17.5a2.5 2.5 0 002.5-2.5V7.5a2.5 2.5 0 00-2.5-2.5zM20 2.5v5M10 2.5v5M3.75 12.5h22.5"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
          <SelectDropdown 
            data={UserData.groupsArray}
            dropdownStyle={{ backgroundColor: '#DFDFDF',height: 150, borderRadius: 4,elevation: 3,borderRadius: 10, }}
            dropdownIconPosition={"right"}
            renderDropdownIcon={renderSpisok} 
            buttonStyle={styles.buttonSpOnGray}
            defaultValue={UserData.groupsArray[UserData.selected]}
            onSelect={(selectedItem, index) => {{UserData.selectGroup(index); this.fetchMoreData(todayDayOfWeek, d, UserData.groupsArray[UserData.selected]);}}}
            buttonTextAfterSelection={(selectedItem, index) => {return UserData.groupsArray[UserData.selected]}}
            rowTextForSelection={(item, index) => {return item}}/>
          <Pressable style={{ height: 100, flexDirection: "row", justifyContent: "space-between",alignItems: "center" }} onPress={() => {navigation.replace('Setting');}}>
          <Svg
            width={30}
            height={30}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            marginRight={20}
          >
            <Path
              d="M15 18.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <Path
              d="M24.25 18.75a2.062 2.062 0 00.413 2.275l.075.075a2.5 2.5 0 11-3.538 3.537l-.075-.075a2.062 2.062 0 00-2.275-.412 2.063 2.063 0 00-1.25 1.888v.212a2.5 2.5 0 01-5 0v-.113a2.062 2.062 0 00-1.35-1.887 2.062 2.062 0 00-2.275.413l-.075.075A2.5 2.5 0 115.362 21.2l.075-.075a2.063 2.063 0 00.413-2.275 2.063 2.063 0 00-1.887-1.25H3.75a2.5 2.5 0 010-5h.112a2.062 2.062 0 001.888-1.35 2.062 2.062 0 00-.412-2.275L5.263 8.9A2.5 2.5 0 017.03 4.63a2.5 2.5 0 011.769.732l.075.075a2.063 2.063 0 002.275.413h.1a2.063 2.063 0 001.25-1.887V3.75a2.5 2.5 0 015 0v.112a2.062 2.062 0 001.25 1.888 2.062 2.062 0 002.275-.412l.075-.075A2.5 2.5 0 1124.637 8.8l-.075.075a2.062 2.062 0 00-.412 2.275v.1a2.063 2.063 0 001.888 1.25h.212a2.5 2.5 0 010 5h-.113a2.063 2.063 0 00-1.887 1.25v0z"
              stroke="#000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
          {/* <Settings marginRight={20}></Settings> */}
          </Pressable>
        </View>

        <View style={{ alignItems: "flex-start", marginVertical: 15, marginLeft: 24 }}>
          <Text>
            {this.state.scrollPosition+1} неделя, {(this.state.scrollPosition+1) % 2 ? c : z}
          </Text>
          
        </View>
        <View>
        <FlatList
         onScroll={this.handleScroll}
         data={this.updateDataForWeek()}
         keyExtractor={item => item.id}
         renderItem={renderItemWeek}
         pagingEnabled 
         horizontal={true}
         showsHorizontalScrollIndicator={false}
         ref={(ref) => { this.flatListRef = ref; }}
         getItemLayout={this.getItemLayout}/> 
        </View>
        
        <FlatList 
        data={this.state.cards} 
        extraData={this.state} 
        showsVerticalScrollIndicator={false} 
        renderItem={renderItem}/>

      </View>
      
    );
  }
}

