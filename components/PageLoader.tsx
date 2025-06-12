
import { ActivityIndicator, View } from "react-native";

const PageLoader: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <ActivityIndicator size="large" color="#D4AF37" />
    </View>
  )
}

export default PageLoader;