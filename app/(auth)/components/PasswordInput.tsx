import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PasswordInputProps {
  control: any;
  name: string;
  error?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ control, name, error }) => {
  const [isVisible, setIsVisible] = useState(false);
  const secureEntry = useMemo(() => !isVisible, [isVisible]);

  return (
    <>
      <View className="flex-row items-center bg-black/30 rounded-xl p-4 mb-4 border border-gray-500">
        <Feather name="lock" size={20} color="#8D918D" />
        <Controller
          control={control}
          name={name}
          rules={{ required: 'Senha é obrigatória' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Senha"
              placeholderTextColor="#8D918D"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureEntry}
            />
          )}
        />
        <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
          <Feather name={isVisible ? 'eye-off' : 'eye'} size={20} color="#8D918D" />
        </TouchableOpacity>
      </View>
      {error && <Text className="text-red-400 text-sm -mt-2 mb-3 ml-2">{error}</Text>}
    </>
  );
};

export default PasswordInput;
