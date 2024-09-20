import { Doc } from "@/convex/_generated/dataModel";
import navigationSvg from "@/public/img.jpeg";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { CalendarDaysIcon, MapPin, PlaneIcon, EditIcon } from "lucide-react";
import { TooltipContainer } from "@/components/shared/Toolip";
import { getFormattedDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

type PlanCardProps = {
  plan: Doc<"plan"> & { url: string | null } & { isSharedPlan: boolean } & Pick<
      Doc<"planSettings">,
      "fromDate" | "toDate"
    >;
  isPublic?: boolean;
};

const PlanCard = ({ plan, isPublic = false }: PlanCardProps) => {
  return (
    <Link
      role="article"
      href={isPublic ? `/plans/${plan._id}/community-plan` : `/plans/${plan._id}/plan`}
      className="shadow-lg w-full max-w-xl mx-auto"
    >
      <Card className="w-full h-[400px] flex flex-col rounded-lg overflow-hidden group hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-56">
          <Image
            role="figure"
            alt="travelpic"
            src="https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 100px) 50vw, 33vw"
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />

        </div>

        <CardContent className="flex-1 p-4 space-y-3 bg-white">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-semibold">{plan.nameoftheplace}</h3>
              {!isPublic && plan.fromDate && plan.toDate && (
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-1">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                  <span>
                    {getFormattedDateRange(
                      new Date(plan.fromDate),
                      new Date(plan.toDate),
                      "PP"
                    )}
                  </span>
                </div>
              )}
            </div>
       
          </div>

          <CardDescription className="text-sm text-gray-600">
            {/* Description of the plan can go here */}
            Explore the best places in {plan.nameoftheplace} and enjoy your trip with our curated plan!
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PlanCard;
