# 📋 Product Backlog – Newzly

## User Stories

### 1. User Registration – HIGH
**As a new user, I want to create an account so that I can access the platform securely.**

**Acceptance Criteria:**
- User enters name, email, and password
- Email format is validated
- System prevents duplicate email registration
- Password must meet minimum length requirements
- Registration success message is displayed

### 2. User Login – HIGH
**As a returning user, I want to log in so that I can access the news feed.**

**Acceptance Criteria:**
- User provides valid credentials
- Login is denied if credentials are incorrect
- A session or token is created upon successful login
- Optional "Remember Me" functionality
- Error messages are displayed appropriately

### 3. Forgot Password – HIGH
**As a user, I want to reset my password in case I forget it so I can regain access.**

**Acceptance Criteria:**
- Email and new password inputs
- Error shown if email doesn’t exist
- Confirmation displayed on success
- Redirects to login after reset

### 4. Browse News by Category – HIGH
**As a user, I want to view news grouped by category so I can easily explore topics of interest.**

**Acceptance Criteria:**
- Categories include politics, sports, technology, etc.
- Each article displays title, image, summary, and source
- Articles are listed in a clean layout

### 5. Browse News by Country – HIGH
**As a user, I want to view top headlines by country to stay updated with international news.**

**Acceptance Criteria:**
- Country selection menu is provided
- News updates based on selected country (e.g., US, UK)
- If top headlines are unavailable, fallback to `everything` endpoint

### 6. View All News – HIGH
**As a user, I want to browse general news from all categories in one place.**

**Acceptance Criteria:**
- Articles from all topics are shown
- Pagination allows navigation through results
- List refreshes with new articles
- Cached fallback if API fails

### 7. Responsive User Interface – HIGH
**As a user on any device, I want the website to adapt to my screen size for easy browsing.**

**Acceptance Criteria:**
- Layout adjusts for mobile, tablet, and desktop
- Readability is maintained across devices
- Navigation works on smaller screens (e.g., burger menu)

### 8. User Preferences Page (UI) – MEDIUM
**As a user, I want to select categories or countries of interest from a single preferences screen.**

**Acceptance Criteria:**
- UI grid with clickable preferences
- Redirects to filtered news by click

### 9. Error Handling and Feedback – MEDIUM
**As a user, I want to receive feedback when something goes wrong so I know what to do.**

**Acceptance Criteria:**
- Display "No articles found" if result is empty
- Show error messages for failed fetches or network issues
- Toast notifications if news is shown from cache

### 10. Logout Functionality – MEDIUM
**As a logged-in user, I want to be able to log out so my session ends securely.**

**Acceptance Criteria:**
- A logout button is clearly visible
- Session/token is cleared from storage
- User is redirected to login or home
