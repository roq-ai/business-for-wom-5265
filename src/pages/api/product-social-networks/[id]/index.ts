import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { productSocialNetworkValidationSchema } from 'validationSchema/product-social-networks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.product_social_network
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProductSocialNetworkById();
    case 'PUT':
      return updateProductSocialNetworkById();
    case 'DELETE':
      return deleteProductSocialNetworkById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProductSocialNetworkById() {
    const data = await prisma.product_social_network.findFirst(
      convertQueryToPrismaUtil(req.query, 'product_social_network'),
    );
    return res.status(200).json(data);
  }

  async function updateProductSocialNetworkById() {
    await productSocialNetworkValidationSchema.validate(req.body);
    const data = await prisma.product_social_network.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteProductSocialNetworkById() {
    const data = await prisma.product_social_network.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
