import { View , Text,TouchableOpacity} from 'react-native';

import { styles } from './styles';

export function Participant() {
    return(
        
        <View style={styles.container}>
            <Text style={styles.name}>
                Vinicius
            </Text>


        <TouchableOpacity style={styles.Button}>

        <Text style ={styles.ButtonText}>
        
          -

          </Text>



          </TouchableOpacity>
        </View>
    )
}