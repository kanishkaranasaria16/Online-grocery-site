import React from 'react'
import DASHBOARDBOX from './DASHBOARDBOX';
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { GiStarsStack } from "react-icons/gi";
import { Chart } from "react-google-charts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell } from 'recharts';
import { PieChart, Pie} from 'recharts';

const data = [
  { month: 'Jan', revenue: 65000, cost: 40000 },
  { month: 'Feb', revenue: 55000, cost: 45000 },
  { month: 'Mar', revenue: 115000, cost: 55000 },
  { month: 'Apr', revenue: 90000, cost: 70000 },
  { month: 'May', revenue: 85000, cost: 45000 },
  { month: 'Jun', revenue: 95000, cost: 85000 },
  { month: 'Jul', revenue: 90000, cost: 55000 },
  { month: 'Aug', revenue: 85000, cost: 50000 },
  { month: 'Sep', revenue: 75000, cost: 50000 },
  { month: 'Oct', revenue: 85000, cost: 55000 },
  { month: 'Nov', revenue: 95000, cost: 50000 },
  { month: 'Dec', revenue: 105000, cost: 45000 },
];

const customerData = [
  { type: 'New', count: 32 },
  { type: 'Existing', count: 42 },
  { type: 'Inactive', count: 22 },
];

const revenueSourceData = [
  { name: 'Ads', value: 40 },
  { name: 'Subscriptions', value: 60 },
  { name: 'Sponsorships', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
export const datas = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  hAxis: { title: "Year", titleTextStyle: { color: "white" } },
  vAxis: { minValue: 0 },
  'backgroundColor': 'transparent',
};
const HOME = () => {
  return (
    <div>
      <div className='right-content w-100'>
        <div className='row dashboardboxWrapperRow'>
          <div className='col-md-8'>
            <div className='dashboardboxWrapper d-flex'>
              <DASHBOARDBOX color={["#1da256", "#48d483"]} icon={<FaUserCircle />} grow={true} label="Total Customers"/>
              <DASHBOARDBOX color={["#c012e2", "#eb64fe"]} icon={<FaShoppingCart />} grow={false} label="Total Orders" />
              <DASHBOARDBOX color={["#2c78e5", "#60aff5"]} icon={<FaBagShopping />} grow={false} label="Total product"/>
              <DASHBOARDBOX color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} grow={true} label="Total Reviews"/>
            </div>
          </div>
          <div className='col-md-4 pl-0'>
            <div className='box'>
              <h4>TOTAL VALUE</h4>
              <h3 className='text-white font-weight-bold'>₹3,78,681.00</h3>
              <Chart
                chartType="AreaChart"
                width="100%"
                height="240px"
                data={datas}
                options={options}
              />
            </div>
          </div>
        </div>
        <div className='card shadow border-0 p-3 mt-4'>
        <div className="app-container">
      <h1>Monthly Revenue & Cost</h1>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="month" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="cost" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

      <div className="charts-container">
        <div className="chart">
          <h2>Customer Types</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h2>Revenue Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={400}>
              <Pie data={revenueSourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

         </div>
      </div>
    </div>
  );
};

export default HOME;
