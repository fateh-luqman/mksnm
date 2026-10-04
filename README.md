# Kesedaran Sivik Sekolah Rendah

Laman web statik interaktif yang menyusun semula kandungan **Manual Kesedaran Sivik dan Amalan Nilai Murni dalam Kalangan Murid Sekolah Rendah**, Kementerian Pendidikan Malaysia, Cetakan Pertama 2018.

## Ciri utama

- 23 topik daripada Jun hingga November.
- 4 nilai teras: Kasih Sayang, Hormat-Menghormati, Bertanggungjawab dan Kegembiraan.
- Setiap topik memaparkan **Aspek Penyampaian, Idea, Fokus, Saranan, Amalan Berterusan, Info dan sumber dalam manual**.
- Carian segera serta tapisan mengikut nilai dan bulan.
- Modal bacaan mesra murid dan responsif untuk telefon, tablet serta komputer.
- Penanda kemajuan bacaan menggunakan `localStorage` pada peranti pengguna.
- Kawalan saiz teks A− / A+.
- Tiada framework dan tiada kebergantungan CDN. Projek boleh diterbitkan sebagai laman statik terus di Vercel.

## Struktur fail

- `index.html` — struktur halaman.
- `styles.css` — reka bentuk responsif dan sistem warna nilai.
- `content-data.js` — semua kandungan topik yang telah distrukturkan.
- `script.js` — carian, tapisan, dialog topik, kemajuan dan interaksi.
- `favicon.svg` — ikon laman.
- `manifest.webmanifest` — metadata aplikasi web.
- `vercel.json` — tetapan ringkas untuk Vercel.
- `ANALISIS-DAN-STRUKTUR.md` — analisis reka bentuk PDF dan rasional UI web.
- `CONTENT-MAP.md` — pemetaan semula semua topik mengikut bulan, nilai, idea, fokus dan saranan.

## Terbitkan ke Vercel

### Pilihan 1: GitHub + Vercel

1. Cipta repositori GitHub baharu.
2. Muat naik semua fail dalam folder ini ke akar repositori.
3. Buka Vercel dan pilih **Add New > Project**.
4. Import repositori tersebut.
5. Framework Preset boleh dibiarkan sebagai **Other** kerana ini ialah laman statik.
6. Klik **Deploy**.

### Pilihan 2: Vercel CLI

Daripada folder projek:

```bash
npx vercel
```

Untuk penerbitan produksi:

```bash
npx vercel --prod
```

Tidak perlu `npm install`, proses build atau pemboleh ubah persekitaran.

## Nota kandungan

Statistik, contoh dan pautan sumber dikekalkan berdasarkan manual cetakan 2018. Sesetengah pautan atau fakta bertarikh mungkin telah berubah selepas penerbitan asal. Laman ini sengaja tidak menggantikan kandungan manual dengan maklumat luar supaya maksud sumber asal kekal jelas.
