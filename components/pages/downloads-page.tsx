"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, ImageIcon, FileJson, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface DownloadItem {
  id: string
  name: string
  description: string
  type: "csv" | "json" | "image"
  size: string
  icon: typeof FileText
  available: boolean
}

const downloadItems: DownloadItem[] = [
  {
    id: "user-features",
    name: "user_features_unsupervised.csv",
    description: "Extracted behavioral features for all users",
    type: "csv",
    size: "2.4 MB",
    icon: FileText,
    available: true,
  },
  {
    id: "user-anomalies",
    name: "user_anomalies_with_reason.csv",
    description: "Detected anomalies with detailed explanations",
    type: "csv",
    size: "156 KB",
    icon: FileText,
    available: true,
  },
  {
    id: "report-summary",
    name: "report_summary.json",
    description: "Complete analysis summary and metrics",
    type: "json",
    size: "48 KB",
    icon: FileJson,
    available: true,
  },
  {
    id: "confusion-matrix",
    name: "confusion_matrix.png",
    description: "Model prediction accuracy visualization",
    type: "image",
    size: "124 KB",
    icon: ImageIcon,
    available: true,
  },
  {
    id: "feature-importance",
    name: "feature_importance.png",
    description: "Top contributing features chart",
    type: "image",
    size: "98 KB",
    icon: ImageIcon,
    available: true,
  },
  {
    id: "anomaly-distribution",
    name: "anomaly_distribution.png",
    description: "Distribution of anomaly scores",
    type: "image",
    size: "112 KB",
    icon: ImageIcon,
    available: true,
  },
  {
    id: "model-comparison",
    name: "model_comparison.png",
    description: "Performance metrics comparison",
    type: "image",
    size: "105 KB",
    icon: ImageIcon,
    available: true,
  },
]

export function DownloadsPage() {
  const { toast } = useToast()

  const handleDownload = (item: DownloadItem) => {
    toast({
      title: "Download started",
      description: `Downloading ${item.name}...`,
    })
    // Placeholder download logic
    console.log("[v0] Downloading file:", item.name)
  }

  const handleDownloadAll = () => {
    toast({
      title: "Downloading all files",
      description: "Preparing zip archive with all results...",
    })
    console.log("[v0] Downloading all files as zip")
  }

  const csvFiles = downloadItems.filter((item) => item.type === "csv")
  const jsonFiles = downloadItems.filter((item) => item.type === "json")
  const imageFiles = downloadItems.filter((item) => item.type === "image")

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Downloads</h1>
          <p className="text-muted-foreground mt-1">Download processed data, reports, and visualizations</p>
        </div>
        <Button onClick={handleDownloadAll} size="lg" className="bg-gradient-to-r from-primary to-accent">
          <Download className="h-5 w-5 mr-2" />
          Download All
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Files</CardTitle>
          <CardDescription>Processed CSV and JSON data files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...csvFiles, ...jsonFiles].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      {item.available && (
                        <Badge variant="outline" className="flex-shrink-0">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Ready
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{item.size}</span>
                      <Button
                        onClick={() => handleDownload(item)}
                        size="sm"
                        variant="outline"
                        disabled={!item.available}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visualization Images</CardTitle>
          <CardDescription>Generated charts and performance visualizations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {imageFiles.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      {item.available && (
                        <Badge variant="outline" className="flex-shrink-0">
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Ready
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-muted-foreground">{item.size}</span>
                      <Button
                        onClick={() => handleDownload(item)}
                        size="sm"
                        variant="outline"
                        disabled={!item.available}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle>Export Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">All files are ready for download</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Generated from the latest detection run on {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Data format compatibility</p>
                <p className="text-muted-foreground text-xs mt-1">
                  CSV files can be opened in Excel, Python pandas, or any spreadsheet software
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Secure downloads</p>
                <p className="text-muted-foreground text-xs mt-1">
                  All downloads are encrypted and logged for security compliance
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
