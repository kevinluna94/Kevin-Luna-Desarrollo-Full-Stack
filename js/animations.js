// Animations JavaScript - Kevin Luna Portfolio

class PortfolioAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupIntersectionObserver();
    this.setupParallax();
    this.setupTypewriter();
    this.setupCounterAnimations();
  }

  // ========== SCROLL ANIMATIONS ==========
  setupScrollAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    animatedElements.forEach(el => {
      const animation = el.getAttribute('data-aos');
      const delay = el.getAttribute('data-aos-delay') || 0;
      const duration = el.getAttribute('data-aos-duration') || 800;
      
      el.style.opacity = '0';
      el.style.transition = `all ${duration}ms ease ${delay}ms`;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateElement(el, animation);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(el);
    });
  }

  animateElement(element, animation) {
    element.style.opacity = '1';
    
    switch(animation) {
      case 'fade-up':
        element.style.transform = 'translateY(0)';
        break;
      case 'fade-down':
        element.style.transform = 'translateY(0)';
        break;
      case 'fade-left':
        element.style.transform = 'translateX(0)';
        break;
      case 'fade-right':
        element.style.transform = 'translateX(0)';
        break;
      case 'zoom-in':
        element.style.transform = 'scale(1)';
        break;
      case 'zoom-out':
        element.style.transform = 'scale(1)';
        break;
      case 'flip-left':
        element.style.transform = 'perspective(1000px) rotateY(0)';
        break;
      case 'flip-right':
        element.style.transform = 'perspective(1000px) rotateY(0)';
        break;
    }
  }

  // ========== HOVER EFFECTS ==========
  setupHoverEffects() {
    // 3D Hover Effect for Cards
    document.querySelectorAll('.hover-3d').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });

    // Ripple Effect for Buttons
    document.querySelectorAll('.btn-ripple').forEach(button => {
      button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Glitch Effect on Hover
    document.querySelectorAll('.glitch-on-hover').forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.classList.add('glitching');
        setTimeout(() => {
          this.classList.remove('glitching');
        }, 300);
      });
    });
  }

  // ========== INTERSECTION OBSERVER ==========
  setupIntersectionObserver() {
    // Staggered Animations for Lists
    const staggeredContainers = document.querySelectorAll('.stagger-children');
    
    staggeredContainers.forEach(container => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = container.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.style.animationDelay = `${index * 0.1}s`;
                child.classList.add('animated');
              }, 50);
            });
            observer.unobserve(container);
          }
        });
      }, { threshold: 0.2 });
      
      observer.observe(container);
    });

    // Progress Bar Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
            observer.unobserve(bar);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(bar);
    });
  }

  // ========== PARALLAX EFFECTS ==========
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax-speed') || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ========== TYPEWRITER EFFECT ==========
  setupTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
      const text = element.textContent;
      element.textContent = '';
      element.style.borderRight = '2px solid var(--brand)';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        } else {
          element.style.borderRight = 'none';
        }
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            typeWriter();
            observer.unobserve(element);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(element);
    });
  }

  // ========== COUNTER ANIMATIONS ==========
  setupCounterAnimations() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
              current += step;
              if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target;
              }
            };
            
            updateCounter();
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  }

  // ========== PARTICLE BACKGROUND ==========
  createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(246, 167, 0, ${Math.random() * 0.3})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;

        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function connectParticles() {
      const maxDistance = 100;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.strokeStyle = `rgba(246, 167, 0, ${0.1 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      initParticles();
    });

    resizeCanvas();
    initParticles();
    animate();
  }

  // ========== CURSOR EFFECT ==========
  setupCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let cursorDotX = 0;
    let cursorDotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      // Cursor ring
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Cursor dot
      cursorDotX += (mouseX - cursorDotX) * 0.3;
      cursorDotY += (mouseY - cursorDotY) * 0.3;
      cursorDot.style.left = cursorDotX + 'px';
      cursorDot.style.top = cursorDotY + 'px';

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .hover-effect');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorDot.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
      });
    });
  }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const portfolioAnimations = new PortfolioAnimations();
  
  // Optional: Uncomment to enable particle background
  // portfolioAnimations.createParticleBackground();
  
  // Optional: Uncomment to enable custom cursor
  // portfolioAnimations.setupCustomCursor();
});

// ========== PAGE TRANSITIONS ==========
document.addEventListener('DOMContentLoaded', () => {
  // Add fade-in animation to main content
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.style.opacity = '0';
    mainContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      mainContent.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    }, 100);
  }

  // Add loading animation to images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.style.opacity = '0';
      img.addEventListener('load', () => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '1';
      });
    }
  });
});

// ========== SCROLL-BASED ANIMATIONS ==========
window.addEventListener('scroll', () => {
  // Parallax scroll effect
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-speed]');
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-speed');
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });

  // Fade in/out elements based on scroll
  const fadeElements = document.querySelectorAll('.fade-on-scroll');
  fadeElements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight * 0.8) {
      element.classList.add('fade-in');
    } else {
      element.classList.remove('fade-in');
    }
  });
});

// ========== MOBILE MENU ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', () => {
      navbarToggler.classList.toggle('active');
    });
  }
});

// ========== FORM ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
  const formInputs = document.querySelectorAll('.form-control');
  
  formInputs.forEach(input => {
    // Add focus animation
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.parentElement.classList.remove('focused');
      }
    });
    
    // Check if input has value on load
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
});

// ========== LAZY LOAD WITH BLUR EFFECT ==========
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        
        if (src) {
          img.src = src;
          img.classList.add('loaded');
          
          // Remove blur effect after image loads
          img.addEventListener('load', () => {
            img.style.filter = 'none';
          });
        }
        
        observer.unobserve(img);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    // Add blur effect before loading
    img.style.filter = 'blur(10px)';
    img.style.transition = 'filter 0.3s ease';
    
    imageObserver.observe(img);
  });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioAnimations;
}