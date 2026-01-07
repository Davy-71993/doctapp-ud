"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import React, { use, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BloodPressureCard() {
  const [bloodPressureData, setBloodPressureData] = useState<any[]>([]);

  useEffect(() => {
    setBloodPressureData(
      JSON.parse(localStorage.getItem("healthDataBloodPressure") || "[]")
    );
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Blood Pressure</CardTitle>
        <CardDescription>Recent systolic & diastolic readings.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <BarChart data={bloodPressureData?.slice(-7)}>
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
                unit=" mmHg"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
              <Bar
                dataKey="systolic"
                fill="hsl(var(--chart-1))"
                name="Systolic"
              />
              <Bar
                dataKey="diastolic"
                fill="hsl(var(--chart-2))"
                name="Diastolic"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
