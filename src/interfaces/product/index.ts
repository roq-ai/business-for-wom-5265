import { ProductDeliveryCompanyInterface } from 'interfaces/product-delivery-company';
import { ProductSocialNetworkInterface } from 'interfaces/product-social-network';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  price: number;
  discount_percentage?: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  product_delivery_company?: ProductDeliveryCompanyInterface[];
  product_social_network?: ProductSocialNetworkInterface[];
  organization?: OrganizationInterface;
  _count?: {
    product_delivery_company?: number;
    product_social_network?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
