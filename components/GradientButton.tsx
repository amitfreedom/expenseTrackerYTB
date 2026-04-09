import React from 'react';
import {
    TouchableOpacity,
    View,
    StyleSheet,
    ViewStyle,
    ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

interface GradientButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    /** Icon shown to the right inside a white circle. e.g. 'arrow-right', 'check' */
    trailingIcon?: string;
    /** Icon shown to the left of the text when not loading */
    leadingIcon?: string;
    style?: ViewStyle;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    onPress,
    loading = false,
    loadingText,
    disabled = false,
    trailingIcon,
    leadingIcon,
    style,
}) => (
    <TouchableOpacity
        style={[styles.button, (loading || disabled) && styles.disabled, style]}
        onPress={onPress}
        disabled={loading || disabled}
        activeOpacity={0.85}
    >
        <View style={styles.inner}>
            {loading ? (
                <View style={styles.row}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.text}>  {loadingText || 'Loading...'}</Text>
                </View>
            ) : (
                <View style={styles.row}>
                    {leadingIcon && (
                        <MaterialCommunityIcons
                            name={leadingIcon as any}
                            size={22}
                            color="#fff"
                            style={{ marginRight: 6 }}
                        />
                    )}
                    <Text style={styles.text}>{title}</Text>
                    {trailingIcon && (
                        <View style={styles.arrow}>
                            <MaterialCommunityIcons
                                name={trailingIcon as any}
                                size={20}
                                color={colors.primary}
                            />
                        </View>
                    )}
                </View>
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    disabled: {
        opacity: 0.7,
    },
    inner: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    arrow: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
});
