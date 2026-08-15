import { NextResponse } from 'next/server';

type DirectorReviewRequest = {
  formType?: 'public_director_enquiry' | 'centre_starting_point_review';

  directorName?: unknown;
  directorEmail?: unknown;
  email?: unknown;
  serviceName?: unknown;
  phone?: unknown;

  roomCount?: unknown;
  primaryPressurePoint?: unknown;
  staffConfidenceScore?: unknown;
  qipPriority?: unknown;
  notes?: unknown;

  leadershipCapacity?: unknown;
  leadershipNotes?: unknown;
  teamConsistency?: unknown;
  teamPressurePoints?: unknown;
  familyCommunication?: unknown;
  familySupportNotes?: unknown;
  babiesPatterns?: unknown;
  toddlerPatterns?: unknown;
  preschoolPatterns?: unknown;
  priorityRoutines?: unknown;
  topPriority?: unknown;
};

const MAX_REQUEST_BYTES = 50_000;

function cleanString(
  value: unknown,
  maxLength = 500,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function cleanEmail(value: unknown): string {
  return cleanString(value, 254).toLowerCase();
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanStringArray(
  value: unknown,
  maxItems = 20,
  maxItemLength = 150,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim().slice(0, maxItemLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function getEnvironmentVariables() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'NEXT_PUBLIC_SUPABASE_URL is missing.',
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is missing.',
    );
  }

  return {
    supabaseUrl,
    serviceRoleKey,
  };
}

function isCentreStartingPointReview(
  body: DirectorReviewRequest,
) {
  if (
    body.formType === 'centre_starting_point_review'
  ) {
    return true;
  }

  if (
    body.formType === 'public_director_enquiry'
  ) {
    return false;
  }

  // Backwards compatibility for older forms that
  // may not yet submit formType.
  return Boolean(
    cleanString(body.leadershipCapacity) ||
      cleanString(body.leadershipNotes) ||
      cleanString(body.teamConsistency) ||
      cleanString(body.teamPressurePoints) ||
      cleanString(body.familyCommunication) ||
      cleanString(body.familySupportNotes) ||
      cleanString(body.babiesPatterns) ||
      cleanString(body.toddlerPatterns) ||
      cleanString(body.preschoolPatterns) ||
      cleanString(body.topPriority) ||
      cleanStringArray(body.priorityRoutines).length > 0,
  );
}

function createPublicEnquiryNotes(
  body: DirectorReviewRequest,
) {
  const roomCount = cleanString(
    body.roomCount,
    50,
  );

  const primaryPressurePoint = cleanString(
    body.primaryPressurePoint,
    500,
  );

  const staffConfidenceScore = cleanString(
    body.staffConfidenceScore,
    10,
  );

  const qipPriority = cleanString(
    body.qipPriority,
    500,
  );

  const additionalNotes = cleanString(
    body.notes,
    2000,
  );

  return `
Public Director Enquiry

Number of Rooms: ${roomCount || 'Not provided'}

Primary Pressure Point:
${primaryPressurePoint || 'Not provided'}

Current Team Confidence: ${
    staffConfidenceScore
      ? `${staffConfidenceScore}/5`
      : 'Not provided'
  }

QIP Priority:
${qipPriority || 'Not provided'}

Additional Notes:
${additionalNotes || 'None provided'}
  `.trim();
}

function createStartingPointReviewNotes(
  body: DirectorReviewRequest,
) {
  const leadershipCapacity = cleanString(
    body.leadershipCapacity,
    500,
  );

  const leadershipNotes = cleanString(
    body.leadershipNotes,
    2000,
  );

  const teamConsistency = cleanString(
    body.teamConsistency,
    500,
  );

  const teamPressurePoints = cleanString(
    body.teamPressurePoints,
    2000,
  );

  const familyCommunication = cleanString(
    body.familyCommunication,
    500,
  );

  const familySupportNotes = cleanString(
    body.familySupportNotes,
    2000,
  );

  const babiesPatterns = cleanString(
    body.babiesPatterns,
    2000,
  );

  const toddlerPatterns = cleanString(
    body.toddlerPatterns,
    2000,
  );

  const preschoolPatterns = cleanString(
    body.preschoolPatterns,
    2000,
  );

  const priorityRoutines = cleanStringArray(
    body.priorityRoutines,
    20,
    150,
  );

  const topPriority = cleanString(
    body.topPriority,
    1000,
  );

  return `
Centre Starting-Point Review

Leadership Capacity:
${leadershipCapacity || 'N/A'}

Leadership Notes:
${leadershipNotes || 'N/A'}

Team Consistency:
${teamConsistency || 'N/A'}

Team Pressure Points:
${teamPressurePoints || 'N/A'}

Family Communication:
${familyCommunication || 'N/A'}

Family Notes:
${familySupportNotes || 'N/A'}

Babies Room:
${babiesPatterns || 'N/A'}

Toddler Room:
${toddlerPatterns || 'N/A'}

Preschool Room:
${preschoolPatterns || 'N/A'}

Priority Routines:
${
  priorityRoutines.length > 0
    ? priorityRoutines.join(', ')
    : 'None selected'
}

Top Priority Outcome:
${topPriority || 'N/A'}
  `.trim();
}

export async function POST(request: Request) {
  try {
    const contentLength =
      request.headers.get('content-length');

    if (
      contentLength &&
      Number(contentLength) > MAX_REQUEST_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The submitted form is too large. Please shorten your responses and try again.',
        },
        { status: 413 },
      );
    }

    const body =
      (await request.json()) as DirectorReviewRequest;

    const contactName = cleanString(
      body.directorName,
      150,
    );

    const contactEmail = cleanEmail(
      body.directorEmail || body.email,
    );

    const centreName = cleanString(
      body.serviceName,
      200,
    );

    const phone = cleanString(
      body.phone,
      50,
    );

    if (!contactName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Your name is required.',
        },
        { status: 400 },
      );
    }

    if (
      !contactEmail ||
      !isValidEmail(contactEmail)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'A valid work email address is required.',
        },
        { status: 400 },
      );
    }

    if (!centreName) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Centre or service name is required.',
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

    const {
      supabaseUrl,
      serviceRoleKey,
    } = getEnvironmentVariables();

    const response = await fetch(
      `${supabaseUrl}/rest/v1/champion_enquiries`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

          apikey: serviceRoleKey,

          Authorization: `Bearer ${serviceRoleKey}`,

          Prefer: 'return=minimal',
        },

        body: JSON.stringify({
          contact_name: contactName,
          contact_email: contactEmail,
          centre_name: centreName,
          phone: phone || null,
          selected_tier: selectedTier,
          notes,
        }),

        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        'Supabase director review insert failed:',
        {
          status: response.status,
          error: errorText,
        },
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

    return NextResponse.json(
      {
        success: true,

        formType: isStartingPointReview
          ? 'centre_starting_point_review'
          : 'public_director_enquiry',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      'Director review API error:',
      error,
    );

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