import { Model } from "@/models/Model";
import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

const ModelCard: React.FC<{ model: Model }> = ({ model }) => {
  return (
    <View className="bg-[#1C1C1C] border border-gray-800 rounded-lg p-5 mb-4 shadow-lg flex-row items-center space-x-3 gap-2">
      <Feather name="tag" size={20} color="#D4AF37" />
      <Text className="text-white text-lg font-semibold">{model.nome}</Text>
    </View>
  );
};

export default ModelCard;
