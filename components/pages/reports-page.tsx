"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { BarChart3, Download, ZoomIn } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Visualization {
  id: string
  title: string
  description: string
  filename: string
  query: string
}

const visualizations: Visualization[] = [
  {
    id: "confusion-matrix",
    title: "Confusion Matrix",
    description: "Model prediction accuracy visualization",
    filename: "confusion_matrix.png",
    query:
      "confusion matrix heatmap for machine learning model showing true positives, false positives, true negatives, false negatives",
  },
  {
    id: "feature-importance",
    title: "Feature Importance",
    description: "Top contributing features for detection",
    filename: "feature_importance.png",
    query: "horizontal bar chart showing feature importance scores for machine learning model with blue gradient bars",
  },
  {
    id: "anomaly-distribution",
    title: "Anomaly Distribution",
    description: "Distribution of anomaly scores across users",
    filename: "anomaly_distribution.png",
    query: "histogram showing distribution of anomaly scores with normal distribution curve overlay in blue and red",
  },
  {
    id: "model-comparison",
    title: "Model Comparison",
    description: "Performance metrics across all models",
    filename: "model_comparison.png",
    query: "grouped bar chart comparing accuracy, precision, recall, f1-score across three machine learning models",
  },
]

export function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedReports, setGeneratedReports] = useState(false)
  const { toast } = useToast()

  const generateReports = async () => {
    setIsGenerating(true)
    toast({
      title: "Generating reports",
      description: "Creating visualizations from detection results...",
    })

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsGenerating(false)
    setGeneratedReports(true)

    toast({
      title: "Reports generated",
      description: "All visualizations are ready to view",
    })

    // Placeholder API call
    console.log("[v0] API call to /api/generate_report")
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Visual Reports</h1>
          <p className="text-muted-foreground mt-1">Generated visualizations and performance metrics</p>
        </div>
        {!isGenerating && !generatedReports && (
          <Button onClick={generateReports} size="lg" className="bg-gradient-to-r from-primary to-accent">
            <BarChart3 className="h-5 w-5 mr-2" />
            Generate Reports
          </Button>
        )}
      </div>

      {isGenerating && (
        <Card className="border-primary/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <LoadingSpinner size="lg" className="mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Generating Visualizations</h3>
            <p className="text-muted-foreground text-center max-w-md">
              Creating confusion matrices, feature importance charts, and performance comparisons...
            </p>
          </CardContent>
        </Card>
      )}

      {generatedReports && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visualizations.map((viz) => (
              <Card key={viz.id} className="group hover:shadow-lg transition-all overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">{viz.title}</CardTitle>
                  <CardDescription>{viz.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    <img
                      src={`/.jpg?height=400&width=600&query=${encodeURIComponent(viz.query)}`}
                      alt={viz.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ZoomIn className="h-4 w-4 mr-2" />
                            View Full Size
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{viz.title}</DialogTitle>
                            <DialogDescription>{viz.description}</DialogDescription>
                          </DialogHeader>
                          <div className="mt-4">
                            <img
                              src={`/.jpg?height=600&width=900&query=${encodeURIComponent(viz.query)}`}
                              alt={viz.title}
                              className="w-full rounded-lg"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{viz.filename}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Report Summary</CardTitle>
              <CardDescription>Key insights from the analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Model Performance</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Combined model achieved highest accuracy at 96.2%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Autoencoder showed best precision for anomaly detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Isolation Forest provided fastest inference time</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Findings</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>23 users flagged with anomalous behavior patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>File access frequency was the most important feature</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>Off-hours activity strongly correlated with threats</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
