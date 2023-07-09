import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { productDeliveryCompanyValidationSchema } from 'validationSchema/product-delivery-companies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getProductDeliveryCompanies();
    case 'POST':
      return createProductDeliveryCompany();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProductDeliveryCompanies() {
    const data = await prisma.product_delivery_company
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'product_delivery_company'));
    return res.status(200).json(data);
  }

  async function createProductDeliveryCompany() {
    await productDeliveryCompanyValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.product_delivery_company.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
