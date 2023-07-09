import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { deliveryCompanyValidationSchema } from 'validationSchema/delivery-companies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDeliveryCompanies();
    case 'POST':
      return createDeliveryCompany();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDeliveryCompanies() {
    const data = await prisma.delivery_company
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'delivery_company'));
    return res.status(200).json(data);
  }

  async function createDeliveryCompany() {
    await deliveryCompanyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.product_delivery_company?.length > 0) {
      const create_product_delivery_company = body.product_delivery_company;
      body.product_delivery_company = {
        create: create_product_delivery_company,
      };
    } else {
      delete body.product_delivery_company;
    }
    const data = await prisma.delivery_company.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
