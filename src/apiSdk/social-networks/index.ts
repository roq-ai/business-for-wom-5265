import axios from 'axios';
import queryString from 'query-string';
import { SocialNetworkInterface, SocialNetworkGetQueryInterface } from 'interfaces/social-network';
import { GetQueryInterface } from '../../interfaces';

export const getSocialNetworks = async (query?: SocialNetworkGetQueryInterface) => {
  const response = await axios.get(`/api/social-networks${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSocialNetwork = async (socialNetwork: SocialNetworkInterface) => {
  const response = await axios.post('/api/social-networks', socialNetwork);
  return response.data;
};

export const updateSocialNetworkById = async (id: string, socialNetwork: SocialNetworkInterface) => {
  const response = await axios.put(`/api/social-networks/${id}`, socialNetwork);
  return response.data;
};

export const getSocialNetworkById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/social-networks/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSocialNetworkById = async (id: string) => {
  const response = await axios.delete(`/api/social-networks/${id}`);
  return response.data;
};
