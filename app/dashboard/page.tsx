"use client";
import SidebarLayout from "@/components/SidebarLayout";
import BookingsPage from "@/sections/BookingPage";
import EventPage from "@/sections/EventsPage";
import HelpPage from "@/sections/HelpPage";
import HomePage from "@/sections/HomePage";
import OrgPage from "@/sections/OrgPage";
import SettingsPage from "@/sections/SettingPage";
import { useState, useTransition } from "react"; // 1. Import useTransition

export type optionTypes = "home" | "events" | "orgs" | "bookings" | "settings" | "help";

export default function DashboardPage() {
  const [option, setOption] = useState<optionTypes>("home");
  const [isPending, startTransition] = useTransition();
  const handleSetOption = (newOption: optionTypes | ((prev: optionTypes) => optionTypes)) => {
    startTransition(() => {
      setOption(newOption);
    });
  };

  return (
    <SidebarLayout option={option} setOption={handleSetOption}>
      <div className={`h-full w-full transition-opacity duration-150 ${isPending ? "opacity-70" : "opacity-100"}`}>
        {option === "home" && <HomePage />}
        {option === "events" && <EventPage />}
        {option === "orgs" && <OrgPage />}
        {option === "bookings" && <BookingsPage />}
        {option === "settings" && <SettingsPage />}
        {option === "help" && <HelpPage />}
      </div>
    </SidebarLayout>
  );
}