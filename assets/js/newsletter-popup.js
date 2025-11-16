// Newsletter Popup
(function() {
    'use strict';

    // Configuración
    const STORAGE_KEY = 'newsletter_popup_shown';
    const DELAY_MS = 3000; // 3 segundos después de cargar la página
    const COOLDOWN_DAYS = 7; // No mostrar de nuevo por 7 días si cierran

    // Función para crear el popup
    function createPopup() {
        const popup = document.createElement('div');
        popup.id = 'newsletter-popup';
        popup.className = 'newsletter-popup-overlay';
        popup.innerHTML = `
            <div class="newsletter-popup-content">
                <button class="newsletter-popup-close" aria-label="Cerrar">×</button>
                <div class="newsletter-popup-icon">📧</div>
                <h2>¡No te pierdas nada!</h2>
                <p>Recibe las últimas noticias de IA, Blockchain y tutoriales directamente en tu email</p>

                <form class="newsletter-form" action="https://formsubmit.co/money4youbabe@gmail.com" method="POST">
                    <input type="hidden" name="_subject" value="Nueva suscripción al blog NachoWeb3">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_template" value="table">
                    <input type="text" name="_honey" style="display:none">

                    <div class="newsletter-input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            required
                            class="newsletter-email-input"
                        >
                        <button type="submit" class="newsletter-submit-btn">Suscribirme</button>
                    </div>

                    <p class="newsletter-privacy">
                        🔒 Tu email está seguro. Sin spam, cancela cuando quieras.
                    </p>
                </form>

                <div class="newsletter-benefits">
                    <div class="benefit-item">✅ Noticias semanales</div>
                    <div class="benefit-item">✅ Tutoriales exclusivos</div>
                    <div class="benefit-item">✅ Recursos gratuitos</div>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
        return popup;
    }

    // Función para mostrar el popup
    function showPopup() {
        const popup = document.getElementById('newsletter-popup');
        if (popup) {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }

    // Función para ocultar el popup
    function hidePopup() {
        const popup = document.getElementById('newsletter-popup');
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Función para guardar que el usuario cerró el popup
    function markPopupShown() {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOLDOWN_DAYS);
        localStorage.setItem(STORAGE_KEY, expiryDate.toISOString());
    }

    // Verificar si debemos mostrar el popup
    function shouldShowPopup() {
        const lastShown = localStorage.getItem(STORAGE_KEY);
        if (!lastShown) return true;

        const expiryDate = new Date(lastShown);
        return new Date() > expiryDate;
    }

    // Inicializar
    function init() {
        if (!shouldShowPopup()) return;

        // Crear el popup
        const popup = createPopup();

        // Event listeners
        const closeBtn = popup.querySelector('.newsletter-popup-close');
        const form = popup.querySelector('.newsletter-form');

        // Cerrar al hacer click en X
        closeBtn.addEventListener('click', () => {
            hidePopup();
            markPopupShown();
        });

        // Cerrar al hacer click fuera del contenido
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                hidePopup();
                markPopupShown();
            }
        });

        // Cerrar con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('show')) {
                hidePopup();
                markPopupShown();
            }
        });

        // Al enviar el formulario
        form.addEventListener('submit', () => {
            markPopupShown();
            // El formulario se enviará normalmente
        });

        // Mostrar después del delay
        setTimeout(showPopup, DELAY_MS);
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
