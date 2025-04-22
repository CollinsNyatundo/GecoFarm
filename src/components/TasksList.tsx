import React, { useState } from 'react';
import { Check, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'urgent';
  assignedTo?: string;
}

interface TasksListProps {
  isAdmin?: boolean;
  limit?: number;
}

const TasksList: React.FC<TasksListProps> = ({ isAdmin = false, limit }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Sample tasks data
  const initialTasks: Task[] = [
    {
      id: '1',
      title: 'Check fence in Field B',
      description: 'Inspect the northern fence for any damage after yesterday\'s wind',
      dueDate: '2025-06-10',
      status: 'pending',
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      title: 'Feed livestock in Barn 3',
      description: 'Morning feeding for cattle in Barn 3',
      dueDate: '2025-06-08',
      status: 'completed',
      assignedTo: 'Maria Rodriguez'
    },
    {
      id: '3',
      title: 'Fix water pump in Field D',
      description: 'The irrigation system is malfunctioning, needs immediate repair',
      dueDate: '2025-06-07',
      status: 'urgent',
      assignedTo: 'Sam Wilson'
    },
    {
      id: '4',
      title: 'Harvest corn in Field A',
      description: 'Begin harvesting the southwestern section of the corn field',
      dueDate: '2025-06-15',
      status: 'pending',
      assignedTo: 'Emily Chang'
    },
    {
      id: '5',
      title: 'Veterinary check for dairy cows',
      description: 'Schedule routine health check with Dr. Stevens',
      dueDate: '2025-06-20',
      status: 'pending',
      assignedTo: 'David Johnson'
    }
  ];
  
  // Filter tasks for the current employee
  const filteredTasks = isAdmin 
    ? initialTasks 
    : initialTasks.filter(task => task.assignedTo === user?.name);

  // Apply limit if specified
  const displayedTasks = limit ? filteredTasks.slice(0, limit) : filteredTasks;
  
  const [tasks, setTasks] = useState<Task[]>(displayedTasks);
  
  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === 'completed' ? 'pending' : 'completed'
        };
      }
      return task;
    }));
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'urgent':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'urgent':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const handleViewAllTasks = () => {
    if (isAdmin) {
      navigate('/admin/tasks');
    } else {
      navigate('/employee/tasks');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-green-50 border-b border-green-100">
        <h3 className="font-medium text-lg text-gray-800">
          {isAdmin ? 'All Tasks' : 'My Tasks'}
        </h3>
        <p className="text-sm text-gray-600">
          {isAdmin ? 'Overview of all farm tasks' : 'Your assigned tasks and their status'}
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="px-6 py-4 hover:bg-gray-50">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(task.status)}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-xs rounded-full px-2.5 py-0.5 border ${getStatusClass(
                          task.status
                        )}`}
                      >
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                      {!isAdmin && (
                        <input
                          type="checkbox"
                          checked={task.status === 'completed'}
                          onChange={() => toggleTaskStatus(task.id)}
                          className="ml-3 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                    {isAdmin && task.assignedTo && (
                      <span className="ml-4">Assigned to: {task.assignedTo}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-500">No tasks available</p>
          </div>
        )}
      </div>
      
      <div className="bg-gray-50 px-6 py-3 flex justify-end">
        <button 
          onClick={handleViewAllTasks}
          className="flex items-center text-sm text-green-700 hover:text-green-900"
        >
          <span>View all tasks</span>
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default TasksList;