# Unit Test Documentation

This project uses **Vitest** for high-performance unit testing of custom Angular form components.

---

## 🧪 Test Suite Summary
| Total Files | Total Tests | Status | Environment |
| :--- | :--- | :--- | :--- |
| 4 Files | 25 Tests | ✅ Passed | Angular + Vitest (JSDOM) |

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

### 4. App Component (Shell)
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
