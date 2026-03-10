import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
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
            <PageHeader
                title="Student Management"
                rightIcon="add"
                onRightPress={() => alert('Add New Student Data')}
            />

            <View style={styles.listContainer}>
                <StudentItem name="Jane Smith" nim="105021001" major="Computer Science" />
                <StudentItem name="Michael Scott" nim="105021002" major="Information Systems" />
                <StudentItem name="Dwight Schrute" nim="105021003" major="Management" />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    listContainer: { paddingBottom: spacing.xxl },
    card: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.card, padding: spacing.md, borderRadius: radii.lg, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
    infoContainer: { flex: 1 },
    name: { fontSize: typography.body, fontWeight: '700', color: colors.text, marginBottom: 2 },
    nim: { fontSize: typography.small, color: colors.textSecondary },
    actionRow: { flexDirection: 'row', gap: spacing.sm },
    iconBtn: { padding: 8, backgroundColor: colors.cardSoft, borderRadius: radii.sm, borderWidth: 1, borderColor: colors.border },
});
