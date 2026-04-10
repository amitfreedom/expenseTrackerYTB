import { useEffect, useRef } from "react";
import { useStaggerAnimation } from "./useStaggerAnimation";
import { Animated } from "react-native";

export const useSignUpAnimations = () => {
    const staggerAnims = useStaggerAnimation({ count: 6, stagger: 100, waitForInteraction: false });
    const iconScale = useRef(new Animated.Value(0)).current;
    const iconRotate = useRef(new Animated.Value(0)).current;

    const dot1Anim = useRef(new Animated.Value(0)).current;
    const dot2Anim = useRef(new Animated.Value(0)).current;
    const dot3Anim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const iconEntranceTimer = setTimeout(() => {
            Animated.parallel([
                Animated.spring(iconScale, { toValue: 1, friction: 3, tension: 80, useNativeDriver: true }),
                Animated.timing(iconRotate, { toValue: 1, duration: 800, useNativeDriver: true }),
            ]).start();
        }, 200);

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
        animateDot(dot2Anim, 500);
        animateDot(dot3Anim, 900);

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
        dotAnims: { dot1TransY, dot2TransY, dot3TransY },
    };


}