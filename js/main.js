/**
 * DOMBASTIS - Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

  // Close drawer on clicking any navigation link
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 2. Search Modal Toggle
  const openSearchBtn = document.getElementById('openSearchBtn');
  const closeSearchBtn = document.getElementById('closeSearchBtn');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('active');
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    }
  }

  function closeSearch() {
    if (searchModal) searchModal.classList.remove('active');
  }

  if (openSearchBtn) openSearchBtn.addEventListener('click', openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // Quick tag chips in search modal
  document.querySelectorAll('.search-tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = chip.dataset.query || chip.textContent.trim();
        performSearch(searchInput.value);
      }
    });
  });

  function performSearch(query) {
    if (!query) return;
    const cleanQuery = query.toLowerCase().trim();
    if (cleanQuery.includes('dorper') || cleanQuery.includes('texel') || cleanQuery.includes('merino') || cleanQuery.includes('bibit')) {
      window.location.href = 'index.html#jenis-domba';
    } else if (cleanQuery.includes('mitra') || cleanQuery.includes('investasi') || cleanQuery.includes('bagi hasil')) {
      window.location.href = 'layanan.html#mitra-ternak';
    } else if (cleanQuery.includes('titip') || cleanQuery.includes('qurban') || cleanQuery.includes('aqiqah')) {
      window.location.href = 'layanan.html#titip-ternak';
    } else if (cleanQuery.includes('daging') || cleanQuery.includes('karkas')) {
      window.location.href = 'layanan.html#daging-domba';
    } else if (cleanQuery.includes('kontak') || cleanQuery.includes('lokasi') || cleanQuery.includes('alamat')) {
      window.location.href = 'kontak.html';
    } else {
      window.location.href = `blog.html?q=${encodeURIComponent(query)}`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }

  // 3. Header scroll elevation
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      if (header) header.classList.add('scrolled');
    } else {
      if (header) header.classList.remove('scrolled');
    }
  });

  // 4. FAQ Accordion (for Kontak / Layanan pages)
  document.querySelectorAll('.faq-item-header').forEach(itemHeader => {
    itemHeader.addEventListener('click', () => {
      const parent = itemHeader.parentElement;
      const isOpen = parent.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!isOpen) {
        parent.classList.add('active');
      }
    });
  });

  // 5. Gallery Filters (for Galeri page)
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.opacity = '0';
          setTimeout(() => item.style.display = 'none', 200);
        }
      });
    });
  });

  // 6. Interactive Calculator for Domba Investment (in Layanan page)
  const calcQtyInput = document.getElementById('calcQty');
  const calcBreedSelect = document.getElementById('calcBreed');
  const calcPeriodSelect = document.getElementById('calcPeriod');
  const resultCapital = document.getElementById('resultCapital');
  const resultReturn = document.getElementById('resultReturn');
  const resultNetProfit = document.getElementById('resultNetProfit');

  function updateCalculator() {
    if (!calcQtyInput || !calcBreedSelect || !calcPeriodSelect) return;
    const qty = parseInt(calcQtyInput.value) || 5;
    const breedPrice = parseInt(calcBreedSelect.value) || 2800000;
    const monthlyCareRate = 180000; // Biaya pakan + rawat per bulan
    const periodMonths = parseInt(calcPeriodSelect.value) || 6;
    
    // Perhitungan
    const purchaseCost = qty * breedPrice;
    const totalCareCost = qty * monthlyCareRate * periodMonths;
    const totalCapital = purchaseCost + totalCareCost;
    
    // Est. Bobot & Nilai Jual Panen (Kenaikan bobot 12-15 kg per 6 bulan)
    // Margin keuntungan kemitraan rata-rata 18-24%
    const profitRate = periodMonths === 4 ? 0.16 : (periodMonths === 6 ? 0.22 : 0.35);
    const netProfit = Math.round(totalCapital * profitRate);
    const totalReturn = totalCapital + netProfit;

    if (resultCapital) resultCapital.textContent = formatRupiah(totalCapital);
    if (resultReturn) resultReturn.textContent = formatRupiah(totalReturn);
    if (resultNetProfit) resultNetProfit.textContent = '+ ' + formatRupiah(netProfit);
  }

  function formatRupiah(number) {
    return 'Rp ' + number.toLocaleString('id-ID');
  }

  if (calcQtyInput) calcQtyInput.addEventListener('input', updateCalculator);
  if (calcBreedSelect) calcBreedSelect.addEventListener('change', updateCalculator);
  if (calcPeriodSelect) calcPeriodSelect.addEventListener('change', updateCalculator);
  updateCalculator();

  // 7. Contact WhatsApp Form submit helper
  const contactForm = document.getElementById('dombastisContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nama = document.getElementById('formNama').value;
      const telp = document.getElementById('formTelp').value;
      const layanan = document.getElementById('formLayanan').value;
      const pesan = document.getElementById('formPesan').value;

      const waText = `Halo Dombastis, perkenalkan saya ${nama} (${telp}). Saya ingin bertanya mengenai ${layanan}. Pesan: ${pesan}`;
      const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }
});
