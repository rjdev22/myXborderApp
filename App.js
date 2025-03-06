import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React, { useEffect } from 'react';
import AppNavigtion from './android/app/src/Navigation/AppNavigation';
import Layout from './android/app/src/Components/Common/Layout';
import { AuthProvider } from './android/app/src/Context/authContext';

export default function App() {

  return (
    <AuthProvider>
      <AppNavigtion />
    </AuthProvider >
  );
}
