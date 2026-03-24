# Mind 2 Do - Modern Todo App

Bu proje, "Web Geliştirme Eğitimi" kapsamında modern web teknolojileri (ReactJS, Tailwind CSS) kullanılarak geliştirilmiş bir görev yönetim (Todo) uygulamasıdır. Kullanıcıların günlük görevlerini planlayabileceği, takip edebileceği ve filtreleyebileceği şık, duyarlı ve interaktif bir arayüze sahiptir.

## 🚀 Proje Hakkında

Eğitim yönergelerine tam uyumlu olarak geliştirilen bu projede, modern JavaScript ve güncel UI/UX tasarım yaklaşımları kullanılmıştır. ReactJS tabanlı hızlı bir Vite projesi olarak oluşturulmuş ve Tailwind CSS ile stillendirilmiştir.

### ✨ Temel Özellikler (CRUD)

- **Ekleme (Create):** Planlanan güne veya bugüne yeni bir görev ekleme .
- **Listeleme (Read):** Eklenen görevleri dinamik "Tümü", "Devam Eden" ve "Tamamlanan" sekmeleriyle filtreleyip durumu inceleme.
- **Güncelleme (Update):** Görev metnini düzenleme ve durumu (tamamlandı/tamamlanmadı) bir tıkla değiştirme.
- **Silme (Delete):** İstenilen görevi silme veya listeyi temiz tutmak için günün tamamlanan tüm görevlerini tek tuşla temizleme.

## 🛠️ Kullanılan Teknolojiler

- **Framework / Kütüphane:** ReactJS (Vite)
- **Stil & Tasarım:** Tailwind CSS
- **İkonlar:** Lucide React
- **Veri Saklama:** LocalStorage (Tarayıcı İçi Depolama)

## 📁 Proje Klasör Yapısı

Proje yapısı, modern React standartlarına ve istenilen yönergelere göre aşağıdaki şekilde organize edilmiştir:

```text
src/
├── Components/      # TodoForm, TodoList gibi yeniden kullanılabilir bileşenler
├── Pages/           # Home.jsx ana uygulama sayfası
├── Interfaces/      # Tipler, arayüz tanımları
├── App.jsx          # Kök uygulama bileşeni
└── index.css        # Tailwind CSS tabanlı global stiller
```

## 💻 Kurulum ve Çalıştırma

Projeyi kendi ortamınızda (yerelde) çalıştırmak için bilgisayarınızda **Node.js** yüklü olmalıdır.

1. **Projeyi indirin veya klonlayın:**
   ```bash
   # Terminal üzerinden klonlamak için:
   git clone https://github.com/<KULLANICI_ADINIZ>/todo-app.git
   cd todo-app
   ```

2. **Gerekli paketleri/bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme (development) sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda Görüntüleyin:**
   Terminalde ekrana gelen adresi (genellikle `http://localhost:5173`) tarayıcınızdan açarak uygulamaya erişebilirsiniz.
