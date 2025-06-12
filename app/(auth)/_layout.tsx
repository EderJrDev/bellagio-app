import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/contexts/authContext";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user, loading } = useAuth(); // Usando nosso contexto

  if (loading) return <PageLoader />;

  if (user) {
    return <Redirect href="/" />;
  }

  // Senão, mostra as telas de login/cadastro
  return <Stack screenOptions={{ headerShown: false }} />;
}