'use strict';

/* ============================================================
   Arcuzo Decor – AlupPure Website JavaScript
   Vanilla JS, no external dependencies
   ============================================================ */

/* ── DOM References ─────────────────────────────────────────── */
const header       = document.getElementById('site-header');
const hamburger    = document.getElementById('hamburger');
const mainNav      = document.getElementById('main-nav');
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
function openNav() {
  mainNav.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeNav() {
  mainNav.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
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

/* ── Product Card Expand / Collapse ─────────────────────────── */
document.querySelectorAll('.btn-expand').forEach((btn) => {
  btn.addEventListener('click', () => {
    const controlsId = btn.getAttribute('aria-controls');
    const panel      = document.getElementById(controlsId);
    if (!panel) return;

    const isExpanded = btn.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      // Collapse
      btn.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
    } else {
      // Expand
      btn.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      // Smooth scroll to reveal specs if partially off-screen
      setTimeout(() => {
        const rect = panel.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
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

if (!prefersReducedMotion) {
  const fadeEls = document.querySelectorAll('.fade-in');

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
  // If reduced motion is preferred, make all fade-in elements immediately visible
  document.querySelectorAll('.fade-in').forEach((el) => {
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
