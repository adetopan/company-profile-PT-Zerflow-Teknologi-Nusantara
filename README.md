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

## Deploy

Unggah folder ke hosting statis (Netlify, Vercel, GitHub Pages, cPanel) dengan `index.html` sebagai entry point.
