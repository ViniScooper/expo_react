import {StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(18, 17, 17)',
    padding: 24,
  },

    eventName: {

      color: 'rgb(255, 255, 255)',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 48,

    },


    eventDate: {
      color :'rgb(84, 82, 82)',  
      fontSize: 16,

  },
    input: {
      flex: 1,
      height: 56,
      backgroundColor: 'rgb(59, 58, 58)',
      borderRadius: 5,
      color: 'rgb(255, 255, 255)',
      padding: 16,
      fontSize: 16,
      marginRight: 12,
    
    },

    ButtonText:{
      color: 'rgb(255, 255, 255)',
      fontSize: 24,
  
    },
    Button :{
      width: 56,
      height: 56,
      borderRadius: 5,
      backgroundColor: 'rgb(26, 141, 18)',
      alignItems: 'center',
      justifyContent: 'center',


    },

    form:{
      width: '100%',
      flexDirection: 'row',
      marginTop: 36,
      marginBottom: 42,
      
    },

    dateButton: {
      backgroundColor: 'rgb(60, 60, 60)', // Preto, igual ao fundo principal
      padding: 10,
      borderRadius: 50,
      marginVertical: 10,
      marginLeft: -5, // Move um pouco para a esquerda
      marginTop: 20, // Move um pouco para baixo
      alignItems: 'center',
    },
    dateButtonText: {
      color: 'rgb(255, 255, 255)', // Branco, igual aos outros textos
      fontSize: 20,
    },




    
  // Novo estilo para o botão de horário
  timeButton: {
    backgroundColor: 'rgb(60, 60, 60)', // Preto, igual ao botão de data
    padding: 10,
    borderRadius: 50,
    marginVertical: 10,
    marginLeft: -5, // Move um pouco para a esquerda
    marginTop: 10, // Ajuste de margem para separação
    alignItems: 'center',
  },

  timeButtonText: {
    color: 'rgb(255, 255, 255)', // Branco, igual aos outros textos
    fontSize: 20,
  },

  saveButton: {
    backgroundColor: 'rgb(26, 141, 18)', // Verde para destacar o botão
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10, // Reduzido para mover o botão mais para cima
    marginBottom: 30, // Adicionado para separar do próximo elemento
  },

  saveButtonText: {
    color: 'rgb(255, 255, 255)', // Branco para o texto
    fontSize: 18,
    fontWeight: 'bold',
  },

  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  });



