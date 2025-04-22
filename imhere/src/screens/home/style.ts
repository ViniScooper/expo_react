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
      
    }



  
  });



