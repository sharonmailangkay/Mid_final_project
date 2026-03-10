import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Screen } from '../../components/Screen';
import { colors, radii, spacing, typography } from '../../constants/theme';

export default function AdminLoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!username || !password) {
            setError('Please enter username and password.');
            return;
        }

        setLoading(true);
        setError('');

        // Simulate login
        setTimeout(() => {
            setLoading(false);
            if (username === 'admin' && password === 'admin') {
                router.replace('/admin/dashboard');
            } else {
                setError('Invalid username or password. (Hint: admin/admin)');
            }
        }, 1000);
    };

    return (
        <Screen>
            <Stack.Screen options={{ headerShown: false }} />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    <View style={styles.header}>
                        <LinearGradient
                            colors={['#4F46E5', '#10B981']}
                            style={styles.logoGradient}
                        >
                            <Ionicons name="shield-checkmark" size={40} color="#FFFFFF" />
                        </LinearGradient>
                        <Text style={styles.title}>Admin Portal</Text>
                        <View style={styles.accentBar} />
                        <Text style={styles.subtitle}>Secure Access Control</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {error ? (
                            <View style={styles.errorBox}>
                                <Ionicons name="alert-circle" size={18} color={colors.danger} />
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        <Text style={styles.label}>Admin Username</Text>
                        <TextInput
                            style={styles.input}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter admin username"
                            placeholderTextColor={colors.textSecondary}
                            autoCapitalize="none"
                            autoCorrect={false}
                            returnKeyType="next"
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter password"
                            placeholderTextColor={colors.textSecondary}
                            secureTextEntry
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                        />

                        <TouchableOpacity
                            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <Text style={styles.loginButtonText}>
                                {loading ? 'Logging in...' : 'Login to Admin'}
                            </Text>
                            {!loading && <Ionicons name="log-in-outline" size={20} color={colors.text} />}
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.replace('/')}
                    >
                        <Text style={styles.backButtonText}>Back to Gateway</Text>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Tetap center untuk tampilan awal yang rapi
        paddingVertical: spacing.xxl,
        paddingHorizontal: spacing.md,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    logoGradient: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
        ...Platform.select({
            ios: {
                shadowColor: '#4F46E5',
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.3,
                shadowRadius: 15,
            },
            android: {
                elevation: 10,
            },
        }),
    },
    title: {
        fontSize: typography.title,
        fontWeight: '900',
        color: colors.text,
        marginBottom: 4,
    },
    accentBar: {
        width: 40,
        height: 5,
        backgroundColor: colors.accent,
        borderRadius: radii.pill,
        marginBottom: spacing.md,
    },
    subtitle: {
        fontSize: typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    formContainer: {
        backgroundColor: colors.card,
        padding: spacing.xl,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
        width: '100%',
    },
    errorBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.danger + '20',
        padding: spacing.md,
        borderRadius: radii.md,
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    errorText: {
        color: colors.danger,
        fontSize: typography.small,
        fontWeight: '500',
        flex: 1,
    },
    label: {
        fontSize: typography.small,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
        fontWeight: '500',
    },
    input: {
        backgroundColor: colors.inputBackground,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radii.md,
        padding: spacing.md,
        color: colors.text,
        fontSize: typography.body,
        marginBottom: spacing.lg,
    },
    loginButton: {
        backgroundColor: '#10B981',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        borderRadius: radii.lg,
        gap: spacing.sm,
        marginTop: spacing.sm,
    },
    loginButtonDisabled: {
        opacity: 0.7,
    },
    loginButtonText: {
        color: colors.text,
        fontSize: typography.body,
        fontWeight: '700',
    },
    backButton: {
        marginTop: spacing.xl,
        alignItems: 'center',
        padding: spacing.md,
    },
    backButtonText: {
        color: '#10B981',
        fontSize: typography.body,
        fontWeight: '600',
    },
});
