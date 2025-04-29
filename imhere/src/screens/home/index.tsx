import React ,{ useState} from 'react'

import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList,Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './style';



export function Home() {
  const [participants, setParticipants] = useState<string[]>([]); // Array de strings

  const [participantName,setParticipantName] = useState(''); // String




  function handleParrticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert("Título", "Já existe um participante com esse nome");
    }
    setParticipants(prevState =>[...prevState,participantName]);
    setParticipantName(''); // Limpa o campo de texto após adicionar o participante
    
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Título", `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState => prevState.filter(participant => participant !== name));
          Alert.alert("Título", "Participante removido");
        },
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ]);
  }




  return (

    <View style={styles.container}>

      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Segunda, 07 de abril de 2025.
      </Text>



      <View style={styles.form}>


        <TextInput

          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="rgb(109, 109, 109)"
          keyboardType='default'
          onChangeText={setParticipantName}
          value={participantName}


        />

        <TouchableOpacity style={styles.Button} onPress={handleParrticipantAdd}>

          <Text style={styles.ButtonText}>

            +

          </Text>


        </TouchableOpacity>




      </View>


      <FlatList
         data={participants}
         keyExtractor={item => item} 
         renderItem={({ item }) => (
           <Participant
             name={item} 
             onRemove={() => handleParticipantRemove(item)}
           />
         )}
         showsVerticalScrollIndicator={false}
      />



    </View>

   


  )
}








