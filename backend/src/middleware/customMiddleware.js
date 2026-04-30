const customMiddleware = (req, res, next) => {
    console.log("Custom Middleware run")
    next()
}

export default customMiddleware;