import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

const FormField = ({ label, value, field, placeholder, keyboardType = 'default', handleInputChange }: any) => (
    <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => handleInputChange(field, text)}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            keyboardType={keyboardType as any}
        />
    </View>
);

const MajorSelector = ({ label, selectedValue, onSelect }: any) => {
    const majors = ["Informatika", "Sistem Informasi", "Akuntansi", "Manajemen", "Filsafat"];
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.majorGrid}>
                {majors.map((m) => (
                    <TouchableOpacity
                        key={m}
                        style={[
                            styles.majorChip,
                            selectedValue === m && styles.majorChipActive
                        ]}
                        onPress={() => onSelect('major', m)}
                    >
                        <Text style={[
                            styles.majorChipText,
                            selectedValue === m && styles.majorChipTextActive
                        ]}>{m}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const DocumentUpload = ({ label, docType, documents, pickDocument }: any) => (
    <View style={styles.uploadContainer}>
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => pickDocument(docType)}
        >
            <Ionicons
                name={documents[docType] ? "document-text" : "cloud-upload-outline"}
                size={24}
                color={documents[docType] ? colors.accent : colors.icon}
            />
            <Text style={[styles.uploadText, documents[docType] && styles.uploadedText]}>
                {documents[docType] ? documents[docType].name : "Tap to upload file"}
            </Text>
        </TouchableOpacity>
    </View>
);

export default function PMBRegisterScreen() {
    const router = useRouter();
    const addApplicant = useMutation(api.students.addApplicant);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        dob: '',
        email: '',
        phone: '',
        address: '',
        highSchool: '',
        major: '',
    });

    // Upload State
    const [documents, setDocuments] = useState({
        certificate: null as any,
        transcript: null as any,
        idCard: null as any,
        photo: null as any,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const pickDocument = async (docType: keyof typeof documents) => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (result.canceled === false && result.assets && result.assets.length > 0) {
                setDocuments((prev) => ({ ...prev, [docType]: result.assets[0] }));
            }
        } catch (err) {
            console.error('Error picking document:', err);
        }
    };

    const validateForm = () => {
        const { fullName, dob, email, phone, address, highSchool, major } = formData;
        if (!fullName || !dob || !email || !phone || !address || !highSchool || !major) {
            return "Please fill out all personal data fields.";
        }

        if (!documents.certificate || !documents.transcript || !documents.idCard || !documents.photo) {
            return "Please upload all required documents.";
        }

        return "";
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            setErrorMsg(validationError);
            return;
        }

        setErrorMsg("");
        setIsSubmitting(true);

        try {
            const result = await addApplicant({
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
            });
            
            setIsSubmitting(false);
            // Pass the applicant ID to the verification screen
            router.push({
                pathname: '/pmb/verification',
                params: { id: result }
            });
        } catch (error) {
            console.error(error);
            setIsSubmitting(false);
            setErrorMsg("Failed to submit application. Please try again.");
        }
    };

    return (
        <Screen>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
                            <Ionicons name="arrow-back" size={24} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Registration Form</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    <View style={styles.sectionHeader}>
                        <Ionicons name="person-circle-outline" size={20} color={colors.primarySoft} />
                        <Text style={styles.sectionTitle}>Personal Data</Text>
                    </View>

                    <FormField label="Full Name" value={formData.fullName} field="fullName" placeholder="Enter your full name" handleInputChange={handleInputChange} />
                    <FormField label="Date of Birth" value={formData.dob} field="dob" placeholder="DD/MM/YYYY" handleInputChange={handleInputChange} />
                    <FormField label="Email" value={formData.email} field="email" placeholder="example@email.com" keyboardType="email-address" handleInputChange={handleInputChange} />
                    <FormField label="Phone Number" value={formData.phone} field="phone" placeholder="+62 8..." keyboardType="phone-pad" handleInputChange={handleInputChange} />
                    <FormField label="Address" value={formData.address} field="address" placeholder="Complete address" handleInputChange={handleInputChange} />
                    <FormField label="High School Name" value={formData.highSchool} field="highSchool" placeholder="Asal sekolah" handleInputChange={handleInputChange} />
                    <MajorSelector label="Desired Major" selectedValue={formData.major} onSelect={handleInputChange} />

                    <View style={styles.divider} />

                    <View style={styles.sectionHeader}>
                        <Ionicons name="folder-open-outline" size={20} color={colors.primarySoft} />
                        <Text style={styles.sectionTitle}>Required Documents</Text>
                    </View>

                    <DocumentUpload label="High School Certificate (Ijazah/SKL)" docType="certificate" documents={documents} pickDocument={pickDocument} />
                    <DocumentUpload label="Academic Transcript" docType="transcript" documents={documents} pickDocument={pickDocument} />
                    <DocumentUpload label="ID Card / Passport (KTP)" docType="idCard" documents={documents} pickDocument={pickDocument} />
                    <DocumentUpload label="Passport Photo (Pas Foto 3x4)" docType="photo" documents={documents} pickDocument={pickDocument} />

                    {errorMsg !== "" && (
                        <View style={styles.errorBox}>
                            <Ionicons name="alert-circle" size={18} color={colors.danger} />
                            <Text style={styles.errorText}>{errorMsg}</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? "Submitting Application..." : "Submit Registration"}
                        </Text>
                        {!isSubmitting && <Ionicons name="checkmark-done" size={20} color={colors.text} />}
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
        paddingTop: spacing.sm,
    },
    backIcon: {
        padding: spacing.xs,
    },
    headerTitle: {
        fontSize: typography.subtitle,
        fontWeight: '700',
        color: colors.text,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    sectionTitle: {
        fontSize: typography.subtitle,
        fontWeight: '600',
        color: colors.text,
    },
    inputContainer: {
        marginBottom: spacing.md,
    },
    label: {
        fontSize: typography.small,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.inputBackground,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        padding: spacing.md,
        color: colors.text,
        fontSize: typography.body,
    },
    majorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginTop: spacing.xs,
    },
    majorChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radii.pill,
        backgroundColor: colors.cardSoft,
        borderWidth: 1,
        borderColor: colors.border,
    },
    majorChipActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    majorChipText: {
        color: colors.textSecondary,
        fontSize: typography.small,
        fontWeight: '600',
    },
    majorChipTextActive: {
        color: colors.text,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.lg,
    },
    uploadContainer: {
        marginBottom: spacing.md,
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.cardSoft,
        borderWidth: 1,
        borderColor: colors.border,
        borderStyle: 'dashed',
        borderRadius: radii.md,
        padding: spacing.md,
        gap: spacing.md,
    },
    uploadText: {
        color: colors.textSecondary,
        fontSize: typography.body,
    },
    uploadedText: {
        color: colors.accent,
        fontWeight: '600',
    },
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.danger + '20',
        padding: spacing.md,
        borderRadius: radii.md,
        marginBottom: spacing.lg,
        marginTop: spacing.sm,
        gap: spacing.sm,
    },
    errorText: {
        color: colors.danger,
        fontSize: typography.small,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
        borderRadius: radii.lg,
        marginTop: spacing.lg,
        gap: spacing.sm,
    },
    submitButtonDisabled: {
        opacity: 0.7,
    },
    submitButtonText: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: '700',
    },
});
