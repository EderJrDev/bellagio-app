import { backgroundImages } from '@constants/backgroundImages';
import { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image
} from 'react-native';

const BackgroundCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  const { width: screenWidth } = Dimensions.get('window');

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % backgroundImages.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setActiveIndex(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex]);
  const onMomentumScrollEnd = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(index);
  };
  return (
    <FlatList
      ref={flatListRef}
      data={backgroundImages}
      keyExtractor={(item) => item}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      className="absolute top-0 left-0 bottom-0 right-0"
      onMomentumScrollEnd={onMomentumScrollEnd}
      renderItem={({ item }) => (
        <Image source={item} style={{ width: screenWidth, height: '100%' }} resizeMode="cover" />
      )}
    />

  );
};

export default BackgroundCarousel;