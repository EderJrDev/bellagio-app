import { Image, View } from "react-native";

const AppLogo = () => (
  <View className="items-center">
    <Image
      source={require('@assets/images/logo-bellagio-sem-fundo.png')}
      alt="Logo do App"
      className="w-72 h-72"
      resizeMode="contain"
    />
  </View>
);

export default AppLogo;
