import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';


import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

export interface Teacher {
  avatar: string;
  bio: string;
  cost: number;
  id: number;
  user_id: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  isFavorite: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, isFavorite}) => {  

  const [favorite, setFavorite] = useState(isFavorite)

  function handleWhatsappChat(){
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
  }

  async function handleToggleFavorite(){
    const favoriteList = await AsyncStorage.getItem('favorites');

    let favoriteListArray = [];

    if(favoriteList) {
      favoriteListArray = JSON.parse(favoriteList);
    }

    if(favorite) {
      const favoriteIndex = favoriteListArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id
      });

      favoriteListArray.splice(favoriteIndex, 1);

      setFavorite(false);
    } else {
      favoriteListArray.push(teacher);
      
      setFavorite(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteListArray));
    
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacher.avatar}}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>
      
      <Text style={styles.bio}>
        {teacher.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>Preço/hora{'   '}
          <Text style={styles.priceValue}>{teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton 
          onPress={handleToggleFavorite} 
          style={[
            styles.favoriteButton, 
            favorite ? styles.isFavorite : {},
          ]}>
            {
              favorite
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
            
          </RectButton>
          <RectButton onPress={handleWhatsappChat} style={styles.contactButton}>
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;