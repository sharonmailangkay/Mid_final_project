import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Screen } from "../components/Screen";
import { Card } from "../components/Card";
import { InfoRow } from "../components/InfoRow";
import { useStudentData } from "../hooks/useStudentData";
import { colors, radii, spacing, typography } from "../constants/theme";

export default function ProfileScreen() {
  const router = useRouter();
  const { student } = useStudentData();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          router.replace("/");
        },
      },
    ]);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {student.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.id}>{student.id}</Text>
      </View>

      <Card style={styles.infoCard}>
        <InfoRow label="Email" value={student.email} />
        <InfoRow label="Major" value={student.major} />
        <InfoRow label="Semester" value={student.semester} />
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.text} />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
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
    backgroundColor: colors.cardSoft,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  logoutText: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: "600",
  },
});

