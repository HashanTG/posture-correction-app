import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";

const { width } = Dimensions.get("window"); // Get screen width for responsive sizing

interface OnboardingItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType; // Use ImageSourcePropType for both local require() and URI
    buttonText?: string;
  };
}

const OnboardingItem: React.FC<OnboardingItemProps> = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.id === "1" ? (
        // Special layout for the 'Welcome Screen - 1'
        <>
          <Image
            source={item.image} // Use source directly
            style={styles.logo}
            accessibilityLabel="LiftIQ Logo"
          />
          <Text style={styles.welcomeTitle}>{item.title}</Text>
          <Text style={styles.welcomeDescription}>{item.description}</Text>
        </>
      ) : (
        // Layout for other onboarding screens
        <>
          <Image
            source={item.image} // Use source directly
            style={styles.image}
            accessibilityLabel={`Onboarding Image for ${item.title}`}
          />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width, // Each slide takes full screen width
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Align content to top instead of center
    padding: 20,
    paddingTop: 0, // Remove top padding to align to very top
    backgroundColor: "#fff", // White background for the content area
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    marginTop: 220, // Add some space above the logo
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  welcomeDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 1, // Image takes 95% of screen width (increased from 80%)
    height: width * 1.09, // Keep the same height ratio
    resizeMode: "contain",
    marginTop: 0, // Zero top margin to align to top
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
    marginTop: 115, // Add some space above the title
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default OnboardingItem;
