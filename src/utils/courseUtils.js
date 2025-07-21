import { courses } from '../data/courses.js';

// Check if user can enroll in a course based on completed courses
export const canEnrollInCourse = (courseId, courseApproved, examApproved) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return false;
  
  // If no requirements, can always enroll
  if (course.courseApproved.length === 0 && course.examApproved.length === 0) return true;
  
  // Check if all course approval requirements are met
  const courseRequirementsMet = course.courseApproved.every(req => 
    courseApproved.includes(req) || examApproved.includes(req)
  );
  
  // Check if all exam approval requirements are met
  const examRequirementsMet = course.examApproved.every(req => 
    examApproved.includes(req)
  );
  
  return courseRequirementsMet && examRequirementsMet;
};

// Check if user meets course approval requirements
export const meetsCourseApproval = (courseId, courseApproved, examApproved) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return false;
  
  // If no course approval requirements, always meets them
  if (course.courseApproved.length === 0) return true;
  
  // Check if all course approval requirements are completed
  // Note: If exam is approved, course is automatically considered approved
  return course.courseApproved.every(req => 
    courseApproved.includes(req) || examApproved.includes(req)
  );
};

// Check if user meets exam approval requirements
export const meetsExamApproval = (courseId, examApproved) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return false;
  
  // If no exam approval requirements, always meets them
  if (course.examApproved.length === 0) return true;
  
  // Check if all exam approval requirements are completed
  return course.examApproved.every(req => 
    examApproved.includes(req)
  );
};

// Get all courses user can enroll in
export const getAvailableCourses = (courseApproved, examApproved) => {
  return courses.filter(course => 
    !courseApproved.includes(course.id) && 
    !examApproved.includes(course.id) &&
    canEnrollInCourse(course.id, courseApproved, examApproved)
  );
};

// Get courses that are not available due to missing requirements
export const getUnavailableCourses = (courseApproved, examApproved) => {
  return courses.filter(course => 
    !courseApproved.includes(course.id) && 
    !examApproved.includes(course.id) &&
    !canEnrollInCourse(course.id, courseApproved, examApproved)
  );
};

// Get missing course approval requirements
export const getMissingCourseApproval = (courseId, courseApproved, examApproved) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];
  
  return course.courseApproved.filter(req => 
    !courseApproved.includes(req) && !examApproved.includes(req)
  );
};

// Get missing exam approval requirements
export const getMissingExamApproval = (courseId, examApproved) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return [];
  
  return course.examApproved.filter(req => 
    !examApproved.includes(req)
  );
};

// Get course by ID
export const getCourseById = (courseId) => {
  return courses.find(course => course.id === courseId);
};

// Get all categories
export const getCategories = () => {
  const categories = [...new Set(courses.map(course => course.category))];
  return categories.sort();
};

// Get all semesters
export const getSemesters = () => {
  const semesters = [...new Set(courses.map(course => course.semester))];
  return semesters.sort((a, b) => a - b);
};

// Get courses by semester
export const getCoursesBySemester = (semester) => {
  return courses.filter(course => course.semester === semester);
};

// Get enrollment status for a course
export const getEnrollmentStatus = (courseId, courseApproved, examApproved) => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 'unknown';
  
  const isCourseApproved = courseApproved.includes(courseId);
  const isExamApproved = examApproved.includes(courseId);
  
  // If exam is approved, course is automatically considered approved
  const effectiveCourseApproved = isCourseApproved || isExamApproved;
  
  if (isExamApproved) return 'fully-completed';
  if (effectiveCourseApproved) return 'course-approved';
  
  const canEnroll = canEnrollInCourse(courseId, courseApproved, examApproved);
  const meetsCourse = meetsCourseApproval(courseId, courseApproved, examApproved);
  const meetsExam = meetsExamApproval(courseId, examApproved);
  
  if (canEnroll && meetsCourse && meetsExam) return 'fully-available';
  if (canEnroll && meetsCourse) return 'course-available';
  if (canEnroll && meetsExam) return 'exam-available';
  if (canEnroll) return 'prerequisites-met';
  
  return 'unavailable';
};

// Get completion status for a course
export const getCompletionStatus = (courseId, courseApproved, examApproved) => {
  const isCourseApproved = courseApproved.includes(courseId);
  const isExamApproved = examApproved.includes(courseId);
  
  if (isExamApproved) return 'fully-completed';
  if (isCourseApproved) return 'course-approved';
  return 'not-started';
}; 