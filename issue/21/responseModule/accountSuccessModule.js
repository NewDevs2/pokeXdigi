
if (req.url.includes("html/accountSuccess.html")) {
  responseModule(200, "text/html", req, rep);
}
if (req.url.includes("js/accountSuccess.js")) {
  responseModule(200, "text/javascript", req, rep);
}