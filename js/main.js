// Main JavaScript - Kevin Luna Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.getElementById('mainNavbar');
  const hero = document.querySelector('.hero-section');
  const heroHeight = hero ? hero.offsetHeight : 500;

  function updateNavbar() {
    if (window.scrollY > (heroHeight - 120)) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar);
  updateNavbar();

  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.getElementById('backToTop');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Solo procesar enlaces internos
      if (href === '#') return;
      
      if (href.startsWith('#') && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offset = 80;
        
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
        
        // Cerrar menú móvil si está abierto
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      }
    });
  });

  // ========== FORM HANDLING ==========
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Mostrar estado de carga
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Enviando...';
      submitBtn.disabled = true;
      
      // Simular envío (reemplazar con tu lógica real)
      setTimeout(() => {
        // Mostrar mensaje de éxito
        const formMessage = document.getElementById('formMessage');
        if (formMessage) {
          formMessage.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <i class="fas fa-check-circle me-2"></i>
              <strong>¡Mensaje enviado con éxito!</strong> Te responderé en menos de 24 horas.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
        }
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Limpiar formulario
        contactForm.reset();
        
        // Desplazar al mensaje
        if (formMessage) {
          formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1500);
    });
  }

  // ========== PROJECT CARD INTERACTIONS ==========
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ========== TOOLTIP INITIALIZATION ==========
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // ========== LAZY LOADING IMAGES ==========
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========== SCROLL PROGRESS BAR ==========
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ========== PARALLAX EFFECT ==========
  function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }

  window.addEventListener('scroll', parallaxEffect);

  // ========== MOBILE MENU CLOSE ON CLICK ==========
  document.querySelectorAll('.navbar-collapse .nav-link').forEach(link => {
    link.addEventListener('click', function() {
      const navbarCollapse = document.querySelector('.navbar-collapse.show');
      if (navbarCollapse && window.innerWidth < 992) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    });
  });

  // ========== ACTIVE NAV LINK BASED ON SCROLL ==========
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight && navLink) {
        navLink.classList.add('active');
      } else if (navLink) {
        navLink.classList.remove('active');
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);

  // ========== COPYRIGHT YEAR ==========
  const yearElements = document.querySelectorAll('[id*="currentYear"]');
  const currentYear = new Date().getFullYear();
  
  yearElements.forEach(element => {
    element.textContent = currentYear;
  });

  // ========== ICON SCROLLER PAUSE ON HOVER ==========
  const iconTrack = document.querySelector('.icon-track');
  if (iconTrack) {
    iconTrack.addEventListener('mouseenter', () => {
      iconTrack.style.animationPlayState = 'paused';
    });
    
    iconTrack.addEventListener('mouseleave', () => {
      iconTrack.style.animationPlayState = 'running';
    });
  }

  // ========== PAGE TRANSITIONS ==========
  function addPageTransition() {
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.classList.add('page-transition');
    }
  }
  
  addPageTransition();

  // ========== FORM VALIDATION ==========
  const forms = document.querySelectorAll('.needs-validation');
  
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      
      form.classList.add('was-validated');
    }, false);
  });

  // ========== LOADING ANIMATION REMOVAL ==========
  window.addEventListener('load', function() {
    // Remover clase de preload
    document.body.classList.remove('preload');
    
    // Ocultar loader si existe
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 500);
    }
  });

  // ========== ADDITIONAL UTILITIES ==========
  
  // Add hover effect to all scale-on-hover elements
  document.querySelectorAll('.scale-on-hover').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Add animation to elements when they come into view
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });

  // ========== CONSOLE GREETING ==========
  console.log('%c¡Hola! 👋', 'font-size: 18px; font-weight: bold; color: #f6a700;');
  console.log('%cBienvenido al portafolio de Kevin Luna', 'font-size: 14px; color: #666;');
  console.log('%cFull Stack Developer & Data Scientist', 'font-size: 12px; color: #999;');
});

// ========== WINDOW RESIZE HANDLER ==========
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    // Recalcular posiciones después del resize
    if (typeof updateNavbar === 'function') {
      updateNavbar();
    }
  }, 250);
});

// ========== SERVICE WORKER (OPCIONAL) ==========
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('ServiceWorker registrado con éxito: ', registration.scope);
    }).catch(function(err) {
      console.log('Error al registrar ServiceWorker: ', err);
    });
  });
}

// ========== OFFLINE DETECTION ==========
window.addEventListener('online', function() {
  document.body.classList.remove('offline');
  console.log('Conectado a internet');
});

window.addEventListener('offline', function() {
  document.body.classList.add('offline');
  console.log('Sin conexión a internet');
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', function(e) {
  // Ctrl + K para focus en búsqueda (si existe)
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  // Escape para cerrar modales
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      const modalInstance = bootstrap.Modal.getInstance(openModal);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  }
});

// ========== PERFORMANCE MONITORING ==========
if (typeof PerformanceObserver !== 'undefined') {
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(`[Performance] ${entry.name}: ${entry.duration.toFixed(2)}ms`);
    }
  });
  
  perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
}