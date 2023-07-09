import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().integer().required(),
  discount_percentage: yup.number().integer(),
  organization_id: yup.string().nullable(),
});
