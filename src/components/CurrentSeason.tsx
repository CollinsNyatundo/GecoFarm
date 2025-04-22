import React from 'react';
import { Calendar, Sun, Cloud, Snowflake, Wind } from 'lucide-react';

const CurrentSeason: React.FC = () => {
  // In a real app, this would come from your database
  const seasonData = {
    name: 'Spring Planting Season 2025',
    startDate: new Date('2025-03-15'),
    endDate: new Date('2025-06-30'),
    daysRemaining: 45,
    percentageComplete: 55,
    mainActivities: ['Corn Planting', 'Wheat Harvesting', 'Field Preparation']
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex items-center mb-4">
        <Sun className="h-5 w-5 text-yellow-500 mr-2" />
        <h3 className="font-medium text-gray-700">Current Season</h3>
      </div>
      
      <div className="mb-4">
        <h4 className="font-bold text-lg text-green-800">{seasonData.name}</h4>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Calendar className="h-4 w-4 mr-1" />
          <span>
            {seasonData.startDate.toLocaleDateString()} - {seasonData.endDate.toLocaleDateString()}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{seasonData.percentageComplete}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${seasonData.percentageComplete}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {seasonData.daysRemaining} days remaining
        </div>
      </div>
      
      <div>
        <h5 className="font-medium text-sm text-gray-700 mb-2">Key Activities:</h5>
        <ul className="text-sm text-gray-600 space-y-1">
          {seasonData.mainActivities.map((activity, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2"></span>
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrentSeason;