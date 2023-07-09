import * as yup from 'yup';

export const socialNetworkValidationSchema = yup.object().shape({
  name: yup.string().required(),
});
