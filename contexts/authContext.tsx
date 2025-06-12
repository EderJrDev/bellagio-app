import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Interface para os dados do usuário
interface User {
  name: string;
  email: string;
}

// Interface para o valor do contexto de autenticação
interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn(credentials: any): Promise<void>;
  logout(): Promise<void>;
}

// Interface para as props do provedor de autenticação
interface AuthProviderProps {
  children: ReactNode;
}

// Cria o Contexto de Autenticação
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Cria o Provedor de Autenticação
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Carrega os dados do usuário do AsyncStorage ao iniciar o app
  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@CarApp:user');

      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  // Função de SignIn
  const signIn = async (credentials: any) => {
    try {
      const response = await fetch('https://test-api-y04b.onrender.com/signIn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);

        // Armazena os dados no AsyncStorage
        await AsyncStorage.setItem('@CarApp:user', JSON.stringify(data.user));

      } else {
        throw new Error(data.message || 'Credenciais inválidas.');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await AsyncStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, logout }}>
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
