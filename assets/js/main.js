/* ============================================================
   HABEX RE — interacciones del prototipo
   ============================================================ */
(function () {
  'use strict';

  /* --- Año dinámico --- */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* --- Nav: estado "scrolled" --- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Menú móvil --- */
  var toggle = document.getElementById('navToggle');
  if (toggle) toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
  document.querySelectorAll('.nav ul a').forEach(function (a) {
    a.addEventListener('click', function () { nav.classList.remove('open'); });
  });

  /* --- Scroll reveal (incluye variantes editoriales) --- */
  // Índices de escalonado para contenedores .stagger
  document.querySelectorAll('.stagger').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.setProperty('--i', i);
    });
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      // Avance de obra: llenar barras al entrar en viewport
      e.target.querySelectorAll('.progress-bar i[data-pct]').forEach(function (bar) {
        bar.style.width = bar.getAttribute('data-pct') + '%';
      });
      io.unobserve(e.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-scale').forEach(function (el) { io.observe(el); });

  /* --- Barra CTA sticky (fichas): aparece tras pasar el hero --- */
  var sticky = document.querySelector('.sticky-cta');
  if (sticky) {
    var trigger = document.querySelector('.dp-hero');
    var so = new IntersectionObserver(function (entries) {
      sticky.classList.toggle('show', !entries[0].isIntersecting);
    }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' });
    if (trigger) so.observe(trigger);
  }

  /* --- Idioma ES / EN --- */
  var current = 'es';
  function setLang(lang) {
    current = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-es]').forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) el.innerHTML = val;
    });
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    try { localStorage.setItem('habex-lang', lang); } catch (e) {}
  }
  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  var saved = null;
  try { saved = localStorage.getItem('habex-lang'); } catch (e) {}
  if (saved && saved !== 'es') setLang(saved);

  /* --- Filtro de categorías (¿Qué buscas?) --- */
  var titles = {
    lotes: { es: 'Lotes de inversión patrimonial', en: 'Patrimonial investment lots' },
    departamentos: { es: 'Departamentos', en: 'Apartments' },
    casas: { es: 'Casas', en: 'Houses' },
    macro: { es: 'Macro terrenos', en: 'Macro land' },
    all: { es: 'Todos los desarrollos', en: 'All properties' }
  };
  function filter(cat) {
    document.querySelectorAll('#devGrid .devcard').forEach(function (card) {
      var show = (cat === 'all' || card.getAttribute('data-cat') === cat);
      if (show) {
        card.style.display = '';
        card.classList.remove('filter-in');
        void card.offsetWidth; // reinicia la animación
        card.classList.add('filter-in');
      } else {
        card.style.display = 'none';
      }
    });
    var t = document.getElementById('catTitle');
    if (t && titles[cat]) {
      t.setAttribute('data-es', titles[cat].es);
      t.setAttribute('data-en', titles[cat].en);
      t.innerHTML = titles[cat][current];
    }
  }
  document.querySelectorAll('.cat[data-filter]').forEach(function (c) {
    c.addEventListener('click', function () { filter(c.getAttribute('data-filter')); });
  });

  /* --- Form (demo). En producción: conectar a backend / Wix Forms / email. --- */
  window.habexSubmit = function (ev) {
    ev.preventDefault();
    var form = ev.target;
    var msg = document.getElementById('formMsg');
    form.querySelectorAll('.invalid').forEach(function (el) { el.classList.remove('invalid'); });
    if (!form.checkValidity()) {
      var first = null;
      form.querySelectorAll('input, textarea').forEach(function (el) {
        if (!el.checkValidity()) { el.classList.add('invalid'); if (!first) first = el; }
      });
      if (msg) {
        msg.className = 'form-msg error';
        msg.textContent = current === 'en'
          ? 'Please complete the required fields correctly.'
          : 'Por favor completa correctamente los campos requeridos.';
        msg.hidden = false;
      }
      if (first) first.focus();
      return false;
    }
    // Arma el mensaje y abre WhatsApp con los datos del formulario
    var nombre = (form.nombre.value || '').trim();
    var email = (form.email.value || '').trim();
    var tel = (form.tel.value || '').trim();
    var mensaje = (form.mensaje.value || '').trim();
    var lines = current === 'en'
      ? ["Hi, I'm " + nombre + '.', email && 'Email: ' + email, tel && 'Phone: ' + tel, mensaje && 'Message: ' + mensaje]
      : ['Hola, soy ' + nombre + '.', email && 'Correo: ' + email, tel && 'Teléfono: ' + tel, mensaje && 'Mensaje: ' + mensaje];
    var text = lines.filter(Boolean).join('\n');
    window.open('https://wa.me/525513423090?text=' + encodeURIComponent(text), '_blank');
    if (msg) {
      msg.className = 'form-msg ok';
      msg.textContent = current === 'en'
        ? "Opening WhatsApp with your message… If it doesn't open, write to us at +52 55 1342 3090."
        : 'Abriendo WhatsApp con tu mensaje… Si no se abre, escríbenos al +52 55 1342 3090.';
      msg.hidden = false;
    }
    return false;
  };
})();
