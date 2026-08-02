import { NextResponse } from 'next/server';

const SB_URL = "https://vfflpjpvbazvzxbuxwme.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZmxwanB2YmF6dnp4YnV4d21lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2NTAxODIsImV4cCI6MjA5NTIyNjE4Mn0.x_U8pHlAcdgnbsMIYV8eigPLtiBp2rYAx6ljt4pIkkw";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const notesSummary = `
Leadership Capacity: ${body.leadershipCapacity || 'N/A'}
Leadership Notes: ${body.leadershipNotes || 'N/A'}
Team Consistency: ${body.teamConsistency || 'N/A'}
Team Pressure Points: ${body.teamPressurePoints || 'N/A'}
Family Communication: ${body.familyCommunication || 'N/A'}
Family Notes: ${body.familySupportNotes || 'N/A'}
Babies Room: ${body.babiesPatterns || 'N/A'}
Toddler Room: ${body.toddlerPatterns || 'N/A'}
Preschool Room: ${body.preschoolPatterns || 'N/A'}
Priority Routines: ${Array.isArray(body.priorityRoutines) ? body.priorityRoutines.join(', ') : 'None selected'}
Top Priority Outcome: ${body.topPriority || 'N/A'}
    `.trim();

    const response = await fetch(`${SB_URL}/rest/v1/champion_enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        contact_name: body.directorName,
        contact_email: body.directorEmail,
        centre_name: body.serviceName,
        phone: body.phone || null,
        selected_tier: 'Director Starting-Point Review',
        notes: notesSummary,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase Director Review insert error:', errorText);
      return NextResponse.json(
        { success: false, error: 'Database record creation failed.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Director review API error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}