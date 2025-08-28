# 📱 Project Absensi

Aplikasi absensi berbasis web yang dapat diakses melalui mobile dengan teknologi modern dan tunnel ngrok untuk akses online.

## 🚀 Teknologi yang Digunakan

- **Frontend**: Next.js
- **Backend**: Express.js
- **Database**: SQL dengan Prisma ORM
- **Tunnel**: Ngrok untuk akses online
- **Mobile**: Responsive web app

## 📋 Prasyarat

Sebelum memulai, pastikan Anda telah menginstall:

- [Node.js](https://nodejs.org/) (versi 16 atau lebih baru)
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- [Ngrok](https://ngrok.com/) account dan authtoken

## 🛠️ Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd project-absensi
```

### 2. Install Dependencies

#### Backend
```bash
# Masuk ke folder backend (sesuaikan dengan struktur project Anda)
cd backend

# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push

# Atau jika menggunakan migration
npx prisma migrate dev
```

#### Frontend
```bash
# Masuk ke folder frontend (dari root directory, sesuaikan dengan struktur project)
cd frontend

# Install dependencies
npm install
```

### 3. Konfigurasi Environment

#### Backend (.env)
Buat file `.env` di folder backend berdasarkan `.env.example`:

```bash
# Copy file example ke .env
cp .env.example .env
```

File `.env` akan berisi:
```env
DATABASE_URL="mysql://root:@localhost:3306/absensi_db"
PORT=3001
NODE_ENV=development
```

**Catatan**: Sesuaikan `DATABASE_URL` jika konfigurasi database Anda berbeda (username, password, host, atau nama database).

#### Frontend (.env.local - jika diperlukan)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Setup Ngrok

#### a. Install Ngrok
```bash
# Download dan install ngrok dari https://ngrok.com/download
# Atau menggunakan npm
npm install -g ngrok
```

#### b. Update ngrok.yml dengan Token Anda
Edit file `ngrok.yml` yang sudah ada di repository dan ganti placeholder dengan token asli Anda:

```yaml
version: "2"
authtoken: "paste here"  # <-- GANTI DENGAN TOKEN NGROK ANDA
tunnels:
  backend:
    addr: 3001
    proto: http
    bind_tls: true
  frontend:
    addr: 3000
    proto: http
    bind_tls: true
```

**⚠️ PENTING**: 
1. Dapatkan authtoken dari [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken)
2. Ganti `"paste here"` dengan authtoken ngrok Anda sendiri
3. File ini berisi konfigurasi untuk backend (port 3001) dan frontend (port 3000)

### 5. Update URL Ngrok

Setelah menjalankan ngrok, Anda akan mendapat 2 URL tunnel baru yang perlu diupdate:

#### a. Frontend API Call di `app/page.tsx` baris 50:
```javascript
// Ganti dengan URL ngrok BACKEND (untuk fetch API dari frontend)
await fetch("https://YOUR-BACKEND-NGROK-URL.ngrok-free.app/api/endpoint")
```

#### b. Frontend Domain di `next.config.ts`:
```typescript
"https://YOUR-FRONTEND-NGROK-URL.ngrok-free.app", // domain ngrok frontend aktif
```

**⚠️ PENTING**: 
- `app/page.tsx` → Isi dengan URL ngrok **backend** (port 3001)
- `next.config.ts` → Isi dengan URL ngrok **frontend** (port 3000)

## 🚀 Menjalankan Aplikasi

### 1. Jalankan Backend
```bash
cd backend
npm start
# atau untuk development
npm run dev
```

### 2. Jalankan Ngrok (Terminal baru)

Jalankan backend dan frontend tunnel sekaligus menggunakan konfigurasi file:

```bash
# Ganti path dengan lokasi file ngrok.yml Anda
ngrok start --all --config="path/to/your/ngrok.yml"

# Contoh:
# Windows: ngrok start --all --config="D:\Tugas\Tugas_Akhir\ngrok.yml"
# MacOS/Linux: ngrok start --all --config="/home/user/project/ngrok.yml"
```

**📝 Catat kedua URL ngrok yang diberikan:**
- Backend: `https://abc123.ngrok-free.app` (tunnel untuk port 3001)
- Frontend: `https://xyz789.ngrok-free.app` (tunnel untuk port 3000)

### 3. Update URLs dengan Ngrok Baru

**a. Update Frontend API Call di `app/page.tsx` baris 50:**
```javascript
await fetch("https://abc123.ngrok-free.app/api/endpoint") // URL ngrok BACKEND
```

**b. Update Frontend Domain di `next.config.ts`:**
```typescript
"https://xyz789.ngrok-free.app", // URL ngrok FRONTEND untuk akses mobile
```

### 4. Jalankan Frontend (Terminal ke-2)
```bash
cd frontend
npm run dev
```

## 📱 Akses Aplikasi

- **Local Frontend**: http://localhost:3000
- **Mobile/Online**: https://xyz789.ngrok-free.app (URL ngrok frontend)
- **Backend API**: https://abc123.ngrok-free.app (URL ngrok backend)

## 🔧 Konfigurasi Tambahan

### Database Migration
```bash
cd backend
npx prisma migrate dev --name init
```

### Reset Database (Opsional)
```bash
cd backend
npx prisma migrate reset
```

### Generate Prisma Client
```bash
cd backend
npx prisma generate
```

## 📂 Struktur Project

```
project-absensi/
├── frontend/
│   ├── app/
│   │   ├── page.tsx          # Update baris 50 dengan ngrok URL
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── ...
│   ├── package.json
│   └── ...
├── ngrok.yml                 # Update dengan token Anda
└── README.md
```

## ⚠️ Catatan Penting

1. **URL Ngrok**: Setiap kali restart ngrok, URL akan berubah (kecuali menggunakan domain reserved)
2. **Update Frontend**: Jangan lupa update URL di `app/page.tsx` baris 50 setelah mendapat URL ngrok baru
3. **Token Ngrok**: Simpan token ngrok Anda dengan aman dan jangan commit ke repository
4. **Environment Files**: File `.env` dan `.env.local` tidak boleh di-commit ke Git

## 🔒 Keamanan & File Sensitif

**File yang sudah di-include dalam repository ini:**
- ✅ Semua source code
- ✅ package.json dengan dependencies list
- ✅ Database schema dan sample data
- ✅ `.env.example` dengan konfigurasi template
- ✅ `ngrok.yml` dengan placeholder token

**Yang perlu Anda setup setelah clone:**

1. **Install dependencies**:
   ```bash
   # Backend
   cd backend && npm install
   
   # Frontend  
   cd frontend && npm install
   ```

2. **Buat file .env dari template**:
   ```bash
   cp .env.example .env
   ```

3. **Update ngrok.yml** - Ganti `"paste here"` dengan authtoken ngrok Anda

4. **Update 2 file dengan URL ngrok baru**:
   - `app/page.tsx` baris 50 → URL ngrok **backend** (untuk API calls)
   - `next.config.ts` → URL ngrok **frontend** (untuk akses mobile)

**File .env tidak di-commit ke repository untuk keamanan database credentials.**

## 🐛 Troubleshooting

### Masalah Umum:

1. **Ngrok connection refused**: Pastikan backend berjalan di port 3001
2. **Database connection error**: Periksa DATABASE_URL di file .env
3. **CORS error**: Pastikan backend mengizinkan origin dari frontend
4. **Fetch error di frontend**: Pastikan URL ngrok sudah diupdate di page.tsx

### Logs untuk Debug:

```bash
# Backend logs
cd backend && npm run dev

# Frontend logs
cd frontend && npm run dev

# Ngrok logs
ngrok http 3001 --log=stdout
```

## 📞 Kontak

Jika ada pertanyaan atau masalah, silakan buat issue di repository ini.

---

**Happy Coding! 🎉**
