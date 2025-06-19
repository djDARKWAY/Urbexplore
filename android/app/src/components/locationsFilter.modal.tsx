import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
    
    useEffect(() => {
        if (!visible) return;
        fetch('http://192.168.1.85:3001/locations/categories')
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
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Ionicons name="close" size={24} color="#222" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Filtros</Text>
                    <Text style={styles.subtitle}>Categoria</Text>
                    <View style={styles.categoriesContainer}>
                        {categories.map((category, idx) => (
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
                    <View style={styles.actionButtonsRow}>
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleReset}
                        >
                            <Text style={styles.clearButtonText}>Limpar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.applyButton}
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
