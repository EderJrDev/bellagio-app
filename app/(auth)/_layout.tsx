import PageLoader from "@/components/PageLoader";
import { useAuth } from "@/contexts/authContext";
import SafeScreen from "@components/SafeScreen";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader />;

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <SafeScreen applyBackground={false}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeScreen>
  );
}