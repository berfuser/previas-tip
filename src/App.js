import React, { useState, useEffect } from 'react';
import { BookOpen, GraduationCap, RefreshCw, Award, FileText, Star } from 'lucide-react';
import CourseCard from './components/CourseCard';
import CourseFilter from './components/CourseFilter';
import ProgressSummary from './components/ProgressSummary';
import { courses } from './data/courses';
import { getEnrollmentStatus } from './utils/courseUtils';

function App() {
  const [courseApproved, setCourseApproved] = useState([]);
  const [examApproved, setExamApproved] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Load approved courses from localStorage on component mount (only once)
  useEffect(() => {
    try {
      const savedCourseApproved = localStorage.getItem('courseApproved');
      const savedExamApproved = localStorage.getItem('examApproved');
      
      console.log('Loading from localStorage:', { savedCourseApproved, savedExamApproved });
      
      if (savedCourseApproved) {
        const parsedCourseApproved = JSON.parse(savedCourseApproved);
        if (Array.isArray(parsedCourseApproved)) {
          setCourseApproved(parsedCourseApproved);
          console.log('Loaded courseApproved:', parsedCourseApproved);
        }
      }
      
      if (savedExamApproved) {
        const parsedExamApproved = JSON.parse(savedExamApproved);
        if (Array.isArray(parsedExamApproved)) {
          setExamApproved(parsedExamApproved);
          console.log('Loaded examApproved:', parsedExamApproved);
        }
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem('courseApproved');
      localStorage.removeItem('examApproved');
      setIsInitialized(true);
    }
  }, []);

  // Save approved courses to localStorage whenever they change (only after initialization)
  useEffect(() => {
    if (!isInitialized) return; // Don't save during initial load
    
    try {
      localStorage.setItem('courseApproved', JSON.stringify(courseApproved));
      console.log('Saved courseApproved to localStorage:', courseApproved);
    } catch (error) {
      console.error('Error saving courseApproved to localStorage:', error);
    }
  }, [courseApproved, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return; // Don't save during initial load
    
    try {
      localStorage.setItem('examApproved', JSON.stringify(examApproved));
      console.log('Saved examApproved to localStorage:', examApproved);
    } catch (error) {
      console.error('Error saving examApproved to localStorage:', error);
    }
  }, [examApproved, isInitialized]);

  const toggleCourseApproved = (courseId) => {
    console.log('Toggling course approved for:', courseId);
    setCourseApproved(prev => {
      const newState = prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      console.log('New courseApproved state:', newState);
      return newState;
    });
  };

  const toggleExamApproved = (courseId) => {
    console.log('Toggling exam approved for:', courseId);
    setExamApproved(prev => {
      const newState = prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      console.log('New examApproved state:', newState);
      return newState;
    });
  };

  const resetProgress = () => {
    if (window.confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Esta acción no se puede deshacer.')) {
      console.log('Resetting progress');
      setCourseApproved([]);
      setExamApproved([]);
      // Also clear localStorage immediately
      localStorage.removeItem('courseApproved');
      localStorage.removeItem('examApproved');
    }
  };

  // Filter courses based on search, category, semester, and status
  const getFilteredCourses = () => {
    let filtered = courses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by semester
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(course => course.semester === parseInt(selectedSemester));
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(course => {
        const status = getEnrollmentStatus(course.id, courseApproved, examApproved);
        return status === selectedStatus;
      });
    }

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  // Count courses by status for the legend
  const statusCounts = courses.reduce((acc, course) => {
    const status = getEnrollmentStatus(course.id, courseApproved, examApproved);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Calculate effective course approved count (excluding those that are exam approved)
  const effectiveCourseApprovedCount = courseApproved.filter(id => !examApproved.includes(id)).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">App de Inscripción a Cursos</h1>
            </div>
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Reiniciar Progreso
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Summary */}
        <ProgressSummary 
          courseApproved={courseApproved} 
          examApproved={examApproved} 
          courses={courses} 
        />

        {/* Filters */}
        <CourseFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedSemester={selectedSemester}
          onSemesterChange={setSelectedSemester}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Course Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Cursos ({filteredCourses.length})
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Completamente Aprobado: {statusCounts['fully-completed'] || 0}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                Solo Curso Aprobado: {effectiveCourseApprovedCount}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                Examen Aprobado: {examApproved.length}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                Totalmente Disponible: {statusCounts['fully-available'] || 0}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                Requisitos Cumplidos: {statusCounts['prerequisites-met'] || 0}
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                No Disponible: {statusCounts['unavailable'] || 0}
              </span>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
              <p className="text-gray-600">
                Intenta ajustar tus filtros o términos de búsqueda para ver más cursos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  courseApproved={courseApproved}
                  examApproved={examApproved}
                  onToggleCourseApproved={toggleCourseApproved}
                  onToggleExamApproved={toggleExamApproved}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedStatus('fully-completed')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Star className="w-4 h-4" />
              Mostrar Completamente Aprobados
            </button>
            <button
              onClick={() => setSelectedStatus('course-approved')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              <Award className="w-4 h-4" />
              Mostrar Cursos Aprobados
            </button>
            <button
              onClick={() => setSelectedStatus('fully-available')}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Mostrar Totalmente Disponibles
            </button>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSelectedSemester('all');
                setSearchTerm('');
              }}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Limpiar Todos los Filtros
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App; 