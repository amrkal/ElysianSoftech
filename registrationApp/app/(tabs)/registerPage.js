import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import axiosInstance from '../../services/axiosInstance';
import GlobalStyles from '../../styles/GlobalStyles';
import Toast from 'react-native-toast-message'; // Import Toast
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!name || !surname || !phone || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    
    const userData = {
      name,
      surname,
      phone,
      email,
      password,
    };

    try {
      const response = await axiosInstance.post('/users/create', userData);
      console.log('Register successful:', response.data);
      router.push('WelcomePage'); // Navigate to WelcomePage

      // Fetch random message from Node.js server
      const randomMessageResponse = await axiosInstance.get('http://localhost:5001/random-message');
      const randomMessage = randomMessageResponse.data.message;

      // Show toast message with the random content from OpenAI
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Welcome!',
        text2: randomMessage,
      });

    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.error('Registration failed:', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={GlobalStyles.container}>
          {/* Logo */}
          <View style={GlobalStyles.logoContainer}>
            <Image source={require('../../assets/images/Logo.png')} style={GlobalStyles.logo} />
          </View>
          <Text style={GlobalStyles.title}>Register</Text>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Name and Surname in Same Row */}
          <View style={GlobalStyles.rowContainer}>
            <View style={[GlobalStyles.inputContainer, GlobalStyles.halfWidth]}>
              <Icon name="account-outline" size={20} color="#888" style={GlobalStyles.icon} />
              <TextInput
                style={GlobalStyles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={[GlobalStyles.inputContainer, GlobalStyles.halfWidth]}>
              <Icon name="account-outline" size={20} color="#888" style={GlobalStyles.icon} />
              <TextInput
                style={GlobalStyles.input}
                placeholder="Surname"
                value={surname}
                onChangeText={setSurname}
              />
            </View>
          </View>

          {/* Phone Number Input */}
          <View style={GlobalStyles.inputContainer}>
            <Icon name="phone-outline" size={20} color="#888" style={GlobalStyles.icon} />
            <TextInput
              style={GlobalStyles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Email Input */}
          <View style={GlobalStyles.inputContainer}>
            <Icon name="email-outline" size={20} color="#888" style={GlobalStyles.icon} />
            <TextInput
              style={GlobalStyles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={GlobalStyles.inputContainer}>
            <Icon name="lock-outline" size={20} color="#888" style={GlobalStyles.icon} />
            <TextInput
              style={GlobalStyles.input}
              placeholder="Password"
              value={password}
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={GlobalStyles.inputContainer}>
            <Icon name="lock-outline" size={20} color="#888" style={GlobalStyles.icon} />
            <TextInput
              style={GlobalStyles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
            />
          </View>

          {/* Register Button */}
          <TouchableOpacity style={GlobalStyles.loginButton} onPress={handleRegister}>
            <Text style={GlobalStyles.loginButtonText}>Register</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default RegistrationPage;
