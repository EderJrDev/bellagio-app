import { Brand } from '@/models/Brand';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const BrandCard: React.FC<{ brand: Brand }> = ({ brand }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-white dark:bg-black border border-gray-800 rounded-lg p-5 mb-4 flex-row justify-between items-center shadow-lg"
      onPress={() => router.push(`/model/${brand.codigo}?name=${encodeURIComponent(brand.nome)}`)}
    >
      <View className="flex-row items-center space-x-2 gap-2">
        <Feather name="star" size={20} color="#D4AF37" />
        <Text className="text-black dark:text-white text-lg font-semibold">{brand.nome}</Text>
      </View>
      <Feather name="chevron-right" size={24} color="#D4AF37" />
    </TouchableOpacity>
  );
};

export default BrandCard;
