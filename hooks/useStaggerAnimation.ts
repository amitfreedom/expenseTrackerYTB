import { useEffect, useRef } from "react";
import { Animated, InteractionManager } from "react-native";

interface StaggerConfig {
    /** Number of animated elements */
    count: number;
    /** Delay between each element's animation start (ms). Default: 120 */
    stagger?: number;
    /** Whether to wait for InteractionManager before animating. Default: true */
    waitForInteraction?: boolean;
}

interface AnimValues {
    opacity: Animated.Value;
    translateY: Animated.Value;
    scale: Animated.Value;
}

export const useStaggerAnimation = ({ count, stagger = 120, waitForInteraction = true }: StaggerConfig): AnimValues[] => {

    const values = useRef<AnimValues[]>(
        Array.from({ length: count }, () => ({
            opacity: new Animated.Value(0),
            translateY: new Animated.Value(25),
            scale: new Animated.Value(0.95),
        }))
    ).current;

    useEffect(() => {
        const animate = () => {
            values.forEach((v, i) => {
                setTimeout(() => {
                    Animated.parallel([
                        Animated.timing(v.opacity, {
                            toValue: 1,
                            duration: 350,
                            useNativeDriver: true,
                        }),
                        Animated.spring(v.translateY, {
                            toValue: 0,
                            friction: 6,
                            tension: 40,
                            useNativeDriver: true,
                        }),
                        Animated.spring(v.scale, {
                            toValue: 1,
                            friction: 5,
                            tension: 50,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, i * stagger);
            });
        };

        if (waitForInteraction) {
            const handle = InteractionManager.runAfterInteractions(animate);
            return () => handle.cancel();
        } else {
            animate();
        }
    }, []);

    return values;

}