import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import styles from '../styles/layout/locationsFilter/locationsFilter.styles';

type FilterModalProps = {
    visible: boolean;
    onClose: () => void;
    onApply: () => void;
    onReset: () => void;
    selectedCategories: string[];
    onSelectCategory: (category: string) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({ visible, onClose, onApply, onReset, selectedCategories, onSelectCategory }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const { backgroundColor } = useTheme();

    useEffect(() => {
        if (!visible) return;
        fetch('http://192.168.1.92:3001/locations/categories')
            .then(res => res.json())
            .then(data => {
                if (data.categories) {
                    const sorted = data.categories.map((c: any) => String(c)).sort((a: string, b: string) => a.localeCompare(b, 'pt'));
                    setCategories(sorted);
                }
            })
            .catch(() => setCategories([]));
    }, [visible]);

    const handleApply = () => {
        onApply();
    };

    const handleReset = () => {
        onReset();
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={[styles.modalContainer, { backgroundColor: "rgba(0,0,0,0.69)" }]}>
                {/* Background dinâmico */}
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Filtros</Text>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.subtitle}>Categoria</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View>
                                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                                    {categories.slice(0, Math.ceil(categories.length / 2)).map((category, idx) => (
                                        <TouchableOpacity
                                            key={category}
                                            style={[
                                                styles.categoryButton,
                                                selectedCategories.includes(category) && styles.categoryButtonSelected,
                                            ]}
                                            onPress={() => onSelectCategory(category)}
                                        >
                                            <Text style={[
                                                styles.categoryButtonText,
                                                selectedCategories.includes(category) && styles.categoryButtonTextSelected,
                                            ]}>{category}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    {categories.slice(Math.ceil(categories.length / 2)).map((category, idx) => (
                                        <TouchableOpacity
                                            key={category}
                                            style={[
                                                styles.categoryButton,
                                                selectedCategories.includes(category) && styles.categoryButtonSelected,
                                            ]}
                                            onPress={() => onSelectCategory(category)}
                                        >
                                            <Text style={[
                                                styles.categoryButtonText,
                                                selectedCategories.includes(category) && styles.categoryButtonTextSelected,
                                            ]}>{category}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleReset}
                        >
                            <Text style={styles.clearButtonText}>Limpar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.applyButton, { backgroundColor }]}
                            onPress={handleApply}
                        >
                            <Text style={styles.applyButtonText}>Aplicar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FilterModal;
