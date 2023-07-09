import { ProductDeliveryCompanyInterface } from 'interfaces/product-delivery-company';
import { GetQueryInterface } from 'interfaces';

export interface DeliveryCompanyInterface {
  id?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  product_delivery_company?: ProductDeliveryCompanyInterface[];

  _count?: {
    product_delivery_company?: number;
  };
}

export interface DeliveryCompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
