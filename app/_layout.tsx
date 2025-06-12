import SafeScreen from "@/components/SafeScreen";
import { AuthProvider } from "@/contexts/authContext";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
      <StatusBar style="light" />
    </AuthProvider>
  );
}
