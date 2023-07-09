import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { productDeliveryCompanyValidationSchema } from 'validationSchema/product-delivery-companies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.product_delivery_company
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProductDeliveryCompanyById();
    case 'PUT':
      return updateProductDeliveryCompanyById();
    case 'DELETE':
      return deleteProductDeliveryCompanyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProductDeliveryCompanyById() {
    const data = await prisma.product_delivery_company.findFirst(
      convertQueryToPrismaUtil(req.query, 'product_delivery_company'),
    );
    return res.status(200).json(data);
  }

  async function updateProductDeliveryCompanyById() {
    await productDeliveryCompanyValidationSchema.validate(req.body);
    const data = await prisma.product_delivery_company.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteProductDeliveryCompanyById() {
    const data = await prisma.product_delivery_company.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
