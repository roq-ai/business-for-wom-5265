import axios from 'axios';
import queryString from 'query-string';
import { DeliveryCompanyInterface, DeliveryCompanyGetQueryInterface } from 'interfaces/delivery-company';
import { GetQueryInterface } from '../../interfaces';

export const getDeliveryCompanies = async (query?: DeliveryCompanyGetQueryInterface) => {
  const response = await axios.get(`/api/delivery-companies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDeliveryCompany = async (deliveryCompany: DeliveryCompanyInterface) => {
  const response = await axios.post('/api/delivery-companies', deliveryCompany);
  return response.data;
};

export const updateDeliveryCompanyById = async (id: string, deliveryCompany: DeliveryCompanyInterface) => {
  const response = await axios.put(`/api/delivery-companies/${id}`, deliveryCompany);
  return response.data;
};

export const getDeliveryCompanyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/delivery-companies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDeliveryCompanyById = async (id: string) => {
  const response = await axios.delete(`/api/delivery-companies/${id}`);
  return response.data;
};
