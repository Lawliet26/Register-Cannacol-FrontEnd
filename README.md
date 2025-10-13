# React + Vite

## SenaVersionManagement — Frontend (Register)

Este repositorio contiene el frontend de registro construido con React + Vite. Está pensado para trabajar junto a un backend independiente (API REST) que ya está conectado a una base de datos. Aquí encontrarás instrucciones para instalar, configurar y ejecutar el proyecto en desarrollo y producción.

## Contenido
- Requisitos
- Instalación
- Configuración (conexión al backend)
- Scripts disponibles
- Uso (registro de usuario)
- Despliegue rápido
- Notas y solución de problemas

### Requisitos
- Node.js (versión 16+ recomendada)
- npm o yarn
- Backend corriendo y accesible (por defecto se asume en http://localhost:8000)

### Instalación
Abre una terminal (PowerShell en Windows) en la carpeta del proyecto (`register-front`) y ejecuta:

```powershell
# Instalar dependencias usando npm
npm install

# o usando yarn
# yarn
```

### Configuración (conexión al backend)
Por defecto, el formulario de registro en `src/components/Register.jsx` hace peticiones al endpoint:

- POST http://localhost:8000/api/register/

Si tu backend está en otra URL o puerto, tienes dos opciones sencillas:

1) Modificar el archivo `src/components/Register.jsx` y cambiar la URL en la llamada `fetch(...)`.

2) (Recomendado) Usar una variable de entorno para definir la URL base del API. Vite expone variables que empiezan por `VITE_`.

Ejemplo para usar variable de entorno:

1. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```properties
VITE_API_BASE_URL=http://localhost:8000
```

2. Actualiza `src/components/Register.jsx` reemplazando la URL fija por la variable de entorno. Por ejemplo:

```js
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const response = await fetch(`${baseUrl}/api/register/`, {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify(/* ... */)
});
```

Nota: Vite carga las variables de entorno desde `.env` automáticamente cuando se inicia el servidor de desarrollo.

### Scripts disponibles
Revisa `package.json` para ver los scripts definidos. Los más usados son:

- `npm run dev` — Inicia el servidor de desarrollo de Vite con HMR.
- `npm run build` — Genera la build de producción en la carpeta `dist`.
- `npm run preview` — Sirve la build de producción localmente para pruebas.
- `npm run lint` — Ejecuta ESLint sobre el proyecto.

Ejemplos (PowerShell):

```powershell
# Iniciar desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar la build de producción
npm run preview
```

### Uso (registro de usuario)
1. Asegúrate de que tu backend esté corriendo y aceptando peticiones en el endpoint `/api/register/`.
2. Ejecuta `npm run dev` y abre el navegador en la URL que indique Vite (por defecto `http://localhost:5173`).
3. Completa el formulario de registro y envíalo. El frontend enviará un POST con el siguiente JSON (ejemplo):

```json
{
	"password": "...",
	"password_confirm": "...",
	"rol": "usuario_final",
	"nombre": "...",
	"apellido": "...",
	"email": "...",
	"identificacion": "...",
	"terminos": true
}
```

Si la respuesta del servidor es exitosa (`response.ok`), el frontend mostrará un mensaje de éxito. En caso contrario mostrará el error devuelto por la API (`data.message` si existe).

### Buenas prácticas y recomendaciones
- Usa variables de entorno (`VITE_API_BASE_URL`) para no codificar URLs del backend.
- En producción, sirve los archivos estáticos desde un servidor web (NGINX, CDN) y configura CORS en el backend para permitir peticiones desde la URL del frontend.
- Asegúrate de usar HTTPS en producción.

### Solución de problemas
- Error de conexión al registrar: revisa que el backend esté corriendo y que el endpoint `/api/register/` exista.
- Problemas con CORS: revisa la configuración de CORS en el backend (permitir origen del frontend).


