import { Animated, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useLoginAnimations } from '../../hooks/useLoginAnimations';
import { styles } from '../../styles/LoginScreen.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthInput } from '../../components/AuthInput';
import { useLogin } from '../../hooks/useLogin';
import { GradientButton } from '../../components/GradientButton';
import { colors } from '../../theme/colors';
import { CustomAlertDialog } from '../../components/CustomAlertDialog';

const LoginScreen = () => {
    const navigation = useNavigation<any>();
    const {
        email, setEmail,
        password, setPassword,
        secureText, toggleSecureText,
        handleLogin,
        loading,
        alert,
        hideAlert

    } = useLogin();
    const {
        staggerAnims,
        iconScale,
        iconSpin,
        dotAnims,
    } = useLoginAnimations();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

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
                    {/* Header Section */}
                    <Animated.View style={[styles.headerSection, {
                        opacity: staggerAnims[0].opacity,
                        transform: [{ translateY: staggerAnims[0].translateY }],
                    }]}>

                        <Animated.View
                            style={[
                                styles.iconContainer,
                                { transform: [{ scale: iconScale }, { rotate: iconSpin }] },
                            ]}
                        >
                            <View style={styles.iconInner}>
                                <MaterialCommunityIcons name="wallet" size={40} color="#fff" />
                            </View>
                        </Animated.View>

                        <Text style={styles.appName}>ExpenseTracker</Text>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                        <Text style={styles.subtitleText}>Sign in to manage your finances</Text>
                    </Animated.View>

                    {/* Form Card */}
                    <Animated.View
                        style={[
                            styles.formCard,
                            {
                                opacity: staggerAnims[1].opacity,
                                transform: [{ translateY: staggerAnims[1].translateY }],
                            },
                        ]}
                    >

                        <AuthInput
                            label="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            icon="email-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            animStyle={{
                                opacity: staggerAnims[2].opacity,
                                transform: [{ translateY: staggerAnims[2].translateY }],
                            }}
                        />

                        <AuthInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            icon="lock-outline"
                            secureTextEntry={secureText}
                            showToggle
                            onToggleSecure={toggleSecureText}
                            animStyle={{
                                opacity: staggerAnims[3].opacity,
                                transform: [{ translateY: staggerAnims[3].translateY }],
                            }}
                        />

                        {/* Login Button */}

                        <Animated.View
                            style={{
                                opacity: staggerAnims[4].opacity,
                                transform: [{ scale: staggerAnims[4].scale }],
                            }}
                        >
                            <GradientButton
                                title="Sign In"
                                onPress={handleLogin}
                                loading={loading}
                                loadingText="Signing in..."
                                trailingIcon="arrow-right"
                                style={{ marginTop: 6 }}
                            />
                        </Animated.View>
                    </Animated.View>

                    {/* Footer */}
                    <Animated.View
                        style={[styles.footer, { opacity: staggerAnims[4].opacity }]}
                    >
                        <View style={styles.dividerRow}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>New here?</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={() => navigation.navigate('SignUp')}
                            activeOpacity={0.8}
                        >
                            <MaterialCommunityIcons name="account-plus" size={20} color={colors.primary} />
                            <Text style={styles.signupButtonText}>Create an Account</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>

            </KeyboardAvoidingView>

            <CustomAlertDialog
                visible={alert.visible}
                type={"error"}
                title={alert.title}
                message={alert.message}
                onClose={hideAlert}
            />

        </View>
    )
}

export default LoginScreen
