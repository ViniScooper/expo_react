import React from 'react'

import { Text , View,TextInput,TouchableOpacity} from 'react-native';

import { Participant } from '../../components/Participant'; 

import { styles } from './style';



export  function Home() {

  function handleParrticipantAdd() {
    alert('voce clicou no botao')
  }



  return (
   
   <View style ={styles.container}>

    <Text style = {styles.eventName}>     
     Nome do evento
    </Text>

    <Text style ={styles.eventDate}>              
        Segunda, 07 de abril de 2025.     
      </Text>



    <View style ={styles.form}>


      <TextInput 
      
      style={styles.input}
        placeholder="Nome do participante"
        placeholderTextColor="rgb(109, 109, 109)"
        keyboardType='default'
      
      
      /> 

      <TouchableOpacity style={styles.Button} onPress ={handleParrticipantAdd}>

      <Text style ={styles.ButtonText}>
        
        +

      </Text>


      </TouchableOpacity>


      </View>


      <Participant/>




    </View>
  )
}