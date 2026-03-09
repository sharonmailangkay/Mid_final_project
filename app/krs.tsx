import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card } from '../components/Card';
import { Screen } from '../components/Screen';
import { mockAvailableCourses } from '../constants/data';
import { colors, radii, spacing, typography } from '../constants/theme';

export default function KRSScreen() {
    const [selectedCourseIds, setSelectedCourseIds] = useState<string[]>([]);
    const [krsStatus, setKrsStatus] = useState<'Draft' | 'Submitted' | 'Approved'>('Draft');

    const handleToggleCourse = (courseId: string) => {
        if (krsStatus !== 'Draft') {
            Alert.alert("Locked", "You cannot modify your study plan after submission.");
            return;
        }

        if (selectedCourseIds.includes(courseId)) {
            setSelectedCourseIds(selectedCourseIds.filter(id => id !== courseId));
        } else {
            setSelectedCourseIds([...selectedCourseIds, courseId]);
        }
    };

    const selectedCourses = mockAvailableCourses.filter((c: any) => selectedCourseIds.includes(c.id));
    const totalSKS = selectedCourses.reduce((sum: number, c: any) => sum + c.credits, 0);

    const handleSubmit = () => {
        if (totalSKS === 0) {
            Alert.alert("Error", "Please select at least one course before submitting.");
            return;
        }

        Alert.alert(
            "Submit Study Plan",
            `Are you sure you want to submit your study plan with total ${totalSKS} SKS to your Academic Advisor?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Submit",
                    onPress: () => {
                        setKrsStatus('Submitted');
                        // Simulate advisor approval after 3 seconds
                        setTimeout(() => {
                            setKrsStatus('Approved');
                            Alert.alert("Approved", "Your study plan has been approved by your Academic Advisor.");
                        }, 3000);
                    }
                }
            ]
        );
    };

    return (
        <Screen style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                <View style={styles.header}>
                    <Text style={styles.title}>Study Plan (KRS)</Text>
                    <Text style={styles.subtitle}>Select courses for the upcoming semester.</Text>
                </View>

                <Card style={styles.summaryCard}>
                    <View style={styles.summaryRow}>
                        <View>
                            <Text style={styles.summaryLabel}>Total SKS</Text>
                            <Text style={styles.summaryValue}>{totalSKS} / 24</Text>
                        </View>
                        <View style={styles.statusBadge}>
                            <Text style={[styles.statusText, krsStatus === 'Approved' && { color: colors.accent }, krsStatus === 'Submitted' && { color: colors.primary }]}>
                                {krsStatus}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitButton, (totalSKS === 0 || krsStatus !== 'Draft') && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={totalSKS === 0 || krsStatus !== 'Draft'}
                    >
                        <Text style={styles.submitButtonText}>
                            {krsStatus === 'Draft' ? 'Submit for Consultation' : 'Already Submitted'}
                        </Text>
                        {krsStatus === 'Draft' && <Ionicons name="send" size={16} color={colors.text} />}
                    </TouchableOpacity>
                </Card>

                <Text style={styles.sectionTitle}>Available Courses</Text>

                {mockAvailableCourses.map((course: any) => {
                    const isSelected = selectedCourseIds.includes(course.id);

                    return (
                        <TouchableOpacity
                            key={course.id}
                            activeOpacity={0.7}
                            onPress={() => handleToggleCourse(course.id)}
                            style={[styles.courseCard, isSelected && styles.courseCardSelected]}
                        >
                            <View style={styles.courseHeader}>
                                <View style={styles.courseCodeBadge}>
                                    <Text style={styles.courseCode}>{course.id.toUpperCase()}</Text>
                                </View>
                                <Text style={styles.credits}>{course.credits} SKS</Text>
                            </View>

                            <Text style={styles.courseName}>{course.name}</Text>

                            <View style={styles.lecturerRow}>
                                <Ionicons name="person-outline" size={14} color={colors.textSecondary} />
                                <Text style={styles.lecturerName}>{course.lecturer}</Text>
                            </View>

                            <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                                {isSelected && <Ionicons name="checkmark" size={14} color={colors.background} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}

            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: spacing.xxl,
    },
    header: {
        marginBottom: spacing.xl,
    },
    title: {
        color: colors.text,
        fontSize: typography.title,
        fontWeight: "700",
    },
    subtitle: {
        color: colors.textSecondary,
        fontSize: typography.body,
        marginTop: spacing.xs,
    },
    summaryCard: {
        marginBottom: spacing.xl,
        padding: spacing.lg,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    summaryLabel: {
        color: colors.textSecondary,
        fontSize: typography.small,
    },
    summaryValue: {
        color: colors.primarySoft,
        fontSize: typography.title,
        fontWeight: '800',
    },
    statusBadge: {
        backgroundColor: colors.cardSoft,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: radii.pill,
        borderWidth: 1,
        borderColor: colors.border,
    },
    statusText: {
        color: colors.textSecondary,
        fontWeight: '600',
        fontSize: typography.small,
    },
    submitButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: radii.md,
        gap: spacing.sm,
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: colors.text,
        fontWeight: '700',
        fontSize: typography.body,
    },
    sectionTitle: {
        color: colors.text,
        fontSize: typography.subtitle,
        fontWeight: '700',
        marginBottom: spacing.md,
    },
    courseCard: {
        backgroundColor: colors.card,
        borderRadius: radii.lg,
        padding: spacing.lg,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        position: 'relative',
    },
    courseCardSelected: {
        borderColor: colors.primarySoft,
        backgroundColor: colors.primaryMuted,
    },
    courseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    courseCodeBadge: {
        backgroundColor: colors.backgroundSoft,
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderRadius: radii.sm,
    },
    courseCode: {
        color: colors.textSecondary,
        fontSize: 10,
        fontWeight: '700',
    },
    credits: {
        color: colors.accent,
        fontSize: typography.small,
        fontWeight: '600',
    },
    courseName: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: '600',
        marginBottom: spacing.sm,
        paddingRight: spacing.xl,
    },
    lecturerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    lecturerName: {
        color: colors.textSecondary,
        fontSize: typography.small,
    },
    checkbox: {
        position: 'absolute',
        right: spacing.lg,
        top: spacing.lg,
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: colors.textSecondary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: colors.primarySoft,
        borderColor: colors.primarySoft,
    },
});
