"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BloodSugarData } from "@/lib/types";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import React, { use, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BloodSugarCard() {
  const [bloodSugarData, setbloodSugarData] = useState<BloodSugarData[]>([]);

  useEffect(() => {
    setbloodSugarData(
      JSON.parse(localStorage.getItem("healthDataBloodSugar") || "[]")
    );
    console.log(
      JSON.parse(localStorage.getItem("healthDataBloodSugar") || "[]")
    );
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Sugar</CardTitle>
        <CardDescription>Recent glucose level readings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <LineChart data={bloodSugarData?.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                unit=" mg/dL"
                domain={["dataMin - 5", "dataMax + 5"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="level"
                stroke="hsl(var(--chart-3))"
                name="Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
