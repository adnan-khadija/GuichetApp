import * as FileSystem from 'expo-file-system';

const path = FileSystem.documentDirectory + 'guichet.json';

export const initializeGuichetsFile = async () => {
  const initialGuichetData=require('../data/guichet.json');
  const fileInfo = await FileSystem.getInfoAsync(path);
  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(path, JSON.stringify(initialGuichetData, null, 2));
  }
};
// Lire les guichets depuis FileSystem
export const readGuichets = async () => {
  try {
    await initializeGuichetsFile();

    const jsonData = await FileSystem.readAsStringAsync(path);

    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Erreur de lecture :', error);
    return [];
  }
};

// Ajouter un guichet
export const addGuichet = async (newGuichet) => {
  try {
    const guichets = await readGuichets();
    guichets.push({ favori: false, ...newGuichet });
    await FileSystem.writeAsStringAsync(path, JSON.stringify(guichets, null, 2));
  } catch (error) {
    console.error('Erreur écriture :', error);
  }
};

// Supprimer un guichet
export const deleteGuichet = async (guichetId) => {
  let guichets = await readGuichets();
  guichets = guichets.filter(g => g.id !== guichetId);
  try {
    await FileSystem.writeAsStringAsync(path, JSON.stringify(guichets, null, 2));
  } catch (error) {
    console.error('Erreur écriture :', error);
  }
};
export const toggleFavori = async (guichetId) => {
  try {
    const guichets = await readGuichets();
    const updatedGuichets = guichets.map((g) =>
      g.id === guichetId ? { ...g, favori: !g.favori } : g
    );

    await FileSystem.writeAsStringAsync(path, JSON.stringify(updatedGuichets, null, 2));
    return updatedGuichets.find(g => g.id === guichetId);
  } catch (error) {
    console.error('Erreur lors du changement de favori :', error);
  }
};
