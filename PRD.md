# Product Requirements Document (PRD): Vayana

## 1. Project Vision
**Vayana** is a minimalist web application designed for personal book collection management. It eschews social features and complex metadata in favor of a clean, utility-first interface for tracking physical books, reading progress, and lending status.

---

## 2. Target Audience
* The "Minimalist Reader" who wants a digital inventory without the bloat of social networks.
* Users who primarily read physical books and need a way to track "Current Page" progress.
* People who frequently lend books and forget who has them.

---

## 3. Core Features (MVP Scope)

### 3.1 Book Management
* **Add Book:** Manual entry for Title, Author, and Total Pages.
* **Delete Book:** Ability to remove books from the library.
* **Edit Book:** Update book details (e.g., correcting page counts).

### 3.2 Personal Shelving (Categories)
* **Custom Labels:** Users can assign a "Category" or "Shelf" tag to each book.
* **Organization:** Simple dropdown selection for categories during book creation.

### 3.3 Search & Multi-Filter
* **Global Search:** Real-time filtering by Title or Author.
* **Attribute Filtering:** Filter view by Category or by "Lent Out" status.

### 3.4 Lending Tracker
* **Status Toggle:** A simple boolean state (At Home / Lent Out).
* **Borrower Name:** If "Lent Out," a text field appears to record the name of the borrower.

### 3.5 Reading Progress
* **Current Page Tracking:** A numeric input to update the current page.
* **Progress Visualization:** A visual progress bar calculated as:
    $$\text{Progress \%} = \left( \frac{\text{Current Page}}{\text{Total Pages}} \right) \times 100$$


### 3.6 LOGIN SYSTEM
* **Login:** Users can login using their email and password.
* **Register:** Users can register using their email and password.
* **Logout:** Users can logout
---

## 4. User Interface & Experience

### 4.1 Page Architecture
1.  **Main Library View (Dashboard):** * Top: "Currently Reading" section (Books with progress > 0% and < 100%).
    * Middle: Search and Filter controls.
    * Bottom: Grid/List view of all books.
2.  **Slide-over Drawer:** * Triggered by clicking a book.
    * Contains the "Edit Progress" and "Lending" controls to keep the UI uncluttered.

### 4.2 Aesthetics
* **Theme:** Light/Dark mode support (System preference).
* **Typography:** Clean Sans-serif (e.g., Inter or Geist).
* **Vibe:** Focus on whitespace and "digital paper" feel.

---

## 5. Technical Stack (Proposed)
* **Frontend:** Next.js 16, Tailwind CSS.
* **Backend/Database:** Node js (MongoDB).
* **State Management:** Zustand (for local UI state).

---

## 6. Success Metrics
* **Simplicity:** User should be able to log a page update in under 5 seconds.
* **Utility:** 100% accuracy in "Lent Out" tracking vs. physical shelf reality.

---

## 7. Future Considerations (Post-MVP)
* ISBN Barcode scanning.
* Data Export (CSV/JSON).
* Multiple Reading Sessions (History log).