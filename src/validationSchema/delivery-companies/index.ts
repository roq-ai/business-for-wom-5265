import * as yup from 'yup';

export const deliveryCompanyValidationSchema = yup.object().shape({
  name: yup.string().required(),
});
