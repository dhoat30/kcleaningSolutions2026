

import { NextResponse } from 'next/server'
const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;

export async function POST(req, res) {
    const { hubspotFormObject, hubspotFormID } = await req.json();


    var payload = JSON.stringify({
        "submittedAt": new Date().getTime(),
        "fields": hubspotFormObject,

        "legalConsentOptions": { // Include this object when GDPR options are enabled
            "consent": {
                "consentToProcess": true,
                "text": "I agree to allow Example Company to store and process my personal data.",
                "communications": [
                    {
                        "value": true,
                        "subscriptionTypeId": 999,
                        "text": "I agree to receive marketing communications from Example Company."
                    }
                ]
            }
        }
    })

    // hubspot request options
    var postOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${HUBSPOT_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: payload,
        redirect: 'follow'
    };

    try {
        // submit form
        const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/secure/submit/${HUBSPOT_PORTAL_ID}/${hubspotFormID}`, postOptions);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({ message: "Form submission failed", success: false, data }, { status: response.status });
        }

        return NextResponse.json({ message: "This Worked", success: true, data });
    } catch (error) {
        console.error(error);
        // const err = await error.json();
        return NextResponse.json({ message: "Form submission failed", success: false }, { status: 500 });
        // res.status(500).send('Error sending email');

    }
}

export async function GET(req, res) {
    const response = await res.json();
    return NextResponse.json( response);

};
