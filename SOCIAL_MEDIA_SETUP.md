# Configuración de Redes Sociales

## YouTube API Setup

### 1. Obtener API Key de YouTube
1. Ve a [Google Cloud Console](https://console.developers.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de YouTube Data v3
4. Crea credenciales (API Key)
5. Copia la API Key

### 2. Obtener Channel ID (Opcional)

**Nota**: El Channel ID es opcional. La aplicación usa el handle `@VidaConVidaMiami` por defecto y lo resuelve automáticamente.

Si prefieres usar el Channel ID directamente:
1. Ve a tu canal de YouTube
2. El Channel ID está en la URL: `https://www.youtube.com/channel/CHANNEL_ID`
3. O usa esta herramienta: [YouTube Channel ID Finder](https://commentpicker.com/youtube-channel-id.php)

### 3. Configurar variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto (usa `.env.example` como referencia):

```env
# Requerido: API Key de YouTube
NEXT_PUBLIC_YOUTUBE_API_KEY=tu_api_key_aqui

# Opcional: Channel ID (si no se proporciona, usa el handle @VidaConVidaMiami)
NEXT_PUBLIC_YOUTUBE_CHANNEL_ID=tu_channel_id_aqui
```

## Facebook API Setup

### 1. Crear App de Facebook
1. Ve a [Facebook Developers](https://developers.facebook.com/)
2. Crea una nueva app
3. Agrega el producto "Facebook Login"
4. Genera un Access Token

### 2. Obtener Page ID
1. Ve a tu página de Facebook
2. El Page ID está en la URL: `https://www.facebook.com/profile.php?id=PAGE_ID`
3. O usa esta herramienta: [Facebook Page ID Finder](https://findmyfbid.com/)

### 3. Configurar variables de entorno
Agrega a tu archivo `.env.local`:

```env
NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN=tu_access_token_aqui
```

## Uso

Una vez configuradas las variables de entorno:

1. Los videos de YouTube se cargarán automáticamente
2. Los posts de Facebook se mostrarán en tiempo real
3. El contenido se actualiza cada 5 minutos (configurable)

## Características

- **Integración completa de YouTube API**: Carga automática de videos recientes del canal
- **Soporte para Channel Handle**: Usa `@VidaConVidaMiami` automáticamente (no requiere Channel ID)
- **Estadísticas completas**: Muestra duración formateada y conteo de vistas de cada video
- **Cache inteligente**: Los datos se almacenan en caché para mejorar el rendimiento
- **Fallback robusto**: Si las APIs fallan o no están configuradas, se muestran datos de ejemplo
- **Estados de carga**: Indicador visual mientras se cargan los videos
- **Manejo de errores**: Mensajes informativos si hay problemas con la API
- **Responsive**: Funciona perfectamente en móviles y desktop

## Troubleshooting

### YouTube API no funciona
- Verifica que la API Key sea correcta en `.env.local`
- Asegúrate de que la API de YouTube Data v3 esté habilitada en Google Cloud Console
- Verifica que el Channel ID sea correcto (o deja que la app use el handle automáticamente)
- Revisa la consola del navegador para mensajes de error específicos
- Si no está configurada, la app mostrará contenido de respaldo automáticamente

### Facebook API no funciona
- Verifica que el Access Token sea válido
- Asegúrate de que el Page ID sea correcto
- Verifica que la app de Facebook tenga los permisos necesarios

### Contenido no se actualiza
- Verifica la consola del navegador para errores
- Asegúrate de que las variables de entorno estén configuradas
- Verifica que las APIs estén funcionando correctamente
