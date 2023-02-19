/**
 * It's a middleware function that sends a 404 status code and a message to the client if the route is
 * not found
 * @param req - The request object.
 * @param res - The response object.
 */
const notFoundMiddleware = (req, res) => {
    res.status(404).send("Route not found")
}

export default notFoundMiddleware