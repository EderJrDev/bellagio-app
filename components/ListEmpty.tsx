import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";


const ListEmpty: React.FC<{ name: string }> = ({ name }) => {
  return (
    <View className="flex-1 justify-center items-center mt-20">
      <Feather name="alert-circle" size={40} color="#D4AF37" />
      <Text className="text-gray-500 text-lg mt-4">Nenhum {name} encontrado.</Text>
    </View>
  );
}

export default ListEmpty;