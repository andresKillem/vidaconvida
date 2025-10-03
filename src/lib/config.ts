// Configuration for Social Media APIs
export const socialMediaConfig = {
  youtube: {
    channelId: 'UC_VIDACONVIDA_CHANNEL_ID', // Replace with actual channel ID
    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '', // Add to .env.local
  },
  facebook: {
    pageId: '61572900027929', // Your Facebook page ID
    accessToken: process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN || '', // Add to .env.local
  }
}

// Environment variables needed:
// NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
// NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN=your_facebook_access_token

export const appConfig = {
  siteName: 'Vida con Vida Miami',
  siteUrl: 'https://vidaconvidamiami.com',
  contactEmail: 'info@vidaconvidamiami.org',
  socialMedia: {
    facebook: 'https://www.facebook.com/profile.php?id=61572900027929',
    instagram: 'https://www.instagram.com/vidaconvida',
    youtube: 'https://www.youtube.com/@VidaConVidaMiami'
  }
}
