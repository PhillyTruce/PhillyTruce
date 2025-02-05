import { NextRequest, NextResponse } from "next/server";
import { Report } from "@/db/mongoDB/report-schema";
import { ReportSummaryType } from "@/app/reports/page";

export async function GET(request: NextRequest) {
  const reports = await Report.find({
    report_stage: true,
    incident_report_number: true,
    id: true,
    report_initiated_at: true,
  });

  const unclaimed = reports.filter(
    (report: ReportSummaryType) => report.report_stage === "unclaimed"
  );
  const claimed = reports.filter(
    (report: ReportSummaryType) => report.report_stage === "claimed"
  );
  const closed = reports.filter(
    (report: ReportSummaryType) =>
      report.report_stage === "closed" || report.report_stage === "archived"
  );

  const lists = {
    unclaimed: unclaimed ?? [],
    claimed: claimed ?? [],
    closed: closed ?? [],
  };

  return NextResponse.json(lists, {
    status: 200,
  });
}
