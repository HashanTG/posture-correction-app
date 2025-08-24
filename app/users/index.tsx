import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Stack } from "expo-router";
import { auth } from "../../utils/firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

// Note: This is for demonstration. In production, you'd need Firebase Admin SDK
// or Cloud Functions to list all users for security reasons.

export default function UsersScreen() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const showCurrentUserDetails = () => {
    if (currentUser) {
      Alert.alert(
        "Current User Details",
        `Email: ${currentUser.email}\n` +
          `UID: ${currentUser.uid}\n` +
          `Created: ${
            currentUser.metadata.creationTime
              ? new Date(currentUser.metadata.creationTime).toLocaleString()
              : "Unknown"
          }\n` +
          `Last Sign In: ${
            currentUser.metadata.lastSignInTime
              ? new Date(currentUser.metadata.lastSignInTime).toLocaleString()
              : "Unknown"
          }\n` +
          `Email Verified: ${currentUser.emailVerified ? "Yes" : "No"}`
      );
    } else {
      Alert.alert("No User", "No user is currently logged in");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "User Details",
          headerShown: true,
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Firebase User Information</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={showCurrentUserDetails}
        >
          <Text style={styles.buttonText}>Show Current User Details</Text>
        </TouchableOpacity>

        {currentUser && (
          <View style={styles.userCard}>
            <Text style={styles.cardTitle}>Currently Logged In:</Text>
            <Text style={styles.userInfo}>📧 Email: {currentUser.email}</Text>
            <Text style={styles.userInfo}>🔑 UID: {currentUser.uid}</Text>
            <Text style={styles.userInfo}>
              📅 Created:{" "}
              {currentUser.metadata.creationTime
                ? new Date(
                    currentUser.metadata.creationTime
                  ).toLocaleDateString()
                : "Unknown"}
            </Text>
            <Text style={styles.userInfo}>
              🕐 Last Sign In:{" "}
              {currentUser.metadata.lastSignInTime
                ? new Date(
                    currentUser.metadata.lastSignInTime
                  ).toLocaleDateString()
                : "Unknown"}
            </Text>
            <Text style={styles.userInfo}>
              ✅ Verified: {currentUser.emailVerified ? "Yes" : "No"}
            </Text>
          </View>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 How to View All Users:</Text>
          <Text style={styles.infoText}>
            1. Go to Firebase Console: console.firebase.google.com
          </Text>
          <Text style={styles.infoText}>
            2. Select your project: liftiq-10a4a
          </Text>
          <Text style={styles.infoText}>
            3. Click Authentication → Users tab
          </Text>
          <Text style={styles.infoText}>
            4. View all registered users and their details
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#9C3EE8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  userCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  userInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    lineHeight: 20,
  },
  infoBox: {
    backgroundColor: "#e8f4fd",
    padding: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#2196F3",
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#424242",
    marginBottom: 5,
    lineHeight: 20,
  },
});
