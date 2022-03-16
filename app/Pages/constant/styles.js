import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('screen');
export const styles = StyleSheet.create({
  textTime:{
    fontFamily:"Roboto",
    fontSize:10,
    color:"#FFF"
  }, 
  palka:{
      width: 1,
      height: 50,
      marginTop:0,
      backgroundColor:"#E1E1E1",
      marginHorizontal:10
    },
    palkaSep:{
      height: 1,
      width: width-70,
      marginTop:0,
      backgroundColor:"#E1E1E1",
      marginHorizontal:10
    },
    card: {
      flexDirection: 'column',
      
      borderWidth: 2,
      borderColor: "#9E9E9E",
      padding: 10,
      marginHorizontal: 20,
      marginTop: 20,
      backgroundColor: "white",
      borderRadius: 12,
      
    },
    groupCard: {
      flexDirection: "row",
      justifyContent:"space-between",
      borderWidth: 2,
      borderColor: "#9E9E9E",
      padding: 10,
      marginHorizontal: 5,
      marginTop: 5,
      backgroundColor: "white",
      borderRadius: 12,
    },
    groupSearch: {
      flexDirection: "row",
      justifyContent:"space-between",
      padding: 10,
      marginHorizontal: 5,
      marginTop: 5,
      backgroundColor: "white",
      
    },
    borderTime:{
      borderTopWidth:16,
      //borderBottomWidth:16,
    },
    borderTimeBottom:{
      //borderTopWidth:16,
      borderBottomWidth:16,
    },
    zaglav: {
      fontSize: 30,
    },
    podzaglav: {
      backgroundColor: '#fff',
      alignItems: 'center',
      fontSize: 20,
      justifyContent: 'flex-end',
    },
    podchertoy: {
      backgroundColor: '#fff',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: 28,
      marginTop: -20,
      justifyContent: 'flex-end',
    },
    
    buttonOff: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 46,
      height: 50,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#DFDFDF',
      borderRadius: 10,
    },
    buttonTema: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 20,
      width: 100,
      height: 35,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#DFDFDF',
      borderRadius: 10,
    },
    buttonOn: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 46,
      height: 50,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#9E9E9E',
      borderRadius: 10,
    },
    buttonSp: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 34,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#DFDFDF',
      borderRadius: 10,
    },
    buttonSpOnGray: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 34,
      backgroundColor: '#888888',
    },
    buttonF: {
      alignItems: 'center',
      justifyContent: 'center',
      width:width -40,
      height: 34,
      borderRadius: 4,
      marginTop: 10,
      elevation: 3,
      backgroundColor: '#DFDFDF',
      borderRadius: 10,
    },
    Spisok: {
      height: 50, 
      borderRadius: 4,
      elevation: 3,
      backgroundColor: '#DFDFDF',
      borderRadius: 10,
    },
    buttonOffText:{
      fontSize: 20,
      //letterSpacing: 0.25,
      color: 'black',
    },
    buttonOnText:{
      fontSize: 20,
      //letterSpacing: 0.25,
      color: 'white',
    },
    buttonContainer: {
      width: '40%',
      alignSelf: 'center',
      marginVertical: 30,
    },
    SpisokContainer: {
      width: 10,
      alignSelf: 'center',
      
    },
    container: {
      flex: 1,
      height: height,
      backgroundColor: "#ffffff",
      width: width
    },
    firstContainer: {
      flex: 1,
      height: height,
      backgroundColor: "#ffffff",
      width: width,
      justifyContent:"space-evenly",
      alignItems: "center",
    },
    
    centeredView: {
      flex: 1,
      flexDirection:"column",
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      maxHeight:height*0.4,
      width:width-40,
      alignItems: "center",
      
    },
    input: {
      height: 40,
      margin: 12,
      //borderWidth: 1,
      padding: 10,
    },
    SearchContainer: {
      backgroundColor: 'white',
      borderTopWidth: 0, //works
      borderBottomWidth: 0, //works
      
    },
    
    SearchContainer2: {
      backgroundColor: 'white',
      borderWidth: 2, //no effect
      borderColor: "#9E9E9E",
      width: width-70,
      borderBottomWidth: 2,
      
      height: 40,
     
    },
    SearchText:{
      fontSize: 18,
      //letterSpacing: 0.25,
      color: 'black',
    },
    
   
  });