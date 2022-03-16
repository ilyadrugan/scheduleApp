import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from 'react';
import UserData from "./UserData";
import FirstPage from "./Pages/FirstPage";
import Setting from "./Pages/Setting";
import Schedule from "./Pages/Schedule";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./Pages/Loading";
const Stack = createStackNavigator();



export default class App extends Component{
  constructor(props) {
    super(props);
    //this.stte = UserData.getDataToShow();
    this.state = {
      isLoading:true
    };
    //UserData.getAllDataFromStorage();
    //this.updateDataForWeek();
  }  
  componentDidMount(){
    AsyncStorage.getItem("kFirstLaunch").then((token) => {
      this.setState({
        isLoading: false
      });
    });
    console.log("componentDidMount")
  }
  async componentWillMount(){
    await UserData.getAllDataFromStorage();
    console.log("componentWillMount")
  }
  // async getData(){
  //   await UserData.getAllDataFromStorage();
  //   console.log(UserData.groupsArray);
  //   console.log(UserData.isFirst);
  // }
  handleLoadChange = ()=> {
    console.log("isLoading : ",this.state.isLoading)
    this.setState({isLoading:false})
  }

  render(){
  //UserData.clearCache();
  console.log(UserData.groupsArray);
  console.log(UserData.isFirst);
  if (this.state.isLoading) {
    return <Loading />;
  }
  else 
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ffffff" barStyle="#ffffff" />
      <Stack.Navigator
        initialRouteName= {UserData.isFirst==true?"FirstPage":"Schedule"}
        headerMode="none"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
        mode="modal"
      >
        
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="Schedule" component={Schedule} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}
