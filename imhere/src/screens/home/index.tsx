import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Participant } from '../../components/Participant';
import { styles } from './style';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null); // Inicializa como null
  const [showDatePicker, setShowDatePicker] = useState(false);

  function handleParticipantAdd() {
    const trimmedName = participantName.trim();

    if (!trimmedName) {
      return Alert.alert('Erro', 'Por favor, insira um nome válido');
    }

    if (participants.some(name => name.trim().toLowerCase() === trimmedName.toLowerCase())) {
      return Alert.alert('Duplicado', 'Já existe um participante com esse nome');
    }

    setParticipants(prevState => [...prevState, trimmedName]);
    setParticipantName('');
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

  function handleDateChange(event: any, selectedDate?: Date) {
    setShowDatePicker(false);
    if (selectedDate) {
      setEventDate(selectedDate); // Define a data selecionada
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.eventName}
        value={eventName}
        onChangeText={setEventName}
        placeholder="Digite o nome do evento"
        placeholderTextColor="rgb(109, 109, 109)"
      />

      {/* Botão para selecionar a data */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>
          {eventDate ? `Data do evento: ${eventDate.toLocaleDateString('pt-BR')}` : 'Adicione a data do evento'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={eventDate || new Date()} // Usa a data atual como fallback
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

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








