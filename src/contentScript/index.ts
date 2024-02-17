import { handleCopyEvent } from "./events";
import { checkWhitelist } from "./storage";

/**
 * Add event listener regardless of whether or not the domain is whitelisted. This is to make sure
 * the event listener is added as soon as possible. If the domain is whitelisted, the event
 * listener will be removed in the checkWhitelist function.
 */
document.addEventListener("copy", handleCopyEvent);

checkWhitelist(window.location.hostname, handleCopyEvent);
