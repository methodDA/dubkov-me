export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Редирект с корня по стране
    if (url.pathname === "/" || url.pathname === "") {
      const country = request.cf?.country || "US";
      const ruCountries = ["RU", "BY", "KZ", "UZ", "KG", "TJ", "MD", "AM", "AZ", "GE"];
      const lang = ruCountries.includes(country) ? "/ru/" : "/en/";
      return Response.redirect(url.origin + lang, 302);
    }

    // Всё остальное — отдаём статику
    return env.ASSETS.fetch(request);
  }
};
