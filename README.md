# 🎓 Student Portal App

Aplikasi mobile untuk manajemen data mahasiswa yang dibangun menggunakan **Expo** dan **React Native** dengan integrasi **Firebase** untuk autentikasi dan database.

## 📱 Screenshots

| Login | Register | Profile | Data Mahasiswa |
|-------|----------|---------|----------------|
| Dark Theme | Validasi Input | Info User | List Mahasiswa |

## ✨ Fitur Utama

- 🔐 **Autentikasi Firebase** - Login dan Registrasi dengan email/password
- 👤 **Profil Pengguna** - Menampilkan informasi mahasiswa yang sedang login
- 📋 **Data Mahasiswa** - Melihat semua data mahasiswa terdaftar
- 💾 **Session Persistence** - Menggunakan AsyncStorage untuk menyimpan sesi
- 🎨 **Dark Theme UI** - Tampilan modern dengan tema gelap
- ✅ **Validasi Input** - Validasi email dan password secara real-time

## 🛠️ Tech Stack

| Teknologi | Versi | Keterangan |
|-----------|-------|------------|
| Expo | ~54.0.25 | Framework React Native |
| React Native | 0.81.5 | Mobile Development |
| Firebase | ^12.6.0 | Authentication & Firestore |
| Expo Router | ~6.0.15 | File-based Navigation |
| TypeScript | ~5.9.2 | Type Safety |
| AsyncStorage | 2.2.0 | Local Storage |

## 📁 Struktur Project

```
project1/
├── app/                    # Screen components (Expo Router)
│   ├── _layout.tsx         # Root layout dengan auth protection
│   ├── login.tsx           # Login & Register screen
│   ├── profile.tsx         # Profile screen
│   ├── students.tsx        # List semua mahasiswa
│   └── (tabs)/             # Tab navigation (unused)
├── components/             # Reusable components
├── config/
│   └── firebaseConfig.ts   # Firebase configuration
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── utils/
│   └── storage.ts          # AsyncStorage utilities
├── constants/              # Theme & constants
├── hooks/                  # Custom hooks
└── assets/                 # Images & fonts
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js (v18+)
- npm atau yarn
- Expo CLI
- Android Studio / Xcode (untuk emulator)
- Expo Go app (untuk device fisik)

### Instalasi

1. **Clone repository**
   ```bash
   git clone https://github.com/username/student-portal-app.git
   cd student-portal-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Konfigurasi Firebase**
   - Buat project di [Firebase Console](https://console.firebase.google.com/)
   - Aktifkan Authentication (Email/Password)
   - Aktifkan Firestore Database
   - Download `google-services.json` dan letakkan di root folder
   - Update konfigurasi di `config/firebaseConfig.ts`

4. **Jalankan aplikasi**
   ```bash
   # Development server
   npm start

   # Atau langsung ke Android
   npm run android

   # Atau langsung ke iOS
   npm run ios
   ```

5. **Scan QR Code** dengan Expo Go atau tekan `a` untuk Android / `i` untuk iOS

## 🔥 Konfigurasi Firebase

### Firestore Database Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == studentId;
    }
  }
}
```

### Struktur Collection `students`

```json
{
  "students": {
    "<user_uid>": {
      "name": "Nama Mahasiswa",
      "nim": "24060122130XXX",
      "email": "email@students.undip.ac.id",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  }
}
```

## 📝 Validasi Input

### Email
- Harus mengandung karakter `@`
- Format: `example@email.com`

### Password
- Minimal 8 karakter
- Harus mengandung minimal 1 angka

## 🎨 Design System

| Elemen | Warna |
|--------|-------|
| Background | `#0A1929` |
| Card | `#1A2332` |
| Primary/Accent | `#00BCD4` |
| Text Primary | `#FFFFFF` |
| Text Secondary | `#B0BEC5` |
| Border | `#2C3E50` |
| Success | `#4CAF50` |
| Error | `#EF5350` |

## 📄 Scripts

```bash
npm start         # Start Expo development server
npm run android   # Run on Android
npm run ios       # Run on iOS
npm run web       # Run on Web
npm run lint      # Run ESLint
```

## 🤝 Contributing

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

<p align="center">
  Made with ❤️ using Expo & React Native
</p>
