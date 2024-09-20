"use client";

import {
  AlertForAI,
  AboutThePlace,
  BestTimeToVisit,
  Itinerary,
  ImageSection,
  TopActivities,
  TopPlacesToVisit,
  LocalCuisineRecommendations,
  PackingChecklist,
} from "@/components/sections";
import Image from 'next/image';

import bgimage from "../../public/bgimage.jpeg"

import usePlan from "@/hooks/usePlan";
import {usePlanContext} from "../../contexts/PlanContextProvider";
import {useEffect} from "react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Users} from "lucide-react";
import {ExclamationTriangleIcon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import {Loading} from "@/components/shared/Loading";
import Weather from "@/components/sections/Weather";

type PlanProps = {
  planId: string;

};

const Plan = ({planId}: PlanProps) => {
  const {isLoading, plan} = usePlanContext();
  {console.log("ssa" + plan?.userPrompt)}

  return (
    <section className="h-full flex flex-col gap-10">

     
      <ImageSection
        userPrompt={plan?.userPrompt}
        companion={plan?.companion}
        activityPreferences={plan?.activityPreferences ?? []}
        fromDate={plan?.fromDate ?? undefined}
        toDate={plan?.toDate ?? undefined}
        placeName={plan?.nameoftheplace}
        imageUrl={plan?.url}
        isLoading={isLoading || !plan?.contentGenerationState.imagination}
        allowEdit={true}
        planId={planId}
      />
      <AboutThePlace
        isLoading={isLoading || !plan?.contentGenerationState.abouttheplace}
        planId={planId}
        content={plan?.abouttheplace}
        allowEdit={true}
      />
      {/* <Weather placeName={plan?.nameoftheplace} /> */}
      <TopActivities
        activities={plan?.adventuresactivitiestodo}
        planId={planId}
        isLoading={isLoading || !plan?.contentGenerationState.adventuresactivitiestodo}
        allowEdit={true}
      />
      <TopPlacesToVisit
        topPlacesToVisit={plan?.topplacestovisit}
        planId={planId}
        isLoading={isLoading || !plan?.contentGenerationState.topplacestovisit}
        allowEdit={true}
      />
      <Itinerary
        itinerary={plan?.itinerary}
        planId={planId}
        isLoading={isLoading || !plan?.contentGenerationState.itinerary}
        allowEdit={true}
      />
      <LocalCuisineRecommendations
        recommendations={plan?.localcuisinerecommendations}
        isLoading={isLoading || !plan?.contentGenerationState.localcuisinerecommendations}
        planId={planId}
        allowEdit={true}
      />
      <PackingChecklist
        checklist={plan?.packingchecklist}
        isLoading={isLoading || !plan?.contentGenerationState.packingchecklist}
        planId={planId}
        allowEdit={true}
      />
      <BestTimeToVisit
        content={plan?.besttimetovisit}
        planId={planId}
        isLoading={isLoading || !plan?.contentGenerationState.besttimetovisit}
        allowEdit={true}
      />
    </section>
  );
};

export default Plan;
