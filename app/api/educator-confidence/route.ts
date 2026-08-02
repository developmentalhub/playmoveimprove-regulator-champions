import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type EducatorConfidenceRequest = {
  educatorName?: string;
  educatorEmail?: string;
  centreName?: string;
  educatorRole?: string;

  bodyAwareness?: string;
  bodyNoticeText?: string;

  challengingRoutines?: string[];
  roomPressureText?: string;

  selectedStrategies?: string[];
  strategyConfidence?: string;

  learningGoal?: string;
  supportPreference?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        'Educator confidence API is missing Supabase environment variables.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'The reflection form is not connected yet. Please contact Robyn.',
        },
        { status: 500 },
      );
    }

    const body =
      (await request.json()) as EducatorConfidenceRequest;

    const educatorName = body.educatorName?.trim() ?? '';
    const educatorEmail =
      body.educatorEmail?.trim().toLowerCase() ?? '';
    const centreName = body.centreName?.trim() ?? '';
    const educatorRole = body.educatorRole?.trim() ?? '';
    const learningGoal = body.learningGoal?.trim() ?? '';

    if (
      !educatorName ||
      !educatorEmail ||
      !centreName ||
      !educatorRole
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your name, work email, service name and role are required.',
        },
        { status: 400 },
      );
    }

    if (!emailPattern.test(educatorEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Enter a valid work email address.',
        },
        { status: 400 },
      );
    }

    if (!body.bodyAwareness) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Select the option that best describes your current body awareness.',
        },
        { status: 400 },
      );
    }

    if (
      !Array.isArray(body.challengingRoutines) ||
      body.challengingRoutines.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Select at least one routine you would like more support with.',
        },
        { status: 400 },
      );
    }

    if (!body.strategyConfidence) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Select the option that best describes your current confidence.',
        },
        { status: 400 },
      );
    }

    if (learningGoal.length < 20) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Add more detail about what you would like to learn.',
        },
        { status: 400 },
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { error } = await supabase
      .from('educator_confidence_responses')
      .insert({
        educator_name: educatorName,
        educator_email: educatorEmail,
        centre_name: centreName,
        educator_role: educatorRole,

        body_awareness: body.bodyAwareness,
        body_notice_text:
          body.bodyNoticeText?.trim() || null,

        challenging_routines: body.challengingRoutines,
        room_pressure_text:
          body.roomPressureText?.trim() || null,

        selected_strategies: Array.isArray(
          body.selectedStrategies,
        )
          ? body.selectedStrategies
          : [],

        strategy_confidence: body.strategyConfidence,

        learning_goal: learningGoal,
        support_preference:
          body.supportPreference?.trim() || null,

        submission_status: 'received',
      });

    if (error) {
      console.error(
        'Educator confidence database error:',
        error,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your reflection could not be saved. Please try again or contact Robyn.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      'Educator confidence API failure:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your reflection could not be submitted. Please try again.',
      },
      { status: 500 },
    );
  }
}