export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Только для корня сайта — редирект по стране
  if (url.pathname === "/") {
    const country = request.cf?.country || "US";
    const ruCountries = [
      "RU", "BY", "KZ", "UZ", "KG", "TJ", "UA", "MD", "AM", "AZ", "GE"
    ];

    const lang = ruCountries.includes(country) ? "/ru/" : "/en/";
    return Response.redirect(url.origin + lang, 302);
  }

  return context.next();
}
