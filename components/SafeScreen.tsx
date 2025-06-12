import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeScreenProps = {
  children?: ReactNode;
  applyBackground?: boolean;
};

const SafeScreen: React.FC<SafeScreenProps> = ({
  children,
  applyBackground = true
}) => {
  const insets = useSafeAreaInsets();
  const backgroundClass = applyBackground ? 'bg-white' : 'bg-white dark:bg-black';

  return (
    <View className={`flex-1 pt-[${insets.top}px] ${backgroundClass}`}>
      {children}
    </View>
  );
};

export default SafeScreen;
