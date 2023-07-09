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
import { createProductSocialNetwork } from 'apiSdk/product-social-networks';
import { Error } from 'components/error';
import { productSocialNetworkValidationSchema } from 'validationSchema/product-social-networks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ProductInterface } from 'interfaces/product';
import { SocialNetworkInterface } from 'interfaces/social-network';
import { getProducts } from 'apiSdk/products';
import { getSocialNetworks } from 'apiSdk/social-networks';
import { ProductSocialNetworkInterface } from 'interfaces/product-social-network';

function ProductSocialNetworkCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProductSocialNetworkInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProductSocialNetwork(values);
      resetForm();
      router.push('/product-social-networks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProductSocialNetworkInterface>({
    initialValues: {
      product_id: (router.query.product_id as string) ?? null,
      social_network_id: (router.query.social_network_id as string) ?? null,
    },
    validationSchema: productSocialNetworkValidationSchema,
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
            Create Product Social Network
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
          <AsyncSelect<SocialNetworkInterface>
            formik={formik}
            name={'social_network_id'}
            label={'Select Social Network'}
            placeholder={'Select Social Network'}
            fetcher={getSocialNetworks}
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
    entity: 'product_social_network',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProductSocialNetworkCreatePage);
