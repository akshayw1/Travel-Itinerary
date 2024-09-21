import Dashboard from "@/components/dashboard/Dashboard";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "WanderAtlan provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
  keywords:
    "travel planner, AI travel planner, smart travel, travel suggestions, destination insights, personalized itineraries, trip planning, travel tips, vacation planning",

  openGraph: {
    title: "WanderAtlan - Your Smart Travel Planner",
    description:
      "WanderAtlan provides intelligent travel suggestions, personalized itineraries, and seamless trip planning. Plan your perfect trip with ease.",
    url: "https://travel-itinerary-flax.vercel.app/",
    type: "website",
    siteName: "WanderAtlan",
    images: [
      {
        url: "https://travel-itinerary-flax.vercel.app//images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WanderAtlan",
      },
    ],
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
