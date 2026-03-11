import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Card } from "../../components/Card";
import { Screen } from "../../components/Screen";
import { radii, spacing, typography } from "../../constants/theme";

const DEPARTMENTS = [
    {
        id: "1",
        name: "Informatika",
        faculty: "Fakultas Ilmu Komputer",
        icon: "code-slash",
        description: "Mempelajari pengembangan perangkat lunak, kecerdasan buatan, dan keamanan siber.",
        color: "#3B82F6",
    },
    {
        id: "2",
        name: "Sistem Informasi",
        faculty: "Fakultas Ilmu Komputer",
        icon: "stats-chart",
        description: "Fokus pada integrasi solusi teknologi informasi dengan proses bisnis.",
        color: "#6366F1",
    },
    {
        id: "3",
        name: "Keperawatan",
        faculty: "Fakultas Keperawatan",
        icon: "medical",
        description: "Menghasilkan tenaga perawat profesional dengan standar internasional.",
        color: "#EC4899",
    },
    {
        id: "4",
        name: "Akuntansi",
        faculty: "Fakultas Ekonomi dan Bisnis",
        icon: "calculator",
        description: "Mempelajari pelaporan keuangan, audit, dan perpajakan untuk entitas bisnis.",
        color: "#10B981",
    },
    {
        id: "5",
        name: "Manajemen",
        faculty: "Fakultas Ekonomi dan Bisnis",
        icon: "business",
        description: "Fokus pada pengelolaan organisasi, pemasaran, dan sumber daya manusia.",
        color: "#F59E0B",
    },
    {
        id: "6",
        name: "Filsafat",
        faculty: "Fakultas Filsafat",
        icon: "book",
        description: "Persiapan pelayanan kerohanian dan pemahaman mendalam tentang kitab suci.",
        color: "#8B5CF6",
    },
];

export default function DepartmentsScreen() {
    const router = useRouter();

    const renderItem = ({ item }: { item: typeof DEPARTMENTS[0] }) => (
        <Card style={styles.departmentCard}>
            <View style={styles.cardHeader}>
                <View style={[styles.iconBox, { backgroundColor: item.color + "20" }]}>
                    <Ionicons name={item.icon as any} size={24} color={item.color} />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.deptName}>{item.name}</Text>
                    <Text style={styles.facultyName}>{item.faculty}</Text>
                </View>
            </View>
            <Text style={styles.deptDescription}>{item.description}</Text>
            <TouchableOpacity
                style={styles.learnMore}
                onPress={() => router.push({
                    pathname: "/pmb/[id]",
                    params: { id: item.id }
                } as any)}
            >
                <Text style={[styles.learnMoreText, { color: item.color }]}>Pelajari lebih lanjut</Text>
                <Ionicons name="chevron-forward" size={16} color={item.color} />
            </TouchableOpacity>
        </Card>
    );

    return (
        <Screen containerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#0F171A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Informasi Jurusan</Text>
            </View>

            <FlatList
                data={DEPARTMENTS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8FAFC", // Match the new light theme
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
    },
    backButton: {
        padding: spacing.xs,
        marginRight: spacing.md,
    },
    headerTitle: {
        fontSize: typography.subtitle,
        fontWeight: "700",
        color: "#0F172A",
    },
    listContent: {
        padding: spacing.lg,
        paddingBottom: spacing.xxl,
    },
    departmentCard: {
        backgroundColor: "#FFFFFF",
        marginBottom: spacing.md,
        padding: spacing.lg,
        borderRadius: radii.lg,
        borderWidth: 1,
        borderColor: "#E2E8F0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: spacing.md,
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: radii.md,
        justifyContent: "center",
        alignItems: "center",
        marginRight: spacing.md,
    },
    headerText: {
        flex: 1,
    },
    deptName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 2,
    },
    facultyName: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: "600",
        textTransform: "uppercase",
    },
    deptDescription: {
        fontSize: 14,
        color: "#475569",
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    learnMore: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    learnMoreText: {
        fontSize: 14,
        fontWeight: "600",
        marginRight: 4,
    },
});
