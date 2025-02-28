
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const DropDown = ({ items, initialValue, onChange }) => {
  const [selectedVal, setSelectedVal] = useState(initialValue);

  useEffect(() => {
    setSelectedVal(initialValue);
  }, [initialValue]);

  const handleValueChange = (value) => {
    setSelectedVal(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View >
      <Picker
        selectedValue={selectedVal}
        onValueChange={handleValueChange}
        style={styles.picker}
      >
        <Picker.Item label="Select" value={null} color="#808080" />
        {Object.entries(items).map(([value, label], index) => (
          <Picker.Item
            key={index}
            label={label}
            value={value}
            color="black"
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    
    width: '100%',
    fontSize: 14,
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default DropDown;
