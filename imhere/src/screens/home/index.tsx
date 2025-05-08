import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Participant } from '../../components/Participant';
import { styles } from './style';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]); // Array de strings
  const [participantName, setParticipantName] = useState(''); // String
  const [eventName, setEventName] = useState('Nome do evento'); // Estado para o nome do evento

  function handleParticipantAdd() {
    const trimmedName = participantName.trim(); // Remove espaços extras no início e no final

    // Verifica se o nome está vazio
    if (!trimmedName) {
      return Alert.alert('Erro', 'Por favor, insira um nome válido');
    }

    // Verifica duplicatas (case-insensitive e ignora espaços extras)
    if (participants.some(name => name.trim().toLowerCase() === trimmedName.toLowerCase())) {
      return Alert.alert('Duplicado', 'Já existe um participante com esse nome');
    }

    // Adiciona o participante com o nome limpo
    setParticipants(prevState => [...prevState, trimmedName]);
    setParticipantName(''); // Limpa o campo de texto após adicionar
  }

  function handleParticipantRemove(name: string) {
    Alert.alert('Título', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => {
          setParticipants(prevState => prevState.filter(participant => participant !== name));
          Alert.alert('Título', 'Participante removido');
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
      {/* Nome do evento editável */}
      <TextInput
        style={styles.eventName} // Reutilizando o estilo do nome do evento
        value={eventName}
        onChangeText={setEventName}
        placeholder="Digite o nome do evento"
        placeholderTextColor="rgb(109, 109, 109)"
      />

      <Text style={styles.eventDate}>Segunda, 07 de abril de 2025.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="rgb(109, 109, 109)"
          keyboardType="default"
          onChangeText={setParticipantName}
          value={participantName}
        />

        <TouchableOpacity style={styles.Button} onPress={handleParticipantAdd}>
          <Text style={styles.ButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant name={item} onRemove={() => handleParticipantRemove(item)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}








