import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  USER_ID: 'userId',
  USER_EMAIL: 'userEmail',
  AUTH_TOKEN: 'authToken',
};

export const StorageService = {
  // Save user data
  setUserId: async (userId: string) => {
    await AsyncStorage.setItem(StorageKeys.USER_ID, userId);
  },
  
  getUserId: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(StorageKeys.USER_ID);
  },
  
  setUserEmail: async (email: string) => {
    await AsyncStorage.setItem(StorageKeys.USER_EMAIL, email);
  },
  
  getUserEmail: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(StorageKeys.USER_EMAIL);
  },
  
  setAuthToken: async (token: string) => {
    await AsyncStorage.setItem(StorageKeys.AUTH_TOKEN, token);
  },
  
  getAuthToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem(StorageKeys.AUTH_TOKEN);
  },
  
  // Clear all user data
  clearUserData: async () => {
    await AsyncStorage.multiRemove([
      StorageKeys.USER_ID,
      StorageKeys.USER_EMAIL,
      StorageKeys.AUTH_TOKEN,
    ]);
  },
  
  // Check if user is logged in
  isLoggedIn: async (): Promise<boolean> => {
    const userId = await AsyncStorage.getItem(StorageKeys.USER_ID);
    return !!userId;
  }
};
