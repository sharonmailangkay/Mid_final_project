import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Screen } from '../components/Screen';
import { colors, radii, spacing, typography } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function PortalGateway() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#0F172A', '#050816']}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Decorative Blob */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <Screen style={styles.screen}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/unklab.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.title}>SIS</Text>
            <Text style={styles.subtitle}>Student Information System</Text>
            <Text style={styles.tagline}>Masa depan pendidikan dimulai di sini.</Text>
          </View>

          <View style={styles.cardsContainer}>
            {/* PMB Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cardWrapper}
              onPress={() => router.push('/pmb')}
            >
              {Platform.OS === 'ios' ? (
                <BlurView intensity={20} tint="dark" style={styles.card}>
                  <CardContent
                    title="Pendaftaran Mahasiswa Baru"
                    icon="person-add"
                    color="#EF4444"
                    desc="Bergabung menjadi bagian dari keluarga besar Universitas Klabat."
                  />
                </BlurView>
              ) : (
                <View style={[styles.card, styles.androidCard]}>
                  <CardContent
                    title="Pendaftaran Mahasiswa Baru"
                    icon="person-add"
                    color="#EF4444"
                    desc="Bergabung menjadi bagian dari keluarga besar Universitas Klabat."
                  />
                </View>
              )}
            </TouchableOpacity>

            {/* Akademik Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cardWrapper}
              onPress={() => router.push('/login')}
            >
              {Platform.OS === 'ios' ? (
                <BlurView intensity={20} tint="dark" style={[styles.card, { borderColor: 'rgba(99, 102, 241, 0.4)' }]}>
                  <CardContent
                    title="Portal Sivitas Akademika"
                    icon="school"
                    color="#6366F1"
                    desc="Akses sistem informasi akademik, KRS, nilai, dan absensi."
                  />
                </BlurView>
              ) : (
                <View style={[styles.card, styles.androidCard, { borderColor: 'rgba(99, 102, 241, 0.4)' }]}>
                  <CardContent
                    title="Portal Sivitas Akademika"
                    icon="school"
                    color="#6366F1"
                    desc="Akses sistem informasi akademik, KRS, nilai, dan absensi."
                  />
                </View>
              )}
            </TouchableOpacity>

            {/* Admin Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.cardWrapper}
              onPress={() => router.push('/admin')}
            >
              {Platform.OS === 'ios' ? (
                <BlurView intensity={20} tint="dark" style={styles.card}>
                  <CardContent
                    title="Portal Administrator"
                    icon="shield-checkmark"
                    color="#10B981"
                    desc="Sistem manajemen internal dan kontrol akademik."
                  />
                </BlurView>
              ) : (
                <View style={[styles.card, styles.androidCard]}>
                  <CardContent
                    title="Portal Administrator"
                    icon="shield-checkmark"
                    color="#10B981"
                    desc="Sistem manajemen internal dan kontrol akademik."
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>© 2026 Universitas Klabat • Develop by IT Center</Text>
      </Screen>
    </View>
  );
}

const CardContent = ({ title, icon, color, desc }: { title: string, icon: any, color: string, desc: string }) => (
  <View style={styles.cardContent}>
    <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon} size={28} color={color} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    backgroundColor: 'transparent',
  },
  blob1: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    transform: [{ scale: 1.5 }],
  },
  blob2: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    transform: [{ scale: 1.2 }],
  },
  content: {
    flex: 1,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.md,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  logo: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: 2,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.primarySoft,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  cardsContainer: {
    width: '100%',
    gap: spacing.lg,
  },
  cardWrapper: {
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  card: {
    padding: spacing.xl,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  androidCard: {
    backgroundColor: 'rgba(31, 41, 55, 0.8)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: radii.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  textContainer: {
    flex: 1,
    paddingRight: spacing.md,
  },
  cardTitle: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  footer: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 10,
    marginBottom: spacing.xl,
    opacity: 0.5,
  },
});
