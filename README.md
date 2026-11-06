# PT Zerflow Teknologi Nusantara — Landing Page & Portofolio

Website company profile dan landing page portofolio untuk **PT Zerflow Teknologi Nusantara**, didirikan oleh **Ade Topan Prayoga**.

## Layanan yang ditampilkan

- Pengembangan aplikasi & software
- Website & landing page
- Infrastruktur jaringan
- Pemasangan CCTV
- Server & backup
- Maintenance & support

## Prasyarat

Node.js **20+** (Anda bisa pakai **nvm**):

```bash
nvm use 24
node -v
```

## Menjalankan lokal (Vite)

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173` (browser bisa terbuka otomatis).

## Build production

```bash
npm run build
npm run preview
```

Hasil build ada di folder `dist/` — unggah ke Netlify, Vercel, atau hosting statis.

## Alternatif tanpa Node

Buka `index.html` langsung di browser, atau:

```bash
python -m http.server 8080
```

## Kustomisasi

1. **Kontak** — Email: `zerflowtech@gmail.com`. Telepon/WhatsApp ada di `index.html` (`#kontak`) dalam komentar HTML; uncomment bila perlu.
2. **Company profile** — `public/assets/company-profile-print.html` (tombol cetak di halaman dokumen).
3. **SK AHU** — tidak ditampilkan di situs (file internal `public/assets/ahu-pengesahan-zerflow-2026.pdf` jika diperlukan arsip).
4. **Portofolio** — Ganti teks/thumbnail di section `#portofolio` atau tambahkan foto di `public/assets/`.

## Struktur

```
index.html              Halaman utama
css/styles.css          Gaya & responsif
js/main.js              Navigasi, animasi, formulir
public/assets/          logo, icon, SK AHU PDF, company profile cetak
vite.config.js          Konfigurasi dev/build
```

## Deploy (GitHub + Vercel + domain)

**Repo:** [adetopan/company-profile-PT-Zerflow-Teknologi-Nusantara](https://github.com/adetopan/company-profile-PT-Zerflow-Teknologi-Nusantara)  
**Domain:** `zerflowteknologi.com`

### 1. Push kode terbaru

```bash
nvm use 24
cd "D:\Company Profile Zerflow Teknologi Nusantara"
git add .
git commit -m "Siap deploy production"
git push origin main
```

### 2. Hubungkan ke Vercel (penting)

Halaman hitam dengan kotak **“Send a message…”** **bukan** website Zerflow — itu template/proyek AI Vercel atau deploy yang salah.

1. Login [vercel.com](https://vercel.com) → **Add New → Project**.
2. Pilih **Import Git Repository** → repo **`adetopan/company-profile-PT-Zerflow-Teknologi-Nusantara`** (bukan “Deploy template” / v0).
3. **Root Directory:** kosong (`.`), bukan subfolder lain.
4. **Framework Preset:** **Vite**
5. **Build Command:** `npm run build` · **Output Directory:** `dist`
6. **Node.js Version:** **20.x** (Settings → General, atau pakai file `.nvmrc` di repo).
7. Klik **Deploy** → tunggu status **Ready** (hijau).
8. Buka URL deployment dari tab **Deployments** — harus tampil landing biru gelap Zerflow, bukan chat.

Jika masih salah: hapus proyek Vercel yang lama → buat proyek baru hanya dari GitHub repo di atas.

### 3. Pasang domain `zerflowteknologi.com`

Di Vercel: **Project → Settings → Domains** → tambahkan:

- `zerflowteknologi.com`
- `www.zerflowteknologi.com`

Vercel menampilkan DNS yang harus diisi. Umumnya di panel domain (tempat Anda beli domain):

| Host | Tipe | Nilai (contoh Vercel) |
|------|------|------------------------|
| `@` | **A** | `76.76.21.21` |
| `www` | **CNAME** | `cname.vercel-dns.com` |

Atau ganti **nameserver** domain ke nameserver Vercel jika registrar mendukung (paling mudah).

Propagasi DNS biasanya 5 menit–48 jam. Di Vercel, set **redirect** `www` → apex (atau sebaliknya) sesuai preferensi.

### 4. Setelah live

- Buka `https://zerflowteknologi.com` dan cek formulir kontak + company profile.
- (Opsional) Di Vercel aktifkan **HTTPS** otomatis (default sudah on).

### Alternatif

- **Netlify:** drag & drop folder `dist` setelah `npm run build`, lalu custom domain sama seperti di atas.
- **Cloudflare Pages:** connect GitHub, build `npm run build`, publish directory `dist`.
