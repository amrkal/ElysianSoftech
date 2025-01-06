import { Stack } from 'expo-router';

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen name="loginPage" options={{ title: 'Log In', headerShown: false }} />
      <Stack.Screen name="registerPage" options={{ title: 'Register' }} />
      <Stack.Screen name="forgotPasswordPage" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="welcomePage" options={{ title: 'Welcome' }} />
    </Stack>
  );
}
