import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { SearchBar } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown'
import {styles} from './constant/styles'
import Svg, {Path} from 'react-native-svg';
import UserData from '../UserData'
import { StyleSheet,FlatList,  Text, View, ScrollView,Linking, Image, Button, Pressable, Dimensions, Modal,TextInput } from 'react-native';

const { width, height } = Dimensions.get('screen');
const notif = ["За 1 час", "За 2 часа","Нет" ]
const notific = [ "За 5 мин","Нет"]
const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
//const datatest = [ "ИУ5-51Б","ИУ5-52Б","ИУ5-53Б","ИУ5-54Б","РК5-55Б"]
var arrayholder = [];
let json = require("./assets/paru.json");

//цикл заносит в массив все группы из json
for (var i in json){
  for (var j in json[i]){
    for (var k in json[i][j]){
    //console.log(k)
    arrayholder.push(k);
    }
  }
}
//console.log(arrayholder)
export default function App({navigation}) {
 

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [refresh, setRefresh] = useState(false);
  
  const SearchFilterFunction=(text, item) =>{
    
    var newData = arrayholder.filter(function(item) { 
      //console.log(item)
      if (UserData.groupsArray.includes(item)==0){
      const itemData = item ? item.toUpperCase() :''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;}
    });
    if (text=="") newData=[];
    setSearch(text);
    setDataSource(newData);
    setRefresh(!refresh);
  };
  
  const renderGroup = ({item})=>
  <View style={styles.groupCard}>
    <Text>{item}</Text>
    <Pressable onPress={()=>{setRefresh(!refresh);UserData.deleteGroup(item)}}>
    <Svg
      width={19}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      
    >
      <Path
        d="M2.375 4.75h14.25M6.333 4.75V3.167a1.583 1.583 0 011.584-1.584h3.166a1.583 1.583 0 011.584 1.584V4.75m2.375 0v11.083a1.583 1.583 0 01-1.584 1.584H5.542a1.584 1.584 0 01-1.584-1.584V4.75h11.084zM7.917 8.708v4.75M11.083 8.708v4.75"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
    </Pressable>
  </View>
  const renderItem = () =>
  <Svg
      width={19}
      height={11}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M1 1l8.5 8.5L18 1" stroke="#000" strokeWidth={2} />
    </Svg>
  
    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>

          <View style={{ height: 100, flexDirection: "row",  backgroundColor: "#888888", alignItems: "center",  }}>
            <Pressable   onPress={() => {navigation.navigate('Schedule');}}>
            <Svg
      width={30}
      height={35}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      marginLeft={20}
    >
      <Path
        d="M23.75 17.6H6.25M15 27.33L6.25 17.6 15 7.873"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
             </Pressable> 
             <View style={{ alignItems: 'center',flex: 1,justifyContent: 'center', marginLeft:-40}}>
              <Text style={{ fontSize: 25,}}>Настройки</Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 20 }}>
          <Text style={{fontSize: 20,}}>Тема</Text> 
          <View style={{  flexDirection: "row", alignItems: "center",  }}>
            <Pressable  style={styles.buttonTema} onPress={() => {navigation.navigate('Schedule');}}>
              <Text >Светлая</Text>
            </Pressable> 
            <Pressable style={styles.buttonTema}  onPress={() => {navigation.navigate('Schedule');}}>
             <Text >Темная</Text>
            </Pressable>
         </View>
          <Text style={{ fontSize: 20,}}>Уведомления</Text> 
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between" , marginBottom:10}}>
            <Text style={{ fontSize: 14,}}>Перед началом занятий</Text> 
            <SelectDropdown data={notif} dropdownStyle={{height: 150, borderRadius: 4,elevation: 3,backgroundColor: '#DFDFDF',borderRadius: 10, }} dropdownIconPosition={"right"} renderDropdownIcon={renderItem } 
             buttonStyle={styles.buttonSp} defaultValue={notif[0]} onSelect={(selectedItem, index) => {console.log(selectedItem, index)}}buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
              rowTextForSelection={(item, index) => {return item}}/>
          </View>
          <View style={{flexDirection: "row", justifyContent:"space-between" , alignItems: "center",  }}>
            <Text style={{ fontSize: 14,}}>Перед каждой парой</Text> 
            
            <SelectDropdown data={notific}   dropdownStyle={{height: 100, borderRadius: 4, elevation: 3, backgroundColor: '#DFDFDF', borderRadius: 10, }} dropdownIconPosition={"right"} renderDropdownIcon={renderItem }
             buttonStyle={styles.buttonSp} defaultValue={notific[1]} onSelect={(selectedItem, index) => {console.log(selectedItem, index)}} buttonTextAfterSelection={(selectedItem, index) => {return selectedItem}}
              rowTextForSelection={(item, index) => {return item} }/>
              
          </View>
          <Text style={{ fontSize: 20,}}>Избранные группы</Text> 
          <FlatList data={UserData.groupsArray} extraData={refresh} showsVerticalScrollIndicator={false} renderItem={renderGroup}/>
  
            <Modal 
            animationType="fade" 
            transparent={true} 
            visible={modalVisible}
            >
            <View style={styles.centeredView}>
              <Pressable style={{width:width, height:height/6}} onPress={() => {setModalVisible(!modalVisible)}}/>
              <View style={styles.modalView}>
              {/* <TextInput style={styles.input} placeholder="Введите номер группы" keyboardType="default" >
                </TextInput>  */}
                 <SearchBar  

                  round
                  placeholder="Введите номер группы" 
                  
                  onChangeText={text => SearchFilterFunction(text)} 
                  inputContainerStyle={styles.SearchContainer2} 
                  containerStyle={styles.SearchContainer} 
                  inputStyle={styles.SearchText} 
                  value={search} />
                  <View style={{height:height-0.65*height, width: width-50}}>
                    <FlatList
                      keyboardShouldPersistTaps='always' 
                      data ={dataSource} 
                      extraData={refresh}
                      renderItem={({ item }) =>(
                      <View style={styles.groupSearch}>
                      <Pressable onPress={()=>{setSearch(""); console.log("clear");UserData.insertGroup(item);SearchFilterFunction("");setModalVisible(!modalVisible);}} >
                        <Text style={{ fontSize: 18, padding:2}}>{item}</Text>
                      </Pressable>
                      </View>
                      )}
                      ItemSeparatorComponent={
                        (() => (
                          <View
                            style={styles.palkaSep}
                          />
                        ))
                      }
                    />
                    </View>
                
              </View>
              <Pressable style={{width:width, height:height}} onPress={() => {setModalVisible(!modalVisible)}}/>
            </View>
            </Modal>
          

          <Pressable style= {styles.buttonF} onPress={() => setModalVisible(true)}>
          <View style={{ flexDirection: "row", justifyContent:"space-between" , alignItems: "center" }}>
          <Text style={{ fontSize: 25,marginBottom: 6}}>+</Text>
          <Text style={{ fontSize: 18,}}> Добавить</Text>
          </View>
          </Pressable>
          <Text style={{ fontSize: 20,}}>Скрытые пары</Text> 
         <Text style={{ fontSize: 20,}}>Обратная связь</Text> 
         <Text style={{ fontSize: 16,}}>Что-то не так? У вас есть предложения? Хотите добавить расписание своей группы? Заполните форму и мы с вами свяжемся;)</Text> 
         <Pressable  style= {styles.buttonF} onPress={() => {Linking.openURL(url)}}>
          <Text style={{ fontSize: 20,}}>Заполнить форму</Text> 
          </Pressable> 
        </View> 
      </ScrollView>
  
    )
  }