import { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useStaggerAnimation } from './useStaggerAnimation';


export const useLoginAnimations = () => {
    // Staggered entrance animations for form elements
    const staggerAnims = useStaggerAnimation({ count: 5, stagger: 120, waitForInteraction: false });
    // Icon animations
    const iconScale = useRef(new Animated.Value(0)).current;
    const iconRotate = useRef(new Animated.Value(0)).current;

    // Floating dots
    const dot1Anim = useRef(new Animated.Value(0)).current;
    const dot2Anim = useRef(new Animated.Value(0)).current;
    const dot3Anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Icon entrance
        const iconEntranceTimer = setTimeout(() => {
            Animated.parallel([
                Animated.spring(iconScale, { toValue: 1, friction: 3, tension: 80, useNativeDriver: true }),
                Animated.timing(iconRotate, { toValue: 1, duration: 800, useNativeDriver: true }),
            ]).start();
        }, 200);

        // Floating dots
        const animateDot = (dot: Animated.Value, delay: number) => {
            setTimeout(() => {
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(dot, { toValue: 1, duration: 2000 + delay, useNativeDriver: true }),
                        Animated.timing(dot, { toValue: 0, duration: 2000 + delay, useNativeDriver: true }),
                    ])
                ).start();
            }, delay);
        };

        animateDot(dot1Anim, 0);
        animateDot(dot2Anim, 400);
        animateDot(dot3Anim, 800);

        // Icon pulse loop
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(iconScale, { toValue: 1.05, duration: 1500, useNativeDriver: true }),
                Animated.timing(iconScale, { toValue: 1, duration: 1500, useNativeDriver: true }),
            ])
        );

        const pulseTimer = setTimeout(() => pulse.start(), 1200);

        return () => {
            clearTimeout(iconEntranceTimer);
            clearTimeout(pulseTimer);
            pulse.stop();
        };
    }, []);

    const iconSpin = iconRotate.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const dot1TransY = dot1Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -15] });
    const dot2TransY = dot2Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -20] });
    const dot3TransY = dot3Anim.interpolate({ inputRange: [0, 1], outputRange: [0, -12] });

    return {
        staggerAnims,
        iconScale,
        iconSpin,
        dotAnims: {
            dot1TransY,
            dot2TransY,
            dot3TransY,
        },
    };

}