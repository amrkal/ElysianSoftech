import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet, 
  Image,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import GlobalStyles from '../../styles/GlobalStyles';
import axiosInstance from '../../services/axiosInstance'; // Make sure your axios instance is correctly set

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle sending the reset email to the backend
  const handleSendEmail = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError(''); // Clear previous error
    setLoading(true);

    try {
      // Make the API call to the backend for password reset
      const response = await axiosInstance.post('/users/forgot-password', { email });
      
      setLoading(false);
      alert(`A password reset link has been sent to ${email}.`);
      router.push('LoginPage'); // Navigate back to the LoginPage after successful reset request
    } catch (error) {
      setLoading(false);
      console.error('Error occurred:', error);
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <View style={GlobalStyles.container}>
          {/* Logo */}
          <View style={GlobalStyles.logoContainer}>
            <Image
              source={require('../../assets/images/Logo.png')}
              style={GlobalStyles.logo}
            />
          </View>
          <Text style={GlobalStyles.title}>Forgot Password</Text>

          {/* Email Input */}
          <View style={GlobalStyles.inputContainer}>
            <Icon name="email-outline" size={20} color="#888" style={GlobalStyles.icon} />
            <TextInput
              style={GlobalStyles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(''); // Clear error when user types
              }}
              keyboardType="email-address"
            />
          </View>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Send Email Button */}
          <TouchableOpacity
            style={GlobalStyles.loginButton}
            onPress={handleSendEmail}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={GlobalStyles.loginButtonText}>Send Reset Link</Text>
            )}
          </TouchableOpacity>

          {/* Go Back to Login */}
          <View style={GlobalStyles.registerContainer}>
            <Text style={GlobalStyles.registerText}>Remembered your password?</Text>
            <TouchableOpacity onPress={() => router.push('LoginPage')}>
              <Text style={GlobalStyles.registerLink}> Log in</Text>
            </TouchableOpacity>
          </View>
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

export default ForgotPasswordPage;
