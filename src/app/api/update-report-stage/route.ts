import { NextRequest } from "next/server";
import { Report } from "@/db/mongoDB/report-schema";

// Updates the stage based on current stage of a report
export async function POST(request: NextRequest) {
  const body: any = await request.json();
  const { incident_report_number, report_stage } = body;

  const nextStage = () => {
    switch (report_stage) {
      case "data-gathering":
        return "unclaimed";
      case "unclaimed":
        return "claimed";
      case "claimed":
        return "archived";
      default:
        return report_stage; // No change if the stage is not recognized
    }
  };

  const updatedStage = nextStage();

  console.log(updatedStage);

  try {
    // Update current report to have the next report stage
    const updatedReport = await Report.findOneAndUpdate(
      { incident_report_number: incident_report_number },
      {
        $set: {
          report_stage: updatedStage,
        },
      }
    );

    return new Response(JSON.stringify(updatedReport), { status: 200 });
  } catch (error) {
    console.error("Error updating report status:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update report status" }),
      { status: 500 }
    );
  }
}
