export async function getSeedData() {
  return {
    pricingCategories: [
      {
        name: "Laundry Reguler",
        nameEn: "Regular Laundry",
        description: "Paket cuci kering lipat standar dengan harga terjangkau",
        descriptionEn: "Standard wash, dry, and fold package at affordable prices",
        sortOrder: 1,
        isActive: true,
      },
      {
        name: "Express",
        nameEn: "Express",
        description: "Layanan cuci cepat untuk kebutuhan mendesak",
        descriptionEn: "Fast laundry service for urgent needs",
        sortOrder: 2,
        isActive: true,
      },
      {
        name: "Dry Clean & Laundry Khusus",
        nameEn: "Dry Clean & Special Laundry",
        description: "Layanan pembersihan untuk berbagai jenis pakaian",
        descriptionEn: "Cleaning service for various types of clothing",
        sortOrder: 3,
        isActive: true,
      },
    ],
    pricingItems: [
      // Category 1: Laundry Reguler
      { categoryId: 1, name: "Laundry", nameEn: "Laundry", price: "12000", unit: "Kg", unitEn: "Kg", durationText: "2 hari", durationTextEn: "2 days", sortOrder: 1, isActive: true },
      { categoryId: 1, name: "Paket Hemat (di atas 10 kg)", nameEn: "Economy Package (over 10 kg)", price: "11000", unit: "Kg", unitEn: "Kg", durationText: "2 hari", durationTextEn: "2 days", sortOrder: 2, isActive: true },
      { categoryId: 1, name: "Taplak Meja Besar", nameEn: "Large Tablecloth", price: "20000", unit: "Kg", unitEn: "Kg", durationText: "2 hari", durationTextEn: "2 days", sortOrder: 3, isActive: true },
      { categoryId: 1, name: "Taplak Meja Kecil", nameEn: "Small Tablecloth", price: "17000", unit: "Kg", unitEn: "Kg", durationText: "2 hari", durationTextEn: "2 days", sortOrder: 4, isActive: true },
      { categoryId: 1, name: "Karpet Besar", nameEn: "Large Carpet", price: "20000", unit: "Kg", unitEn: "Kg", durationText: "4 hari", durationTextEn: "4 days", sortOrder: 5, isActive: true },
      { categoryId: 1, name: "Karpet Kecil", nameEn: "Small Carpet", price: "17000", unit: "Kg", unitEn: "Kg", durationText: "3-4 hari", durationTextEn: "3-4 days", sortOrder: 6, isActive: true },
      { categoryId: 1, name: "Setrika Saja", nameEn: "Ironing Only", price: "9000", unit: "Kg", unitEn: "Kg", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 7, isActive: true },
      { categoryId: 1, name: "Cuci Lembab (bisa ditunggu)", nameEn: "Damp Wash (wait available)", price: "6500", unit: "Kg", unitEn: "Kg", durationText: "", durationTextEn: "", sortOrder: 8, isActive: true },
      { categoryId: 1, name: "Cuci Kering", nameEn: "Wash & Dry", price: "9000", unit: "Kg", unitEn: "Kg", durationText: "1 hari", durationTextEn: "1 day", sortOrder: 9, isActive: true },
      { categoryId: 1, name: "Sepatu", nameEn: "Shoes", price: "20000", unit: "psg", unitEn: "pair", durationText: "3-4 hari", durationTextEn: "3-4 days", sortOrder: 10, isActive: true },
      { categoryId: 1, name: "Bantal Guling & Kepala", nameEn: "Bolster & Pillow", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "2-3 hari", durationTextEn: "2-3 days", sortOrder: 11, isActive: true },
      { categoryId: 1, name: "Boneka", nameEn: "Stuffed Toys", price: "0", unit: "", unitEn: "", notes: "Estimasi harga dan waktu tergantung ukuran", notesEn: "Price and time estimate depends on size", durationText: "", durationTextEn: "", sortOrder: 12, isActive: true },

      // Category 2: Express
      { categoryId: 2, name: "Express", nameEn: "Express", price: "25000", unit: "Kg", unitEn: "Kg", durationText: "24 jam", durationTextEn: "24 hours", sortOrder: 13, isActive: true },
      { categoryId: 2, name: "Super Express", nameEn: "Super Express", price: "35000", unit: "Kg", unitEn: "Kg", durationText: "12 jam", durationTextEn: "12 hours", sortOrder: 14, isActive: true },
      { categoryId: 2, name: "Super Duper Express", nameEn: "Super Duper Express", price: "45000", unit: "Kg", unitEn: "Kg", durationText: "3 jam", durationTextEn: "3 hours", sortOrder: 15, isActive: true },
      { categoryId: 2, name: "Setrika Kilat (langsung dikerjakan, estimasi waktu sesuai jumlah)", nameEn: "Flash Ironing (immediate service, time estimate based on quantity)", price: "11000", unit: "Kg", unitEn: "Kg", durationText: "", durationTextEn: "", sortOrder: 16, isActive: true },

      // Category 3: Dry Clean & Laundry Khusus
      // NOTE: Using 'notes' to simulate 'serviceType' for mapping in public.repo.ts
      // Kemeja Panjang
      { categoryId: 3, name: "Kemeja Panjang", nameEn: "Long Sleeve Shirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "45000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 17, isActive: true },
      { categoryId: 3, name: "Kemeja Panjang", nameEn: "Long Sleeve Shirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "25000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 18, isActive: true },
      // Kemeja Pendek
      { categoryId: 3, name: "Kemeja Pendek", nameEn: "Short Sleeve Shirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "40000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 19, isActive: true },
      { categoryId: 3, name: "Kemeja Pendek", nameEn: "Short Sleeve Shirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 20, isActive: true },
      // Celana Panjang
      { categoryId: 3, name: "Celana Panjang", nameEn: "Long Pants", notes: "Dry Clean", notesEn: "Dry Clean", price: "45000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 21, isActive: true },
      { categoryId: 3, name: "Celana Panjang", nameEn: "Long Pants", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "25000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 22, isActive: true },
      // Celana Pendek
      { categoryId: 3, name: "Celana Pendek", nameEn: "Shorts", notes: "Dry Clean", notesEn: "Dry Clean", price: "35000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 23, isActive: true },
      { categoryId: 3, name: "Celana Pendek", nameEn: "Shorts", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 24, isActive: true },
      // Rok Pendek
      { categoryId: 3, name: "Rok Pendek", nameEn: "Short Skirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "35000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 25, isActive: true },
      { categoryId: 3, name: "Rok Pendek", nameEn: "Short Skirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 26, isActive: true },
      // Terusan Panjang
      { categoryId: 3, name: "Terusan Panjang", nameEn: "Long Dress", notes: "Dry Clean", notesEn: "Dry Clean", price: "60000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 27, isActive: true },
      { categoryId: 3, name: "Terusan Panjang", nameEn: "Long Dress", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "30000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 28, isActive: true },
      // Terusan Pendek
      { categoryId: 3, name: "Terusan Pendek", nameEn: "Short Dress", notes: "Dry Clean", notesEn: "Dry Clean", price: "50000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 29, isActive: true },
      { categoryId: 3, name: "Terusan Pendek", nameEn: "Short Dress", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "25000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 30, isActive: true },
      // Terusan Anak
      { categoryId: 3, name: "Terusan Anak", nameEn: "Children's Dress", notes: "Dry Clean", notesEn: "Dry Clean", price: "40000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 31, isActive: true },
      { categoryId: 3, name: "Terusan Anak", nameEn: "Children's Dress", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 32, isActive: true },
      // Kaos Pendek
      { categoryId: 3, name: "Kaos Pendek", nameEn: "Short Sleeve T-Shirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "35000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 33, isActive: true },
      { categoryId: 3, name: "Kaos Pendek", nameEn: "Short Sleeve T-Shirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "15000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 34, isActive: true },
      // Kaos Panjang
      { categoryId: 3, name: "Kaos Panjang", nameEn: "Long Sleeve T-Shirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "40000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 35, isActive: true },
      { categoryId: 3, name: "Kaos Panjang", nameEn: "Long Sleeve T-Shirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 36, isActive: true },
      // T-Shirt Pendek
      { categoryId: 3, name: "T-Shirt Pendek", nameEn: "Short Sleeve T-Shirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "35000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 37, isActive: true },
      { categoryId: 3, name: "T-Shirt Pendek", nameEn: "Short Sleeve T-Shirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "15000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 38, isActive: true },
      // T-Shirt Panjang
      { categoryId: 3, name: "T-Shirt Panjang", nameEn: "Long Sleeve T-Shirt", notes: "Dry Clean", notesEn: "Dry Clean", price: "40000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 39, isActive: true },
      { categoryId: 3, name: "T-Shirt Panjang", nameEn: "Long Sleeve T-Shirt", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 40, isActive: true },
      // Jaket
      { categoryId: 3, name: "Jaket", nameEn: "Jacket", notes: "Dry Clean", notesEn: "Dry Clean", price: "50000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 41, isActive: true },
      { categoryId: 3, name: "Jaket", nameEn: "Jacket", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "25000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 42, isActive: true },
      // Sejadah Besar
      { categoryId: 3, name: "Sejadah Besar", nameEn: "Large Prayer Mat", notes: "Dry Clean", notesEn: "Dry Clean", price: "50000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 43, isActive: true },
      { categoryId: 3, name: "Sejadah Besar", nameEn: "Large Prayer Mat", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "30000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 44, isActive: true },
      // Sejadah Kecil
      { categoryId: 3, name: "Sejadah Kecil", nameEn: "Small Prayer Mat", notes: "Dry Clean", notesEn: "Dry Clean", price: "25000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 45, isActive: true },
      { categoryId: 3, name: "Sejadah Kecil", nameEn: "Small Prayer Mat", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "15000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 46, isActive: true },
      // Jilbab Dewasa/Kerudung
      { categoryId: 3, name: "Jilbab Dewasa/Kerudung", nameEn: "Adult Hijab/Headscarf", notes: "Dry Clean", notesEn: "Dry Clean", price: "20000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 47, isActive: true },
      { categoryId: 3, name: "Jilbab Dewasa/Kerudung", nameEn: "Adult Hijab/Headscarf", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "10000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 48, isActive: true },
      // Jilbab Anak/Kerudung
      { categoryId: 3, name: "Jilbab Anak/Kerudung", nameEn: "Children's Hijab/Headscarf", notes: "Dry Clean", notesEn: "Dry Clean", price: "10000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 49, isActive: true },
      { categoryId: 3, name: "Jilbab Anak/Kerudung", nameEn: "Children's Hijab/Headscarf", notes: "Laundry Khusus (Tanpa Hanger)", notesEn: "Special Laundry (Without Hanger)", price: "5000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 50, isActive: true },
      // Single items in Category 3 (only Dry Clean provided in JSON)
      { categoryId: 3, name: "Jas Anak", nameEn: "Children's Suit", notes: "Dry Clean", notesEn: "Dry Clean", price: "30000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 51, isActive: true },
      { categoryId: 3, name: "Jas Panjang", nameEn: "Long Suit", notes: "Dry Clean", notesEn: "Dry Clean", price: "50000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 52, isActive: true },
      // Gaun Pengantin
      { categoryId: 3, name: "Gaun Pengantin", nameEn: "Wedding Gown", notes: "Dry Clean", notesEn: "Dry Clean", price: "100000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 53, isActive: true },
      // Tenun
      { categoryId: 3, name: "Tenun Panjang", nameEn: "Long Traditional Woven Fabric", notes: "Dry Clean", notesEn: "Dry Clean", price: "45000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 54, isActive: true },
      { categoryId: 3, name: "Tenun Pendek", nameEn: "Short Traditional Woven Fabric", notes: "Dry Clean", notesEn: "Dry Clean", price: "40000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 55, isActive: true },
      // Toga
      { categoryId: 3, name: "Toga Dewasa", nameEn: "Adult Graduation Gown", notes: "Dry Clean", notesEn: "Dry Clean", price: "60000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 56, isActive: true },
      { categoryId: 3, name: "Toga Anak", nameEn: "Children's Graduation Gown", notes: "Dry Clean", notesEn: "Dry Clean", price: "30000", unit: "Pcs", unitEn: "Pcs", durationText: "1-2 hari", durationTextEn: "1-2 days", sortOrder: 57, isActive: true },
    ],
    perfumeCategories: [
      { name: "Premium", nameEn: "Premium", sortOrder: 1, isActive: true },
      { name: "Celebrity", nameEn: "Celebrity", sortOrder: 2, isActive: true },
      { name: "Fresh", nameEn: "Fresh", sortOrder: 3, isActive: true },
      { name: "Floral", nameEn: "Floral", sortOrder: 4, isActive: true },
      { name: "Sweet", nameEn: "Sweet", sortOrder: 5, isActive: true },
      { name: "Fruity", nameEn: "Fruity", sortOrder: 6, isActive: true },
      { name: "Mysterious", nameEn: "Mysterious", sortOrder: 7, isActive: true },
    ],
    perfumes: [
      // Premium
      { categoryId: 1, name: "Kenzo Batang", nameEn: "Kenzo Batang", popular: true, fabricSafe: true, longLasting: true, premium: true, sortOrder: 1, isActive: true },
      { categoryId: 1, name: "Kenzo Bunga", nameEn: "Kenzo Bunga", popular: true, fabricSafe: true, longLasting: true, premium: true, sortOrder: 2, isActive: true },
      { categoryId: 1, name: "Kenzo Daun", nameEn: "Kenzo Daun", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 3, isActive: true },
      { categoryId: 1, name: "Bulgary", nameEn: "Bulgary", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 4, isActive: true },
      { categoryId: 1, name: "Casablanca", nameEn: "Casablanca", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 5, isActive: true },
      { categoryId: 1, name: "Dunhill", nameEn: "Dunhill", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 6, isActive: true },
      { categoryId: 1, name: "Elegance", nameEn: "Elegance", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 7, isActive: true },
      
      // Celebrity
      { categoryId: 2, name: "Jenifer Lopez Pollo", nameEn: "Jenifer Lopez Pollo", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 8, isActive: true },
      { categoryId: 2, name: "Syahrini", nameEn: "Syahrini", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 9, isActive: true },
      { categoryId: 2, name: "Gold Lavender Angelina Jolie", nameEn: "Gold Lavender Angelina Jolie", popular: true, fabricSafe: true, longLasting: true, premium: true, sortOrder: 10, isActive: true },
      
      // Fresh
      { categoryId: 3, name: "Oxygen", nameEn: "Oxygen", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 11, isActive: true },
      { categoryId: 3, name: "Aqua Fresh Green Tea", nameEn: "Aqua Fresh Green Tea", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 12, isActive: true },
      { categoryId: 3, name: "The Blue Akasia", nameEn: "The Blue Akasia", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 13, isActive: true },
      { categoryId: 3, name: "Mint Melati Keraton", nameEn: "Mint Melati Keraton", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 14, isActive: true },
      { categoryId: 3, name: "Molto Blue Atlantic", nameEn: "Molto Blue Atlantic", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 15, isActive: true },
      { categoryId: 3, name: "Kispray", nameEn: "Kispray", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 16, isActive: true },
      { categoryId: 3, name: "Downi", nameEn: "Downi", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 17, isActive: true },
      { categoryId: 3, name: "Jeruk Nipis Kopi", nameEn: "Jeruk Nipis Kopi", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 18, isActive: true },
      
      // Floral
      { categoryId: 4, name: "Lilac", nameEn: "Lilac", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 19, isActive: true },
      { categoryId: 4, name: "Lavender", nameEn: "Lavender", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 20, isActive: true },
      { categoryId: 4, name: "Blossom", nameEn: "Blossom", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 21, isActive: true },
      { categoryId: 4, name: "Forbidden Rose", nameEn: "Forbidden Rose", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 22, isActive: true },
      { categoryId: 4, name: "Soft Lavender", nameEn: "Soft Lavender", popular: true, fabricSafe: true, longLasting: true, premium: false, sortOrder: 23, isActive: true },
      
      // Sweet
      { categoryId: 5, name: "Vanilla", nameEn: "Vanilla", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 24, isActive: true },
      { categoryId: 5, name: "Cuddle", nameEn: "Cuddle", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 25, isActive: true },
      { categoryId: 5, name: "Bubble Gum", nameEn: "Bubble Gum", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 26, isActive: true },
      { categoryId: 5, name: "Baby Berry Miss Cherie", nameEn: "Baby Berry Miss Cherie", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 27, isActive: true },
      
      // Fruity
      { categoryId: 6, name: "Mix Fruit", nameEn: "Mix Fruit", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 28, isActive: true },
      { categoryId: 6, name: "Orange", nameEn: "Orange", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 29, isActive: true },
      { categoryId: 6, name: "Strawberry", nameEn: "Strawberry", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 30, isActive: true },
      { categoryId: 6, name: "Bulbery", nameEn: "Bulbery", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 31, isActive: true },
      { categoryId: 6, name: "Apple Anasui", nameEn: "Apple Anasui", popular: true, fabricSafe: true, longLasting: false, premium: false, sortOrder: 32, isActive: true },
      { categoryId: 6, name: "Shine Apple", nameEn: "Shine Apple", popular: false, fabricSafe: true, longLasting: false, premium: false, sortOrder: 33, isActive: true },
      
      // Mysterious
      { categoryId: 7, name: "Black Magic", nameEn: "Black Magic", popular: false, fabricSafe: true, longLasting: true, premium: true, sortOrder: 34, isActive: true },
    ],
    faqs: [
      {
        question: "Apa yang membedakan Dolphin Laundry dari laundry lainnya?",
        questionEn: "What makes Dolphin Laundry different from other laundries?",
        answer: "🌟 YANG MEMBEDAKAN KAMI: 1) GRATIS parfum premium yang bebas dipilih sendiri oleh pelanggan dari 34+ pilihan aroma eksklusif, 2) Baju cucian Anda dicuci terpisah dan tidak dicampur dengan milik pelanggan lain untuk higienitas maksimal. Inilah keunggulan utama yang tidak akan Anda temukan di tempat lain!",
        answerEn: "🌟 WHAT MAKES US DIFFERENT: 1) FREE premium perfume that customers can choose themselves from 34+ exclusive scent options, 2) Your laundry is washed separately and not mixed with other customers' items for maximum hygiene. These are our main advantages that you won't find anywhere else!",
        sortOrder: 1,
        isActive: true,
      },
      {
        question: "Berapa lama waktu yang dibutuhkan untuk mencuci pakaian?",
        questionEn: "How long does it take to wash clothes?",
        answer: "Untuk laundry reguler, proses memakan waktu 1-2 hari kerja. Kami juga menyediakan layanan express 3 jam untuk kebutuhan mendesak dengan biaya tambahan.",
        answerEn: "For regular laundry, the process takes 1-2 business days. We also provide 3-hour express service for urgent needs with additional charges.",
        sortOrder: 2,
        isActive: true,
      },
      {
        question: "Apakah parfum benar-benar gratis? Apa saja pilihannya?",
        questionEn: "Is the perfume really free? What are the options?",
        answer: "Ya BENAR-BENAR GRATIS! Ini adalah keunggulan utama kami. Kami memiliki 34+ pilihan parfum import berkualitas premium, mulai dari aroma fresh, floral, hingga woody. Yang istimewa: Anda bebas memilih parfum favorit sendiri tanpa biaya tambahan apapun. Tidak ada laundry lain yang memberikan kebebasan ini!",
        answerEn: "Yes, ABSOLUTELY FREE! This is our main advantage. We have 34+ premium imported perfume options, ranging from fresh, floral, to woody scents. What's special: You are free to choose your favorite perfume without any additional cost. No other laundry offers this freedom!",
        sortOrder: 3,
        isActive: true,
      },
      {
        question: "Bagaimana sistem perhitungan harga?",
        questionEn: "How is the pricing system calculated?",
        answer: "Harga dihitung per kilogram dengan minimum 2kg. Laundry reguler mulai Rp 12.000/kg, express 3 jam Rp 45.000/kg. Dry cleaning dan layanan khusus memiliki tarif tersendiri.",
        answerEn: "Prices are calculated per kilogram with a minimum of 2kg. Regular laundry starts at Rp 12,000/kg, 3-hour express Rp 45,000/kg. Dry cleaning and special services have separate rates.",
        sortOrder: 4,
        isActive: true,
      },
      {
        question: "Apakah benar cucian saya tidak dicampur dengan pelanggan lain?",
        questionEn: "Is it true that my laundry is not mixed with other customers?",
        answer: "Ya! Ini adalah komitmen kami yang membedakan dari laundry lain. Setiap baju cucian pelanggan dicuci secara terpisah dan tidak dicampur dengan milik pelanggan lain untuk menjaga higienitas maksimal dan menghindari transfer bakteri atau kotoran. Sistem ini memastikan kebersihan dan keamanan pakaian Anda.",
        answerEn: "Yes! This is our commitment that sets us apart from other laundries. Each customer's laundry is washed separately and not mixed with other customers' items to maintain maximum hygiene and avoid transfer of bacteria or dirt. This system ensures the cleanliness and safety of your clothes.",
        sortOrder: 5,
        isActive: true,
      },
      {
        question: "Bagaimana jaminan keamanan untuk pakaian saya?",
        questionEn: "What guarantee do you provide for my clothes' safety?",
        answer: "Kami menggunakan mesin dan deterjen berkualitas tinggi dengan SOP ketat. Setiap pakaian diberi label dan dicatat. Jika terjadi kerusakan akibat kelalaian kami, akan ada kompensasi sesuai kesepakatan.",
        answerEn: "We use high-quality machines and detergents with strict SOPs. Every garment is labeled and recorded. If damage occurs due to our negligence, there will be compensation according to agreement.",
        sortOrder: 6,
        isActive: true,
      },
      {
        question: "Apakah menerima cuci selimut, boneka, atau barang khusus lainnya?",
        questionEn: "Do you accept washing blankets, stuffed toys, or other special items?",
        answer: "Tentu saja! Kami melayani cuci selimut, boneka, karpet, sepatu, tas, dan barang khusus lainnya. Harga disesuaikan dengan jenis dan tingkat kesulitan pencucian.",
        answerEn: "Of course! We serve washing blankets, stuffed toys, carpets, shoes, bags, and other special items. Prices are adjusted according to the type and difficulty level of washing.",
        sortOrder: 7,
        isActive: true,
      },
      {
        question: "Bagaimana cara memesan layanan antar jemput?",
        questionEn: "How do I order pickup and delivery service?",
        answer: "Sangat mudah! Hubungi kami melalui WhatsApp di 082144500030 atau 081529500130. Tim kami akan membantu koordinasi jadwal antar jemput dan detail pemesanan.",
        answerEn: "Very easy! Contact us via WhatsApp at 082144500030 or 081529500130. Our team will help coordinate pickup and delivery schedules and order details.",
        sortOrder: 8,
        isActive: true,
      },
      {
        question: "Apa jam operasional Dolphin Laundry?",
        questionEn: "What are Dolphin Laundry's operating hours?",
        answer: "Kami buka setiap hari dari jam 05:45 - 22:00 WITA. Untuk layanan antar jemput bisa diatur di luar jam operasional dengan konfirmasi terlebih dahulu.",
        answerEn: "We are open every day from 05:45 - 22:00 WITA. Pickup and delivery services can be arranged outside operating hours with prior confirmation.",
        sortOrder: 9,
        isActive: true,
      },
    ],
    testimonials: [
      {
        customerName: "Sarah Johnson",
        customerRole: "Business Professional",
        content: "Dolphin Laundry has been a lifesaver! Their pickup and delivery service is so convenient, and my clothes always come back spotless.",
        rating: 5,
        displayOrder: 1,
        isActive: true,
      },
      {
        customerName: "Mike Chen",
        customerRole: "Local Resident",
        content: "Best laundry service in town! The staff is friendly, prices are fair, and the quality is outstanding.",
        rating: 5,
        displayOrder: 2,
        isActive: true,
      },
    ],
    locations: [
      {
        name: "Downtown Location",
        address: "123 Main Street",
        city: "Your City",
        state: "CA",
        zipCode: "12345",
        phone: "(555) 123-4567",
        email: "downtown@dolphinlaundry.com",
        hours: "Mon-Sat: 7AM-9PM, Sun: 8AM-6PM",
        displayOrder: 1,
        isActive: true,
      },
    ],
    contacts: [
      {
        type: "whatsapp",
        label: "WhatsApp",
        value: "+6281234567890",
        sortOrder: 1,
        isActive: true,
      },
      {
        type: "instagram",
        label: "Instagram",
        value: "@dolphinlaundry",
        sortOrder: 2,
        isActive: true,
      },
      {
        type: "email",
        label: "Email",
        value: "info@dolphinlaundry.com",
        sortOrder: 3,
        isActive: true,
      },
      {
        type: "phone",
        label: "Phone",
        value: "+62215551234",
        sortOrder: 4,
        isActive: true,
      },
    ],
    homeSections: [
      {
        sectionKey: "hero",
        title: "Welcome to Dolphin Laundry",
        subtitle: "Your Trusted Laundry & Dry Cleaning Service",
        content: "Professional laundry services with pickup and delivery. We make your life easier!",
        ctaText: "Get Started",
        ctaUrl: "/contact",
        isActive: true,
      },
      {
        sectionKey: "services",
        title: "Our Services",
        subtitle: "Comprehensive Laundry Solutions",
        content: "From wash & fold to professional dry cleaning, we've got you covered.",
        isActive: true,
      },
    ],
    siteSettings: [
      {
        config: {
          siteName: "Dolphin Laundry",
          siteDescription: "Professional laundry and dry cleaning services with pickup and delivery",
          primaryColor: "#0066CC",
          secondaryColor: "#00A86B",
          contactEmail: "info@dolphinlaundry.com",
          contactPhone: "(555) 123-4567",
          socialLinks: {
            facebook: "https://facebook.com/dolphinlaundry",
            instagram: "https://instagram.com/dolphinlaundry",
            twitter: "https://twitter.com/dolphinlaundry",
          },
          maintenanceMode: false,
        },
      },
    ],
  };
}
