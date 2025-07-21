import React from 'react';
import { Filter, Search, Calendar } from 'lucide-react';
import { getCategories, getSemesters } from '../utils/courseUtils';

const CourseFilter = ({ 
  selectedCategory, 
  onCategoryChange, 
  selectedStatus, 
  onStatusChange,
  selectedSemester,
  onSemesterChange,
  searchTerm,
  onSearchChange 
}) => {
  const categories = getCategories();
  const semesters = getSemesters();
  const statusOptions = [
    { value: 'all', label: 'Todos los Cursos' },
    { value: 'fully-completed', label: 'Completamente Aprobado' },
    { value: 'course-approved', label: 'Curso Aprobado' },
    { value: 'fully-available', label: 'Totalmente Disponible' },
    { value: 'course-available', label: 'Disponible para Curso' },
    { value: 'exam-available', label: 'Disponible para Examen' },
    { value: 'prerequisites-met', label: 'Requisitos Cumplidos' },
    { value: 'unavailable', label: 'No Disponible' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filtrar Cursos</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar Cursos
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nombre o código del curso..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoría
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todas las Categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Semestre
          </label>
          <select
            value={selectedSemester}
            onChange={(e) => onSemesterChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos los Semestres</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>
                Semestre {semester}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estado
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter; 