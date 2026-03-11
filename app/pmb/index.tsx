import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function PMBInfoScreen() {
    const router = useRouter();

    return (
        <Screen>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="school" size={40} color={colors.primarySoft} />
                    </View>
                    <Text style={styles.title}>Penerimaan Mahasiswa Baru</Text>
                    <Text style={styles.subtitle}>Tahun Akademik 2026/2027</Text>
                </View>

                {/* Info Card */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Informasi Pendaftaran</Text>
                    <Text style={styles.description}>
                        Bergabunglah dengan Universitas Klabat dan raih masa depan gemilang. Pendaftaran
                        mahasiswa baru saat ini telah dibuka untuk seluruh program studi S1.
                    </Text>

                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                        <Text style={styles.requirementText}>Lulusan SMA/SMK sederajat</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                        <Text style={styles.requirementText}>Mengisi formulir pendaftaran lengkap</Text>
                    </View>
                    <View style={styles.requirementItem}>
                        <Ionicons name="checkmark-circle" size={20} color={colors.accent} />
                        <Text style={styles.requirementText}>Melampirkan dokumen Ijazah, Transkrip, KTP, & Pas Foto</Text>
                    </View>
                </Card>

                {/* Department Info Button */}
                <TouchableOpacity
                    style={styles.infoButton}
                    onPress={() => router.push('/pmb/departments')}
                    activeOpacity={0.8}
                >
                    <Ionicons name="list" size={20} color={colors.primary} />
                    <Text style={styles.infoButtonText}>Lihat Informasi Jurusan</Text>
                </TouchableOpacity>

                {/* Action Button */}
                <TouchableOpacity
                    style={styles.applyButton}
                    onPress={() => router.push('/pmb/register')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.applyButtonText}>Apply Now</Text>
                    <Ionicons name="arrow-forward" size={20} color={colors.text} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/')}
                >
                    <Text style={styles.backButtonText}>Kembali ke Beranda</Text>
                </TouchableOpacity>

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xl,
        paddingTop: spacing.lg,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primaryMuted,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        fontSize: typography.title,
        fontWeight: '800',
        color: colors.text,
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: typography.body,
        fontWeight: '600',
        color: colors.textSecondary,
        textAlign: 'center',
    },
    card: {
        marginBottom: spacing.xl,
    },
    cardTitle: {
        fontSize: typography.subtitle,
        fontWeight: '700',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    description: {
        fontSize: typography.body,
        color: colors.textSecondary,
        lineHeight: 22,
        marginBottom: spacing.lg,
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
        gap: spacing.sm,
    },
    requirementText: {
        color: colors.text,
        fontSize: typography.body,
    },
    applyButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: radii.lg,
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    applyButtonText: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '700',
    },
    backButton: {
        paddingVertical: spacing.md,
        alignItems: 'center',
    },
    backButtonText: {
        color: colors.textSecondary,
        fontSize: typography.body,
        fontWeight: '600',
    },
    infoButton: {
        backgroundColor: colors.card,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: radii.lg,
        gap: spacing.sm,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.primaryMuted,
    },
    infoButtonText: {
        color: colors.primary,
        fontSize: typography.body,
        fontWeight: '700',
    },
});
