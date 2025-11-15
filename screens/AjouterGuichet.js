import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import uuid from 'react-native-uuid';
import { addGuichet } from '../services/guichetService';

import { useWindowDimensions } from 'react-native';

export default function AjouterGuichetScreen({ navigation }) {
  const [formData, setFormData] = useState({
    nomGuichet: '',
    role: '',
    statut: '',
    imageUri: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 400;

  // Options pour les sélecteurs
  const roles = ['Administrateur', 'Gestionnaire', 'Opérateur'];
  const statuts = ['Actif', 'Inactif', 'En maintenance'];

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission requise", "L'accès à la galerie est requis !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.IMAGE,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const asset = result.assets[0];

      // Vérification du type
      if (asset.mimeType !== "image/png" && asset.mimeType !== "image/svg+xml" && !asset.uri.endsWith('.png') && !asset.uri.endsWith('.svg')) {
        Alert.alert("Type d'image non autorisé", "Seuls les formats PNG et SVG sont acceptés.");
        return;
      }

      // Vérification de la taille (max 2MB)
      if (asset.fileSize > 2 * 1024 * 1024) {
        Alert.alert("Image trop volumineuse", "La taille maximale autorisée est de 2 MB.");
        return;
      }

      // Vérification des dimensions (idéalement 100x100 px)
      if (asset.width !== 100 || asset.height !== 100) {
        Alert.alert("Dimensions non idéales", "L'image doit idéalement faire 100x100 px.");
       
      }

      const imageName = asset.fileName || `guichet_${Date.now()}.png`;
      const destPath = FileSystem.documentDirectory + 'icons/' + imageName;
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'icons/', { intermediates: true });
      await FileSystem.copyAsync({ from: asset.uri, to: destPath });

      handleChange('imageUri', destPath); 
    }
  };


  const handleValider = async () => {
    if (!formData.nomGuichet || !formData.role || !formData.statut) {
      Alert.alert("Champs requis", "Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newGuichet = {
        id: uuid.v4(),
        name: formData.nomGuichet,
        role: formData.role,
        statut: formData.statut,
        icon: formData.imageUri ? formData.imageUri : 'default.png',
        favori: false 
      };
      await addGuichet(newGuichet);
      Alert.alert("Succès", "Guichet créé avec succès !");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Une erreur est survenue lors de la création.",error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormField = ({ label, children }) => (
    <View className="mb-4">
      <Text className="text-base  text-gray-700 mb-2">{label}</Text>
      {children}
    </View>
  );

  const SelectField = ({ value, placeholder, onPress }) => (
    <TouchableOpacity
      className="flex-row justify-between items-center bg-white border border-gray-300 rounded-md py-3 px-4"
      onPress={onPress}
    >
      <Text className={`text-base ${value ? 'text-gray-800' : 'text-gray-400'}`}>
        {value || placeholder}
      </Text>
      <Icon name="chevron-down" size={16} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      className="flex-1 bg-gray-50 p-4"
      contentContainerStyle={{ paddingBottom: 20 }}
      keyboardShouldPersistTaps="handled"
    >
      {/* En-tête */}
      <View className={`flex ${isSmallScreen ? 'flex-col' : 'flex-row'} items-start mb-6`}>
        <View className="bg-pink-100 p-3 rounded-full mr-3 mb-2">
          <Icon name="office-building" size={28} color="#F06292" />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold text-gray-800">Créer un nouveau guichet</Text>
          <Text className="text-sm text-gray-600 mt-1">
            Renseignez les informations nécessaires pour créer votre guichet
          </Text>
        </View>
      </View>

      {/* Upload d'image */}
      <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <View className="flex-row items-center">
         <TouchableOpacity 
  onPress={pickImage}
  className="w-20 h-20 rounded-full bg-gray-100 justify-center items-center border-2 border-dashed border-gray-300 mr-4"
  activeOpacity={0.7}
>
  {formData.imageUri ? (
    <Image 
      source={{ uri: 'file://'+formData.imageUri }} 
      className="w-full h-full rounded-full"
    />
  ) : (
    <Icon name="office-building" size={24} color="#9CA3AF" />
  )}
</TouchableOpacity>

          <View className="flex-1">
  <Text className="text-sm text-gray-700 mb-1">
    <Text className=" text-black">Formats autorisés:</Text>
    <Text className="text-xs text-blue-600"> PNG, SVG</Text>
  </Text>

  <Text className="text-sm text-gray-700 mb-1">
    <Text className=" text-black">Taille maximale autorisés:</Text>
    <Text className="text-xs text-blue-600"> 2 MB</Text>
  </Text>

  <Text className="text-sm text-gray-700">
    <Text className=" text-black">Dimensions idéales de l'image:</Text>
    <Text className="text-xs text-blue-600"> 100x100 px</Text>
  </Text>
</View>

        </View>
      </View>

      {/* Formulaire */}
      <View className="mb-2">
        <Text className="text-base text-gray-700 mb-2">Nom du guichet</Text>
        <TextInput
          className="bg-white border border-gray-300 rounded-md py-4 px-4 text-base text-gray-800"
          placeholder="Entrez le nom du guichet"
          placeholderTextColor="#9CA3AF"
          value={formData.nomGuichet}
          onChangeText={text => handleChange('nomGuichet', text)}
        />
      </View>

     <View className="mb-2">
        <Text className="text-base text-gray-700 mb-2">Rôle </Text>
        <View className="bg-white border border-gray-300 rounded-md">
          <Picker
            selectedValue={formData.role}
            onValueChange={value => handleChange('role', value)}
            prompt="Sélectionnez un rôle"
            mode="dropdown"
            style={{ color: formData.role ? '#374151' : '#9CA3AF' }}
          >
            <Picker.Item label="Sélectionnez un rôle..." value="" />
            {roles.map(r => (
              <Picker.Item key={r} label={r} value={r} />
            ))}
          </Picker>
        </View>
      </View>

       <View className="mb-2">
        <Text className="text-base text-gray-700 mb-2">Statut </Text>
        <View className="bg-white border border-gray-300 rounded-md">
          <Picker
            selectedValue={formData.statut}
            onValueChange={value => handleChange('statut', value)}
            prompt="Sélectionnez un statut"
            mode="dropdown"
            style={{ color: formData.statut ? '#374151' : '#9CA3AF' }}
          >
            <Picker.Item label="Sélectionnez un statut..." value="" />
            {statuts.map(s => (
              <Picker.Item key={s} label={s} value={s} />
            ))}
          </Picker>
        </View>
      </View>

      {/* Bouton de soumission */}
      <TouchableOpacity
        className={` bg-blue-600 rounded-md p-3 items-center justify-center self-end mt-2 ${isSubmitting ? 'opacity-70' : ''}`}
        onPress={handleValider}
        disabled={isSubmitting}
        activeOpacity={0.8}
      >
        <Text className="text-white text-lg font-bold">
          {isSubmitting ? 'En cours...' : 'Valider'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}