import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import GuichetCard from "../components/GuichetCard";
import SearchBar from "../components/SearchBar";
import { readGuichets, deleteGuichet,toggleFavori } from "../services/guichetService";

export default function ListeGuichetScreen({ navigation }) {
  const [guichets, setGuichets] = useState([]);
  const [searchText, setSearchText] = useState("");

  
  const fetchGuichets = async () => {
    const data = await readGuichets();
    setGuichets(data);
  };

  // Chargement initial des guichets
  useEffect(() => {
    fetchGuichets();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchGuichets();
    }, [])
  );

  const handleToggleFavori = async (guichetId) => {
  try {
    await toggleFavori(guichetId);
    fetchGuichets();
  } catch (error) {
    console.error("Erreur lors du changement de favori :", error);
  }
};
  // Suppression d’un guichet
  const handleDelete = async (guichetId) => {
    try {
      await deleteGuichet(guichetId);
      fetchGuichets();
      navigation.emit({ type: 'guichetUpdated' }); 
    } catch (error) {
      console.error("Erreur lors de la suppression du guichet :", error);
    }
  };

  // Filtrage basé sur le texte de recherche
  const filteredGuichets = guichets.filter(guichet =>
    guichet.name.toLowerCase().includes(searchText.toLowerCase()) ||
    guichet.role.toLowerCase().includes(searchText.toLowerCase()) ||
    guichet.statut.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 p-3 bg-white">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        className="flex-1"
        data={filteredGuichets}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <GuichetCard
            guichet={item}
            onDelete={handleDelete}
            onToggleFavori={handleToggleFavori}
          />
        )}
      />
    </View>
  );
}
