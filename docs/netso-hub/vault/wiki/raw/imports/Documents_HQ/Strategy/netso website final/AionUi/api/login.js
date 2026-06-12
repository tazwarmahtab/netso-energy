// Simple mock authentication API for Vercel deployment
export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST' && req.url === '/login') {
    const { username, password } = req.body;
    
    // Mock authentication - accept admin with any password for demo
    if (username === 'admin') {
      // Create a simple mock token
      const token = Buffer.from(JSON.stringify({ 
        user: { id: 1, username }, 
        exp: Date.now() + 24 * 60 * 60 * 1000 
      })).toString('base64');

      res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: 1,
          username: username,
        },
        token: token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid username or password',
      });
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/logout') {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/auth/status') {
    res.status(200).json({
      success: true,
      needsSetup: false,
      userCount: 1,
      isAuthenticated: false,
    });
    return;
  }

  if (req.method === 'GET' && req.url === '/api/auth/user') {
    // Mock user data
    res.status(200).json({
      success: true,
      user: {
        id: 1,
        username: 'admin',
      },
    });
    return;
  }

  // Default response
  res.status(404).json({ error: 'Not found' });
}
