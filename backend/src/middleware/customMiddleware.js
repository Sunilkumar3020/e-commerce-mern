const customMiddleware = (req, res, next) => {
    console.log("Custom Middleware run", req)
    next()
}

export default customMiddleware;