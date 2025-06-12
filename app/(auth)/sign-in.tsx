import { useAuth } from '@/contexts/authContext';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import AppLogo from './components/AppLogo';
import BackgroundCarousel from './components/BackgroundCarousel';
import PasswordInput from './components/PasswordInput';
import UserInput from './components/UserInput';

export default function Page() {
  const router = useRouter()
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const animationProgress = useSharedValue(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
    },
  });

  // Função chamada ao submeter o formulário
  const onSubmit = async (data: { user: string; password: string }) => {
    setIsLoading(true);
    try {
      // 3. Chame a função signIn do contexto
      await signIn({ user: data.user, password: data.password });
      router.push('/'); // Redireciona para a página inicial após o login
      // A navegação para a Home será tratada automaticamente
      // pela sua estrutura de rotas ao detectar a mudança no estado de autenticação.
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message || 'Não foi possível fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  const SwipeUpIndicator = () => {
    const translateY = useSharedValue(0);
    useEffect(() => {
      translateY.value = withRepeat(
        withTiming(-15, { duration: 800, easing: Easing.inOut(Easing.ease) }), -1, true
      );
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
    }));
    return (
      <Animated.View style={animatedStyle} className="items-center">
        <Feather name="chevron-up" size={28} color="#D4AF37" />
        <Text className="text-[#D4AF37] font-semibold mt-1">Arrasta pra cima</Text>
      </Animated.View>
    );
  };

  const handleShowLogin = () => {
    animationProgress.value = withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) });
  };

  const handleHideLogin = () => {
    animationProgress.value = withTiming(0, { duration: 600, easing: Easing.inOut(Easing.ease) });
  };

  const swipeUpGesture = Gesture.Pan()
    .onEnd((event) => {
      if (event.translationY < -50 && Math.abs(event.velocityY) > 50) {
        runOnJS(handleShowLogin)();
      }
    });

  const initialContentStyle = useAnimatedStyle(() => ({
    opacity: 1 - animationProgress.value,
    transform: [{ translateY: -animationProgress.value * 250 }],
    zIndex: animationProgress.value < 0.5 ? 1 : -1,
    position: 'absolute',
    top: '15%',
    left: 24,
    right: 24
  }));

  const loginFormStyle = useAnimatedStyle(() => ({
    opacity: animationProgress.value,
    transform: [{ translateY: (1 - animationProgress.value) * 100 }],
    zIndex: animationProgress.value > 0.5 ? 1 : -1,
    position: 'absolute',
    top: '15%',
    left: 24,
    right: 24
  }));

  return (
    <GestureHandlerRootView className='flex-1'>
      <View className="flex-1">
        <BackgroundCarousel />
        <View className="absolute top-0 left-0 bottom-0 right-0 bg-black/70" />
        <GestureDetector gesture={swipeUpGesture}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
            <View className="flex-1 justify-end p-6">
              <Animated.View style={initialContentStyle} className="items-center ">
                <View style={{ marginTop: -40, marginBottom: 16 }}>
                  <AppLogo />
                </View>
                <View className='top-56'>
                  <Text className="text-white text-lg text-center font-light mb-16 px-4">
                    Descubra os melhores modelos das melhores marcas.{"\n"}Aqui na Bellagio Cars você encontra os melhores carros de luxo!
                  </Text>
                  <SwipeUpIndicator />
                </View>
              </Animated.View>

              <Animated.View style={loginFormStyle} className="w-full">
                <BlurView intensity={25} tint="dark" className="w-full p-6 rounded-2xl overflow-hidden">
                  <View>
                    <AppLogo />
                    <View className="h-12" />
                    <TouchableOpacity onPress={handleHideLogin} className="absolute top-4 left-4 z-10">
                      <Feather name="chevron-left" size={24} color="#8D918D" />
                    </TouchableOpacity>
                    <UserInput control={control} name="user" error={errors.user?.message} />
                    <PasswordInput control={control} name="password" error={errors.password?.message} />
                    <TouchableOpacity
                      className="bg-amber-400 rounded-xl p-4 items-center justify-center mt-4"
                      onPress={handleSubmit(onSubmit)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <ActivityIndicator size="small" color="#101010" />
                      ) : (
                        <Text className="text-[#101010] text-lg font-bold">Entrar</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </BlurView>
              </Animated.View>
            </View>
          </KeyboardAvoidingView>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};
