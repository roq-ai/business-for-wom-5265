import * as yup from 'yup';

export const productSocialNetworkValidationSchema = yup.object().shape({
  product_id: yup.string().nullable(),
  social_network_id: yup.string().nullable(),
});
