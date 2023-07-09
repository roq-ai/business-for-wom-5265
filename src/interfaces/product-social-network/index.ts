import { ProductInterface } from 'interfaces/product';
import { SocialNetworkInterface } from 'interfaces/social-network';
import { GetQueryInterface } from 'interfaces';

export interface ProductSocialNetworkInterface {
  id?: string;
  product_id?: string;
  social_network_id?: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  social_network?: SocialNetworkInterface;
  _count?: {};
}

export interface ProductSocialNetworkGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  social_network_id?: string;
}
