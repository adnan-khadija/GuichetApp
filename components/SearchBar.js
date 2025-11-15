import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SearchBar = ({ searchText, setSearchText }) => {
  const handleClearText = () => {
    setSearchText('');
  };

  return (
    <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 mx-4 my-3 h-12">
      <TextInput
        className="flex-1 text-base text-black"
        placeholder="Rechercher..."
        placeholderTextColor="#8e8e93"
        value={searchText}
        onChangeText={setSearchText}
      />
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClearText} className="pl-2">
          <Icon name="close-sharp" size={22} color="#8e8e93" />
        </TouchableOpacity>
      )}
      <TouchableOpacity className="pl-2">
        <Icon name="search-sharp" size={22} color="#8e8e93" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
