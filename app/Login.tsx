import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import axios from "axios";

export default function Login() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "https://reqres.in/api/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "x-api-key": "reqres-free-v1",
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      router.replace("/Home");
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        bottomOffset={62}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Please login to continue</Text>

        {/* Test Credentials Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Test credentials:</Text>
          <Text style={styles.code}>Email: eve.holt@reqres.in</Text>
          <Text style={styles.code}>Password: pistol</Text>
        </View>

        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email" },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="eve.holt@reqres.in"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="pistol"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text
          style={styles.footerText}
          onPress={() => {
            router.push("/Register");
          }}
        >
          Don't have an account? <Text style={styles.link}>Register</Text>
        </Text>
      </KeyboardAwareScrollView>
      <KeyboardToolbar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: { textAlign: "center", color: "#666" },
  link: { color: "#4f46e5", fontWeight: "bold" },
  error: { color: "red", marginBottom: 10, fontSize: 13 },

  // Info Box Styles
  infoBox: {
    backgroundColor: "#eef2ff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  infoText: { fontWeight: "600", color: "#1e3a8a", marginBottom: 4 },
  code: {
    fontFamily: "monospace",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 6,
    marginBottom: 4,
    color: "#1e3a8a",
  },
});
