'use strict';

/* ============================================================
   Arcuzo Decor – AlupPure Website JavaScript
   Vanilla JS, no external dependencies
   ============================================================ */

/* ── DOM References ─────────────────────────────────────────── */
const header       = document.getElementById('site-header');
const hamburger    = document.getElementById('hamburger');
const mainNav      = document.getElementById('main-nav');
const siteMain     = document.getElementById('main');
const siteFooter   = document.getElementById('site-footer');
const enquiryForm  = document.getElementById('enquiry-form');
const formNotice   = document.getElementById('form-notice');

/* ── Sticky Header ──────────────────────────────────────────── */
function handleHeaderScroll() {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // run on load

/* ── Mobile Navigation Toggle ───────────────────────────────── */
function setBackgroundInert(isInert) {
  [siteMain, siteFooter].forEach((el) => {
    if (el) el.inert = isInert;
  });
}

function openNav() {
  mainNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // prevent background scroll
  setBackgroundInert(true);
}

function closeNav() {
  mainNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  setBackgroundInert(false);
}

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.contains('open');
  if (isOpen) {
    closeNav();
  } else {
    openNav();
  }
});

// Close nav when a link is clicked
mainNav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    closeNav();
  }
});

// Close nav on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mainNav.classList.contains('open')) {
    closeNav();
    hamburger.focus();
  }
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  if (
    mainNav.classList.contains('open') &&
    !mainNav.contains(e.target) &&
    !hamburger.contains(e.target)
  ) {
    closeNav();
  }
});

// Close the mobile nav if the viewport grows to the desktop layout
window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
  if (e.matches) closeNav();
});

/* ── Smooth Scroll for Anchor Links ─────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Update URL hash without jumping
    history.pushState(null, '', targetId);

    // Move focus to section for accessibility
    if (!targetEl.hasAttribute('tabindex')) {
      targetEl.setAttribute('tabindex', '-1');
    }
    targetEl.focus({ preventScroll: true });
  });
});

/* ── Form Validation Helpers ─────────────────────────────────── */

/**
 * Show an error on a field.
 * @param {HTMLElement} field - The input/select/textarea element.
 * @param {string}      message - Error message to display.
 */
function showFieldError(field, message) {
  const errorEl = document.getElementById(field.getAttribute('aria-describedby'));
  field.classList.add('has-error');
  field.setAttribute('aria-invalid', 'true');
  if (errorEl) {
    errorEl.textContent = message;
  }
}

/**
 * Clear the error state on a field.
 * @param {HTMLElement} field
 */
function clearFieldError(field) {
  const describedBy = field.getAttribute('aria-describedby');
  const errorEl = describedBy ? document.getElementById(describedBy) : null;
  field.classList.remove('has-error');
  field.removeAttribute('aria-invalid');
  if (errorEl) {
    errorEl.textContent = '';
  }
}

/**
 * Validate a single field. Returns true if valid.
 * @param {HTMLElement} field
 * @returns {boolean}
 */
function validateField(field) {
  const value   = field.value.trim();
  const name    = field.id;
  clearFieldError(field);

  // Required check
  if (field.required && value === '') {
    showFieldError(field, 'This field is required.');
    return false;
  }

  // Email format
  if (name === 'field-email' && value !== '') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showFieldError(field, 'Please enter a valid email address.');
      return false;
    }
  }

  // Phone format – at least 10 digits
  if (name === 'field-phone' && value !== '') {
    const digits = value.replace(/[\s\-().+]/g, '');
    if (!/^\d{10,15}$/.test(digits)) {
      showFieldError(field, 'Please enter a valid phone number (at least 10 digits).');
      return false;
    }
  }

  return true;
}

/* ── Live Inline Validation (on blur) ───────────────────────── */
if (enquiryForm) {
  const validatedFields = enquiryForm.querySelectorAll('input, select, textarea');

  validatedFields.forEach((field) => {
    field.addEventListener('blur', () => {
      validateField(field);
    });

    // Clear error as user starts re-typing
    field.addEventListener('input', () => {
      clearFieldError(field);
    });
  });
}

/* ── Form Submission ─────────────────────────────────────────── */
if (enquiryForm) {
  enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all required fields
    const fieldsToValidate = enquiryForm.querySelectorAll(
      'input[required], select[required], textarea[required]'
    );
    let formIsValid = true;
    let firstInvalidField = null;

    fieldsToValidate.forEach((field) => {
      const valid = validateField(field);
      if (!valid) {
        formIsValid = false;
        if (!firstInvalidField) {
          firstInvalidField = field;
        }
      }
    });

    // Focus first invalid field if any
    if (!formIsValid) {
      firstInvalidField.focus();
      return;
    }

    // ── TODO: Replace this block with your backend endpoint ──────────────────
    // When a form backend is available (e.g. Netlify Forms, Formspree, custom API):
    //
    // 1. Add `action="YOUR_ENDPOINT_URL"` and `method="POST"` to the <form> tag,
    //    OR use fetch() here as shown below:
    //
    //   const formData = new FormData(enquiryForm);
    //   fetch('YOUR_ENDPOINT_URL', {
    //     method: 'POST',
    //     body: formData,
    //   })
    //   .then(res => { if (!res.ok) throw new Error('Network error'); return res.json(); })
    //   .then(() => {
    //     // Show success message, reset form
    //   })
    //   .catch(() => {
    //     // Show error message
    //   });
    //
    // 2. For Netlify: add data-netlify="true" attribute to <form>.
    //    Add a hidden input: <input type="hidden" name="form-name" value="enquiry" />
    //
    // 3. For Formspree: set action="https://formspree.io/f/YOUR_FORM_ID" method="POST"
    //
    // Until a backend is configured, the notice below is shown.
    // ── END TODO ─────────────────────────────────────────────────────────────

    // Show the "not yet enabled" notice (do NOT clear form data)
    formNotice.hidden = false;
    formNotice.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    formNotice.focus();
  });
}

/* ── Intersection Observer – Fade-in Animations ─────────────── */
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const fadeEls = document.querySelectorAll('.fade-in');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeEls.forEach((el) => observer.observe(el));
} else {
  // Reduced motion (or no IntersectionObserver): show everything immediately
  fadeEls.forEach((el) => {
    el.classList.add('visible');
  });
}

/* ── Finishes Interactive Palette ────────────────────────────── */
const paletteShowcase = document.getElementById('palette-showcase');

if (paletteShowcase) {
  const filterBtns = paletteShowcase.querySelectorAll('.palette-filter-btn');
  const swatchCards = paletteShowcase.querySelectorAll('.swatch-card');
  const previewChip = document.getElementById('palette-preview-chip');
  const previewName = document.getElementById('palette-preview-name');
  const previewMeta = document.getElementById('palette-preview-meta');

  // Filter button clicks
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      swatchCards.forEach((card) => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });

  // Swatch card clicks
  swatchCards.forEach((card) => {
    card.addEventListener('click', () => {
      swatchCards.forEach((c) => c.classList.remove('active'));
      card.classList.add('active');

      const name = card.dataset.name;
      const finish = card.dataset.finish;
      const desc = card.dataset.desc;
      const bg = card.dataset.bg;

      if (previewName) previewName.textContent = name;
      if (previewMeta) previewMeta.textContent = `${finish} • ${desc}`;
      if (previewChip && bg) {
        previewChip.style.background = bg;
      }
    });
  });
}

/* ── Dynamic Project Gallery ─────────────────────── */
const dynamicGallery = document.querySelector('[data-gallery-dir]');

if (dynamicGallery) {
  const dir    = dynamicGallery.dataset.galleryDir.replace(/\/+$/, '');
  const prefix = dynamicGallery.dataset.galleryPrefix;
  const ext    = dynamicGallery.dataset.galleryExt || 'jpeg';
  const max    = Number(dynamicGallery.dataset.galleryMax || 60);
  const pad    = Number(dynamicGallery.dataset.galleryPad || 2);
  const label  = dynamicGallery.dataset.galleryLabel || prefix;
  const missesAllowed = 3;

  // Human-readable descriptions for the photos currently in the folder.
  // New photos fall back to a generic label automatically.
  const alts = {
    residential: {
      1: "Front elevation of a two-storey residential house with stone cladding, balcony and tiled roof",
      2: "Gated entrance to a residential villa with stone pillars and driveway",
      3: "Residential villa with white walls, arched windows and wrought-iron balcony",
      4: "Stone-clad house front with tall arched windows",
      5: "Residential house viewed through trees and a wrought-iron fence",
      6: "Close-up of a white-framed window with garden reflections",
      7: "Interior French doors and windows beneath a timber ceiling",
      8: "Terrace with white sliding doors, outdoor seating and a glass roof",
      9: "Terrace corner with white French doors and wooden posts",
      10: "Terrace with white French doors and gym equipment",
      11: "Another view of the terrace with white French doors and wooden posts",
      12: "Double-height glazed façade of a residential house under construction",
      13: "Double-height glass wall beneath a timber-clad roof",
      14: "Interior window below a coffered ceiling",
      15: "Full-height glazed wall with protective film during installation",
      16: "Large window overlooking a landscaped garden",
      17: "Sliding window in a newly finished interior",
      18: "Black-framed sliding doors in a residential interior",
      19: "Black-framed sliding doors with a stained-glass fanlight, potted topiary and grey tiled patio",
    },
    commercial: {
      1: "Curved glass meeting room with bronze frames inside a commercial office fit-out",
      2: "Office corridor lined with bronze-framed glass partitions and meeting rooms",
      3: "Bronze-framed glass office partitions with a frosted cityscape film",
      4: "Another view of the curved glass meeting room with bronze frames and a round table",
      5: "Narrow side passage beside black-framed glass walls with paving and lawn",
      6: "Elevation of a commercial building with tall black-framed arched glazing",
      7: "Long commercial hall with polished marble flooring, chandeliers and full-height glazing",
      8: "Side walkway along a black-framed glass wall and landscaped garden",
      9: "Corner view of a white commercial building with black steel-framed glass walls",
    },
  };

  const photos = [];
  let index = 1;
  let misses = 0;

  const renderGallery = () => {
    const fragment = document.createDocumentFragment();

    photos.forEach(({ src, width, height, number }) => {
      const alt = (alts[prefix] && alts[prefix][number]) || `${label} project photo ${number}`;

      const link = document.createElement('a');
      link.className = 'gallery-link';
      link.href = src;
      link.setAttribute('aria-label', `View larger: ${alt}`);

      const img = document.createElement('img');
      img.src = src;
      img.alt = alt;
      img.width = width;
      img.height = height;
      img.loading = 'lazy';

      link.appendChild(img);
      fragment.appendChild(link);
    });

    dynamicGallery.appendChild(fragment);
    dynamicGallery.setAttribute('aria-busy', 'false');
  };

  // Probe the folder one numbered file at a time. Numbering must stay
  // sequential (commercial-01.jpeg, commercial-02.jpeg, ...); probing stops
  // after three consecutive missing numbers so newly added photos appear
  // without editing this page.
  const probeNext = () => {
    if (index > max || misses >= missesAllowed) {
      renderGallery();
      return;
    }

    const number = index;
    const src = `${dir}/${prefix}-${String(number).padStart(pad, '0')}.${ext}`;
    const probe = new Image();

    probe.onload = () => {
      photos.push({ src, width: probe.naturalWidth, height: probe.naturalHeight, number });
      misses = 0;
      index += 1;
      probeNext();
    };

    probe.onerror = () => {
      misses += 1;
      index += 1;
      probeNext();
    };

    probe.src = src;
  };

  probeNext();
}

/* ── Photo Lightbox ────────────────────────────────────────── */
const photoLightbox = document.getElementById('photo-lightbox');

if (photoLightbox) {
  const lightboxImage   = photoLightbox.querySelector('.lightbox-image');
  const lightboxCaption = photoLightbox.querySelector('.lightbox-caption');
  const closeBtn        = photoLightbox.querySelector('.lightbox-close');
  const prevBtn         = photoLightbox.querySelector('.lightbox-prev');
  const nextBtn         = photoLightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  let lastFocused  = null;
  let links        = [];

  function currentLinks() {
    return Array.from(document.querySelectorAll('.project-gallery .gallery-link'));
  }

  function showPhoto(index) {
    links = currentLinks();
    if (!links.length) return;

    currentIndex = (index + links.length) % links.length;
    const link  = links[currentIndex];
    const thumb = link.querySelector('img');

    lightboxImage.src = link.getAttribute('href');
    lightboxImage.alt = thumb ? thumb.alt : '';
    lightboxCaption.textContent = `${currentIndex + 1} / ${links.length}`;
  }

  function openPhoto(index, trigger) {
    lastFocused = trigger || document.activeElement;
    showPhoto(index);
    photoLightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function closePhoto() {
    photoLightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    lightboxImage.removeAttribute('src');
    if (lastFocused) lastFocused.focus();
  }

  // Delegated so photos added to the gallery later still open the viewer
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.project-gallery .gallery-link');
    if (!link) return;
    e.preventDefault();
    links = currentLinks();
    openPhoto(links.indexOf(link), link);
  });

  closeBtn.addEventListener('click', closePhoto);
  prevBtn.addEventListener('click', () => showPhoto(currentIndex - 1));
  nextBtn.addEventListener('click', () => showPhoto(currentIndex + 1));

  // Clicking the dark backdrop (not the image or controls) closes the viewer
  photoLightbox.addEventListener('click', (e) => {
    if (e.target === photoLightbox) closePhoto();
  });

  // Keyboard: Esc closes, arrow keys move between photos, Tab stays inside
  photoLightbox.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      const controls = [closeBtn, prevBtn, nextBtn];
      const first = controls[0];
      const last = controls[controls.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      return;
    }

    if (e.key === 'Escape') {
      closePhoto();
    } else if (e.key === 'ArrowLeft') {
      showPhoto(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showPhoto(currentIndex + 1);
    }
  });
}
