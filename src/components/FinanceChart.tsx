import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend, 
  BarElement,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface FinanceChartProps {
  type: 'line' | 'pie';
  title: string;
}

const FinanceChart: React.FC<FinanceChartProps> = ({ type, title }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Line chart data (Finances over time)
  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: [15000, 12000, 18000, 20000, 16000, 19000, 22000, 24000, 20000, 25000, 28000, 30000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Expenses',
        data: [10000, 8000, 12000, 14000, 12000, 13000, 15000, 18000, 16000, 17000, 19000, 21000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Profit',
        data: [5000, 4000, 6000, 6000, 4000, 6000, 7000, 6000, 4000, 8000, 9000, 9000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.3,
      }
    ],
  };
  
  // Pie chart data (Product distribution)
  const pieData = {
    labels: ['Corn', 'Wheat', 'Dairy', 'Livestock', 'Vegetables', 'Others'],
    datasets: [
      {
        label: 'Product Distribution',
        data: [35, 20, 15, 20, 8, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          }
        }
      }
    },
    maintainAspectRatio: false
  };
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: false,
      },
    },
    maintainAspectRatio: false
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="font-medium text-gray-700 mb-4">{title}</h3>
      <div className="h-64">
        {type === 'line' ? (
          <Line data={lineData} options={lineOptions} />
        ) : (
          <Pie data={pieData} options={pieOptions} />
        )}
      </div>
    </div>
  );
};

export default FinanceChart;