export const adminSearchScenarios = [
  // Username Tests
  {
    tag: '@positive',
    caseId: 'SEARCH_01',
    testCaseName: 'Search by exact username',
    searchfield: 'Username',
    value: 'Admin',
    expectResults: true
  },
  {
    tag: '@negative',
    caseId: 'SEARCH_02',
    testCaseName: 'Search by invalid username',
    searchfield: 'Username',
    value: 'unknown_user',
    expectResults: false
  },
  {
    tag: '@negative',
    caseId: 'SEARCH_03',
    testCaseName: 'Search with special characters in username',
    searchfield: 'Username',
    value: '@#$%',
    expectResults: false
  }
];
