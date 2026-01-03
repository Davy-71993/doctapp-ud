"use client";

import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import React, { use } from "react";

export default function RecentActivitiesCard({
  activitiesPromise,
}: {
  activitiesPromise: Promise<PostgrestSingleResponse<any[]>>;
}) {
  const activities = use(activitiesPromise).data || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          An overview of your latest health activities.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities?.map((activity: any) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <div className="w-full h-full flex items-center justify-center bg-secondary rounded-full">
                <activity.icon className="h-5 w-5 text-muted-foreground" />
              </div>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">
                {activity.title}
              </p>
              <p className="text-sm text-muted-foreground">
                {activity.description}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
