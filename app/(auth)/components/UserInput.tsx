// app/(auth)/components/UserInput.tsx
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, View } from 'react-native';

interface UserInputProps {
  control: any;
  name: string;
  error?: string;
}

const UserInput: React.FC<UserInputProps> = ({ control, name, error }) => {
  return (
    <>
      <View className="flex-row items-center bg-black/30 rounded-xl p-4 mb-4 border border-gray-500">
        <Feather name="user" size={20} color="#8D918D" />
        <Controller
          control={control}
          name={name}
          rules={{ required: 'Usuário é obrigatório' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Usuário"
              placeholderTextColor="#8D918D"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
        />
      </View>
      {error && <Text className="text-red-400 text-sm -mt-2 mb-3 ml-2">{error}</Text>}
    </>
  );
};

export default UserInput;
