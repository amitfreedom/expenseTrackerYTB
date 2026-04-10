import { Animated, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useSignUpAnimations } from '../../hooks/useSignUpAnimations';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthInput } from '../../components/AuthInput';
import { useSignUp } from '../../hooks/useSignUp';
import { styles } from '../../styles/SignUpScreen.styles';
import { GradientButton } from '../../components/GradientButton';
import { colors } from '../../theme/colors';
import { useNavigation } from '@react-navigation/native';
import { CustomAlertDialog } from '../../components/CustomAlertDialog';

const SignUpScreen = () => {
    const navigation = useNavigation<any>();

    const { email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        loading,
        secureText,
        toggleSecureText,
        secureConfirm,
        toggleSecureConfirm,
        handleSignUp,
        alert,
        setAlert, hideAlert } = useSignUp();

    const { staggerAnims, iconScale, iconSpin, dotAnims } =
        useSignUpAnimations();


    return (
        <View style={styles.container}>
            {/* Background decorative shapes */}
            <View style={styles.bgCircle1} />
            <View style={styles.bgCircle2} />
            <View style={styles.bgCircle3} />
            {/* Floating dots */}
            <Animated.View style={[styles.floatDot, styles.floatDot1, { transform: [{ translateY: dotAnims.dot1TransY }] }]} />
            <Animated.View style={[styles.floatDot, styles.floatDot2, { transform: [{ translateY: dotAnims.dot2TransY }] }]} />
            <Animated.View style={[styles.floatDot, styles.floatDot3, { transform: [{ translateY: dotAnims.dot3TransY }] }]} />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    {/* Header */}
                    <Animated.View
                        style={[styles.headerSection, { opacity: staggerAnims[0].opacity, transform: [{ translateY: staggerAnims[0].translateY }] }]}
                    >
                        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }, { rotate: iconSpin }] }]}>
                            <View style={styles.iconInner}>
                                <MaterialCommunityIcons name="account-plus" size={38} color="#fff" />
                            </View>
                        </Animated.View>

                        <Text style={styles.appName}>ExpenseTracker</Text>
                        <Text style={styles.welcomeText}>Get Started!</Text>
                        <Text style={styles.subtitleText}>Create your account to track expenses</Text>
                    </Animated.View>
                    {/* Form Card */}
                    <Animated.View style={[styles.formCard, { opacity: staggerAnims[1].opacity, transform: [{ translateY: staggerAnims[1].translateY }] }]}>
                        <AuthInput
                            label="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            icon="email-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            animStyle={{ opacity: staggerAnims[2].opacity, transform: [{ translateY: staggerAnims[2].translateY }] }}
                        />

                        <AuthInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            icon="lock-outline"
                            secureTextEntry={secureText}
                            showToggle
                            onToggleSecure={toggleSecureText}
                            animStyle={{ opacity: staggerAnims[3].opacity, transform: [{ translateY: staggerAnims[3].translateY }] }}
                        />

                        <AuthInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            icon="lock-check-outline"
                            secureTextEntry={secureConfirm}
                            showToggle
                            onToggleSecure={toggleSecureConfirm}
                            animStyle={{ opacity: staggerAnims[4].opacity, transform: [{ translateY: staggerAnims[4].translateY }] }}
                        />
                        {/* Password hint */}
                        <View style={styles.hintRow}>
                            <MaterialCommunityIcons name="shield-check-outline" size={14} color="#aaa" />
                            <Text style={styles.hintText}>At least 6 characters with letters & numbers</Text>
                        </View>

                        {/* Sign Up Button */}
                        <Animated.View style={{ opacity: staggerAnims[5].opacity, transform: [{ scale: staggerAnims[5].scale }] }}>
                            <GradientButton
                                title="Create Account"
                                onPress={handleSignUp}
                                loading={loading}
                                loadingText="Creating account..."
                                trailingIcon="check"
                            />
                        </Animated.View>

                    </Animated.View>

                    {/* Footer */}
                    <Animated.View style={[styles.footer, { opacity: staggerAnims[5].opacity }]}>
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>Already a member?</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={() => navigation.navigate('Login')}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons name="login" size={20} color={colors.primary} />
                            <Text style={styles.loginButtonText}>Sign In Instead</Text>
                        </TouchableOpacity>
                    </Animated.View>

                </ScrollView>

            </KeyboardAvoidingView>

            <CustomAlertDialog
                visible={alert.visible}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={hideAlert}
            />

        </View>
    )
}

export default SignUpScreen
