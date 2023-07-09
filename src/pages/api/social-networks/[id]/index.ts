import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { socialNetworkValidationSchema } from 'validationSchema/social-networks';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.social_network
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSocialNetworkById();
    case 'PUT':
      return updateSocialNetworkById();
    case 'DELETE':
      return deleteSocialNetworkById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSocialNetworkById() {
    const data = await prisma.social_network.findFirst(convertQueryToPrismaUtil(req.query, 'social_network'));
    return res.status(200).json(data);
  }

  async function updateSocialNetworkById() {
    await socialNetworkValidationSchema.validate(req.body);
    const data = await prisma.social_network.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSocialNetworkById() {
    const data = await prisma.social_network.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
