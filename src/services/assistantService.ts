import { sampleSources } from '../data/sampleSources';
import { AppSettings, ChatMessage, SourceItem } from '../types';

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

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(normalize(term)));
}

function buildStartLearningAnswer(settings: AppSettings) {
  const student = settings.studentName.trim() || 'estudiante';

  return `1. Respuesta directa:
${student}, si quieres aprender a programar desde cero, comienza por logica de programacion y luego usa Python como primer lenguaje. Python es claro, practico y te permite avanzar hacia web, datos, automatizacion e inteligencia artificial.

2. Explicacion sencilla:
Programar no empieza memorizando comandos. Empieza aprendiendo a pensar en pasos: recibir datos, tomar decisiones, repetir acciones, organizar informacion y resolver problemas pequenos.

3. Ruta sugerida:
1. Logica de programacion: variables, condicionales, ciclos, funciones y listas.
2. Python basico: sintaxis, entrada/salida, funciones, archivos y errores.
3. Algoritmos simples: promedio, busqueda, ordenamiento basico y validaciones.
4. Bases de datos: tablas, SQL, SELECT, INSERT, UPDATE, DELETE y relaciones.
5. Proyectos pequenos: calculadora, agenda, sistema de notas e inventario.
6. Especializacion: web, escritorio, datos, ciberseguridad o automatizacion.

4. Ejemplo practico:
\`\`\`python
nombre = input("Cual es tu nombre? ")
print("Hola", nombre)
\`\`\`
Mini proyectos para iniciar:
- Calculadora basica.
- Conversor de temperatura.
- Juego de adivinar un numero.
- Registro de estudiantes con notas.

5. Recomendacion final:
Estudia 30 minutos diarios durante 30 dias. No saltes directo a frameworks; primero domina logica, Python y ejercicios pequenos. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Quieres que te prepare una ruta de aprendizaje de 30 dias desde cero?`;
}

function buildLanguageRecommendationAnswer() {
  return `1. Respuesta directa:
Si estas empezando desde cero, te recomiendo Python. Pero el mejor lenguaje depende de lo que quieras crear.

2. Explicacion sencilla:
Python es ideal para aprender logica porque se lee facil. JavaScript es clave para paginas web. C# es excelente para software empresarial y aplicaciones con .NET. SQL es obligatorio si vas a trabajar con datos.

3. Ruta sugerida:
Si quieres desarrollo web:
- HTML, CSS y JavaScript.
- Luego React.
- Despues APIs con Node.js o C#.

Si quieres aplicaciones de escritorio o software empresarial:
- C#.
- .NET.
- SQL Server.

Si quieres datos o inteligencia artificial:
- Python.
- SQL.
- Pandas.
- Power BI.

Si quieres ciberseguridad:
- Redes.
- Linux.
- Python.
- Seguridad web y OWASP.

Si quieres automatizacion:
- Python.
- N8N.
- APIs.
- JSON y webhooks.

4. Ejemplo practico:
Una buena combinacion inicial seria:
\`\`\`text
Mes 1: Logica + Python
Mes 2: SQL + proyectos pequenos
Mes 3: Elegir ruta: Web, Datos, C#, Ciberseguridad o N8N
\`\`\`

5. Recomendacion final:
Empieza con Python si no tienes objetivo claro. Si ya sabes que quieres hacer paginas web, empieza con HTML, CSS y JavaScript. ${bookRecommendation('python')}

6. Pregunta de seguimiento:
Tu objetivo es hacer paginas web, aplicaciones, inteligencia artificial, datos, ciberseguridad o trabajar como programador?`;
}

function buildUnknownAreaAnswer() {
  return `1. Respuesta directa:
Es normal no saber que area elegir al inicio. Lo mejor es aprender fundamentos y probar mini proyectos de varias areas.

2. Explicacion sencilla:
La programacion tiene muchas rutas. No tienes que elegir para siempre desde el primer dia; puedes explorar y decidir con experiencia real.

3. Ruta sugerida:
1. Desarrollo web: paginas y sistemas web. Tecnologias: HTML, CSS, JavaScript, React, APIs.
2. Software empresarial: sistemas para negocios. Tecnologias: C#, .NET, SQL Server.
3. Datos e inteligencia de negocios: reportes y analisis. Tecnologias: SQL, Python, Power BI.
4. Ciberseguridad: proteger sistemas. Tecnologias: redes, Linux, Python, seguridad web.
5. Automatizacion: ahorrar tiempo con flujos. Tecnologias: N8N, APIs, Python, JSON.
6. Inteligencia artificial aplicada: chatbots, RAG y asistentes. Tecnologias: Python, APIs, embeddings, bases de conocimiento.

4. Ejemplo practico:
Prueba estos mini proyectos:
- Web: una pagina personal responsive.
- C#: un sistema de inventario de consola.
- Datos: dashboard simple de ventas en Power BI.
- Ciberseguridad: checklist defensivo de contrasenas y permisos.
- N8N: flujo que recibe un formulario y envia un correo.

5. Recomendacion final:
Empieza con logica + Python durante unas semanas y luego prueba un proyecto pequeno de cada area. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Quieres que te haga una prueba rapida para saber que area se adapta mas a ti?`;
}

function buildWebPathAnswer() {
  return `1. Respuesta directa:
Para crear paginas web, aprende HTML, CSS y JavaScript. Luego pasa a Git/GitHub, responsive design, APIs y un framework como React.

2. Explicacion sencilla:
HTML es la estructura, CSS es el diseno y JavaScript es el comportamiento. Cuando ya controles eso, React te ayuda a crear interfaces mas organizadas con componentes.

3. Ruta sugerida:
1. HTML semantico.
2. CSS: flexbox, grid, responsive y variables.
3. JavaScript: DOM, eventos, funciones, arrays, objetos y asincronia.
4. Git y GitHub.
5. APIs con fetch.
6. React + Vite + TypeScript.
7. PWA, autenticacion y despliegue en Vercel.

4. Ejemplo practico:
\`\`\`html
<button id="saludar">Saludar</button>
<script>
  document.getElementById("saludar").addEventListener("click", () => {
    alert("Hola desde JavaScript");
  });
</script>
\`\`\`

5. Recomendacion final:
Crea primero una pagina personal, luego una lista de tareas y despues una app con datos guardados. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Quieres que te prepare una ruta para ser frontend o una para desarrollo web full-stack?`;
}

function buildAppPathAnswer(normalizedQuestion: string) {
  const isMobile = includesAny(normalizedQuestion, ['movil', 'mobile', 'android', 'ios']);
  const isDesktop = includesAny(normalizedQuestion, ['escritorio', 'desktop', 'windows']);
  const appType = isMobile ? 'movil' : isDesktop ? 'de escritorio' : 'web/PWA';

  return `1. Respuesta directa:
Para crear una app ${appType}, primero define que problema resuelve, que pantallas tendra y donde guardara los datos.

2. Explicacion sencilla:
Una aplicacion no es solo codigo. Necesita interfaz, logica, datos, validaciones, manejo de errores y una forma de publicarse o instalarse.

3. Ruta sugerida:
${isMobile ? '1. Aprende JavaScript/TypeScript.\n2. Usa React Native o Flutter.\n3. Aprende navegacion, formularios y almacenamiento local.\n4. Conecta una API.\n5. Publica en tiendas cuando este probada.' : isDesktop ? '1. Aprende C#.\n2. Usa .NET y una tecnologia de escritorio como WPF, WinUI o MAUI.\n3. Aprende formularios, archivos, SQL Server y empaquetado MSIX.\n4. Agrega instalador y pruebas.' : '1. Aprende HTML, CSS, JavaScript y React.\n2. Usa Vite para construir la app.\n3. Agrega manifest y service worker para PWA.\n4. Despliega en Vercel.\n5. Empaqueta para Microsoft Store con MSIX si la quieres como app Windows.'}

4. Ejemplo practico:
\`\`\`text
Mini app inicial:
- Pantalla de inicio
- Formulario para agregar datos
- Lista para mostrar registros
- Boton para eliminar
- Guardado local
\`\`\`

5. Recomendacion final:
Empieza con una app pequena, por ejemplo agenda, inventario, sistema de notas o lista de tareas. ${bookRecommendation(isDesktop ? 'csharp' : 'programacion')}

6. Pregunta de seguimiento:
Quieres crear una app web, movil, de escritorio o PWA para Microsoft Store?`;
}

function buildCareerPathAnswer(normalizedQuestion: string) {
  if (includesAny(normalizedQuestion, ['backend'])) {
    return `1. Respuesta directa:
Para ser backend, aprende logica, un lenguaje de servidor, bases de datos, APIs, autenticacion y despliegue.

2. Explicacion sencilla:
El backend maneja reglas de negocio, usuarios, seguridad, bases de datos y comunicacion con el frontend.

3. Ruta sugerida:
1. Python o C#.
2. SQL y modelado de datos.
3. APIs REST.
4. Autenticacion y autorizacion.
5. Pruebas, logs y manejo de errores.
6. Despliegue y seguridad basica.

4. Ejemplo practico:
Construye una API de estudiantes con crear, listar, editar y eliminar registros.

5. Recomendacion final:
Si quieres software empresarial, usa C# + .NET + SQL Server. Si quieres rapidez y datos, usa Python. ${bookRecommendation('bases de datos')}

6. Pregunta de seguimiento:
Quieres una ruta backend con C# o con Python?`;
  }

  if (includesAny(normalizedQuestion, ['frontend'])) {
    return buildWebPathAnswer();
  }

  if (includesAny(normalizedQuestion, ['datos', 'data', 'analisis', 'analista'])) {
    return `1. Respuesta directa:
Para datos, aprende Excel solido, SQL, Power BI y Python para analisis.

2. Explicacion sencilla:
El area de datos convierte informacion en decisiones. Necesitas limpiar datos, consultarlos, analizarlos y presentarlos claramente.

3. Ruta sugerida:
1. Excel y conceptos de tablas.
2. SQL: consultas, joins y agrupaciones.
3. Power Query para limpieza.
4. Power BI para dashboards.
5. DAX para medidas.
6. Python con pandas para analisis mas avanzado.

4. Ejemplo practico:
Crea un dashboard de ventas con total vendido, ventas por mes, producto mas vendido y comparacion por vendedor.

5. Recomendacion final:
Empieza por SQL y Power BI; luego agrega Python. ${bookRecommendation('power bi')}

6. Pregunta de seguimiento:
Quieres una ruta para analista de datos o para inteligencia de negocios con Power BI?`;
  }

  if (includesAny(normalizedQuestion, ['ciberseguridad', 'seguridad'])) {
    return `1. Respuesta directa:
Para ciberseguridad, empieza con redes, Linux, fundamentos de seguridad, Python y practicas legales en laboratorios.

2. Explicacion sencilla:
La ciberseguridad no es solo atacar; sobre todo es proteger sistemas, detectar riesgos, configurar permisos y desarrollar software seguro.

3. Ruta sugerida:
1. Redes: IP, DNS, HTTP, puertos.
2. Linux basico.
3. Python para scripts.
4. Seguridad web y OWASP.
5. Bases de datos y SQL injection defensivo.
6. Laboratorios legales y buenas practicas.

4. Ejemplo practico:
Haz una auditoria defensiva de una app: contrasenas, permisos, validacion de formularios, logs y dependencias.

5. Recomendacion final:
Practica siempre en entornos propios o autorizados. ${bookRecommendation('ciberseguridad')}

6. Pregunta de seguimiento:
Quieres una ruta de ciberseguridad defensiva para principiantes?`;
  }

  return `1. Respuesta directa:
Para trabajar como programador, aprende fundamentos, crea proyectos reales, usa GitHub y especializate en un area.

2. Explicacion sencilla:
Las empresas buscan personas que resuelvan problemas, entiendan codigo, trabajen con datos, usen Git y puedan construir soluciones mantenibles.

3. Ruta sugerida:
1. Logica de programacion.
2. Python o JavaScript como primer lenguaje.
3. SQL y bases de datos.
4. Git y GitHub.
5. Proyectos reales.
6. Una especialidad: frontend, backend, datos, escritorio, movil o ciberseguridad.

4. Ejemplo practico:
Portafolio inicial:
- Calculadora.
- Sistema de notas.
- CRUD de estudiantes.
- Dashboard simple.
- App web publicada en Vercel.

5. Recomendacion final:
Publica tus proyectos en GitHub y escribe un README claro para cada uno. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Que area te llama mas la atencion: web, backend, datos, C#, movil o ciberseguridad?`;
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

function buildWelcomeAnswer() {
  return `Hola, soy tu Asistente de Programacion.

Puedo ayudarte a aprender desde cero, elegir un lenguaje, resolver errores de codigo, crear proyectos y entender temas como Python, C#, bases de datos, Power BI, ciberseguridad, automatizacion con N8N y desarrollo web.

Puedes preguntarme cosas como:
- Quiero aprender a programar, por donde comienzo?
- Que lenguaje me recomiendas?
- Como hago mi primera pagina web?
- Como creo una app?
- Que proyecto puedo hacer para practicar?
- Puedes revisar este codigo?

Cuéntame que quieres aprender o que problema tienes, y te guiare paso a paso.`;
}

function buildProjectIdeasAnswer(settings: AppSettings) {
  const favoriteLanguage = settings.favoriteLanguage.trim() || 'Python';

  return `1. Respuesta directa:
Para practicar programacion, elige proyectos pequenos que tengan entrada de datos, logica, almacenamiento y una salida visible.

2. Explicacion sencilla:
Un buen proyecto no tiene que ser grande. Debe obligarte a usar conceptos reales: variables, condicionales, ciclos, funciones, listas, validaciones y, poco a poco, bases de datos.

3. Ruta sugerida:
1. Calculadora basica.
2. Conversor de temperatura o monedas.
3. Juego de adivinar un numero.
4. Sistema de notas de estudiantes.
5. Agenda de contactos.
6. Inventario sencillo.
7. CRUD con base de datos.
8. Dashboard simple con Power BI.

4. Ejemplo practico:
\`\`\`${favoriteLanguage.toLowerCase()}
# Idea: sistema de notas
notas = [80, 95, 70]
promedio = sum(notas) / len(notas)
print("Promedio:", promedio)
\`\`\`

5. Recomendacion final:
Haz un proyecto por semana y subelo a GitHub con un README que explique que hace, como se ejecuta y que aprendiste. ${bookRecommendation('programacion')}

6. Pregunta de seguimiento:
Quieres que te proponga 10 proyectos ordenados de principiante a avanzado?`;
}

async function getLocalAssistantResponse(question: string, settings: AppSettings): Promise<string> {
  await wait(650);

  const normalizedQuestion = normalize(question);
  const detectedTopic = detectTopic(normalizedQuestion);

  // Futuro punto de integracion:
  // aqui se conectaria un backend real con IA/RAG para recuperar fragmentos de libros,
  // PDFs, TXT, Markdown o DOCX y responder con citas verificables.
  if (looksLikeCode(question) && !detectedTopic) {
    return buildCodeReviewAnswer(question, settings);
  }

  if (includesAny(normalizedQuestion, ['hola', 'buenas', 'ayuda', 'que puedes hacer', 'como me ayudas'])) {
    return buildWelcomeAnswer();
  }

  if (
    includesAny(normalizedQuestion, [
      'proyecto para practicar',
      'proyectos para practicar',
      'que proyecto',
      'ideas de proyectos',
      'practicar programacion',
      'mini proyecto'
    ])
  ) {
    return buildProjectIdeasAnswer(settings);
  }

  if (
    includesAny(normalizedQuestion, [
      'por donde comienzo',
      'por donde empiezo',
      'como empiezo',
      'quiero aprender',
      'aprender a programar',
      'desde cero',
      'empezar a programar'
    ])
  ) {
    return buildStartLearningAnswer(settings);
  }

  if (
    includesAny(normalizedQuestion, [
      'que lenguaje',
      'cual lenguaje',
      'lenguaje me recomiendas',
      'python o javascript',
      'mejor para empezar',
      'que debo aprender primero'
    ])
  ) {
    return buildLanguageRecommendationAnswer();
  }

  if (
    includesAny(normalizedQuestion, [
      'no se que area',
      'que area',
      'area de programacion',
      'que rama',
      'no se que elegir',
      'que camino'
    ])
  ) {
    return buildUnknownAreaAnswer();
  }

  if (
    includesAny(normalizedQuestion, [
      'pagina web',
      'paginas web',
      'sitio web',
      'desarrollo web',
      'hacer web',
      'crear web'
    ])
  ) {
    return buildWebPathAnswer();
  }

  if (
    includesAny(normalizedQuestion, [
      'crear una app',
      'crear app',
      'hacer una app',
      'hacer app',
      'aplicacion movil',
      'aplicacion de escritorio',
      'app movil',
      'app de escritorio'
    ])
  ) {
    return buildAppPathAnswer(normalizedQuestion);
  }

  if (
    includesAny(normalizedQuestion, [
      'trabajar como programador',
      'ser programador',
      'ser desarrollador',
      'ruta backend',
      'ruta frontend',
      'ruta de datos',
      'desarrollador web',
      'backend',
      'frontend',
      'analista de datos'
    ])
  ) {
    return buildCareerPathAnswer(normalizedQuestion);
  }

  if (detectedTopic) {
    return buildResponse(detectedTopic, settings);
  }

  return buildGeneralProgrammingAnswer(question, settings);
}

export async function getAssistantResponse(
  question: string,
  settings: AppSettings,
  messages: ChatMessage[] = [],
  sources: SourceItem[] = sampleSources
): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        settings,
        messages,
        sources
      })
    });

    if (response.ok) {
      const data = (await response.json()) as { answer?: string };
      if (data.answer?.trim()) {
        return data.answer;
      }
    }
  } catch {
    // En desarrollo local con Vite no existe /api/chat; usamos el tutor local.
  }

  return getLocalAssistantResponse(question, settings);
}
