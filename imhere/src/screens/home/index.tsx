import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert, Platform, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Participant } from '../../components/Participant';
import { styles } from './style';

export function Home() {
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const [eventTime, setEventTime] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  async function saveDataToCache() {
    try {
      const newEvent = {
        participants,
        eventName,
        eventDate: eventDate ? eventDate.toISOString() : null,
        eventTime: eventTime ? eventTime.toISOString() : null,
      };

      // Carrega os eventos existentes no cache
      const storedData = await AsyncStorage.getItem('@eventData');
      const existingEvents = storedData ? JSON.parse(storedData) : [];

      // Verifica se o evento já existe na lista
      const isDuplicate = existingEvents.some(
        (event: any) =>
          event.eventName === newEvent.eventName &&
          event.eventDate === newEvent.eventDate &&
          event.eventTime === newEvent.eventTime
      );

      if (isDuplicate) {
        Alert.alert('Erro', 'Este evento já foi salvo.');
        return;
      }

      // Adiciona o novo evento à lista
      const updatedEvents = [...existingEvents, newEvent];

      // Salva a lista atualizada no cache
      await AsyncStorage.setItem('@eventData', JSON.stringify(updatedEvents));
      Alert.alert('Sucesso', 'Evento salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  }

  async function loadDataFromCache() {
    try {
      const storedData = await AsyncStorage.getItem('@eventData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setParticipants(parsedData.participants || []);
        setEventName(parsedData.eventName || '');
        setEventDate(parsedData.eventDate ? new Date(parsedData.eventDate) : null);
        setEventTime(parsedData.eventTime ? new Date(parsedData.eventTime) : null);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os dados');
    }
  }

  async function clearEventData() {
    try {
      await AsyncStorage.removeItem('@eventData');
      setParticipants([]);
      setEventName('');
      setEventDate(null);
      setEventTime(null);
      Alert.alert('Sucesso', 'Os dados do evento foram apagados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar os dados do evento');
    }
  }

  useEffect(() => {
    loadDataFromCache();
  }, []);

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
      setEventDate(selectedDate);
    }
  }

  function handleTimeChange(event: any, selectedTime?: Date) {
    setShowTimePicker(false);
    if (selectedTime) {
      setEventTime(selectedTime);
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.eventName}
          value={eventName}
          onChangeText={setEventName}
          placeholder="Digite o nome do evento"
          placeholderTextColor="rgb(109, 109, 109)"
        />

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>
            {eventDate ? `Data do evento: ${eventDate.toLocaleDateString('pt-BR')}` : 'Adicione a data do evento'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={eventDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <TouchableOpacity style={styles.timeButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timeButtonText}>
            {eventTime ? `Horário do evento: ${eventTime.toLocaleTimeString('pt-BR')}` : 'Adicione o horário do evento'}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={eventTime || new Date()}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleTimeChange}
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

        <TouchableOpacity
          style={styles.saveButton}
          onPress={async () => {
            await saveDataToCache(); // Aguarda o salvamento no cache
            Alert.alert('Sucesso', 'Os dados foram salvos no cache com sucesso!');
            // Limpa os campos após salvar
            setParticipants([]);
            setEventName('');
            setEventDate(null);
            setEventTime(null);
          }}
        >
          <Text style={styles.saveButtonText}>Salvar Evento</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}








