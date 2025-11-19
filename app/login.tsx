import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nim, setNim] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const validateEmail = (emailValue: string): boolean => {
    return emailValue.includes('@') && emailValue.indexOf('@') > 0 && emailValue.indexOf('@') < emailValue.length - 1;
  };

  const validatePassword = (pass: string): { isValid: boolean; message: string } => {
    if (pass.length < 8) {
      return { isValid: false, message: 'Kata sandi harus minimal 8 karakter' };
    }
    if (!/\d/.test(pass)) {
      return { isValid: false, message: 'Kata sandi harus mengandung minimal 1 angka' };
    }
    return { isValid: true, message: '' };
  };

  const handleAuth = async () => {
    // Validate email
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Email tidak valid. Email harus mengandung karakter @');
      return;
    }

    if (isSignUp) {
      if (!name || !nim || !email || !password) {
        Alert.alert('Error', 'Mohon isi semua field');
        return;
      }

      // Validate password untuk sign up
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        Alert.alert('Error', passwordValidation.message);
        return;
      }
    } else {
      if (!email || !password) {
        Alert.alert('Error', 'Mohon isi email dan kata sandi');
        return;
      }
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, name, nim);
        Alert.alert('Berhasil', 'Akun berhasil dibuat!');
      } else {
        await signIn(email, password);
      }
      // Navigation akan ditangani oleh AuthContext dan _layout
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Autentikasi gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="people-circle" size={80} color="#00BCD4" />
          </View>
          <Text style={styles.title}>
            {isSignUp ? 'Buat Akun' : 'Selamat Datang Kembali'}
          </Text>
          <Text style={styles.subtitle}>
            {isSignUp ? 'Isi detail di bawah ini untuk memulai.' : 'Masuk untuk melanjutkan ke akun Anda.'}
          </Text>
        </View>

        <View style={styles.formContainer}>
          {isSignUp && (
            <>
              <Text style={styles.label}>Nama Lengkap</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama lengkap Anda"
                  placeholderTextColor="#999"
                  value={name}
                  onChangeText={setName}
                  editable={!loading}
                />
              </View>

              <Text style={styles.label}>NIM</Text>
              <View style={styles.inputContainer}>
                <Ionicons name="card" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan NIM Anda"
                  placeholderTextColor="#999"
                  value={nim}
                  onChangeText={setNim}
                  keyboardType="numeric"
                  editable={!loading}
                />
              </View>
            </>
          )}

          <Text style={styles.label}>{isSignUp ? 'Email' : 'Alamat Email'}</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={isSignUp ? "contoh@email.com" : "Masukkan email Anda"}
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              editable={!loading}
            />
          </View>

          <Text style={styles.label}>Kata Sandi</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder={isSignUp ? "Buat kata sandi yang kuat" : "Masukkan kata sandi Anda"}
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity 
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons 
                name={showPassword ? "eye" : "eye-off"} 
                size={20} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>

          {isSignUp && (
            <View style={styles.passwordHintContainer}>
              <Text style={[styles.passwordHint, password.length >= 8 && styles.passwordHintValid]}>
                • Minimal 8 karakter
              </Text>
              <Text style={[styles.passwordHint, /\d/.test(password) && styles.passwordHintValid]}>
                • Mengandung minimal 1 angka
              </Text>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>
                {isSignUp ? 'Registrasi' : 'Masuk'}
              </Text>
            )}
          </TouchableOpacity>

          <View style={styles.switchContainer}>
            <Text style={styles.switchTextGray}>
              {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}
            </Text>
            <TouchableOpacity 
              onPress={() => setIsSignUp(!isSignUp)}
              disabled={loading}
            >
              <Text style={styles.switchTextBlue}>
                {isSignUp ? ' Masuk' : ' Daftar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1929',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#B0BEC5',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2332',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2C3E50',
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 15,
    color: '#fff',
  },
  eyeIcon: {
    padding: 8,
  },
  passwordHintContainer: {
    marginTop: -12,
    marginBottom: 16,
    gap: 4,
  },
  passwordHint: {
    fontSize: 12,
    color: '#EF5350',
  },
  passwordHintValid: {
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#00BCD4',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#546E7A',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  switchTextGray: {
    color: '#B0BEC5',
    fontSize: 15,
  },
  switchTextBlue: {
    color: '#00BCD4',
    fontSize: 15,
    fontWeight: '600',
  },
});