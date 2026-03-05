# Screenshots Guide

For your project submission, include the following screenshots to showcase your work:

## Required Screenshots

### 1. Login Page
- Navigate to the login page
- Show the clean, professional UI with form validation
- **Filename**: `01-login-page.png`

### 2. Registration Page
- Click "Create one" to show the registration form
- Demonstrate form fields and validation messages
- **Filename**: `02-register-page.png`

### 3. User Dashboard
- Login as a regular user (user@demo.com / user123)
- Show the main dashboard with user stats
- Display the task list for the logged-in user
- **Filename**: `03-user-dashboard.png`

### 4. Create Task
- Click "New Task" button
- Show the task creation form with validation
- **Filename**: `04-create-task.png`

### 5. Task List with Tasks
- Show dashboard with multiple tasks
- Display both pending and completed tasks
- Show edit and delete buttons
- **Filename**: `05-task-list.png`

### 6. Admin Dashboard
- Login as admin (admin@demo.com / admin123)
- Show admin panel button and dashboard
- **Filename**: `06-admin-dashboard.png`

### 7. Admin Panel - Users View
- Click "Show Admin Panel"
- Display the users tab with all users listed
- **Filename**: `07-admin-users.png`

### 8. Admin Panel - Tasks View
- Click the "All Tasks" tab in admin panel
- Show all tasks from all users
- **Filename**: `08-admin-tasks.png`

### 9. Mobile Responsive View
- Open browser dev tools
- Switch to mobile view (iPhone/Android size)
- Show responsive layout
- **Filename**: `09-mobile-view.png`

### 10. Form Validation
- Try to submit login/register with invalid data
- Show validation error messages
- **Filename**: `10-form-validation.png`

### 11. Test Results
- Run `npm test` in terminal
- Screenshot showing all tests passing
- **Filename**: `11-test-results.png`

### 12. Build Success
- Run `npm run build` in terminal
- Screenshot showing successful build
- **Filename**: `12-build-success.png`

## Optional Screenshots

### Component Features
- Task status toggle (pending/completed)
- Edit task form
- Loading states
- Empty states
- Error messages

### Code Quality
- Project structure in VS Code
- Key files (Dashboard.tsx, Login.tsx, etc.)
- Test files

## Tips for Great Screenshots

1. **Use Full Window**: Maximize browser window for clarity
2. **Clean Environment**: Close unnecessary tabs/windows
3. **Good Lighting**: Use light mode for better visibility (if applicable)
4. **Highlight Features**: Show key UI elements clearly
5. **Different States**: Show various states (loading, empty, error, success)
6. **Consistent Size**: Try to keep screenshots at similar resolutions

## Screenshot Tools

- **Windows**: Windows + Shift + S
- **Mac**: Command + Shift + 4
- **Linux**: Screenshot tool or Shutter
- **Browser**: DevTools screenshot feature (F12 > Mobile view > Screenshot)

## Organization

Create a `screenshots/` folder in your repository:

```
screenshots/
├── 01-login-page.png
├── 02-register-page.png
├── 03-user-dashboard.png
├── 04-create-task.png
├── 05-task-list.png
├── 06-admin-dashboard.png
├── 07-admin-users.png
├── 08-admin-tasks.png
├── 09-mobile-view.png
├── 10-form-validation.png
├── 11-test-results.png
└── 12-build-success.png
```

## Adding to README

Include screenshots in your README.md:

```markdown
## Screenshots

### Login Page
![Login Page](screenshots/01-login-page.png)

### User Dashboard
![User Dashboard](screenshots/03-user-dashboard.png)

### Admin Panel
![Admin Panel](screenshots/07-admin-users.png)

... and so on
```
