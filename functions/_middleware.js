export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Редирект на EN для не-русскоязычных стран
  if (url.pathname === "/") {
    const country = request.cf?.country || "";
    const ruCountries = ["RU", "BY"];

    if (country && !ruCountries.includes(country)) {
      return Response.redirect(url.origin + "/en/", 302);
    }
  }

  return context.next();
}
