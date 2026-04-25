# Asistente de Programacion

Aplicación web progresiva moderna para estudiantes que desean aprender programación usando libros, documentos, apuntes y fuentes organizadas como apoyo conceptual.

La app funciona sin backend obligatorio por ahora. Incluye un asistente simulado por palabras clave, historial local, gestión manual de enlaces de NotebookLM y una interfaz preparada para un futuro módulo profesional RAG.

## Características principales

- PWA con `manifest.json`, Service Worker y compatibilidad offline inicial.
- Interfaz responsive tipo dashboard con modo claro y oscuro.
- Chat educativo con respuestas simuladas, estado de análisis e historial.
- Tarjetas de temas: lógica, algoritmos, estructuras de datos, Python, JavaScript, C#, SQL, HTML/CSS, bases de datos, buenas prácticas, depuración y POO.
- Seccion de libros NotebookLM como cerebro manual de la aplicacion.
- Gestor de fuentes para registrar libros, documentos y enlaces adicionales de NotebookLM.
- Configuración local del estudiante: nombre, nivel y lenguaje favorito.
- Persistencia básica con `localStorage`.
- Arquitectura limpia por componentes, servicios, datos y tipos TypeScript.

## Instalación

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

`assistantService.ts` contiene el mock actual del asistente. `storageService.ts` centraliza la lectura y escritura en `localStorage`. Los componentes mantienen responsabilidades separadas para navegación, chat, fuentes, historial, configuración y temas.

## Integración conceptual con NotebookLM

NotebookLM se trata como el cerebro conceptual externo/manual de la aplicacion. La app incluye por defecto estos libros:

- Libro Programacion
- Libro Python
- Libro C#
- Libro Base de Datos
- Libro Power BI
- Libro Ciberseguridad
- Libro Agente N8N

El estudiante puede abrir cada notebook desde la seccion Libros NotebookLM y registrar enlaces adicionales dentro de la app para tener sus materiales organizados.

La aplicación no usa APIs no oficiales de NotebookLM. Esto evita depender de endpoints indocumentados, sin estabilidad garantizada, soporte oficial o avisos de cambios.

## Limitaciones de NotebookLM

- No hay integración directa garantizada mediante API pública estable.
- Los enlaces registrados son referencias manuales.
- Las respuestas simuladas de esta versión no leen el contenido de NotebookLM.
- Para producción, cualquier automatización debe basarse en APIs oficiales disponibles y términos de uso vigentes.

## Futuro módulo RAG

La interfaz deja preparada una ruta profesional para cargar documentos propios en PDF, TXT, MD o DOCX. En una versión futura, un backend podría:

- Extraer texto de documentos.
- Dividir contenido en fragmentos.
- Generar embeddings.
- Guardar vectores en una base especializada.
- Recuperar fragmentos relevantes.
- Enviar contexto a un modelo de IA para responder con citas y trazabilidad.

No se incluyen claves API ni llamadas a servicios pagados en esta versión.

## Publicación en Microsoft Store

1. La app puede publicarse como PWA empaquetada.
2. Para Microsoft Store se recomienda generar un paquete `.msixupload`.
3. No se debe subir `.zip`, `.rar`, `.exe` ni archivos sin extensión.
4. Un nombre correcto de paquete podría ser `AsistenteDeProgramacion_1.0.0.0_x64.msixupload`.
5. Si la app solo será para PC, en Partner Center se debe dejar marcada la familia Windows Desktop y desmarcar Xbox, HoloLens, Surface Hub u otras familias no soportadas.
6. Para Xbox se requiere paquete neutral o x64.
7. Deben corregirse todos los errores de validación antes de enviar.

### Solución al error de paquete desconocido

El error "es un tipo de paquete desconocido" aparece cuando se intenta subir un archivo que Microsoft Store no reconoce como paquete de aplicación. No subas la carpeta del proyecto, un `.zip`, un `.rar`, un `.exe` ni un archivo sin extensión.

Para esta aplicación, el archivo que debes generar y subir debe llamarse de forma similar a:

```text
AsistenteDeProgramacion_1.0.0.0_x64.msixupload
```

También puede aceptarse un `.msix` durante algunas pruebas, pero para envío a Microsoft Store se recomienda `.msixupload`.

## Checklist final antes de publicar

- Ejecutar `npm run build` sin errores.
- Probar `npm run preview` en escritorio y móvil.
- Verificar manifest, icono, nombre corto y nombre completo.
- Confirmar que el Service Worker no cachea datos privados sensibles.
- Revisar textos, ortografía y contraste visual.
- Validar que no existan claves API en el código.
- Generar y validar el paquete MSIX/MSIXUPLOAD.
- Revisar las familias de dispositivos seleccionadas en Partner Center.
