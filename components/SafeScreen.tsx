import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeScreenProps = {
  children?: ReactNode;
};
const SafeScreen: React.FC<SafeScreenProps> = ({ children }) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={{ paddingTop: insets.top, flex: 1, backgroundColor: '#000' }}>
      {children}
    </View>
  );
};

export default SafeScreen