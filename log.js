const local =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("192.168") ||
  window.location.hostname.startsWith("127.0.0.1");
const ipCache = fetch("https://ipapi.co/json/")
  .then((res) => res.json())
  .then((data) => data)
  .catch(() => {
    return {
      ip: "0.0.0.0",
      city: "Unknown",
      country: "Unknown",
    };
  });
const pwa =
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true ||
  document.referrer.startsWith("android-app://");

let id =
  localStorage.getItem("pribehy2_uid") ||
  window.crypto?.randomUUID?.() ||
  Math.random().toString(36).slice(2);

localStorage.setItem("pribehy2_uid", id);

ipCache.then((ip) => {
  fetch("https://api.logsnag.com/v1/log", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 04589ea10e64a3fe880032cdc5be7c06",
    },
    body: JSON.stringify({
      project: "pribehy2",
      channel: "visits",
      event: "Visit",
      notify: true,
      user_id: localStorage.getItem("pribehy2_uid"),
      tags: {
        ip: ip.ip,
        location: ip.country + "/" + ip.city,
        pwa: pwa,
        local: local,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: window.navigator.language,
      },
      description: `User \`${localStorage.getItem("pribehy2_uid")}\` opened the app.`,
      parser: "markdown",
      icon: "👁 ",
    }),
  });
});
