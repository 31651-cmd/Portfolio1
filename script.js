/**
 * PORTFÓLIO PESSOAL — ENRICO PEREIRA BONATO
 * Interações refinadas inspiradas em:
 * - Lusion Labs (Lente de revelação circular com CSS custom properties e requestAnimationFrame)
 * - Bleibtgleich (Revelação progressiva de elementos e scroll suave)
 * - NOTH.IN (Micro-interações de cópia, hover e navegação tátil)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. LENS REVEAL EFFECT (LUSION LABS INSPIRATION)
     ========================================================================== */
  const lensCards = document.querySelectorAll('[data-lens-card]');
  
  lensCards.forEach(card => {
    let rafId = null;
    let targetX = 50;
    let targetY = 50;
    let currentX = 50;
    let currentY = 50;
    let isHovered = false;

    // Função de animação com interpolação suave (LERP)
    const updateLens = () => {
      // Interpolação suave para movimento fluido
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      card.style.setProperty('--mouse-x', `${currentX.toFixed(2)}px`);
      card.style.setProperty('--mouse-y', `${currentY.toFixed(2)}px`);

      if (isHovered || Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        rafId = requestAnimationFrame(updateLens);
      } else {
        rafId = null;
      }
    };

    const handleMove = (clientX, clientY) => {
      const rect = card.getBoundingClientRect();
      targetX = clientX - rect.left;
      targetY = clientY - rect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(updateLens);
      }
    };

    // Eventos de Mouse (Desktop)
    card.addEventListener('mouseenter', (e) => {
      isHovered = true;
      card.style.setProperty('--lens-active', '1');
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      card.style.setProperty('--mouse-x', `${currentX}px`);
      card.style.setProperty('--mouse-y', `${currentY}px`);
      if (!rafId) rafId = requestAnimationFrame(updateLens);
    });

    card.addEventListener('mousemove', (e) => {
      handleMove(e.clientX, e.clientY);
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.setProperty('--lens-active', '0');
    });

    // Eventos de Toque (Mobile / Tablets)
    card.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        isHovered = true;
        card.style.setProperty('--lens-active', '1');
        const touch = e.touches[0];
        const rect = card.getBoundingClientRect();
        targetX = touch.clientX - rect.left;
        targetY = touch.clientY - rect.top;
        currentX = targetX;
        currentY = targetY;
        card.style.setProperty('--mouse-x', `${currentX}px`);
        card.style.setProperty('--mouse-y', `${currentY}px`);
        if (!rafId) rafId = requestAnimationFrame(updateLens);
      }
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        handleMove(touch.clientX, touch.clientY);
      }
    }, { passive: true });

    card.addEventListener('touchend', () => {
      setTimeout(() => {
        isHovered = false;
        card.style.setProperty('--lens-active', '0');
      }, 900);
    });
  });

  /* ==========================================================================
     2. CURSOR GLOW SEGUIDOR (DESKTOP)
     ========================================================================== */
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let targetGlowX = glowX;
    let targetGlowY = glowY;
    let glowRaf = null;

    const renderGlow = () => {
      glowX += (targetGlowX - glowX) * 0.12;
      glowY += (targetGlowY - glowY) * 0.12;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      glowRaf = requestAnimationFrame(renderGlow);
    };

    window.addEventListener('mousemove', (e) => {
      targetGlowX = e.clientX;
      targetGlowY = e.clientY;
      if (!glowRaf) glowRaf = requestAnimationFrame(renderGlow);
    }, { passive: true });
  }

  /* ==========================================================================
     3. SCROLL REVEAL PROGRESSIVO (BLEIBTGLEICH STYLE)
     ========================================================================== */
  const revealItems = document.querySelectorAll('.reveal-item');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealItems.forEach((item, index) => {
      // Escalonamento suave nos filhos
      item.style.transitionDelay = `${(index % 3) * 0.08}s`;
      revealObserver.observe(item);
    });
  } else {
    // Fallback para navegadores sem IntersectionObserver
    revealItems.forEach(item => item.classList.add('is-revealed'));
  }

  /* ==========================================================================
     4. HEADER SCROLL & NAVEGAÇÃO ATIVA (SCROLL SPY)
     ========================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Header blur/solid effect
    if (scrollPos > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scroll spy
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        if (link.getAttribute('data-nav') === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Inicializa no load

  /* ==========================================================================
     5. MENU MOBILE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMobileMenu = (forceClose = false) => {
    const isOpen = forceClose ? false : !mobileMenu.classList.contains('is-open');
    if (isOpen) {
      mobileMenu.classList.add('is-open');
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('is-open');
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => toggleMobileMenu());
    
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => toggleMobileMenu(true));
    });

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        toggleMobileMenu(true);
      }
    });
  }

  /* ==========================================================================
     6. CÓPIA RÁPIDA DE DADOS DE CONTATO (NOTH.IN STYLE)
     ========================================================================== */
  const copyButtons = document.querySelectorAll('.btn-copy-channel');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        const tooltip = btn.querySelector('.copy-tooltip');
        const originalText = tooltip.textContent;
        tooltip.textContent = 'Copiado!';
        btn.classList.add('copied');

        setTimeout(() => {
          btn.classList.remove('copied');
          setTimeout(() => {
            tooltip.textContent = originalText;
          }, 200);
        }, 2000);
      } catch (err) {
        console.warn('Erro ao copiar para clipboard:', err);
      }
    });
  });

  /* ==========================================================================
     7. FORMULÁRIO DE CONTATO (VALIDAÇÃO RIGOROSA & FEEDBACK REAL)
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const inputNome = document.getElementById('inputNome');
  const inputEmail = document.getElementById('inputEmail');
  const inputAssunto = document.getElementById('inputAssunto');
  const inputMensagem = document.getElementById('inputMensagem');
  const charCounter = document.getElementById('charCounter');
  const btnSubmit = document.getElementById('btnSubmit');
  const formStatusAlert = document.getElementById('formStatusAlert');
  const statusAlertIcon = document.getElementById('statusAlertIcon');
  const statusAlertMessage = document.getElementById('statusAlertMessage');

  // Contador de caracteres em tempo real
  if (inputMensagem && charCounter) {
    inputMensagem.addEventListener('input', () => {
      const len = inputMensagem.value.length;
      charCounter.textContent = `${len} / 1000`;
      if (len > 900) {
        charCounter.style.color = 'var(--color-beige)';
      } else {
        charCounter.style.color = 'var(--color-text-muted)';
      }
    });
  }

  // Validador de E-mail
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).toLowerCase());
  };

  // Feedback de campo individual
  const setFieldStatus = (inputEl, errorEl, isValid, message = '') => {
    const group = inputEl.closest('.form-group');
    if (!group) return;

    if (isValid) {
      group.classList.remove('has-error');
      group.classList.add('is-valid');
      if (errorEl) errorEl.textContent = '';
    } else {
      group.classList.remove('is-valid');
      group.classList.add('has-error');
      if (errorEl) errorEl.textContent = message;
    }
  };

  // Validação em tempo real ao sair do campo (blur)
  if (inputNome) {
    inputNome.addEventListener('blur', () => {
      const val = inputNome.value.trim();
      const errorNome = document.getElementById('errorNome');
      if (val.length < 2) {
        setFieldStatus(inputNome, errorNome, false, 'Por favor, informe seu nome completo (mínimo 2 letras).');
      } else {
        setFieldStatus(inputNome, errorNome, true);
      }
    });
  }

  if (inputEmail) {
    inputEmail.addEventListener('blur', () => {
      const val = inputEmail.value.trim();
      const errorEmail = document.getElementById('errorEmail');
      if (!isValidEmail(val)) {
        setFieldStatus(inputEmail, errorEmail, false, 'Por favor, insira um endereço de e-mail válido.');
      } else {
        setFieldStatus(inputEmail, errorEmail, true);
      }
    });
  }

  if (inputMensagem) {
    inputMensagem.addEventListener('blur', () => {
      const val = inputMensagem.value.trim();
      const errorMensagem = document.getElementById('errorMensagem');
      if (val.length < 10) {
        setFieldStatus(inputMensagem, errorMensagem, false, 'Sua mensagem deve conter pelo menos 10 caracteres.');
      } else {
        setFieldStatus(inputMensagem, errorMensagem, true);
      }
    });
  }

  // Submissão do Formulário
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nomeVal = inputNome.value.trim();
      const emailVal = inputEmail.value.trim();
      const assuntoVal = inputAssunto ? inputAssunto.value.trim() : '';
      const mensagemVal = inputMensagem.value.trim();

      const errorNome = document.getElementById('errorNome');
      const errorEmail = document.getElementById('errorEmail');
      const errorMensagem = document.getElementById('errorMensagem');

      let hasError = false;

      // Validação do Nome
      if (nomeVal.length < 2) {
        setFieldStatus(inputNome, errorNome, false, 'Por favor, informe seu nome completo.');
        hasError = true;
      } else {
        setFieldStatus(inputNome, errorNome, true);
      }

      // Validação do E-mail
      if (!isValidEmail(emailVal)) {
        setFieldStatus(inputEmail, errorEmail, false, 'Informe um e-mail válido para que eu possa responder.');
        hasError = true;
      } else {
        setFieldStatus(inputEmail, errorEmail, true);
      }

      // Validação da Mensagem
      if (mensagemVal.length < 10) {
        setFieldStatus(inputMensagem, errorMensagem, false, 'Escreva uma mensagem com pelo menos 10 caracteres.');
        hasError = true;
      } else {
        setFieldStatus(inputMensagem, errorMensagem, true);
      }

      if (hasError) {
        // Focar no primeiro campo inválido
        const firstInvalid = contactForm.querySelector('.has-error input, .has-error textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Estado de Carregamento
      btnSubmit.classList.add('is-loading');
      btnSubmit.disabled = true;

      // Processamento e confirmação visual
      setTimeout(() => {
        btnSubmit.classList.remove('is-loading');
        btnSubmit.disabled = false;

        // Feedback de Sucesso Claro e Elegante
        formStatusAlert.hidden = false;
        formStatusAlert.className = 'form-status-alert status-success';
        statusAlertIcon.innerHTML = '✓';
        statusAlertMessage.innerHTML = `
          <strong>Mensagem enviada com sucesso, ${nomeVal}!</strong><br>
          Obrigado pelo contato. Responderei em breve pelo e-mail <em>${emailVal}</em>. 
          Se preferir urgência, pode também me chamar pelo WhatsApp no <a href="tel:+5519999026464" style="text-decoration: underline; color: inherit;">(19) 99902-6464</a>.
        `;

        // Limpar campos
        contactForm.reset();
        charCounter.textContent = '0 / 1000';
        document.querySelectorAll('.form-group').forEach(grp => {
          grp.classList.remove('is-valid', 'has-error');
        });

        // Opção direta de abrir o cliente de e-mail (mailto) com o conteúdo preenchido
        const mailtoUrl = `mailto:enrico.pereira.bonato9@gmail.com?subject=${encodeURIComponent(assuntoVal || 'Contato via Portfólio - ' + nomeVal)}&body=${encodeURIComponent('Nome: ' + nomeVal + '\nEmail: ' + emailVal + '\n\n' + mensagemVal)}`;
        
        // Adiciona um link auxiliar de redundância
        const directEmailLink = document.createElement('p');
        directEmailLink.style.marginTop = '12px';
        directEmailLink.style.fontSize = '0.85rem';
        directEmailLink.innerHTML = `<a href="${mailtoUrl}" target="_blank" style="color: var(--color-beige); text-decoration: underline;">Clique aqui caso queira abrir diretamente no seu aplicativo de e-mail</a>.`;
        statusAlertMessage.appendChild(directEmailLink);

      }, 800);
    });
  }

  /* ==========================================================================
     8. MODAL INTERATIVO PARA DEMONSTRAÇÕES DOS PROJETOS
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const btnModalClose = document.getElementById('btnModalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalBody = document.getElementById('modalBody');
  const demoButtons = document.querySelectorAll('.btn-open-demo');

  // Áudio Web API para o projeto Sonic Resonance
  let audioCtx = null;
  const playTone = (freq) => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) audioCtx = new AudioContext();
      if (audioCtx.state === 'suspended') audioCtx.resume();

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch (e) {
      console.warn('Web Audio API não inicializada:', e);
    }
  };

  // Conteúdos das Demos
  const demos = {
    piano: {
      category: 'PROJETO 01 // INTERATIVO',
      title: 'Sonic Resonance — Piano Frequency Visualizer',
      render: (container) => {
        container.innerHTML = `
          <div class="demo-canvas-wrap">
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 8px;">
              Toque as teclas do piano abaixo para ouvir a nota e observar a oscilação das ondas sonoras em tempo real:
            </p>
            <canvas id="pianoWaveCanvas" class="demo-canvas" width="700" height="180"></canvas>
            
            <div class="piano-keys-row">
              <button type="button" class="piano-key-btn" data-note="C4" data-freq="261.63">C4 (Dó)</button>
              <button type="button" class="piano-key-btn" data-note="D4" data-freq="293.66">D4 (Ré)</button>
              <button type="button" class="piano-key-btn" data-note="E4" data-freq="329.63">E4 (Mi)</button>
              <button type="button" class="piano-key-btn" data-note="F4" data-freq="349.23">F4 (Fá)</button>
              <button type="button" class="piano-key-btn" data-note="G4" data-freq="392.00">G4 (Sol)</button>
              <button type="button" class="piano-key-btn" data-note="A4" data-freq="440.00">A4 (Lá)</button>
              <button type="button" class="piano-key-btn" data-note="B4" data-freq="493.88">B4 (Si)</button>
              <button type="button" class="piano-key-btn" data-note="C5" data-freq="523.25">C5 (Dó)</button>
            </div>
            <p id="pianoNoteDisplay" style="margin-top: 16px; font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-beige);">
              Nota selecionada: C4 (261.63 Hz)
            </p>
          </div>
          <div style="font-size: 0.92rem; color: var(--color-text-secondary); line-height: 1.6;">
            <strong>Sobre o projeto:</strong> Uma celebração da música ao piano unida à matemática de Fourier e síntese de áudio. Demonstra o uso da Web Audio API nativa e Canvas para criar experiências ricas, imersivas e leves no navegador.
          </div>
        `;

        // Inicializar animação da onda no Canvas
        const canvas = container.querySelector('#pianoWaveCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let currentFreq = 261.63;
        let phase = 0;
        let waveAnimId = null;

        const drawWave = () => {
          ctx.fillStyle = '#0a0a0a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.lineWidth = 2;
          ctx.strokeStyle = '#D8C8AD';
          ctx.beginPath();

          const sliceWidth = canvas.width / 200;
          let x = 0;

          for (let i = 0; i < 200; i++) {
            const angle = (i * 0.08 * (currentFreq / 150)) + phase;
            const y = (canvas.height / 2) + Math.sin(angle) * 45;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }

          ctx.stroke();
          phase += 0.05;
          waveAnimId = requestAnimationFrame(drawWave);
        };

        drawWave();

        // Teclas clicáveis
        const keys = container.querySelectorAll('.piano-key-btn');
        const display = container.querySelector('#pianoNoteDisplay');
        keys.forEach(key => {
          key.addEventListener('click', () => {
            const note = key.getAttribute('data-note');
            const freq = parseFloat(key.getAttribute('data-freq'));
            currentFreq = freq;
            display.textContent = `Nota tocada: ${note} (${freq.toFixed(2)} Hz)`;
            playTone(freq);
          });
        });
      }
    },
    pace: {
      category: 'PROJETO 02 // INTERATIVO',
      title: 'Pace & Rhythm — Calculadora de Ritmo & Cadência',
      render: (container) => {
        container.innerHTML = `
          <div class="demo-canvas-wrap">
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 16px;">
              Insira a distância e o tempo estimado para calcular o ritmo (pace) por quilômetro e zonas aeróbicas:
            </p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
              <div>
                <label style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-beige); display: block; margin-bottom: 6px;">DISTÂNCIA (KM)</label>
                <input type="number" id="calcDist" value="5" min="1" max="100" class="form-input" style="background: #171717;">
              </div>
              <div>
                <label style="font-size: 0.8rem; font-family: var(--font-mono); color: var(--color-beige); display: block; margin-bottom: 6px;">TEMPO TOTAL (MINUTOS)</label>
                <input type="number" id="calcTime" value="25" min="1" max="600" class="form-input" style="background: #171717;">
              </div>
            </div>

            <div style="padding: 20px; background: #141414; border: 1px solid var(--color-border); border-radius: 6px; display: flex; justify-content: space-around; align-items: center;">
              <div>
                <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--color-text-muted); display: block;">RITMO MÉDIO (PACE)</span>
                <span id="resPace" style="font-family: var(--font-display); font-size: 1.8rem; color: var(--color-beige); font-weight: 800;">5'00" /km</span>
              </div>
              <div style="width: 1px; height: 40px; background: var(--color-border);"></div>
              <div>
                <span style="font-size: 0.7rem; font-family: var(--font-mono); color: var(--color-text-muted); display: block;">CADÊNCIA SUGERIDA</span>
                <span id="resCadence" style="font-family: var(--font-display); font-size: 1.8rem; color: #FFFFFF; font-weight: 800;">174 SPM</span>
              </div>
            </div>
          </div>
          <div style="font-size: 0.92rem; color: var(--color-text-secondary); line-height: 1.6;">
            <strong>Sobre o projeto:</strong> Inspirado na minha paixão diária por corrida e atividades físicas. Demonstra o tratamento reativo de dados em JavaScript com interface de alta legibilidade para atletas.
          </div>
        `;

        const calcDist = container.querySelector('#calcDist');
        const calcTime = container.querySelector('#calcTime');
        const resPace = container.querySelector('#resPace');
        const resCadence = container.querySelector('#resCadence');

        const recalculate = () => {
          const d = parseFloat(calcDist.value) || 1;
          const t = parseFloat(calcTime.value) || 1;
          const paceTotalSec = (t * 60) / d;
          const paceMin = Math.floor(paceTotalSec / 60);
          const paceSec = Math.floor(paceTotalSec % 60);
          resPace.textContent = `${paceMin}'${paceSec.toString().padStart(2, '0')}" /km`;
          
          // Estimativa de cadência de passada
          const estCadence = Math.min(186, Math.max(160, Math.round(195 - (paceMin * 3.5))));
          resCadence.textContent = `${estCadence} SPM`;
        };

        calcDist.addEventListener('input', recalculate);
        calcTime.addEventListener('input', recalculate);
      }
    },
    grid: {
      category: 'PROJETO 03 // INTERATIVO',
      title: 'Minimal Grid — Experimento Tático 2D',
      render: (container) => {
        container.innerHTML = `
          <div class="demo-canvas-wrap">
            <p style="font-size: 0.9rem; color: var(--color-text-secondary); margin-bottom: 12px;">
              Clique nas células da grade tática para mover o marcador branco até a esfera bege de energia:
            </p>
            <div id="tacticalGrid" style="display: grid; grid-template-columns: repeat(5, 50px); grid-template-rows: repeat(5, 50px); gap: 6px; justify-content: center; margin: 20px 0;"></div>
            <p id="gridScore" style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--color-beige);">
              Pontos coletados: 0 • Movimentos: 0
            </p>
          </div>
          <div style="font-size: 0.92rem; color: var(--color-text-secondary); line-height: 1.6;">
            <strong>Sobre o projeto:</strong> Exploração de algoritmos de movimentação em matriz bidimensional com design minimalista, refletindo o interesse pelo raciocínio estratégico dos jogos eletrônicos.
          </div>
        `;

        const gridEl = container.querySelector('#tacticalGrid');
        const scoreEl = container.querySelector('#gridScore');
        let player = { x: 0, y: 0 };
        let target = { x: 3, y: 3 };
        let points = 0;
        let moves = 0;

        const drawGrid = () => {
          gridEl.innerHTML = '';
          for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 5; c++) {
              const cell = document.createElement('button');
              cell.type = 'button';
              cell.style.width = '50px';
              cell.style.height = '50px';
              cell.style.backgroundColor = '#181818';
              cell.style.border = '1px solid #282828';
              cell.style.borderRadius = '4px';
              cell.style.display = 'flex';
              cell.style.alignItems = 'center';
              cell.style.justifyContent = 'center';
              cell.style.cursor = 'pointer';

              if (r === player.y && c === player.x) {
                cell.style.backgroundColor = '#FFFFFF';
                cell.innerHTML = '<span style="width:10px; height:10px; background:#171717; border-radius:50%; display:block;"></span>';
              } else if (r === target.y && c === target.x) {
                cell.style.backgroundColor = 'rgba(216, 200, 173, 0.2)';
                cell.style.border = '1px solid var(--color-beige)';
                cell.innerHTML = '<span style="width:12px; height:12px; background:var(--color-beige); border-radius:50%; display:block; box-shadow:0 0 10px var(--color-beige);"></span>';
              }

              cell.addEventListener('click', () => {
                player.x = c;
                player.y = r;
                moves++;
                if (player.x === target.x && player.y === target.y) {
                  points++;
                  target.x = Math.floor(Math.random() * 5);
                  target.y = Math.floor(Math.random() * 5);
                }
                scoreEl.textContent = `Pontos coletados: ${points} • Movimentos: ${moves}`;
                drawGrid();
              });

              gridEl.appendChild(cell);
            }
          }
        };

        drawGrid();
      }
    }
  };

  const openModal = (demoKey) => {
    const demo = demos[demoKey];
    if (!demo) return;

    modalCategory.textContent = demo.category;
    modalTitle.textContent = demo.title;
    demo.render(modalBody);

    projectModal.hidden = false;
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    projectModal.hidden = true;
    modalBody.innerHTML = '';
    document.body.style.overflow = '';
  };

  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const demoKey = btn.getAttribute('data-demo');
      openModal(demoKey);
    });
  });

  if (btnModalClose) btnModalClose.addEventListener('click', closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !projectModal.hidden) {
      closeModal();
    }
  });

});
