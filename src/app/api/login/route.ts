import { NextResponse } from 'next/server';

export async function POST(request: any) {
  const body = await request.json();
  const fetchToken = await fetch(
    'https://afefitness2023.azurewebsites.net/api/Users/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: body.username, password: body.password }),
    }
  );

  if (!fetchToken.ok) {
    const response = NextResponse.json(
      { success: false },
      {
        status: fetchToken.status,
        headers: { 'content-type': 'application/json' },
      }
    );
    return response;
  }

  const tokenData = await fetchToken.json();
  const response = NextResponse.json(
    { success: true, token: tokenData.jwt },
    { status: 200, headers: { 'content-type': 'application/json' } }
  );
  response.cookies.set({
    name: 'token',
    value: tokenData.jwt,
    path: '/',
  });
  console.log('Cookie sat');

  return response;
}
