import useKeyboard from '@rnhooks/keyboard';
import React, {useState} from 'react';
import {
  Button,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  SafeAreaProvider,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const [visible] = useKeyboard();
  const debug = {
    dimensions,
    insets,
    frame,
    keyboard: visible,
    OS: Platform.OS,
  };
  console.log('debug:', debug);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal
        isVisible={isModalVisible}
        style={{margin: 0, backgroundColor: 'white'}}
        coverScreen
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard>
        <ScrollView style={{paddingTop: insets.top}} bounces={false}>
          <Text>top!</Text>
          <View style={{height: dimensions.height / 2}} />

          <Button title="Hide modal" onPress={toggleModal} />
          <View style={{height: 20}} />
          <TextInput
            multiline
            style={{borderColor: 'black', borderWidth: 1, height: 100}}
          />
          <View style={{flex: 1}} />
          <Button title="Hide modal" onPress={toggleModal} />
          <View style={{height: 20}} />
        </ScrollView>
      </Modal>
    </View>
  );
}

export default () => (
  <SafeAreaProvider>
    <ModalTester />
  </SafeAreaProvider>
);
