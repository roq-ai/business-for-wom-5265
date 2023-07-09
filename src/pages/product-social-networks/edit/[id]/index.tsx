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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getProductSocialNetworkById, updateProductSocialNetworkById } from 'apiSdk/product-social-networks';
import { Error } from 'components/error';
import { productSocialNetworkValidationSchema } from 'validationSchema/product-social-networks';
import { ProductSocialNetworkInterface } from 'interfaces/product-social-network';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ProductInterface } from 'interfaces/product';
import { SocialNetworkInterface } from 'interfaces/social-network';
import { getProducts } from 'apiSdk/products';
import { getSocialNetworks } from 'apiSdk/social-networks';

function ProductSocialNetworkEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProductSocialNetworkInterface>(
    () => (id ? `/product-social-networks/${id}` : null),
    () => getProductSocialNetworkById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProductSocialNetworkInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProductSocialNetworkById(id, values);
      mutate(updated);
      resetForm();
      router.push('/product-social-networks');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProductSocialNetworkInterface>({
    initialValues: data,
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
            Edit Product Social Network
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(ProductSocialNetworkEditPage);
