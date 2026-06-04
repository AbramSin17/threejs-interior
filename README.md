# Tugas Pengembangan Game dan Teknologi Immersive
**Three.js Deep Dive: Ruangan Interior 3D Interaktif dengan ES Modules, Raycasting, dan OrbitControls**

## 👤 Identitas Mahasiswa
* **Nama:** Abraham Alex Tanuse Putra Sinaga
* **NIM:** 2305010024
* **Kelas:** Pengembangan Game dan Teknologi Immersive
* **Dosen Pengampu:** Taufiqurrahman, S.ST., M.T.

---

## 🏛️ Tema Scene 3D
**Ruangan Interior Kerja Minimalis (Cozy Room Studio)**
Scene ini menampilkan sudut ruangan studio kerja minimalis yang memadukan estetika furnitur kayu konvensional dengan dekorasi teknologi futuristik. Fokus utama ruangan ini adalah sebuah meja jati walnut mewah yang menopang miniatur globe bumi dengan mekanisme levitasi magnetik otomatis yang mengambang konstan di atas pemancar induksi.

### Komponen Elemen & Geometri Wajib (Minimal 5 Objek Unik):
1. **Lantai Kamar (PlaneGeometry):** Berupa ubin lantai abu-abu studio minimalis yang dibuat secara prosedural lewat canvas internal Three.js.
2. **Meja Kerja (BoxGeometry):** Berwarna cokelat kayu walnut hangat (*Dark Walnut*) dengan efek lapisan mengkilap pernis *clearcoat*.
3. **Miniatur Globe (SphereGeometry):** Dibungkus menggunakan gambar tekstur pemetaan topografi bumi resmi dari NASA.
4. **Tiang Lampu (CylinderGeometry):** Berwarna logam kuningan emas (*brushed gold*) yang memantulkan kilau cahaya ruangan.
5. **Kap Lampu (ConeGeometry):** Berbentuk kerucut segi empat bersudut tegas dengan warna merah bata matte tahan panas.
6. **Pajangan Cincin (TorusGeometry):** Aksesoris dekorasi meja logam pemberat kertas (*paperweight*) berlapis emas murni mengkilap.
7. **Dinding Sudut (BoxGeometry):** Struktur arsitektur dinding tebal yang membentuk batas ruangan siku-siku (Corner Room).
8. **Bingkai & Lukisan (Plane & Box Geometry):** Hiasan dinding berupa lukisan seni abstrak garis modern dengan kombinasi warna terracotta estetik.

---

## 🛠️ Spesifikasi Teknis & Fitur
* **ES Modules:** Seluruh library inti `THREE` dan `OrbitControls` di-import langsung secara modular menggunakan CDN `esm.sh` tanpa menggunakan skrip tradisional `three.min.js`.
* **Lighting & Real Shadow:** Menggunakan perpaduan `AmbientLight` dan `DirectionalLight` miring studio yang mencetak bayangan lembut (*PCFSoftShadowMap*) dari meja dan ornamen secara realistis miring tepat di atas lantai ubin marmer.
* **OrbitControls:** Dilengkapi fitur `enableDamping` untuk pergerakan rotasi, zoom, dan panning kamera yang halus, serta pembatasan `maxPolarAngle` agar kamera pengguna tidak dapat menembus ke bawah ubin lantai.
* **Animation Loop:** Seluruh render loop dijalankan menggunakan metode modern `renderer.setAnimationLoop()` yang kompatibel penuh dengan standar imersif perangkat WebXR Device API.
* **Mekanik Animasi Melayang:** Globe bumi memiliki animasi rotasi pada porosnya sekaligus mekanik mengambang naik-turun halus secara otomatis memanfaatkan formula gelombang sinus matematika ($\sin$).
* **Raycasting Interaktif:** * **Hover:** Kursor mouse otomatis berubah menjadi pointer tangan saat menunjuk objek, diikuti efek *visual feedback* objek memancarkan pendaran internal biru neon (*emissive*) dan membesar tipis.
  * **Klik:** Pengguna dapat mengklik objek apa saja untuk memunculkan nama kategori serta deskripsi fungsi relevan pada panel informasi statis UI `#info`. Klik ulang objek yang sama untuk melakukan *deselect*.

---

## 🎮 Cara Menjalankan Aplikasi

### A. Melalui Link Live Deployment (Rekomendasi Utama)
Aplikasi ini sudah di-deploy secara publik dan dapat diakses langsung tanpa instalasi melalui tautan berikut:
👉 **https://abramsin17.github.io/threejs-interior/**

### B. Melalui Localhost (Development Mode)
Jika ingin menjalankan kode sumber secara lokal di perangkat komputer Anda:
1. Unduh atau *clone* repositori ini ke folder komputer Anda.
2. Buka folder proyek menggunakan teks editor **Visual Studio Code**.
3. Pastikan Anda telah menginstal ekstensi **Live Server** di VS Code.
4. Klik kanan pada berkas `index.html` $\rightarrow$ pilih opsi **Open with Live Server**.
5. Aplikasi akan berjalan di peramban browser Anda pada alamat `http://127.0.0.1:5500/index.html`.
6. Gunakan **Klik Kiri + Geser Mouse** untuk memutar sudut pandang kamera, **Scroll** untuk memperbesar/memperkecil objek, dan **Klik Kanan + Geser Mouse** untuk menggeser posisi kamera.

---

## 📸 Dokumentasi Screenshot Scene 3D

### 1. Tampilan Keseluruhan Ruangan Interior 3D (Default View)
![Screenshot Halaman Utama] <img width="1917" height="950" alt="image" src="https://github.com/user-attachments/assets/284a1b5f-79ed-4b9b-aba7-16a0cd054919" />

### 2. Tampilan Interaksi Klik Objek (Menampilkan Detail #info)
![Screenshot Interaksi Klik] <img width="1919" height="947" alt="image" src="https://github.com/user-attachments/assets/9d359a6c-dd20-4568-bfbd-509bf4beb885" />


---
*© 2026 - Tugas Mandiri Mata Kuliah Pengembangan Game dan Teknologi Immersive.*
