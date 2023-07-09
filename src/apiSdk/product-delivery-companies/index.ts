import axios from 'axios';
import queryString from 'query-string';
import {
  ProductDeliveryCompanyInterface,
  ProductDeliveryCompanyGetQueryInterface,
} from 'interfaces/product-delivery-company';
import { GetQueryInterface } from '../../interfaces';

export const getProductDeliveryCompanies = async (query?: ProductDeliveryCompanyGetQueryInterface) => {
  const response = await axios.get(`/api/product-delivery-companies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProductDeliveryCompany = async (productDeliveryCompany: ProductDeliveryCompanyInterface) => {
  const response = await axios.post('/api/product-delivery-companies', productDeliveryCompany);
  return response.data;
};

export const updateProductDeliveryCompanyById = async (
  id: string,
  productDeliveryCompany: ProductDeliveryCompanyInterface,
) => {
  const response = await axios.put(`/api/product-delivery-companies/${id}`, productDeliveryCompany);
  return response.data;
};

export const getProductDeliveryCompanyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/product-delivery-companies/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteProductDeliveryCompanyById = async (id: string) => {
  const response = await axios.delete(`/api/product-delivery-companies/${id}`);
  return response.data;
};
