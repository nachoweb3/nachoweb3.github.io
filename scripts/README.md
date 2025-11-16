# Generador Automático de Artículos de Blog

Script en Python que genera artículos de blog automáticamente usando APIs de IA gratuitas (Groq).

## Características

- **Generación automática de contenido** usando modelos LLM de última generación (Llama 3.1 70B)
- **Títulos SEO-friendly** generados automáticamente
- **Tags relevantes** según la categoría
- **Excerpts optimizados** para descripción en redes sociales
- **Front matter correcto** para Jekyll
- **Múltiples categorías**: IA, Blockchain, Tutoriales
- **Prompts especializados** por categoría
- **100% Gratuito** usando Groq API

## Requisitos

- Python 3.7 o superior
- Cuenta gratuita en Groq (https://console.groq.com)

## Instalación

### 1. Instalar dependencias

```bash
cd scripts
pip install -r requirements.txt
```

O instalar directamente:

```bash
pip install groq
```

### 2. Obtener API Key de Groq (GRATIS)

1. Visita: https://console.groq.com
2. Crea una cuenta gratuita (solo requiere email)
3. Ve a "API Keys" en el dashboard
4. Crea una nueva API key
5. Copia la key generada

### 3. Configurar la API Key

**Opción A: Variable de entorno (recomendado)**

En Windows:
```cmd
set GROQ_API_KEY=tu_api_key_aqui
```

En Linux/Mac:
```bash
export GROQ_API_KEY=tu_api_key_aqui
```

Para hacerlo permanente, agrégalo a tu `.bashrc`, `.zshrc` o variables de entorno del sistema.

**Opción B: Pasar la key como parámetro**

```bash
python scripts/generate-post.py --api-key tu_api_key_aqui --topic "..." --category ia
```

## Uso

### Sintaxis básica

```bash
python scripts/generate-post.py --topic "TEMA_DEL_ARTICULO" --category CATEGORIA
```

### Categorías disponibles

- `ia` - Artículos sobre Inteligencia Artificial
- `blockchain` - Artículos sobre Blockchain y Criptomonedas
- `tutoriales` - Guías y tutoriales paso a paso

### Ejemplos

**Generar artículo sobre IA:**
```bash
python scripts/generate-post.py --topic "GPT-4 vs Claude Sonnet 4.5" --category ia
```

**Generar artículo sobre Blockchain:**
```bash
python scripts/generate-post.py --topic "Cómo hacer staking en Ethereum 2.0" --category blockchain
```

**Generar tutorial:**
```bash
python scripts/generate-post.py --topic "Configurar Visual Studio Code para Python" --category tutoriales
```

**Especificar fecha personalizada:**
```bash
python scripts/generate-post.py --topic "Web3.js: Guía completa" --category tutoriales --date 2025-11-20
```

**Usar API key directamente en el comando:**
```bash
python scripts/generate-post.py --topic "DeFi en 2025" --category blockchain --api-key gsk_tu_api_key_aqui
```

## Salida

El script generará:

1. **Archivo `.md`** en la carpeta `_posts/` con el formato: `YYYY-MM-DD-titulo-del-articulo.md`
2. **Front matter completo** con:
   - Título SEO optimizado
   - Fecha y hora
   - Categoría
   - Tags relevantes
   - Excerpt descriptivo
3. **Contenido estructurado** con:
   - Introducción
   - Secciones con headers markdown
   - Ejemplos cuando sea relevante
   - Conclusión
   - Llamada a la acción

## Proceso del script

1. **Genera título y metadata**: Usa IA para crear un título SEO-friendly y tags relevantes
2. **Genera contenido**: Crea un artículo de 800-1200 palabras usando prompts especializados
3. **Crea el archivo**: Guarda el post en `_posts/` con el formato correcto
4. **Muestra sugerencias de imágenes**: Te da ideas para la imagen destacada

## Personalización

### Modificar prompts

Edita las variables `PROMPT_TEMPLATES` en `generate-post.py` para ajustar el estilo de escritura:

```python
PROMPT_TEMPLATES = {
    'ia': """Tu prompt personalizado aquí...""",
    'blockchain': """Tu prompt personalizado aquí...""",
    'tutoriales': """Tu prompt personalizado aquí..."""
}
```

### Cambiar modelo de IA

Modifica el parámetro `model` en las llamadas a la API:

```python
completion = client.chat.completions.create(
    model="llama-3.1-70b-versatile",  # Cambiar a otro modelo disponible
    ...
)
```

Modelos disponibles en Groq (gratis):
- `llama-3.1-70b-versatile` (recomendado)
- `llama-3.1-8b-instant` (más rápido)
- `mixtral-8x7b-32768` (alternativa)
- `gemma2-9b-it`

### Agregar nuevas categorías

Edita el diccionario `CATEGORIES` en el script:

```python
CATEGORIES = {
    'nueva_categoria': {
        'name': 'Nombre Categoría',
        'slug': 'nueva-categoria',
        'description': 'Descripción',
        'tags_comunes': ['tag1', 'tag2', 'tag3']
    }
}
```

## Workflow recomendado

1. **Generar el artículo**:
   ```bash
   python scripts/generate-post.py --topic "Tu tema" --category ia
   ```

2. **Revisar y editar** el contenido generado en `_posts/`

3. **Agregar imagen** (opcional):
   - Usa las sugerencias que muestra el script
   - Busca en Unsplash, Pexels o genera con DALL-E
   - Guárdala en `assets/images/`
   - Agrega al front matter: `image: /blog/assets/images/tu-imagen.jpg`

4. **Previsualizar localmente**:
   ```bash
   bundle exec jekyll serve
   ```

5. **Publicar**:
   ```bash
   git add _posts/
   git commit -m "Add: nuevo post sobre [tema]"
   git push
   ```

## Consejos

- **Revisa siempre el contenido**: La IA es muy buena pero puede cometer errores o inventar datos
- **Personaliza el artículo**: Agrega tu toque personal, experiencias o datos específicos
- **Verifica los links**: Si el artículo incluye enlaces, verifica que funcionen
- **Optimiza SEO**: Considera agregar más keywords si es necesario
- **Agrega imágenes**: Los artículos con imágenes tienen mejor engagement

## Limitaciones de la API gratuita de Groq

- **Límite de requests**: ~30 requests por minuto
- **Límite de tokens**: ~6000 tokens por minuto
- **Suficiente para**: Generar varios artículos al día sin problemas

Si necesitas más, Groq ofrece planes pagos o considera usar otras APIs gratuitas como:
- Hugging Face Inference API
- Together AI (tier gratuito)
- OpenRouter (algunos modelos gratis)

## Solución de problemas

**Error: "No API key provided"**
- Asegúrate de configurar `GROQ_API_KEY` o usar `--api-key`

**Error: "Rate limit exceeded"**
- Espera unos minutos antes de generar otro artículo
- El límite se resetea cada minuto

**El contenido es muy corto o malo**
- Intenta con un topic más específico
- Prueba con otro modelo (llama-3.1-8b-instant puede ser menos preciso)
- Ajusta la temperatura en el código (0.7 por defecto)

**El archivo no se crea**
- Verifica que la carpeta `_posts/` existe
- Revisa los permisos de escritura

## Ejemplos de resultados

**Comando:**
```bash
python scripts/generate-post.py --topic "Qué es RAG en IA" --category ia
```

**Genera:**
```
_posts/2025-11-16-que-es-rag-en-ia.md
```

**Con contenido:**
```markdown
---
layout: post
title: "RAG: La técnica que revoluciona los LLMs"
date: 2025-11-16 10:30:00 -0500
categories: [ia]
tags: [rag, llm, ia-generativa, retrieval]
excerpt: "Descubre cómo RAG mejora la precisión de los modelos de lenguaje al combinar recuperación de información con generación de texto."
---

## ¿Qué es RAG?

RAG (Retrieval-Augmented Generation) es una técnica...

[... contenido generado ...]
```

## Contribuciones

Si quieres mejorar el script:
1. Agrega soporte para más categorías
2. Integra generación de imágenes con DALL-E mini o Stability AI
3. Agrega soporte para otros LLMs (OpenAI, Anthropic, etc.)
4. Mejora los prompts para mejor calidad

## Recursos adicionales

- [Groq Documentation](https://console.groq.com/docs)
- [Groq Playground](https://console.groq.com/playground)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Guide](https://www.markdownguide.org/)

## Licencia

Este script es de uso libre para tu blog personal.

---

¿Dudas o problemas? Abre un issue o contacta en [@nachoweb3__x](https://twitter.com/nachoweb3__x)
