'use strict';

(function() {
  emailjs.init("0K0-wJv4oWUYm7Pfj"); // Replace with your actual key
})();

/* ====================== THEME TOGGLE ====================== */
const themeToggleBtns = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  html.classList.add('light-theme');
} else {
  html.classList.remove('light-theme');
}

// Toggle theme
themeToggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const isLight = html.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
});

/* ====================== SIDEBAR TOGGLE ====================== */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn?.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

/* ====================== NAVBAR NAVIGATION ====================== */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(link => {
  link.addEventListener('click', function () {
    const targetPage = this.textContent.trim().toLowerCase();

    // Update active link
    navigationLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    // Show target page
    pages.forEach(page => page.classList.remove('active'));
    const target = document.querySelector(`[data-page="${targetPage}"]`);
    if (target) {
      target.classList.add('active');
      // Smooth scroll to section
      window.scrollTo({
        top: target.offsetTop - 120,
        behavior: 'smooth'
      });
    }

    // Close sidebar on mobile
    if (window.innerWidth <= 580) {
      sidebar.classList.remove('active');
    }
  });
});

/* ====================== TESTIMONIALS MODAL ====================== */
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const openTestimonialModal = () => {
  modalContainer.classList.add('active');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeTestimonialModal = () => {
  modalContainer.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
};

testimonialsItems.forEach(item => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    const title = item.querySelector('[data-testimonials-title]');
    const text = item.querySelector('[data-testimonials-text]');

    if (avatar && title && text) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt;
      modalTitle.innerHTML = title.innerHTML;
      modalText.innerHTML = text.innerHTML;
      openTestimonialModal();
    }
  });
});

modalCloseBtn?.addEventListener('click', closeTestimonialModal);
overlay?.addEventListener('click', closeTestimonialModal);

/* ====================== PORTFOLIO FILTER ====================== */
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtns = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

// Mobile dropdown
select?.addEventListener('click', () => select.classList.toggle('active'));

// Close dropdown when clicking outside
document.addEventListener('click', e => {
  if (select && !select.contains(e.target)) {
    select.classList.remove('active');
  }
});

// Filter function - supports multiple categories
function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    const category = item.dataset.category.toLowerCase().split(',').map(c => c.trim());

    if (selectedValue === 'all' || category.includes(selectedValue)) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Desktop filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const value = this.textContent.trim().toLowerCase();
    selectValue && (selectValue.textContent = this.textContent);
    filterFunc(value);

    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// Mobile select items
selectItems.forEach(item => {
  item.addEventListener('click', function () {
    const value = this.textContent.trim().toLowerCase();
    selectValue && (selectValue.textContent = this.textContent);
    select.classList.remove('active');
    filterFunc(value);

    filterBtns.forEach(b => {
      b.classList.toggle('active', b.textContent.trim().toLowerCase() === value);
    });
  });
});

/* ====================== BLOG MODAL ====================== */
const blogTriggers = document.querySelectorAll('[data-blog-trigger]');
const blogModal = document.querySelector('[data-blog-modal]');
const blogOverlay = document.querySelector('[data-blog-overlay]');
const blogCloseBtn = document.querySelector('[data-blog-close-btn]');
const blogModalImg = document.querySelector('[data-blog-modal-img]');
const blogModalTitle = document.querySelector('[data-blog-modal-title]');
const blogModalDate = document.querySelector('[data-blog-modal-date]');
const blogModalText = document.querySelector('[data-blog-modal-text]');

const openBlogModal = () => {
  blogModal.classList.add('active');
  blogOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
};

const closeBlogModal = () => {
  blogModal.classList.remove('active');
  blogOverlay.classList.remove('active');
  document.body.style.overflow = '';
};

blogTriggers.forEach(trigger => {
  trigger.addEventListener('click', function (e) {
    e.preventDefault();
    const item = this.closest('[data-blog-item]');
    const img = item.querySelector('[data-blog-img]');
    const title = item.querySelector('[data-blog-title]');
    const date = item.querySelector('[data-blog-date]');
    const text = item.querySelector('[data-blog-text]');

    if (img && title && date && text) {
      blogModalImg.src = img.src;
      blogModalImg.alt = img.alt;
      blogModalTitle.textContent = title.textContent;
      blogModalDate.textContent = date.textContent;
      blogModalText.innerHTML = `<p>${text.textContent}</p>`;
      openBlogModal();
    }
  });
});

// Close events
blogCloseBtn?.addEventListener('click', closeBlogModal);
blogOverlay?.addEventListener('click', closeBlogModal);
/* ====================== CONTACT FORM ====================== */
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

formInputs.forEach(input => {
  input.addEventListener('input', () => {
    formBtn.disabled = !form.checkValidity();
  });
});

/* ====================== SKILLS PROGRESS ANIMATION ====================== */
function animateProgressBars() {
  document.querySelectorAll('.skill-progress-fill').forEach(bar => {
    const targetWidth = bar.style.width;
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.transition = 'width 0.8s ease';
      bar.style.width = targetWidth;
    }, 100);
  });
}

// Trigger animation when Resume is viewed
const resumeLink = Array.from(navigationLinks).find(l => 
  l.textContent.toLowerCase() === 'resume'
);
if (resumeLink) {
  resumeLink.addEventListener('click', () => {
    setTimeout(animateProgressBars, 400);
  });
}

/* ====================== ON PAGE LOAD ====================== */
document.addEventListener('DOMContentLoaded', () => {
  // Activate "About" by default
  const aboutLink = document.querySelector('[data-nav-link]');
  if (aboutLink && aboutLink.textContent.toLowerCase() === 'about') {
    aboutLink.click();
  }

  // Initialize Portfolio filter to "All"
  const allFilterBtn = document.querySelector('[data-filter-btn]');
  if (allFilterBtn && allFilterBtn.textContent.trim().toLowerCase() === 'all') {
    setTimeout(() => allFilterBtn.click(), 100);
  }

  // Animate skills if Resume is first view (optional)
  if (window.location.hash === '#resume') {
    setTimeout(animateProgressBars, 600);
  }
});

/* ====================== MOBILE THEME TOGGLE VISIBILITY ====================== */
function handleMobileThemeToggle() {
  const mobileToggle = document.querySelector('.navbar .theme-toggle');
  const desktopToggle = document.querySelector('.theme-toggle-header .theme-toggle');
  if (window.innerWidth <= 580) {
    mobileToggle && (mobileToggle.style.display = 'flex');
    desktopToggle && (desktopToggle.style.display = 'none');
  } else {
    mobileToggle && (mobileToggle.style.display = 'none');
    desktopToggle && (desktopToggle.style.display = 'flex');
  }
}

/* ====================== CONTACT FORM SUBMIT WITH EMAILJS ====================== */
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    formBtn.disabled = true;
    formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Sending...</span>';

    const formData = {
      fullname: form.fullname.value,
      email: form.email.value,
      message: form.message.value,
    };

    emailjs
      .send("service_s57ub7a", "template_m9bl98h", formData)
      .then(() => {
        formBtn.innerHTML = '<ion-icon name="checkmark-circle"></ion-icon> <span>Message Sent!</span>';
        form.reset();
        setTimeout(() => {
          formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>';
          formBtn.disabled = true;
        }, 3000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        formBtn.innerHTML = '<ion-icon name="alert-circle"></ion-icon> <span>Failed! Try again</span>';
        setTimeout(() => {
          formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon> <span>Send Message</span>';
          formBtn.disabled = false;
        }, 3000);
      });
  });
}


window.addEventListener('resize', handleMobileThemeToggle);
handleMobileThemeToggle();