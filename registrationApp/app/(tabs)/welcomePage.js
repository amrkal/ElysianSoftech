import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message'; // Import Toast
import axiosInstance from '../../services/axiosInstance'; // Ensure axiosInstance is imported

const WelcomePage = () => {
  const [error, setError] = useState('');

  // Fetch random message and show toast
  const fetchRandomMessage = async () => {
    try {
      // Fetch random message from Node.js server
      const randomMessageResponse = await axiosInstance.get('http://192.168.0.178:5001/random-message');
      const randomMessage = randomMessageResponse.data.message;

      // Show toast message with the random content from the Node.js server
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Welcome!',
        text2: randomMessage,
      });

    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
      console.error('Error fetching random message:', error);
    }
  };

  useEffect(() => {
    fetchRandomMessage();  // Fetch message when page loads
  }, []);  // Empty dependency array means it will only run once when the page loads

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.title}>Welcome!</Text>
      <Text style={GlobalStyles.message}>
        You have successfully registered. Start exploring the app now.
      </Text>

      {/* Go to Home or Login */}
      <TouchableOpacity
        style={GlobalStyles.loginButton}
        onPress={() => router.push('LoginPage')}>
        <Text style={GlobalStyles.loginButtonText}>Go to Login</Text>
      </TouchableOpacity>

      {/* Make sure Toast is displayed at the bottom */}
      <Toast />
    </View>
  );
};

export default WelcomePage;
