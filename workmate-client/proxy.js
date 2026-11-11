import { NextResponse } from "next/server";

export default function middleware(request) {
  //get jwt token from cookie
  const token = request.cookies.get("workmate")?.value;
  console.log("--- MIDDLEWARE DEBUG ---");
  console.log("Pathname:", request.nextUrl.pathname);
  console.log(
    "All Cookies present:",
    request.cookies.getAll().map((c) => c.name),
  );
  console.log(
    "Token found:",
    token ? "YES (Token exists)" : "NO (Token is missing)",
  );

  //get pathname
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  try {
    //decode jwt payload (without needing secret verification for client-side routing)
    const base64URL = token.split(".")[1];

    const base64 = base64URL.replace(/-/g, "+").replace(/_/g, "/");

    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    const payload = JSON.parse(jsonPayload);

    //restrict admin routes
    if (pathname.startsWith("/admin") && payload.role === "employee") {
      return NextResponse.redirect(new URL("/employee/dashboard", request.url));
    }

    //restrict employee routes
    if (pathname.startsWith("/employee") && payload.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*"],
};
