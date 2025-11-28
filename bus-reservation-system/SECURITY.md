# 🔒 Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in this project, please report it responsibly:

1. **DO NOT** create a public GitHub issue
2. Email the maintainer directly at: [your-email@example.com]
3. Include detailed steps to reproduce the vulnerability
4. Allow reasonable time for the issue to be addressed before public disclosure

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ Yes            |
| < 1.0   | ❌ No             |

## Security Best Practices

### 🔐 Environment Variables

**NEVER commit sensitive information to version control:**

```bash
# ❌ BAD - Never do this
git add .env
git commit -m "Added config"

# ✅ GOOD - Use example files
git add .env.example
```

**What to protect:**
- Database URLs and credentials
- API keys (Supabase, third-party services)
- JWT secrets
- SMTP credentials
- Payment gateway keys
- OAuth client secrets

### 🛡️ Authentication Security

1. **Password Requirements:**
   - Minimum 8 characters
   - Use bcrypt with salt rounds ≥ 10
   - Never store plain text passwords
   - Implement password strength validation

2. **JWT Tokens:**
   - Use strong secrets (minimum 32 characters)
   - Set appropriate expiration times
   - Store securely (httpOnly cookies recommended)
   - Implement token refresh mechanism

3. **Session Management:**
   - Implement proper logout functionality
   - Clear tokens on logout
   - Set token expiration
   - Use secure session storage

### 🗄️ Database Security

1. **Supabase Configuration:**
   - Enable Row Level Security (RLS) on all tables
   - Use service role key only in backend
   - Never expose service role key in frontend
   - Implement proper RLS policies

2. **SQL Injection Prevention:**
   - Always use parameterized queries
   - Validate and sanitize all inputs
   - Use ORM/query builder when possible
   - Never concatenate user input into queries

Example of secure query:
```javascript
// ✅ GOOD - Parameterized query
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('email', userEmail);

// ❌ BAD - Direct string concatenation
const query = `SELECT * FROM users WHERE email = '${userEmail}'`;
```

### 🌐 API Security

1. **CORS Configuration:**
   ```javascript
   // Configure CORS properly
   app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE']
   }));
   ```

2. **Rate Limiting:**
   ```javascript
   // Implement rate limiting
   const rateLimit = require('express-rate-limit');
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

3. **Input Validation:**
   ```javascript
   // Validate and sanitize inputs
   const { body, validationResult } = require('express-validator');
   
   app.post('/api/booking',
     body('email').isEmail().normalizeEmail(),
     body('phone').isMobilePhone(),
     (req, res) => {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       // Process booking
     }
   );
   ```

### 🔍 Data Privacy

1. **User Data Protection:**
   - Encrypt sensitive data at rest
   - Use HTTPS for data in transit
   - Implement data access controls
   - Follow GDPR/data protection regulations

2. **Payment Information:**
   - Never store credit card details
   - Use PCI-DSS compliant payment gateways
   - Log payment transactions securely
   - Implement proper audit trails

3. **Personal Information:**
   - Collect only necessary data
   - Provide data deletion options
   - Implement privacy policy
   - Allow users to download their data

### 🚀 Production Deployment

1. **Environment Setup:**
   ```bash
   # Use production environment variables
   NODE_ENV=production
   
   # Use strong secrets
   JWT_SECRET=$(openssl rand -base64 32)
   
   # Enable HTTPS
   FORCE_HTTPS=true
   ```

2. **Security Headers:**
   ```javascript
   const helmet = require('helmet');
   
   app.use(helmet({
     contentSecurityPolicy: {
       directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'", "'unsafe-inline'"],
         scriptSrc: ["'self'"],
         imgSrc: ["'self'", "data:", "https:"],
       }
     },
     hsts: {
       maxAge: 31536000,
       includeSubDomains: true,
       preload: true
     }
   }));
   ```

3. **Error Handling:**
   ```javascript
   // Don't expose sensitive error details
   app.use((err, req, res, next) => {
     console.error(err.stack);
     
     // Send generic error to client
     res.status(500).json({
       success: false,
       message: 'An error occurred. Please try again.'
     });
   });
   ```

### 📋 Security Checklist

Before deploying to production, ensure:

- [ ] All environment variables are set correctly
- [ ] `.env` files are not committed to Git
- [ ] Strong JWT secret is generated and used
- [ ] Database has Row Level Security enabled
- [ ] API endpoints have proper authentication
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] CORS is configured correctly
- [ ] HTTPS is enforced
- [ ] Security headers are set (Helmet.js)
- [ ] Error messages don't expose sensitive info
- [ ] Passwords are hashed with bcrypt
- [ ] SQL injection prevention is implemented
- [ ] XSS protection is enabled
- [ ] CSRF protection is configured
- [ ] Dependencies are up to date
- [ ] Security audit has been performed
- [ ] Logging and monitoring are configured
- [ ] Backup strategy is in place

### 🔄 Regular Maintenance

1. **Dependency Updates:**
   ```bash
   # Check for outdated packages
   npm outdated
   
   # Update packages
   npm update
   
   # Audit for vulnerabilities
   npm audit
   npm audit fix
   ```

2. **Security Audits:**
   - Run `npm audit` regularly
   - Monitor security advisories
   - Update dependencies promptly
   - Review code for security issues

3. **Access Control:**
   - Review user permissions regularly
   - Remove unused accounts
   - Rotate API keys periodically
   - Audit admin access logs

### 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express.js Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Supabase Security Documentation](https://supabase.com/docs/guides/auth/row-level-security)

---

## 🚨 Emergency Response

If you suspect a security breach:

1. Immediately rotate all credentials
2. Review access logs for suspicious activity
3. Notify affected users if data was compromised
4. Document the incident
5. Implement fixes to prevent recurrence
6. Consider professional security audit

---

**Last Updated:** November 2025

**Security Contact:** [your-email@example.com]
