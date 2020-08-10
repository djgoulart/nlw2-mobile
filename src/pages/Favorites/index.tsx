import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView } from 'react-native';
import PageHeader from '../../components/PageHeader';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

const Favorites: React.FC = () => {
  const [favoriteClasses, setFavoriteClasses] = useState<Teacher[]>([]);
  
  useFocusEffect(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoriteList = JSON.parse(response);
        setFavoriteClasses(favoriteList)
      }
    });
  })

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {
          favoriteClasses.map((favorite:Teacher) => {
            return (
              <TeacherItem 
                teacher={favorite} 
                key={favorite.id}
                isFavorite={true} 
              />
            )
          })
        }
      </ScrollView>
    </View>
  );
}

export default Favorites;