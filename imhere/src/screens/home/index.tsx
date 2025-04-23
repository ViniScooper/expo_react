import React from 'react'

import { Text , View,TextInput,TouchableOpacity} from 'react-native';

import { Participant } from '../../components/Participant'; 

import { styles } from './style';



export  function Home() {

  const participants = [
    { name: 'Rodrigo' },
    { name: 'Lucas' },
    { name: 'Gustavo' },
    { name: 'Gabriel' },
  ]

  function handleParrticipantAdd() {
    alert('voce clicou no botao')
  }

  function handleParticipantRemove(name: string) {
    alert(`voce clicou no botao de remover ${name}`)
    
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


      {
        participants.map(participant => (
          <Participant 
          key={participant.name} 
          name={participant.name} 
          onRemove={() => handleParticipantRemove(participant.name)} 
          />
        ))

      }


      <Participant name="rodrigo" onRemove={() => handleParticipantRemove("rodrigo")} />
     
      



    </View>




  )
}