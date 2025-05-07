# 📋 Product Backlog – *Newzly*

## User Stories

---

### 1. **User Registration** – HIGH  
*As a new user, I want to create an account so that I can access the platform securely.*

**Acceptance Criteria:**
- User enters name, email, and password  
- Email format is validated  
- System prevents duplicate email registration  
- Password must meet minimum length requirements  
- Registration success message is displayed  

---

### 2. **User Login** – HIGH  
*As a returning user, I want to log in so that I can access the news feed.*

**Acceptance Criteria:**
- User provides valid credentials  
- Login is denied if credentials are incorrect  
- A session is created upon successful login  
- Optional "Remember Me" functionality  
- Error messages are displayed appropriately  

---

### 3. **Browse News by Category** – HIGH  
*As a user, I want to view news grouped by category so I can easily explore topics of interest.*

**Acceptance Criteria:**
- Categories include politics, sports, technology, etc.  
- Each article displays title, image, summary, and source  
- Articles are listed in a clean layout  

---

### 4. **Browse News by Country** – HIGH  
*As a user, I want to view top headlines by country to stay updated with international news.*

**Acceptance Criteria:**
- Country selection menu is provided  
- News updates based on selected country (e.g., US)  
- Articles are filtered using ISO codes  

---

### 5. **Responsive User Interface** – HIGH  
*As a user on any device, I want the website to adapt to my screen size for easy browsing.*

**Acceptance Criteria:**
- Layout adjusts for mobile, tablet, and desktop  
- Readability is maintained across devices  
- Navigation works on smaller screens (e.g., burger menu)  

---

### 6. **View All News** – HIGH  
*As a user, I want to browse general news from all categories in one place.*

**Acceptance Criteria:**
- Articles from all topics are shown  
- Pagination allows navigation through results  
- List refreshes with new articles  

---

### 7. **Error Handling and Feedback** – MEDIUM  
*As a user, I want to receive feedback when something goes wrong so I know what to do.*

**Acceptance Criteria:**
- Display "No articles found" if result is empty  
- Show error messages for failed fetches or network issues  
- Ensure fallback for missing article fields (e.g., no image)  

---

### 8. **Logout Functionality** – MEDIUM  
*As a logged-in user, I want to be able to log out so my session ends securely.*

**Acceptance Criteria:**
- A logout button is clearly visible  
- Session/token is cleared  
- User is redirected to homepage or login screen  

---



