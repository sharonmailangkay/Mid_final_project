import { Stack } from "expo-router";
import { ConsultationProvider } from "../context/ConsultationContext";

export default function RootLayout() {
  return (
    <ConsultationProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ConsultationProvider>
  );
}
