import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { loginWithEmail } from "../../utils/auth";
import { testFirebaseConnection } from "../../utils/testAuth";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    // Debug Firebase connection
    console.log("🔍 Testing Firebase connection...");
    testFirebaseConnection();

    try {
      console.log("🔑 Attempting login with:", email);
      const result = await loginWithEmail(email, password);
      console.log("✅ Login successful:", result);

      // Navigate directly to welcome screen instead of showing alert
      router.replace("/welcome");
    } catch (err: any) {
      console.log("❌ Login error:", err);
      console.log("Error code:", err.code);
      console.log("Error message:", err.message);

      let errorMessage = "Unable to login";
      let errorTitle = "Login Failed";

      switch (err.code) {
        case "auth/invalid-credential":
          errorTitle = "Invalid Credentials";
          errorMessage =
            "The email or password is incorrect. Please check your credentials or register if you haven't created an account yet.";
          break;
        case "auth/user-not-found":
          errorTitle = "Account Not Found";
          errorMessage =
            "No account found with this email. Please register first or check your email address.";
          break;
        case "auth/wrong-password":
          errorTitle = "Wrong Password";
          errorMessage = "The password is incorrect. Please try again.";
          break;
        case "auth/invalid-email":
          errorTitle = "Invalid Email";
          errorMessage = "Please enter a valid email address.";
          break;
        case "auth/user-disabled":
          errorTitle = "Account Disabled";
          errorMessage =
            "This account has been disabled. Please contact support.";
          break;
        case "auth/too-many-requests":
          errorTitle = "Too Many Attempts";
          errorMessage =
            "Too many failed login attempts. Please try again later.";
          break;
        default:
          errorMessage = err?.message || "An unexpected error occurred";
          break;
      }

      Alert.alert(errorTitle, errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Main Content */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.greeting}>Hey there,</Text>
          <Text style={styles.title}>Welcome Back</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <View style={styles.gradientButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </View>
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#808080", // Gray background
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  titleContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  greeting: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 20,
    height: 55,
  },
  inputIcon: {
    marginRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeIcon: {
    padding: 5,
  },
  loginButton: {
    marginBottom: 30,
  },
  gradientButton: {
    height: 55,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9C3EE8", // Solid purple background
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  registerText: {
    fontSize: 14,
    color: "#666",
  },
  registerLink: {
    fontSize: 14,
    color: "#9C3EE8",
    fontWeight: "600",
  },
});
