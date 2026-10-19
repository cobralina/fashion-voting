import { writable } from "svelte/store";
import { APP_ROOT_ID } from "./config";

export const dataStore: any = writable([]);
export const favouriteItem: any = writable({
  name: "",
  image_url: "",
  format: "",
  credit: "",
  text: "",
  show: "",
});
export const view: any = writable("init");
export const configs: any = writable([]);
export const loadError = writable<string | null>(null);

let quizLoaded = false;

function embedId(): string {
  return new URLSearchParams(window.location.search).get("id") || APP_ROOT_ID;
}

function decodeBase64Json(encoded: string) {
  const normalized = decodeURIComponent(encoded).replace(/\s/g, "+");
  const binary = atob(normalized);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function loadQuizFromBase64(encoded: string | null | undefined) {
  if (!encoded || quizLoaded) return;

  try {
    const decodedData = decodeBase64Json(encoded);
    console.log("decodedData", decodedData);

    dataStore.set(decodedData.data);
    console.log("dataStore: ", decodedData.data);
    configs.set(decodedData.configs);
    loadError.set(null);
    quizLoaded = true;
  } catch (error) {
    console.error("Fehler:", error);
    loadError.set("Die Quiz-Daten konnten nicht geladen werden.");
  }
}

function requestDuelldataFromParent() {
  const id = embedId();

  window.addEventListener("message", (event) => {
    if (event.source !== window.parent) return;
    const payload = event.data;
    if (!payload || typeof payload !== "object") return;

    const encoded =
      typeof payload.duelldata === "string"
        ? payload.duelldata
        : payload["duelldata" + id];
    if (typeof encoded !== "string" || !encoded) return;
    if (payload.id && payload.id !== id) return;

    loadQuizFromBase64(encoded);
  });

  const ask = () => {
    if (quizLoaded) return;
    parent.postMessage({ duelldataRequest: id }, "*");
  };

  ask();
  const timer = window.setInterval(ask, 250);
  window.setTimeout(() => {
    window.clearInterval(timer);
    if (!quizLoaded) {
      loadError.set(
        "Keine Quiz-Daten gefunden. Bitte duelldata als URL-Parameter oder im data-Attribut des iframes angeben.",
      );
    }
  }, 4000);
}

function loadData() {
  // Lokal ohne Parent: Base64-String hier einsetzen und returnen.
  // loadQuizFromBase64("eyJ...");
  // return;

  const fromUrl = new URLSearchParams(window.location.search).get("duelldata");
  if (fromUrl) {
    loadQuizFromBase64(fromUrl);
    return;
  }

  requestDuelldataFromParent();
}

loadData();
