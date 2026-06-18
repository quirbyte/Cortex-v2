import { Suspense } from "react";
import HomePage from "@/sections/HomePage";
import EventPage from "@/sections/EventsPage";
import OrgPage from "@/sections/OrgPage";
import BookingsPage from "@/sections/BookingPage";
import SettingsPage from "@/sections/SettingPage";
import HelpPage from "@/sections/HelpPage";
import { LoadingTabSkeleton } from "@/DesignComponents/loader";

export const dynamic = "force-dynamic";

export type OptionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function DashboardPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const currentTab = (resolvedParams.tab as OptionTypes) || "home";

  return (
    <>
      {currentTab === "home" && <HomePage />}
      {currentTab === "events" && (
        <Suspense fallback={<LoadingTabSkeleton data={"events"} />}>
          <EventPage />
        </Suspense>
      )}
      {currentTab === "orgs" && (
        <Suspense fallback={<LoadingTabSkeleton data={"user organizations"} />}>
          <OrgPage />
        </Suspense>
      )}
      {
        currentTab === "bookings" && (
          <Suspense fallback={<LoadingTabSkeleton data={"user bookings"} />}>
            <BookingsPage />
          </Suspense>
        )
      }
      {
        currentTab === "settings" && (
          <Suspense fallback={<LoadingTabSkeleton data={"user settings"} />}>
            <SettingsPage />
          </Suspense>
        )
      }
      {currentTab === "help" && <HelpPage />}

    </>
  );
}