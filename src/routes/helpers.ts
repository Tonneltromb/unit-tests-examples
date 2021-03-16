type ApiVersionPrefix = '' | 'v1';
type ApiEntityPrefix = '' | 'clients' | 'client';

export const prepareRoutePath = (version: ApiVersionPrefix, entity: ApiEntityPrefix, path: string = '') => {
  const processedPathArg = path.trim() ? `/${path.trim()}` : '';
  return `/${version}/${entity}${processedPathArg}`;
};
