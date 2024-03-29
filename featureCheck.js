//Feature support check
let showAlert = true;
const script = document.createElement("script");
script.textContent =
  "try { import('foo').catch(() => { }); } catch (e) { } showAlert = false;";
document.body.appendChild(script);
if (showAlert) {
  alert(
    "This performance is only viewable on the newest browsers. Please update your browser"
  );
}

if (window.innerWidth < 900) {
  alert(
    "consider watching this on a desktop/laptop with a bigger screen for a better experience!"
  );
}
