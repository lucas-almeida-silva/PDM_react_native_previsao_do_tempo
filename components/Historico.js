//rafce
import React from 'react'
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, ListItem} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Historico = () => {
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: "center",
      alignItems: 'center',
      borderRadius: 10,
      borderColor: '#eee',
      borderWidth: 1,
      padding: 20,
      margin: 5, 
      marginLeft: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: 'bold'
  },
});

export default Historico