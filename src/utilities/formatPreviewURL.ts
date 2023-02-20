import { formatPagePath } from './formatPagePath';

export const formatPreviewURL = (collection: string, doc: any): string => {
  return `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/preview?url=${formatPagePath(collection, doc)}`
}

export const formatAppURL = (breadcrumbs): string => {
  let url: string;

  if (breadcrumbs && Array.isArray(breadcrumbs) && breadcrumbs.length > 0) {
    let pathToUse = breadcrumbs[breadcrumbs.length - 1].url;
    if (pathToUse === 'home') pathToUse = '/';
    url = `${process.env.PAYLOAD_PUBLIC_SITE_URL}${pathToUse}`;
  }

  return url;
};
