// Lightweight debug controller to inspect incoming cookies and headers
export const whoami = (req, res) => {
  try {
    const cookies = req.cookies || {};
    const authorization = req.headers && req.headers.authorization ? req.headers.authorization : null;
    return res.status(200).json({
      message: 'debug info',
      cookies,
      authorization,
      host: req.get('host'),
      origin: req.get('origin') || null,
    });
  } catch (error) {
    console.error('Debug whoami error:', error);
    return res.status(500).json({ message: 'Debug endpoint error' });
  }
};
