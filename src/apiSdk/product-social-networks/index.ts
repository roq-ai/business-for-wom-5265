import axios from 'axios';
import queryString from 'query-string';
import {
  ProductSocialNetworkInterface,
  ProductSocialNetworkGetQueryInterface,
} from 'interfaces/product-social-network';
import { GetQueryInterface } from '../../interfaces';

export const getProductSocialNetworks = async (query?: ProductSocialNetworkGetQueryInterface) => {
  const response = await axios.get(`/api/product-social-networks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createProductSocialNetwork = async (productSocialNetwork: ProductSocialNetworkInterface) => {
  const response = await axios.post('/api/product-social-networks', productSocialNetwork);
  return response.data;
};

export const updateProductSocialNetworkById = async (
  id: string,
  productSocialNetwork: ProductSocialNetworkInterface,
) => {
  const response = await axios.put(`/api/product-social-networks/${id}`, productSocialNetwork);
  return response.data;
};

export const getProductSocialNetworkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/product-social-networks/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteProductSocialNetworkById = async (id: string) => {
  const response = await axios.delete(`/api/product-social-networks/${id}`);
  return response.data;
};
