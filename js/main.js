// Main JavaScript - Kevin Luna Portfolio
// Versión corregida según instrucciones: NO envía mensajes de confirmación

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
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyYAyZJY9Lv-6oMbJiVr1G1zOZ9zArcqkJACA6WV9OJbkDFnc3a9pg6BXLjiZ6op4c/exec';
    
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validar formulario
      if (!this.checkValidity()) {
        this.classList.add('was-validated');
        return;
      }
      
      const submitBtn = this.querySelector('#submitBtn');
      const originalText = submitBtn.innerHTML;
      const formMessage = document.getElementById('formMessage');
      
      // Mostrar estado de carga
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Enviando...';
      submitBtn.disabled = true;
      
      // Recoger datos del formulario
      const formData = {
        nombre: document.getElementById('name').value,
        email: document.getElementById('email').value,
        asunto: document.getElementById('subject').value,
        mensaje: document.getElementById('message').value
      };
      
      try {
        // Enviar datos a Google Apps Script
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
          body: new URLSearchParams(formData).toString()
        });
        
        // Leer la respuesta del servidor
        const result = await response.text();
        
        if (result === "OK") {
          // Éxito: mostrar mensaje de confirmación simplificado
          showFormMessage('success', '¡Mensaje enviado correctamente! Me contactaré contigo pronto.');
          
          // Limpiar formulario
          contactForm.reset();
          contactForm.classList.remove('was-validated');
          
        } else {
          throw new Error('Respuesta inesperada del servidor: ' + result);
        }
        
      } catch (error) {
        console.error('Error:', error);
        showFormMessage('error', 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      } finally {
        // Restaurar botón
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }
      
      function showFormMessage(type, message) {
        formMessage.innerHTML = `
          <div class="alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show" role="alert">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ========== FIX PARA ELEMENTOS QUE DESBORDAN EN MÓVIL ==========
  function fixMobileOverflow() {
    // Asegurar que el body no tenga scroll horizontal
    document.body.style.overflowX = 'hidden';
    
    // Ajustar ancho de secciones específicas
    const wideSections = document.querySelectorAll('.icon-scroller, .tools-section, .resources-section');
    wideSections.forEach(section => {
      section.style.maxWidth = '100vw';
      section.style.width = '100vw';
    });
    
    // Ajustar icon track para móvil
    const iconTrack = document.querySelector('.icon-track');
    if (iconTrack && window.innerWidth < 768) {
      iconTrack.style.animationDuration = '20s';
    }
  }
  
  // Ejecutar al cargar y al redimensionar
  fixMobileOverflow();
  window.addEventListener('resize', fixMobileOverflow);

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
    
    // Forzar recálculo para prevenir scroll horizontal
    setTimeout(() => {
      document.body.style.overflowX = 'hidden';
    }, 100);
    
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
    // Forzar ocultar scroll horizontal
    document.body.style.overflowX = 'hidden';
    
    if (typeof updateNavbar === 'function') {
      updateNavbar();
    }
  }, 250);
});

// ========== REVEAL ON SCROLL ==========
const revealOnScroll = () => {
  const reveals = document.querySelectorAll('.reveal, .project-card, .tool, .reveal-hover');
  const windowHeight = window.innerHeight;
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========== FORMULARIO CONTACTO SIMPLIFICADO ==========
function setupSimpleContactForm() {
  const simpleForm = document.getElementById('contactForm');
  if (!simpleForm) return;
  
  simpleForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const statusMsg = document.getElementById('formMessage');
    statusMsg.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="fas fa-check-circle me-2"></i>
        ✅ Mensaje enviado correctamente.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    
    const btn = this.querySelector('button[type="submit"]');
    btn.disabled = true;
    
    const formData = new FormData(this);
    
    fetch(
      "https://script.google.com/macros/s/AKfycby9EueOwG6L8HuBZkrgho6JMACXFI-iVYL0mIPdqPa9M4w2WIrVqqCn6zH6MZXAdlLjeA/exec",
      {
        method: 'POST',
        body: new URLSearchParams(formData),
        cache: 'no-cache'
      }
    )
    .then(response => response.text())
    .then(result => {
      console.log('Respuesta del servidor:', result);
      if (result !== "OK") {
        statusMsg.innerHTML = `
          <div class="alert alert-warning alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i>
            ⚠️ El mensaje se envió, pero hubo un problema técnico.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;
      }
    })
    .catch(error => {
      console.error('Error completo:', error);
      statusMsg.innerHTML = `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <i class="fas fa-exclamation-triangle me-2"></i>
          Error al enviar: ${error.message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      btn.disabled = false;
    });
    
    // Limpiar formulario después de 3 segundos
    setTimeout(() => {
      this.reset();
      this.classList.remove('was-validated');
      btn.disabled = false;
    }, 3000);
  });
}

// Inicializar formulario simple
document.addEventListener('DOMContentLoaded', setupSimpleContactForm);