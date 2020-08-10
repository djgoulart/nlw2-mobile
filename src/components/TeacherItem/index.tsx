import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

const TeacherItem: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ 
            uri: 'https://avatars2.githubusercontent.com/u/10280312?s=460&u=353bf0df7bc3f6867d881749394f19fe71927607&v=4'
         }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>Diego Goulart</Text>
          <Text style={styles.subject}>Matemática</Text>
        </View>
      </View>
      
      <Text style={styles.bio}>
        O melhor professor de matemática da atualidade.
        {'\n'}{'\n'}
        Sério você não vai encontrar ninguém melhor para te ensinar a taboada.
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>Preço/hora{'   '}
          <Text style={styles.priceValue}>R$98,00</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton style={[styles.favoriteButton, styles.isFavorite]}>
            {/* <Image source={heartOutlineIcon} /> */}
            <Image source={unfavoriteIcon} />
          </RectButton>
          <RectButton style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;