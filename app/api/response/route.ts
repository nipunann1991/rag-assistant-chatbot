const upstreamEndpoint = "https://cv-rag-assistant-production.up.railway.app/response";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (
      typeof body !== "object" ||
      body === null ||
      !("text" in body) ||
      typeof body.text !== "string"
    ) {
      return Response.json(
        { error: "Request body must include a text string." },
        { status: 400 },
      );
    }

    const upstreamResponse = await fetch(upstreamEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ text: body.text }),
    });

    const data: unknown = await upstreamResponse.json();

    if (!upstreamResponse.ok) {
      return Response.json(
        { error: "CV assistant request failed.", details: data },
        { status: upstreamResponse.status },
      );
    }

    return Response.json(data);
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Unable to reach the CV assistant." },
      { status: 502 },
    );
  }
}
