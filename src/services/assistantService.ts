import { sampleSources } from '../data/sampleSources';
import { AppSettings } from '../types';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

function findBook(topic: string) {
  return sampleSources.find((source) => source.topic === topic);
}

function bookRecommendation(topic: string) {
  const book = findBook(topic);
  return book ? `\n\nLibro recomendado en NotebookLM: ${book.title}\n${book.notebookUrl}` : '';
}

export async function getAssistantResponse(question: string, settings: AppSettings): Promise<string> {
  await wait(850);

  const normalizedQuestion = question.toLowerCase();
  const student = settings.studentName.trim() || 'estudiante';
  const level = settings.level;

  // Futuro punto de integracion:
  // aqui se podria enviar la pregunta a un backend con IA/RAG, junto con embeddings
  // de PDFs, TXT, Markdown o DOCX cargados por el estudiante.
  if (normalizedQuestion.includes('python')) {
    return `${student}, Python es un lenguaje de programacion muy usado por su sintaxis clara. Para nivel ${level}, conviene iniciar con variables, condicionales, ciclos, funciones y listas. Ejemplo: una lista permite guardar varios datos y recorrerlos con un ciclo for.${bookRecommendation('python')}`;
  }

  if (
    normalizedQuestion.includes('sql') ||
    normalizedQuestion.includes('base de datos') ||
    normalizedQuestion.includes('bases de datos')
  ) {
    return `SQL sirve para trabajar con bases de datos relacionales. SELECT consulta datos, INSERT agrega registros, UPDATE modifica informacion existente y DELETE elimina registros. Una buena practica es usar WHERE con cuidado para evitar modificar mas filas de las necesarias.${bookRecommendation('bases de datos')}`;
  }

  if (normalizedQuestion.includes('c#') || normalizedQuestion.includes('csharp') || normalizedQuestion.includes('dotnet')) {
    return `C# es un lenguaje moderno del ecosistema .NET. Es muy util para aprender programacion orientada a objetos, crear aplicaciones de escritorio, servicios web y soluciones empresariales.${bookRecommendation('csharp')}`;
  }

  if (normalizedQuestion.includes('power bi') || normalizedQuestion.includes('powerbi')) {
    return `Power BI permite transformar datos en reportes visuales. Los temas clave son modelado de datos, relaciones, medidas DAX, limpieza de datos y publicacion de dashboards.${bookRecommendation('power bi')}`;
  }

  if (normalizedQuestion.includes('ciberseguridad') || normalizedQuestion.includes('seguridad')) {
    return `La ciberseguridad estudia como proteger sistemas, redes y datos. Empieza por conceptos de autenticacion, permisos, ataques comunes, copias de seguridad y buenas practicas de desarrollo seguro.${bookRecommendation('ciberseguridad')}`;
  }

  if (normalizedQuestion.includes('n8n') || normalizedQuestion.includes('automatizacion') || normalizedQuestion.includes('agente')) {
    return `N8N permite automatizar flujos de trabajo conectando servicios, APIs y asistentes inteligentes. Es ideal para practicar integraciones, disparadores, nodos y automatizaciones repetibles.${bookRecommendation('n8n')}`;
  }

  if (normalizedQuestion.includes('algoritmo') || normalizedQuestion.includes('algoritmos')) {
    return `Un algoritmo es una secuencia ordenada de pasos para resolver un problema. Por ejemplo, para calcular el promedio: sumar todas las notas, dividir entre la cantidad de notas y mostrar el resultado. La clave es que los pasos sean claros, finitos y verificables.${bookRecommendation('programacion')}`;
  }

  if (
    normalizedQuestion.includes('poo') ||
    normalizedQuestion.includes('orientada a objetos') ||
    normalizedQuestion.includes('clase') ||
    normalizedQuestion.includes('objeto')
  ) {
    return `La programacion orientada a objetos organiza el codigo en clases y objetos. Una clase define atributos y metodos; un objeto es una instancia concreta. La herencia permite reutilizar comportamiento y la encapsulacion protege el estado interno para que el codigo sea mas mantenible.${bookRecommendation('programacion')}`;
  }

  if (normalizedQuestion.includes('javascript') || normalizedQuestion.includes('js')) {
    return `JavaScript permite crear experiencias web interactivas. Sus bases son variables, funciones, eventos, manipulacion del DOM y asincronia con promesas o async/await. Puedes apoyarte en el Libro Programacion mientras agregas un notebook especifico de JavaScript.${bookRecommendation('programacion')}`;
  }

  if (normalizedQuestion.includes('html') || normalizedQuestion.includes('css')) {
    return `HTML define la estructura del contenido y CSS controla su presentacion visual. Para crear interfaces modernas, combina etiquetas semanticas, flexbox o grid, variables CSS y media queries para adaptar el diseno a movil, tablet y escritorio.${bookRecommendation('programacion')}`;
  }

  if (normalizedQuestion.includes('error') || normalizedQuestion.includes('debug') || normalizedQuestion.includes('depurar')) {
    return `Para depurar, reproduce el error, lee el mensaje completo, identifica la linea probable, agrega registros temporales y prueba una hipotesis a la vez. Documentar que cambiaste ayuda a aprender del problema y no solo a apagarlo.${bookRecommendation('programacion')}`;
  }

  return `Puedo ayudarte usando como guia los libros NotebookLM registrados: Programacion, Python, C#, Base de Datos, Power BI, Ciberseguridad y Agente N8N. Si tu pregunta depende de un tema especifico, abre el libro correspondiente en la seccion Libros NotebookLM o agrega un nuevo notebook como fuente manual.`;
}
