import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Screen } from "../../components/Screen";
import { colors, radii, spacing } from "../../constants/theme";

const DEPT_DETAILS: Record<string, any> = {
    "1": {
        name: "Informatika",
        faculty: "Fakultas Ilmu Komputer",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
        description: "Program Studi Informatika membekali mahasiswa dengan keahlian dalam perancangan dan pengembangan perangkat lunak, sistem cerdas, dan infrastruktur komputasi.",
        curriculum: [
            "Algoritma dan Struktur Data",
            "Kecerdasan Buatan (AI)",
            "Pengembangan Web & Mobile",
            "Cyber Security",
            "Cloud Computing"
        ],
        careers: [
            "Software Engineer",
            "Data Scientist",
            "Cybersecurity Analyst",
            "Mobile App Developer"
        ]
    },
    "2": {
        name: "Sistem Informasi",
        faculty: "Fakultas Ilmu Komputer",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        description: "Sistem Informasi menggabungkan teknologi informasi dengan manajemen bisnis untuk menciptakan solusi digital yang efisien bagi organisasi.",
        curriculum: [
            "Manajemen Proyek TI",
            "Analisis Sistem Bisnis",
            "Database Management",
            "E-Commerce",
            "Enterprise Resource Planning"
        ],
        careers: [
            "IT Business Analyst",
            "Project Manager",
            "Database Administrator",
            "Systems Consultant"
        ]
    },
    "3": {
        name: "Keperawatan",
        faculty: "Fakultas Keperawatan",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop",
        description: "Pendidikan keperawatan yang mengedepankan etika, kasih, dan kompetensi medis berstandar internasional.",
        curriculum: [
            "Anatomi dan Fisiologi",
            "Keperawatan Medikal Bedah",
            "Keperawatan Anak",
            "Manajemen Keperawatan",
            "Gawat Darurat"
        ],
        careers: [
            "Perawat Profesional (Hospital/Clinic)",
            "Nurse Manager",
            "Pendidik Keperawatan",
            "Travel Nurse"
        ]
    },
    "4": {
        name: "Akuntansi",
        faculty: "Fakultas Ekonomi dan Bisnis",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1000&auto=format&fit=crop",
        description: "Menyiapkan akuntan masa depan yang berintegritas dan mumpuni dalam pelaporan keuangan serta audit digital.",
        curriculum: [
            "Akuntansi Keuangan",
            "Perpajakan",
            "Audit & Asurans",
            "Akuntansi Manajemen",
            "Sistem Informasi Akuntansi"
        ],
        careers: [
            "Public Accountant",
            "Tax Consultant",
            "Financial Auditor",
            "Management Accountant"
        ]
    },
    "5": {
        name: "Manajemen",
        faculty: "Fakultas Ekonomi dan Bisnis",
        image: "https://images.unsplash.com/photo-1454165833767-027eeed15b3e?q=80&w=1000&auto=format&fit=crop",
        description: "Membentuk pemimpin bisnis yang inovatif, etis, dan mampu bersaing di pasar global.",
        curriculum: [
            "Manajemen Strategis",
            "Pemasaran Digital",
            "Manajemen Sumber Daya Manusia",
            "Kewirausahaan",
            "Manajemen Operasi"
        ],
        careers: [
            "Business Development",
            "Marketing Manager",
            "HR Manager",
            "Entrepreneur"
        ]
    },
    "6": {
        name: "Filsafat",
        faculty: "Fakultas Filsafat",
        image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=1000&auto=format&fit=crop",
        description: "Mempelajari dasar-dasar pemikiran kritis, logika, dan pemahaman mendalam tentang nilai-nilai kemanusiaan.",
        curriculum: [
            "Logika",
            "Etika Komparatif",
            "Filsafat Ilmu",
            "Metafisika",
            "Antropologi Budaya"
        ],
        careers: [
            "Akademisi/Dosen",
            "Penulis/Jurnalis",
            "Policy Analyst",
            "Etikawan Bisnis"
        ]
    }
};

export default function DepartmentDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const dept = DEPT_DETAILS[id as string];

    if (!dept) return null;

    return (
        <Screen containerStyle={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header Image */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: dept.image }} style={styles.headerImage} />
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Text style={styles.facultyName}>{dept.faculty}</Text>
                    <Text style={styles.deptName}>{dept.name}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Tentang Jurusan</Text>
                        <Text style={styles.description}>{dept.description}</Text>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Kurikulum Utama</Text>
                        {dept.curriculum.map((item: string, index: number) => (
                            <View key={index} style={styles.listItem}>
                                <Ionicons name="radio-button-on" size={14} color={colors.primary} />
                                <Text style={styles.listItemText}>{item}</Text>
                            </View>
                        ))}
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Prospek Karir</Text>
                        <View style={styles.careerGrid}>
                            {dept.careers.map((career: string, index: number) => (
                                <View key={index} style={styles.careerChip}>
                                    <Text style={styles.careerText}>{career}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => router.push('/pmb/register')}
                    >
                        <Text style={styles.applyButtonText}>Daftar di Jurusan Ini</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F8FAFC",
    },
    imageContainer: {
        height: 250,
        width: "100%",
    },
    headerImage: {
        width: "100%",
        height: "100%",
    },
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
        backgroundColor: "rgba(0,0,0,0.4)",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        padding: spacing.xl,
        backgroundColor: "#F8FAFC",
        marginTop: -30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },
    facultyName: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.primary,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 8,
    },
    deptName: {
        fontSize: 28,
        fontWeight: "800",
        color: "#0F172A",
        marginBottom: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1E293B",
        marginBottom: spacing.md,
    },
    description: {
        fontSize: 16,
        color: "#475569",
        lineHeight: 24,
    },
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        gap: 12,
    },
    listItemText: {
        fontSize: 15,
        color: "#475569",
    },
    careerGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    careerChip: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    careerText: {
        fontSize: 13,
        fontWeight: "600",
        color: "#64748B",
    },
    applyButton: {
        backgroundColor: colors.primary,
        paddingVertical: 18,
        borderRadius: radii.md,
        alignItems: "center",
        marginTop: spacing.md,
        marginBottom: spacing.xxl,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    applyButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
