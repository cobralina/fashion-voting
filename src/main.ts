import { mount } from "svelte";
import "./styles/style.scss";
import App from "./App.svelte";
import { APP_ROOT_ID } from "./config";

// Function to mount the app dynamically
export function mountApp(selector = `#${APP_ROOT_ID}`, props = {}) {
  const targetElement = document.querySelector(selector);

  if (!targetElement) {
    throw new Error(`No element found matching the selector "${selector}"`);
  }

  return mount(App, {
    target: targetElement,
    props,
  });
}

// Auto-mount the app in development mode
if (import.meta.env.MODE === "development") {
  mountApp(`#${APP_ROOT_ID}`);
}
