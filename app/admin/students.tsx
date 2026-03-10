import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { PageHeader } from '../../components/PageHeader';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const MAJORS = ['All', 'Computer Science', 'Information Systems', 'Management'];

export default function AdminStudentsScreen() {
    const router = useRouter();

    // --- CONVEX DATA ---
    const rawStudents = useQuery(api.admin.getStudents);
    const students = rawStudents || [];
    const deleteStudent = useMutation(api.admin.deleteStudent);
    const updateStudent = useMutation(api.admin.updateStudent);
    const addStudent = useMutation(api.admin.addStudent);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMajor, setSelectedMajor] = useState('All');

    // State untuk Modal Edit & Add
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [editingStudentId, setEditingStudentId] = useState<any>(null);
    
    const [formName, setFormName] = useState('');
    const [formNim, setFormNim] = useState('');
    const [formMajor, setFormMajor] = useState('Computer Science');

    // Logika Filter & Search
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             student.nim.includes(searchQuery);
        const matchesMajor = selectedMajor === 'All' || student.major === selectedMajor;
        return matchesSearch && matchesMajor;
    });

    // Buka Modal
    const openModal = (mode: 'add' | 'edit', student?: any) => {
        setModalMode(mode);
        if (mode === 'edit' && student) {
            setEditingStudentId(student._id);
            setFormName(student.name);
            setFormNim(student.nim);
            setFormMajor(student.major);
        } else {
            setEditingStudentId(null);
            setFormName('');
            setFormNim('');
            setFormMajor('Computer Science');
        }
        setIsModalVisible(true);
    };

    // Simpan Perubahan (Add atau Edit)
    const handleSave = async () => {
        if (!formName || !formNim) {
            Alert.alert("Error", "Name and NIM cannot be empty!");
            return;
        }

        try {
            if (modalMode === 'edit') {
                await updateStudent({ 
                    id: editingStudentId, 
                    name: formName, 
                    nim: formNim, 
                    major: formMajor 
                });
                Alert.alert("Success", "Student updated!");
            } else {
                await addStudent({ 
                    name: formName, 
                    nim: formNim, 
                    major: formMajor,
                    year: new Date().getFullYear().toString()
                });
                Alert.alert("Success", "New student added!");
            }
            setIsModalVisible(false);
        } catch (error) {
            Alert.alert("Error", "Failed to save data. Check your connection.");
        }
    };

    // Fungsi Hapus dengan Konfirmasi
    const handleDelete = (id: any, name: string) => {
        Alert.alert(
            "Delete Student",
            `Are you sure you want to delete ${name}?`,
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Delete", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteStudent({ id });
                        } catch (e) {
                            Alert.alert("Error", "Failed to delete student.");
                        }
                    }
                }
            ]
        );
    };

    const StudentItem = ({ student }: { student: any }) => (
        <View style={styles.card}>
            <View style={styles.studentInfo}>
                <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{student.name.charAt(0)}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.nameText}>{student.name}</Text>
                    <Text style={styles.nimText}>NIM: {student.nim}</Text>
                    <View style={styles.majorBadge}>
                        <Ionicons name="school-outline" size={12} color={colors.primarySoft} />
                        <Text style={styles.majorText}>{student.major}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.actionContainer}>
                <TouchableOpacity 
                    style={styles.actionBtn} 
                    onPress={() => openModal('edit', student)}
                >
                    <Ionicons name="pencil-outline" size={18} color={colors.primarySoft} />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionBtn, { borderColor: colors.danger + '40' }]} 
                    onPress={() => handleDelete(student._id, student.name)}
                >
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Screen scrollable={true}>
            <PageHeader
                title="Student Database"
                subtitle="Manage active students"
                rightIcon="person-add-outline"
                onRightPress={() => openModal('add')}
            />

            {/* Pencarian */}
            <View style={styles.searchBox}>
                <Ionicons name="search" size={20} color={colors.textSecondary} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name or NIM..."
                    placeholderTextColor={colors.textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Jurusan */}
            <View style={styles.filterWrapper}>
                <Text style={styles.filterLabel}>Filter by Major:</Text>
                <View style={styles.filterScroll}>
                    {MAJORS.map(major => (
                        <TouchableOpacity
                            key={major}
                            style={[
                                styles.chip,
                                selectedMajor === major && styles.chipActive
                            ]}
                            onPress={() => setSelectedMajor(major)}
                        >
                            <Text style={[
                                styles.chipText,
                                selectedMajor === major && styles.chipTextActive
                            ]}>{major}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Daftar Mahasiswa */}
            <View style={styles.listSection}>
                {rawStudents === undefined ? (
                    <ActivityIndicator size="large" color={colors.primarySoft} style={{ marginTop: 40 }} />
                ) : filteredStudents.length > 0 ? (
                    filteredStudents.map(item => (
                        <StudentItem key={item._id} student={item} />
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="people-outline" size={60} color={colors.cardSoft} />
                        <Text style={styles.emptyTitle}>No Students Found</Text>
                        <Text style={styles.emptyDesc}>Try changing your search or filter</Text>
                    </View>
                )}
            </View>

            {/* Modal Edit/Add Mahasiswa */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.modalContent}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {modalMode === 'add' ? 'Add New Student' : 'Edit Student Info'}
                            </Text>
                            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                                <Ionicons name="close" size={24} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Full Name</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={formName}
                                    onChangeText={setFormName}
                                    placeholder="Enter full name"
                                    placeholderTextColor={colors.textSecondary}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>NIM (Student ID)</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={formNim}
                                    onChangeText={setFormNim}
                                    placeholder="Enter NIM"
                                    placeholderTextColor={colors.textSecondary}
                                    keyboardType="numeric"
                                    editable={modalMode === 'add'} // NIM usually unique, lock it on edit
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Select Major</Text>
                                <View style={styles.majorGrid}>
                                    {MAJORS.filter(m => m !== 'All').map(major => (
                                        <TouchableOpacity
                                            key={major}
                                            style={[
                                                styles.majorOption,
                                                formMajor === major && styles.majorOptionActive
                                            ]}
                                            onPress={() => setFormMajor(major)}
                                        >
                                            <Text style={[
                                                styles.majorOptionText,
                                                formMajor === major && styles.majorOptionTextActive
                                            ]}>{major}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            <TouchableOpacity 
                                style={styles.saveBtn}
                                onPress={handleSave}
                            >
                                <Text style={styles.saveBtnText}>
                                    {modalMode === 'add' ? 'Add Student' : 'Save Changes'}
                                </Text>
                                <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </Screen>
    );
}

const styles = StyleSheet.create({
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.card,
        paddingHorizontal: spacing.md,
        borderRadius: radii.md,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
    },
    searchInput: {
        flex: 1,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        color: colors.text,
        fontSize: typography.body,
    },
    filterWrapper: {
        marginBottom: spacing.xl,
    },
    filterLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
    },
    filterScroll: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    chip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radii.pill,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
    },
    chipActive: {
        backgroundColor: colors.primarySoft,
        borderColor: colors.primarySoft,
    },
    chipText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    chipTextActive: {
        color: '#FFFFFF',
    },
    listSection: {
        paddingBottom: spacing.xxl,
    },
    card: {
        backgroundColor: colors.card,
        borderRadius: radii.lg,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    studentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primaryMuted,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.primarySoft + '40',
    },
    avatarText: {
        fontSize: 18,
        fontWeight: '800',
        color: colors.primarySoft,
    },
    textContainer: {
        marginLeft: spacing.md,
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 2,
    },
    nimText: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    majorBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: colors.primaryMuted,
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: radii.sm,
    },
    majorText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.primarySoft,
    },
    actionContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    actionBtn: {
        width: 38,
        height: 38,
        borderRadius: radii.md,
        backgroundColor: colors.cardSoft,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: colors.background,
        borderTopLeftRadius: radii.xl,
        borderTopRightRadius: radii.xl,
        padding: spacing.xl,
        minHeight: '60%',
        borderWidth: 1,
        borderColor: colors.border,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: colors.text,
    },
    inputGroup: {
        marginBottom: spacing.lg,
    },
    inputLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
    },
    modalInput: {
        backgroundColor: colors.card,
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
    },
    majorOption: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radii.md,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
    },
    majorOptionActive: {
        backgroundColor: colors.primaryMuted,
        borderColor: colors.primarySoft,
    },
    majorOptionText: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: '600',
    },
    majorOptionTextActive: {
        color: colors.primarySoft,
    },
    saveBtn: {
        backgroundColor: colors.accent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        borderRadius: radii.lg,
        gap: spacing.sm,
        marginTop: spacing.xl,
        marginBottom: spacing.xxl,
    },
    saveBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    }
});
