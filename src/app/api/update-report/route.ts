import { NextRequest, NextResponse } from "next/server";
import { Report } from "@/db/mongoDB/report-schema";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract the report ID and the new data from the request body
    const {
      incident_report_number,
      incident_type,
      location,
      date,
      time,
      description,
      ppd_notified,
    } = body;

    // Check if the report ID is provided
    if (!incident_report_number) {
      return NextResponse.json(
        { error: "Report ID is required" },
        { status: 400 }
      );
    }

    // Update the report in the database
    const updatedReport = await Report.findOneAndUpdate(
      { incident_report_number: Number(incident_report_number) },
      {
        $set: {
          incident_type,
          report_origin: "user_created",
          report_stage: "claimed",
          description,
          location,
          report_last_updated_at: new Date(),
          ppd_notified,
          creator_user_id: "66ba6bfd81833a6900354b86",
          report_initiated_at: new Date(`${date}T${time}`),
        },
      }
    );

    return NextResponse.json(
      { message: "Report updated successfully", report: updatedReport },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating report:", error);
    return NextResponse.json(
      { error: "Failed to update report" },
      { status: 500 }
    );
  }
}
