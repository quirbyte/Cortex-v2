import { prisma } from "@/app/lib/prisma";
import { orgType } from "../OrgSettings";
import OrgEventsPaneClient from "./OrgEventsPaneClient";

export type orgEventType = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    orgId: string;
    desc: string | null;
    venue: string;
    startsAt: Date;
    price: number;
    capacity: number;
    sold: number;
    tags: string[];
    image: string | null;
};

export default async function OrgEventsPane({ org }: { org: orgType }) {
    const events: orgEventType[] = await prisma.event.findMany({
        where: {
            orgId: org.id
        }
    }) || [];

    return <OrgEventsPaneClient orgEvents={events} slug={org.slug} currentRole={org.role} orgId={org.id} />
}