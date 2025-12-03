import clientPromise from "@/app/lib/mongodb";

export async function GET(req) {
  try {
    const email = req.headers.get("user-email");

    if (!email) {
      return Response.json({ exists: false }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("cycleflow");

    const user = await db.collection("users").findOne({ email });

    // user exists ONLY if intro data is filled
    const introComplete =
      user &&
      user.startDate &&
      user.endDate &&
      user.cycleLength;

    return Response.json({ exists: introComplete });
  } catch (error) {
    console.error("CHECK USER ERROR:", error);
    return Response.json({ exists: false }, { status: 500 });
  }
}
