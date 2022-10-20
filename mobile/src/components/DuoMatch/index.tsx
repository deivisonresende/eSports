import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import { styles } from './styles';
import { THEME } from '../../theme';
import { useState } from 'react';
import { Heading } from '../Heading';
import * as Clipboard from 'expo-clipboard';

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
const [isCoping, setIsCoping] = useState(false)

  async function handleCopyDiscordToClipboard(){
    setIsCoping(true)
    await Clipboard.setStringAsync(discord);
    Alert.alert('Discord copiado!', 'Usuário copiado para área de transferência para você colar no discord')
    setIsCoping(false)
  }

  return (
    <Modal
      animationType='fade'
      transparent
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.container}> 
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={onClose}
          >
            <MaterialIcons 
              name='close'
              size={30}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle 
            size={64}
            color={THEME.COLORS.SUCCESS}
            weight="bold"
          />

          <Heading
            title="Let's play"
            subtitle="Agora é só começar a jogar"
            style={{ alignItems: 'center', marginTop: 24 }}
          />

          <Text style={styles.label}>
            Adicione no discord
          </Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCoping}
          >
           <Text style={styles.discord}>
            {isCoping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
          </Text>
          </TouchableOpacity>

        </View>   
      </View>
    </Modal>
 
  );
}