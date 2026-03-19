# Task Manager - Frontend Assignment

A modern, full-featured task management application with user authentication, role-based access control, and a professional UI/UX design.

## Features

- **User Authentication**: Complete registration and login system with JWT tokens
- **Role-Based Access Control**: Separate views and permissions for regular users and admins
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete)
- **Admin Dashboard**: Special admin panel to view all users and tasks
- **Form Validation**: Client-side validation with clear error messages
- **Responsive Design**: Mobile-friendly layout that works on all devices
- **Professional UI**: Clean, modern design with smooth animations and transitions
- **Testing**: Component and integration tests using Vitest
- **Type Safety**: Built with TypeScript for better code quality

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint

## Prerequisites

Before running this application, make sure you have:

- Node.js (v18 or higher)
- npm or yarn package manager
- A Supabase account and project

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

To get these values:
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon/public key

### 4. Database Setup

The database schema is already applied. It includes:

**Tables:**
- `profiles`: User profiles with role management (user/admin)
- `tasks`: Task records with user associations

**Security:**
- Row Level Security (RLS) enabled on all tables
- Policies to restrict data access based on user roles
- Admin users can view/manage all data
- Regular users can only access their own data

### 5. Create Demo Users (Optional)

You can create demo users directly through the registration page, or insert them manually:

**Admin User:**
- Email: admin@demo.com
- Password: admin123
- Role: admin

**Regular User:**
- Email: user@demo.com
- Password: user123
- Role: user

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Type checking

```bash
npm run typecheck
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── AdminPanel.tsx   # Admin dashboard for viewing users/tasks
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── TaskForm.tsx     # Form for creating/editing tasks
│   └── TaskList.tsx     # List view for tasks
├── contexts/            # React context providers
│   └── AuthContext.tsx  # Authentication state management
├── lib/                 # Utility libraries
│   └── supabase.ts      # Supabase client configuration
├── pages/               # Page components
│   ├── Login.tsx        # Login page with validation
│   └── Register.tsx     # Registration page with validation
├── tests/               # Test files
│   ├── setup.ts         # Test configuration
│   ├── Login.test.tsx   # Login component tests
│   ├── TaskList.test.tsx # TaskList component tests
│   └── integration.test.tsx # API integration tests
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Features Documentation

### Authentication

- **Registration**: New users can create accounts with email and password
- **Login**: Existing users can sign in with credentials
- **JWT Tokens**: Securely stored in browser session
- **Protected Routes**: Automatic redirection based on auth state
- **Logout**: Clear session and return to login

### User Roles

**Regular User:**
- View only their own tasks
- Create new tasks
- Edit their own tasks
- Delete their own tasks
- View their profile information

**Admin User:**
- All regular user permissions
- View all users in the system
- View all tasks from all users
- Edit any task
- Delete any task
- Access admin panel

### Task Management

**Task Fields:**
- **Title**: Required, minimum 3 characters
- **Description**: Optional text field
- **Status**: Pending or Completed

**Operations:**
- **Create**: Click "New Task" button
- **Read**: View in task list
- **Update**: Click edit icon, modify fields
- **Delete**: Click delete icon, confirm action
- **Toggle Status**: Click checkbox to mark complete/incomplete

### Validation

**Login Form:**
- Email: Required, valid email format
- Password: Required, minimum 6 characters

**Registration Form:**
- Full Name: Required, minimum 2 characters
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Required, must match password

**Task Form:**
- Title: Required, minimum 3 characters
- Description: Optional
- Status: Required (dropdown selection)

### Error Handling

- API errors displayed in red alert boxes
- Form validation errors shown below fields
- Network errors handled gracefully
- Empty states with helpful messages
- Loading states for async operations

## Security Features

- JWT tokens stored in browser session (handled by Supabase)
- Row Level Security (RLS) on all database tables
- Environment variables for sensitive configuration
- No hardcoded API URLs or secrets
- Input validation on client and server
- Protected API endpoints requiring authentication

## UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Color Scheme**: Professional blue and green gradients
- **Typography**: Clear hierarchy with proper font sizes
- **Spacing**: Consistent 8px spacing system
- **Icons**: Lucide React icons throughout
- **Animations**: Smooth transitions and hover effects
- **Loading States**: Spinners for async operations
- **Empty States**: Helpful messages when no data
- **Form Feedback**: Instant validation messages

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Application won't start

- Ensure all dependencies are installed: `npm install`
- Check that `.env` file exists with correct values
- Verify Node.js version is 18 or higher

### Authentication errors

- Verify Supabase URL and anon key in `.env`
- Check Supabase project is active
- Ensure email confirmation is disabled in Supabase Auth settings

### Database errors

- Verify database migrations were applied
- Check RLS policies are enabled
- Ensure user has proper role assigned

### Tests failing

- Run `npm install` to ensure all test dependencies are installed
- Clear test cache: `npm test -- --clearCache`
- Check that vitest.config.ts is properly configured

## Performance Considerations

- Vite for fast development and optimized builds
- React hooks for efficient state management
- Lazy loading where appropriate
- Optimized images and assets
- Minimal bundle size with tree-shaking

## Future Enhancements

- Task categories/tags
- Task due dates and reminders
- Task priority levels
- User profile editing
- Email notifications
- Task search and filtering
- Dark mode support
- Task comments/notes
- File attachments
- Export tasks to CSV/PDF

## License

This project is for evaluation purposes.

## Contact

For questions or issues, please contact the repository owner.

## Thank you 
