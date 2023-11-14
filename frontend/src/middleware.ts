import { NextResponse, NextRequest } from 'next/server';

const proxyToBackend = (request: NextRequest) => {
  const backendSvc = process.env.BACKEND_URL ?? 'http://localhost:8000';

  const backUrl = new URL(backendSvc);
  const protocol = backUrl.protocol;
  const hostname = backUrl.hostname;
  const port = backUrl.port;

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('host', hostname);

  let url = request.nextUrl.clone();
  url.protocol = protocol;
  url.hostname = hostname;
  url.port = port;
  url.pathname = url.pathname.replace(/^\/svc/, '');

  return NextResponse.rewrite(url, {
    headers: requestHeaders,
  });
};

// This function can be marked `async` if using `await` inside
export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/svc')) {
    return proxyToBackend(req);
  }

  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
