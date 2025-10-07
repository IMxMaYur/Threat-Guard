"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { Badge } from "@/components/ui/badge"
import { Brain, Cpu, Layers, CheckCircle2, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface DetectionPageProps {
  onNext: () => void
}

interface ModelStatus {
  name: string
  status: "idle" | "running" | "complete"
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  icon: typeof Brain
  description: string
}

const pieData = [
  { name: "Normal", value: 1224, color: "#10b981" },
  { name: "Anomalous", value: 23, color: "#ef4444" },
]

export function DetectionPage({ onNext }: DetectionPageProps) {
  const [isDetecting, setIsDetecting] = useState(false)
  const [detectionComplete, setDetectionComplete] = useState(false)
  const { toast } = useToast()

  const [models, setModels] = useState<ModelStatus[]>([
    {
      name: "Isolation Forest",
      status: "idle",
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1Score: 0,
      icon: Brain,
      description: "Tree-based anomaly detection using random partitioning",
    },
    {
      name: "Autoencoder",
      status: "idle",
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1Score: 0,
      icon: Layers,
      description: "Neural network-based reconstruction error analysis",
    },
    {
      name: "Combined Model",
      status: "idle",
      accuracy: 0,
      precision: 0,
      recall: 0,
      f1Score: 0,
      icon: Cpu,
      description: "Ensemble approach combining both models",
    },
  ])

  const runDetection = async () => {
    setIsDetecting(true)
    toast({
      title: "Starting anomaly detection",
      description: "Running all detection models...",
    })

    // Simulate sequential model execution
    for (let i = 0; i < models.length; i++) {
      // Set model to running
      setModels((prev) => prev.map((model, idx) => (idx === i ? { ...model, status: "running" as const } : model)))

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Set model to complete with results
      const results = [
        { accuracy: 92.3, precision: 89.5, recall: 91.2, f1Score: 90.3 },
        { accuracy: 94.7, precision: 92.1, recall: 93.8, f1Score: 92.9 },
        { accuracy: 96.2, precision: 94.8, recall: 95.5, f1Score: 95.1 },
      ]

      setModels((prev) =>
        prev.map((model, idx) =>
          idx === i
            ? {
                ...model,
                status: "complete" as const,
                ...results[i],
              }
            : model,
        ),
      )
    }

    setIsDetecting(false)
    setDetectionComplete(true)

    toast({
      title: "Detection complete",
      description: "All models have finished processing",
    })

    // Placeholder API call
    console.log("[v0] API call to /api/run_detection")
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Anomaly Detection</h1>
          <p className="text-muted-foreground mt-1">Run AI models to detect insider threats and anomalous behavior</p>
        </div>
        {!isDetecting && !detectionComplete && (
          <Button onClick={runDetection} size="lg" className="bg-gradient-to-r from-primary to-accent">
            Run Detection Models
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {models.map((model) => {
          const Icon = model.icon
          return (
            <Card
              key={model.name}
              className={`transition-all ${
                model.status === "running"
                  ? "border-primary shadow-lg shadow-primary/20"
                  : model.status === "complete"
                    ? "border-green-500/50"
                    : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                      <CardDescription className="text-xs mt-1">{model.description}</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  {model.status === "idle" && <Badge variant="outline">Ready</Badge>}
                  {model.status === "running" && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Clock className="h-3 w-3 mr-1 animate-spin" />
                      Running
                    </Badge>
                  )}
                  {model.status === "complete" && (
                    <Badge className="bg-green-500 text-white">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Complete
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {model.status === "running" && (
                  <div className="flex items-center justify-center py-8">
                    <LoadingSpinner size="md" />
                  </div>
                )}

                {model.status === "complete" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Accuracy</span>
                      <span className="text-sm font-semibold text-foreground">{model.accuracy}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Precision</span>
                      <span className="text-sm font-semibold text-foreground">{model.precision}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Recall</span>
                      <span className="text-sm font-semibold text-foreground">{model.recall}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">F1-Score</span>
                      <span className="text-sm font-semibold text-foreground">{model.f1Score}%</span>
                    </div>
                  </div>
                )}

                {model.status === "idle" && (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">Waiting to run...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {detectionComplete && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Summary</CardTitle>
                <CardDescription>Overall anomaly detection results</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anomalous Users</CardTitle>
                <CardDescription>Top flagged users requiring investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { id: "User #1042", score: 0.92, reason: "Unusual file access pattern" },
                    { id: "User #1156", score: 0.88, reason: "Abnormal data transfer volume" },
                    { id: "User #0734", score: 0.85, reason: "Off-hours login activity" },
                    { id: "User #1289", score: 0.81, reason: "Multiple failed access attempts" },
                    { id: "User #0456", score: 0.78, reason: "Suspicious resource access" },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{user.id}</p>
                        <p className="text-xs text-muted-foreground">{user.reason}</p>
                      </div>
                      <Badge variant="destructive" className="ml-3">
                        {(user.score * 100).toFixed(0)}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={onNext} size="lg" className="bg-gradient-to-r from-primary to-accent">
              View Visual Reports
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
