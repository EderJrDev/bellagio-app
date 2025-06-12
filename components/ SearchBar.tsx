import { Feather } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, placeholder }) => {
  return (
    <View className="flex-row items-center bg-white dark:bg-black border border-gray-800 rounded-lg px-4 mb-6">
      <Feather name="search" size={20} color="#888" />
      <TextInput
        className="flex-1 h-12 text-black dark:text-white text-base ml-3"
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  )
}

export default SearchBar;