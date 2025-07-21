import React from 'react';
import { CheckCircle, XCircle, Clock, BookOpen, Calendar, Award, FileText, Star } from 'lucide-react';
import { 
  getMissingCourseApproval, 
  getMissingExamApproval,
  getCourseById,
  getEnrollmentStatus,
  getCompletionStatus
} from '../utils/courseUtils';

const CourseCard = ({ course, courseApproved, examApproved, onToggleCourseApproved, onToggleExamApproved }) => {
  const enrollmentStatus = getEnrollmentStatus(course.id, courseApproved, examApproved);
  const completionStatus = getCompletionStatus(course.id, courseApproved, examApproved);
  const missingCourseApproval = getMissingCourseApproval(course.id, courseApproved, examApproved);
  const missingExamApproval = getMissingExamApproval(course.id, examApproved);

  const getStatusIcon = () => {
    switch (enrollmentStatus) {
      case 'fully-completed':
        return <Star className="w-5 h-5 text-green-500" />;
      case 'course-approved':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'fully-available':
        return <BookOpen className="w-5 h-5 text-blue-500" />;
      case 'course-available':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'exam-available':
        return <FileText className="w-5 h-5 text-purple-500" />;
      case 'prerequisites-met':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (enrollmentStatus) {
      case 'fully-completed':
        return 'Completamente Aprobado';
      case 'course-approved':
        return 'Curso Aprobado';
      case 'fully-available':
        return 'Totalmente Disponible';
      case 'course-available':
        return 'Disponible para Curso';
      case 'exam-available':
        return 'Disponible para Examen';
      case 'prerequisites-met':
        return 'Requisitos Cumplidos';
      default:
        return 'No Disponible';
    }
  };

  const getStatusColor = () => {
    switch (enrollmentStatus) {
      case 'fully-completed':
        return 'bg-green-100 text-green-800';
      case 'course-approved':
        return 'bg-yellow-100 text-yellow-800';
      case 'fully-available':
        return 'bg-blue-100 text-blue-800';
      case 'course-available':
        return 'bg-yellow-100 text-yellow-800';
      case 'exam-available':
        return 'bg-purple-100 text-purple-800';
      case 'prerequisites-met':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getBorderColor = () => {
    switch (enrollmentStatus) {
      case 'fully-completed':
        return 'border-green-500';
      case 'course-approved':
        return 'border-yellow-500';
      case 'fully-available':
        return 'border-blue-500';
      case 'course-available':
        return 'border-yellow-500';
      case 'exam-available':
        return 'border-purple-500';
      case 'prerequisites-met':
        return 'border-orange-500';
      default:
        return 'border-red-500';
    }
  };

  const isCourseApproved = courseApproved.includes(course.id);
  const isExamApproved = examApproved.includes(course.id);
  const effectiveCourseApproved = isCourseApproved || isExamApproved;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${getBorderColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {course.id} - {course.name}
          </h3>
          <p className="text-gray-600 text-sm mb-2">{course.description}</p>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.credits} créditos
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Semestre {course.semester}
            </span>
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
              {course.category}
            </span>
            {course.tag && (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${course.tag === 'Obligatorio' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                {course.tag}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>

      {/* Course Approval Requirements */}
      {course.courseApproved.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-yellow-700 mb-2">Aprobación de Curso Requerida:</h4>
          <div className="flex flex-wrap gap-1">
            {course.courseApproved.map(reqId => {
              const req = getCourseById(reqId);
              const isCompleted = courseApproved.includes(reqId) || examApproved.includes(reqId);
              return (
                <span
                  key={reqId}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {req?.name || reqId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Exam Approval Requirements */}
      {course.examApproved.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-purple-700 mb-2">Aprobación de Examen Requerida:</h4>
          <div className="flex flex-wrap gap-1">
            {course.examApproved.map(reqId => {
              const req = getCourseById(reqId);
              const isCompleted = examApproved.includes(reqId);
              return (
                <span
                  key={reqId}
                  className={`text-xs px-2 py-1 rounded-full ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-purple-100 text-purple-800'
                  }`}
                >
                  {req?.name || reqId}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Missing Requirements */}
      {(missingCourseApproval.length > 0 || missingExamApproval.length > 0) && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-red-700 mb-2">Requisitos Faltantes:</h4>
          <div className="space-y-2">
            {missingCourseApproval.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-600">Aprobación de Curso: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {missingCourseApproval.map(reqId => {
                    const req = getCourseById(reqId);
                    return (
                      <span
                        key={reqId}
                        className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800"
                      >
                        {req?.name || reqId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
            {missingExamApproval.length > 0 && (
              <div>
                <span className="text-xs font-medium text-gray-600">Aprobación de Examen: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {missingExamApproval.map(reqId => {
                    const req = getCourseById(reqId);
                    return (
                      <span
                        key={reqId}
                        className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800"
                      >
                        {req?.name || reqId}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => onToggleCourseApproved(course.id)}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            effectiveCourseApproved
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
          }`}
          disabled={isExamApproved}
        >
          {effectiveCourseApproved ? 'Quitar Aprobación de Curso' : 'Marcar Curso Aprobado'}
          {isExamApproved && ' (Auto-aprobado con examen)'}
        </button>
        
        <button
          onClick={() => onToggleExamApproved(course.id)}
          className={`w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            isExamApproved
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
        >
          {isExamApproved ? 'Quitar Aprobación de Examen' : 'Marcar Examen Aprobado'}
        </button>
      </div>
    </div>
  );
};

export default CourseCard; 