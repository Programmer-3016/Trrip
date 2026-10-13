/**
 * Trrip Traveller App - Modals Controller
 * Handles interactive dialogs: Location picker, Pay Bill simulator, Booking, Hours, Menu, and Gallery.
 */

// Global Scroll Lock Manager to prevent background scroll bleeding
function setScrollLock(locked) {
  if (locked) {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}

// =========================================================================
// 1. NAVIGATION DRAWER
// =========================================================================
function openNavDrawer() {
  const overlay = document.getElementById('nav-drawer-overlay');
  const panel = document.getElementById('nav-drawer-panel');
  const trigger = document.getElementById('btn-hamburger');
  if (overlay && panel) {
    setScrollLock(true);
    overlay.setAttribute('aria-hidden', 'false');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    overlay.classList.remove('hidden');
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0');
      panel.classList.remove('translate-x-full');
      document.getElementById('btn-close-drawer')?.focus();
    });
  }
}

function closeNavDrawer() {
  const overlay = document.getElementById('nav-drawer-overlay');
  const panel = document.getElementById('nav-drawer-panel');
  const trigger = document.getElementById('btn-hamburger');
  if (overlay && panel) {
    overlay.classList.add('opacity-0');
    panel.classList.add('translate-x-full');
    overlay.setAttribute('aria-hidden', 'true');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    setScrollLock(false);
    setTimeout(() => {
      overlay.classList.add('hidden');
      trigger?.focus();
    }, 280);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !document.getElementById('nav-drawer-overlay')?.classList.contains('hidden')) {
    closeNavDrawer();
  }
});

// =========================================================================
// 2. LOCATION PICKER MODAL
// =========================================================================
function openLocationModal() {
  setScrollLock(true);
  document.getElementById('location-modal')?.classList.remove('hidden');
}

function closeLocationModal() {
  setScrollLock(false);
  document.getElementById('location-modal')?.classList.add('hidden');
}

function requestCurrentLocation() {
  const locIcon = document.getElementById('current-location-icon');
  const locText = document.getElementById('current-location-text');
  const locSub = document.getElementById('current-location-sub');

  if (!navigator.geolocation) {
    feedback('GPS geolocation is not supported on this device');
    setExactLocation('C-Scheme, Jaipur');
    return;
  }

  if (locIcon) locIcon.classList.add('animate-spin');
  if (locText) locText.textContent = 'Requesting GPS access...';
  if (locSub) locSub.textContent = 'Please tap "Allow" on your phone prompt';
  feedback('Phone GPS permission requested...');

  navigator.geolocation.getCurrentPosition(
    (position) => {
      if (locIcon) locIcon.classList.remove('animate-spin');
      if (locText) locText.textContent = 'Use Current Location';
      if (locSub) locSub.textContent = 'C-Scheme, Ashok Nagar, Jaipur 302001';

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      setExactLocation('C-Scheme, Jaipur');
      const subEl = document.getElementById('top-bar-subtitle');
      if (subEl) {
        subEl.textContent = `Live GPS (${lat.toFixed(3)}°N, ${lng.toFixed(3)}°E)`;
      }
      feedback(`Live GPS Location accessed (${lat.toFixed(2)}, ${lng.toFixed(2)})`);
    },
    (error) => {
      if (locIcon) locIcon.classList.remove('animate-spin');
      if (locText) locText.textContent = 'Use Current Location';
      if (locSub) locSub.textContent = 'C-Scheme, Ashok Nagar, Jaipur 302001';

      if (error.code === error.PERMISSION_DENIED) {
        feedback('Location permission denied. Defaulted to Jaipur');
      } else {
        feedback('GPS signal weak. Defaulted to Jaipur');
      }
      setExactLocation('C-Scheme, Jaipur');
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}

function setExactLocation(loc) {
  closeLocationModal();
  const topCity = document.getElementById('top-bar-city');
  if (topCity) topCity.textContent = loc;
  
  const drawerLoc = document.getElementById('drawer-location-city');
  if (drawerLoc) drawerLoc.textContent = loc;

  const subEl = document.getElementById('top-bar-subtitle');
  if (subEl) {
    subEl.textContent = subtitleMap[loc] || 'Jaipur Dining Hub';
  }
  feedback('Dining location set to: ' + loc);
}

// =========================================================================
// 3. PAY BILL SIMULATOR MODAL & COUPON ENGINE
// =========================================================================
function openPayBillModal() {
  setScrollLock(true);
  const name = document.getElementById('detail-title')?.textContent || 'Surya Mahal Restaurant';
  const restNameEl = document.getElementById('paybill-restaurant-name');
  if (restNameEl) restNameEl.textContent = name;
  updateBillCalculation();
  document.getElementById('paybill-modal')?.classList.remove('hidden');
}

function closePayBillModal() {
  setScrollLock(false);
  document.getElementById('paybill-modal')?.classList.add('hidden');
}

function copyCouponCode(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  feedback(`Coupon ${code} copied! 10% auto-applied at checkout.`);
}

function setBillAmount(val) {
  const input = document.getElementById('paybill-amount-input');
  if (input) {
    input.value = val;
    updateBillCalculation();
  }
}

function toggleCouponInputBox() {
  const box = document.getElementById('paybill-coupon-input-box');
  const icon = document.getElementById('paybill-toggle-coupon-icon');
  if (box) {
    const isHidden = box.classList.contains('hidden');
    box.classList.toggle('hidden');
    if (icon) {
      icon.textContent = isHidden ? 'expand_less' : 'expand_more';
    }
  }
}

function selectCouponPreset(code) {
  applyCoupon(code);
}

function applyCustomCoupon() {
  const input = document.getElementById('paybill-custom-code-input');
  const code = input ? input.value.trim().toUpperCase() : '';
  if (!code) {
    feedback('Please enter a coupon code');
    return;
  }
  applyCoupon(code);
}

function applyCoupon(code) {
  if (availableCoupons[code]) {
    state.activeCoupon = { ...availableCoupons[code] };
  } else {
    state.activeCoupon = {
      code: code,
      type: 'percent',
      rate: 0.10,
      description: 'Special ' + code + ' discount'
    };
  }

  const input = document.getElementById('paybill-custom-code-input');
  if (input) input.value = '';

  const box = document.getElementById('paybill-coupon-input-box');
  if (box) box.classList.add('hidden');
  const icon = document.getElementById('paybill-toggle-coupon-icon');
  if (icon) icon.textContent = 'expand_more';

  updateBillCalculation();
  feedback(`🎉 Coupon ${code} applied successfully!`);
}

function removeOrApplyCoupon() {
  if (state.activeCoupon) {
    state.activeCoupon = null;
    updateBillCalculation();
    feedback('Coupon removed from this bill');
  } else {
    applyCoupon('TRRIP10');
  }
}

function updateBillCalculation() {
  const input = document.getElementById('paybill-amount-input');
  let amount = parseFloat(input?.value) || 0;
  if (amount < 0) amount = 0;

  let discount = 0;
  const coupon = state.activeCoupon;
  if (coupon) {
    if (coupon.type === 'percent') {
      discount = Math.round(amount * coupon.rate);
    } else if (coupon.type === 'flat') {
      discount = Math.min(amount, coupon.rate);
    }
  }

  const finalTotal = Math.max(0, amount - discount);

  const activeCodeEl = document.getElementById('paybill-active-code');
  const couponSavingsText = document.getElementById('paybill-coupon-savings-text');
  const actionBtn = document.getElementById('paybill-coupon-action-btn');
  const discountLabel = document.getElementById('paybill-discount-label');

  if (coupon) {
    if (activeCodeEl) activeCodeEl.textContent = coupon.code;
    if (couponSavingsText) couponSavingsText.textContent = `Saving ₹${discount.toLocaleString('en-IN')} (${coupon.description})`;
    if (actionBtn) {
      actionBtn.textContent = 'Remove';
      actionBtn.className = 'text-xs font-bold text-rose-600 hover:text-rose-800 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors shrink-0';
    }
    if (discountLabel) discountLabel.textContent = `Coupon Discount (${coupon.code})`;
  } else {
    if (activeCodeEl) activeCodeEl.textContent = 'NO COUPON';
    if (couponSavingsText) couponSavingsText.textContent = 'No coupon applied. Tap to apply TRRIP10.';
    if (actionBtn) {
      actionBtn.textContent = 'Apply TRRIP10';
      actionBtn.className = 'text-xs font-bold text-purple-700 hover:text-purple-900 px-2.5 py-1 rounded-lg bg-white border border-purple-200 hover:bg-purple-50 transition-colors shrink-0';
    }
    if (discountLabel) discountLabel.textContent = 'Coupon Discount';
  }

  if (document.getElementById('paybill-subtotal')) {
    document.getElementById('paybill-subtotal').textContent = '₹' + amount.toLocaleString('en-IN');
  }
  if (document.getElementById('paybill-discount')) {
    document.getElementById('paybill-discount').textContent = coupon ? '-₹' + discount.toLocaleString('en-IN') : '₹0';
  }
  if (document.getElementById('paybill-total')) {
    document.getElementById('paybill-total').textContent = '₹' + finalTotal.toLocaleString('en-IN');
  }
  if (document.getElementById('paybill-savings-badge')) {
    if (coupon && discount > 0) {
      document.getElementById('paybill-savings-badge').textContent = `₹${discount.toLocaleString('en-IN')} (${coupon.type === 'percent' ? (coupon.rate * 100) + '% OFF' : 'FLAT OFF'})`;
    } else {
      document.getElementById('paybill-savings-badge').textContent = '₹0';
    }
  }
  if (document.getElementById('paybill-cta-text')) {
    if (discount > 0) {
      document.getElementById('paybill-cta-text').textContent = `Pay ₹${finalTotal.toLocaleString('en-IN')} & Save ₹${discount.toLocaleString('en-IN')}`;
    } else {
      document.getElementById('paybill-cta-text').textContent = `Pay ₹${finalTotal.toLocaleString('en-IN')}`;
    }
  }
}

function confirmBillPayment() {
  const total = document.getElementById('paybill-total')?.textContent || '₹1,350';
  const discount = document.getElementById('paybill-discount')?.textContent || '-₹150';
  closePayBillModal();
  if (state.activeCoupon) {
    feedback(`Payment of ${total} successful! You saved ${discount.replace('-', '')} with coupon ${state.activeCoupon.code}.`);
  } else {
    feedback(`Payment of ${total} successful!`);
  }
}

// =========================================================================
// 4. TABLE PREBOOKING MODAL
// =========================================================================
function openBookingModal(name, discount) {
  setScrollLock(true);
  state.bookingData.restaurant = name;
  const modalName = document.getElementById('modal-restaurant-name');
  if (modalName) modalName.textContent = name;
  document.getElementById('booking-modal')?.classList.remove('hidden');
}

function closeBookingModal() {
  setScrollLock(false);
  document.getElementById('booking-modal')?.classList.add('hidden');
}

function selectGuests(btn, val) {
  document.querySelectorAll('.guest-btn').forEach(b => {
    b.className = 'guest-btn py-2 rounded-xl border border-slate-200 text-xs font-bold hover:border-primary';
  });
  btn.className = 'guest-btn active py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs';
  state.bookingData.guests = val + (val === '1' ? ' Guest' : ' Guests');
}

function selectSlot(btn, val) {
  document.querySelectorAll('.slot-btn').forEach(b => {
    b.className = 'slot-btn py-2 rounded-xl border border-slate-200 text-xs font-medium hover:border-primary';
  });
  btn.className = 'slot-btn active py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs';
  state.bookingData.slot = val;
}

function confirmBooking() {
  closeBookingModal();
  setScrollLock(true);
  const successRest = document.getElementById('success-restaurant-name');
  const successDetails = document.getElementById('success-details');
  if (successRest) successRest.textContent = state.bookingData.restaurant;
  if (successDetails) successDetails.textContent = `${state.bookingData.guests} • ${state.bookingData.slot}`;
  document.getElementById('success-modal')?.classList.remove('hidden');
}

function closeSuccessModal() {
  setScrollLock(false);
  document.getElementById('success-modal')?.classList.add('hidden');
  feedback('Booking details saved in your profile');
}

// =========================================================================
// 5. OPERATING HOURS MODAL
// =========================================================================
function openHoursModal() {
  setScrollLock(true);
  const name = document.getElementById('detail-title')?.textContent || 'Surya Mahal Restaurant';
  const hoursTitle = document.getElementById('hours-modal-title');
  if (hoursTitle) hoursTitle.textContent = name;
  document.getElementById('hours-modal')?.classList.remove('hidden');
}

function closeHoursModal() {
  setScrollLock(false);
  document.getElementById('hours-modal')?.classList.add('hidden');
}

// =========================================================================
// 6. FULL DIGITAL MENU MODAL
// =========================================================================
function openFullMenuModal() {
  setScrollLock(true);
  document.getElementById('menu-modal')?.classList.remove('hidden');
}

function closeFullMenuModal() {
  setScrollLock(false);
  document.getElementById('menu-modal')?.classList.add('hidden');
}

function filterMenuCategory(category, btn) {
  document.querySelectorAll('.menu-cat-btn').forEach(b => {
    b.className = 'menu-cat-btn px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors';
  });
  btn.className = 'menu-cat-btn active px-3 py-1 rounded-full bg-teal-700 text-white text-xs font-bold shadow-2xs transition-colors';
  const items = document.querySelectorAll('#menu-items-container [data-menu-category]');
  items.forEach(item => {
    if (category === 'all' || item.dataset.menuCategory === category) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// =========================================================================
// 7. AMBIANCE PHOTO GALLERY MODAL
// =========================================================================
function openPhotoGalleryModal() {
  setScrollLock(true);
  document.getElementById('gallery-modal')?.classList.remove('hidden');
}

function closePhotoGalleryModal() {
  setScrollLock(false);
  document.getElementById('gallery-modal')?.classList.add('hidden');
}

// =========================================================================
// 8. UX AUDIT MODAL
// =========================================================================
function openAuditModal() {
  setScrollLock(true);
  document.getElementById('audit-modal')?.classList.remove('hidden');
}

function closeAuditModal() {
  setScrollLock(false);
  document.getElementById('audit-modal')?.classList.add('hidden');
}
