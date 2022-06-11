const COOKIE_BASE_PROPERTIES = {
    httpOnly: true, 
    sameSite: 'None', 
    secure: true,
    maxAge: 1 * 60 * 60 * 1000
}

module.exports = {COOKIE_BASE_PROPERTIES};