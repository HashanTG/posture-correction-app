import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Stack, useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGoToHome = () => {
    console.log("🏠 Go To Home button pressed");
    try {
      console.log("🔄 Navigating to tabs...");
      // Try push instead of replace
      router.push("/(tabs)");
      console.log("✅ Navigation completed");
    } catch (error) {
      console.log("❌ Navigation error:", error);
      // Fallback - try with any casting
      try {
        router.replace("/(tabs)" as any);
        console.log("✅ Fallback navigation completed");
      } catch (fallbackError) {
        console.log("❌ Fallback navigation also failed:", fallbackError);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Illustration Container */}
        <View style={styles.illustrationContainer}>
          {/* Main Purple Background Shape */}
          <View style={styles.purpleBackground} />

          {/* Fitness Characters */}
          <View style={styles.charactersContainer}>
            {/* Male Character */}
            <View style={styles.maleCharacter}>
              <View style={styles.maleHead}>
                <View style={styles.maleHair} />
              </View>
              <View style={styles.maleBody} />
              <View style={styles.maleShorts} />
              <View style={styles.maleLegs} />
              <View style={styles.maleShoes} />
            </View>

            {/* Female Character */}
            <View style={styles.femaleCharacter}>
              <View style={styles.femaleHead}>
                <View style={styles.femaleHair} />
              </View>
              <View style={styles.femaleTop} />
              <View style={styles.femaleLeggings} />
              <View style={styles.femaleShoes} />
            </View>
          </View>

          {/* Decorative Purple Elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
          <View style={styles.decorativeCircle3} />
          <View style={styles.decorativeOval} />
        </View>

        {/* Welcome Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome</Text>
          <Text style={styles.subtitle}>
            You are all set now, let's reach your{"\n"}goals together with us
          </Text>
        </View>

        {/* Go To Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleGoToHome}
          onPressIn={() => console.log("🔽 Button press started")}
          onPressOut={() => console.log("🔼 Button press ended")}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>Go To Home</Text>
        </TouchableOpacity>

        {/* Test Button for debugging */}
        <TouchableOpacity
          style={[
            styles.homeButton,
            { backgroundColor: "#FF6B35", marginTop: 20 },
          ]}
          onPress={() => {
            console.log("🧪 Test button pressed");
            alert("Test button works!");
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.homeButtonText}>Test Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  illustrationContainer: {
    width: width * 0.8,
    height: height * 0.45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    position: "relative",
  },
  purpleBackground: {
    position: "absolute",
    width: "90%",
    height: "80%",
    backgroundColor: "#B968C7",
    borderRadius: 80,
    transform: [{ rotate: "-10deg" }],
  },
  charactersContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 25,
    zIndex: 2,
    marginTop: 20,
  },
  // Male Character Styles
  maleCharacter: {
    alignItems: "center",
    zIndex: 3,
  },
  maleHead: {
    width: 50,
    height: 50,
    backgroundColor: "#FDBCB4",
    borderRadius: 25,
    marginBottom: 8,
    position: "relative",
  },
  maleHair: {
    position: "absolute",
    top: -5,
    left: 10,
    width: 30,
    height: 25,
    backgroundColor: "#8B4513",
    borderRadius: 15,
  },
  maleBody: {
    width: 65,
    height: 80,
    backgroundColor: "#FF6B35",
    borderRadius: 18,
    marginBottom: 8,
  },
  maleShorts: {
    width: 55,
    height: 40,
    backgroundColor: "#2C2C54",
    borderRadius: 12,
    marginBottom: 8,
  },
  maleLegs: {
    width: 50,
    height: 60,
    backgroundColor: "#FDBCB4",
    borderRadius: 12,
    marginBottom: 5,
  },
  maleShoes: {
    width: 45,
    height: 15,
    backgroundColor: "#2C2C54",
    borderRadius: 8,
  },
  // Female Character Styles
  femaleCharacter: {
    alignItems: "center",
    zIndex: 3,
  },
  femaleHead: {
    width: 45,
    height: 45,
    backgroundColor: "#FDBCB4",
    borderRadius: 22.5,
    marginBottom: 8,
    position: "relative",
  },
  femaleHair: {
    position: "absolute",
    top: -8,
    left: 5,
    width: 35,
    height: 30,
    backgroundColor: "#D2691E",
    borderRadius: 18,
  },
  femaleTop: {
    width: 50,
    height: 40,
    backgroundColor: "#FF6B35",
    borderRadius: 12,
    marginBottom: 8,
  },
  femaleLeggings: {
    width: 45,
    height: 90,
    backgroundColor: "#FF6B35",
    borderRadius: 15,
    marginBottom: 5,
  },
  femaleShoes: {
    width: 40,
    height: 12,
    backgroundColor: "#2C2C54",
    borderRadius: 6,
  },
  // Decorative Elements
  decorativeCircle1: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#E084F7",
    borderRadius: 25,
    top: 25,
    right: 15,
    opacity: 0.8,
  },
  decorativeCircle2: {
    position: "absolute",
    width: 35,
    height: 35,
    backgroundColor: "#D674E8",
    borderRadius: 17.5,
    bottom: 40,
    left: 20,
    opacity: 0.7,
  },
  decorativeCircle3: {
    position: "absolute",
    width: 25,
    height: 25,
    backgroundColor: "#C464D9",
    borderRadius: 12.5,
    top: 80,
    right: 60,
    opacity: 0.6,
  },
  decorativeOval: {
    position: "absolute",
    width: 70,
    height: 40,
    backgroundColor: "#B968C7",
    borderRadius: 35,
    top: 15,
    left: 25,
    opacity: 0.5,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  homeButton: {
    width: width * 0.8,
    height: 55,
    backgroundColor: "#9C3EE8",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#9C3EE8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    zIndex: 10,
    position: "relative",
  },
  homeButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
