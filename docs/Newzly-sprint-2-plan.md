# 🚀 Sprint 2 Plan

## 🏁 Sprint Goal

Enhance the user experience by enabling categorized and country-based news browsing, adding error handling, and improving the responsive UI.

---

## 📅 Sprint Duration

**3-4 weeks**  
**May 02 – May 31, 2025**

---

## 📌 Selected User Stories

### 1. Browse News by Category (HIGH)

**Tasks:**
- Create frontend structure for category-based routing
- Design UI for category navigation (dropdown or menu)
- Create API endpoint to fetch category-based news
- Render categorized news using reusable card components

---

### 2. Browse News by Country (HIGH)

**Tasks:**
- Create dropdown UI for country selection (ISO codes)
- Implement dynamic routing for `/country/:iso`
- Connect API call to fetch country-specific news
- Handle flag display for each country

---

### 3. View All News (HIGH)

**Tasks:**
- Create page to fetch and display general news
- Implement pagination to navigate between result pages
- Display article data (title, image, summary, source)

---

### 4. Error Handling and Feedback (MEDIUM)

**Tasks:**
- Display user-friendly messages for failed API calls
- Handle "No articles found" scenarios
- Show fallback images or placeholders when data is missing

---

### 5. Logout Functionality (MEDIUM)

**Tasks:**
- Add logout button to header/navigation
- Clear session/token on logout
- Redirect user to login or home page after logout

---

## 👥 Team Member Tasks

| Task Area                       | Alma Muzliukaj                     | Rinesa Bislimi                    |
|----------------------------------|------------------------------------|-----------------------------------|
| Category/Country UI Design      | ✅ UI Components                   | 🔄 Connect to API Routes          |
| Routing & Navigation            | ✅ React Router Setup              | ✅ Backend endpoints for category/country |
| Error Handling                  | 🔄 Frontend feedback messages      | 🔄 API error management           |
| Logout Button                   | ✅ Logout button & redirect logic  | 🔄 Session/token clearing         |

---

## ✅ Definition of Done

- All new features are functional and integrated with the existing system
- Code is committed to the repository with clear commit messages
- Functionality is tested across different screen sizes and use cases
- Code is reviewed by the other team member
- Sprint board is updated and all tasks are marked complete
