let cache = "";
let identity;

const local =
  window.location.hostname === "localhost" ||
  window.location.hostname.startsWith("192.168") ||
  window.location.hostname.startsWith("127.0.0.1");

const normalize = (raw) => {
  if (!raw) return raw;
  try {
    const u = new URL(raw, window.location.href);
    u.search = "";
    u.hash = "";
    return u.toString();
  } catch {
    return raw;
  }
};

async function trace(name, data) {
  try {
    const response = await fetch("https://cloud.umami.is/api/send", {
      keepalive: true,
      method: "POST",
      body: JSON.stringify({
        type: "event",
        payload: {
          website: "96d4427e-fa9e-4af1-bc3d-d76af5337d77",
          screen: `${window.screen.width}x${window.screen.height}`,
          language: window.navigator.language,
          title: window.document.title,
          hostname: window.location.hostname,
          url: normalize(window.location.href),
          referrer: normalize(
            window.document.referrer.startsWith(window.location.origin)
              ? ""
              : window.document.referrer,
          ),
          tag: local ? "local" : undefined,
          id: identity ? identity : undefined,
          name,
          data,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-umami-cache": cache,
      },
      credentials: "omit",
    });

    const res = await response.json();
    if (res) {
      cache = res.cache;
    }
  } catch (e) {
    console.error(e);
  }
}

async function identify(id, data) {
  identity = id;
  cache = "";

  try {
    const response = await fetch("https://cloud.umami.is/api/send", {
      keepalive: true,
      method: "POST",
      body: JSON.stringify({
        type: "identify",
        payload: {
          website: "96d4427e-fa9e-4af1-bc3d-d76af5337d77",
          screen: `${window.screen.width}x${window.screen.height}`,
          language: window.navigator.language,
          title: window.document.title,
          hostname: window.location.hostname,
          url: normalize(window.location.href),
          referrer: normalize(
            window.document.referrer.startsWith(window.location.origin)
              ? ""
              : window.document.referrer,
          ),
          tag: local ? "local" : undefined,
          id: identity ? identity : undefined,
          data,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        "x-umami-cache": cache,
      },
      credentials: "omit",
    });

    const res = await response.json();
    if (res) {
      cache = res.cache;
    }
  } catch (e) {
    console.error(e);
  }
}

let id =
  localStorage.getItem("pribehy2_uid") ||
  window.crypto?.randomUUID?.() ||
  Math.random().toString(36).slice(2);

localStorage.setItem("pribehy2_uid", id);

identify(id);
trace();
