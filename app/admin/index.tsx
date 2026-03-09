import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={styles.container}>

                    <View style={styles.header}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="shield-checkmark" size={48} color={colors.primarySoft} />
                        </View>
                        <Text style={styles.title}>Admin Portal</Text>
                        <Text style={styles.subtitle}>Sign in to manage the university system</Text>
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
                        />

                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter password"
                            placeholderTextColor={colors.textSecondary}
                            secureTextEntry
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
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primaryMuted + '40',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: colors.primarySoft,
    },
    title: {
        fontSize: typography.title,
        fontWeight: '800',
        color: colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: typography.body,
        color: colors.textSecondary,
    },
    formContainer: {
        backgroundColor: colors.card,
        padding: spacing.xl,
        borderRadius: radii.xl,
        borderWidth: 1,
        borderColor: colors.border,
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
