export function getStrapiMedia(url: string) {
  if (url == null) {
    return null;
  }
  if (url.startsWith('http') || url.startsWith('//')) {
    return url;
  }
  return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${url}`;
}

export function convertMarkdownImageSrc(text: string) {
  return text.replaceAll('/uploads', `${process.env.NEXT_PUBLIC_API_URL}/uploads`);
}