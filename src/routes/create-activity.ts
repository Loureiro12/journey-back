import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../lib/prisma";
import { dayjs } from "../lib/dayjs";

export async function createActivity(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string(),
        }),
        body: z.object({
          title: z.string().min(4),
          occurs_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { title, occurs_at } = request.body;
      const { tripId } = request.params;

      const trip = await prisma.tripe.findUnique({
        where: {
          id: tripId,
        },
      });

      if (!trip) {
        throw new Error("Trip not found.");
      }

      if (dayjs(occurs_at).isBefore(dayjs(trip.starts_at))) {
        throw new Error("Activity occurs before trip starts.");
      }

      if (dayjs(occurs_at).isAfter(dayjs(trip.ends_at))) {
        throw new Error("Activity occurs after trip ends.");
      }

      const activity = await prisma.activity.create({
        data: {
          title,
          occurs_at,
          tripeId: tripId,
        },
      });

      return {activityId: activity.id};
    }
  );
}
