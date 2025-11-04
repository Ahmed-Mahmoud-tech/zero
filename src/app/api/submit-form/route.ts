import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract all form fields
    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      if (key === "selectedExperiences") {
        data[key] = JSON.parse(value as string);
      } else {
        data[key] = value;
      }
    });

    console.log("Form submission received:", data);

    // Here you can:
    // 1. Save to database
    // 2. Send to external API
    // 3. Process the data as needed

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit form",
      },
      { status: 500 }
    );
  }
}
