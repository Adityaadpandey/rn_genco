import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import React from 'react';

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            style={[styles.button, containerStyles]} 
            disabled={isLoading}
        >
            <Text style={[styles.text, textStyles]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4CAF50', 
        borderRadius: 10, 
        minHeight: 62, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16, 
    },
    text: {
        color: '#FFFFFF', 
        fontSize: 18, 
        fontWeight: '600', 
    },
});

export default CustomButton;
