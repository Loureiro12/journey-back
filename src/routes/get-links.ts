import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";

export async function getLinks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/links",
    {
      schema: {
        params: z.object({
          tripId: z.string(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;

      const trip = await prisma.tripe.findUnique({
        where: {
          id: tripId,
        },
        include: {
          links: true
        },
      });

      if (!trip) {
        throw new Error("Trip not found.");
      }


      return { links: trip.links };
    }
  );
}
