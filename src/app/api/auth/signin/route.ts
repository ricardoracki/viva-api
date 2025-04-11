export async function POST(request: Request) {
  // Parse the request body
  const body = await request.formData();
  const username = body.get("username");
  const password = body.get("password");

  console.log(username, password);

  return new Response("Hello from POST /api/auth/signin", {
    status: 200,
  });
}
