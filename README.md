# Asistente de Programacion

Aplicacion web progresiva moderna para estudiantes que desean aprender programacion usando libros, documentos, apuntes y fuentes organizadas como apoyo conceptual.

La app funciona como PWA educativa e incluye un backend serverless opcional para responder con IA usando OpenAI en Vercel. Si la clave de IA no esta configurada, conserva un tutor local como respaldo.

## Caracteristicas principales

- PWA con `manifest.json`, Service Worker y compatibilidad offline inicial.
- Interfaz responsive tipo dashboard con modo claro y oscuro.
- Chat educativo con IA via `/api/chat`, estado de analisis, historial y respaldo local.
- Tarjetas de temas: logica, algoritmos, estructuras de datos, Python, JavaScript, C#, SQL, HTML/CSS, bases de datos, buenas practicas, depuracion y POO.
- Seccion de libros NotebookLM como cerebro manual de la aplicacion.
- Gestor de fuentes para registrar libros, documentos y enlaces adicionales de NotebookLM.
- Configuracion local del estudiante: nombre, nivel y lenguaje favorito.
- Persistencia basica con `localStorage`.
- Arquitectura limpia por componentes, servicios, datos, API serverless y tipos TypeScript.

## Instalacion

```bash
npm install
```

## Comandos

```bash
npm run dev
npm run build
npm run preview
```

## Arquitectura

```text
/api
  chat.js
/public
  manifest.json
  sw.js
  /icons
/src
  /components
  /data
  /services
  /types
  App.tsx
  main.tsx
  styles.css
```

`api/chat.js` es la funcion serverless que llama a OpenAI desde el servidor. `assistantService.ts` intenta usar `/api/chat` y, si no esta disponible, usa el tutor local. `storageService.ts` centraliza la lectura y escritura en `localStorage`.

## Configurar IA real con OpenAI en Vercel

En Vercel, entra a tu proyecto y agrega estas variables en Settings > Environment Variables:

```text
OPENAI_API_KEY=tu_clave_de_openai
OPENAI_MODEL=gpt-5.2
```

Luego haz Redeploy del proyecto.

Importante:

- Nunca pongas la clave en el frontend.
- No subas `.env` a GitHub.
- `.env.example` solo muestra los nombres de variables.
- Si `OPENAI_API_KEY` no existe, la app usara el asistente local de respaldo.

La integracion usa la Responses API de OpenAI, recomendada en la documentacion oficial para generacion de texto en aplicaciones nuevas.

## Integracion conceptual con NotebookLM

NotebookLM se trata como el cerebro conceptual externo/manual de la aplicacion. La app incluye por defecto estos libros:

- Libro Programacion
- Libro Python
- Libro C#
- Libro Base de Datos
- Libro Power BI
- Libro Ciberseguridad
- Libro Agente N8N

El estudiante puede abrir cada notebook desde la seccion Libros NotebookLM y registrar enlaces adicionales dentro de la app para tener sus materiales organizados.

La aplicacion no usa APIs no oficiales de NotebookLM. Esto evita depender de endpoints indocumentados, sin estabilidad garantizada, soporte oficial o avisos de cambios.

## Limitaciones de NotebookLM

- No hay integracion directa garantizada mediante API publica estable.
- Los enlaces registrados son referencias manuales.
- La IA puede guiarse por los temas y enlaces registrados, pero no lee el contenido privado exacto de NotebookLM.
- Para produccion, cualquier automatizacion debe basarse en APIs oficiales disponibles y terminos de uso vigentes.

## Futuro modulo RAG

La app ya tiene backend serverless para IA. El siguiente paso RAG completo seria permitir cargar documentos propios en PDF, TXT, MD o DOCX. En una version futura, el backend podria:

- Extraer texto de documentos.
- Dividir contenido en fragmentos.
- Generar embeddings.
- Guardar vectores en una base especializada.
- Recuperar fragmentos relevantes.
- Enviar contexto a un modelo de IA para responder con citas y trazabilidad.

No se incluyen claves API en el repositorio. Las llamadas pagadas solo ocurren si configuras `OPENAI_API_KEY` en Vercel.

## Publicacion en Microsoft Store

1. La app puede publicarse como PWA empaquetada.
2. Para Microsoft Store se recomienda generar un paquete `.msixupload`.
3. No se debe subir `.zip`, `.rar`, `.exe` ni archivos sin extension.
4. Un nombre correcto de paquete podria ser `AsistenteDeProgramacion_1.0.0.0_x64.msixupload`.
5. Si la app solo sera para PC, en Partner Center se debe dejar marcada la familia Windows Desktop y desmarcar Xbox, HoloLens, Surface Hub u otras familias no soportadas.
6. Para Xbox se requiere paquete neutral o x64.
7. Deben corregirse todos los errores de validacion antes de enviar.

### Solucion al error de paquete desconocido

El error "es un tipo de paquete desconocido" aparece cuando se intenta subir un archivo que Microsoft Store no reconoce como paquete de aplicacion. No subas la carpeta del proyecto, un `.zip`, un `.rar`, un `.exe` ni un archivo sin extension.

Para esta aplicacion, el archivo que debes generar y subir debe llamarse de forma similar a:

```text
AsistenteDeProgramacion_1.0.0.0_x64.msixupload
```

Tambien puede aceptarse un `.msix` durante algunas pruebas, pero para envio a Microsoft Store se recomienda `.msixupload`.

## Checklist final antes de publicar

- Ejecutar `npm run build` sin errores.
- Configurar `OPENAI_API_KEY` en Vercel si se desea IA real.
- Probar `npm run preview` en escritorio y movil.
- Verificar manifest, icono, nombre corto y nombre completo.
- Confirmar que el Service Worker no cachea datos privados sensibles.
- Revisar textos, ortografia y contraste visual.
- Validar que no existan claves API en el codigo.
- Generar y validar el paquete MSIX/MSIXUPLOAD.
- Revisar las familias de dispositivos seleccionadas en Partner Center.
