
if (req.url.includes("html/accountSuccess.html")) {
  responseMdoule(200, "text/html", req, rep);
}
if (req.url.includes("js/accountSuccess.js")) {
  responseMdoule(200, "text/javascript", req, rep);
}