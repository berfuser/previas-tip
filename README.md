# Course Enrollment App

A modern web application that helps you track your academic progress and see which courses you can enroll in based on your completed courses.

## Features

- **Course Management**: View all available courses with detailed information
- **Prerequisite Tracking**: Automatically checks if you meet course prerequisites
- **Progress Visualization**: See your completion progress with visual indicators
- **Smart Filtering**: Filter courses by category, enrollment status, and search terms
- **Persistent Storage**: Your progress is automatically saved to localStorage
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Key Features

### 🎯 Course Status Tracking
- **Completed**: Courses you've finished (green indicator)
- **Available to Enroll**: Courses you can take now (blue indicator)
- **Prerequisites Missing**: Courses you need prerequisites for (red indicator)

### 📊 Progress Dashboard
- Visual progress bars showing completion percentage
- Statistics on completed, available, and unavailable courses
- Recently completed courses display

### 🔍 Advanced Filtering
- Search courses by name or ID
- Filter by course category (Computer Science, Mathematics, etc.)
- Filter by enrollment status
- Quick action buttons for common filters

### 💾 Data Persistence
- Your completed courses are automatically saved
- Progress persists between browser sessions
- Option to reset all progress

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

### Building for Production

Create a production build:
```bash
npm run build
```

## How to Use

1. **Mark Courses as Completed**: Click the "Mark as Completed" button on any course card
2. **View Available Courses**: Use the "Show Available Courses" quick action or filter by "Available to Enroll"
3. **Check Prerequisites**: Each course shows its prerequisites and whether you've completed them
4. **Track Progress**: Monitor your progress in the summary section at the top
5. **Filter and Search**: Use the filter panel to find specific courses

## Sample Course Data

The app includes sample courses from various disciplines:
- **Computer Science**: CS101, CS201, CS301, CS302, CS401, CS402
- **Mathematics**: MATH101, MATH201, MATH301
- **Physics**: PHYS101
- **English**: ENG101, ENG201

Each course includes:
- Course ID and name
- Description and credit hours
- Prerequisites (if any)
- Category classification

## Technology Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Local Storage**: Client-side data persistence

## Customization

### Adding New Courses
Edit `src/data/courses.js` to add your own courses:

```javascript
{
  id: 'YOUR_COURSE_ID',
  name: 'Your Course Name',
  description: 'Course description',
  credits: 3,
  prerequisites: ['CS101'], // Array of prerequisite course IDs
  category: 'Your Category'
}
```

### Modifying Categories
Categories are automatically generated from the course data. Add new categories by updating the `category` field in course objects.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License. 