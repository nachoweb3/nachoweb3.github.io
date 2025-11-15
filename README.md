# NachoWeb3 Blog

Blog profesional sobre Inteligencia Artificial, Blockchain y Tutoriales de Referidos, creado con Jekyll y alojado gratuitamente en GitHub Pages.

## 🚀 Características

- ✅ 100% gratis con GitHub Pages
- ✅ Diseño responsive y profesional
- ✅ Optimizado para SEO
- ✅ Tres categorías: IA, Blockchain, Tutoriales
- ✅ Sistema de etiquetas
- ✅ Compartir en redes sociales
- ✅ Posts relacionados automáticos
- ✅ Navegación móvil optimizada

## 📋 Requisitos previos

- Cuenta de GitHub (gratis)
- Git instalado en tu computadora (opcional, puedes usar la interfaz web)
- Editor de texto (VS Code, Sublime Text, etc.)

## 🛠️ Instalación y despliegue

### Opción 1: Despliegue directo en GitHub Pages (Recomendado)

1. **Crea un repositorio en GitHub**
   - Ve a [GitHub.com](https://github.com)
   - Haz clic en "New repository"
   - Nombra tu repositorio (ej: `blog` o `nachoweb3.github.io`)
   - Márcalo como público
   - Haz clic en "Create repository"

2. **Sube el código al repositorio**

   **Opción A: Usando Git desde la terminal**
   ```bash
   cd C:\Users\Usuario\Desktop\blog
   git init
   git add .
   git commit -m "Initial commit: NachoWeb3 Blog"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/blog.git
   git push -u origin main
   ```

   **Opción B: Usando GitHub Desktop**
   - Abre GitHub Desktop
   - Arrastra la carpeta del blog
   - Haz commit de todos los archivos
   - Publica el repositorio

   **Opción C: Subir archivos manualmente**
   - En tu repositorio de GitHub, haz clic en "Upload files"
   - Arrastra todos los archivos del blog
   - Haz commit

3. **Activa GitHub Pages**
   - En tu repositorio, ve a "Settings"
   - En el menú lateral, selecciona "Pages"
   - En "Source", selecciona "main" branch
   - Haz clic en "Save"
   - ¡Listo! Tu blog estará disponible en `https://TU_USUARIO.github.io/blog`

4. **Actualiza la configuración**

   Edita `_config.yml` con tu información:
   ```yaml
   url: "https://TU_USUARIO.github.io"
   baseurl: "/blog"
   twitter_username: tu_usuario_twitter
   github_username: tu_usuario_github
   ```

### Opción 2: Prueba local con Jekyll

Si quieres probar el blog localmente antes de desplegarlo:

1. **Instala Ruby**
   - Windows: [RubyInstaller](https://rubyinstaller.org/)
   - Mac: Ruby viene preinstalado
   - Linux: `sudo apt-get install ruby-full`

2. **Instala Jekyll y Bundler**
   ```bash
   gem install jekyll bundler
   ```

3. **Crea un Gemfile**

   Crea un archivo llamado `Gemfile` en la raíz del proyecto:
   ```ruby
   source 'https://rubygems.org'
   gem 'github-pages', group: :jekyll_plugins
   gem 'webrick'
   ```

4. **Instala las dependencias**
   ```bash
   bundle install
   ```

5. **Ejecuta el servidor local**
   ```bash
   bundle exec jekyll serve
   ```

6. **Accede al blog**
   - Abre tu navegador en `http://localhost:4000`

## ✍️ Cómo crear un nuevo post

1. **Crea un archivo en la carpeta `_posts`**

   El nombre debe seguir el formato: `YYYY-MM-DD-titulo-del-post.md`

   Ejemplo: `2025-11-15-mi-nuevo-articulo.md`

2. **Añade el front matter**

   ```markdown
   ---
   layout: post
   title: "Título del artículo"
   date: 2025-11-15 10:00:00 -0500
   categories: [ia]  # Opciones: ia, blockchain, tutoriales
   tags: [etiqueta1, etiqueta2, etiqueta3]
   excerpt: "Breve descripción del artículo que aparecerá en las tarjetas"
   ---
   ```

3. **Escribe tu contenido**

   Usa Markdown para formatear:

   ```markdown
   ## Título de sección

   Este es un párrafo normal.

   ### Subsección

   - Lista item 1
   - Lista item 2

   **Texto en negrita**
   *Texto en cursiva*

   [Link a sitio](https://ejemplo.com)

   ![Imagen](ruta/a/imagen.jpg)

   ```python
   # Código con sintaxis
   def hola():
       print("Hola mundo")
   ```
   ```

4. **Guarda el archivo**

   El post aparecerá automáticamente en tu blog.

## 📁 Estructura del proyecto

```
blog/
├── _config.yml              # Configuración principal
├── _layouts/                # Plantillas
│   ├── default.html        # Layout base
│   ├── post.html          # Layout para posts
│   └── page.html          # Layout para páginas
├── _includes/              # Componentes reutilizables
│   ├── header.html        # Cabecera del sitio
│   ├── footer.html        # Pie de página
│   └── post-card.html     # Tarjeta de post
├── _posts/                 # Tus artículos
│   └── YYYY-MM-DD-titulo.md
├── assets/                 # Recursos estáticos
│   ├── css/
│   │   └── style.css      # Estilos personalizados
│   ├── js/
│   └── images/
├── categorias/             # Páginas de categorías
│   ├── ia.html
│   ├── blockchain.html
│   └── tutoriales.html
├── index.html              # Página principal
├── sobre-mi.md            # Página "Sobre mí"
└── README.md              # Este archivo
```

## 🎨 Personalización

### Colores

Edita las variables CSS en `assets/css/style.css`:

```css
:root {
    --primary-color: #6366f1;      /* Color principal */
    --secondary-color: #8b5cf6;    /* Color secundario */
    --accent-color: #10b981;       /* Color de acento */
    /* ... más variables */
}
```

### Logo y nombre

1. Cambia el título en `_config.yml`
2. Edita `_includes/header.html` para modificar el logo

### Redes sociales

Actualiza tus perfiles en `_config.yml`:

```yaml
twitter_username: tu_usuario
github_username: tu_usuario
```

Para añadir más redes sociales, edita `_includes/footer.html`

## 📝 Tipos de contenido

### Posts

Los artículos del blog van en `_posts/`

### Páginas

Para crear páginas estáticas (como "Sobre mí"):

1. Crea un archivo `.md` en la raíz
2. Añade front matter con `layout: page`
3. Escribe tu contenido

### Categorías

Las páginas de categorías están en `categorias/`
Puedes añadir más categorías:

1. Crea `categorias/nueva-categoria.html`
2. Añade la categoría a `_config.yml`
3. Usa la categoría en tus posts

## 🔧 Mantenimiento

### Actualizar el blog

1. Crea o edita posts en `_posts/`
2. Haz commit de los cambios:
   ```bash
   git add .
   git commit -m "Nuevo post: Título del artículo"
   git push
   ```
3. GitHub Pages se actualizará automáticamente (toma 1-3 minutos)

### Añadir imágenes

1. Sube imágenes a `assets/images/`
2. Referencialas en posts:
   ```markdown
   ![Descripción]({{ '/assets/images/mi-imagen.jpg' | relative_url }})
   ```

## 📊 SEO y Analytics

### Mejorar SEO

El blog ya incluye:
- Meta tags automáticos
- Sitemap.xml
- Feed RSS
- URLs amigables

Para mejorar más:
1. Usa buenos títulos y descripciones
2. Añade imágenes con alt text
3. Usa keywords relevantes
4. Enlaces internos entre posts

### Google Analytics (opcional)

1. Crea una cuenta en [Google Analytics](https://analytics.google.com)
2. Obtén tu ID de seguimiento
3. Añade en `_includes/head.html`:
   ```html
   <!-- Global site tag (gtag.js) - Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=TU_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'TU_ID');
   </script>
   ```

## 🐛 Solución de problemas

### El blog no se muestra

- Verifica que GitHub Pages esté activado en Settings
- Asegúrate de que el branch sea "main"
- Espera 2-3 minutos después de hacer push

### Los estilos no se cargan

- Revisa que `baseurl` en `_config.yml` sea correcto
- Limpia el cache del navegador

### Los posts no aparecen

- Verifica que el nombre del archivo siga el formato `YYYY-MM-DD-titulo.md`
- Asegúrate de que la fecha no sea futura
- Revisa que el front matter sea válido YAML

### Error de construcción

- Revisa el tab "Actions" en GitHub para ver errores
- Verifica que no haya errores de sintaxis en YAML
- Asegúrate de que todos los archivos tengan encoding UTF-8

## 💡 Consejos para el éxito

### Contenido

- ✅ Publica regularmente (al menos 1-2 posts por semana)
- ✅ Usa títulos atractivos y descriptivos
- ✅ Incluye imágenes relevantes
- ✅ Escribe para tu audiencia, no para ti
- ✅ Usa listas y subtítulos para facilitar la lectura

### Promoción

- 📱 Comparte en redes sociales
- 🔗 Añade el link a tu bio de Twitter
- 📧 Comparte con tu lista de email
- 💬 Participa en comunidades relevantes
- 🤝 Colabora con otros creadores

### Monetización

- Programas de afiliados
- Links de referidos (Binance, Coinbase, etc.)
- Patrocinios
- Productos digitales
- Consultoría

## 🆘 Recursos útiles

### Aprender Markdown
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Markdown](https://guides.github.com/features/mastering-markdown/)

### Jekyll
- [Documentación oficial](https://jekyllrb.com/)
- [Jekyll en GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll)

### GitHub Pages
- [Guía oficial](https://pages.github.com/)
- [Documentación completa](https://docs.github.com/en/pages)

### Diseño
- [Coolors](https://coolors.co/) - Paletas de colores
- [Canva](https://www.canva.com/) - Crear imágenes
- [Unsplash](https://unsplash.com/) - Imágenes gratis

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Eres libre de usarlo, modificarlo y distribuirlo.

## 🤝 Contribuciones

¿Encontraste un bug o tienes una sugerencia?
1. Abre un Issue en GitHub
2. Crea un Pull Request con tus mejoras

## 📞 Contacto

- Twitter: [@nachoweb3](https://twitter.com/nachoweb3)
- GitHub: [nachoweb3](https://github.com/nachoweb3)

---

**¡Mucha suerte con tu blog!** 🚀

Si este proyecto te fue útil, considera:
- ⭐ Darle una estrella al repositorio
- 🔄 Compartirlo con otros
- 🐦 Mencionarme en Twitter

*Creado con ❤️ para la comunidad de NachoWeb3*
