import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import GuichetCard from "../components/GuichetCard";
import { readGuichets } from "../services/guichetService";

export default function FavorisScreen({ navigation }) {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    const fetchFavoris = async () => {
      const allGuichets = await readGuichets();
      const favorisOnly = allGuichets.filter((g) => g.favori === true);
      setFavoris(favorisOnly);
    };

    const unsubscribe = navigation.addListener('focus', fetchFavoris);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {favoris.length === 0 ? (
        <Text>Aucun guichet favori</Text>
      ) : (
        <FlatList
          data={favoris}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GuichetCard guichet={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
}
