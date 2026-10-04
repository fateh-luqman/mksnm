# Analisis Kandungan, Audit UI dan Struktur Digital

## 1. Analisis kandungan manual

Manual membina pembelajaran sivik melalui empat nilai teras, iaitu **Kasih Sayang, Hormat-Menghormati, Bertanggungjawab dan Kegembiraan**. Kandungan topik disusun mengikut bulan Jun hingga November. Setiap halaman topik menggunakan pola maklumat yang konsisten:

1. **Tajuk / nilai teras**
2. **Aspek Penyampaian** sebagai mesej utama pembelajaran
3. **Idea** sebagai isu atau keadaan yang perlu difahami
4. **Fokus** sebagai skop pengetahuan atau pemikiran
5. **Saranan** sebagai tindakan yang boleh dilakukan murid
6. **Info** sebagai maklumat sokongan atau rujukan
7. **Amalan Berterusan** sebagai tingkah laku yang perlu dibudayakan

Struktur ini sesuai diterjemahkan kepada kad digital kerana mempunyai hierarki semula jadi daripada kesedaran kepada tindakan.

## 2. Analisis elemen grafik PDF

Bahagian awal manual menggunakan bentuk gelombang abstrak berwarna biru muda, biru tua dan sian. Ruang putih digunakan dengan banyak, lalu kandungan tidak terasa padat. Kod warna nilai pula konsisten:

- **Kasih Sayang**: merah jambu / merah.
- **Hormat-Menghormati**: biru.
- **Bertanggungjawab**: hijau.
- **Kegembiraan**: kuning / jingga.

Halaman topik menggunakan ilustrasi vektor, kotak maklumat, ikon, QR code dan susun atur infografik. Versi web mengekalkan prinsip pembezaan blok, warna tema dan penekanan pada Amalan Berterusan tanpa menyalin keseluruhan komposisi halaman PDF.

## 3. Audit versi laman terdahulu

### Kekuatan

- Semua 23 topik telah distrukturkan dalam satu sumber data.
- Carian, tapisan nilai dan tapisan bulan sudah tersedia.
- Dialog topik memisahkan Idea, Fokus dan Saranan dengan jelas.
- Kemajuan bacaan disimpan pada peranti menggunakan `localStorage`.
- Reka bentuk asal sudah responsif dan menggunakan `prefers-reduced-motion`.
- Paparan desktop mempunyai identiti visual yang kemas dan konsisten.

### Perkara yang perlu diperbaiki

1. **Identiti sekolah belum jelas**. Header hanya memaparkan jenama Kesedaran Sivik tanpa logo atau nama SK Ara Rendang.
2. **Tiada mod gelap** walaupun laman digunakan pada pelbagai peranti dan keadaan pencahayaan.
3. **Hero terlalu tinggi pada desktop**, menyebabkan kandungan seterusnya tidak kelihatan pada skrin pertama.
4. **Navigasi utama hilang pada tablet dan telefon** kerana menu desktop terus disembunyikan tanpa pengganti.
5. **Bilangan topik dan statistik ditulis secara statik** di HTML. Jika data berubah, nombor boleh tidak sepadan.
6. **Bacaan topik terputus** kerana tiada butang topik sebelumnya atau seterusnya dalam dialog.
7. Akses awal kepada `localStorage` untuk saiz teks belum dilindungi sepenuhnya sekiranya storan pelayar disekat atau rosak.
8. Metadata perkongsian sosial, identiti PWA dan ikon laman masih sangat minimum.

## 4. Penambahbaikan versi web 2.0

### Identiti SK Ara Rendang

- Logo sekolah digunakan pada header, hero dan footer.
- Nama sekolah dipaparkan sebagai identiti portal pembelajaran.
- Logo kekal sebagai fail imej berasingan di `assets/` supaya mudah ditukar kemudian.

### Mod terang dan gelap

- Tema menggunakan `data-theme="light|dark"` pada elemen `html`.
- Pilihan murid disimpan menggunakan `localStorage`.
- Jika murid belum memilih tema, laman mengikut tetapan `prefers-color-scheme` peranti.
- Warna latar, kad, garisan, teks, borang, dialog dan panel ditukar menggunakan token CSS supaya mod gelap kekal konsisten.

### Navigasi dan responsif

- Menu hamburger ditambah untuk tablet dan telefon.
- Saiz hero dipadatkan supaya sebahagian kandungan di bawah mula terasa lebih dekat.
- Pada telefon yang sangat sempit, butang A− dan A+ disembunyikan bagi mengelakkan header sesak; kawalan tema dan menu kekal tersedia.

### Bacaan topik

- Dialog topik kini mempunyai butang **Topik sebelumnya** dan **Topik seterusnya**.
- Pautan terus `?topik=id` terus disokong.
- Status selesai dan kemajuan masih disimpan seperti versi asal.

### Ketahanan kod

- Bilangan topik, nilai teras dan bulan dijana terus daripada `content-data.js`.
- Akses storan pelayar dibungkus dalam fungsi selamat.
- Nilai saiz teks yang rosak atau bukan nombor tidak lagi menyebabkan ralat.
- Metadata Open Graph, canonical URL dan manifest dikemas kini.

## 5. Hierarki laman versi semasa

- **Header**: logo sekolah, navigasi, mod terang/gelap, kawalan teks dan menu mudah alih.
- **Hero**: identiti sekolah, pengenalan ringkas, pilihan empat nilai dan statistik dinamik.
- **Empat Nilai Teras**: pintasan cepat ke kelompok kandungan.
- **Peta Bulan**: Jun hingga November.
- **Perpustakaan Topik**: carian, tapisan dan kad topik.
- **Dialog Topik**: Idea, Fokus, Saranan, Amalan Berterusan, Info, sumber dan navigasi urutan.
- **Tentang Manual**: Falsafah Pendidikan Kebangsaan, Visi, Misi, latar belakang dan penghargaan.
- **Footer**: identiti sekolah, pautan utama dan makluman hak cipta.

## 6. Kesediaan Vercel

Projek kekal sebagai laman statik HTML, CSS dan JavaScript tulen. Tiada framework, pangkalan data atau proses build diperlukan. `vercel.json` menambah header keselamatan asas serta cache jangka panjang hanya untuk aset dalam folder `assets`.

Aliran kerja yang disyorkan ialah **GitHub → Vercel**. Selepas fail ditukar dan commit dibuat pada branch produksi, Vercel akan melakukan deployment baharu secara automatik.
