import { useEffect, useRef } from "react";
import { Animated } from "react-native";

interface SplashAnimationValues {
    logoScale: Animated.Value;
    logoOpacity: Animated.Value;
    titleOpacity: Animated.Value;
    titleTranslateY: Animated.Value;
    subtitleOpacity: Animated.Value;
    subtitleTranslateY: Animated.Value;
    ringScale: Animated.Value;
    ringOpacity: Animated.Value;
    ring2Scale: Animated.Value;
    ring2Opacity: Animated.Value;
    bottomOpacity: Animated.Value;
    fadeOut: Animated.Value;
    dot1Opacity: Animated.Value;
    dot2Opacity: Animated.Value;
    dot3Opacity: Animated.Value;
    dot1Position: Animated.Value;
    dot2Position: Animated.Value;
    dot3Position: Animated.Value;
}

export const useSplashAnimation = (onFinish: () => void): SplashAnimationValues => {
    const logoScale = useRef(new Animated.Value(0.3)).current;
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(30)).current;
    const subtitleOpacity = useRef(new Animated.Value(0)).current;
    const subtitleTranslateY = useRef(new Animated.Value(20)).current;
    const ringScale = useRef(new Animated.Value(0.5)).current;
    const ringOpacity = useRef(new Animated.Value(0)).current;
    const ring2Scale = useRef(new Animated.Value(0.5)).current;
    const ring2Opacity = useRef(new Animated.Value(0)).current;
    const bottomOpacity = useRef(new Animated.Value(0)).current;
    const fadeOut = useRef(new Animated.Value(1)).current;

    const dot1Opacity = useRef(new Animated.Value(0)).current;
    const dot2Opacity = useRef(new Animated.Value(0)).current;
    const dot3Opacity = useRef(new Animated.Value(0)).current;
    const dot1Position = useRef(new Animated.Value(0)).current;
    const dot2Position = useRef(new Animated.Value(0)).current;
    const dot3Position = useRef(new Animated.Value(0)).current;


    // Phase 1–5: entrance sequence + fade out
    useEffect(() => {
        // Phase 1: Logo and rings entrance
        Animated.sequence([
            Animated.parallel([
                Animated.timing(ringOpacity, { toValue: 0.15, duration: 600, useNativeDriver: true }),
                Animated.timing(ringScale, { toValue: 1.5, duration: 800, useNativeDriver: true }),
            ]),
            Animated.parallel([
                Animated.timing(ringOpacity, { toValue: 0.05, duration: 400, useNativeDriver: true }),
                Animated.timing(ringScale, { toValue: 2, duration: 600, useNativeDriver: true }),
                Animated.parallel([
                    Animated.timing(ring2Opacity, { toValue: 0.1, duration: 500, useNativeDriver: true }),
                    Animated.timing(ring2Scale, { toValue: 1.3, duration: 700, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.spring(logoScale, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }),
                    Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
                ]),
            ]),
        ]).start();

        // Phase 2: Title
        const titleTimer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(titleOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
                Animated.timing(titleTranslateY, { toValue: 0, duration: 500, useNativeDriver: true }),
            ]).start();
        }, 600);

        // Phase 2b: Subtitle
        const subtitleTimer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(subtitleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
                Animated.timing(subtitleTranslateY, { toValue: 0, duration: 400, useNativeDriver: true }),
            ]).start();
        }, 900);

        // Phase 3: Decorative dots float up
        const dotsTimer = setTimeout(() => {
            Animated.stagger(150, [
                Animated.parallel([
                    Animated.timing(dot1Opacity, { toValue: 0.6, duration: 500, useNativeDriver: true }),
                    Animated.timing(dot1Position, { toValue: -20, duration: 1500, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(dot2Opacity, { toValue: 0.4, duration: 500, useNativeDriver: true }),
                    Animated.timing(dot2Position, { toValue: -30, duration: 1500, useNativeDriver: true }),
                ]),
                Animated.parallel([
                    Animated.timing(dot3Opacity, { toValue: 0.5, duration: 500, useNativeDriver: true }),
                    Animated.timing(dot3Position, { toValue: -25, duration: 1500, useNativeDriver: true }),
                ]),
            ]).start();
        }, 400);

        // Phase 4: Bottom text
        const bottomTimer = setTimeout(() => {
            Animated.timing(bottomOpacity, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        }, 1200);

        // Phase 5: Fade out and navigate
        const fadeTimer = setTimeout(() => {
            Animated.timing(fadeOut, { toValue: 0, duration: 400, useNativeDriver: true }).start(() => {

                onFinish();


            });
        }, 2800);

        return () => {
            clearTimeout(titleTimer);
            clearTimeout(subtitleTimer);
            clearTimeout(dotsTimer);
            clearTimeout(bottomTimer);
            clearTimeout(fadeTimer);
        };
    }, []);

    return {
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

    };

}