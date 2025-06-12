import SearchBar from '@/components/ SearchBar';
import ListEmpty from '@/components/ListEmpty';
import ModelCard from '@/components/ModelCard';
import PageLoader from '@/components/PageLoader';
import { useModels } from '@/hooks/useModels';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function ModelScreen() {
  const router = useRouter();
  const { code, name } = useLocalSearchParams<{ code: string; name: string }>();
  const { models, isLoading, fetchModels } = useModels(code);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  const filteredModels = useMemo(() => {
    if (!models) return [];
    return models.filter(model =>
      model.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [models, searchQuery]);

  if (isLoading) return <PageLoader />

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchModels()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row items-center p-4 border-b border-gray-800">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Feather name="arrow-left" size={24} color="#D4AF37" />
        </TouchableOpacity>
        <Text
          className="flex-1 text-center text-2xl font-bold text-amber-400 -ml-10"
          numberOfLines={1}
        >
          {`Marca: ${decodeURIComponent(name || 'Modelos')}`}
        </Text>
      </View>

      <FlatList
        data={filteredModels}
        renderItem={({ item }) => <ModelCard model={item} />}
        keyExtractor={(item) => String(item.codigo)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#D4AF37" />}
        ListHeaderComponent={
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Buscar por modelo..."
          />
        }
        ListEmptyComponent={
          <ListEmpty name="modelo" />
        }
      />
    </SafeAreaView>
  );
}
