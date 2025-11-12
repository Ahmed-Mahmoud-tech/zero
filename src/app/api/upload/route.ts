import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF and DOCX are allowed." },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Forward the file to NEXT_PUBLIC_AUTH0_DOMAIN
    const uploadUrl = `${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/api/upload`;
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    const result = await uploadResponse.json();

    if (!uploadResponse.ok) {
      return NextResponse.json(result, { status: uploadResponse.status });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
