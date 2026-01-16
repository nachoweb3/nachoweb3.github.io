---
layout: default
title: Inicio
description: Blog sobre IA, Blockchain y Tutoriales de tecnología
---

<!-- Hero Section Moderno -->
<section class="hero-modern">
    <div class="hero-content">
        <div class="hero-badge">🔥 Nuevo contenido cada semana</div>
        <h1 class="hero-title">
            <span class="gradient-text">Domina el Futuro</span><br>
            de la Tecnología
        </h1>
        <p class="hero-description">
            Descubre las últimas noticias de Inteligencia Artificial, Blockchain,
            y los mejores tutoriales para llevarte al siguiente nivel.
        </p>
        <div class="hero-actions">
            <a href="#ultimos-posts" class="btn btn-primary btn-large ripple">
                Ver Artículos
            </a>
            <a href="/sobre-mi" class="btn btn-secondary btn-large">
                Conocer Más
            </a>
        </div>
    </div>
    <div class="hero-stats">
        <div class="stat-item">
            <span class="stat-number">{{ site.posts | size }}+</span>
            <span class="stat-label">Artículos</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">3</span>
            <span class="stat-label">Categorías</span>
        </div>
        <div class="stat-item">
            <span class="stat-number">2025</span>
            <span class="stat-label">Actualizado</span>
        </div>
    </div>
</section>

<!-- Categorías Destacadas -->
<section class="categories-showcase">
    <div class="container">
        <h2 class="section-title">Explora por Tema</h2>
        <div class="categories-grid-modern">
            <a href="/categorias/ia" class="category-card-modern category-ia">
                <div class="category-icon">🤖</div>
                <h3>Inteligencia Artificial</h3>
                <p>Últimas noticias, avances y herramientas de IA</p>
                <span class="category-arrow">→</span>
            </a>
            <a href="/categorias/blockchain" class="category-card-modern category-blockchain">
                <div class="category-icon">⛓️</div>
                <h3>Blockchain & Crypto</h3>
                <p>Novedades del mundo decentralized y criptomonedas</p>
                <span class="category-arrow">→</span>
            </a>
            <a href="/categorias/tutoriales" class="category-card-modern category-tutoriales">
                <div class="category-icon">📚</div>
                <h3>Tutoriales</h3>
                <p>Guías paso a paso para dominar nuevas tecnologías</p>
                <span class="category-arrow">→</span>
            </a>
        </div>
    </div>
</section>

<!-- Últimos Posts -->
<section id="ultimos-posts" class="latest-posts">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Últimos Artículos</h2>
            <p class="section-subtitle">Contenido fresco seleccionado para ti</p>
        </div>

        <!-- Filtro por Tags -->
        {% include tag-filter.html %}

        <div class="posts-grid">
            {% for post in site.posts limit: 9 %}
                {% include post-card.html post=post %}
            {% endfor %}
        </div>

        <div class="posts-more">
            <a href="/archivo" class="btn btn-outline">
                Ver Todos los Artículos
            </a>
        </div>
    </div>
</section>

<!-- Newsletter Section -->
<section class="newsletter-section">
    <div class="container">
        <div class="newsletter-box">
            <div class="newsletter-content">
                <h2>📬 No te pierdas nada</h2>
                <p>Recibe los mejores artículos directamente en tu email. Sin spam, solo contenido de calidad.</p>
            </div>
            <form class="newsletter-form-inline" onsubmit="event.preventDefault(); alert('¡Gracias por suscribirte!');">
                <input type="email" placeholder="Tu email" required>
                <button type="submit" class="btn btn-primary ripple">Suscribirse</button>
            </form>
            <p class="newsletter-disclaimer">🔒 Tu email está seguro con nosotros. Sin spam, puedes darte de baja cuando quieras.</p>
        </div>
    </div>
</section>

<!-- Featured Posts -->
<section class="featured-section">
    <div class="container">
        <h2 class="section-title">✨ Destacados</h2>
        <div class="featured-grid">
            {% assign featured_posts = site.posts | where: "featured", true | sample: 3 %}
            {% if featured_posts.size == 0 %}
                {% assign featured_posts = site.posts | sample: 3 %}
            {% endif %}
            {% for post in featured_posts %}
                <article class="featured-card">
                    <div class="featured-image">
                        {% if post.image %}
                            <img src="{{ post.image }}" alt="{{ post.title }}" loading="lazy">
                        {% else %}
                            <div class="placeholder-image">{{ post.categories[0] | slice: 0 | upcase }}</div>
                        {% endif %}
                        <span class="category-badge category-{{ post.categories[0] }}">
                            {{ post.categories[0] | upcase }}
                        </span>
                    </div>
                    <div class="featured-content">
                        <time>{{ post.date | date: "%d %b %Y" }}</time>
                        <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
                        <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
                        <a href="{{ post.url }}" class="read-more">Leer más →</a>
                    </div>
                </article>
            {% endfor %}
        </div>
    </div>
</section>

<!-- About Preview -->
<section class="about-preview">
    <div class="container">
        <div class="about-grid">
            <div class="about-text">
                <h2>👋 Hola, soy NachoWeb3</h2>
                <p>Apasionado por la tecnología, la Inteligencia Artificial y el mundo Blockchain. Creo contenido para ayudarte a entender y dominar las tecnologías que están transformando nuestro mundo.</p>
                <ul class="about-highlights">
                    <li>✅ Contenido basado en investigación real</li>
                    <li>✅ Tutoriales paso a paso</li>
                    <li>✅ Actualizaciones semanales</li>
                </ul>
                <a href="/sobre-mi" class="btn btn-secondary">Conóceme mejor</a>
            </div>
            <div class="about-visual">
                <div class="tech-icons">
                    <span class="tech-icon">🤖</span>
                    <span class="tech-icon">⛓️</span>
                    <span class="tech-icon">💻</span>
                    <span class="tech-icon">📊</span>
                    <span class="tech-icon">🔐</span>
                    <span class="tech-icon">🚀</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA Final -->
<section class="cta-section">
    <div class="container">
        <div class="cta-box">
            <h2>¿Listo para aprender?</h2>
            <p>Únete a nuestra comunidad y empieza tu viaje en el mundo de la tecnología.</p>
            <div class="cta-actions">
                <a href="/categorias/tutoriales" class="btn btn-primary btn-large ripple">
                    Comenzar Ahora
                </a>
            </div>
        </div>
    </div>
</section>
