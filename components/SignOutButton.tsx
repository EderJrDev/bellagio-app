import { useAuth } from '@/contexts/authContext';
import { Feather } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';

export const SignOutButton = () => {
  const { logout } = useAuth();
  const handleSignOut = async () => {
    Alert.alert("Sair", "Tem certeza de que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => { logout() }
      }
    ])
  }
  return (
    <TouchableOpacity onPress={handleSignOut} className="p-2">
      <Feather name="log-out" size={24} color="#D4AF37" />
    </TouchableOpacity>
  )
}