import { Text , View,TextInput,TouchableOpacity} from 'react-native';

import { styles } from './style';



export  function Home() {
  return (
   
   <View style ={styles.container}>

    <Text style = {styles.eventName}>     
     Nome do evento
    </Text>

    <Text style ={styles.eventDate}>              
        Segunda, 07 de abril de 2025.     
      </Text>





      <TextInput 
      
      style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="rgb(109, 109, 109)"
        keyboardType='default'
      
      
      /> 

      <TouchableOpacity>

      <Text style ={styles.buttonText}>
        
        Clique

      </Text>


      </TouchableOpacity>


      
    </View>
  )
}