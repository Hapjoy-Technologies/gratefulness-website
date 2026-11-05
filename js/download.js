// Records the store-button conversion without getting in the way of the link.
// The link must work even when an ad blocker stops Google Analytics from loading.
function trackConversion(buttonId) {
  var btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener("click", function () {
    if (typeof gtag !== "function") return;
    gtag("event", "conversion", {
      send_to: "AW-720171978/c1e_CIL6-YoDEMrns9cC",
      transport_type: "beacon",
    });
  });
}

trackConversion("btn-android");
trackConversion("btn-ios");
trackConversion("btn-android-end");
trackConversion("btn-ios-end");
