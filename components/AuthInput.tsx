import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TextInput } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type Props = {
    label: string;
    value: string;
    onChangeText: (t: string) => void;
    icon: string;
    secureTextEntry?: boolean;
    onToggleSecure?: () => void;
    showToggle?: boolean;
    animStyle?: any;
    keyboardType?: any;
    autoCapitalize?: any;
};

export const AuthInput = ({
    label, value, onChangeText, icon, secureTextEntry, onToggleSecure, showToggle,
    animStyle, keyboardType, autoCapitalize,
}: Props) => (
    <Animated.View style={animStyle}>
        <View style={styles.inputWrapper}>
            <View style={styles.inputIconCircle}>
                <MaterialCommunityIcons name={icon as any} size={20} color={colors.primary} />
            </View>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                mode="outlined"
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                outlineStyle={styles.inputOutline}
                theme={{ colors: { primary: colors.primary, outline: '#E0E0E0' } }}
                left={<TextInput.Icon icon={() => <View style={{ width: 28 }} />} />}
                right={
                    showToggle ? (
                        <TextInput.Icon
                            icon={secureTextEntry ? 'eye-off' : 'eye'}
                            onPress={onToggleSecure}
                            color="#999"
                        />
                    ) : undefined
                }
            />
        </View>
    </Animated.View>
);

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 14,
        position: 'relative',
    },
    inputIconCircle: {
        position: 'absolute',
        left: 12,
        top: 18,
        zIndex: 10,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'rgba(46, 125, 50, 0.08)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        backgroundColor: '#FAFFFE',
        fontSize: 15,
    },
    inputOutline: {
        borderRadius: 16,
        borderWidth: 1.5,
    },
});
