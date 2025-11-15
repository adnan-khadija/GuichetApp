import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { deleteGuichet } from '../services/guichetService';

const iconMapping = {
  "img.png": require("../assets/icons/img.png"),
};

export default function GuichetCard({ guichet, onDelete, onToggleFavori }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const imageSource =
    guichet.icon && guichet.icon.startsWith('file://')
      ? { uri: guichet.icon }
      : iconMapping[guichet.icon] || require("../assets/icons/img.png");

  const handleDeletePress = async () => {
    try {
      await deleteGuichet(guichet.id);
      onDelete(guichet.id);
      setMenuVisible(false);
      Alert.alert("Succès", "Guichet supprimé.");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      Alert.alert("Erreur", "Échec de la suppression.");
    }
  };

  return (
    <View className="px-4 py-3">
      <Pressable 
        className="bg-white rounded-2xl p-4 shadow-md shadow-black/10"
        onPress={() => setMenuVisible(false)} 
      >
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={() => onToggleFavori(guichet.id)}>
            <Icon
              name={guichet.favori ? "star" : "star-outline"}
              size={26}
              color={guichet.favori ? "#FFD700" : "#9CA3AF"}
            />
          </TouchableOpacity>

          {/* Bouton menu avec option Supprimer */}
          <View className="relative flex-row items-center">
            <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)}>
              <Icon name="dots-horizontal" size={26} color="#374151" />
            </TouchableOpacity>

            {menuVisible && (
              <View className="ml-2 bg-white px-3 py-1 rounded-xl border border-gray-200 shadow shadow-black/10 z-10">
                <TouchableOpacity onPress={handleDeletePress}>
                  <Text className=" text-base">Supprimer</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Centre */}
        <View className="items-center -mt-5">
          <View className="w-[90px] h-[90px] rounded-full bg-red-700 justify-center items-center shadow-md shadow-black/20">
            {imageSource ? (
              <Image
                source={imageSource}
                className="w-[80px] h-[80px] rounded-full"
                resizeMode="contain"
              />
            ) : (
              <View className="w-[60px] h-[60px] rounded-full bg-white" />
            )}
          </View>
          <Text className="mt-2 text-base text-gray-600">{guichet.role}</Text>
        </View>

        {/* Bas */}
        <View className="flex-row justify-between items-center mt-3">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold text-gray-800 mr-2">{guichet.name}</Text>
            <Icon name="check-decagram" size={20} color="#34D399" />
          </View>
          <Text className="text-base font-medium text-gray-500">{guichet.statut}</Text>
        </View>
      </Pressable>
    </View>
  );
}
