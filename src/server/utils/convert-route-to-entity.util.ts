const mapping: Record<string, string> = {
  'delivery-companies': 'delivery_company',
  organizations: 'organization',
  products: 'product',
  'product-delivery-companies': 'product_delivery_company',
  'product-social-networks': 'product_social_network',
  'social-networks': 'social_network',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
