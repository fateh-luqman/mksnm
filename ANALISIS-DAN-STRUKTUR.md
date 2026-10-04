# Analisis Kandungan dan Reka Bentuk Digital

## 1. Analisis kandungan manual

Manual membina pembelajaran sivik melalui empat nilai teras, iaitu **Kasih Sayang, Hormat-Menghormati, Bertanggungjawab dan Kegembiraan**. Kandungan topik disusun mengikut bulan Jun hingga November. Setiap halaman topik menggunakan pola maklumat yang sangat konsisten:

1. **Tajuk / nilai teras**
2. **Aspek Penyampaian** sebagai mesej utama pembelajaran
3. **Idea** sebagai isu atau keadaan yang perlu difahami
4. **Fokus** sebagai skop pengetahuan atau pemikiran
5. **Saranan** sebagai tindakan yang boleh dilakukan murid
6. **Info** sebagai maklumat sokongan atau rujukan
7. **Amalan Berterusan** sebagai tingkah laku yang perlu dibudayakan

Struktur ini sangat sesuai ditukar kepada kad digital kerana kandungan sudah mempunyai hierarki semula jadi daripada kesedaran kepada tindakan.

## 2. Analisis elemen grafik PDF

### Identiti visual umum

Bahagian awal manual menggunakan bentuk gelombang abstrak berwarna biru muda, biru tua dan sian. Gaya ini memberikan identiti rasmi KPM tetapi masih lembut untuk konteks sekolah rendah. Ruang putih digunakan dengan banyak, lalu kandungan tidak terasa padat.

### Kod warna nilai

- **Kasih Sayang**: merah jambu / merah.
- **Hormat-Menghormati**: biru.
- **Bertanggungjawab**: hijau.
- **Kegembiraan**: kuning / jingga.

Kod warna tersebut diulang pada logo nilai, tajuk dan elemen hiasan. Laman web mengekalkan prinsip warna ini supaya murid boleh membina hubungan visual yang konsisten antara nilai dan topik.

### Gaya halaman topik

Halaman topik menggunakan ilustrasi vektor yang ceria, kotak maklumat berwarna, ikon kecil, QR code dan susun atur infografik. Elemen yang paling berguna untuk diterjemah ke web ialah:

- blok maklumat yang berasingan untuk Idea, Fokus dan Saranan;
- warna tema mengikut nilai;
- elemen ilustratif yang memberi rehat visual;
- kotak Info yang jelas berbeza daripada isi utama;
- penekanan khusus pada Amalan Berterusan.

Daripada menyalin ilustrasi asal, versi web menggunakan bentuk, ikon dan warna baharu yang ringan supaya paparan lebih pantas, responsif dan bebas daripada masalah resolusi imej.

## 3. Susunan semula maklumat untuk laman web

Hierarki laman:

- **Hero**: pengenalan ringkas dan pilihan empat nilai teras.
- **Empat Nilai Teras**: pintasan cepat ke kelompok kandungan.
- **Peta Bulan**: Jun hingga November.
- **Perpustakaan Topik**: carian, tapisan dan 23 kad topik.
- **Paparan Topik**: dialog besar dengan tiga blok utama Idea, Fokus dan Saranan, diikuti Amalan Berterusan dan Info.
- **Tentang Manual**: Falsafah Pendidikan Kebangsaan, Visi, Misi, latar belakang dan penghargaan.

## 4. Keputusan reka bentuk UI

Laman menggunakan gaya **premium tetapi mesra murid**, bukannya gaya korporat yang terlalu kaku atau gaya kartun yang terlalu kebudak-budakan. Ciri utamanya ialah:

- tipografi besar dan mudah dibaca;
- kad berpenjuru bulat dengan bayang lembut;
- ruang putih yang banyak;
- warna terang digunakan sebagai aksen, bukan memenuhi keseluruhan skrin;
- butang besar dan sasaran sentuhan sesuai untuk tablet;
- animasi ringan dengan sokongan `prefers-reduced-motion`;
- fokus papan kekunci dan elemen semantik untuk kebolehcapaian;
- kawalan saiz teks untuk pembaca yang memerlukan paparan lebih besar.

## 5. Interaksi pembelajaran

Laman menambah beberapa ciri yang tidak terdapat pada PDF tetapi tidak mengubah kandungan sumber:

- carian teks merentasi tajuk, Idea, Fokus dan Saranan;
- tapisan mengikut bulan atau nilai;
- pemilihan topik rawak;
- tanda “selesai” untuk setiap topik;
- meter kemajuan yang disimpan pada peranti melalui `localStorage`;
- pautan terus kepada topik melalui parameter `?topik=id`.

## 6. Kesediaan Vercel

Projek ini ialah laman statik HTML, CSS dan JavaScript tulen. Tiada framework, pangkalan data atau proses build diperlukan. Oleh itu, ia sesuai diterbitkan terus di Vercel melalui GitHub atau Vercel CLI.
