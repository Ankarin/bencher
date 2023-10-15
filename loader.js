// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
// Docs: https://supabase.com/docs/guides/storage/image-transformations#nextjs-loader
const projectId = 'dtqxrqggjorlloqaxesl'; // your supabase project id
export default function supabaseLoader({ src, width, quality }) {
  if (src.startsWith('local/')) {
    src = src.replace('local/', '');
    return src;
  } else {
    return `https://${projectId}.supabase.co/storage/v1/object/public/bitbencher/${src}?width=${width}&quality=${quality || 75}`;
  }
}
