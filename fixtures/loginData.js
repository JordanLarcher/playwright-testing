export const loginTestData = [
  {
    username: 'rahulshettyacademy',
    password: 'learning',
    expectedSuccess: true,
    expectedUrlPattern: 'loginpagePractise'
  },
  {
    username: 'wronguser@test.com',
    password: 'wrongpass',
    expectedSuccess: false,
    expectedError: 'Incorrect username/password.'
  },
  {
    username: '',
    password: 'learning',
    expectedSuccess: false
  },
  {
    username: 'rahulshettyacademy',
    password: '',
    expectedSuccess: false
  }
];