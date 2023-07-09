import { ProductSocialNetworkInterface } from 'interfaces/product-social-network';
import { GetQueryInterface } from 'interfaces';

export interface SocialNetworkInterface {
  id?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  product_social_network?: ProductSocialNetworkInterface[];

  _count?: {
    product_social_network?: number;
  };
}

export interface SocialNetworkGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
