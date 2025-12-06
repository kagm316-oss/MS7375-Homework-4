# HOMEWORK 4 - IMPLEMENTATION SUMMARY
## MS7375 Web Design Assignment
**Author:** Kris Patterson  
**Date:** December 5, 2025  
**Repository:** https://github.com/kagm316-oss/MS7375-Homework-4

---

##  COMPLETED FEATURES

### 1. Fetch API 
- **File:** states.json (53 states/territories)
- **Implementation:** loadStates() async function in script.js
- **Functionality:** Dynamically loads all US states from JSON file into dropdown
- **Error Handling:** Try-catch with fallback error message

### 2. iFrames 
- **File:** iframe-content.html  
- **Location:** Above Patient Registration Form heading
- **Content:** Patient resources with links to AAOS, OrthoInfo, WebMD, MedlinePlus
- **Styling:** Styled container with green border, 300px height

### 3. Content Protection (Fixed Positioning) 
- **Welcome Banner:** Sticky positioning at top with z-index 1000
- **Fixed Footer:** Fixed positioning at bottom with z-index 999
- **Body Padding:** 150px bottom padding to prevent content overlap

### 4. Cookie Usage 
- **Functions:** setCookie(), getCookie(), deleteCookie()
- **Storage:** User's first name for 48 hours
- **Features:**
  - "Remember Me" checkbox saves name on form submission
  - Welcome message: "Welcome back, [Name]!" for returning users
  - "Not you?" checkbox clears cookie and resets form
  
### 5. Local Storage Usage 
- **Functions:** saveToLocalStorage(), loadFromLocalStorage(), clearLocalStorage()
- **Auto-save:** All non-secure fields saved on input/change events
- **Security:** Excludes SSN, password, and re-enter-password fields
- **Restore:** Automatically loads saved data for returning users

### 6. Time-based Events 
- **Live Clock:**
  - Updates every second (1000ms interval)
  - Format: HH:MM:SS AM/PM
  - Located in welcome banner
  
- **Session Timeout:**
  - 5-minute inactivity timer
  - Confirmation dialog: "Continue?" or reset form
  - Timer resets on any input or click event

---

##  FILES MODIFIED

### homework3.html
- Added fixed welcome banner with live clock and "Not you?" checkbox
- Added iFrame container for patient resources
- Added "Remember Me" checkbox below vaccination radio buttons
- Changed state dropdown to load from Fetch API (placeholder: "Loading states...")
- Added class="fixed-footer" to footer div

### script.js
- Added cookie management functions (set, get, delete)
- Added local storage functions (save, load, clear)
- Added async loadStates() for Fetch API
- Added updateLiveClock() with setInterval
- Added startSessionTimer() and resetSessionTimer() for 5-minute timeout
- Added checkReturningUser() for welcome message logic
- Updated DOMContentLoaded to initialize all new features
- Updated submitForm() to save cookie when Remember Me is checked
- Added auto-save listeners for all form inputs

### style.css
- Added .welcome-banner (sticky, top: 0, green background)
- Added #welcome-message, #live-clock, #not-user-label styles
- Added .iframe-container and .patient-iframe styles
- Added .fixed-footer (position: fixed, bottom: 0)
- Added body padding-bottom: 150px
- Added hover states for footer links and buttons

### states.json (NEW)
- JSON array with 53 objects (50 states + DC + Puerto Rico + Virgin Islands)
- Properties: value (abbreviation), name (full name)

### iframe-content.html (NEW)
- Standalone HTML with inline CSS
- Patient resource links styled with hover effects
- Green color scheme matching main form

---

##  HOMEWORK 4 REQUIREMENTS MET

| Requirement | Status | Implementation |
|------------|--------|----------------|
| 1. Fetch API |  Complete | Loads states.json dynamically |
| 2. iFrames |  Complete | Patient resources iframe above form |
| 3. Content Protection |  Complete | Sticky banner + fixed footer |
| 4. Cookie Usage |  Complete | 48-hour first name storage |
| 5. Local Storage |  Complete | Auto-save all non-secure fields |
| 6. Time-based Event |  Complete | Live clock + 5-min timeout |

---

##  HOW TO TEST

1. **First Visit:**
   - Welcome message shows "Welcome New User"
   - Live clock updates every second
   - Fill out form - data auto-saves to local storage
   - Check "Remember Me" and submit form

2. **Return Visit (within 48 hours):**
   - Welcome message shows "Welcome back, [Your Name]!"
   - "Not you?" checkbox appears
   - All saved data from local storage restored automatically
   - States load from JSON via Fetch API

3. **Session Timeout:**
   - Fill out form and wait 5 minutes without interaction
   - Confirmation dialog appears
   - Choose "Cancel" to clear form

4. **iFrame:**
   - Patient resources visible above form
   - Links open in new tabs
   - Styled with green border matching theme

5. **Fixed Elements:**
   - Scroll down page
   - Welcome banner stays at top (sticky)
   - Footer stays at bottom (fixed)

---

##  CODE STATISTICS

- **HTML:** 1 main file updated + 1 iframe file created
- **JavaScript:** 350+ lines of new code added
- **CSS:** 140+ lines of new styles added
- **JSON:** 53 state/territory objects created
- **Total Commit:** 524 insertions, 74 deletions

---

##  ADDITIONAL ENHANCEMENTS

- Cookie expiration properly handled (48 hours = 2 days)
- Local storage excludes secure fields (SSN, passwords)
- Session timer resets on ANY user activity (input or click)
- Error handling in Fetch API with fallback messages
- Welcome banner uses sticky (not fixed) for better UX
- Footer fixed at bottom but doesn't overlap content
- All new features integrated seamlessly with existing Homework 3 validation

---

##  REPOSITORY

- **GitHub:** https://github.com/kagm316-oss/MS7375-Homework-4
- **Branch:** master
- **Last Commit:** "Complete Homework 4 implementation: Add Fetch API, Cookies, Local Storage, iFrames, Fixed positioning, and Time-based events"
- **Commit Hash:** 7403ae4

---

##  NOTES

All Homework 3 validation features remain intact:
- Real-time validation on 19 fields
- SSN auto-formatting (XXX-XX-XXXX)
- Password strength validation (8 requirements)
- Email lowercase enforcement
- Pain level slider (1-10)
- Error tracking and display
- Submit button only appears when valid

**Status:**  ALL HOMEWORK 4 REQUIREMENTS COMPLETED AND PUSHED TO GITHUB
