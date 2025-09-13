import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
 
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
 
const AnalyticsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalStats, setTotalStats] = useState({ active: 0, paused: 0 });
 
  // ML service endpoint
  const ML_API_URL = 'http://localhost:5001/analytics';
 
  useEffect(() => {
    fetchAnalyticsData();
  }, []);
 
  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ML_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
 
      const data = await response.json();
      // Process the data from ML service - your format has status as top-level keys
      const activeData = data.active_vs_paused.active || {};
      const pausedData = data.active_vs_paused.PAUSED || {};
      // Get all months from both datasets
      const allMonths = new Set([...Object.keys(activeData), ...Object.keys(pausedData)]);
      const months = Array.from(allMonths).sort(); // Sort months chronologically
      // Extract counts for each month
      const activeCounts = months.map(month => activeData[month] || 0);
      const pausedCounts = months.map(month => pausedData[month] || 0);
 
      // Set chart data
      setChartData({
        labels: months,
        datasets: [
          {
            label: 'Active Subscriptions',
            data: activeCounts,
            backgroundColor: 'rgba(40, 167, 69, 0.8)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 2,
          },
          {
            label: 'Paused Subscriptions',
            data: pausedCounts,
            backgroundColor: 'rgba(220, 53, 69, 0.8)',
            borderColor: 'rgba(220, 53, 69, 1)',
            borderWidth: 2,
          },
        ],
      });
 
      // Set total stats
      setTotalStats({
        active: data.total_active || 0,
        paused: data.total_paused || 0
      });
 
    } catch (err) {
      console.error('Error fetching analytics data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Active vs Paused Subscriptions by Month',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Subscriptions',
        },
      },
    },
  };
 
  if (loading) {
    return (
<div className="flex items-center justify-center h-64">
<div className="text-lg">Loading analytics...</div>
</div>
    );
  }
 
  if (error) {
    return (
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
<h3 className="text-red-800 font-medium">Error Loading Analytics</h3>
<p className="text-red-600 mt-1">{error}</p>
<button 
          onClick={fetchAnalyticsData}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
>
          Retry
</button>
</div>
    );
  }
 
  return (
<div className="w-full">
      {/* Summary Stats */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
<div className="bg-green-50 border border-green-200 rounded-lg p-4">
<div className="text-2xl font-bold text-green-800">{totalStats.active}</div>
<div className="text-green-600">Total Active</div>
</div>
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
<div className="text-2xl font-bold text-red-800">{totalStats.paused}</div>
<div className="text-red-600">Total Paused</div>
</div>
<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
<div className="text-2xl font-bold text-blue-800">
            {totalStats.active + totalStats.paused}
</div>
<div className="text-blue-600">Total Subscriptions</div>
</div>
</div>
 
      {/* Chart */}
<div className="bg-white border border-gray-200 rounded-lg p-4">
<div className="h-96">
<Bar options={chartOptions} data={chartData} />
</div>
</div>
 
      {/* Refresh Button */}
<div className="mt-4 text-center">
<button
          onClick={fetchAnalyticsData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
>
          Refresh Data
</button>
</div>
</div>
  );
};
 
export default AnalyticsChart;