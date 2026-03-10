import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radii, spacing } from '../constants/theme';

interface PageHeaderProps {
    title: string;
    showBack?: boolean;
    rightIcon?: keyof typeof Ionicons.glyphMap;
    onRightPress?: () => void;
    subtitle?: string;
}

export const PageHeader = ({
    title,
    showBack = true,
    rightIcon,
    onRightPress,
    subtitle
}: PageHeaderProps) => {
    const router = useRouter();

    return (
        <View style={styles.externalWrapper}>
            <BlurView intensity={80} tint="dark" style={styles.blurContainer}>
                <View style={styles.container}>
                    <View style={styles.leftSection}>
                        {showBack && (
                            <TouchableOpacity
                                onPress={() => router.back()}
                                style={styles.backButton}
                                activeOpacity={0.7}
                            >
                                <LinearGradient
                                    colors={['#4F46E5', '#6366F1']}
                                    style={styles.iconGradient}
                                >
                                    <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
                                </LinearGradient>
                            </TouchableOpacity>
                        )}
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={1}>{title}</Text>
                            {subtitle ? (
                                <Text style={styles.subtitle}>{subtitle}</Text>
                            ) : (
                                <LinearGradient
                                    colors={['#4F46E5', '#10B981']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.accentBar}
                                />
                            )}
                        </View>
                    </View>

                    {rightIcon && (
                        <TouchableOpacity
                            onPress={onRightPress}
                            style={styles.rightButton}
                            activeOpacity={0.7}
                        >
                            <View style={styles.rightIconWrapper}>
                                <Ionicons name={rightIcon} size={22} color={colors.primarySoft} />
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    externalWrapper: {
        width: '100%',
        marginBottom: spacing.xl,
        borderRadius: radii.xl,
        overflow: 'hidden', // Crucial for BlurView borderRadius
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
    },
    blurContainer: {
        padding: spacing.md,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    backButton: {
        marginRight: spacing.md,
    },
    iconGradient: {
        width: 38,
        height: 38,
        borderRadius: radii.md,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#4F46E5',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 12,
        color: colors.textSecondary,
        fontWeight: '500',
        marginTop: 2,
    },
    accentBar: {
        width: 40,
        height: 4,
        borderRadius: radii.pill,
        marginTop: 6,
    },
    rightButton: {
        marginLeft: spacing.md,
    },
    rightIconWrapper: {
        width: 38,
        height: 38,
        borderRadius: radii.md,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
});
