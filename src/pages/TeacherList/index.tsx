import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem, {Teacher} from '../../components/TeacherItem';

import api from '../../services/api';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false)
  
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  
  const [availableClasses, setAvailableClasses] = useState([]);
  const [favoriteClasses, setFavoriteClasses] = useState<number[]>([]);

  function loadFavorites() {
    AsyncStorage.getItem('favorites').then(response => {
      if(response) {
        const favoriteList = JSON.parse(response);
        
        const favoriteIds = favoriteList.map((favoriteItem:Teacher) => {
          return favoriteItem.id;
        });

        setFavoriteClasses(favoriteIds)
      }
    });
  }

  function handleToggleFiltersVisibility() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit()
  {
    loadFavorites();

    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    });

    setAvailableClasses(response.data)
    setIsFiltersVisible(false)
  }

  useFocusEffect(() => {
    loadFavorites();
  })

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis"
        headerRight={(
          <BorderlessButton onPress={handleToggleFiltersVisibility}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        )}
      >
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => setSubject(text)} 
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={text => setWeekDay(text)} 
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={text => setTime(text)} 
                />
              </View>
            </View>

            <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >

        {
          availableClasses.map((availableClass:Teacher) => {
            return (
              <TeacherItem 
              teacher={availableClass} 
              key={availableClass.id}
              isFavorite={favoriteClasses.includes(availableClass.id)} 
              />
            )
          })
        }
        
      </ScrollView>
    </View>
  );
}

export default TeacherList;