import useKeyboard from '@rnhooks/keyboard';
import React, {useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  Keyboard,
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
  const maxDeviceFrame = useRef(frame.height);
  const [visibleWillShow] = useKeyboard({
    useWillHide: true,
    useWillShow: true,
  });
  const [visible] = useKeyboard();
  if (frame.height > maxDeviceFrame.current) {
    maxDeviceFrame.current = frame.height;
  }
  const screen = Dimensions.get('screen');
  const window = Dimensions.get('window');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <>
      <ScrollView bounces={false}>
        <SafeAreaView>
          <Button title="Show modal" onPress={toggleModal} />

          <TextInput />
          <Text>
            {JSON.stringify(
              {
                maxDeviceFrame: maxDeviceFrame.current,
                visible,
                visibleWillShow,
                metrics: Keyboard.metrics() ?? null,
                dimensions,
                frame,
                insets,
                window,
                screen,
                initialWindowMetrics,
              },
              null,
              2,
            )}
          </Text>
        </SafeAreaView>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 60,
            backgroundColor: 'red',
            height: maxDeviceFrame.current,
            width: 10,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 1,
            right: 60,
            backgroundColor: 'green',
            height: maxDeviceFrame.current - 2,
            width: 10,
          }}
        />
      </ScrollView>
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
            height: maxDeviceFrame.current,
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

          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 80,
              backgroundColor: 'red',
              height: maxDeviceFrame.current,
              width: 10,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 1,
              right: 80,
              backgroundColor: 'green',
              height: maxDeviceFrame.current - 2,
              width: 10,
            }}
          />
        </ScrollView>
      </Modal>
    </>
  );
}

export default () => (
  <SafeAreaProvider>
    <ModalTester />
  </SafeAreaProvider>
);
