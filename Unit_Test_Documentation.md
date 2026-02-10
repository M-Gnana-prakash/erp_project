# Unit Test Documentation

This project uses **Vitest** for high-performance unit testing of custom Angular form components.

---

## 🧪 Test Suite Summary
| Total Files | Total Tests | Status | Environment |
| :--- | :--- | :--- | :--- |
| 11 Files | 75 Tests | ✅ Passed | Angular + Vitest (JSDOM) |

---

## 📂 Component Test Breakdown

### 1. McvInputField (Generic Text)
*   **Total Tests**: 8
*   **Key Features Tested**:
    *   **Required Validation**: Errors appear when field is empty.
    *   **Length Constraints**: Enforces min/max characters.
    *   **Regex Pattern**: Validates custom input masks.
    *   **Status Emission**: Correctly reports state to parent forms.
    *   **Stress Test**: Guaranteed performance under 1,000 rapid cycles.

### 2. McvEmailField (Email)
*   **Total Tests**: 7
*   **Key Features Tested**:
    *   **Format Check**: Validates standard `user@domain.com` structure.
    *   **Multi-Email Support**: Validates comma-separated lists of addresses.
    *   **Interaction**: Correctly tracks `touched` state after focus loss.
    *   **Stress Test**: High-speed regex validation for large datasets.

### 3. McvPasswordField (Security)
*   **Total Tests**: 8
*   **Key Features Tested**:
    *   **Visibility Toggle**: Switches between `password` and `text` types.
    *   **Security Policy**: Enforces character minimums.
    *   **Masking**: Ensures regex patterns for complexity are followed.
    *   **Stress Test**: Rapid visibility toggling and validation.

### 4. McvPhoneField (Contact)
*   **Total Tests**: 7
*   **Key Features Tested**:
    *   **Required Validation**: Ensures field is not empty when required.
    *   **Format Validation**: Rejects non-numeric characters.
    *   **Length Check**: Enforces at least 10 digits for phone numbers.
    *   **Country Code**: Tracks and emits selected country code.
    *   **Stress Test**: Guaranteed performance under 1,000 rapid cycles.

### 5. McvTextArea (Long Text)
*   **Total Tests**: 6
*   **Key Features Tested**:
    *   **Required Validation**: Errors appear when field is empty.
    *   **Length Constraints**: Enforces min/max characters.
    *   **Status Emission**: Correctly reports state to parent forms.
    *   **Stress Test**: High-speed validation for large text inputs.

### 6. McvDatePicker (Date)
*   **Total Tests**: 6
*   **Key Features Tested**:
    *   **Required Validation**: Ensures a date is selected.
    *   **Range Constraints**: Validates min and max date boundaries.
    *   **Status Emission**: Reports selected date and validity state.
    *   **Stress Test**: Rapid selection and validation performance.


### 7. McvRadioField (Radio Button Group)
*   **Total Tests**: 4
*   **Key Features Tested**:
    *   **Option Selection**: Validates user can select from multiple radio options.
    *   **Required Validation**: Ensures validation triggers when no option is selected.
    *   **Status Emission**: Emits value and validation status to parent forms.
    *   **Stress Test**: Guaranteed performance under 1,000 rapid cycles.

### 8. ToggleSwitchComponent (Toggle Switch)
*   **Total Tests**: 4
*   **Key Features Tested**:
    *   **Toggle Functionality**: Tests switching between on/off states.
    *   **Required Validation**: Validates that required toggles must be in 'on' state.
    *   **Value Emission**: Emits boolean value and validation status on toggle.
    *   **Stress Test**: Guaranteed performance under 1,000 rapid cycles.

### 9. McvCheckbox (Check Action)
*   **Total Tests**: 4
*   **Key Features Tested**:
    *   **Toggle State**: Switches between checked/unchecked states.
    *   **Required Check**: Ensures validation follows required constraint.
    *   **Status Emission**: Reports current state and validity to parent.

### 10. McvTimePicker (Time Selection)
*   **Total Tests**: 5
*   **Key Features Tested**:
    *   **Format Check**: Validates standard HH:mm structure.
    *   **Required Check**: Errors appear when field is empty.
    *   **Range Constraints**: Enforces min/max time boundaries.
    *   **Status Emission**: Reports selected time and validity state.

### 11. McvDateRangePicker (Range Selection)
*   **Total Tests**: 5
*   **Key Features Tested**:
    *   **Required Validation**: Ensures both dates are selected.
    *   **Order Check**: Validates start date is before end date.
    *   **Range Constraints**: Enforces min/max date boundaries for both fields.
    *   **Status Emission**: Reports start/end dates and overall validity.

### 12. App Component (Shell)

*   **Total Tests**: 2
*   **Key Features Tested**:
    *   **Bootstrap**: Ensures the application root initializes.
    *   **Template Integration**: Confirms custom fields are recognized and rendered in the DOM.

---

## 🚀 How to Run Tests
Run the following command in your terminal to view the live test results:
```powershell
npx ng test --watch=false
```
