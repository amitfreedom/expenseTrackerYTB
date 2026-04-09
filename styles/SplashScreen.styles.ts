import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

const { height, width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
    },
    // Layered background for gradient effect
    bgLayer1: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#1B5E20',
    },
    bgLayer2: {
        position: 'absolute',
        top: -height * 0.2,
        left: -width * 0.3,
        width: width * 1.6,
        height: height * 0.7,
        borderRadius: height * 0.35,
        backgroundColor: 'rgba(46, 125, 50, 0.8)',
        transform: [{ rotate: '-15deg' }],
    },
    bgLayer3: {
        position: 'absolute',
        bottom: -height * 0.15,
        right: -width * 0.2,
        width: width * 1.2,
        height: height * 0.5,
        borderRadius: height * 0.25,
        backgroundColor: 'rgba(27, 94, 32, 0.6)',
        transform: [{ rotate: '10deg' }],
    },
    // Decorative dots
    dot: {
        position: 'absolute',
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    dot1: {
        width: 12,
        height: 12,
        top: height * 0.25,
        left: width * 0.15,
    },
    dot2: {
        width: 8,
        height: 8,
        top: height * 0.35,
        right: width * 0.12,
    },
    dot3: {
        width: 16,
        height: 16,
        bottom: height * 0.3,
        left: width * 0.7,
    },
    // Rings
    ring: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    ring2: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    // Logo
    logoContainer: {
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoCircle: {
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2.5,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 12,
    },

    // Text
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: 1.5,
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.75)',
        letterSpacing: 2,
        fontWeight: '300',
        textTransform: 'uppercase',
    },
    // Bottom
    bottomContainer: {
        position: 'absolute',
        bottom: 60,
        alignItems: 'center',
    },
    dividerLine: {
        width: 40,
        height: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 16,
        borderRadius: 1,
    },
    bottomText: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.5)',
        letterSpacing: 3,
        fontWeight: '500',
    },
})