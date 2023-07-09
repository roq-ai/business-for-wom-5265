import { ProductInterface } from 'interfaces/product';
import { DeliveryCompanyInterface } from 'interfaces/delivery-company';
import { GetQueryInterface } from 'interfaces';

export interface ProductDeliveryCompanyInterface {
  id?: string;
  product_id?: string;
  delivery_company_id?: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  delivery_company?: DeliveryCompanyInterface;
  _count?: {};
}

export interface ProductDeliveryCompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  delivery_company_id?: string;
}
