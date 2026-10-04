# Kesedaran Sivik SK Ara Rendang

Laman web statik interaktif yang menyusun semula kandungan **Manual Kesedaran Sivik dan Amalan Nilai Murni dalam Kalangan Murid Sekolah Rendah**, Kementerian Pendidikan Malaysia, Cetakan Pertama 2018, untuk kegunaan pembelajaran di **Sekolah Kebangsaan Ara Rendang**.

## Versi web 2.0

Versi ini menambah identiti sekolah dan penambahbaikan pengalaman pengguna berdasarkan audit paparan desktop serta struktur kod projek.

### Ciri utama

- 23 topik daripada Jun hingga November.
- 4 nilai teras: Kasih Sayang, Hormat-Menghormati, Bertanggungjawab dan Kegembiraan.
- Setiap topik memaparkan **Aspek Penyampaian, Idea, Fokus, Saranan, Amalan Berterusan, Info dan sumber dalam manual**.
- Logo rasmi SK Ara Rendang pada header, hero dan footer.
- **Mod terang / mod gelap** dengan pilihan disimpan pada peranti dan sokongan tema sistem.
- Carian segera serta tapisan mengikut nilai dan bulan.
- Navigasi mudah alih yang boleh dibuka dan ditutup.
- Dialog bacaan dengan navigasi **topik sebelumnya / seterusnya**.
- Penanda kemajuan bacaan menggunakan `localStorage` pada peranti pengguna.
- Kawalan saiz teks A− / A+ pada skrin yang sesuai.
- Statistik bilangan topik, nilai dan bulan dijana terus daripada data, bukan nombor statik.
- Sokongan papan kekunci, fokus jelas dan `prefers-reduced-motion`.
- Tiada framework dan tiada kebergantungan CDN. Projek boleh diterbitkan terus di Vercel.

## Struktur fail

- `index.html` — struktur halaman, metadata perkongsian sosial dan kawalan tema.
- `styles.css` — reka bentuk responsif, sistem tema terang/gelap dan sistem warna nilai.
- `content-data.js` — semua kandungan topik yang telah distrukturkan serta metadata laman.
- `script.js` — carian, tapisan, dialog topik, navigasi topik, kemajuan, tema dan menu mudah alih.
- `assets/logo-sk-ara-rendang.png` — logo sekolah yang digunakan dalam laman.
- `favicon.svg` — ikon laman berasaskan palet warna sekolah.
- `manifest.webmanifest` — metadata aplikasi web.
- `vercel.json` — tetapan Vercel, header keselamatan dan cache aset logo.
- `ANALISIS-DAN-STRUKTUR.md` — analisis sumber, audit laman dan rasional penambahbaikan.
- `CONTENT-MAP.md` — pemetaan semula semua topik mengikut bulan, nilai, idea, fokus dan saranan.

## Terbitkan melalui GitHub + Vercel

1. Gantikan fail dalam repositori GitHub dengan versi terbaharu daripada pakej ini.
2. Pastikan folder `assets` turut dimuat naik bersama fail lain.
3. Commit perubahan ke branch yang disambungkan dengan Vercel, lazimnya `main`.
4. Vercel akan membuat deployment baharu secara automatik.
5. Selepas deployment selesai, buka laman dan buat **hard refresh** jika pelayar masih memaparkan versi lama.

Framework Preset boleh kekal sebagai **Other**. Tiada `npm install`, proses build atau pemboleh ubah persekitaran diperlukan.

## Nota kandungan

Statistik, contoh dan pautan sumber dikekalkan berdasarkan manual cetakan 2018. Sesetengah pautan atau fakta bertarikh mungkin telah berubah selepas penerbitan asal. Laman ini tidak menggantikan fakta dalam manual secara senyap dengan maklumat luar.

Laman web ini ialah penyusunan semula digital untuk tujuan pembelajaran. Hak cipta kandungan asal tertakluk kepada penerbit asal.
