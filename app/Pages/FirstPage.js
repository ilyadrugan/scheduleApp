import React, { Component, useState } from 'react';
import { styles } from './constant/styles';
import { StyleSheet,FlatList,  Text, View, ScrollView,Linking, Image, Button, Pressable, Dimensions, Modal,TextInput } from 'react-native';
import { SearchBar } from 'react-native-elements';
import UserData from '../UserData'
const { width, height } = Dimensions.get('screen');
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

export default function FirstPage({navigation}) {
    const [flag, setFlag] = useState(true);
    const [search, setSearch] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [group, setGroup] = useState("");
    const SearchFilterFunction=(text, item) =>{
    console.log(text, item);
    setFlag(true);
    var newData = arrayholder.filter(function(item) { 
        const itemData = item ? item.toUpperCase() :''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    if (arrayholder.includes(text)){ 
        console.log(text);
        setGroup(text);
        setFlag(false);
      }
    if (text=="") newData=[];
      setSearch(text);
      setDataSource(newData);
      setRefresh(!refresh);
     
    };



    return(
        <View style={styles.firstContainer}>

                <Text styles={styles.buttonOnText}>
                    Выберите группу
                </Text>
            <View >
            <SearchBar  
                round
                placeholder="Введите номер группы" 
                onChangeText={text => SearchFilterFunction(text)} 
                inputContainerStyle={styles.SearchContainer2} 
                containerStyle={styles.SearchContainer} 
                inputStyle={styles.SearchText} 
                value={search} />
                <View style={{height:height-0.8*height, width: width-50}}>
                <FlatList
                    keyboardShouldPersistTaps='always' 
                    data ={dataSource} 
                    extraData={refresh}
                    renderItem={({ item }) =>(
                    <View style={styles.groupSearch}>
                    <Pressable onPress={()=>{setSearch(item);setFlag(false);SearchFilterFunction(item)}} >
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
                <View style={{width:100, height:50, right:0}}>
                    <Button  title="Дальше" disabled={flag} onPress={()=>{UserData.insertGroup(group);navigation.replace("Schedule");}}></Button>
                </View>

        </View>
    )

}


