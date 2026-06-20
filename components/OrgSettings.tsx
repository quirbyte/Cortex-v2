import OrgSettingsClient from "./orgs/OrgSettingsClient";
import OverviewPane from "./orgs/OverviewPane";
import MembersPane from "./orgs/MembersPane";
import OrgEventsPane from "./orgs/OrgEventsPane";
import OrgSettingsPane from "./orgs/OrgSettingsPane";

export type orgType = {
    id: string;
    name: string;
    slug: string;
    createdAt: string;
    role: string;
}

export default async function OrgSettings({ org, userId }: { org: orgType; userId: string }) {
    return <OrgSettingsClient
        org={org}
        overviewSlot={<OverviewPane org={org} />}
        membersSlot={<MembersPane org={org} />}
        eventsSlot={<OrgEventsPane org={org} />}
        settingsSlot={<OrgSettingsPane org={org} userId={userId} />}
    />
}