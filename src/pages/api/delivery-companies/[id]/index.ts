import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { deliveryCompanyValidationSchema } from 'validationSchema/delivery-companies';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.delivery_company
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getDeliveryCompanyById();
    case 'PUT':
      return updateDeliveryCompanyById();
    case 'DELETE':
      return deleteDeliveryCompanyById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDeliveryCompanyById() {
    const data = await prisma.delivery_company.findFirst(convertQueryToPrismaUtil(req.query, 'delivery_company'));
    return res.status(200).json(data);
  }

  async function updateDeliveryCompanyById() {
    await deliveryCompanyValidationSchema.validate(req.body);
    const data = await prisma.delivery_company.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteDeliveryCompanyById() {
    const data = await prisma.delivery_company.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
