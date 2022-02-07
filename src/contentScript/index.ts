import handleCopyEvent from "./handleCopyEvent";
import checkWhitelist from "./checkWhitelist";

// Add event listener regardless of whitelisted domain, to ensure it
// is added as soon as possible. If the current domain is whitelisted,
// we simply remove the event listener.
document.addEventListener("copy", handleCopyEvent);

checkWhitelist();
