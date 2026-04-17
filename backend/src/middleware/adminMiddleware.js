export const adminOnly = (req, res, next) => {
    try {
        // Ensure user exists (protect middleware should run before this)

        if (!req.user) {
            return res.status(401).json({
                message: "Not authorized, user not found"
            })
        }

        // check admin role

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Access denied, admin only" })
        }
        // Allow access
        next()
    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}