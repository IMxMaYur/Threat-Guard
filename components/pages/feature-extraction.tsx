"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/ui/metric-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Users, FileText, Activity, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeatureExtractionProps {
  onNext: () => void
}

export function FeatureExtraction({ onNext }: FeatureExtractionProps) {
  const [isExtracting, setIsExtracting] = useState(true)
  const [extractionComplete, setExtractionComplete] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate feature extraction process
    const timer = setTimeout(() => {
      setIsExtracting(false)
      setExtractionComplete(true)
      toast({
        title: "Feature extraction complete",
        description: "User features have been successfully extracted",
      })

      // Placeholder API call
      console.log("[v0] API call to /api/extract_features")
    }, 3000)

    return () => clearTimeout(timer)
  }, [toast])

  const stats = [
    {
      title: "Total Users Processed",
      value: "1,247",
      icon: Users,
      description: "Unique user profiles",
    },
    {
      title: "Average File Size",
      value: "2.4 MB",
      icon: FileText,
      description: "Per user log data",
    },
    {
      title: "Unique Event Types",
      value: "18",
      icon: Activity,
      description: "Different activities logged",
    },
    {
      title: "Features Extracted",
      value: "42",
      icon: CheckCircle2,
      description: "Behavioral patterns identified",
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Feature Extraction</h1>
        <p className="text-muted-foreground mt-1">Extracting behavioral features from uploaded log data</p>
      </div>

      {isExtracting ? (
        <Card className="border-primary/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" className="mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Processing Your Data</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Analyzing user behavior patterns and extracting key features for anomaly detection. This may take a few
              moments...
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Extracting features from raw logs</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <MetricCard key={stat.title} {...stat} />
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Extraction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Login Frequency Analysis</p>
                      <p className="text-xs text-muted-foreground">Extracted login patterns and timestamps</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-500 font-medium">Complete</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">File Access Patterns</p>
                      <p className="text-xs text-muted-foreground">Analyzed resource access behavior</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-500 font-medium">Complete</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Data Transfer Volume</p>
                      <p className="text-xs text-muted-foreground">Calculated upload/download metrics</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-500 font-medium">Complete</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Temporal Behavior Analysis</p>
                      <p className="text-xs text-muted-foreground">Identified time-based patterns</p>
                    </div>
                  </div>
                  <span className="text-xs text-green-500 font-medium">Complete</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Output File:</span> user_features_unsupervised.csv
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Contains 42 extracted features for 1,247 users ready for anomaly detection
                </p>
              </div>
            </CardContent>
          </Card>

          {extractionComplete && (
            <div className="flex justify-end">
              <Button onClick={onNext} size="lg" className="bg-gradient-to-r from-primary to-accent">
                Proceed to Anomaly Detection
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
