import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { usePlantData } from '../context/PlantDataContext';
import { useState } from 'react';



export const getdata = (data)=>{
  return data
}



export default function PlantPDF() {

  const {data} = getdata()

  // Styles for the PDF
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    plantTypeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    plantName: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    plantDescription: {
      fontSize: 12,
      marginBottom: 10,
    },
  });

  // Ensure `data` is valid before rendering
  if (!data || !data.plants) {
    return (
      <Document>
        <Page>
          <Text>No plant data available.</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.body}>
        {/* Herbs */}
        <Text style={styles.plantTypeTitle}>Herbs</Text>
        {data.plants.herbs_and_shrubs.map((herb, index) => (
          <View key={index}>
            <Text style={styles.plantName}>
              {index + 1}. {herb.name} ({herb.scientific_name})
            </Text>
            <Text style={styles.plantDescription}>* {herb.description}</Text>
          </View>
        ))}

        {/* Trees */}
        <Text style={styles.plantTypeTitle}>Trees</Text>
        {data.plants.trees.map((tree, index) => (
          <View key={index}>
            <Text style={styles.plantName}>
              {index + 1}. {tree.name} ({tree.scientific_name})
            </Text>
            <Text style={styles.plantDescription}>* {tree.description}</Text>
          </View>
        ))}

        {/* Flowers */}
        <Text style={styles.plantTypeTitle}>Flowers</Text>
        {data.plants.flowers.map((flower, index) => (
          <View key={index}>
            <Text style={styles.plantName}>
              {index + 1}. {flower.name} ({flower.scientific_name})
            </Text>
            <Text style={styles.plantDescription}>* {flower.description}</Text>
          </View>
        ))}

        {/* Fruits and Vegetables */}
        <Text style={styles.plantTypeTitle}>Fruits</Text>
        {data.plants.fruits.map((fruit, index) => (
          <View key={index}>
            <Text style={styles.plantName}>
              {index + 1}. {fruit.name} ({fruit.scientific_name})
            </Text>
            <Text style={styles.plantDescription}>* {fruit.description}</Text>
          </View>
        ))}

        <Text style={styles.plantTypeTitle}>Vegetables</Text>
        {data.plants.vegetables.map((veggie, index) => (
          <View key={index}>
            <Text style={styles.plantName}>
              {index + 1}. {veggie.name} ({veggie.scientific_name})
            </Text>
            <Text style={styles.plantDescription}>* {veggie.description}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
