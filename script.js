// ============================================                   
// CONFIGURATION
// ============================================
const CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzs_hVlsEQAu_4qeOaZUTjS_cnH3NR22ecQ8QUu5Zw_z8WpOzjnoMLo8Tm-hgQnohQ_zw/exec',
    GOOGLE_SHEET_URL: 'https://docs.google.com/spreadsheets/d/1tumwvxOoToPYDPdpXLyGYaiT2kbfN6Vw_HBd-8t6IAA/edit?gid=353413478#gid=353413478',
    LOGIN_USERNAME: 'bbc',
    LOGIN_PASSWORD: 'bbc',
    SHEETS: {
        SURVEY_DATA: 'SURVEY_DATA',
        SUMMARY: 'SUMMARY_REPORT'
    }
};

// ============================================
// REGION-DISTRICT MAPPING
// ============================================
const REGION_DISTRICT_MAP = {
    'Western Area': ['Western Area Urban District', 'Western Area Rural District'],
    'Northern Region': ['Bombali District', 'Falaba District', 'Koinadugu District', 'Tonkolili District'],
    'Southern Region': ['Bo District', 'Bonthe District', 'Moyamba District', 'Pujehun District'],
    'Eastern Region': ['Kailahun District', 'Kenema District', 'Kono District'],
    'North-Western Region': ['Kambia District', 'Karene District', 'Port Loko District']
};

// ============================================
// FORM SECTIONS DEFINITION
// ============================================
const FORM_SECTIONS = {
    'Section A: Media Institution Profile': {
        description: 'Basic information about the media institution',
        fields: {
            media_house_name: { label: 'Name of Media House', type: 'text' },
            media_type: { 
                label: 'Type of Media (select one)', 
                type: 'radio',
                options: ['Print', 'Radio', 'Television', 'Online/Digital']
            },
            region: { 
                label: 'Region', 
                type: 'select',
                options: Object.keys(REGION_DISTRICT_MAP)
            },
            district: { 
                label: 'District', 
                type: 'select',
                options: [],
                cascadeFrom: 'region'
            },
            owner_gender: { 
                label: 'Gender identity of the owner', 
                type: 'radio',
                options: ['Male', 'Female', 'Prefer not to say', "Don't know"]
            },
            ownership_type: { 
                label: 'Ownership Type of the media institution', 
                type: 'radio',
                options: ['State', 'Community', 'Private', 'Faith-based']
            },
            year_established: { 
                label: 'How long has your media institution been in operation?', 
                type: 'radio',
                options: ['Less than 1 year', '1-2 years', '2-4 years', "4-6 years", "6-8 years", "8+ years", "I don't know"]
               
            }
        }
    },
    'Section B: Workforce Gender Composition': {
        description: 'Employee numbers and gender composition',
        fields: {
            total_employees: { label: 'Q1. Total number of employees', type: 'number' },
            total_female_employees: { label: 'Q2. Total number of female employees', type: 'number' },
            total_male_employees: { label: 'Q3. Total number of male employees', type: 'number' },
            last_female_hire: { 
                label: 'Q4. When was the last time you hired a female staff member?', 
                type: 'radio',
                options: ['Less than 1 year', '1 year ago', '2 years ago', '3 years ago', '4 years ago', '5+ years ago', "I don't know"]
            }
        }
    },
    'Section C: Representation Across Positions': {
        description: 'Staff distribution across different roles and departments',
        fields: {
            leadership_women: { label: 'Q5. Total number of female staff in Leadership/Managerial positions ', type: 'number' },
            leadership_men: { label: 'Q5. Total number of male staff in Leadership/Managerial positions', type: 'number' },
            non_managerial_women: { label: 'Q6a. Total number of female staff in non-leadership/non-managerial positions', type: 'number' },
            non_managerial_men: { label: 'Q6b. Total number of male staff in non-leadership/non-managerial positions', type: 'number' },
            technical_women: { label: 'Q7a. Of the total number of female staff in your media institution, how many are in the technical Unit (Camera, IT, Graphics, Designing and Layout)', type: 'number' },
            technical_men: { label: 'Q7b. Of the total number of male staff in your media institution, how many are in the technical Unit (Camera, IT, Graphics, Designing and Layout) - ', type: 'number' },
            operations_women: { label: 'Q8a. How many female staff are in the operations/Admin/HR/Finance Unit', type: 'number' },
            operations_men: { label: 'Q8b. How many male staff are in the operations/Admin/HR/Finance Unit', type: 'number' },
            newsroom_women: { label: 'Q9b. How many female staff are in the Newsroom/Field/Reporting Unit', type: 'number' },
            newsroom_men: { label: 'Q9b. How many male staff are in the Newsroom/Field/Reporting Unit', type: 'number' }
        }
    },
    'Section D: Entry and Retention': {
        description: 'Recruitment and retention of women employees',
        fields: {
            women_recruited_12months: { 
                label: 'Q10. How many women were recruited in the last 12 months?', 
                type: 'radio',
                options: ['None', '1–2', '3–5', '6–10', 'More than 10', "Don't know"]
            },
            women_retained_3years: { 
                label: 'Q11. How many women have remained for more than 3 years?', 
                type: 'radio',
                options: ['None', '1–2', '3–5', '6–10', 'More than 10', "Don't know"]
            },
            women_face_barriers: { 
                label: 'Q12. Do women face barriers to recruitment in your institution?', 
                type: 'radio',
                options: ['Yes', 'No']
            },
            entry_barriers: { 
                label: 'Q13. What barriers do women face at entry level? (Select all that apply)', 
                type: 'checkbox',
                options: [
                    'Women hardly apply',
                    'Lack of mentorship/training opportunities',
                    'Limited job openings',
                    'Social expectations',
                    'Family pressure',
                    'Lower starting pay compared to men',
                    'Other'
                ],
                required: false,
                conditional: 'women_face_barriers',
                conditionalValue: 'Yes'
            },
            entry_barriers_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            equal_retention: { 
                label: 'Q14. Women journalists in your institution have equal chances of retention compared to men', 
                type: 'radio',
                options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree']
            }
        }
    },
    'Section E: Attrition of Women': {
        description: 'Departure patterns and reasons for women leaving',
        fields: {
            women_left_12months: { 
                label: 'Q15. In the last 12 months, how many women employees left your institution?', 
                type: 'radio',
                options: ['None', '1–2', '3–5', '6–10', 'More than 10', "Don't know"]
            },
            departure_reasons: { 
                label: 'Q16. What were the main reasons for departure? (Select all that apply)', 
                type: 'checkbox',
                options: [
                    'Harassment',
                    'Discrimination',
                    'Lack of career growth opportunities',
                    'Low pay or poor benefits',
                    'Family responsibilities (childcare, household duties)',
                    'Unsafe working conditions (field assignments, long hours, lack of insurance/social security)',
                    'Better opportunities elsewhere',
                    'Organizational restructuring/layoffs',
                    'Other'
                ],
                required: false,
                conditional: 'women_left_12months',
                conditionalValue: 'None',
                conditionalInverse: true
            },
            departure_reasons_other: { label: 'If Other, Please Specify', type: 'text', required: false },
            career_stage_departure: { 
                label: 'Q17. At what stage of their career did they leave?', 
                type: 'radio',
                options: ['Entry-level', 'Mid-level', 'Senior-level', "Don't know"],
                required: false,
                conditional: 'women_left_12months',
                conditionalValue: 'None',
                conditionalInverse: true
            },
            average_stay_duration: { 
                label: 'Q18. Average length of stay before leaving', 
                type: 'radio',
                options: ['Less than 1 year', '1–2 years', '3–5 years', 'More than 5 years', "Don't know"],
                required: false,
                conditional: 'women_left_12months',
                conditionalValue: 'None',
                conditionalInverse: true
            },
            higher_attrition_rate: { 
                label: 'Q19. Women leave at a higher rate than men in your institution', 
                type: 'radio',
                options: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
                required: false
            },
            attrition_impact: { 
                label: 'Q20. What impact does attrition of women have on your institution? (Select all that apply)', 
                type: 'checkbox',
                options: [
                    'Loss of skilled staff',
                    'Reduced diversity in reporting',
                    'Increased recruitment costs',
                    'Negative impact on organizational reputation',
                    'No significant impact',
                    'Other'
                ],
                required: false
            },
            attrition_impact_other: { label: 'If Other, Please Specify', type: 'text', required: false }
        }
    },
    'Respondent Information & Signature': {
        description: 'Information about the person completing this survey',
        fields: {
            respondent_name: { label: 'Name of Respondent', type: 'text' },
            respondent_position: { label: 'Position/Title', type: 'text' },
            respondent_contact: { label: 'Contact Number', type: 'tel' },
            respondent_email: { label: 'Email Address', type: 'email', required: false },
            survey_date: { label: 'Date of Survey', type: 'date' },
            respondent_signature: { label: 'Signature', type: 'signature' },
            gps_location: { label: 'GPS Location (Auto-captured)', type: 'gps', required: false }
        }
    }
};

// ============================================
// STATE
// ============================================
const state = {
    pendingSubmissions: [],
    drafts: [],
    isOnline: navigator.onLine,
    currentSection: 1,
    totalSections: 0,
    signaturePads: {},
    gpsLocation: null,
    formStatus: 'draft',
    currentDraftId: null,
    currentDraftName: null,
    gpsAttempted: false
};

// ============================================
// INITIALIZATION
// ============================================
function init() {
    // Load pending submissions
    const savedPending = localStorage.getItem('pendingSubmissions');
    if (savedPending) {
        try {
            state.pendingSubmissions = JSON.parse(savedPending);
        } catch (e) {
            state.pendingSubmissions = [];
        }
    }

    // Load drafts
    const savedDrafts = localStorage.getItem('formDrafts');
    if (savedDrafts) {
        try {
            state.drafts = JSON.parse(savedDrafts);
        } catch (e) {
            state.drafts = [];
        }
    }

    // Initialize main content directly
    updateOnlineStatus();
    updatePendingCount();
    updateDraftCount();
    
    setupEventListeners();
    generateFormSections();
    
    // Start GPS capture automatically
    setTimeout(() => {
        captureGPSAutomatically();
    }, 1000);
    
    // Sync pending submissions if online
    if (state.isOnline && state.pendingSubmissions.length > 0) {
        syncPendingSubmissions();
    }
}

function generateFormSections() {
    const container = document.getElementById('dynamicSections');
    let html = '';
    let sectionNum = 1;
    
    const sectionKeys = Object.keys(FORM_SECTIONS);
    state.totalSections = sectionKeys.length;
    
    sectionKeys.forEach((sectionTitle, index) => {
        const section = FORM_SECTIONS[sectionTitle];
        const isLastSection = index === sectionKeys.length - 1;
        
        html += `
            <div class="form-section ${sectionNum === 1 ? 'active' : ''}" data-section="${sectionNum}">
                <div class="section-header">
                    <h2 class="section-title">${sectionTitle.toUpperCase()}</h2>
                    <p class="section-description">${section.description}</p>
                </div>
        `;
        
        // Generate fields
        const fields = Object.entries(section.fields);
        fields.forEach(([fieldName, fieldConfig]) => {
            const label = fieldConfig.label;
            const type = fieldConfig.type || 'text';
            const required = fieldConfig.required !== false;
            const conditional = fieldConfig.conditional;
            const conditionalValue = fieldConfig.conditionalValue;
            const conditionalInverse = fieldConfig.conditionalInverse || false;
            const cascadeFrom = fieldConfig.cascadeFrom;
            
            // Add conditional styling if field is conditional
            const conditionalClass = conditional ? 'conditional-field' : '';
            const conditionalData = conditional ? `data-conditional="${conditional}" data-conditional-value="${conditionalValue}" data-conditional-inverse="${conditionalInverse}"` : '';
            
            html += `<div class="form-group ${conditionalClass}" ${conditionalData} id="group_${fieldName}">`;
            html += `<label class="form-label">${label.toUpperCase()} ${required ? '<span class="required">*</span>' : ''}</label>`;
            
            if (type === 'signature') {
                // Signature pad
                html += `
                    <div class="signature-container">
                        <canvas class="signature-canvas" id="${fieldName}_canvas" data-field="${fieldName}"></canvas>
                        <div class="signature-controls">
                            <button type="button" class="signature-btn" onclick="clearSignature('${fieldName}')">CLEAR</button>
                        </div>
                    </div>
                    <input type="hidden" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''}>
                `;
            } else if (type === 'gps') {
                // GPS Location (auto-captured)
                html += `
                    <div class="gps-container">
                        <div class="gps-status">
                            <div class="gps-icon" id="gps_icon"></div>
                            <div>
                                <div class="gps-info" id="gps_status">Automatically capturing GPS location...</div>
                                <div class="gps-coords" id="gps_coords"></div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="gps_latitude" id="gps_latitude">
                    <input type="hidden" name="gps_longitude" id="gps_longitude">
                    <input type="hidden" name="gps_accuracy" id="gps_accuracy">
                    <input type="hidden" name="gps_timestamp" id="gps_timestamp">
                `;
            } else if (type === 'radio') {
                html += '<div class="radio-group">';
                fieldConfig.options.forEach((option, idx) => {
                    html += `
                        <div class="radio-item">
                            <input type="radio" name="${fieldName}" id="${fieldName}_${idx}" value="${option}" ${required ? 'required' : ''} data-field-name="${fieldName}">
                            <label for="${fieldName}_${idx}">${option}</label>
                        </div>
                    `;
                });
                html += '</div>';
                html += `<div class="field-error" id="error_${fieldName}">Please select an option</div>`;
            } else if (type === 'checkbox') {
                html += '<div class="checkbox-group">';
                fieldConfig.options.forEach((option, idx) => {
                    html += `
                        <div class="checkbox-item">
                            <input type="checkbox" name="${fieldName}" id="${fieldName}_${idx}" value="${option}">
                            <label for="${fieldName}_${idx}">${option}</label>
                        </div>
                    `;
                });
                html += '</div>';
            } else if (type === 'select' && fieldConfig.options) {
                const isDisabled = cascadeFrom ? 'disabled' : '';
                html += `<select class="form-select" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} ${isDisabled} data-cascade-from="${cascadeFrom || ''}" data-field-name="${fieldName}">`;
                html += '<option value="">Select...</option>';
                fieldConfig.options.forEach(option => {
                    html += `<option value="${option}">${option}</option>`;
                });
                html += '</select>';
                html += `<div class="field-error" id="error_${fieldName}">Please select an option</div>`;
            } else if (type === 'date') {
                html += `<input type="date" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'number') {
                const minAttr = fieldConfig.min !== undefined ? `min="${fieldConfig.min}"` : 'min="0"';
                const maxAttr = fieldConfig.max !== undefined ? `max="${fieldConfig.max}"` : '';
                html += `<input type="number" class="form-input" name="${fieldName}" id="${fieldName}" ${minAttr} ${maxAttr} step="1" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'textarea') {
                html += `<textarea class="form-textarea" name="${fieldName}" id="${fieldName}" rows="4" ${required ? 'required' : ''} data-field-name="${fieldName}"></textarea>`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'tel') {
                html += `<input type="tel" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            } else if (type === 'email') {
                html += `<input type="email" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">Please enter a valid email</div>`;
            } else {
                html += `<input type="text" class="form-input" name="${fieldName}" id="${fieldName}" ${required ? 'required' : ''} data-field-name="${fieldName}">`;
                html += `<div class="field-error" id="error_${fieldName}">This field is required</div>`;
            }
            
            html += '</div>';
        });
        
        // Navigation buttons
        html += '<div class="navigation-buttons">';
        
        if (sectionNum > 1) {
            html += '<button type="button" class="btn-nav btn-back" onclick="previousSection()">← BACK</button>';
        }
        
        // Always show Save as Draft button
        html += '<button type="button" class="btn-nav btn-draft" onclick="showDraftNameModal()">💾 SAVE DRAFT</button>';
        
        if (isLastSection) {
            // Last section: Show Finalize and Submit buttons
            html += '<button type="button" class="btn-nav btn-finalize" id="finalizeBtn" onclick="finalizeForm()">✓ FINALIZE</button>';
            html += '<button type="submit" class="btn-nav btn-submit" id="submitBtn" disabled>📤 SUBMIT</button>';
        } else {
            html += '<button type="button" class="btn-nav btn-next" onclick="nextSection()">NEXT →</button>';
        }
        
        html += '</div></div>';
        
        sectionNum++;
    });
    
    container.innerHTML = html;
    updateProgress();
    
    // Initialize signature pads and other features after a short delay
    setTimeout(() => {
        initializeSignaturePads();
        setupConditionalFields();
        setupCascadingDropdowns();
        setupRealTimeValidation();
    }, 100);
}

function setupConditionalFields() {
    // Find all conditional fields
    const conditionalFields = document.querySelectorAll('.conditional-field');
    
    conditionalFields.forEach(field => {
        const parentFieldName = field.getAttribute('data-conditional');
        const expectedValue = field.getAttribute('data-conditional-value');
        const isInverse = field.getAttribute('data-conditional-inverse') === 'true';
        
        // Find parent radio buttons
        const parentRadios = document.querySelectorAll(`input[name="${parentFieldName}"]`);
        
        parentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                let shouldShow = false;
                
                if (isInverse) {
                    // Show when value is NOT the expected value (skip logic for "None")
                    shouldShow = this.value !== expectedValue;
                } else {
                    // Show when value matches expected value
                    shouldShow = this.value === expectedValue;
                }
                
                if (shouldShow) {
                    field.classList.add('show');
                } else {
                    field.classList.remove('show');
                    // Clear any selections in the conditional field
                    const checkboxes = field.querySelectorAll('input[type="checkbox"]');
                    checkboxes.forEach(cb => cb.checked = false);
                    const radios = field.querySelectorAll('input[type="radio"]');
                    radios.forEach(r => r.checked = false);
                    const textInputs = field.querySelectorAll('input[type="text"], textarea');
                    textInputs.forEach(input => input.value = '');
                }
            });
        });
        
        // Check initial state
        const checkedRadio = document.querySelector(`input[name="${parentFieldName}"]:checked`);
        if (checkedRadio) {
            let shouldShow = false;
            if (isInverse) {
                shouldShow = checkedRadio.value !== expectedValue;
            } else {
                shouldShow = checkedRadio.value === expectedValue;
            }
            if (shouldShow) {
                field.classList.add('show');
            }
        }
    });
}

function setupCascadingDropdowns() {
    // Setup Region -> District cascade
    const regionSelect = document.getElementById('region');
    const districtSelect = document.getElementById('district');
    
    if (regionSelect && districtSelect) {
        regionSelect.addEventListener('change', function() {
            const selectedRegion = this.value;
            
            // Clear district selection
            districtSelect.innerHTML = '<option value="">Select...</option>';
            
            if (selectedRegion && REGION_DISTRICT_MAP[selectedRegion]) {
                // Enable district dropdown
                districtSelect.disabled = false;
                
                // Populate districts for selected region
                REGION_DISTRICT_MAP[selectedRegion].forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                // Disable district dropdown if no region selected
                districtSelect.disabled = true;
            }
            
            // Clear any error on district
            const districtError = document.getElementById('error_district');
            if (districtError) {
                districtError.classList.remove('show');
            }
            districtSelect.classList.remove('error');
        });
    }
}

function setupRealTimeValidation() {
    // Add input listener for number inputs to clear errors when typing
    const numberInputs = document.querySelectorAll('input[type="number"][required]');
    
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Clear error styling when user starts typing
            this.classList.remove('error');
            const errorDiv = document.getElementById(`error_${this.id}`);
            if (errorDiv) {
                errorDiv.classList.remove('show');
            }
        });
    });
    
    // Add validation for all required fields on blur
    const allInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.type !== 'radio' && this.type !== 'number') {
                validateField(this);
            }
        });
        
        input.addEventListener('input', function() {
            if (this.type !== 'radio') {
                this.classList.remove('error');
                const fieldName = this.getAttribute('data-field-name') || this.id;
                const errorDiv = document.getElementById(`error_${fieldName}`);
                if (errorDiv) {
                    errorDiv.classList.remove('show');
                }
            }
        });
    });
}

function validateField(field) {
    const fieldName = field.getAttribute('data-field-name') || field.id;
    const errorDiv = document.getElementById(`error_${fieldName}`);
    
    if (!field.value || field.value.trim() === '') {
        field.classList.add('error');
        if (errorDiv) {
            errorDiv.classList.add('show');
        }
        return false;
    } else {
        field.classList.remove('error');
        if (errorDiv) {
            errorDiv.classList.remove('show');
        }
        return true;
    }
}

function setupEventListeners() {
    document.getElementById('viewDataBtn').addEventListener('click', handleViewData);
    document.getElementById('viewAnalysisBtn').addEventListener('click', openAnalysisModal);
    document.getElementById('viewDraftsBtn').addEventListener('click', openDraftsModal);
    document.getElementById('dataForm').addEventListener('submit', handleFormSubmit);
    window.addEventListener('online', handleOnlineEvent);
    window.addEventListener('offline', handleOfflineEvent);
    
    // Add enter key listener for draft name input
    document.getElementById('draftNameInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            confirmSaveDraft();
        }
    });
}

function nextSection() {
    const currentSectionEl = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
    let isValid = true;
    let firstInvalidField = null;
    
    // Validate all inputs in current section
    const inputs = currentSectionEl.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        // Skip validation for conditional fields that are hidden
        const parentGroup = input.closest('.conditional-field');
        if (parentGroup && !parentGroup.classList.contains('show')) {
            return; // Skip hidden conditional fields
        }
        
        if (input.type === 'radio') {
            const radioGroup = currentSectionEl.querySelectorAll(`input[name="${input.name}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                isValid = false;
                const fieldName = input.getAttribute('data-field-name') || input.name;
                const errorDiv = document.getElementById(`error_${fieldName}`);
                if (errorDiv) {
                    errorDiv.classList.add('show');
                }
                input.closest('.radio-group').style.borderLeft = '4px solid #dc3545';
                setTimeout(() => {
                    if (input.closest('.radio-group')) {
                        input.closest('.radio-group').style.borderLeft = '';
                    }
                }, 3000);
                
                if (!firstInvalidField) {
                    firstInvalidField = input;
                }
            }
        } else if (!input.value || input.value.trim() === '') {
            isValid = false;
            input.classList.add('error');
            const fieldName = input.getAttribute('data-field-name') || input.id;
            const errorDiv = document.getElementById(`error_${fieldName}`);
            if (errorDiv) {
                errorDiv.classList.add('show');
            }
            
            if (!firstInvalidField) {
                firstInvalidField = input;
            }
            
            setTimeout(() => {
                input.classList.remove('error');
            }, 3000);
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
        
        // Scroll to first invalid field
        if (firstInvalidField) {
            firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                firstInvalidField.focus();
            }, 500);
        }
        return;
    }
    
    if (state.currentSection < state.totalSections) {
        currentSectionEl.classList.remove('active');
        state.currentSection++;
        const nextSection = document.querySelector(`.form-section[data-section="${state.currentSection}"]`);
        if (nextSection) {
            nextSection.classList.add('active');
            updateProgress();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

function previousSection() {
    if (state.currentSection > 1) {
        document.querySelector(`.form-section[data-section="${state.currentSection}"]`).classList.remove('active');
        state.currentSection--;
        document.querySelector(`.form-section[data-section="${state.currentSection}"]`).classList.add('active');
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = (state.currentSection / state.totalSections) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    let statusBadge = '';
    if (state.formStatus === 'draft') {
        statusBadge = '<span class="form-status-badge draft">DRAFT</span>';
    } else if (state.formStatus === 'finalized') {
        statusBadge = '<span class="form-status-badge finalized">FINALIZED</span>';
    }
    
    document.getElementById('progressText').innerHTML = `SECTION ${state.currentSection} OF ${state.totalSections} ${statusBadge}`;
}

function handleViewData() {
    // Check if logged in
    if (!checkAdminLogin()) {
        return;
    }
    
    if (CONFIG.GOOGLE_SHEET_URL) {
        window.open(CONFIG.GOOGLE_SHEET_URL, '_blank');
    } else {
        showNotification('Please configure Google Sheet URL in the script', 'error');
    }
}

function checkAdminLogin() {
    const username = prompt('Enter admin username:');
    const password = prompt('Enter admin password:');
    
    if (username === CONFIG.LOGIN_USERNAME && password === CONFIG.LOGIN_PASSWORD) {
        return true;
    } else {
        showNotification('Invalid credentials. Access denied.', 'error');
        return false;
    }
}

function handleOnlineEvent() {
    state.isOnline = true;
    updateOnlineStatus();
    showNotification('Back online - Syncing data...', 'info');
    syncPendingSubmissions();
}

function handleOfflineEvent() {
    state.isOnline = false;
    updateOnlineStatus();
    showNotification('You are offline - Data will be saved locally', 'info');
}

function updateOnlineStatus() {
    const indicator = document.getElementById('statusIndicator');
    const text = document.getElementById('statusText');
    
    if (state.isOnline) {
        indicator.className = 'status-indicator online';
        text.textContent = 'ONLINE';
    } else {
        indicator.className = 'status-indicator offline';
        text.textContent = 'OFFLINE';
    }
}

function updatePendingCount() {
    document.getElementById('pendingCount').textContent = state.pendingSubmissions.length;
}

function updateDraftCount() {
    document.getElementById('draftCount').textContent = state.drafts.length;
}

// ============================================
// GPS FUNCTIONS - AUTO CAPTURE
// ============================================
function captureGPSAutomatically() {
    // Only attempt once
    if (state.gpsAttempted) return;
    state.gpsAttempted = true;
    
    const statusIcon = document.getElementById('gps_icon');
    const statusText = document.getElementById('gps_status');
    const coordsText = document.getElementById('gps_coords');
    
    if (!navigator.geolocation) {
        if (statusIcon) statusIcon.classList.add('error');
        if (statusText) statusText.textContent = 'GPS not supported by your browser';
        return;
    }
    
    // Show loading state
    if (statusIcon) {
        statusIcon.classList.add('loading');
    }
    if (statusText) statusText.textContent = 'Capturing GPS location automatically...';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            // Success
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;
            const timestamp = new Date(position.timestamp).toISOString();
            
            // Store in state
            state.gpsLocation = {
                latitude,
                longitude,
                accuracy,
                timestamp
            };
            
            // Update hidden inputs
            const latInput = document.getElementById('gps_latitude');
            const lonInput = document.getElementById('gps_longitude');
            const accInput = document.getElementById('gps_accuracy');
            const timeInput = document.getElementById('gps_timestamp');
            
            if (latInput) latInput.value = latitude;
            if (lonInput) lonInput.value = longitude;
            if (accInput) accInput.value = accuracy;
            if (timeInput) timeInput.value = timestamp;
            
            // Update UI
            if (statusIcon) {
                statusIcon.classList.remove('loading', 'error');
                statusIcon.classList.add('success');
            }
            if (statusText) statusText.textContent = 'GPS location captured successfully!';
            if (coordsText) coordsText.textContent = `Lat: ${latitude.toFixed(6)}, Lon: ${longitude.toFixed(6)} (±${Math.round(accuracy)}m)`;
            
            console.log('GPS captured:', state.gpsLocation);
        },
        (error) => {
            // Error
            if (statusIcon) {
                statusIcon.classList.remove('loading', 'success');
                statusIcon.classList.add('error');
            }
            
            let errorMessage = 'Failed to capture GPS location (optional)';
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'GPS permission denied (optional)';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'GPS position unavailable (optional)';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'GPS request timed out (optional)';
                    break;
            }
            
            if (statusText) statusText.textContent = errorMessage;
            console.log('GPS error:', errorMessage);
        },
        {
            enableHighAccuracy: true,
            timeout: 120000, // 2 minutes
            maximumAge: 0
        }
    );
}

// ============================================
// DRAFT MANAGEMENT
// ============================================
function showDraftNameModal() {
    const modal = document.getElementById('draftNameModal');
    const input = document.getElementById('draftNameInput');
    
    // Set default name if editing existing draft
    if (state.currentDraftName) {
        input.value = state.currentDraftName;
    } else {
        // Generate default name based on form data
        const mediaHouse = document.querySelector('[name="media_house_name"]')?.value || '';
        const surveyDate = document.querySelector('[name="survey_date"]')?.value || '';
        const defaultName = mediaHouse || surveyDate || 'Unnamed Draft';
        input.value = defaultName;
    }
    
    modal.classList.add('show');
    input.focus();
    input.select();
}

function cancelDraftName() {
    const modal = document.getElementById('draftNameModal');
    modal.classList.remove('show');
}

function confirmSaveDraft() {
    const draftName = document.getElementById('draftNameInput').value.trim();
    
    if (!draftName) {
        showNotification('Please enter a name for the draft', 'warning');
        return;
    }
    
    // Close modal
    cancelDraftName();
    
    // Save draft with the provided name
    saveAsDraft(draftName);
}

function saveAsDraft(draftName) {
    const formData = new FormData(document.getElementById('dataForm'));
    
    const data = {
        draftId: state.currentDraftId || generateDraftId(),
        draftName: draftName,
        savedAt: new Date().toISOString(),
        savedBy: 'surveyor',
        formStatus: 'draft',
        currentSection: state.currentSection
    };
    
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Handle checkbox groups
    const checkboxGroups = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            if (!checkboxGroups[checkbox.name]) {
                checkboxGroups[checkbox.name] = [];
            }
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });
    
    for (const [key, values] of Object.entries(checkboxGroups)) {
        data[key] = values.join(', ');
    }
    
    // Save signature data
    Object.keys(state.signaturePads).forEach(fieldName => {
        const pad = state.signaturePads[fieldName];
        if (pad && !pad.isEmpty()) {
            data[fieldName] = pad.toDataURL();
        }
    });
    
    // Check if updating existing draft
    const existingIndex = state.drafts.findIndex(d => d.draftId === data.draftId);
    if (existingIndex !== -1) {
        state.drafts[existingIndex] = data;
    } else {
        state.drafts.push(data);
    }
    
    localStorage.setItem('formDrafts', JSON.stringify(state.drafts));
    state.currentDraftId = data.draftId;
    state.currentDraftName = draftName;
    document.getElementById('draft_id').value = data.draftId;
    
    updateDraftCount();
    showNotification(`Draft "${draftName}" saved successfully!`, 'success');
}

function generateDraftId() {
    return 'draft_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function openDraftsModal() {
    const modal = document.getElementById('draftsModal');
    const modalBody = document.getElementById('draftsModalBody');
    
    if (state.drafts.length === 0) {
        modalBody.innerHTML = '<div class="no-drafts">No saved drafts</div>';
    } else {
        let html = '';
        // Sort drafts by savedAt date (newest first)
        const sortedDrafts = [...state.drafts].sort((a, b) => 
            new Date(b.savedAt) - new Date(a.savedAt)
        );
        
        sortedDrafts.forEach((draft, index) => {
            const savedDate = new Date(draft.savedAt).toLocaleString();
            const draftName = draft.draftName || 'Unnamed Draft';
            const mediaHouse = draft.media_house_name || '';
            
            html += `
                <div class="draft-item">
                    <div class="draft-item-header">
                        <div>
                            <div class="draft-item-title">${draftName}</div>
                            ${mediaHouse ? `<div class="draft-item-subtitle">Media House: ${mediaHouse}</div>` : ''}
                        </div>
                        <div class="draft-item-date">Saved: ${savedDate}</div>
                    </div>
                    <div class="draft-item-actions">
                        <button class="draft-action-btn load" onclick="loadDraft('${draft.draftId}')">📂 LOAD</button>
                        <button class="draft-action-btn delete" onclick="deleteDraft('${draft.draftId}')">🗑️ DELETE</button>
                    </div>
                </div>
            `;
        });
        modalBody.innerHTML = html;
    }
    
    modal.classList.add('show');
}

function closeDraftsModal() {
    document.getElementById('draftsModal').classList.remove('show');
}

function loadDraft(draftId) {
    const draft = state.drafts.find(d => d.draftId === draftId);
    if (!draft) {
        showNotification('Draft not found', 'error');
        return;
    }
    
    // Clear form first
    clearForm(false);
    
    // Load draft data
    state.currentDraftId = draftId;
    state.currentDraftName = draft.draftName;
    state.formStatus = draft.formStatus || 'draft';
    document.getElementById('draft_id').value = draftId;
    document.getElementById('form_status').value = state.formStatus;
    
    // Populate form fields
    Object.keys(draft).forEach(key => {
        if (['draftId', 'draftName', 'savedAt', 'savedBy', 'formStatus', 'currentSection'].includes(key)) return;
        
        const field = document.querySelector(`[name="${key}"]`);
        if (field) {
            if (field.type === 'hidden' && key.includes('signature')) {
                // Handle signature fields
                const canvas = document.getElementById(`${key}_canvas`);
                if (canvas && draft[key]) {
                    const pad = state.signaturePads[key];
                    if (pad) {
                        const img = new Image();
                        img.onload = () => {
                            const ctx = canvas.getContext('2d');
                            ctx.drawImage(img, 0, 0);
                        };
                        img.src = draft[key];
                        field.value = draft[key];
                    }
                }
            } else if (field.type === 'radio') {
                const radio = document.querySelector(`input[name="${key}"][value="${draft[key]}"]`);
                if (radio) {
                    radio.checked = true;
                    // Trigger change event for conditional fields
                    radio.dispatchEvent(new Event('change'));
                }
            } else if (field.type === 'checkbox') {
                // Handle checkbox groups
                if (draft[key]) {
                    const values = draft[key].split(', ');
                    values.forEach(val => {
                        const checkbox = document.querySelector(`input[name="${key}"][value="${val}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                }
            } else {
                field.value = draft[key];
                
                // Trigger change event for cascading dropdowns
                if (field.tagName === 'SELECT') {
                    field.dispatchEvent(new Event('change'));
                }
            }
        }
    });
    
    // Go to saved section
    if (draft.currentSection) {
        document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
        state.currentSection = draft.currentSection;
        const targetSection = document.querySelector(`.form-section[data-section="${draft.currentSection}"]`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
    
    updateProgress();
    updateSubmitButton();
    closeDraftsModal();
    showNotification(`Draft "${draft.draftName}" loaded successfully!`, 'success');
}

function deleteDraft(draftId) {
    const draft = state.drafts.find(d => d.draftId === draftId);
    const draftName = draft ? draft.draftName : 'this draft';
    
    if (!confirm(`Are you sure you want to delete "${draftName}"?`)) return;
    
    state.drafts = state.drafts.filter(d => d.draftId !== draftId);
    localStorage.setItem('formDrafts', JSON.stringify(state.drafts));
    
    if (state.currentDraftId === draftId) {
        state.currentDraftId = null;
        state.currentDraftName = null;
        document.getElementById('draft_id').value = '';
    }
    
    updateDraftCount();
    openDraftsModal(); // Refresh modal
    showNotification('Draft deleted', 'info');
}

// ============================================
// FINALIZE & SUBMIT
// ============================================
function finalizeForm() {
    // Validate all required fields across all sections
    let isValid = true;
    let firstInvalidSection = null;
    
    document.querySelectorAll('.form-section').forEach((section, index) => {
        const inputs = section.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            // Skip validation for conditional fields that are hidden
            const parentGroup = input.closest('.conditional-field');
            if (parentGroup && !parentGroup.classList.contains('show')) {
                return; // Skip hidden conditional fields
            }
            
            if (input.type === 'radio') {
                const radioGroup = section.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked && firstInvalidSection === null) {
                    isValid = false;
                    firstInvalidSection = index + 1;
                }
            } else if (!input.value) {
                isValid = false;
                input.classList.add('error');
                if (firstInvalidSection === null) {
                    firstInvalidSection = index + 1;
                }
            }
        });
    });
    
    if (!isValid) {
        showNotification(`Please complete all required fields. Check Section ${firstInvalidSection}`, 'error');
        // Navigate to first invalid section
        document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
        state.currentSection = firstInvalidSection;
        document.querySelector(`.form-section[data-section="${firstInvalidSection}"]`).classList.add('active');
        updateProgress();
        return;
    }
    
    state.formStatus = 'finalized';
    document.getElementById('form_status').value = 'finalized';
    updateProgress();
    updateSubmitButton();
    
    // Auto-save draft with finalized status
    if (state.currentDraftName) {
        saveAsDraft(state.currentDraftName);
    } else {
        showDraftNameModal();
    }
    
    showNotification('Form finalized! You can now submit.', 'success');
}

function navigateToSection(sectionNumber) {
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    state.currentSection = sectionNumber;
    document.querySelector(`.form-section[data-section="${sectionNumber}"]`).classList.add('active');
    updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSubmitButton() {
    const submitBtn = document.getElementById('submitBtn');
    const finalizeBtn = document.getElementById('finalizeBtn');
    
    if (state.formStatus === 'finalized') {
        submitBtn.disabled = false;
        finalizeBtn.disabled = true;
        finalizeBtn.textContent = '✓ FINALIZED';
    } else {
        submitBtn.disabled = true;
        finalizeBtn.disabled = false;
        finalizeBtn.textContent = '✓ FINALIZE';
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (state.formStatus !== 'finalized') {
        showNotification('Please finalize the form before submitting', 'warning');
        return;
    }

    const formData = new FormData(e.target);
    
    const data = {
        timestamp: new Date().toISOString(),
        submittedBy: 'surveyor',
        form_status: 'submitted'
    };
    
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Handle checkbox groups
    const checkboxGroups = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        if (checkbox.checked) {
            if (!checkboxGroups[checkbox.name]) {
                checkboxGroups[checkbox.name] = [];
            }
            checkboxGroups[checkbox.name].push(checkbox.value);
        }
    });
    
    for (const [key, values] of Object.entries(checkboxGroups)) {
        data[key] = values.join(', ');
    }

    if (state.isOnline) {
        await submitToServer(data);
    } else {
        saveOffline(data);
    }
}

async function submitToServer(data) {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'SUBMITTING...';

    try {
        const response = await fetch(CONFIG.SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Remove from drafts if it was a draft
        if (state.currentDraftId) {
            state.drafts = state.drafts.filter(d => d.draftId !== state.currentDraftId);
            localStorage.setItem('formDrafts', JSON.stringify(state.drafts));
            updateDraftCount();
        }

        showNotification('Data submitted successfully!', 'success');
        clearForm(true);
        
    } catch (error) {
        console.error('Submit error:', error);
        showNotification('Failed to submit - Saved offline', 'error');
        saveOffline(data);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '📤 SUBMIT';
    }
}

function saveOffline(data) {
    state.pendingSubmissions.push(data);
    localStorage.setItem('pendingSubmissions', JSON.stringify(state.pendingSubmissions));
    
    // Remove from drafts
    if (state.currentDraftId) {
        state.drafts = state.drafts.filter(d => d.draftId !== state.currentDraftId);
        localStorage.setItem('formDrafts', JSON.stringify(state.drafts));
        updateDraftCount();
    }
    
    updatePendingCount();
    showNotification('Data saved offline - Will sync when online', 'info');
    clearForm(true);
}

async function syncPendingSubmissions() {
    if (state.pendingSubmissions.length === 0) return;

    showNotification('Syncing pending submissions...', 'info');
    const successfulSyncs = [];
    
    for (let i = 0; i < state.pendingSubmissions.length; i++) {
        try {
            await fetch(CONFIG.SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state.pendingSubmissions[i])
            });
            successfulSyncs.push(i);
        } catch (error) {
            console.error('Sync error:', error);
        }
    }

    if (successfulSyncs.length > 0) {
        state.pendingSubmissions = state.pendingSubmissions.filter((_, index) => 
            !successfulSyncs.includes(index)
        );
        localStorage.setItem('pendingSubmissions', JSON.stringify(state.pendingSubmissions));
        updatePendingCount();
        showNotification(`Successfully synced ${successfulSyncs.length} submission(s)`, 'success');
    }
}

function clearForm(resetStatus = true) {
    document.getElementById('dataForm').reset();
    
    // Clear signature pads
    Object.keys(state.signaturePads).forEach(fieldName => {
        clearSignature(fieldName);
    });
    
    // Clear checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset cascading dropdowns
    const districtSelect = document.getElementById('district');
    if (districtSelect) {
        districtSelect.innerHTML = '<option value="">Select...</option>';
        districtSelect.disabled = true;
    }
    
    // Hide all conditional fields
    document.querySelectorAll('.conditional-field').forEach(field => {
        field.classList.remove('show');
    });
    
    // Clear GPS data
    state.gpsLocation = null;
    state.gpsAttempted = false;
    const gpsIcon = document.getElementById('gps_icon');
    const gpsStatus = document.getElementById('gps_status');
    const gpsCoords = document.getElementById('gps_coords');
    
    if (gpsIcon) gpsIcon.className = 'gps-icon';
    if (gpsStatus) gpsStatus.textContent = 'Automatically capturing GPS location...';
    if (gpsCoords) gpsCoords.textContent = '';
    
    // Clear GPS hidden inputs
    const gpsLatInput = document.getElementById('gps_latitude');
    const gpsLonInput = document.getElementById('gps_longitude');
    const gpsAccInput = document.getElementById('gps_accuracy');
    const gpsTimeInput = document.getElementById('gps_timestamp');
    
    if (gpsLatInput) gpsLatInput.value = '';
    if (gpsLonInput) gpsLonInput.value = '';
    if (gpsAccInput) gpsAccInput.value = '';
    if (gpsTimeInput) gpsTimeInput.value = '';
    
    // Reset form status
    if (resetStatus) {
        state.formStatus = 'draft';
        state.currentDraftId = null;
        state.currentDraftName = null;
        document.getElementById('form_status').value = 'draft';
        document.getElementById('draft_id').value = '';
    }
    
    // Reset to section 1
    state.currentSection = 1;
    document.querySelectorAll('.form-section').forEach(section => section.classList.remove('active'));
    const section1 = document.querySelector('.form-section[data-section="1"]');
    if (section1) {
        section1.classList.add('active');
    }
    
    updateProgress();
    updateSubmitButton();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Re-initialize features
    setTimeout(() => {
        initializeSignaturePads();
        captureGPSAutomatically();
    }, 100);
}

function showNotification(message, type) {
    const notification = document.getElementById('notification');
    const text = document.getElementById('notificationText');
    
    notification.className = `notification ${type} show`;
    text.textContent = message;

    // Longer timeout for error messages with more content
    const timeout = type === 'error' && message.length > 100 ? 8000 : 4000;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, timeout);
}

// ============================================
// SIGNATURE PAD FUNCTIONS
// ============================================
function initializeSignaturePads() {
    const canvases = document.querySelectorAll('.signature-canvas');
    
    canvases.forEach(canvas => {
        const fieldName = canvas.getAttribute('data-field');
        
        // Set canvas size
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth - 20;
        canvas.height = 150;
        
        // Initialize SignaturePad
        const signaturePad = new SignaturePad(canvas, {
            backgroundColor: 'rgb(255, 255, 255)',
            penColor: 'rgb(0, 0, 0)',
            minWidth: 1,
            maxWidth: 3
        });
        
        // Store reference
        state.signaturePads[fieldName] = signaturePad;
        
        // Update hidden input when signature changes
        signaturePad.addEventListener('endStroke', () => {
            const hiddenInput = document.getElementById(fieldName);
            if (hiddenInput) {
                hiddenInput.value = signaturePad.toDataURL();
            }
        });
    });
}

function clearSignature(fieldName) {
    const signaturePad = state.signaturePads[fieldName];
    if (signaturePad) {
        signaturePad.clear();
        const hiddenInput = document.getElementById(fieldName);
        if (hiddenInput) {
            hiddenInput.value = '';
        }
    }
}

function resizeSignaturePads() {
    Object.keys(state.signaturePads).forEach(fieldName => {
        const canvas = document.getElementById(`${fieldName}_canvas`);
        if (canvas && canvas.parentElement) {
            const signaturePad = state.signaturePads[fieldName];
            const data = signaturePad.toData();
            
            const container = canvas.parentElement;
            canvas.width = container.offsetWidth - 20;
            canvas.height = 150;
            
            signaturePad.fromData(data);
        }
    });
}

// Resize signature pads on window resize
window.addEventListener('resize', resizeSignaturePads);

// ============================================
// ANALYSIS DASHBOARD FUNCTIONS
// ============================================
async function openAnalysisModal() {
    // Check if logged in
    if (!checkAdminLogin()) {
        return;
    }
    
    const modal = document.getElementById('analysisModal');
    const body = document.getElementById('analysisBody');
    
    modal.classList.add('show');
    body.innerHTML = '<div class="analysis-loading"><p>Loading analysis data...</p></div>';
    
    try {
        // Fetch data from Google Apps Script
        const response = await fetch(CONFIG.SCRIPT_URL + '?action=getAnalysis', {
            method: 'GET'
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            renderAnalysisDashboard(data.data);
        } else {
            throw new Error(data.message || 'Failed to load data');
        }
    } catch (error) {
        console.error('Analysis error:', error);
        body.innerHTML = `
            <div class="analysis-error">
                <p>⚠️ Unable to load analysis data</p>
                <p style="font-size: 12px; margin-top: 10px;">${error.message}</p>
                <p style="font-size: 12px; margin-top: 10px;">Please ensure the Google Apps Script is properly deployed and the data sheet contains survey responses.</p>
            </div>
        `;
    }
}

function closeAnalysisModal() {
    document.getElementById('analysisModal').classList.remove('show');
}

function renderAnalysisDashboard(data) {
    const body = document.getElementById('analysisBody');
    
    // Create comprehensive dashboard HTML
    let html = `
        <!-- KEY STATISTICS -->
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-label">TOTAL SUBMISSIONS</div>
                <div class="stat-value">${data.totalSubmissions}</div>
                <div class="stat-sublabel">Media institutions surveyed</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">TOTAL EMPLOYEES</div>
                <div class="stat-value">${data.totalEmployees.toLocaleString()}</div>
                <div class="stat-sublabel">Across all media houses</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">FEMALE EMPLOYEES</div>
                <div class="stat-value">${data.femalePercentage}%</div>
                <div class="stat-sublabel">${data.totalFemale.toLocaleString()} out of ${data.totalEmployees.toLocaleString()}</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">WOMEN IN LEADERSHIP</div>
                <div class="stat-value">${data.leadershipFemalePercentage}%</div>
                <div class="stat-sublabel">${data.leadershipFemale} out of ${data.totalLeadership} positions</div>
            </div>
        </div>

        <!-- MEDIA TYPE DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">📊 MEDIA TYPE DISTRIBUTION</div>
            <canvas id="mediaTypeChart" class="chart-canvas"></canvas>
        </div>

        <!-- REGIONAL DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">🗺️ REGIONAL DISTRIBUTION</div>
            <canvas id="regionalChart" class="chart-canvas"></canvas>
        </div>

        <!-- DISTRICT DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">📍 DISTRICT DISTRIBUTION</div>
            <canvas id="districtChart" class="chart-canvas"></canvas>
        </div>

        <!-- WORKFORCE GENDER COMPOSITION -->
        <div class="chart-container">
            <div class="chart-title">👥 WORKFORCE GENDER COMPOSITION</div>
            <canvas id="genderChart" class="chart-canvas"></canvas>
        </div>

        <!-- LEADERSHIP REPRESENTATION -->
        <div class="chart-container">
            <div class="chart-title">👔 LEADERSHIP REPRESENTATION BY GENDER</div>
            <canvas id="leadershipChart" class="chart-canvas"></canvas>
        </div>

        <!-- DEPARTMENTAL DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">🏢 GENDER DISTRIBUTION BY DEPARTMENT</div>
            <canvas id="departmentChart" class="chart-canvas"></canvas>
        </div>

        <!-- OWNER GENDER DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">👤 MEDIA HOUSE OWNERSHIP BY GENDER</div>
            <canvas id="ownerGenderChart" class="chart-canvas"></canvas>
        </div>

        <!-- OWNERSHIP ENTITY DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">🏛️ OWNERSHIP ENTITY DISTRIBUTION</div>
            <canvas id="ownershipEntityChart" class="chart-canvas"></canvas>
        </div>

        <!-- OWNERSHIP TYPE DISTRIBUTION -->
        <div class="chart-container">
            <div class="chart-title">📋 OWNERSHIP TYPE DISTRIBUTION</div>
            <canvas id="ownershipTypeChart" class="chart-canvas"></canvas>
        </div>

        <!-- RECRUITMENT TRENDS -->
        <div class="chart-container">
            <div class="chart-title">📈 WOMEN RECRUITED IN LAST 12 MONTHS</div>
            <canvas id="recruitmentChart" class="chart-canvas"></canvas>
        </div>

        <!-- LAST FEMALE HIRE -->
        <div class="chart-container">
            <div class="chart-title">🕐 WHEN LAST HIRED A FEMALE STAFF MEMBER</div>
            <canvas id="lastFemaleHireChart" class="chart-canvas"></canvas>
        </div>

        <!-- RETENTION ANALYSIS -->
        <div class="chart-container">
            <div class="chart-title">⏱️ WOMEN RETAINED FOR MORE THAN 3 YEARS</div>
            <canvas id="retentionChart" class="chart-canvas"></canvas>
        </div>

        <!-- BARRIERS TO ENTRY -->
        <div class="chart-container">
            <div class="chart-title">🚧 BARRIERS WOMEN FACE AT ENTRY LEVEL</div>
            <canvas id="barriersChart" class="chart-canvas"></canvas>
        </div>

        <!-- EQUAL RETENTION PERCEPTION -->
        <div class="chart-container">
            <div class="chart-title">⚖️ PERCEPTION: EQUAL RETENTION CHANCES FOR WOMEN</div>
            <canvas id="equalRetentionChart" class="chart-canvas"></canvas>
        </div>

        <!-- ATTRITION NUMBERS -->
        <div class="chart-container">
            <div class="chart-title">📉 WOMEN WHO LEFT IN LAST 12 MONTHS</div>
            <canvas id="attritionNumbersChart" class="chart-canvas"></canvas>
        </div>

        <!-- ATTRITION REASONS -->
        <div class="chart-container">
            <div class="chart-title">❌ REASONS FOR WOMEN LEAVING</div>
            <canvas id="attritionChart" class="chart-canvas"></canvas>
        </div>

        <!-- CAREER STAGE DEPARTURE -->
        <div class="chart-container">
            <div class="chart-title">🎯 CAREER STAGE AT DEPARTURE</div>
            <canvas id="careerStageChart" class="chart-canvas"></canvas>
        </div>

        <!-- AVERAGE STAY DURATION -->
        <div class="chart-container">
            <div class="chart-title">⌛ AVERAGE STAY DURATION OF WOMEN</div>
            <canvas id="stayDurationChart" class="chart-canvas"></canvas>
        </div>

        <!-- HIGHER ATTRITION RATE -->
        <div class="chart-container">
            <div class="chart-title">📊 PERCEPTION: WOMEN LEAVE AT HIGHER RATE THAN MEN</div>
            <canvas id="higherAttritionChart" class="chart-canvas"></canvas>
        </div>

        <!-- ATTRITION IMPACT -->
        <div class="chart-container">
            <div class="chart-title">💼 IMPACT OF WOMEN'S ATTRITION ON ORGANIZATION</div>
            <canvas id="attritionImpactChart" class="chart-canvas"></canvas>
        </div>

        <!-- GENDER REPRESENTATION OVERVIEW -->
        <div class="chart-container">
            <div class="chart-title">📊 COMPREHENSIVE GENDER REPRESENTATION OVERVIEW</div>
            <canvas id="comprehensiveGenderChart" class="chart-canvas"></canvas>
        </div>
    `;
    
    body.innerHTML = html;
    
    // Render all charts
    setTimeout(() => {
        renderMediaTypeChart(data.mediaTypes);
        renderRegionalChart(data.regions);
        renderDistrictChart(data.districts);
        renderGenderChart(data);
        renderLeadershipChart(data);
        renderDepartmentChart(data);
        renderOwnerGenderChart(data.ownerGender);
        if (data.ownershipEntity) renderOwnershipEntityChart(data.ownershipEntity);
        if (data.ownershipType) renderOwnershipTypeChart(data.ownershipType);
        renderRecruitmentChart(data.womenRecruited);
        if (data.lastFemaleHire) renderLastFemaleHireChart(data.lastFemaleHire);
        renderRetentionChart(data.womenRetained);
        renderBarriersChart(data.barriers);
        renderEqualRetentionChart(data.equalRetention);
        renderAttritionNumbersChart(data.womenLeft);
        renderAttritionChart(data.attritionReasons);
        renderCareerStageChart(data.careerStageDeparture);
        renderStayDurationChart(data.stayDuration);
        renderHigherAttritionChart(data.higherAttrition);
        renderAttritionImpactChart(data.attritionImpact);
        renderComprehensiveGenderChart(data);
    }, 100);
}

function renderMediaTypeChart(mediaTypes) {
    const ctx = document.getElementById('mediaTypeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(mediaTypes),
            datasets: [{
                label: 'Number of Media Houses',
                data: Object.values(mediaTypes),
                backgroundColor: '#004080',
                borderColor: '#004080',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderRegionalChart(regions) {
    const ctx = document.getElementById('regionalChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(regions),
            datasets: [{
                data: Object.values(regions),
                backgroundColor: [
                    '#004080',
                    '#0056b3',
                    '#17a2b8',
                    '#28a745',
                    '#ffc107'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function renderDistrictChart(districts) {
    const ctx = document.getElementById('districtChart');
    if (!ctx) return;

    // Sort districts alphabetically
    const sortedDistricts = Object.keys(districts).sort();
    const sortedData = sortedDistricts.map(d => districts[d]);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedDistricts,
            datasets: [{
                label: 'Number of Media Houses',
                data: sortedData,
                backgroundColor: '#17a2b8',
                borderColor: '#17a2b8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderGenderChart(data) {
    const ctx = document.getElementById('genderChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Female Employees', 'Male Employees'],
            datasets: [{
                data: [data.totalFemale, data.totalMale],
                backgroundColor: ['#dc3545', '#004080'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderLeadershipChart(data) {
    const ctx = document.getElementById('leadershipChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Leadership Positions', 'Non-Leadership Positions'],
            datasets: [{
                label: 'Women',
                data: [data.leadershipFemale, data.nonLeadershipFemale],
                backgroundColor: '#dc3545',
                borderWidth: 1
            }, {
                label: 'Men',
                data: [data.leadershipMale, data.nonLeadershipMale],
                backgroundColor: '#004080',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderDepartmentChart(data) {
    const ctx = document.getElementById('departmentChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Technical Unit', 'Operations/Admin/HR', 'Newsroom/Field'],
            datasets: [{
                label: 'Women',
                data: [data.technicalFemale, data.operationsFemale, data.newsroomFemale],
                backgroundColor: '#dc3545',
                borderWidth: 1
            }, {
                label: 'Men',
                data: [data.technicalMale, data.operationsMale, data.newsroomMale],
                backgroundColor: '#004080',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

function renderBarriersChart(barriers) {
    const ctx = document.getElementById('barriersChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(barriers),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(barriers),
                backgroundColor: '#ffc107',
                borderColor: '#ffc107',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderAttritionChart(reasons) {
    const ctx = document.getElementById('attritionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(reasons),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(reasons),
                backgroundColor: '#dc3545',
                borderColor: '#dc3545',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderOwnerGenderChart(ownerGender) {
    const ctx = document.getElementById('ownerGenderChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(ownerGender),
            datasets: [{
                data: Object.values(ownerGender),
                backgroundColor: ['#004080', '#dc3545', '#6c757d', '#ffc107'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderOwnershipEntityChart(ownershipEntity) {
    const ctx = document.getElementById('ownershipEntityChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(ownershipEntity),
            datasets: [{
                data: Object.values(ownershipEntity),
                backgroundColor: ['#004080', '#28a745', '#ffc107'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderOwnershipTypeChart(ownershipType) {
    const ctx = document.getElementById('ownershipTypeChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(ownershipType),
            datasets: [{
                label: 'Number of Media Houses',
                data: Object.values(ownershipType),
                backgroundColor: '#17a2b8',
                borderColor: '#17a2b8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderRecruitmentChart(womenRecruited) {
    const ctx = document.getElementById('recruitmentChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(womenRecruited),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(womenRecruited),
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderLastFemaleHireChart(lastFemaleHire) {
    const ctx = document.getElementById('lastFemaleHireChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(lastFemaleHire),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(lastFemaleHire),
                backgroundColor: '#20c997',
                borderColor: '#20c997',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderRetentionChart(womenRetained) {
    const ctx = document.getElementById('retentionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(womenRetained),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(womenRetained),
                backgroundColor: '#17a2b8',
                borderColor: '#17a2b8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderEqualRetentionChart(equalRetention) {
    const ctx = document.getElementById('equalRetentionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: Object.keys(equalRetention),
            datasets: [{
                data: Object.values(equalRetention),
                backgroundColor: [
                    '#28a745',
                    '#5cb85c',
                    '#ffc107',
                    '#fd7e14',
                    '#dc3545'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function renderAttritionNumbersChart(womenLeft) {
    const ctx = document.getElementById('attritionNumbersChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(womenLeft),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(womenLeft),
                backgroundColor: '#dc3545',
                borderColor: '#dc3545',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderCareerStageChart(careerStage) {
    const ctx = document.getElementById('careerStageChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(careerStage),
            datasets: [{
                data: Object.values(careerStage),
                backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#6c757d'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function renderStayDurationChart(stayDuration) {
    const ctx = document.getElementById('stayDurationChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(stayDuration),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(stayDuration),
                backgroundColor: '#17a2b8',
                borderColor: '#17a2b8',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderHigherAttritionChart(higherAttrition) {
    const ctx = document.getElementById('higherAttritionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: Object.keys(higherAttrition),
            datasets: [{
                data: Object.values(higherAttrition),
                backgroundColor: [
                    '#dc3545',
                    '#fd7e14',
                    '#ffc107',
                    '#5cb85c',
                    '#28a745'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function renderAttritionImpactChart(attritionImpact) {
    const ctx = document.getElementById('attritionImpactChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(attritionImpact),
            datasets: [{
                label: 'Number of Organizations',
                data: Object.values(attritionImpact),
                backgroundColor: '#6f42c1',
                borderColor: '#6f42c1',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function renderComprehensiveGenderChart(data) {
    const ctx = document.getElementById('comprehensiveGenderChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Total Workforce', 'Leadership', 'Non-Leadership', 'Technical', 'Operations', 'Newsroom'],
            datasets: [{
                label: 'Women',
                data: [
                    data.totalFemale,
                    data.leadershipFemale,
                    data.nonLeadershipFemale,
                    data.technicalFemale,
                    data.operationsFemale,
                    data.newsroomFemale
                ],
                backgroundColor: '#dc3545',
                borderWidth: 1
            }, {
                label: 'Men',
                data: [
                    data.totalMale,
                    data.leadershipMale,
                    data.nonLeadershipMale,
                    data.technicalMale,
                    data.operationsMale,
                    data.newsroomMale
                ],
                backgroundColor: '#004080',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Close modals when clicking outside
document.getElementById('draftsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeDraftsModal();
    }
});

document.getElementById('draftNameModal').addEventListener('click', function(e) {
    if (e.target === this) {
        cancelDraftName();
    }
});

document.getElementById('analysisModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeAnalysisModal();
    }
});

// Initialize on load
init();
