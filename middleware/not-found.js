const notFoundMiddleware = (req, res) => res.status(404).send("ROUTE DOES NOT EXIST")

export default notFoundMiddleware