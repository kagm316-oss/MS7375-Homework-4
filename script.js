/**
 * External JavaScript file for MS7375 Homework 4
 * Author: Kris Patterson
 * Date: December 5, 2025
 * Description: Real-time form validation with Fetch API, Cookies, Local Storage, iFrames, and Time-based Events
 */

// Global error tracking
let fieldErrors = {};
let errorCount = 0;
let sessionTimer = null;

// ===== COOKIE MANAGEMENT =====
/**
 * Set a cookie with expiration in hours
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} hours - Expiration in hours
 */
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string} Cookie value or empty string
 */
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
}

/**
 * Delete a cookie by name
 * @param {string} name - Cookie name
 */
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// ===== LOCAL STORAGE MANAGEMENT =====
/**
 * Save a form field to local storage
 * @param {string} fieldId - Field ID
 * @param {string} value - Field value
 */
function saveToLocalStorage(fieldId, value) {
    // Don't save secure fields (SSN, passwords)
    const secureFields = ['social-security', 'password', 're-enter-password'];
    if (!secureFields.includes(fieldId)) {
        localStorage.setItem(fieldId, value);
    }
}

/**
 * Load all saved fields from local storage
 */
function loadFromLocalStorage() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        const savedValue = localStorage.getItem(input.id);
        if (savedValue && input.type !== 'password' && input.id !== 'social-security') {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (savedValue === 'true' || input.value === savedValue) {
                    input.checked = true;
                }
            } else {
                input.value = savedValue;
            }
        }
    });
}

/**
 * Clear all local storage for this form
 */
function clearLocalStorage() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        localStorage.removeItem(input.id);
    });
}

// ===== FETCH API FOR STATES =====
/**
 * Load states from JSON file using Fetch API
 */
async function loadStates() {
    try {
        const response = await fetch('states.json');
        if (!response.ok) {
            throw new Error('Failed to load states');
        }
        const data = await response.json();
        const stateDropdown = document.getElementById('state');
        
        if (stateDropdown) {
            // Clear loading message
            stateDropdown.innerHTML = '<option value="">Select a state</option>';
            
            // Add all states from JSON
            data.forEach(state => {
                const option = document.createElement('option');
                option.value = state.value;
                option.textContent = state.name;
                stateDropdown.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading states:', error);
        const stateDropdown = document.getElementById('state');
        if (stateDropdown) {
            stateDropdown.innerHTML = '<option value="">Error loading states</option>';
        }
    }
}

// ===== TIME-BASED EVENTS =====
/**
 * Update live clock every second
 */
function updateLiveClock() {
    const clockElement = document.getElementById('live-clock');
    if (clockElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        clockElement.textContent = timeString;
    }
}

/**
 * Show session timeout warning
 */
function showTimeoutWarning() {
    const proceed = confirm('Your session has been inactive for 5 minutes. Would you like to continue?');
    if (proceed) {
        // Reset timer
        startSessionTimer();
    } else {
        // Clear form
        document.getElementById('patient-form').reset();
        clearLocalStorage();
    }
}

/**
 * Start session timeout timer (5 minutes)
 */
function startSessionTimer() {
    // Clear existing timer
    if (sessionTimer) {
        clearTimeout(sessionTimer);
    }
    // Set new timer for 5 minutes
    sessionTimer = setTimeout(showTimeoutWarning, 5 * 60 * 1000);
}

/**
 * Reset session timer on user activity
 */
function resetSessionTimer() {
    startSessionTimer();
}

// ===== WELCOME BANNER MANAGEMENT =====
/**
 * Check for returning user and display welcome message
 */
function checkReturningUser() {
    const savedFirstName = getCookie('userFirstName');
    const welcomeMessage = document.getElementById('welcome-message');
    const notUserLabel = document.getElementById('not-user-label');
    const notUserCheckbox = document.getElementById('not-user-checkbox');
    
    if (savedFirstName && welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${savedFirstName}!`;
        if (notUserLabel) {
            notUserLabel.style.display = 'inline-block';
        }
        
        // Load saved data from local storage
        loadFromLocalStorage();
        
        // Handle "Not you?" checkbox
        if (notUserCheckbox) {
            notUserCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    deleteCookie('userFirstName');
                    clearLocalStorage();
                    welcomeMessage.textContent = 'Welcome New User';
                    notUserLabel.style.display = 'none';
                    document.getElementById('patient-form').reset();
                    this.checked = false;
                }
            });
        }
    } else {
        welcomeMessage.textContent = 'Welcome New User';
    }
}

/**
 * External JavaScript file for MS7375 Homework 4
 * Author: Kris Patterson
 * Date: December 5, 2025
 * Description: Real-time form validation with advanced editing features
 */

// Global error tracking
let fieldErrors = {};
let errorCount = 0;



/**
 * Display current date in the banner
 */
function displayCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        dateElement.textContent = formattedDate;
    }
}

/**
 * Initialize form
 */
function initializeForm() {
    // Initialize all error flags
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        fieldErrors[input.id] = false;
    });
}

/**
 * Set dynamic date ranges based on current date
 */
function setDateRanges() {
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    
    // Birth date: no future dates, max 120 years ago
    const minBirthDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    const minBirthString = minBirthDate.toISOString().split('T')[0];
    
    const dobField = document.getElementById('date-of-birth');
    if (dobField) {
        dobField.setAttribute('min', minBirthString);
        dobField.setAttribute('max', maxDate);
    }
}

/**
 * Setup pain level slider with dynamic display
 */
function setupSalarySlider() {
    const painSlider = document.getElementById('pain-level');
    const painDisplay = document.getElementById('pain-display');
    
    if (painSlider && painDisplay) {
        painSlider.addEventListener('input', function() {
            const value = parseInt(this.value);
            painDisplay.textContent = formatPainLevel(value);
        });
        
        // Initialize display
        const initialValue = parseInt(painSlider.value);
        painDisplay.textContent = formatPainLevel(initialValue);
    }
}

/**
 * Format pain level value for display
 */
function formatPainLevel(value) {
    const painDescriptions = {
        1: '1 (No Pain)',
        2: '2 (Minimal)',
        3: '3 (Mild)',
        4: '4 (Moderate)',
        5: '5 (Moderate)',
        6: '6 (Moderate-Severe)',
        7: '7 (Severe)', 
        8: '8 (Very Severe)',
        9: '9 (Extremely Severe)',
        10: '10 (Unbearable)'
    };
    return painDescriptions[value] || value.toString();
}

/**
 * Attach validation listeners to all form fields
 */
function attachValidationListeners() {
    // Text inputs with real-time validation
    document.getElementById('first-name').addEventListener('input', validateFirstName);
    document.getElementById('first-name').addEventListener('blur', validateFirstName);
    
    document.getElementById('middle-initial').addEventListener('input', validateMiddleInitial);
    document.getElementById('middle-initial').addEventListener('blur', validateMiddleInitial);
    
    document.getElementById('last-name').addEventListener('input', validateLastName);
    document.getElementById('last-name').addEventListener('blur', validateLastName);
    
    document.getElementById('date-of-birth').addEventListener('input', validateDateOfBirth);
    document.getElementById('date-of-birth').addEventListener('blur', validateDateOfBirth);
    
    // SSN with formatting on input
    document.getElementById('social-security').addEventListener('input', formatAndValidateSSN);
    document.getElementById('social-security').addEventListener('blur', validateSSN);
    
    document.getElementById('email-address').addEventListener('input', validateEmail);
    document.getElementById('email-address').addEventListener('blur', validateEmail);
    
    document.getElementById('phone-number').addEventListener('input', validatePhone);
    document.getElementById('phone-number').addEventListener('blur', validatePhone);
    
    document.getElementById('address-line-1').addEventListener('input', validateAddressLine1);
    document.getElementById('address-line-1').addEventListener('blur', validateAddressLine1);
    
    document.getElementById('address-line-2').addEventListener('input', validateAddressLine2);
    document.getElementById('address-line-2').addEventListener('blur', validateAddressLine2);
    
    document.getElementById('city').addEventListener('input', validateCity);
    document.getElementById('city').addEventListener('blur', validateCity);
    
    document.getElementById('state').addEventListener('change', validateState);
    document.getElementById('state').addEventListener('blur', validateState);
    
    document.getElementById('zip-code').addEventListener('input', validateZipCode);
    document.getElementById('zip-code').addEventListener('blur', validateZipCode);
    
    // User ID and Password
    document.getElementById('user-id').addEventListener('input', validateUserId);
    document.getElementById('user-id').addEventListener('blur', validateUserId);
    
    document.getElementById('password').addEventListener('input', validatePassword);
    document.getElementById('password').addEventListener('blur', validatePassword);
    
    document.getElementById('re-enter-password').addEventListener('input', validatePasswordMatch);
    document.getElementById('re-enter-password').addEventListener('blur', validatePasswordMatch);
    
    // Radio buttons
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => radio.addEventListener('change', validateGender));
    
    const sickRadios = document.querySelectorAll('input[name="sick"]');
    sickRadios.forEach(radio => radio.addEventListener('change', validateSick));
    
    const insuranceRadios = document.querySelectorAll('input[name="insurance"]');
    insuranceRadios.forEach(radio => radio.addEventListener('change', validateInsurance));
    
    const vaccinatedRadios = document.querySelectorAll('input[name="vaccinated"]');
    vaccinatedRadios.forEach(radio => radio.addEventListener('change', validateVaccinated));
}

/**
 * Validate First Name
 */
function validateFirstName() {
    const field = document.getElementById('first-name');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-first-name');
    
    clearError('first-name', errorSpan);
    
    if (value === '') {
        showError('first-name', errorSpan, 'First name is required');
        return false;
    }
    
    if (value.length < 1 || value.length > 30) {
        showError('first-name', errorSpan, 'First name must be 1-30 characters');
        return false;
    }
    
    if (!/^[A-Za-z\'\-\s]+$/.test(value)) {
        showError('first-name', errorSpan, 'Only letters, apostrophes, and dashes allowed');
        return false;
    }
    
    return true;
}

/**
 * Validate Middle Initial
 */
function validateMiddleInitial() {
    const field = document.getElementById('middle-initial');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-middle-initial');
    
    clearError('middle-initial', errorSpan);
    
    // Optional field
    if (value === '') {
        return true;
    }
    
    if (!/^[A-Za-z]$/.test(value)) {
        showError('middle-initial', errorSpan, 'Must be a single letter');
        return false;
    }
    
    return true;
}

/**
 * Validate Last Name
 */
function validateLastName() {
    const field = document.getElementById('last-name');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-last-name');
    
    clearError('last-name', errorSpan);
    
    if (value === '') {
        showError('last-name', errorSpan, 'Last name is required');
        return false;
    }
    
    if (value.length < 1 || value.length > 30) {
        showError('last-name', errorSpan, 'Last name must be 1-30 characters');
        return false;
    }
    
    if (!/^[A-Za-z\'\-\s]+$/.test(value)) {
        showError('last-name', errorSpan, 'Only letters, apostrophes, and dashes allowed');
        return false;
    }
    
    return true;
}

/**
 * Validate Date of Birth
 */
function validateDateOfBirth() {
    const field = document.getElementById('date-of-birth');
    const value = field.value;
    const errorSpan = document.getElementById('error-date-of-birth');
    
    clearError('date-of-birth', errorSpan);
    
    if (value === '') {
        showError('date-of-birth', errorSpan, 'Date of birth is required');
        return false;
    }
    
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    
    // Check if date is in the future
    if (birthDate > today) {
        showError('date-of-birth', errorSpan, 'Date cannot be in the future');
        return false;
    }
    
    // Check if more than 120 years ago
    if (age > 120 || (age === 120 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))) {
        showError('date-of-birth', errorSpan, 'Date cannot be more than 120 years ago');
        return false;
    }
    
    return true;
}

/**
 * Format and Validate SSN (auto-format as user types)
 */
function formatAndValidateSSN() {
    const field = document.getElementById('social-security');
    let value = field.value.replace(/\D/g, ''); // Remove all non-digits
    
    // Auto-format with dashes as user types
    if (value.length > 3 && value.length <= 5) {
        value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 5) {
        value = value.slice(0, 3) + '-' + value.slice(3, 5) + '-' + value.slice(5, 9);
    }
    
    field.value = value;
    validateSSN();
}

/**
 * Validate SSN
 */
function validateSSN() {
    const field = document.getElementById('social-security');
    const value = field.value;
    const errorSpan = document.getElementById('error-social-security');
    
    clearError('social-security', errorSpan);
    
    if (value === '') {
        showError('social-security', errorSpan, 'Social Security is required');
        return false;
    }
    
    // Remove dashes for digit count
    const digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length !== 9) {
        showError('social-security', errorSpan, 'Must be 9 digits (XXX-XX-XXXX)');
        return false;
    }
    
    if (!/^\d{3}-\d{2}-\d{4}$/.test(value)) {
        showError('social-security', errorSpan, 'Format must be XXX-XX-XXXX');
        return false;
    }
    
    return true;
}

/**
 * Validate Email Address
 */
function validateEmail() {
    const field = document.getElementById('email-address');
    let value = field.value.trim();
    const errorSpan = document.getElementById('error-email-address');
    
    clearError('email-address', errorSpan);
    
    // Force lowercase
    value = value.toLowerCase();
    field.value = value;
    
    if (value === '') {
        showError('email-address', errorSpan, 'Email address is required');
        return false;
    }
    
    // Email validation pattern
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    
    if (!emailPattern.test(value)) {
        showError('email-address', errorSpan, 'Invalid email format (name@domain.tld)');
        return false;
    }
    
    return true;
}

/**
 * Validate Phone Number
 */
function validatePhone() {
    const field = document.getElementById('phone-number');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-phone-number');
    
    clearError('phone-number', errorSpan);
    
    if (value === '') {
        showError('phone-number', errorSpan, 'Phone number is required');
        return false;
    }
    
    if (!/^\d{3}-\d{3}-\d{4}$/.test(value)) {
        showError('phone-number', errorSpan, 'Format must be XXX-XXX-XXXX');
        return false;
    }
    
    return true;
}

/**
 * Validate Address Line 1
 */
function validateAddressLine1() {
    const field = document.getElementById('address-line-1');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-address-line-1');
    
    clearError('address-line-1', errorSpan);
    
    if (value === '') {
        showError('address-line-1', errorSpan, 'Address is required');
        return false;
    }
    
    if (value.length < 2 || value.length > 30) {
        showError('address-line-1', errorSpan, 'Address must be 2-30 characters');
        return false;
    }
    
    return true;
}

/**
 * Validate Address Line 2
 */
function validateAddressLine2() {
    const field = document.getElementById('address-line-2');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-address-line-2');
    
    clearError('address-line-2', errorSpan);
    
    // Optional field, but if entered must be valid
    if (value !== '' && (value.length < 2 || value.length > 30)) {
        showError('address-line-2', errorSpan, 'If entered, must be 2-30 characters');
        return false;
    }
    
    return true;
}

/**
 * Validate City
 */
function validateCity() {
    const field = document.getElementById('city');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-city');
    
    clearError('city', errorSpan);
    
    if (value === '') {
        showError('city', errorSpan, 'City is required');
        return false;
    }
    
    if (value.length < 2 || value.length > 30) {
        showError('city', errorSpan, 'City must be 2-30 characters');
        return false;
    }
    
    return true;
}

/**
 * Validate State
 */
function validateState() {
    const field = document.getElementById('state');
    const value = field.value;
    const errorSpan = document.getElementById('error-state');
    
    clearError('state', errorSpan);
    
    if (value === '' || value === null) {
        showError('state', errorSpan, 'Please select a state');
        return false;
    }
    
    return true;
}

/**
 * Validate Zip Code
 */
function validateZipCode() {
    const field = document.getElementById('zip-code');
    const value = field.value.trim();
    const errorSpan = document.getElementById('error-zip-code');
    
    clearError('zip-code', errorSpan);
    
    if (value === '') {
        showError('zip-code', errorSpan, 'Zip code is required');
        return false;
    }
    
    if (!/^\d{5}$/.test(value)) {
        showError('zip-code', errorSpan, 'Must be exactly 5 digits');
        return false;
    }
    
    return true;
}

/**
 * Validate User ID
 */
function validateUserId() {
    const field = document.getElementById('user-id');
    let value = field.value.trim();
    const errorSpan = document.getElementById('error-user-id');
    
    clearError('user-id', errorSpan);
    
    if (value === '') {
        showError('user-id', errorSpan, 'User ID is required');
        return false;
    }
    
    // 1. Cannot start with a number
    if (/^\d/.test(value)) {
        showError('user-id', errorSpan, 'Cannot start with a number');
        return false;
    }
    
    // 2. Must be at least 5 characters but no more than 20
    if (value.length < 5 || value.length > 20) {
        showError('user-id', errorSpan, 'Must be 5-20 characters');
        return false;
    }
    
    // 3. Cannot have spaces or special characters (only letters, numbers, dash, underscore)
    if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(value)) {
        showError('user-id', errorSpan, 'Only letters, numbers, dash, and underscore allowed');
        return false;
    }
    
    return true;
}

/**
 * Validate Password
 */
function validatePassword() {
    const passwordField = document.getElementById('password');
    const userIdField = document.getElementById('user-id');
    const value = passwordField.value;
    const errorSpan = document.getElementById('error-password');
    
    clearError('password', errorSpan);
    
    if (value === '') {
        showError('password', errorSpan, 'Password is required');
        return false;
    }
    
    // 5. Must be at least 8 characters long
    if (value.length < 8) {
        showError('password', errorSpan, 'Must be at least 8 characters');
        return false;
    }
    
    // 6. Must contain at least 1 uppercase, 1 lowercase, and 1 digit
    if (!/[A-Z]/.test(value)) {
        showError('password', errorSpan, 'Must contain at least one uppercase letter');
        return false;
    }
    
    if (!/[a-z]/.test(value)) {
        showError('password', errorSpan, 'Must contain at least one lowercase letter');
        return false;
    }
    
    if (!/\d/.test(value)) {
        showError('password', errorSpan, 'Must contain at least one digit');
        return false;
    }
    
    // 7. Password CANNOT equal User ID
    if (userIdField.value !== '' && value.toLowerCase() === userIdField.value.toLowerCase()) {
        showError('password', errorSpan, 'Password cannot be the same as User ID');
        return false;
    }
    
    // Also validate password match if re-enter is filled
    const reenterField = document.getElementById('re-enter-password');
    if (reenterField.value !== '') {
        validatePasswordMatch();
    }
    
    return true;
}

/**
 * Validate Password Match
 */
function validatePasswordMatch() {
    const passwordField = document.getElementById('password');
    const reenterField = document.getElementById('re-enter-password');
    const errorSpan = document.getElementById('error-re-enter-password');
    
    clearError('re-enter-password', errorSpan);
    
    if (reenterField.value === '') {
        showError('re-enter-password', errorSpan, 'Please re-enter your password');
        return false;
    }
    
    // 8. Passwords must match
    if (passwordField.value !== reenterField.value) {
        showError('re-enter-password', errorSpan, 'Passwords do not match');
        return false;
    }
    
    return true;
}

/**
 * Validate Gender Radio Buttons
 */
function validateGender() {
    const selected = document.querySelector('input[name="gender"]:checked');
    const errorSpan = document.getElementById('error-gender');
    
    clearError('gender', errorSpan);
    
    if (!selected) {
        showError('gender', errorSpan, 'Please select a gender');
        return false;
    }
    
    return true;
}

/**
 * Validate Currently Sick Radio Buttons
 */
function validateSick() {
    const selected = document.querySelector('input[name="sick"]:checked');
    const errorSpan = document.getElementById('error-sick');
    
    clearError('sick', errorSpan);
    
    if (!selected) {
        showError('sick', errorSpan, 'Please select an option');
        return false;
    }
    
    return true;
}

/**
 * Validate Insurance Radio Buttons
 */
function validateInsurance() {
    const selected = document.querySelector('input[name="insurance"]:checked');
    const errorSpan = document.getElementById('error-insurance');
    
    clearError('insurance', errorSpan);
    
    if (!selected) {
        showError('insurance', errorSpan, 'Please select an option');
        return false;
    }
    
    return true;
}

/**
 * Validate Vaccinated Radio Buttons
 */
function validateVaccinated() {
    const selected = document.querySelector('input[name="vaccinated"]:checked');
    const errorSpan = document.getElementById('error-vaccinated');
    
    clearError('vaccinated', errorSpan);
    
    if (!selected) {
        showError('vaccinated', errorSpan, 'Please select an option');
        return false;
    }
    
    return true;
}

/**
 * Show error message
 */
function showError(fieldId, errorSpan, message) {
    fieldErrors[fieldId] = true;
    if (errorSpan) {
        errorSpan.textContent = message;
        errorSpan.className = 'error-placeholder error-active';
    }
    
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('input-error');
    }
    
    updateErrorCount();
}

/**
 * Clear error message
 */
function clearError(fieldId, errorSpan) {
    fieldErrors[fieldId] = false;
    if (errorSpan) {
        errorSpan.textContent = '';
        errorSpan.className = 'error-placeholder';
    }
    
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.remove('input-error');
    }
    
    updateErrorCount();
}

/**
 * Update error count
 */
function updateErrorCount() {
    errorCount = 0;
    for (let key in fieldErrors) {
        if (fieldErrors[key]) {
            errorCount++;
        }
    }
}

/**
 * Validate entire form (called when VALIDATE button is clicked)
 */
function validateForm() {
    // Validate all fields
    const validations = [
        validateFirstName(),
        validateMiddleInitial(),
        validateLastName(),
        validateDateOfBirth(),
        validateSSN(),
        validateEmail(),
        validatePhone(),
        validateAddressLine1(),
        validateAddressLine2(),
        validateCity(),
        validateState(),
        validateZipCode(),
        validateUserId(),
        validatePassword(),
        validatePasswordMatch(),
        validateGender(),
        validateSick(),
        validateInsurance(),
        validateVaccinated()
    ];
    
    const allValid = validations.every(v => v === true);
    
    const validationSummary = document.getElementById('validation-summary');
    const validationMessage = document.getElementById('validation-message');
    const submitBtn = document.getElementById('submit-btn');
    
    if (allValid && errorCount === 0) {
        validationSummary.style.display = 'block';
        validationSummary.className = 'validation-summary success';
        validationMessage.textContent = 'âœ“ All fields are valid! You may now submit the form.';
        validationMessage.style.color = '#28a745';
        
        // Show submit button
        submitBtn.style.display = 'inline-block';
        
        // Scroll to submit button
        submitBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        validationSummary.style.display = 'block';
        validationSummary.className = 'validation-summary error';
        validationMessage.textContent = 'âœ— Please correct the errors above before submitting. (' + errorCount + ' error(s) found)';
        validationMessage.style.color = '#dc3545';
        
        // Hide submit button
        submitBtn.style.display = 'none';
        
        // Scroll to first error
        const firstError = document.querySelector('.input-error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
}

/**
 * Submit form (called when SUBMIT button is clicked)
 */
function submitForm() {
    // Final validation check
    validateForm();
    
    if (errorCount === 0) {
        // Redirect to thank you page
        window.location.href = 'thankyou.html';
    } else {
        alert('Please correct all errors before submitting.');
    }
}

/**
 * Handle form reset
 */
function handleReset() {
    // Clear all errors
    fieldErrors = {};
    errorCount = 0;
    
    // Hide validation summary and submit button
    document.getElementById('validation-summary').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    
    // Clear all error messages
    const errorSpans = document.querySelectorAll('.error-placeholder');
    errorSpans.forEach(span => {
        span.textContent = '';
        span.className = 'error-placeholder';
    });
    
    // Remove error classes from inputs
    const inputs = document.querySelectorAll('.input-error');
    inputs.forEach(input => {
        input.classList.remove('input-error');
    });
    
    // Reset salary display
    setupSalarySlider();
}



// Initialize form when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentDate();
    initializeForm();
    setDateRanges();
    setupSalarySlider();
    attachValidationListeners();
    
    // NEW: Load states using Fetch API
    loadStates();
    
    // NEW: Check for returning user
    checkReturningUser();
    
    // NEW: Start live clock
    updateLiveClock();
    setInterval(updateLiveClock, 1000);
    
    // NEW: Start session timer
    startSessionTimer();
    
    // NEW: Reset timer on user activity
    document.addEventListener('input', resetSessionTimer);
    document.addEventListener('click', resetSessionTimer);
    
    // NEW: Auto-save to local storage on input
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            saveToLocalStorage(this.id, this.value);
        });
        input.addEventListener('change', function() {
            if (this.type === 'checkbox' || this.type === 'radio') {
                saveToLocalStorage(this.id, this.checked.toString());
            } else {
                saveToLocalStorage(this.id, this.value);
            }
        });
    });
    
    // NEW: Handle Remember Me checkbox
    const rememberMeCheckbox = document.getElementById('remember-me');
    if (rememberMeCheckbox) {
        rememberMeCheckbox.addEventListener('change', function() {
            if (!this.checked) {
                deleteCookie('userFirstName');
            }
        });
    }
});


