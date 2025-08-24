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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { registerWithEmail } from "../../utils/auth";

const { width, height } = Dimensions.get("window");

const RegisterScreen: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const router = useRouter();

  const handleRegister = async () => {
    if (!fullName || !phoneNumber || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (!acceptTerms) {
      Alert.alert("Error", "Please accept the Terms of Use and Privacy Policy");
      return;
    }
    try {
      console.log("📝 Attempting registration with:", email);
      const result = await registerWithEmail(email, password);
      console.log("✅ Registration successful:", result);

      // Show success popup and redirect to login
      Alert.alert(
        "Success!",
        "You are successfully registered! Please login to continue.",
        [
          {
            text: "Login Now",
            onPress: () => router.replace("/login"),
          },
        ]
      );
    } catch (error: any) {
      console.log("❌ Registration error:", error);
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);

      const message = (error && error.message) || "Registration failed";
      Alert.alert("Error", `Registration failed: ${message}`);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert("Social Login", `${provider} login coming soon!`);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Main Content */}
      <View style={styles.formContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.greeting}>Hey there,</Text>
          <Text style={styles.title}>Create an Account</Text>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#999"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#999"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>

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

        {/* Terms and Conditions */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAcceptTerms(!acceptTerms)}
        >
          <View
            style={[styles.checkbox, acceptTerms && styles.checkboxChecked]}
          >
            {acceptTerms && (
              <Ionicons name="checkmark" size={16} color="#fff" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            By continuing you accept our{" "}
            <Text style={styles.linkText}>Privacy Policy</Text> and{" "}
            <Text style={styles.linkText}>Terms of Use</Text>
          </Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <View style={styles.gradientButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </View>
        </TouchableOpacity>

        {/* Or Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Login Buttons */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Google")}
          >
            <Text style={styles.socialButtonText}>G</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin("Facebook")}
          >
            <Text style={styles.socialButtonText}>f</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingHorizontal: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#9C3EE8",
    borderColor: "#9C3EE8",
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  linkText: {
    color: "#9C3EE8",
    fontWeight: "500",
  },
  registerButton: {
    marginBottom: 30,
  },
  gradientButton: {
    height: 55,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9C3EE8", // Solid purple background
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 20,
    fontSize: 14,
    color: "#666",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    gap: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  socialButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  loginText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    fontSize: 14,
    color: "#9C3EE8",
    fontWeight: "600",
  },
});

export default RegisterScreen;
