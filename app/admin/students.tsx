import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminStudentsScreen() {
    const router = useRouter();

    const StudentItem = ({ name, nim, major }: any) => (
        <View style={styles.card}>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.nim}>{nim} • {major}</Text>
            </View>
            <View style={styles.actionRow}>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="pencil" size={18} color={colors.primarySoft} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn}>
                    <Ionicons name="trash" size={18} color={colors.danger} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Student Management</Text>
                <TouchableOpacity onPress={() => alert('Add New Student Data')} style={styles.addButton}>
                    <Ionicons name="add" size={24} color={colors.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
                <StudentItem name="Jane Smith" nim="105021001" major="Computer Science" />
                <StudentItem name="Michael Scott" nim="105021002" major="Information Systems" />
                <StudentItem name="Dwight Schrute" nim="105021003" major="Management" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: spacing.lg, paddingTop: spacing.sm },
    backButton: { padding: spacing.xs },
    addButton: { padding: spacing.xs, backgroundColor: colors.card, borderRadius: radii.pill },
    headerTitle: { fontSize: typography.subtitle, fontWeight: '700', color: colors.text },
    scrollContent: { paddingBottom: spacing.xxl },
    listContainer: { paddingBottom: spacing.xxl },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    infoContainer: { flex: 1 },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 2 },
    nim: { fontSize: typography.small, color: colors.textSecondary },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    iconBtn: { padding: 8, backgroundColor: colors.cardSoft, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border },
});
