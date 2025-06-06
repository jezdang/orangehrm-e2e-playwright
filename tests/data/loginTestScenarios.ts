export const loginTestScenarios = [
  // Valid credentials
  {
    caseId: 'TC-000',
    testCaseName: 'Login with valid credentials',
    tag: '@positive',
    username: 'Admin',
    password: 'admin123',
    expected: {
      success: true,
      message: 'Dashboard'
    }
  },

  // Negative test scenarios
  {
    caseId: 'TC-001',
    testCaseName: 'Login with whitespace password',
    tag: '@negative',
    username: 'Admin',
    password: ' ',
    expected: {
      success: false,
      message: 'Required'
    }
  },
  {
    caseId: 'TC-002',
    testCaseName: 'Login with long password',
    tag: '@negative',
    username: 'Admin',
    password: 'thisisaverylongpasswordthatexceedsthemaximumallowedlength',
    expected: {
      success: false,
      message: 'Invalid credentials'
    }
  },
  {
    caseId: 'TC-003',
    testCaseName: 'Login with empty username',
    tag: '@negative',
    username: '',
    password: 'admin123',
    expected: {
      success: false,
      message: 'Required'
    }
  },
  {
    caseId: 'TC-004',
    testCaseName: 'Login with empty password',
    tag: '@negative',
    username: 'Admin',
    password: '',
    expected: {
      success: false,
      message: 'Required'
    }
  },
  {
    caseId: 'TC-005',
    testCaseName: 'Login with special characters',
    tag: '@negative',
    username: 'Admin@#$',
    password: 'admin123@#$',
    expected: {
      success: false,
      message: 'Invalid credentials'
    }
  },
  {
    caseId: 'TC-006',
    testCaseName: 'Login with incorrect password',
    tag: '@negative',
    username: 'Admin',
    password: 'wrongpassword',
    expected: {
      success: false,
      message: 'Invalid credentials'
    }
  },
  {
    caseId: 'TC-007',
    testCaseName: 'Login with incorrect username',
    tag: '@negative',
    username: 'wronguser',
    password: 'admin123',
    expected: {
      success: false,
      message: 'Invalid credentials'
    }
  },
  {
    caseId: 'TC-008',
    testCaseName: 'Login with whitespace username',
    tag: '@negative',
    username: ' ',
    password: 'admin123',
    expected: {
      success: false,
      message: 'Required'
    }
  }
];
