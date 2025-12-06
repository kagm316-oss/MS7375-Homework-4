# MS7375 Homework 4 - Elite Orthopedic Patient Registration

## 🎓 Student Information
**Name:** Kris Patterson  
**Course:** MS7375  
**Assignment:** Homework 4 - Real-Time JavaScript Form Validation

---

## 🌐 Live Demo
**Main Application:** [homework3.html](homework3.html)

**GitHub Repository:** https://github.com/kagm316-oss/MS7375-Homework-4

**GitHub Pages URL:** https://kagm316-oss.github.io/MS7375-Homework-4/homework3.html

---

## 📚 Documentation Files
- **[GRADING_GUIDE.md](GRADING_GUIDE.md)** - Quick reference for testing and grading
- **[HOMEWORK3_SUMMARY.md](HOMEWORK3_SUMMARY.md)** - Complete implementation details
- **[homework3.html](homework3.html)** - Main form (START HERE!)
- **[thankyou.html](thankyou.html)** - Submission confirmation page
- **[script.js](script.js)** - All JavaScript validation logic
- **[style.css](style.css)** - Updated CSS with error styling

---

## ✨ Key Features

### 🔴 Real-Time Validation
Every field validates **as you type** and **when you leave the field**:
- First/Last Name: Letters, apostrophes, dashes only
- Date of Birth: No future dates, no dates > 120 years old
- Social Security: Auto-formats to XXX-XX-XXXX as you type!
- Email: Validates format and converts to lowercase automatically
- All fields show/hide errors dynamically without page jumping

### 🔐 Password & User ID (All 8 Requirements)
1. ✅ User ID cannot start with a number
2. ✅ User ID must be 5-20 characters
3. ✅ User ID only allows letters, numbers, dash, underscore
4. ✅ Password fields are hidden
5. ✅ Password minimum 8 characters
6. ✅ Password requires uppercase, lowercase, and digit
7. ✅ Password cannot equal User ID
8. ✅ Passwords must match

### 🎯 Advanced Editing Features
- **SSN Auto-Formatting:** Dashes inserted automatically as you type
- **Email Lowercase:** Automatically converts to lowercase
- **Date Validation:** Calculates valid range (not future, not >120 years)
- **Salary Slider:** Real-time display with currency formatting
- **State Dropdown:** All 50 states + DC + PR, no default selection

### 🎨 Error Handling
- Errors appear **immediately** as you type
- Errors disappear when corrected
- **No page jumping** - error space pre-allocated
- Red borders on invalid fields
- Clear, specific error messages
- Error count tracking

### 🚀 Validation Flow
1. Fill out form with real-time feedback
2. Click **VALIDATE FORM** button
3. See validation summary (green = success, red = errors)
4. **SUBMIT button only appears when all fields are valid**
5. Click SUBMIT → Redirects to professional thank you page

---

## 🧪 Quick Test
1. Open `homework3.html`
2. Type numbers in "First Name" → See immediate error
3. Type `123456789` in SSN → Watch it auto-format to `123-45-6789`
4. Enter future date in DOB → See error "Date cannot be in the future"
5. Type `TEST@EXAMPLE.COM` → Watch it convert to lowercase
6. Try User ID starting with number → See error
7. Fill form completely
8. Click VALIDATE FORM
9. When valid, SUBMIT button appears
10. Click SUBMIT → See thank you page

---

## 📋 Requirements Met

### ✅ Core Requirements
- External CSS file (style.css)
- External JavaScript file (script.js)
- File named homework3.html
- Hosted on GitHub with public URL

### ✅ Validation
- Real-time validation using oninput/onblur/onfocus events
- JavaScript validation on EVERY field (not just HTML patterns)
- Errors appear/disappear dynamically
- No page jumping during validation

### ✅ Form Elements
- All required text inputs (name, address, email, phone, etc.)
- 5+ checkboxes (medical history)
- 3+ radio button groups (gender, sick, insurance, vaccinated)
- 1+ slider with dynamic display (salary)
- Text area (symptoms)
- State dropdown (50 states + DC + PR)
- User ID and password fields

### ✅ Advanced Features
- SSN auto-formatting as you type
- Date range validation (120 years)
- Email format validation with lowercase conversion
- All 8 User ID requirements
- All 8 Password requirements
- VALIDATE button (replaces submit)
- SUBMIT only appears when valid
- Professional thank you page

---

## 🎓 Learning Outcomes Demonstrated
1. **JavaScript Event Handling** - oninput, onblur, onchange events
2. **Form Validation** - Complex regex patterns and logic
3. **DOM Manipulation** - Dynamic error messages and styling
4. **User Experience** - Real-time feedback without page jumping
5. **State Management** - Error tracking and validation state
6. **Auto-Formatting** - SSN and email transformation
7. **Date Calculations** - Age validation logic
8. **Professional Design** - Clean UI with proper error handling

---

## 📞 Support
**GitHub Issues:** https://github.com/kagm316-oss/MS7375-Homework-3/issues

---

## 🏆 Summary
This project demonstrates **advanced JavaScript form validation** with:
- ✅ Real-time validation on all fields
- ✅ Advanced editing features (formatting, date validation, etc.)
- ✅ Professional error handling
- ✅ Complete implementation of all requirements
- ✅ Excellent user experience

**Ready for grading!** 🎉
