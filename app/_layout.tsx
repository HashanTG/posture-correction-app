import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/*
        This determines the initial screen.
        If you have persistent onboarding enabled, change this to:
        <Stack.Screen name={onboardingComplete ? "(tabs)" : "onboarding/index"} />
        And make sure your "(tabs)" _layout.tsx is correctly set up for your main app flow.
      */}
        <Stack.Screen name="onboarding/index" />
        <Stack.Screen
          name="register/index"
          options={{ presentation: "modal" }}
        />
        {/* Your existing tabs layout, ensuring it's accessible after registration */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* This is an example of a 404 screen, automatically handled by Expo Router */}
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
