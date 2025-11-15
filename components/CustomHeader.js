import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { readGuichets } from '../services/guichetService';

export default function CustomHeader({ navigation }) {
  const [guichets, setGuichets] = useState([]);

  
  useEffect(() => {
  const loadGuichets = async () => {
    const data = await readGuichets();
    setGuichets(data);
  };

  const unsubscribe = navigation.addListener('focus', loadGuichets);
  return unsubscribe;
}, [navigation]);

  const FavoritesButton = ({ title}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Favoris')}
      className="flex-row items-center bg-white border border-teal-600 rounded-full px-3 py-2 mx-2"
    >
      <Icon name="star" size={14} color="#00897b" />
      <Text className="text-teal-600 text-xs font-medium ml-2">{title}</Text>
    </TouchableOpacity>
  );

  const CountBadge = ({ count }) => (
    <View className="bg-[#eaf2ff] border border-[#a8c7fa] rounded-md px-2 py-1 min-w-[30px] items-center justify-center  ">
      <Text className="text-[#3367d6] text-xs">{count}</Text>
    </View>
  );

  const ActionButton = ({ title, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#4285f4] rounded-md py-2 px-4 items-center shadow-md mx-2"
    >
      <Text className="text-white text-sm font-bold">{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View className="w-full bg-white px-4 py-3 mt-2 mx-2">
      <View className="flex flex-row flex-wrap justify-between items-center gap-3">
        {/* Gauche : Titre + Compteur */}
        <View className="flex-row items-center space-x-3 flex-shrink">
          <Text className="text-lg text-gray-800 mr-2">Guichet</Text>
          <CountBadge count={guichets.length} />
        </View>

        {/* Droite : Boutons */}
        <View className="flex-row items-center space-x-2 flex-wrap justify-end">
          <FavoritesButton
            title="Mes favoris"
            onPress={() => navigation.navigate('Favorites')}
          />
          <ActionButton
            title="Nouveau guichet"
            onPress={() => navigation.navigate('AjouterGuichet')}
          />
        </View>
      </View>
    </View>
  );
}
