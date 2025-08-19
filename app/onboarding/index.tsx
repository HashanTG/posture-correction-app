import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import OnboardingItem from "../components/OnboardingItem"; // Path relative to app/onboarding/
import { slides } from "../constants/onboardingData"; // Path relative to app/onboarding/
import { useRouter } from "expo-router"; // For navigation with Expo Router
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Uncomment for persistent onboarding

const { width } = Dimensions.get("window"); // Get screen width for responsive layout

const OnboardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current; // For pagination animation
  const slidesRef = useRef<FlatList>(null); // Reference to FlatList for scrolling
  const router = useRouter(); // Expo Router instance

  // Callback for FlatList to update current index when viewable items change
  const viewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      if (viewableItems[0] && viewableItems[0].index !== null) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  ).current;

  // Configuration for when items are considered viewable
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // Function to scroll to the next slide or navigate to register page
  const scrollToNext = async () => {
    // Made async for AsyncStorage if used
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Last slide, navigate to registration
      // if (AsyncStorage) { // Use this block if you want persistent onboarding
      //   await AsyncStorage.setItem('onboardingComplete', 'true');
      // }
      router.replace("/register"); // Use replace to clear onboarding from navigation history
    }
  };

  // Handler for the 'Get Started' button on the first screen
  const handleGetStarted = async () => {
    // Made async for AsyncStorage if used
    // if (AsyncStorage) { // Use this block if you want persistent onboarding
    //   await AsyncStorage.setItem('onboardingComplete', 'true');
    // }
    router.replace("/register"); // Navigate directly to registration
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slides}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        pagingEnabled // Enable swiping between screens
        showsHorizontalScrollIndicator={false}
        bounces={false} // Prevent overscrolling
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          // Animate scroll position for pagination dots
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false } // Set to true if possible for performance
        )}
        onViewableItemsChanged={viewableItemsChanged} // Update current index
        viewabilityConfig={viewConfig}
        ref={slidesRef} // Assign ref to FlatList
      />

      {/* Pagination dots */}
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          // Animate dot width based on scroll position
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10], // Grow current dot, shrink others
            extrapolate: "clamp", // Keep values within bounds
          });
          // Animate dot opacity based on scroll position
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3], // Highlight current dot
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={i.toString()}
            />
          );
        })}
      </View>

      {/* Conditional Buttons */}
      <View style={styles.buttonContainer}>
        {currentIndex === 0 ? (
          // 'Get Started' button for the first screen
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            accessibilityLabel="Get Started"
          >
            <Text style={styles.buttonText}>{slides[0].buttonText}</Text>
          </TouchableOpacity>
        ) : (
          // 'Next' button for subsequent screens
          <TouchableOpacity
            style={styles.nextButton}
            onPress={scrollToNext}
            accessibilityLabel="Next Onboarding Screen"
          >
            <Text style={styles.nextButtonText}>›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee", // Background color to match your design
  },
  paginationContainer: {
    flexDirection: "row",
    height: 64,
    position: "absolute",
    bottom: 80, // Position above the button
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8b5cf6", // Purple color for active dot
    marginHorizontal: 8,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20, // Position at the bottom
    width: "100%",
    alignItems: "center",
  },
  getStartedButton: {
    backgroundColor: "#8b5cf6", // Purple color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: "80%", // Make button responsive
    alignItems: "center",
    shadowColor: "#000", // Add shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#8b5cf6", // Purple color for next button
    width: 60,
    height: 60,
    borderRadius: 30, // Circular button
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default OnboardingScreen;
