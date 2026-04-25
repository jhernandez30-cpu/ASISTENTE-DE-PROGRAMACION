import { sampleSources } from '../data/sampleSources';
import { AppSettings } from '../types';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const topicPatterns = [
  {
    topic: 'python',
    book: 'python',
    terms: ['python', 'pip', 'django', 'flask', 'pandas', 'lista', 'diccionario'],
    answer:
      'Python es un lenguaje claro y practico. Para resolver problemas, piensa en datos de entrada, pasos de transformacion y salida. Sus bases son variables, condicionales, ciclos, funciones, listas, diccionarios y manejo de errores. Ejemplo: si necesitas procesar notas, puedes guardarlas en una lista, recorrerlas con for, sumar sus valores y calcular el promedio.'
  },
  {
    topic: 'javascript',
    book: 'programacion',
    terms: ['javascript', 'js', 'dom', 'evento', 'promesa', 'async', 'await', 'react', 'vite', 'typescript'],
    answer:
      'JavaScript se usa para crear logica e interactividad, especialmente en la web. Sus ideas clave son funciones, objetos, arreglos, eventos, asincronia y manipulacion del DOM. Si trabajas con React, piensa en componentes, props, estado y eventos; cada pantalla se divide en piezas reutilizables.'
  },
  {
    topic: 'csharp',
    book: 'csharp',
    terms: ['c#', 'csharp', 'dotnet', '.net', 'visual studio', 'linq'],
    answer:
      'C# es un lenguaje del ecosistema .NET. Es fuerte para programacion orientada a objetos, aplicaciones de escritorio, APIs y sistemas empresariales. Sus bases son tipos, clases, metodos, propiedades, interfaces, colecciones, excepciones y LINQ.'
  },
  {
    topic: 'sql',
    book: 'bases de datos',
    terms: ['sql', 'select', 'insert', 'update', 'delete', 'join', 'tabla', 'consulta', 'base de datos', 'bases de datos'],
    answer:
      'SQL sirve para consultar y modificar datos en bases relacionales. SELECT obtiene informacion, INSERT agrega registros, UPDATE modifica datos y DELETE elimina filas. Para relacionar tablas se usan JOIN. Una regla importante: antes de UPDATE o DELETE, revisa el WHERE con un SELECT.'
  },
  {
    topic: 'algoritmos',
    book: 'programacion',
    terms: ['algoritmo', 'algoritmos', 'pseudocodigo', 'diagrama de flujo', 'ordenamiento', 'busqueda'],
    answer:
      'Un algoritmo es una serie finita y ordenada de pasos para resolver un problema. Para construirlo, define el objetivo, identifica entradas, escribe pasos simples, prueba con ejemplos y revisa casos limite. Ejemplo para promedio: leer notas, sumarlas, contar cuantas hay, dividir suma entre cantidad y mostrar resultado.'
  },
  {
    topic: 'poo',
    book: 'programacion',
    terms: ['poo', 'orientada a objetos', 'objeto', 'clase', 'herencia', 'encapsulamiento', 'polimorfismo', 'abstraccion'],
    answer:
      'La programacion orientada a objetos organiza el codigo en clases y objetos. Una clase es el molde, un objeto es una instancia. Encapsulamiento protege datos internos, herencia reutiliza comportamiento, abstraccion oculta detalles y polimorfismo permite usar objetos distintos con una interfaz comun.'
  },
  {
    topic: 'estructuras',
    book: 'programacion',
    terms: ['estructura de datos', 'array', 'arreglo', 'lista', 'pila', 'cola', 'mapa', 'hash', 'arbol', 'grafo'],
    answer:
      'Las estructuras de datos organizan informacion para usarla mejor. Un arreglo guarda elementos por posicion, una pila usa ultimo en entrar primero en salir, una cola usa primero en entrar primero en salir, un mapa guarda pares clave-valor, y arboles o grafos modelan relaciones mas complejas.'
  },
  {
    topic: 'web',
    book: 'programacion',
    terms: ['html', 'css', 'responsive', 'flexbox', 'grid', 'web', 'frontend', 'backend', 'api', 'pwa'],
    answer:
      'En desarrollo web, HTML define la estructura, CSS define el aspecto visual y JavaScript agrega comportamiento. Frontend es lo que ve el usuario; backend maneja datos, reglas y servicios. Una PWA agrega manifest, service worker y comportamiento instalable/offline.'
  },
  {
    topic: 'debug',
    book: 'programacion',
    terms: ['error', 'bug', 'debug', 'depurar', 'fallo', 'no funciona', 'excepcion', 'exception'],
    answer:
      'Para depurar, reproduce el problema, lee el mensaje de error completo, identifica en que linea ocurre, revisa los datos de entrada, agrega registros temporales y cambia una cosa a la vez. Si el error es grande, reduce el caso hasta encontrar el paso exacto que falla.'
  },
  {
    topic: 'power bi',
    book: 'power bi',
    terms: ['power bi', 'powerbi', 'dax', 'dashboard', 'reporte', 'visualizacion'],
    answer:
      'Power BI permite convertir datos en reportes y dashboards. Sus bases son importar datos, limpiarlos, crear relaciones, definir medidas DAX y escoger visualizaciones adecuadas. Un buen reporte responde preguntas concretas, no solo muestra graficos bonitos.'
  },
  {
    topic: 'ciberseguridad',
    book: 'ciberseguridad',
    terms: ['ciberseguridad', 'seguridad', 'vulnerabilidad', 'ataque', 'password', 'contrasena', 'autenticacion', 'encriptar'],
    answer:
      'La ciberseguridad protege sistemas, cuentas y datos. En programacion, empieza con contrasenas seguras, validacion de entradas, autenticacion correcta, permisos minimos, copias de seguridad, actualizaciones y cuidado con inyeccion SQL o exposicion de claves.'
  },
  {
    topic: 'n8n',
    book: 'n8n',
    terms: ['n8n', 'automatizacion', 'workflow', 'flujo', 'webhook', 'agente'],
    answer:
      'N8N sirve para automatizar flujos conectando aplicaciones, APIs y servicios. Un flujo suele tener un disparador, pasos de procesamiento, condiciones y una accion final. Es muy util para tareas repetitivas, integraciones y asistentes conectados a herramientas.'
  }
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function findBook(topic: string) {
  return sampleSources.find((source) => source.topic === topic);
}

function bookRecommendation(topic: string) {
  const book = findBook(topic);
  return book ? `\n\nLibro recomendado en NotebookLM: ${book.title}\n${book.notebookUrl}` : '';
}

function detectTopic(normalizedQuestion: string) {
  return topicPatterns.find((pattern) => pattern.terms.some((term) => normalizedQuestion.includes(normalize(term))));
}

function buildGeneralProgrammingAnswer(question: string, settings: AppSettings) {
  const student = settings.studentName.trim() || 'estudiante';
  const favoriteLanguage = settings.favoriteLanguage.trim() || 'Python';

  return `${student}, puedo ayudarte con esa pregunta de programacion. Para resolverla, conviene analizarla asi:

1. Define que quieres lograr con el programa.
2. Identifica los datos de entrada y el resultado esperado.
3. Divide el problema en pasos pequenos.
4. Escribe una primera solucion simple en ${favoriteLanguage}.
5. Prueba con casos normales, casos vacios y casos limite.

Pregunta recibida: "${question}"

Una forma practica de empezar es escribir el problema en pseudocodigo y luego convertir cada paso en codigo. Si compartes el lenguaje o el fragmento de codigo, puedo ayudarte a explicarlo, corregirlo o convertirlo en una solucion mas completa.${bookRecommendation('programacion')}`;
}

export async function getAssistantResponse(question: string, settings: AppSettings): Promise<string> {
  await wait(650);

  const normalizedQuestion = normalize(question);
  const detectedTopic = detectTopic(normalizedQuestion);

  // Futuro punto de integracion:
  // aqui se podria enviar la pregunta a un backend con IA/RAG, junto con embeddings
  // de PDFs, TXT, Markdown o DOCX cargados por el estudiante.
  if (detectedTopic) {
    return `${detectedTopic.answer}${bookRecommendation(detectedTopic.book)}`;
  }

  return buildGeneralProgrammingAnswer(question, settings);
}
