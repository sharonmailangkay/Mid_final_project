import { Stack } from "expo-router";
import { ConsultationProvider } from "../context/ConsultationContext";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { UserProvider } from "../context/UserContext";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <UserProvider>
        <ConsultationProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </ConsultationProvider>
      </UserProvider>
    </ConvexProvider>
  );
}
