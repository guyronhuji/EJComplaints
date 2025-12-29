async function testSubmission() {
    console.log("Testing submission...");
    const response = await fetch('http://localhost:3000/api/submit-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fullName: "גיא רון (בדיקה)",
            branch: "סניף מרכז",
            incidentDate: "15/05/2024",
            description: "בדיקה עם סניף ושם גיא רון",
            contactInfo: "test3@example.com"
        }),
    });

    if (response.ok) {
        console.log("SUCCESS: Submission accepted.");
    } else {
        console.error("FAILURE: Submission rejected.", await response.text());
    }
}

testSubmission();
