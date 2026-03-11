import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card } from '../../components/Card';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useConsultations } from '../../context/ConsultationContext';
import { useUser } from '../../context/UserContext';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const TOPICS = [
    "Internship (Magang)",
    "Thesis / Final Project (Skripsi)",
    "Course Selection",
    "Academic Problems",
    "General Academic Questions"
];

const STAFF_ROLES = [
    "Dean (Dekan)",
    "Head of Study Program (Kaprodi)",
    "Lecturer (Dosen)"
];

export default function NewConsultationScreen() {
    const router = useRouter();
    const { nim } = useUser();
    
    // Fetch real student profile from Convex
    const student = useQuery(api.students.getStudentProfile, { nim: nim || "" });
    const requestConsultation = useMutation(api.students.requestConsultation);

    const [topic, setTopic] = useState('');
    const [staffRole, setStaffRole] = useState('');
    const [message, setMessage] = useState('');

    const [showTopicDropdown, setShowTopicDropdown] = useState(false);
    const [showStaffDropdown, setShowStaffDropdown] = useState(false);

    const handleSubmit = () => {
        if (!topic || !staffRole || !message) {
            Alert.alert("Error", "Please fill out all fields before submitting.");
            return;
        }

        Alert.alert(
            "Submit Consultation",
            "Are you sure you want to submit this consultation request?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Submit",
                    onPress: async () => {
                        try {
                            const today = new Date().toISOString().split('T')[0];

                            await requestConsultation({
                                studentName: student?.name || "Unknown Student",
                                topic: topic,
                                message: message,
                                date: today, 
                            });

                            Alert.alert("Success", "Your consultation request has been submitted to the portal.", [
                                { text: "OK", onPress: () => router.back() }
                            ]);
                        } catch (e) {
                            Alert.alert("Error", "Failed to submit request to server.");
                        }
                    }
                }
            ]
        );
    };

    return (
        <Screen style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.header}>
                        <Text style={styles.title}>New Consultation</Text>
                        <Text style={styles.subtitle}>Fill out the form below to request a consultation.</Text>
                    </View>

                    <Card style={styles.formCard}>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Student Name (Auto-filled)</Text>
                            <View style={styles.disabledInput}>
                                <Text style={styles.disabledText}>{student?.name || "Loading..."}</Text>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Student ID / NIM (Auto-filled)</Text>
                            <View style={styles.disabledInput}>
                                <Text style={styles.disabledText}>{student?.nim || nim || "---"}</Text>
                            </View>
                        </View>

                        {/* Topic Selection */}
                        <View style={[styles.inputGroup, { zIndex: 20 }]}>
                            <Text style={styles.label}>Consultation Topic</Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setShowTopicDropdown(!showTopicDropdown);
                                    setShowStaffDropdown(false);
                                }}
                            >
                                <Text style={[styles.dropdownText, !topic && styles.placeholderText]}>
                                    {topic || "Select Topic"}
                                </Text>
                                <Ionicons name={showTopicDropdown ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
                            </TouchableOpacity>

                            {showTopicDropdown && (
                                <View style={styles.dropdownArea}>
                                    {TOPICS.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setTopic(item);
                                                setShowTopicDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{item}</Text>
                                            {topic === item && <Ionicons name="checkmark" size={16} color={colors.primarySoft} />}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Staff Selection */}
                        <View style={[styles.inputGroup, { zIndex: 10 }]}>
                            <Text style={styles.label}>Select Academic Staff</Text>
                            <TouchableOpacity
                                style={styles.dropdownButton}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setShowStaffDropdown(!showStaffDropdown);
                                    setShowTopicDropdown(false);
                                }}
                            >
                                <Text style={[styles.dropdownText, !staffRole && styles.placeholderText]}>
                                    {staffRole || "Select Staff Role"}
                                </Text>
                                <Ionicons name={showStaffDropdown ? "chevron-up" : "chevron-down"} size={20} color={colors.textSecondary} />
                            </TouchableOpacity>

                            {showStaffDropdown && (
                                <View style={styles.dropdownArea}>
                                    {STAFF_ROLES.map((item, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.dropdownItem}
                                            onPress={() => {
                                                setStaffRole(item);
                                                setShowStaffDropdown(false);
                                            }}
                                        >
                                            <Text style={styles.dropdownItemText}>{item}</Text>
                                            {staffRole === item && <Ionicons name="checkmark" size={16} color={colors.primarySoft} />}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={[styles.inputGroup, { marginBottom: spacing.xl }]}>
                            <Text style={styles.label}>Message / Description</Text>
                            <TextInput
                                style={styles.textArea}
                                placeholder="Describe your problem or question here..."
                                placeholderTextColor={colors.textSecondary + '80'}
                                value={message}
                                onChangeText={setMessage}
                                multiline
                                numberOfLines={6}
                                textAlignVertical="top"
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.submitBtn, (!topic || !staffRole || !message) && styles.submitBtnDisabled]}
                            onPress={handleSubmit}
                            disabled={!topic || !staffRole || !message}
                        >
                            <Text style={styles.submitBtnText}>Submit Consultation</Text>
                            <Ionicons name="paper-plane-outline" size={18} color={colors.text} />
                        </TouchableOpacity>

                    </Card>
                </ScrollView>
            </KeyboardAvoidingView>
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
        fontSize: typography.title,
        fontWeight: '700',
        color: colors.text,
    },
    subtitle: {
        fontSize: typography.body,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    formCard: {
        padding: spacing.lg,
    },
    inputGroup: {
        marginBottom: spacing.lg,
        position: 'relative',
    },
    label: {
        color: colors.text,
        fontSize: typography.small,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
    disabledInput: {
        backgroundColor: colors.backgroundSoft,
        borderRadius: radii.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        opacity: 0.7,
    },
    disabledText: {
        color: colors.textSecondary,
        fontSize: typography.body,
    },
    dropdownButton: {
        backgroundColor: colors.backgroundSoft,
        borderRadius: radii.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownText: {
        color: colors.text,
        fontSize: typography.body,
    },
    placeholderText: {
        color: colors.textSecondary + '80',
    },
    dropdownArea: {
        position: 'absolute',
        top: 70, // Below the input
        left: 0,
        right: 0,
        backgroundColor: colors.cardSoft,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: 'hidden',
        zIndex: 100,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    dropdownItem: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dropdownItemText: {
        color: colors.text,
        fontSize: typography.body,
    },
    textArea: {
        backgroundColor: colors.backgroundSoft,
        borderRadius: radii.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        color: colors.text,
        fontSize: typography.body,
        minHeight: 120,
    },
    submitBtn: {
        backgroundColor: colors.primary,
        borderRadius: radii.md,
        paddingVertical: spacing.md,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.sm,
    },
    submitBtnDisabled: {
        backgroundColor: colors.border,
    },
    submitBtnText: {
        color: colors.text,
        fontWeight: '700',
        fontSize: typography.body,
    },
});
