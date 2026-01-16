---
layout: default
title: Archivo de Artículos
description: Todos los artículos del blog organizados por fecha
permalink: /archivo/
---

<div class="archive-page">
    <header class="archive-header">
        <h1>📚 Archivo de Artículos</h1>
        <p>Todos los artículos del blog organizados por fecha</p>
    </header>

    <!-- Filtros rápidos -->
    <div class="archive-filters">
        <button class="filter-btn active" data-filter="all">Todos</button>
        <button class="filter-btn" data-filter="ia">🤖 IA</button>
        <button class="filter-btn" data-filter="blockchain">⛓️ Blockchain</button>
        <button class="filter-btn" data-filter="tutoriales">📚 Tutoriales</button>
    </div>

    <!-- Estadísticas -->
    <div class="archive-stats">
        <div class="stat-card">
            <span class="stat-number">{{ site.posts | size }}</span>
            <span class="stat-label">Artículos</span>
        </div>
        <div class="stat-card">
            <span class="stat-number">{% assign tags = '' %}{% for post in site.posts %}{% for tag in post.tags %}{{ tags | append: tag | append: ',' }}{% endfor %}{% endfor %}{{ tags | split: ',' | uniq | size }}</span>
            <span class="stat-label">Etiquetas</span>
        </div>
        <div class="stat-card">
            <span class="stat-number">{% assign years = '' %}{% for post in site.posts %}{{ years | append: post.date | date: '%Y' | append: ',' }}{% endfor %}{{ years | split: ',' | uniq | size }}</span>
            <span class="stat-label">Años</span>
        </div>
    </div>

    <!-- Posts por año -->
    <div class="archive-by-year">
        {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" | sort: "name" | reverse %}

        {% for year_group in posts_by_year %}
        <div class="year-section" data-year="{{ year_group.name }}">
            <h2 class="year-title">{{ year_group.name }}</h2>
            <p class="year-count">{{ year_group.items | size }} artículos</p>

            <div class="year-posts">
                {% for post in year_group.items %}
                <article class="archive-post" data-category="{{ post.categories[0] }}">
                    <div class="archive-post-date">
                        <span class="date-day">{{ post.date | date: "%d" }}</span>
                        <span class="date-month">{{ post.date | date: "%b" }}</span>
                    </div>
                    <div class="archive-post-content">
                        <span class="category-badge-small category-{{ post.categories[0] }}">
                            {{ post.categories[0] | upcase }}
                        </span>
                        <h3>
                            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
                        </h3>
                        <p class="archive-excerpt">{{ post.excerpt | strip_html | truncate: 120 }}</p>
                        <div class="archive-meta">
                            <span class="reading-time-tiny">📖 {{ post.content | number_of_words | divided_by: 200 }} min</span>
                            {% if post.tags %}
                            <span class="archive-tags">
                                {% for tag in post.tags limit: 3 %}
                                <span class="tag-tiny">#{{ tag }}</span>
                                {% endfor %}
                            </span>
                            {% endif %}
                        </div>
                    </div>
                </article>
                {% endfor %}
            </div>
        </div>
        {% endfor %}
    </div>

    <!-- Nube de tags -->
    <div class="tags-cloud-section">
        <h2>🏷️ Nube de Etiquetas</h2>
        <div class="tags-cloud">
            {% assign max_tag_count = 0 %}
            {% for tag in site.tags %}
                {% if tag[1].size > max_tag_count %}
                    {% assign max_tag_count = tag[1].size %}
                {% endif %}
            {% endfor %}

            {% for tag in site.tags %}
            <a href="/tags/{{ tag[0] }}" class="tag-cloud-item" style="font-size: {{ 0.8 | plus: tag[1].size | times: 1.0 | divided_by: max_tag_count | times: 1.5 }}rem;">
                #{{ tag[0] }}
                <span class="tag-count">{{ tag[1].size }}</span>
            </a>
            {% endfor %}
        </div>
    </div>
</div>

<script>
(function() {
    // Filtros por categoría
    const filterBtns = document.querySelectorAll('.filter-btn');
    const posts = document.querySelectorAll('.archive-post');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Actualizar botón activo
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filtrar posts
            posts.forEach(post => {
                if (filter === 'all' || post.dataset.category === filter) {
                    post.style.display = 'flex';
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
})();
</script>

<style>
.archive-page {
    max-width: 900px;
    margin: 0 auto;
    padding: var(--spacing-xl) var(--spacing-md);
}

.archive-header {
    text-align: center;
    margin-bottom: var(--spacing-xl);
}

.archive-header h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: var(--spacing-sm);
}

.archive-header p {
    color: var(--text-secondary);
    font-size: 1.1rem;
}

.archive-filters {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--spacing-xl);
}

.filter-btn {
    padding: 0.75rem 1.5rem;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--radius-lg);
    cursor: pointer;
    font-weight: 600;
    color: var(--text-secondary);
    transition: all 0.3s ease;
}

.filter-btn:hover {
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.filter-btn.active {
    background: var(--gradient-primary);
    border-color: var(--primary-color);
    color: white;
}

.archive-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
}

.stat-card {
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    text-align: center;
}

.stat-number {
    display: block;
    font-size: 2.5rem;
    font-weight: 800;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.stat-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.year-section {
    margin-bottom: var(--spacing-xl);
}

.year-title {
    font-size: 2rem;
    margin-bottom: var(--spacing-xs);
    color: var(--text-primary);
}

.year-count {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-md);
}

.year-posts {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.archive-post {
    display: flex;
    gap: var(--spacing-md);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    padding: var(--spacing-md);
    transition: all 0.3s ease;
}

.archive-post:hover {
    border-color: var(--primary-color);
    box-shadow: var(--shadow-md);
}

.archive-post-date {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 60px;
    background: var(--bg-secondary);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm);
}

.date-day {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary-color);
}

.date-month {
    font-size: 0.8rem;
    color: var(--text-secondary);
    text-transform: uppercase;
}

.archive-post-content {
    flex: 1;
}

.category-badge-small {
    display: inline-block;
    padding: 0.2rem 0.5rem;
    border-radius: var(--radius-sm);
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
}

.archive-post-content h3 {
    margin: var(--spacing-xs) 0;
}

.archive-post-content h3 a {
    text-decoration: none;
    color: var(--text-primary);
    transition: color 0.3s ease;
}

.archive-post-content h3 a:hover {
    color: var(--primary-color);
}

.archive-excerpt {
    color: var(--text-secondary);
    margin-bottom: var(--spacing-sm);
}

.archive-meta {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
    font-size: 0.85rem;
}

.reading-time-tiny {
    color: var(--text-secondary);
}

.archive-tags {
    display: flex;
    gap: var(--spacing-xs);
    flex-wrap: wrap;
}

.tag-tiny {
    background: var(--bg-tertiary);
    padding: 0.1rem 0.4rem;
    border-radius: var(--radius-sm);
    font-size: 0.7rem;
    color: var(--text-secondary);
}

.tags-cloud-section {
    margin-top: var(--spacing-xl);
    padding-top: var(--spacing-xl);
    border-top: 1px solid var(--border-color);
}

.tags-cloud-section h2 {
    text-align: center;
    margin-bottom: var(--spacing-lg);
}

.tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-sm);
    justify-content: center;
}

.tag-cloud-item {
    text-decoration: none;
    color: var(--primary-color);
    padding: 0.5rem 1rem;
    background: var(--bg-secondary);
    border-radius: var(--radius-lg);
    transition: all 0.3s ease;
}

.tag-cloud-item:hover {
    background: var(--primary-color);
    color: white;
    transform: scale(1.1);
}

.tag-count {
    opacity: 0.6;
    font-size: 0.8em;
}

@media (max-width: 768px) {
    .archive-post {
        flex-direction: column;
    }

    .archive-post-date {
        flex-direction: row;
        gap: var(--spacing-xs);
    }
}
</style>
