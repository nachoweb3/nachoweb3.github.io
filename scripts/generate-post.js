#!/usr/bin/env node

/**
 * Script para generar artículos de blog automáticamente usando APIs de IA gratuitas.
 * Utiliza Groq API (gratuita) para generación de texto.
 */

const Groq = require('groq-sdk');
const fs = require('fs');
const path = require('path');

// Configuración de categorías
const CATEGORIES = {
  ia: {
    name: 'IA',
    slug: 'ia',
    description: 'Inteligencia Artificial',
    tags_comunes: ['ia', 'machine-learning', 'deep-learning', 'ia-generativa', 'llm']
  },
  blockchain: {
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Blockchain y Criptomonedas',
    tags_comunes: ['blockchain', 'crypto', 'web3', 'defi', 'nft']
  },
  tutoriales: {
    name: 'Tutoriales',
    slug: 'tutoriales',
    description: 'Guías y Tutoriales',
    tags_comunes: ['tutorial', 'guia', 'paso-a-paso', 'como-hacer']
  }
};

// Templates de prompts por categoría
const PROMPT_TEMPLATES = {
  ia: (topic) => `Escribe un artículo de blog completo y detallado sobre: ${topic}

El artículo debe:
- Tener entre 800-1200 palabras
- Estar escrito en español
- Ser informativo y técnico pero accesible
- Incluir secciones con headers en markdown (##, ###)
- Incluir ejemplos concretos cuando sea relevante
- Tener un tono profesional pero cercano
- Incluir una conclusión al final
- Ser optimizado para SEO
- NO incluir el título principal (solo secciones)

Estructura sugerida:
1. Introducción breve y enganchadora
2. Contexto o explicación del tema
3. Puntos principales con subsecciones
4. Casos de uso o aplicaciones
5. Conclusión

Escribe el artículo completo en formato markdown:`,

  blockchain: (topic) => `Escribe un artículo de blog completo y detallado sobre: ${topic}

El artículo debe:
- Tener entre 800-1200 palabras
- Estar escrito en español
- Explicar conceptos técnicos de forma accesible
- Incluir secciones con headers en markdown (##, ###)
- Incluir ejemplos prácticos o datos reales cuando sea posible
- Tener un tono informativo y educativo
- Incluir una conclusión al final
- Ser optimizado para SEO
- NO incluir el título principal (solo secciones)

Estructura sugerida:
1. Introducción al tema
2. Explicación técnica
3. Casos de uso o aplicaciones prácticas
4. Impacto en el ecosistema
5. Conclusión y perspectivas futuras

Escribe el artículo completo en formato markdown:`,

  tutoriales: (topic) => `Escribe un tutorial completo y detallado sobre: ${topic}

El tutorial debe:
- Tener entre 800-1200 palabras
- Estar escrito en español
- Ser una guía paso a paso muy clara
- Incluir secciones con headers en markdown (##, ###)
- Incluir pasos numerados o listas cuando sea apropiado
- Incluir ejemplos de código o comandos cuando sea relevante (en bloques de código)
- Tener un tono instructivo y amigable
- Incluir consejos o advertencias importantes
- NO incluir el título principal (solo secciones)

Estructura sugerida:
1. Introducción: qué aprenderás
2. Requisitos previos
3. Pasos del tutorial (numerados)
4. Consejos y mejores prácticas
5. Conclusión

Escribe el tutorial completo en formato markdown:`
};

// Función para crear slug
function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generar título y tags
async function generateTitleAndTags(client, topic, category) {
  const prompt = `Para un artículo de blog sobre "${topic}" en la categoría ${CATEGORIES[category].name}, genera:

1. Un título SEO-friendly (máximo 60 caracteres, atractivo y claro)
2. Un excerpt de 1-2 líneas (máximo 160 caracteres)
3. 4-6 tags relevantes en español (palabras simples, separadas por comas, en formato slug como: bitcoin, defi, tutorial-python)

Responde SOLO en este formato JSON:
{
    "title": "título aquí",
    "excerpt": "excerpt aquí",
    "tags": ["tag1", "tag2", "tag3", "tag4"]
}`;

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 300
    });

    const responseText = completion.choices[0].message.content.trim();
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('No se pudo extraer JSON de la respuesta');
  } catch (error) {
    console.error(`Error generando metadata: ${error.message}`);
    // Fallback manual
    return {
      title: topic.substring(0, 60),
      excerpt: `Descubre todo sobre ${topic} en este artículo detallado.`,
      tags: CATEGORIES[category].tags_comunes.slice(0, 4)
    };
  }
}

// Generar contenido del artículo
async function generateArticleContent(client, topic, category) {
  const prompt = PROMPT_TEMPLATES[category](topic);

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.1-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 4000
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    console.error(`Error generando contenido: ${error.message}`);
    return `## Introducción

Este es un artículo sobre ${topic}.

## Contenido

[Contenido generado automáticamente]

## Conclusión

Este artículo cubre los aspectos fundamentales de ${topic}.`;
  }
}

// Sugerencias de imágenes
function generateImageSuggestions(topic, category) {
  const suggestions = {
    ia: [
      `Imagen conceptual de ${topic}`,
      'Robot o cerebro artificial',
      'Interfaz futurista de IA',
      'Código con elementos visuales de machine learning'
    ],
    blockchain: [
      `Ilustración de ${topic}`,
      'Cadena de bloques visual',
      'Gráficos de criptomonedas',
      'Red descentralizada abstracta'
    ],
    tutoriales: [
      `Screenshot o diagrama sobre ${topic}`,
      'Paso a paso visual',
      'Interfaz de usuario',
      'Código en pantalla'
    ]
  };

  return suggestions[category] || ['Imagen relacionada con el tema'];
}

// Crear archivo del post
function createPostFile(title, content, excerpt, tags, category, dateStr, filename) {
  const frontMatter = `---
layout: post
title: "${title}"
date: ${dateStr}
categories: [${category}]
tags: [${tags.join(', ')}]
excerpt: "${excerpt}"
---

`;

  const fullContent = frontMatter + content + `

---

*¿Te gustó este artículo? Síguenos en [@nachoweb3__x](https://twitter.com/nachoweb3__x) para más contenido sobre ${CATEGORIES[category].name}*
`;

  const postsDir = path.join(__dirname, '..', '_posts');
  const filepath = path.join(postsDir, filename);

  fs.writeFileSync(filepath, fullContent, 'utf-8');

  return filepath;
}

// Función principal
async function main() {
  const args = process.argv.slice(2);

  // Parse argumentos
  const getArg = (flag) => {
    const index = args.indexOf(flag);
    return index > -1 ? args[index + 1] : null;
  };

  const topic = getArg('--topic');
  const category = getArg('--category');
  const apiKey = getArg('--api-key') || process.env.GROQ_API_KEY;
  const dateArg = getArg('--date');

  // Validaciones
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Generador Automático de Artículos de Blog

Uso:
  node scripts/generate-post.js --topic "TEMA" --category CATEGORIA [opciones]

Opciones:
  --topic TEMA          Tema del artículo (requerido)
  --category CATEGORIA  Categoría: ia, blockchain, tutoriales (requerido)
  --api-key KEY        Groq API key (o usa GROQ_API_KEY env var)
  --date YYYY-MM-DD    Fecha del post (por defecto: hoy)
  --help, -h           Mostrar esta ayuda

Ejemplos:
  node scripts/generate-post.js --topic "GPT-4 vs Claude" --category ia
  node scripts/generate-post.js --topic "Staking en Ethereum" --category blockchain
  node scripts/generate-post.js --topic "Python para principiantes" --category tutoriales

Obtén una API key gratuita en: https://console.groq.com
    `);
    process.exit(0);
  }

  if (!topic) {
    console.error('ERROR: Debes especificar un --topic');
    process.exit(1);
  }

  if (!category || !['ia', 'blockchain', 'tutoriales'].includes(category)) {
    console.error('ERROR: Categoría inválida. Usa: ia, blockchain, o tutoriales');
    process.exit(1);
  }

  if (!apiKey) {
    console.error('ERROR: Necesitas proporcionar una API key de Groq.');
    console.error('\nOpciones:');
    console.error('1. Usar --api-key: node scripts/generate-post.js --api-key tu_key ...');
    console.error('2. Variable de entorno: export GROQ_API_KEY=tu_key');
    console.error('\nObtén una API key gratuita en: https://console.groq.com');
    process.exit(1);
  }

  // Inicializar cliente
  const client = new Groq({ apiKey });

  // Fecha
  const postDate = dateArg ? new Date(dateArg) : new Date();
  const dateStr = postDate.toISOString().slice(0, 19).replace('T', ' ') + ' -0500';
  const filenameDate = postDate.toISOString().slice(0, 10);

  console.log(`\n🚀 Generando artículo sobre: ${topic}`);
  console.log(`📁 Categoría: ${CATEGORIES[category].name}\n`);

  // Generar título y metadata
  console.log('⏳ Generando título y tags...');
  const metadata = await generateTitleAndTags(client, topic, category);
  console.log(`✅ Título: ${metadata.title}`);
  console.log(`✅ Tags: ${metadata.tags.join(', ')}\n`);

  // Generar contenido
  console.log('⏳ Generando contenido del artículo (esto puede tardar un momento)...');
  const content = await generateArticleContent(client, topic, category);
  console.log('✅ Contenido generado\n');

  // Sugerencias de imagen
  console.log('💡 Sugerencias de imagen:');
  const imageSuggestions = generateImageSuggestions(topic, category);
  imageSuggestions.forEach((suggestion, i) => {
    console.log(`   ${i + 1}. ${suggestion}`);
  });
  console.log();

  // Crear filename
  const titleSlug = slugify(metadata.title);
  const filename = `${filenameDate}-${titleSlug}.md`;

  // Crear archivo
  console.log('📝 Creando archivo...');
  const filepath = createPostFile(
    metadata.title,
    content,
    metadata.excerpt,
    metadata.tags,
    category,
    dateStr,
    filename
  );

  console.log(`✅ Artículo creado exitosamente: ${filepath}\n`);
  console.log('📋 Información del post:');
  console.log(`   Título: ${metadata.title}`);
  console.log(`   Fecha: ${dateStr}`);
  console.log(`   Categoría: ${category}`);
  console.log(`   Tags: ${metadata.tags.join(', ')}`);
  console.log(`   Archivo: ${filename}\n`);

  console.log('🎨 Próximos pasos:');
  console.log('   1. Revisa y edita el contenido generado');
  console.log('   2. Agrega una imagen destacada (sugerencias arriba)');
  console.log('   3. Verifica que todo esté correcto');
  console.log('   4. Haz commit del nuevo post');
  console.log('\n🎉 ¡Listo!');
}

// Ejecutar
main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
