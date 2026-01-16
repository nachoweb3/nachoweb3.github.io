/**
 * Blog UX/UI Enhancements
 * Funcionalidades: Progress bar, Scroll to top, Dark mode, Social share, Reading time
 * Nuevas: Table of Contents, Focus Mode, Reading Progress Indicator, Print Optimization
 */

(function() {
    'use strict';

    // ===== CONFIGURACIÓN =====
    const CONFIG = {
        readingWordsPerMinute: 200,
        tocMinHeadings: 2,
        scrollThreshold: 300,
        toastDuration: 3000
    };

    // ===== UTILIDADES =====

    /**
     * Muestra una notificación toast con tipos
     */
    function showToast(message, type = 'info', duration = CONFIG.toastDuration) {
        let toast = document.querySelector('.toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = `toast show ${type}`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    /**
     * Debounce function para optimizar eventos
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Throttle function para scroll
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Calcula el tiempo de lectura basado en palabras
     */
    function calculateReadingTime() {
        const content = document.querySelector('.post-content');
        if (!content) return;

        const text = content.textContent || content.innerText;
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 palabras por minuto

        const timeElement = document.querySelector('.reading-time');
        if (timeElement) {
            timeElement.textContent = `${readingTime} min de lectura`;
        }
    }

    // ===== READING PROGRESS BAR =====

    function initReadingProgressBar() {
        // Solo en páginas de posts
        if (!document.querySelector('.post')) return;

        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress-bar';
        document.body.appendChild(progressBar);

        function updateProgressBar() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrollTop / documentHeight) * 100;

            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }

        window.addEventListener('scroll', updateProgressBar, { passive: true });
        updateProgressBar(); // Inicializar
    }

    // ===== SCROLL TO TOP BUTTON =====

    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '↑';
        scrollBtn.setAttribute('aria-label', 'Volver arriba');
        document.body.appendChild(scrollBtn);

        function toggleScrollButton() {
            if (window.pageYOffset > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', toggleScrollButton, { passive: true });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        toggleScrollButton(); // Inicializar
    }

    // ===== DARK MODE TOGGLE =====

    function initDarkMode() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙';
        darkModeToggle.setAttribute('aria-label', 'Alternar modo oscuro');
        document.body.appendChild(darkModeToggle);

        // Cargar preferencia guardada
        const currentMode = localStorage.getItem('darkMode');
        if (currentMode === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '☀️';
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');

            const isDarkMode = document.body.classList.contains('dark-mode');
            darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';

            // Guardar preferencia
            localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');

            showToast(isDarkMode ? 'Modo oscuro activado' : 'Modo claro activado', 2000);
        });
    }

    // ===== SOCIAL SHARE BUTTONS =====

    function initSocialShare() {
        const shareContainer = document.querySelector('.post-share');
        if (!shareContainer) return;

        const pageUrl = encodeURIComponent(window.location.href);
        const pageTitle = encodeURIComponent(document.title);

        // Limpiar contenido existente excepto el label
        const shareLabel = shareContainer.querySelector('.share-label');
        shareContainer.innerHTML = '';
        if (shareLabel) {
            shareContainer.appendChild(shareLabel);
        }

        // Crear contenedor de botones
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'social-share-container';

        // Twitter
        const twitterBtn = createShareButton(
            'Twitter',
            `https://twitter.com/intent/tweet?text=${pageTitle}&url=${pageUrl}`,
            'twitter',
            '𝕏'
        );

        // Facebook
        const facebookBtn = createShareButton(
            'Facebook',
            `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
            'facebook',
            'f'
        );

        // LinkedIn
        const linkedinBtn = createShareButton(
            'LinkedIn',
            `https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}`,
            'linkedin',
            'in'
        );

        // WhatsApp
        const whatsappBtn = createShareButton(
            'WhatsApp',
            `https://wa.me/?text=${pageTitle}%20${pageUrl}`,
            'whatsapp',
            '📱'
        );

        // Copiar enlace
        const copyBtn = document.createElement('button');
        copyBtn.className = 'share-button copy-link';
        copyBtn.innerHTML = '🔗 Copiar enlace';
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                copyBtn.innerHTML = '✓ Copiado';
                copyBtn.classList.add('copied');
                showToast('Enlace copiado al portapapeles');

                setTimeout(() => {
                    copyBtn.innerHTML = '🔗 Copiar enlace';
                    copyBtn.classList.remove('copied');
                }, 2000);
            } catch (err) {
                showToast('Error al copiar el enlace');
            }
        });

        buttonsContainer.appendChild(twitterBtn);
        buttonsContainer.appendChild(facebookBtn);
        buttonsContainer.appendChild(linkedinBtn);
        buttonsContainer.appendChild(whatsappBtn);
        buttonsContainer.appendChild(copyBtn);

        shareContainer.appendChild(buttonsContainer);
    }

    function createShareButton(name, url, className, icon) {
        const btn = document.createElement('a');
        btn.href = url;
        btn.className = `share-button ${className}`;
        btn.target = '_blank';
        btn.rel = 'noopener noreferrer';
        btn.innerHTML = `${icon} ${name}`;
        return btn;
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====

    function initSmoothScrollLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // ===== LAZY LOADING FOR IMAGES =====

    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores sin soporte
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====

    function initScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos que queremos animar
        document.querySelectorAll('.post-card, .category-card').forEach(el => {
            observer.observe(el);
        });
    }

    // ===== EXTERNAL LINKS =====

    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        links.forEach(link => {
            if (!link.hostname.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    }

    // ===== KEYBOARD SHORTCUTS =====

    function initKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Esc para cerrar modals o volver arriba
            if (e.key === 'Escape') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // Ctrl/Cmd + D para dark mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                document.querySelector('.dark-mode-toggle')?.click();
            }
        });
    }

    // ===== PERFORMANCE MONITORING =====

    function logPerformance() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Log de métricas de rendimiento
            window.addEventListener('load', () => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`Page Load Time: ${pageLoadTime}ms`);
            });
        }
    }

    // ===== NUEVAS FUNCIONALIDADES =====

    /**
     * Tabla de Contenidos Automática
     */
    function initTableOfContents() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        const headings = postContent.querySelectorAll('h2, h3, h4');
        if (headings.length < CONFIG.tocMinHeadings) return;

        // Crear contenedor TOC
        const tocContainer = document.createElement('aside');
        tocContainer.className = 'toc';
        tocContainer.innerHTML = '<div class="toc-title">Contenido</div>';

        const tocList = document.createElement('ul');
        tocContainer.appendChild(tocList);

        // Generar enlaces
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `heading-${index}`;
            }

            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            a.dataset.target = heading.id;

            // Indentación según nivel
            if (heading.tagName === 'H3') li.style.paddingLeft = '12px';
            if (heading.tagName === 'H4') li.style.paddingLeft = '24px';

            li.appendChild(a);
            tocList.appendChild(li);

            // Smooth scroll al hacer click
            a.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        // Insertar antes del contenido
        postContent.parentNode.insertBefore(tocContainer, postContent);

        // Active state en scroll
        const tocLinks = tocContainer.querySelectorAll('a');
        window.addEventListener('scroll', throttle(() => {
            let current = '';
            headings.forEach(heading => {
                const sectionTop = heading.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = heading.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.target === current) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }

    /**
     * Modo Lectura (Focus Mode)
     */
    function initFocusMode() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        // Crear botón de modo lectura
        const focusBtn = document.createElement('button');
        focusBtn.className = 'focus-mode-btn';
        focusBtn.innerHTML = '📖 Modo lectura';
        focusBtn.setAttribute('aria-label', 'Activar modo lectura');
        focusBtn.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            padding: 12px 16px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: var(--border-radius-md);
            cursor: pointer;
            font-weight: 600;
            z-index: 998;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(focusBtn);

        let isFocusMode = false;

        focusBtn.addEventListener('click', () => {
            isFocusMode = !isFocusMode;
            document.body.classList.toggle('focus-mode', isFocusMode);
            focusBtn.innerHTML = isFocusMode ? '✕ Salir' : '📖 Modo lectura';

            if (isFocusMode) {
                showToast('Modo lectura activado. Presiona ESC para salir.', 'info');
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isFocusMode) {
                isFocusMode = false;
                document.body.classList.remove('focus-mode');
                focusBtn.innerHTML = '📖 Modo lectura';
            }
        });

        // Ocultar botón al scroll
        let lastScrollY = window.pageYOffset;
        window.addEventListener('scroll', throttle(() => {
            if (window.pageYOffset > lastScrollY && window.pageYOffset > 200) {
                focusBtn.style.opacity = '0';
                focusBtn.style.pointerEvents = 'none';
            } else {
                focusBtn.style.opacity = '1';
                focusBtn.style.pointerEvents = 'auto';
            }
            lastScrollY = window.pageYOffset;
        }, 100));
    }

    /**
     * Indicador de progreso de lectura circular
     */
    function initCircularProgress() {
        const postContent = document.querySelector('.post-content');
        if (!postContent) return;

        // Crear indicador circular
        const progressRing = document.createElement('div');
        progressRing.className = 'reading-progress-ring';
        progressRing.innerHTML = `
            <svg width="50" height="50" style="transform: rotate(-90deg);">
                <circle cx="25" cy="25" r="20" stroke="var(--border-color)" stroke-width="3" fill="none"/>
                <circle class="progress-ring-circle" cx="25" cy="25" r="20"
                    stroke="var(--primary-color)" stroke-width="3" fill="none"
                    stroke-dasharray="125.6" stroke-dashoffset="125.6"
                    style="transition: stroke-dashoffset 0.1s ease;"/>
            </svg>
        `;
        progressRing.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
        `;

        document.body.appendChild(progressRing);

        const circle = progressRing.querySelector('.progress-ring-circle');
        const circumference = 2 * Math.PI * 20;

        window.addEventListener('scroll', throttle(() => {
            const postTop = postContent.offsetTop;
            const postBottom = postTop + postContent.offsetHeight;
            const scrollPos = window.pageYOffset + window.innerHeight / 2;

            if (scrollPos >= postTop && scrollPos <= postBottom) {
                progressRing.style.display = 'block';
                const progress = (scrollPos - postTop) / (postBottom - postTop);
                const offset = circumference - (progress * circumference);
                circle.style.strokeDashoffset = offset;
            } else if (scrollPos > postBottom) {
                progressRing.style.display = 'none';
            } else {
                progressRing.style.display = 'none';
            }
        }, 50));
    }

    /**
     * Optimización para impresión
     */
    function initPrintOptimization() {
        // Agregar estilos para impresión
        const printStyle = document.createElement('style');
        printStyle.textContent = `
            @media print {
                .site-header, .site-footer, .scroll-to-top, .dark-mode-toggle,
                .toc, .focus-mode-btn, .social-share-container, .reading-progress-bar,
                .reading-progress-ring, #disqus_thread, .sidebar, .newsletter-form {
                    display: none !important;
                }
                .post-content {
                    max-width: 100% !important;
                    font-size: 12pt !important;
                }
                body {
                    background: white !important;
                    color: black !important;
                }
                a {
                    text-decoration: underline;
                    color: black !important;
                }
                a[href]:after {
                    content: " (" attr(href) ")";
                }
            }
        `;
        document.head.appendChild(printStyle);
    }

    /**
     * Lazy loading nativo para todas las imágenes
     */
    function initNativeLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img:not([loading])');
            images.forEach(img => {
                img.loading = 'lazy';
            });
        }
    }

    /**
     * Prefetch de enlaces en hover
     */
    function initHoverPrefetch() {
        const prefetchUrls = new Set();

        document.addEventListener('mouseover', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (prefetchUrls.has(href)) return;

            prefetchUrls.add(href);

            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
        });
    }

    /**
     * Copiar código en bloques de código
     */
    function initCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre');

        codeBlocks.forEach(block => {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.textContent = 'Copiar';
            copyBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                padding: 6px 12px;
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                opacity: 0;
                transition: opacity 0.2s;
            `;

            block.style.position = 'relative';
            block.appendChild(copyBtn);

            block.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });

            block.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });

            copyBtn.addEventListener('click', async () => {
                const code = block.querySelector('code');
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    copyBtn.textContent = '¡Copiado!';
                    showToast('Código copiado al portapapeles', 'success');
                    setTimeout(() => {
                        copyBtn.textContent = 'Copiar';
                    }, 2000);
                } catch (err) {
                    showToast('Error al copiar', 'error');
                }
            });
        });
    }

    // ===== INIT ALL =====

    function init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        console.log('Initializing blog enhancements...');

        // Funcionalidades principales
        initReadingProgressBar();
        initScrollToTop();
        initDarkMode();
        initSocialShare();
        initSmoothScrollLinks();
        initLazyLoading();
        initScrollAnimations();
        initExternalLinks();
        initKeyboardShortcuts();

        // Nuevas funcionalidades
        initTableOfContents();
        initFocusMode();
        initCircularProgress();
        initPrintOptimization();
        initNativeLazyLoading();
        initHoverPrefetch();
        initCodeCopyButtons();

        // Calcular tiempo de lectura
        calculateReadingTime();

        // Performance monitoring (solo en desarrollo)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            logPerformance();
        }

        console.log('Blog enhancements initialized successfully!');

        // Mensaje de bienvenida en consola con estilo
        console.log(
            '%c🚀 NachoWeb3 Blog %cMejorado con nuevas funcionalidades',
            'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 5px 10px; border-radius: 5px;',
            'background: #f3f4f6; color: #1f2937; padding: 5px 10px; border-radius: 5px;'
        );
    }

    // Iniciar
    init();

})();
