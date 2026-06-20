"use client";

import Link from "next/link";
import { ReadinessCard } from "@/components/dashboard/ReadinessCard";
import { DailyProgressCard } from "@/components/dashboard/DailyProgressCard";
import { TimePerformanceCard } from "@/components/dashboard/TimePerformanceCard";
import { AnalyticsHighlightsCard } from "@/components/dashboard/AnalyticsHighlightsCard";
import { DashboardHeaderStats } from "@/components/dashboard/DashboardHeaderStats";
import { SystemDesignReadinessCard } from "@/components/dashboard/SystemDesignReadinessCard";
import { BehavioralReadinessCard } from "@/components/dashboard/BehavioralReadinessCard";
import { OverallReadinessCard } from "@/components/dashboard/OverallReadinessCard";
import { PageContainer } from "@/components/layout/page-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <PageContainer
      pageTitle="Dashboard"
      pageDescription="Track your coding, system design, and behavioral interview preparation"
    >
      <div className="space-y-6">
        <OverallReadinessCard />

        <Tabs defaultValue="coding">
          <TabsList>
            <TabsTrigger value="coding">Coding</TabsTrigger>
            <TabsTrigger value="systemDesign">System Design</TabsTrigger>
            <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
          </TabsList>

          <TabsContent value="coding" className="space-y-6">
            <DashboardHeaderStats />
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <ReadinessCard />
              <DailyProgressCard />
              <TimePerformanceCard />
            </div>
            <AnalyticsHighlightsCard />
          </TabsContent>

          <TabsContent value="systemDesign" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <SystemDesignReadinessCard />
              <Card>
                <CardContent className="flex h-full flex-col justify-center gap-3 py-8">
                  <p className="text-sm font-medium">Practice FAANG system design</p>
                  <p className="text-muted-foreground text-sm">Work through the question bank with framework checklists, then rate yourself on the 8-dimension rubric.</p>
                  <div className="flex gap-2">
                    <Button asChild size="sm"><Link href="/system-design">Questions <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link></Button>
                    <Button asChild size="sm" variant="outline"><Link href="/system-design/topics">Topic mastery</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavioral" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <BehavioralReadinessCard />
              <Card>
                <CardContent className="flex h-full flex-col justify-center gap-3 py-8">
                  <p className="text-sm font-medium">Practice FAANG behavioral</p>
                  <p className="text-muted-foreground text-sm">Build a STAR story bank, map stories to competencies and Amazon Leadership Principles, and track coverage.</p>
                  <div className="flex gap-2">
                    <Button asChild size="sm"><Link href="/behavioral">Questions <ArrowRight className="ml-1.5 h-3.5 w-3.5" /></Link></Button>
                    <Button asChild size="sm" variant="outline"><Link href="/behavioral/stories">Story bank</Link></Button>
                    <Button asChild size="sm" variant="outline"><Link href="/behavioral/competencies">Coverage</Link></Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
