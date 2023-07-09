import * as yup from 'yup';

export const productDeliveryCompanyValidationSchema = yup.object().shape({
  product_id: yup.string().nullable(),
  delivery_company_id: yup.string().nullable(),
});
