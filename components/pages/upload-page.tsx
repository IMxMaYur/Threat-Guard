"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

interface UploadPageProps {
  onNext: () => void
}

export function UploadPage({ onNext }: UploadPageProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const { toast } = useToast()

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile && droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile)
        toast({
          title: "File selected",
          description: `${droppedFile.name} is ready to upload`,
        })
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a CSV file",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile)
      toast({
        title: "File selected",
        description: `${selectedFile.name} is ready to upload`,
      })
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      })
    }
  }

  const simulateUpload = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setUploadProgress(i)
    }

    setIsUploading(false)
    setUploadComplete(true)

    toast({
      title: "Upload successful",
      description: "Raw logs have been uploaded successfully",
    })

    // Placeholder API call
    console.log("[v0] API call to /api/upload_raw_logs with file:", file?.name)
  }

  const handleStartExtraction = () => {
    toast({
      title: "Starting feature extraction",
      description: "Processing your data...",
    })
    onNext()
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Upload Raw Logs</h1>
        <p className="text-muted-foreground mt-1">Upload your CSV log files to begin threat detection analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>File Upload</CardTitle>
            <CardDescription>Drag and drop your CSV file or click to browse</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer hover:border-primary/50",
                isDragging ? "border-primary bg-primary/5" : "border-border",
                uploadComplete && "border-green-500 bg-green-500/5",
              )}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
                disabled={isUploading || uploadComplete}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center gap-4">
                  {uploadComplete ? (
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  ) : (
                    <Upload className="h-16 w-16 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-lg font-medium text-foreground">
                      {uploadComplete
                        ? "Upload Complete!"
                        : file
                          ? file.name
                          : "Drop your CSV file here or click to browse"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {uploadComplete ? "Ready for feature extraction" : "Supports: .csv files up to 100MB"}
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {file && !uploadComplete && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  {!isUploading && (
                    <Button onClick={simulateUpload} className="bg-gradient-to-r from-primary to-accent">
                      Upload File
                    </Button>
                  )}
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Uploading...</span>
                      <span className="font-medium text-foreground">{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </div>
            )}

            {uploadComplete && (
              <div className="mt-6">
                <Button onClick={handleStartExtraction} className="w-full bg-gradient-to-r from-primary to-accent">
                  Start Feature Extraction
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">CSV Format</p>
                  <p className="text-xs text-muted-foreground">Ensure your file is in CSV format</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Required Columns</p>
                  <p className="text-xs text-muted-foreground">user_id, timestamp, event_type, resource</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">File Size</p>
                  <p className="text-xs text-muted-foreground">Maximum 100MB per upload</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Data Privacy</p>
                  <p className="text-xs text-muted-foreground">All data is processed securely and encrypted</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
