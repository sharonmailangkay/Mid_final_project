import { Stack } from "expo-router";
import { ConsultationProvider } from "../context/ConsultationContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ConsultationProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </ConsultationProvider>
    </ConvexProvider>
  );
}
