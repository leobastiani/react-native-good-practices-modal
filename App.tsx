import useKeyboard from '@rnhooks/keyboard';
import React, {useState} from 'react';
import {
  Button,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import {
  SafeAreaProvider,
  SafeAreaView,
  initialWindowMetrics,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const screen = Dimensions.get('screen');
  const window = Dimensions.get('window');
  const [visible] = useKeyboard();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Button title="Show modal" onPress={toggleModal} />

      <TextInput />
      <Text>
        {JSON.stringify(
          {
            dimensions,
            frame,
            insets,
            window,
            screen,
            initialWindowMetrics,
            visible,
          },
          null,
          2,
        )}
      </Text>

      <Modal
        isVisible={isModalVisible}
        style={{margin: 0}}
        coverScreen
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        avoidKeyboard>
        <ScrollView
          contentContainerStyle={{
            paddingTop: insets.top,
            height: dimensions.height - frame.y,
            backgroundColor: 'white',
          }}
          bounces={false}>
          <Text>top!</Text>
          <View style={{flex: 1}} />

          <Button title="Hide modal" onPress={toggleModal} />
          <View style={{height: 20}} />
          <Text>Input 1</Text>
          <TextInput
            multiline
            style={{
              flex: 1,
              textAlignVertical: 'top',
              borderColor: 'black',
              borderWidth: 1,
              height: 100,
            }}
          />
          <View style={{flex: 1}} />
          <Text>Input 2</Text>
          <TextInput
            multiline
            style={{
              flex: 1,
              textAlignVertical: 'top',
              borderColor: 'black',
              borderWidth: 1,
              height: 100,
            }}
          />
          <View style={{height: 20}} />
          <Button title="Noop button" onPress={() => {}} />
          <Text>bottom!</Text>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}

export default () => (
  <SafeAreaProvider>
    <ModalTester />
  </SafeAreaProvider>
);
