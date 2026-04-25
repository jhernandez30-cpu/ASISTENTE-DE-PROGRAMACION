import { sampleSources } from '../data/sampleSources';
import { AppSettings } from '../types';

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

interface TutorTopic {
  id: string;
  book: string;
  terms: string[];
  direct: string;
  steps: string[];
  example: string;
  mistakes: string[];
  recommendation: string;
  followUp: string;
}

const tutorTopics: TutorTopic[] = [
  {
    id: 'variables',
    book: 'programacion',
    terms: ['variable', 'variables', 'tipo de dato', 'datos primitivos'],
    direct: 'Una variable es un nombre que apunta a un valor guardado en memoria. Sirve para reutilizar datos y hacer que un programa trabaje con informacion que puede cambiar.',
    steps: [
      'Eliges un nombre descriptivo.',
      'Guardas un valor dentro de ese nombre.',
      'Usas la variable en operaciones, condiciones, funciones o salidas.',
      'Si el valor cambia, el programa trabaja con el nuevo dato.'
    ],
    example: '```python\nnombre = "Josue"\nedad = 22\n\nprint(nombre)\nprint(edad)\n```',
    mistakes: ['Usar nombres poco claros como x1 o dato2 sin contexto.', 'Confundir texto con numeros.', 'Cambiar el valor de una variable sin darte cuenta.'],
    recommendation: 'Practica creando variables para representar un estudiante, una nota, un precio y un estado verdadero/falso.',
    followUp: 'Quieres que te explique variables con ejemplos en Python, C# o JavaScript?'
  },
  {
    id: 'python',
    book: 'python',
    terms: ['python', 'pip', 'django', 'flask', 'pandas', 'lista', 'diccionario'],
    direct: 'Python es un lenguaje claro y practico para aprender programacion, automatizar tareas, analizar datos y crear aplicaciones.',
    steps: [
      'Empieza con variables, condicionales y ciclos.',
      'Aprende funciones para separar responsabilidades.',
      'Usa listas y diccionarios para organizar datos.',
      'Maneja errores con try/except cuando una operacion pueda fallar.',
      'Pasa a librerias como pandas, Flask o Django cuando ya domines lo basico.'
    ],
    example: '```python\nnotas = [90, 85, 100]\npromedio = sum(notas) / len(notas)\n\nif promedio >= 70:\n    print("Aprobado")\nelse:\n    print("Reprobado")\n```',
    mistakes: ['Olvidar la indentacion.', 'Mezclar strings y numeros sin convertir tipos.', 'Crear funciones demasiado largas.'],
    recommendation: 'Resuelve ejercicios pequenos: promedio, calculadora, validacion de contrasenas y lectura de listas.',
    followUp: 'Quieres que resolvamos un ejercicio de Python paso a paso?'
  },
  {
    id: 'javascript',
    book: 'programacion',
    terms: ['javascript', 'js', 'dom', 'evento', 'promesa', 'async', 'await', 'react', 'vite', 'typescript'],
    direct: 'JavaScript permite agregar logica e interactividad a sitios web y tambien construir aplicaciones completas con herramientas como React, Vite y TypeScript.',
    steps: [
      'HTML crea la estructura.',
      'CSS define el diseno.',
      'JavaScript responde a eventos y modifica datos o interfaz.',
      'React divide la interfaz en componentes.',
      'TypeScript agrega tipos para evitar errores comunes.'
    ],
    example: '```ts\nconst lenguajes: string[] = ["Python", "C#", "JavaScript"];\n\nlenguajes.forEach((lenguaje) => {\n  console.log(`Estoy aprendiendo ${lenguaje}`);\n});\n```',
    mistakes: ['No entender la asincronia.', 'Modificar el DOM directamente cuando usas React.', 'Ignorar errores de TypeScript en vez de corregir el modelo de datos.'],
    recommendation: 'Crea componentes pequenos y prueba cada funcion con datos simples antes de conectar servicios externos.',
    followUp: 'Quieres un ejemplo en JavaScript puro, React o TypeScript?'
  },
  {
    id: 'csharp',
    book: 'csharp',
    terms: ['c#', 'csharp', '.net', 'dotnet', 'linq', 'visual studio'],
    direct: 'C# es un lenguaje moderno del ecosistema .NET, muy usado para aplicaciones de escritorio, web APIs, servicios y sistemas empresariales.',
    steps: [
      'Define clases para representar entidades.',
      'Usa metodos para expresar comportamientos.',
      'Aplica interfaces cuando necesites contratos.',
      'Usa excepciones para errores controlados.',
      'Aprovecha LINQ para consultar colecciones de forma clara.'
    ],
    example: '```csharp\npublic class Estudiante\n{\n    public string Nombre { get; set; } = \"\";\n    public double Nota { get; set; }\n\n    public bool Aprobado() => Nota >= 70;\n}\n```',
    mistakes: ['Poner toda la logica en una sola clase.', 'No validar entradas.', 'Confundir propiedades con variables locales.'],
    recommendation: 'Practica creando clases pequenas como Estudiante, Curso, Producto y Factura.',
    followUp: 'Quieres que lo llevemos a una app de consola, escritorio o API en C#?'
  },
  {
    id: 'sql',
    book: 'bases de datos',
    terms: ['sql', 'select', 'insert', 'update', 'delete', 'join', 'tabla', 'consulta', 'base de datos', 'bases de datos'],
    direct: 'SQL sirve para consultar, insertar, modificar y eliminar informacion en bases de datos relacionales.',
    steps: [
      'Identifica la tabla principal.',
      'Selecciona las columnas necesarias.',
      'Filtra con WHERE.',
      'Relaciona tablas con JOIN si hace falta.',
      'Ordena o agrupa los resultados cuando sea necesario.'
    ],
    example: '```sql\nSELECT e.nombre, c.nombre AS curso\nFROM estudiantes e\nINNER JOIN cursos c ON c.id = e.curso_id\nWHERE e.activo = 1\nORDER BY e.nombre;\n```',
    mistakes: ['Usar SELECT * sin necesidad.', 'Ejecutar UPDATE o DELETE sin WHERE.', 'Crear tablas sin claves primarias o relaciones claras.'],
    recommendation: 'Antes de modificar datos, prueba la condicion con SELECT para confirmar las filas afectadas.',
    followUp: 'Quieres que te ayude a crear una consulta SQL especifica?'
  },
  {
    id: 'algoritmos',
    book: 'programacion',
    terms: ['algoritmo', 'algoritmos', 'pseudocodigo', 'diagrama de flujo', 'ordenamiento', 'busqueda'],
    direct: 'Un algoritmo es una secuencia clara y finita de pasos para resolver un problema.',
    steps: [
      'Define el problema en una frase.',
      'Identifica entradas y salidas.',
      'Divide la solucion en pasos simples.',
      'Prueba con ejemplos normales y casos limite.',
      'Convierte el pseudocodigo al lenguaje elegido.'
    ],
    example: '```text\nAlgoritmo promedio:\n1. Leer cantidad de notas.\n2. Sumar cada nota.\n3. Dividir suma entre cantidad.\n4. Mostrar promedio.\n```',
    mistakes: ['Empezar a programar sin entender el problema.', 'No probar casos limite.', 'Hacer pasos demasiado grandes o ambiguos.'],
    recommendation: 'Antes del codigo, escribe siempre 4 o 5 pasos en lenguaje natural.',
    followUp: 'Quieres que transformemos un problema tuyo en algoritmo y luego en codigo?'
  },
  {
    id: 'poo',
    book: 'programacion',
    terms: ['poo', 'orientada a objetos', 'objeto', 'clase', 'herencia', 'encapsulamiento', 'polimorfismo', 'abstraccion'],
    direct: 'La programacion orientada a objetos organiza el software en clases y objetos para modelar entidades, responsabilidades y comportamientos.',
    steps: [
      'Una clase define la estructura.',
      'Un objeto es una instancia concreta.',
      'Encapsulamiento protege datos internos.',
      'Herencia reutiliza comportamiento.',
      'Polimorfismo permite usar distintos objetos bajo una misma interfaz.'
    ],
    example: '```python\nclass Persona:\n    def __init__(self, nombre):\n        self.nombre = nombre\n\n    def saludar(self):\n        return f\"Hola, soy {self.nombre}\"\n\npersona = Persona(\"Josue\")\nprint(persona.saludar())\n```',
    mistakes: ['Crear clases sin responsabilidad clara.', 'Abusar de la herencia.', 'Exponer todos los datos internos sin control.'],
    recommendation: 'Modela primero sustantivos importantes del problema: Usuario, Curso, Producto, Pedido.',
    followUp: 'Quieres que te explique POO con un ejemplo academico o con una app real?'
  },
  {
    id: 'estructuras',
    book: 'programacion',
    terms: ['estructura de datos', 'array', 'arreglo', 'lista', 'pila', 'cola', 'mapa', 'hash', 'arbol', 'grafo'],
    direct: 'Las estructuras de datos son formas de organizar informacion para consultarla, modificarla o recorrerla de manera eficiente.',
    steps: [
      'Usa listas/arreglos para colecciones ordenadas.',
      'Usa pilas cuando el ultimo en entrar debe salir primero.',
      'Usa colas cuando el primero en entrar debe salir primero.',
      'Usa mapas/diccionarios para buscar por clave.',
      'Usa arboles o grafos para relaciones jerarquicas o conectadas.'
    ],
    example: '```python\nestudiantes = {\n    \"A001\": \"Ana\",\n    \"A002\": \"Luis\"\n}\n\nprint(estudiantes[\"A001\"])\n```',
    mistakes: ['Elegir una estructura solo porque es familiar.', 'Buscar repetidamente en listas grandes cuando conviene un diccionario.', 'No considerar el costo de busqueda, insercion y eliminacion.'],
    recommendation: 'Cuando tengas datos, pregunta: necesito orden, busqueda rapida, jerarquia o relacion entre nodos?',
    followUp: 'Quieres comparar lista, pila, cola y diccionario con ejemplos?'
  },
  {
    id: 'web',
    book: 'programacion',
    terms: ['html', 'css', 'responsive', 'flexbox', 'grid', 'frontend', 'backend', 'api', 'pwa', 'web'],
    direct: 'Una aplicacion web combina interfaz, logica, datos y comunicacion con servicios. HTML estructura, CSS disena y JavaScript controla comportamiento.',
    steps: [
      'Define pantallas y flujo del usuario.',
      'Construye componentes reutilizables.',
      'Conecta datos locales o APIs.',
      'Maneja errores y estados de carga.',
      'Optimiza para movil, accesibilidad y rendimiento.'
    ],
    example: '```tsx\nfunction Saludo({ nombre }: { nombre: string }) {\n  return <h1>Hola, {nombre}</h1>;\n}\n```',
    mistakes: ['Crear pantallas bonitas sin flujo claro.', 'No manejar estados de carga o error.', 'Ignorar responsive y accesibilidad.'],
    recommendation: 'Empieza con una version funcional pequena y luego mejora estilos, validaciones y persistencia.',
    followUp: 'Quieres ayuda para crear una pantalla, una API o una PWA completa?'
  },
  {
    id: 'debug',
    book: 'programacion',
    terms: ['error', 'bug', 'debug', 'depurar', 'fallo', 'no funciona', 'excepcion', 'exception', 'undefined', 'null'],
    direct: 'Depurar consiste en encontrar por que el programa no se comporta como esperas y corregir la causa real, no solo el sintoma.',
    steps: [
      'Reproduce el error.',
      'Lee el mensaje completo.',
      'Ubica archivo, linea y funcion.',
      'Inspecciona los valores de variables.',
      'Prueba una hipotesis a la vez.'
    ],
    example: '```text\nSi aparece: Cannot read properties of undefined\nRevisa que el objeto exista antes de usar sus propiedades.\n```',
    mistakes: ['Cambiar muchas cosas al mismo tiempo.', 'No leer el mensaje de error.', 'Copiar soluciones sin entender la causa.'],
    recommendation: 'Comparte el error exacto y el fragmento de codigo; con eso puedo ayudarte a corregirlo paso a paso.',
    followUp: 'Puedes pegar aqui el codigo y el mensaje de error completo?'
  },
  {
    id: 'power bi',
    book: 'power bi',
    terms: ['power bi', 'powerbi', 'dax', 'dashboard', 'reporte', 'visualizacion', 'medida'],
    direct: 'Power BI transforma datos en reportes interactivos para analizar indicadores y tomar decisiones.',
    steps: [
      'Carga los datos.',
      'Limpia y transforma con Power Query.',
      'Crea relaciones entre tablas.',
      'Define medidas DAX.',
      'Disena visuales claros segun la pregunta de negocio.'
    ],
    example: '```DAX\nVentas Totales = SUM(Ventas[Monto])\n\nTicket Promedio = DIVIDE([Ventas Totales], COUNTROWS(Ventas))\n```',
    mistakes: ['Crear visuales sin pregunta de negocio.', 'No revisar relaciones.', 'Usar columnas calculadas cuando conviene una medida.'],
    recommendation: 'Antes de disenar, escribe que decision debe ayudar a tomar el dashboard.',
    followUp: 'Quieres ayuda con una medida DAX o con el modelo de datos?'
  },
  {
    id: 'ciberseguridad',
    book: 'ciberseguridad',
    terms: ['ciberseguridad', 'seguridad', 'vulnerabilidad', 'password', 'contrasena', 'autenticacion', 'encriptar', 'hash', 'sql injection'],
    direct: 'La ciberseguridad defensiva busca proteger sistemas, datos y usuarios reduciendo riesgos y evitando malas practicas.',
    steps: [
      'Valida entradas de usuario.',
      'Usa autenticacion y autorizacion correctas.',
      'Nunca guardes contrasenas en texto plano.',
      'Protege claves y tokens en variables de entorno.',
      'Registra eventos importantes y actualiza dependencias.'
    ],
    example: '```text\nBuena practica:\n- Guardar hash de contrasena, no la contrasena real.\n- Usar consultas parametrizadas para evitar inyeccion SQL.\n```',
    mistakes: ['Subir claves API a GitHub.', 'Confiar en datos del cliente.', 'Dar permisos excesivos a usuarios o servicios.'],
    recommendation: 'Piensa siempre en defensa por capas: validacion, permisos, cifrado, monitoreo y copias de seguridad.',
    followUp: 'Quieres revisar la seguridad de un formulario, API o base de datos?'
  },
  {
    id: 'n8n',
    book: 'n8n',
    terms: ['n8n', 'automatizacion', 'workflow', 'flujo', 'webhook', 'agente'],
    direct: 'N8N permite automatizar procesos conectando aplicaciones, APIs y asistentes mediante flujos visuales.',
    steps: [
      'Define el evento que inicia el flujo.',
      'Agrega nodos para obtener o transformar datos.',
      'Usa condiciones para decidir caminos.',
      'Conecta servicios externos con credenciales seguras.',
      'Registra errores y resultados.'
    ],
    example: '```text\nWebhook -> Validar datos -> Consultar API -> Enviar correo -> Guardar registro\n```',
    mistakes: ['No manejar errores.', 'Guardar credenciales de forma insegura.', 'Crear flujos largos sin documentacion.'],
    recommendation: 'Empieza con un flujo pequeno y agrega nodos gradualmente mientras pruebas cada paso.',
    followUp: 'Quieres que disenemos un flujo N8N para una tarea concreta?'
  },
  {
    id: 'ia',
    book: 'programacion',
    terms: ['ia', 'inteligencia artificial', 'rag', 'llm', 'prompt', 'embedding', 'modelo', 'chatbot'],
    direct: 'La IA aplicada al desarrollo ayuda a generar, explicar, buscar y transformar informacion, pero debe integrarse con buenas practicas de arquitectura y seguridad.',
    steps: [
      'Define el caso de uso: responder, clasificar, resumir o automatizar.',
      'Prepara datos confiables.',
      'Si necesitas conocimiento propio, usa RAG con documentos indexados.',
      'Valida respuestas y maneja errores.',
      'No expongas claves ni datos sensibles.'
    ],
    example: '```text\nFlujo RAG:\nDocumento -> Fragmentos -> Embeddings -> Busqueda vectorial -> Contexto -> Respuesta del modelo\n```',
    mistakes: ['Confiar ciegamente en la respuesta del modelo.', 'No citar fuentes internas.', 'Enviar datos sensibles sin control.'],
    recommendation: 'Para una app educativa, combina notebooks manuales hoy y RAG propio cuando tengas documentos cargables.',
    followUp: 'Quieres que te explique como implementar RAG en esta aplicacion?'
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

  if (!book) {
    return 'Fuente sugerida: puedes apoyarte en los notebooks registrados o agregar un notebook especifico para este tema.';
  }

  return `Fuente util: ${book.title} en NotebookLM. No necesito que lo abras para ayudarte, pero puede servirte para profundizar.\n${book.notebookUrl}`;
}

function detectTopic(normalizedQuestion: string) {
  return tutorTopics.find((topic) => topic.terms.some((term) => normalizedQuestion.includes(normalize(term))));
}

function looksLikeCode(question: string) {
  return /```|;|{|}|\bconsole\.log\b|\bprint\(|\bSELECT\b|\bpublic class\b|\bfunction\b|\bconst\b|\blet\b|\bvar\b/i.test(question);
}

function buildResponse(topic: TutorTopic, settings: AppSettings) {
  const level = settings.level;

  return `1. Respuesta directa:
${topic.direct}

2. Explicacion paso a paso:
${topic.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

3. Ejemplo practico:
${topic.example}

4. Errores comunes:
${topic.mistakes.map((mistake) => `- ${mistake}`).join('\n')}

5. Recomendacion:
Para tu nivel ${level}, ${topic.recommendation}
${bookRecommendation(topic.book)}

6. Pregunta de seguimiento:
${topic.followUp}`;
}

function buildCodeReviewAnswer(question: string, settings: AppSettings) {
  const favoriteLanguage = settings.favoriteLanguage.trim() || 'Python';

  return `1. Respuesta directa:
Puedo ayudarte a revisar ese codigo. A primera vista, lo correcto es analizar el error por partes: sintaxis, tipos de datos, variables no definidas, flujo logico y resultado esperado.

2. Explicacion paso a paso:
1. Identifica que esperabas que hiciera el codigo.
2. Revisa el mensaje de error exacto.
3. Ubica la linea donde falla.
4. Comprueba si las variables existen y tienen el tipo correcto.
5. Prueba con un caso pequeno antes de ejecutar todo el programa.

3. Ejemplo practico:
\`\`\`${favoriteLanguage.toLowerCase()}
# Ejemplo de depuracion simple
valor = input("Escribe un numero: ")
numero = int(valor)
print(numero * 2)
\`\`\`

4. Errores comunes:
- Usar una variable antes de declararla.
- Mezclar texto y numeros sin conversion.
- Olvidar llaves, parentesis, punto y coma o indentacion segun el lenguaje.
- No validar datos de entrada.

5. Recomendacion:
Pega el codigo completo y el mensaje de error exacto. Si no tienes mensaje de error, dime que resultado esperabas y que resultado obtuviste. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Quieres que corrija el codigo linea por linea?`;
}

function buildGeneralProgrammingAnswer(question: string, settings: AppSettings) {
  const student = settings.studentName.trim() || 'estudiante';
  const favoriteLanguage = settings.favoriteLanguage.trim() || 'Python';

  return `1. Respuesta directa:
${student}, puedo ayudarte con esa pregunta de programacion. La idea principal es convertir el problema en pasos pequenos y luego expresarlos en codigo claro.

2. Explicacion paso a paso:
1. Define el objetivo: que debe lograr el programa.
2. Identifica entradas: datos que recibe el programa.
3. Identifica salidas: resultado esperado.
4. Divide la solucion en funciones o pasos.
5. Implementa una primera version simple en ${favoriteLanguage}.
6. Prueba casos normales, casos vacios y casos limite.

3. Ejemplo practico:
\`\`\`${favoriteLanguage.toLowerCase()}
# Pseudoejemplo adaptable
datos = [1, 2, 3]
resultado = sum(datos)
print(resultado)
\`\`\`

4. Errores comunes:
- Empezar a programar sin entender el problema.
- Hacer una solucion demasiado grande desde el inicio.
- No probar con diferentes datos.
- No separar responsabilidades en funciones.

5. Recomendacion:
Pregunta recibida: "${question}"

Si me das el lenguaje, el codigo o el resultado esperado, puedo darte una solucion mas exacta. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Quieres que lo resolvamos en Python, C#, SQL o JavaScript?`;
}

export async function getAssistantResponse(question: string, settings: AppSettings): Promise<string> {
  await wait(650);

  const normalizedQuestion = normalize(question);
  const detectedTopic = detectTopic(normalizedQuestion);

  // Futuro punto de integracion:
  // aqui se conectaria un backend real con IA/RAG para recuperar fragmentos de libros,
  // PDFs, TXT, Markdown o DOCX y responder con citas verificables.
  if (looksLikeCode(question) && !detectedTopic) {
    return buildCodeReviewAnswer(question, settings);
  }

  if (detectedTopic) {
    return buildResponse(detectedTopic, settings);
  }

  return buildGeneralProgrammingAnswer(question, settings);
}
