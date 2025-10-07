"use client"

import { useState, useEffect } from "react"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertTriangle, CheckCircle, Activity, AlertCircle, RefreshCw } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Button } from "@/components/ui/button"

interface DashboardStats {
  totalUsers: number
  anomaliesDetected: number
  normalActivities: number
  detectionAccuracy: number
  activityDistribution: Array<{ name: string; value: number }>
  recentActivity: Array<{
    user: string
    action: string
    status: string
    time: string
    risk: string
  }>
}

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    anomaliesDetected: 0,
    normalActivities: 0,
    detectionAccuracy: 0,
    activityDistribution: [],
    recentActivity: [],
  })
  const [loading, setLoading] = useState(true)
  const [backendConnected, setBackendConnected] = useState(false)
  const [retrying, setRetrying] = useState(false)

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/dashboard-stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
        setBackendConnected(true)
      } else {
        setBackendConnected(false)
      }
    } catch (error) {
      console.error("[v0] Failed to fetch dashboard stats:", error)
      setBackendConnected(false)
    } finally {
      setLoading(false)
      setRetrying(false)
    }
  }

  const handleRetry = () => {
    setRetrying(true)
    fetchDashboardStats()
  }

  useEffect(() => {
    fetchDashboardStats()

    // Poll for updates every 5 seconds
    const interval = setInterval(fetchDashboardStats, 5000)

    return () => clearInterval(interval)
  }, [])

  const metrics = [
    {
      title: "Total Users Monitored",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      description: "Active users in system",
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Anomalies Detected",
      value: stats.anomaliesDetected.toLocaleString(),
      icon: AlertTriangle,
      description: "Flagged activities",
      trend: { value: 0, isPositive: false },
    },
    {
      title: "Normal Activities",
      value: stats.normalActivities.toLocaleString(),
      icon: CheckCircle,
      description: "Safe user behaviors",
      trend: { value: 0, isPositive: true },
    },
    {
      title: "Detection Accuracy",
      value: `${stats.detectionAccuracy}%`,
      icon: Activity,
      description: "Model performance",
      trend: { value: 0, isPositive: true },
    },
  ]

  const pieData = [
    { name: "Normal", value: stats.normalActivities, color: "#10b981" },
    { name: "Anomalous", value: stats.anomaliesDetected, color: "#ef4444" },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {!backendConnected && !loading && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-yellow-500">Backend Server Not Connected</p>
              <p className="text-xs text-muted-foreground mt-1">
                Make sure the Flask backend is running on http://localhost:5000
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            disabled={retrying}
            className="border-yellow-500/20 hover:bg-yellow-500/10 bg-transparent"
          >
            {retrying ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Retrying...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry Connection
              </>
            )}
          </Button>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Real-time monitoring and threat detection analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.totalUsers === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Upload and process logs to view activity distribution</p>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentActivity.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <p>No recent activity to display</p>
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                    <div
                      className={`h-2 w-2 rounded-full mt-2 ${
                        activity.status === "Anomaly" ? "bg-red-500" : "bg-green-500"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          activity.risk === "High"
                            ? "bg-red-500/20 text-red-400"
                            : activity.risk === "Medium"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {activity.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
