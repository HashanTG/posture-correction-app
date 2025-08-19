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
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff", // White background for the content area
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
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
    width: width * 0.8, // Image takes 80% of screen width
    height: width * 0.8, // Keep aspect ratio
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default OnboardingItem;
