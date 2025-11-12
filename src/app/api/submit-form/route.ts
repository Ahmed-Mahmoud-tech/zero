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

    // Forward the form data to NEXT_PUBLIC_AUTH0_DOMAIN
    const submitUrl = `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/submit-form`;
    const submitResponse = await fetch(submitUrl, {
      method: "POST",
      body: formData,
      headers: {
        "x-app-token": process.env.X_APP_TOKEN || "",
      },
    });

    const result = await submitResponse.json();

    if (!submitResponse.ok) {
      return NextResponse.json(result, { status: submitResponse.status });
    }

    return NextResponse.json(result);
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
