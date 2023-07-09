import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createProductDeliveryCompany } from 'apiSdk/product-delivery-companies';
import { Error } from 'components/error';
import { productDeliveryCompanyValidationSchema } from 'validationSchema/product-delivery-companies';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ProductInterface } from 'interfaces/product';
import { DeliveryCompanyInterface } from 'interfaces/delivery-company';
import { getProducts } from 'apiSdk/products';
import { getDeliveryCompanies } from 'apiSdk/delivery-companies';
import { ProductDeliveryCompanyInterface } from 'interfaces/product-delivery-company';

function ProductDeliveryCompanyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProductDeliveryCompanyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProductDeliveryCompany(values);
      resetForm();
      router.push('/product-delivery-companies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProductDeliveryCompanyInterface>({
    initialValues: {
      product_id: (router.query.product_id as string) ?? null,
      delivery_company_id: (router.query.delivery_company_id as string) ?? null,
    },
    validationSchema: productDeliveryCompanyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Product Delivery Company
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<ProductInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Product'}
            placeholder={'Select Product'}
            fetcher={getProducts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<DeliveryCompanyInterface>
            formik={formik}
            name={'delivery_company_id'}
            label={'Select Delivery Company'}
            placeholder={'Select Delivery Company'}
            fetcher={getDeliveryCompanies}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'product_delivery_company',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProductDeliveryCompanyCreatePage);
