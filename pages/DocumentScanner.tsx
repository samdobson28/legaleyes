import React, {useState} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';

const DocumentScanner: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | undefined>();

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the camera');
          takePicture();
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      takePicture();
    }
  };

  const takePicture = async () => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        const source = response.assets[0].uri;
        setImageUri(source);
        uploadImageToServer(source);
      }
    });
  };

  const uploadImage = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0].uri) {
        const source = response.assets[0].uri;
        setImageUri(source);
        uploadImageToServer(source);
      }
    });
  };

  const uploadImageToServer = async (uri: string) => {
    const data = new FormData();
    data.append('file', {
      name: 'photo.jpg',
      type: 'image/jpeg',
      uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
    });

    try {
      const response = await fetch('http://localhost:3000/api/images/upload', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Check if the response is ok and if it is JSON before parsing it
      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`,
        );
      }
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError(
          "Oops, we haven't got JSON! Here's what we got instead: " +
            (await response.text()),
        );
      }

      const responseJson = await response.json(); // Parse the JSON in the response
      console.log('Upload successful', responseJson);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={styles.preview}>
          <Image source={{uri: imageUri}} style={styles.imagePreview} />
          <Button title="Upload another document" onPress={uploadImage} />
          <Button
            title="Take another picture"
            onPress={requestCameraPermission}
          />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={requestCameraPermission} />
          <Button title="Upload Image" onPress={uploadImage} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default DocumentScanner;
