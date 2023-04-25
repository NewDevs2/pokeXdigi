if (req.url === "/" || req.url.includes("index.html")) {

  const filepath = path.join(root, "src", "views", "html", "index.html")
  repPageWrite(filepath,rep,"html")

}