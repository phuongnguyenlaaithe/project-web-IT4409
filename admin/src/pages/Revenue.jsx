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
import axios from 'axios'
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
  const [revenueCate, setRevenueCate] = useState({
    "Man": 2000,
    "Men": 2070
});
  const [revenueSubcate, setRevenueSubcate] = useState();

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
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const getRevenueCate = async () => {
    try {
      const res = await axios.get(backendUrl + '/api/revenue/category', {headers : {token}})
      console.log(res)
      if(res.data.success) {
        setRevenueCate(res.data.revenue)
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
  },[])

  return (
    <div className="flex flex-col md:flex-row gap-3 sm:justify-between">
      <div className="md:w-[66%] relative bg-white p-4 py-8 rounded-md shadow-lg">
        <form className="md:float-right mr-3 md:absolute md:right-4 md:top-8">
          <select
            className="py-1 px-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </form>
        <Line
          options={{
            responsive: true,
            scales: {  
              x: {  
                title: {  
                  display: true,  
                  text: 'Months',  
                },  
              },  
              y: {  
                title: {  
                  display: true,  
                  text: 'Values',  
                },  
                ticks: {  
                  stepSize: 1000,  
                },  
              },  
            },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: `REVENUE ${selectedYear}`,
                font: {
                  size: 20,
                },
              },
            },
          }}
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: "revenue",
                data: revenueYear,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
              },
            ],
          }}
        />
      </div>

      <div className=" flex flex-col md:w-[33%] gap-3">
        <div className="bg-white rounded-md shadow-md p-4">
          <Bar
            options={{
            responsive: true,
            scales: {  
              y: {  
                title: {  
                  display: true,  
                  text: 'Values',  
                },  
                ticks: {  
                  stepSize: 10, // Step size for ticks on the y-axis  
                },  
              },  
            },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'CATEGORY',
                font: {
                  size: 16,
                },
              },
            },
          }}
            data={{
              labels: Object.keys(revenueCate),
              datasets: [
                {
                  label: "count",
                  data: Object.values(revenueCate),
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: [
                    "rgba(255, 99, 132,1)",
                    "rgba(250, 192, 19, 1)",
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="bg-white rounded-md shadow-md p-4">
          <Bar
            options={{
            responsive: true,
            scales: {  
              x: {  
                title: {  
                  display: true,  
                  text: 'Months',  
                },  
              },  
              y: {  
                title: {  
                  display: true,  
                  text: 'Values',  
                },  
                ticks: {  
                  stepSize: 10, // Step size for ticks on the y-axis  
                },  
              },  
            },
            plugins: {
              legend: {
                display: false,
              },
              title: {
                display: true,
                text: 'SUBCATEGORY',
                font: {
                  size: 16,
                },
              },
            },
          }}
            data={{
              labels: [
                "January",
                "February",
                "March",
              ],
              datasets: [
                {
                  label: "count",
                  data: [12, 8, 33],
                  borderColor: "rgb(255, 99, 132)",
                  backgroundColor: "rgba(197, 134, 165, 1)",
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Revenue;
