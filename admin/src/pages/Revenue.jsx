import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { backendUrl } from '../App';
import axios from 'axios';
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Revenue = ({token}) => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [revenueYear, setRevenueYear] = useState([]);
  const [revenueCate, setRevenueCate] = useState({});
  const [revenueSubcate, setRevenueSubcate] = useState({});

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear - 5; year <= currentYear; year++) {
    years.push(year);
  }

  const getRevenueYear = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/revenue/month/' + selectedYear.toString(), {headers : {token}})
      if(res.data.success) {
        setRevenueYear(res.data.revenue)
      }else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const getRevenueCate = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/revenue/category', {headers : {token}})
      if(res.data.success) {
        setRevenueCate(res.data.revenue)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const getRevenueSubcate = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/revenue/subcategory', {headers : {token}})
      if(res.data.success) {
        setRevenueSubcate(res.data.revenue)
      }else {
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  useEffect(() => {
    getRevenueYear()
  },[selectedYear])

  useEffect(() => {
    getRevenueCate()
    getRevenueSubcate()
  },[])

  // Shared chart options
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
      },
    },
  };

  const lineChartOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Months",
          font: { size: 14 },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        title: {
          display: true,
          text: "Revenue",
          font: { size: 14 },
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Revenue Overview ${selectedYear}`,
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: 20,
      },
    },
  };

  const barChartOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
    plugins: {
      ...commonOptions.plugins,
      legend: {
        display: false,
      },
    },
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 sm:justify-between my-8">
      <div className="md:w-[66%] bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Revenue Analytics</h2>
          <select
            className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="h-[500px]">
          <Line
            options={lineChartOptions}
            data={{
              labels: months,
              datasets: [
                {
                  label: "Revenue",
                  data: revenueYear,
                  borderColor: "rgba(244, 63, 94, 0.8)",
                  backgroundColor: "rgba(244, 63, 94, 0.1)",
                  borderWidth: 2,
                  fill: true,
                  tension: 0.4,
                  pointRadius: 4,
                  pointHoverRadius: 6,
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="flex flex-col md:w-[33%] gap-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Category Revenue</h3>
          <div className="h-[210px]">
            <Bar
              options={{
                ...barChartOptions,
                plugins: {
                  ...barChartOptions.plugins,
                  title: {
                    display: true,
                    text: "Revenue by Category",
                    font: { size: 16, weight: 'bold' },
                    padding: 10,
                  },
                },
              }}
              data={{
                labels: Object.keys(revenueCate),
                datasets: [
                  {
                    label: "Revenue",
                    data: Object.values(revenueCate),
                    backgroundColor: [
                      'rgba(59, 130, 246, 0.8)',
                      'rgba(16, 185, 129, 0.8)',
                      'rgba(251, 191, 36, 0.8)',
                    ],
                    borderRadius: 6,
                  },
                ],
              }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Subcategory Revenue</h3>
          <div className="h-[210px]">
            <Bar
              options={{
                ...barChartOptions,
                plugins: {
                  ...barChartOptions.plugins,
                  title: {
                    display: true,
                    text: "Revenue by Subcategory",
                    font: { size: 16, weight: 'bold' },
                    padding: 10,
                  },
                },
              }}
              data={{
                labels: Object.keys(revenueSubcate),
                datasets: [
                  {
                    label: "Revenue",
                    data: Object.values(revenueSubcate),
                    backgroundColor: [
                      'rgba(244, 63, 94, 0.8)',
                      'rgba(168, 85, 247, 0.8)',
                      'rgba(234, 88, 12, 0.8)',
                    ],
                    borderRadius: 6,
                  },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;