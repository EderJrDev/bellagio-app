import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/contexts/authContext"; // 1. Importe o useAuth do NOSSO contexto
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  // 2. Use os dados do nosso contexto
  const { user, loading } = useAuth();

  // Enquanto o status do login está sendo verificado, mostramos um loading
  if (loading) return <PageLoader />;

  // 3. Se o usuário JÁ ESTIVER logado, redirecione para a home (/)
  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  // 4. Se não houver usuário, mostre as telas de autenticação (sign-in, sign-up)
  return <Stack screenOptions={{ headerShown: false }} />;
}
