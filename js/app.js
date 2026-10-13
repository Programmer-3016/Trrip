/**
 * Trrip Traveller App - Main Application Controller
 * Handles view routing (feed vs details), search filters, bookmarks, curated hero carousel, and external actions.
 */

// =========================================================================
// 1. TOAST NOTIFICATION FEEDBACK
// =========================================================================
const feedback = (message) => {
  const existing = document.querySelector("[data-toast]");
  if (existing) existing.remove();
  const toast = document.createElement("div");
  toast.dataset.toast = "";
  toast.textContent = message;
  toast.className = "fixed left-1/2 bottom-24 z-[100] -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-200 border border-slate-700";
  document.body.appendChild(toast);
  window.setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
};

// =========================================================================
// 2. VIEW NAVIGATION: DISCOVERY FEED <-> RESTAURANT DETAILS
// =========================================================================
function openRestaurant(id) {
  const data = restaurantsData[id] || restaurantsData['surya-mahal'];
  state.currentRestaurant = id;

  const titleEl = document.getElementById('detail-title');
  const navTitleEl = document.getElementById('detail-nav-title');
  const subEl = document.getElementById('detail-subtitle');
  const ratingEl = document.getElementById('detail-rating');
  const reviewsEl = document.getElementById('detail-reviews');
  const costEl = document.getElementById('detail-cost');
  const heroImgEl = document.getElementById('detail-hero-img');
  const addressEl = document.getElementById('detail-address');
  const proximityEl = document.getElementById('detail-proximity');
  const hoursEl = document.getElementById('detail-hours');
  const badgeEl = document.getElementById('detail-dietary-badge');

  if (titleEl) titleEl.textContent = data.title;
  if (navTitleEl) navTitleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;
  if (ratingEl) ratingEl.textContent = data.rating;
  if (reviewsEl) reviewsEl.textContent = data.reviews;
  if (costEl) costEl.textContent = data.cost;
  if (heroImgEl) heroImgEl.src = data.heroImg;
  if (addressEl) addressEl.textContent = data.address;
  if (proximityEl) proximityEl.textContent = data.proximity;
  if (hoursEl) hoursEl.textContent = data.hours;
  if (badgeEl) badgeEl.textContent = data.dietary;

  document.getElementById('view-discovery')?.classList.add('hidden');
  document.getElementById('view-detail')?.classList.remove('hidden');

  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    bottomNav.classList.add('hidden');
    bottomNav.classList.add('translate-y-full');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showDiscovery() {
  document.getElementById('view-detail')?.classList.add('hidden');
  document.getElementById('view-discovery')?.classList.remove('hidden');

  const bottomNav = document.getElementById('bottom-nav');
  if (bottomNav) {
    bottomNav.classList.remove('hidden');
    bottomNav.classList.remove('translate-y-full');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchDetailPhoto(src) {
  const heroImg = document.getElementById('detail-hero-img');
  if (heroImg) heroImg.src = src;
}

// =========================================================================
// 3. EXTERNAL ACTIONS: CALL, MAPS & NATIVE SHARE
// =========================================================================
function openMaps() {
  const cur = restaurantsData[state.currentRestaurant] || restaurantsData['surya-mahal'];
  window.open(cur.mapsUrl, '_blank');
}

function callRestaurant() {
  const cur = restaurantsData[state.currentRestaurant] || restaurantsData['surya-mahal'];
  window.location.href = `tel:${cur.phone}`;
}

function shareRestaurant() {
  const cur = restaurantsData[state.currentRestaurant] || restaurantsData['surya-mahal'];
  if (navigator.share) {
    navigator.share({
      title: `${cur.title} in Jaipur`,
      text: `Check out this dining spot on Trrip with 10% OFF!`,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    feedback('Link copied to clipboard!');
  }
}

// =========================================================================
// 4. BOOKMARKING & WISHLIST
// =========================================================================
function toggleBookmark(e, button) {
  e.stopPropagation();
  const icon = button.querySelector(".material-symbols-outlined");
  const saved = icon.textContent.trim() === "bookmark";
  icon.textContent = saved ? "bookmark_added" : "bookmark";
  icon.style.fontVariationSettings = saved ? "'FILL' 1" : "'FILL' 0";
  icon.classList.toggle("text-primary", saved);
  feedback(saved ? "Saved to your dining wishlist" : "Removed from saved places");
}

// =========================================================================
// 5. DYNAMIC HERO CAROUSEL CONTROLLER
// =========================================================================
let currentCuratedIndex = 0;
let curatedTimer = null;
let frontImgActive = true;

// Preload slide images
curatedSlides.forEach(slide => {
  const img = new Image();
  img.src = slide.img;
});

function renderCuratedSlide(index) {
  const slide = curatedSlides[index];
  if (!slide) return;

  const frontImg = document.getElementById('curated-img-front');
  const backImg = document.getElementById('curated-img-back');
  const textContainer = document.getElementById('curated-text-container');

  if (frontImg && backImg) {
    if (frontImgActive) {
      backImg.src = slide.img;
      backImg.alt = slide.alt;
      backImg.classList.remove('opacity-0');
      backImg.classList.add('opacity-100');
      frontImg.classList.remove('opacity-100');
      frontImg.classList.add('opacity-0');
      frontImgActive = false;
    } else {
      frontImg.src = slide.img;
      frontImg.alt = slide.alt;
      frontImg.classList.remove('opacity-0');
      frontImg.classList.add('opacity-100');
      backImg.classList.remove('opacity-100');
      backImg.classList.add('opacity-0');
      frontImgActive = true;
    }
  }

  if (textContainer) {
    textContainer.classList.add('opacity-0');
    setTimeout(() => {
      const tagEl = document.getElementById('curated-banner-tag');
      const titleEl = document.getElementById('curated-banner-title');
      const perkEl = document.getElementById('curated-banner-perk');
      if (tagEl) tagEl.textContent = slide.tag;
      if (titleEl) titleEl.textContent = slide.title;
      if (perkEl) perkEl.innerHTML = slide.perk;
      textContainer.classList.remove('opacity-0');
    }, 150);
  }

  curatedSlides.forEach((_, i) => {
    const dot = document.getElementById(`curated-dot-${i}`);
    if (dot) {
      if (i === index) {
        dot.className = 'block w-4 h-1.5 rounded-full bg-teal-400 transition-all duration-300';
      } else {
        dot.className = 'block w-1.5 h-1.5 rounded-full bg-white/40 hover:bg-white/70 transition-all duration-300';
      }
    }
  });
}

function setCuratedSlide(index, event) {
  if (event) event.stopPropagation();
  currentCuratedIndex = index;
  renderCuratedSlide(currentCuratedIndex);
  restartCuratedAutoSlide();
}

function handleCuratedCardClick() {
  const slide = curatedSlides[currentCuratedIndex];
  if (slide && slide.id) {
    openRestaurant(slide.id);
  }
}

function startCuratedAutoSlide() {
  stopCuratedAutoSlide();
  curatedTimer = setInterval(() => {
    currentCuratedIndex = (currentCuratedIndex + 1) % curatedSlides.length;
    renderCuratedSlide(currentCuratedIndex);
  }, 3500);
}

function stopCuratedAutoSlide() {
  if (curatedTimer) {
    clearInterval(curatedTimer);
    curatedTimer = null;
  }
}

function restartCuratedAutoSlide() {
  stopCuratedAutoSlide();
  startCuratedAutoSlide();
}

// =========================================================================
// 6. INITIALIZATION & EVENT LISTENERS
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Back to discovery button
  const backBtn = document.getElementById('btn-back-to-discovery');
  if (backBtn) backBtn.addEventListener('click', showDiscovery);

  // Audit modal trigger
  const btnAudit = document.getElementById('btn-open-audit');
  if (btnAudit) {
    btnAudit.addEventListener('click', () => {
      setScrollLock(true);
      document.getElementById('audit-modal')?.classList.remove('hidden');
    });
  }

  // Entire restaurant card click opens details
  document.querySelectorAll('article.restaurant-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('button[data-card-action="book"]') || 
          e.target.closest('button[aria-label="Save Restaurant"]')) {
        return;
      }
      const id = card.dataset.restaurant || 'surya-mahal';
      openRestaurant(id);
    });
  });

  // Action buttons on card
  document.querySelectorAll("[data-card-action]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const card = button.closest("article");
      const id = card ? card.dataset.restaurant : 'surya-mahal';
      if (button.dataset.cardAction === "book") {
        const name = card ? card.querySelector("h4")?.textContent.trim() : 'Surya Mahal';
        openBookingModal(name || 'Surya Mahal', '10% OFF');
      } else {
        openRestaurant(id);
      }
    });
  });

  // Bookmark toggle buttons on feed cards
  document.querySelectorAll("article button[aria-label='Save Restaurant']").forEach((button) => {
    button.addEventListener("click", (event) => {
      toggleBookmark(event, button);
    });
  });

  // Search input filter
  const search = document.querySelector("#search-input");
  const cards = [...document.querySelectorAll("article.restaurant-card")];
  if (search) {
    search.addEventListener("input", (event) => {
      const term = event.target.value.toLowerCase().trim();
      cards.forEach((card) => {
        card.classList.toggle("hidden", term && !card.textContent.toLowerCase().includes(term));
      });
    });
  }

  // Micro-Filter rail chips
  document.querySelectorAll("[data-filter-chip]").forEach((button) => {
    button.addEventListener("click", () => {
      const filterType = button.dataset.filter;
      button.classList.toggle("bg-teal-50");
      button.classList.toggle("border-teal-600/30");
      button.classList.toggle("text-primary");
      button.classList.toggle("font-bold");

      const cardEls = document.querySelectorAll("article.restaurant-card");
      if (filterType === 'veg') {
        const isActive = button.classList.contains("bg-teal-50");
        cardEls.forEach(c => {
          if (isActive && c.dataset.restaurant !== 'surya-mahal') {
            c.classList.add('opacity-40');
          } else {
            c.classList.remove('opacity-40');
          }
        });
        feedback(isActive ? "Showing Pure Veg options in Jaipur" : "Showing all options");
      } else if (filterType === 'top') {
        const isActive = button.classList.contains("bg-teal-50");
        cardEls.forEach(c => {
          if (isActive && c.dataset.restaurant === 'retreat-bar') {
            c.classList.add('opacity-40');
          } else {
            c.classList.remove('opacity-40');
          }
        });
        feedback(isActive ? "Filtered by 4.4+ star ratings" : "Showing all ratings");
      }
    });
  });

  // Curated hero banner touch & hover listeners
  const curatedBannerCard = document.getElementById('curated-banner-card');
  if (curatedBannerCard) {
    curatedBannerCard.addEventListener('mouseenter', stopCuratedAutoSlide);
    curatedBannerCard.addEventListener('mouseleave', startCuratedAutoSlide);

    let touchStartX = 0;
    curatedBannerCard.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopCuratedAutoSlide();
    }, { passive: true });

    curatedBannerCard.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40) {
        currentCuratedIndex = (currentCuratedIndex + 1) % curatedSlides.length;
        renderCuratedSlide(currentCuratedIndex);
      } else if (touchEndX > touchStartX + 40) {
        currentCuratedIndex = (currentCuratedIndex - 1 + curatedSlides.length) % curatedSlides.length;
        renderCuratedSlide(currentCuratedIndex);
      }
      startCuratedAutoSlide();
    }, { passive: true });
  }

  // Scroll-aware Bottom Navigation
  let lastScrollY = window.scrollY;
  const scrollDelta = 8;
  window.addEventListener('scroll', () => {
    const bottomNav = document.getElementById('bottom-nav');
    if (!bottomNav) return;

    if (document.getElementById('view-discovery')?.classList.contains('hidden')) {
      return;
    }

    const currentScrollY = window.scrollY;
    if (currentScrollY <= 40) {
      bottomNav.classList.remove('translate-y-full');
      lastScrollY = currentScrollY;
      return;
    }

    if (currentScrollY > lastScrollY + scrollDelta) {
      bottomNav.classList.add('translate-y-full');
    } else if (currentScrollY < lastScrollY - scrollDelta) {
      bottomNav.classList.remove('translate-y-full');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // Start auto slide
  startCuratedAutoSlide();
});
