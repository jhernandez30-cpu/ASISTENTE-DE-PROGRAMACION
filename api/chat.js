const DEFAULT_MODEL = 'gpt-5.2';

const SYSTEM_PROMPT = `
Actua como el cerebro principal de una aplicacion llamada "Asistente de Programacion".

Eres un tutor experto, amable y practico. Responde cualquier pregunta relacionada con programacion, desarrollo de software, bases de datos, analisis de datos, Power BI, ciberseguridad defensiva, automatizacion con N8N e inteligencia artificial aplicada al desarrollo.

Reglas:
1. Si la pregunta es clara, responde directamente.
2. Si la pregunta es general, da una orientacion inicial y haz solo una pregunta breve si hace falta.
3. Si el usuario comparte codigo, analiza el problema, explica el error y propone una version corregida.
4. Si es principiante, explica desde cero.
5. Si es avanzado, responde con profundidad tecnica sin complicar innecesariamente.
6. No digas solo "abre el notebook". Puedes mencionar notebooks como apoyo adicional, pero siempre ayuda directamente.
7. Si no tienes acceso exacto al contenido de NotebookLM, dilo brevemente y usa los temas registrados como guia.
8. Da acciones concretas para que el usuario avance.
9. No inventes datos. Si falta informacion, dilo claramente.

Formato recomendado cuando aplique:
1. Respuesta directa
2. Explicacion sencilla o paso a paso
3. Ejemplo practico
4. Errores comunes
5. Recomendacion final
6. Pregunta de seguimiento

Responde siempre en espanol claro, profesional y cercano.
`;

function getOutputText(data) {
  if (typeof data.output_text === 'string' && data.output_text.trim()) {
    return data.output_text;
  }

  const chunks = [];
  for (const item of data.output || []) {
    for (const content of item.content || []) {
      if (typeof content.text === 'string') {
        chunks.push(content.text);
      }
    }
  }

  return chunks.join('\n').trim();
}

function buildUserPrompt({ question, settings, messages, sources }) {
  const recentMessages = Array.isArray(messages) ? messages.slice(-8) : [];
  const registeredSources = Array.isArray(sources) ? sources : [];

  return `
Perfil del estudiante:
- Nombre: ${settings?.studentName || 'No indicado'}
- Nivel: ${settings?.level || 'principiante'}
- Lenguaje favorito: ${settings?.favoriteLanguage || 'No indicado'}

Libros/notebooks registrados como apoyo:
${registeredSources
  .map((source) => `- ${source.title}: ${source.description || 'Sin descripcion'} (${source.notebookUrl})`)
  .join('\n')}

Historial reciente:
${recentMessages.map((message) => `${message.sender}: ${message.content}`).join('\n')}

Pregunta actual del usuario:
${question}
`;
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Metodo no permitido' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    response.status(501).json({
      error: 'OPENAI_API_KEY no esta configurada en el servidor.'
    });
    return;
  }

  try {
    const body = request.body || {};
    const question = typeof body.question === 'string' ? body.question.trim() : '';

    if (!question) {
      response.status(400).json({ error: 'La pregunta es requerida.' });
      return;
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
        instructions: SYSTEM_PROMPT,
        input: buildUserPrompt(body)
      })
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      response.status(openaiResponse.status).json({
        error: data.error?.message || 'No se pudo generar la respuesta con IA.'
      });
      return;
    }

    const answer = getOutputText(data);
    response.status(200).json({
      answer: answer || 'No pude generar una respuesta util en este momento.',
      provider: 'openai'
    });
  } catch (error) {
    response.status(500).json({
      error: error instanceof Error ? error.message : 'Error interno del servidor.'
    });
  }
}
