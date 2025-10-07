async function runTests() {
  const fetch = (await import('node-fetch')).default;

  const API_URL = 'https://waitlist-api.kaguyasecurity.com/api/waitlist';

  const testCases = [
    {
      description: 'Valid submission',
      payload: {
        name: 'Test User',
        email: 'test.user@example.com',
        'creator_type': 'youtuber',
        'interested_plan': 'starter',
        'cybersecurity_concerns': 'Just testing!',
      },
      expectSuccess: true,
    },
    {
      description: 'Invalid email format',
      payload: {
        name: 'Test User',
        email: 'invalid-email',
        'creator_type': 'youtuber',
        'interested_plan': 'starter',
        'cybersecurity_concerns': 'Testing invalid email.',
      },
      expectSuccess: false,
    },
    {
      description: 'Missing required fields (name)',
      payload: {
        email: 'test.user@example.com',
        'creator_type': 'youtuber',
        'interested_plan': 'starter',
        'cybersecurity_concerns': 'Testing missing name.',
      },
      expectSuccess: false,
    },
    {
      description: 'Missing required fields (email)',
      payload: {
        name: 'Test User',
        'creator_type': 'youtuber',
        'interested_plan': 'starter',
        'cybersecurity_concerns': 'Testing missing email.',
      },
      expectSuccess: false,
    },
  ];

  for (const testCase of testCases) {
    console.log(`\nRunning test: ${testCase.description}`);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.payload),
      });

      console.log(`  Status: ${response.status}`);
      let responseBody;
      try {
        responseBody = await response.json();
        console.log('  Response:', responseBody);
      } catch (e) {
        responseBody = await response.text();
        console.log('  Response (not JSON):', responseBody);
      }


      if (response.ok && testCase.expectSuccess) {
        console.log('  Result: PASSED');
      } else if (!response.ok && !testCase.expectSuccess) {
        console.log('  Result: PASSED');
      } else {
        console.log('  Result: FAILED');
      }
    } catch (error) {
      console.error('  Error:', error.message);
      console.log('  Result: FAILED');
    }
  }
}

runTests();
