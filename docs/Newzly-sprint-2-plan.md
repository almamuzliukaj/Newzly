# Sprint 2 Plan 

## Sprint Goal
Enable news browsing by category, implement search functionality using ElasticSearch, and allow users to set and update their preferred categories and sources.

## Sprint Duration
1 week (May 2 – May 9, 2025)

## Selected User Stories

1. **Browse News Articles** (HIGH)  
As a user, I want to view the latest news articles so that I can stay informed.

Tasks:
- Integrate News API to fetch articles  
- Display articles in grid/list layout on frontend  
- Categorize articles and allow filtering  
- Implement pagination to limit articles per page  

---

2. **Search News with ElasticSearch** (HIGH)  
As a user, I want to search for news using keywords so that I can find relevant information quickly.

Tasks:
- Index fetched articles into ElasticSearch  
- Create backend search API endpoint  
- Add search bar component to frontend  
- Display search results in real time  
- Show message if no results are found  

---

3. **Manage Preferences** (MEDIUM)  
As a user, I want to set my preferred news categories and sources so that I see relevant news.

Tasks:
- Build preferences UI (multi-select categories/sources)  
- Implement backend endpoint for saving user preferences  
- Store preferences in MongoDB  
- Apply preferences to filter articles in the feed  


## Team Member Tasks

**Alma Muzliukaj**  
  - Design & implement frontend UI for browsing and preferences  
  - Connect frontend to backend search API  
  - Handle dynamic article rendering and filtering  

**Rinesa Bislimi**  
  - Set up News API integration and article fetching logic  
  - Configure and test ElasticSearch indexing  
  - Develop backend routes for search and preferences  


## Definition of Done

- Code is committed to the GitHub repository  
- Features are tested and responsive  
- News articles can be browsed, filtered, and searched  
- Preferences are saved and applied correctly  
- Code has been reviewed and documented by both team members  

