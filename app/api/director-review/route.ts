import { NextResponse } from 'next/server';

type DirectorReviewRequest = {
  formType?: 'public_director_enquiry' | 'centre_starting_point_review';

  directorName?: string;
  directorEmail?: string;
  email?: string;
  serviceName?: string;
  phone?: string;

  roomCount?: string;
  primaryPressurePoint?: string;
  staffConfidenceScore?: string;
  qipPriority?: string;
  notes?: string;

  leadershipCapacity?: string;
  leadershipNotes?: string;
  teamConsistency?: string;
  teamPressurePoints?: string;
  familyCommunication?: string;
  familySupportNotes?: string;
  babiesPatterns?: string;
  toddlerPatterns?: string;
  preschoolPatterns?: string;
  priorityRoutines?: string[];
  topPriority?: string;
};

function getEnvironmentVariables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing.');
  }

  return {
    supabaseUrl,
    supabaseAnonKey,
  };
}

function isCentreStartingPointReview(body: DirectorReviewRequest) {
  if (body.formType === 'centre_starting_point_review') {
    return true;
  }

  return Boolean(
    body.leadershipCapacity ||
      body.leadershipNotes ||
      body.teamConsistency ||
      body.teamPressurePoints ||
      body.familyCommunication ||
      body.familySupportNotes ||
      body.babiesPatterns ||
      body.toddlerPatterns ||
      body.preschoolPatterns ||
      body.topPriority ||
      (Array.isArray(body.priorityRoutines) &&
        body.priorityRoutines.length > 0),
  );
}

function createPublicEnquiryNotes(body: DirectorReviewRequest) {
  return `
Public Director Enquiry

Number of Rooms: ${body.roomCount || 'Not provided'}
Primary Pressure Point: ${body.primaryPressurePoint || 'Not provided'}
Current Team Confidence: ${
    body.staffConfidenceScore
      ? `${body.staffConfidenceScore}/5`
      : 'Not provided'
  }
QIP Priority: ${body.qipPriority || 'Not provided'}
Additional Notes: ${body.notes || 'None provided'}
  `.trim();
}

function createStartingPointReviewNotes(body: DirectorReviewRequest) {
  return `
Centre Starting-Point Review

Leadership Capacity: ${body.leadershipCapacity || 'N/A'}
Leadership Notes: ${body.leadershipNotes || 'N/A'}
Team Consistency: ${body.teamConsistency || 'N/A'}
Team Pressure Points: ${body.teamPressurePoints || 'N/A'}
Family Communication: ${body.familyCommunication || 'N/A'}
Family Notes: ${body.familySupportNotes || 'N/A'}
Babies Room: ${body.babiesPatterns || 'N/A'}
Toddler Room: ${body.toddlerPatterns || 'N/A'}
Preschool Room: ${body.preschoolPatterns || 'N/A'}
Priority Routines: ${
    Array.isArray(body.priorityRoutines)
      ? body.priorityRoutines.join(', ')
      : 'None selected'
}
Top Priority Outcome: ${body.topPriority || 'N/A'}
  `.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DirectorReviewRequest;

    const contactName = body.directorName?.trim();
    const contactEmail = (
      body.directorEmail ||
      body.email ||
      ''
    ).trim();
    const centreName = body.serviceName?.trim();

    if (!contactName || !contactEmail || !centreName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Name, work email and service name are required.',
        },
        { status: 400 },
      );
    }

    const isStartingPointReview =
      isCentreStartingPointReview(body);

    const selectedTier = isStartingPointReview
      ? 'Centre Starting-Point Review'
      : 'Public Director Enquiry';

    const notes = isStartingPointReview
      ? createStartingPointReviewNotes(body)
      : createPublicEnquiryNotes(body);

    const { supabaseUrl, supabaseAnonKey } =
      getEnvironmentVariables();

    const response = await fetch(
      `${supabaseUrl}/rest/v1/champion_enquiries`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          contact_name: contactName,
          contact_email: contactEmail,
          centre_name: centreName,
          phone: body.phone?.trim() || null,
          selected_tier: selectedTier,
          notes,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        'Supabase director review insert error:',
        errorText,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your enquiry could not be saved. Please try again.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      formType: isStartingPointReview
        ? 'centre_starting_point_review'
        : 'public_director_enquiry',
    });
  } catch (error) {
    console.error('Director review API error:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          'Your enquiry could not be submitted. Please try again.',
      },
      { status: 500 },
    );
  }
}