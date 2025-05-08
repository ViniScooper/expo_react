import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Events() {
  const [events, setEvents] = useState<any[]>([]);

  async function loadEventsFromCache() {
    try {
      const storedData = await AsyncStorage.getItem('@eventData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setEvents(parsedData); // Define a lista de eventos
      } else {
        setEvents([]); // Garante que a lista fique vazia se não houver dados
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os eventos');
    }
  }

  async function deleteEvent(index: number) {
    try {
      const updatedEvents = events.filter((_, i) => i !== index); // Remove o evento da lista
      setEvents(updatedEvents); // Atualiza o estado local
      await AsyncStorage.setItem('@eventData', JSON.stringify(updatedEvents)); // Salva a lista atualizada no cache
      Alert.alert('Sucesso', 'Evento apagado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar o evento');
    }
  }

  useEffect(() => {
    loadEventsFromCache();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Salvos</Text>

      {/* Botão Refresh */}
      <TouchableOpacity style={styles.refreshButton} onPress={loadEventsFromCache}>
        <Text style={styles.refreshButtonText}>Atualizar</Text>
      </TouchableOpacity>

      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.eventItem}>
            <View style={styles.eventDetails}>
              <Text style={styles.eventText}>Nome: {item.eventName}</Text>
              <Text style={styles.eventText}>
                Data: {item.eventDate ? new Date(item.eventDate).toLocaleDateString('pt-BR') : 'Não definida'}
              </Text>
              <Text style={styles.eventText}>
                Horário: {item.eventTime ? new Date(item.eventTime).toLocaleTimeString('pt-BR') : 'Não definido'}
              </Text>
              <Text style={styles.eventText}>Participantes: {item.participants.join(', ') || 'Nenhum'}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteEvent(index)}
            >
              <Text style={styles.deleteButtonText}>Apagar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum evento salvo</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(18, 17, 17)',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventItem: {
    backgroundColor: 'rgb(60, 60, 60)',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventDetails: {
    flex: 1,
  },
  eventText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    color: 'rgb(109, 109, 109)',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});