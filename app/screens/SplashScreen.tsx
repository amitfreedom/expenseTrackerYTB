import { Animated, StatusBar, Text, View } from 'react-native'
import React from 'react'
import { useSplashAnimation } from '../../hooks/useSplashAnimation'
import { styles } from '../../styles/SplashScreen.styles';
import { colors } from '../../theme/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';


interface SplashScreenProps {
    onFinish: () => void;
}

const SplashScreenView = ({ onFinish }: SplashScreenProps) => {
    const {
        logoScale,
        logoOpacity,
        titleOpacity,
        titleTranslateY,
        subtitleOpacity,
        subtitleTranslateY,
        ringScale,
        ringOpacity,
        ring2Scale,
        ring2Opacity,
        bottomOpacity,
        fadeOut,
        dot1Opacity,
        dot2Opacity,
        dot3Opacity,
        dot1Position,
        dot2Position,
        dot3Position,
    } = useSplashAnimation(onFinish);
    return (
        <Animated.View style={[styles.container, { opacity: fadeOut }]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Background gradient layers */}
            <View style={styles.bgLayer1} />
            <View style={styles.bgLayer2} />
            <View style={styles.bgLayer3} />

            {/* Decorative floating dots */}
            <Animated.View
                style={[
                    styles.dot,
                    styles.dot1,
                    {
                        opacity: dot1Opacity,
                        transform: [{ translateY: dot1Position }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.dot,
                    styles.dot2,
                    {
                        opacity: dot2Opacity,
                        transform: [{ translateY: dot2Position }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.dot,
                    styles.dot3,
                    {
                        opacity: dot3Opacity,
                        transform: [{ translateY: dot3Position }],
                    },
                ]}
            />

            {/* Animated rings */}
            <Animated.View
                style={[
                    styles.ring,
                    {
                        opacity: ringOpacity,
                        transform: [{ scale: ringScale }],
                    },
                ]}
            />
            <Animated.View
                style={[
                    styles.ring,
                    styles.ring2,
                    {
                        opacity: ring2Opacity,
                        transform: [{ scale: ring2Scale }],
                    },
                ]}
            />

            {/* Logo container */}
            <Animated.View
                style={[
                    styles.logoContainer,
                    {
                        opacity: logoOpacity,
                        transform: [{ scale: logoScale }],
                    },
                ]}
            >
                <View style={styles.logoCircle}>
                    <MaterialCommunityIcons name="wallet" size={52} color="#FFFFFF" />
                </View>
            </Animated.View>

            {/* Title */}
            <Animated.Text
                style={[
                    styles.title,
                    {
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslateY }],
                    },
                ]}
            >
                ExpenseTracker
            </Animated.Text>

            {/* Subtitle */}
            <Animated.Text
                style={[
                    styles.subtitle,
                    {
                        opacity: subtitleOpacity,
                        transform: [{ translateY: subtitleTranslateY }],
                    },
                ]}
            >
                Smart money management
            </Animated.Text>

            {/* Bottom branding */}
            <Animated.View style={[styles.bottomContainer, { opacity: bottomOpacity }]}>
                <View style={styles.dividerLine} />
                <Animated.Text style={styles.bottomText}>
                    Track • Budget • Save
                </Animated.Text>
            </Animated.View>


        </Animated.View>
    )
}

export default SplashScreenView

