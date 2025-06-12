import { USER_API_URL } from '@constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useRouter } from 'expo-router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  biometricsEnabled: boolean;
  signIn(credentials: any): Promise<void>;
  logout(): Promise<void>;
  promptBiometricLogin(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [biometricsEnabled, setBiometricsEnabled] = useState<boolean>(false);
  const router = useRouter();

  const attemptBiometricLogin = async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Faça login no Bellagio Cars',
        fallbackLabel: 'Use sua senha',
      });
      return result.success;
    } catch (error) {
      console.error('Erro na autenticação biométrica', error);
      return false;
    }
  };

  const promptBiometricLogin = async () => {
    const success = await attemptBiometricLogin();
    if (success) {
      const storagedUser = await AsyncStorage.getItem('@Bellagio:user');
      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      router.push('/');
    }
  };

  useEffect(() => {
    async function loadStoragedData() {
      try {
        const biometricsEnabled = await AsyncStorage.getItem('@Bellagio:biometrics_enabled') === 'true';

        if (biometricsEnabled) {
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Faça login no Bellagio Cars',
            fallbackLabel: 'Use sua senha',
            disableDeviceFallback: false,
          });

          if (result.success) {
            const storagedUser = await AsyncStorage.getItem('@Bellagio:user');
            if (storagedUser) {
              setUser(JSON.parse(storagedUser));
            }
          }
        }
      } catch (e) {
        console.error("Falha na tentativa de login automático", e);
      } finally {
        setLoading(false);
      }
    }
    loadStoragedData();
  }, []);

  const signIn = async (credentials: any) => {
    try {
      const response = await fetch(`${USER_API_URL}/signIn`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);

        await AsyncStorage.setItem('@Bellagio:user', JSON.stringify(data.user));

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled && !biometricsEnabled) {
          Alert.alert(
            'Login Rápido',
            'Deseja habilitar o login com reconhecimento facial ou digital?',
            [
              { text: 'Não', style: 'cancel' },
              {
                text: 'Sim',
                onPress: async () => {
                  await AsyncStorage.setItem('@Bellagio:biometrics_enabled', 'true');
                  setBiometricsEnabled(true);
                  Alert.alert('Sucesso!', 'Login rápido habilitado.');
                },
              },
            ]
          );
        }

      } else {
        throw new Error(data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@Bellagio:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout, biometricsEnabled, promptBiometricLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
