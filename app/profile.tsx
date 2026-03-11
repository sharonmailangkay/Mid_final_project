import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Card } from "../components/Card";
import { InfoRow } from "../components/InfoRow";
import { Screen } from "../components/Screen";
import { useUser } from "../context/UserContext";
import { api } from "../convex/_generated/api";
import { colors, radii, spacing, typography } from "../constants/theme";

export default function ProfileScreen() {
  const router = useRouter();
  const { nim, setNim } = useUser();
  const student = useQuery(api.students.getStudentProfile, { nim: nim || "" });

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          setNim(null);
          router.replace("/");
        },
      },
    ]);
  };

  if (student === undefined) {
    return (
      <Screen>
        <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 100 }} />
      </Screen>
    );
  }

  const displayStudent = student || {
    name: "New Student",
    nim: nim || "---",
    major: "Not Assigned",
    year: "2024"
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {displayStudent.name
              ? displayStudent.name
                  .split(" ")
                  .map((part: string) => part[0])
                  .join("")
                  .toUpperCase()
              : "ST"}
          </Text>
        </View>
        <Text style={styles.name}>{displayStudent.name}</Text>
        <Text style={styles.id}>NIM: {displayStudent.nim}</Text>
      </View>

      <Card style={styles.infoCard}>
        <InfoRow label="Major" value={displayStudent.major} />
        <InfoRow label="Batch Year" value={displayStudent.year || "2024"} />
        <InfoRow label="Academic Status" value="Verified Student" />
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.text} />
        <Text style={styles.logoutText}>Logout from UNNEX</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
    marginTop: spacing.xl,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: radii.pill,
    backgroundColor: colors.primaryMuted,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.primarySoft,
    fontSize: 32,
    fontWeight: "700",
  },
  name: {
    color: colors.text,
    fontSize: typography.subtitle,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  id: {
    color: colors.textSecondary,
    fontSize: typography.small,
  },
  infoCard: {
    marginBottom: spacing.xl,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  logoutText: {
    color: colors.danger,
    fontSize: typography.body,
    fontWeight: "600",
  },
});
