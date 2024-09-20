"use client";
import {NoPlans} from "@/components/dashboard/NoPlans";
import PlanCard from "@/components/dashboard/PlanCard";
import DrawerDialog from "@/components/shared/DrawerWithDialog";
import {api} from "@/convex/_generated/api";
import {useQuery} from "convex/react";

import { useState} from "react";

export default function Dashboard() {
  const plans = useQuery(api.plan.getAllPlansForAUser, {});

  const [filteredPlans, setFilteredPlans] = useState<typeof plans>();
  const finalPlans = filteredPlans ?? plans;



  return (
    <section
      className="bg-stone-200 w-full h-full
                 flex flex-1 flex-col dark:bg-background"
    >
      <DrawerDialog shouldOpenForCreatePlan={true} />
  
      <div className="flex h-full w-full px-4 lg:px-20 flex-1">
        <div
          className="mt-5 mx-auto bg-background dark:border-2 dark:border-border/50 rounded-sm flex-1"
          style={{flex: "1 1 auto"}}
        >
          {!finalPlans || finalPlans.length === 0 ? (
            <NoPlans isLoading={!plans} />
          ) : (
            <div
              className="grid grid-cols-1 
                      md:grid-cols-2 lg:grid-cols-3
                      2xl:grid-cols-4 4xl:grid-cols-6
                      gap-5 p-20 justify-center"
            >
              {finalPlans?.map((plan) => (
                <PlanCard key={plan._id} plan={plan} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
