import React from 'react';
import { GraduationCap, BookOpen, Clock, Target, Award, FileText, Calendar, Star } from 'lucide-react';
import { 
  getAvailableCourses, 
  getUnavailableCourses, 
  getEnrollmentStatus,
  getCoursesBySemester
} from '../utils/courseUtils';

const ProgressSummary = ({ courseApproved, examApproved, courses }) => {
  const totalCourses = courses.length;
  const fullyCompletedCount = examApproved.length; // Exam approved = fully completed
  const courseApprovedCount = courseApproved.filter(id => !examApproved.includes(id)).length; // Only course approved (not exam approved)
  const examApprovedCount = examApproved.length;
  
  // Count courses by enrollment status
  const statusCounts = courses.reduce((acc, course) => {
    const status = getEnrollmentStatus(course.id, courseApproved, examApproved);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const completionPercentage = Math.round((fullyCompletedCount / totalCourses) * 100);
  const fullyAvailablePercentage = Math.round(((statusCounts['fully-available'] || 0) / totalCourses) * 100);

  const stats = [
    {
      icon: Star,
      label: 'Completamente Aprobado',
      value: fullyCompletedCount,
      total: totalCourses,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Award,
      label: 'Solo Curso Aprobado',
      value: courseApprovedCount,
      total: totalCourses,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      icon: FileText,
      label: 'Examen Aprobado',
      value: examApprovedCount,
      total: totalCourses,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: BookOpen,
      label: 'Totalmente Disponible',
      value: statusCounts['fully-available'] || 0,
      total: totalCourses,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Clock,
      label: 'Requisitos Cumplidos',
      value: statusCounts['prerequisites-met'] || 0,
      total: totalCourses,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Target,
      label: 'No Disponible',
      value: statusCounts['unavailable'] || 0,
      total: totalCourses,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  // Get semester progress
  const semesterProgress = [1, 2, 3, 4, 5, 6].map(semester => {
    const semesterCourses = getCoursesBySemester(semester);
    const completedInSemester = semesterCourses.filter(course => 
      examApproved.includes(course.id) // Only count exam approved as fully completed
    ).length;
    const totalInSemester = semesterCourses.length;
    
    return {
      semester,
      completed: completedInSemester,
      total: totalInSemester,
      percentage: totalInSemester > 0 ? Math.round((completedInSemester / totalInSemester) * 100) : 0
    };
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Resumen de Progreso</h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
            <div className="text-xs text-gray-500">
              {Math.round((stat.value / stat.total) * 100)}% del total
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">Completamente Aprobado (Examen Aprobado)</span>
            <span className="text-gray-600">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-700">Totalmente Disponible para Inscripción</span>
            <span className="text-gray-600">{fullyAvailablePercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${fullyAvailablePercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Semester Progress */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Progreso por Semestre (Examen Aprobado)
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {semesterProgress.map(({ semester, completed, total, percentage }) => (
            <div key={semester} className="text-center">
              <div className="text-lg font-semibold text-gray-900">Semestre {semester}</div>
              <div className="text-sm text-gray-600">{completed}/{total} cursos</div>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    percentage === 100 ? 'bg-green-500' : 
                    percentage > 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {fullyCompletedCount > 0 && (
        <div className="mt-4 p-3 bg-green-50 rounded-md">
          <h4 className="text-sm font-medium text-green-800 mb-2">Recientemente Aprobados por Examen:</h4>
          <div className="flex flex-wrap gap-1">
            {examApproved.slice(-3).map(courseId => {
              const course = courses.find(c => c.id === courseId);
              return (
                <span
                  key={courseId}
                  className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
                >
                  {course?.name || courseId}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressSummary; 