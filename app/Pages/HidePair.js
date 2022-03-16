import Svg, {Path} from 'react-native-svg';
import UserData from '../UserData'
import { StyleSheet,FlatList,  Text, View, ScrollView,Linking, Image, Button, Pressable, Dimensions, Modal,TextInput } from 'react-native';

const { width, height } = Dimensions.get('screen');




export default function App({navigation}) {

    return(
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
  </View>)
}
