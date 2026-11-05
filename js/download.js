function trackConversion(buttonId) {
  var btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    var targetUrl = this.href;

    gtag('event', 'conversion', {
      'send_to': 'AW-720171978/c1e_CIL6-YoDEMrns9cC',
      'event_callback': function () {
        window.location = targetUrl;
      }
    });
    return false;
  });
}

trackConversion("btn-android");
trackConversion("btn-ios");
trackConversion("btn-android-end");
trackConversion("btn-ios-end");
