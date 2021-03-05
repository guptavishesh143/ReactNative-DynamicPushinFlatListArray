import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Alert,
  Modal,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const [question, setquestion] = useState('');

  const [initialElements, changeEl] = useState([]);

  const [exampleState, setExampleState] = useState(initialElements);
  const [idx, incr] = useState(1);

  const [modalVisible, setModalVisible] = useState(false);

  function NoMore() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const addElement = () => {
    if (idx > 0 && idx <= 4) {
      var newArray = [
        ...initialElements,
        { id: idx, text: question + (idx + 1) },
      ];
      incr(idx + 1);
      console.log(initialElements.length);
      setExampleState(newArray);
      changeEl(newArray);
      console.log(newArray);
    } else {
      // setExampleState(null);
      NoMore(setModalVisible(!modalVisible));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={exampleState}
        renderItem={(item) => <Text>{item.item.text}</Text>}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Question) => setquestion(Question)}
                placeholder="Enter Question"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="String"
                underlineColorAndroid="#f000"
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <View style={{ paddingVertical: 20 }}>
        <Button title="Add element" onPress={addElement} />
      </View>
      <View>
        <Button title="Post Question" onPress={addElement} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 1,
    padding: 100,
  },
});
