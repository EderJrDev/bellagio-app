import SearchBar from '@/components/ SearchBar';
import BrandCard from '@/components/BrandCard';
import ListEmpty from '@/components/ListEmpty';
import PageLoader from '@/components/PageLoader';
import { SignOutButton } from '@/components/SignOutButton';
import { useAuth } from '@/contexts/authContext';
import { useBrands } from '@/hooks/useBrands';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useAuth();
  const { brands, isLoading, loadData } = useBrands();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredBrands = useMemo(() => {
    return brands?.filter(brand =>
      brand.nome.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [brands, searchQuery]);

  if (isLoading) return <PageLoader />

  const onRefresh = async () => {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <View className="flex-row justify-between items-center p-4">
        <View>
          <Text className="text-base text-gray-600 dark:text-gray-400">Bem-vindo,</Text>
          <Text className="text-black dark:text-white text-2xl font-bold">{user?.name}</Text>
        </View>
        <SignOutButton />
      </View>

      <FlatList
        data={filteredBrands}
        renderItem={({ item }) => <BrandCard brand={item} />}
        keyExtractor={(item) => item.codigo}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#D4AF37" />}
        ListHeaderComponent={
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Buscar por marca..."
          />
        }
        ListEmptyComponent={
          <ListEmpty name="marca" />
        }
      />
    </SafeAreaView>
  );
}