import { StyleSheet } from 'react-native';
import { palette } from '../../palette';

export const markerStyles = StyleSheet.create({
    container: {
        width: 30,
        height: 30,
        backgroundColor: palette.background,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        color: 'white',
        fontSize: 24
    }
});

export const getMarkerIcon = (category: string) => {
    switch (category) {
        case 'Sanatório':
            return 'hospital';
    }
};
