# 📋 Pre-Publish Security Checklist

## Before Pushing to GitHub

Use this checklist to ensure no sensitive information is exposed:

### ✅ Step 1: Verify .gitignore

```bash
# Check if .gitignore exists
cat .gitignore

# Verify .env is ignored
git check-ignore backend/.env
# Should output: backend/.env

# Verify node_modules is ignored
git check-ignore node_modules
# Should output: node_modules
```

### ✅ Step 2: Check for Sensitive Files

```bash
# Search for .env files in staging
git status | grep -i "\.env"

# Should return empty (no .env files staged)

# Check what will be committed
git status
```

### ✅ Step 3: Remove Credentials from Git History

If you accidentally committed sensitive files:

```bash
# Remove .env from Git history (if committed)
git rm --cached backend/.env
git rm --cached frontend/.env

# Or remove from entire history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch backend/.env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (use with caution)
git push origin --force --all
```

### ✅ Step 4: Search for Hardcoded Secrets

```bash
# Search for potential secrets in code
grep -r "supabase.co" --include="*.js" --include="*.jsx" .
grep -r "mongodb://" --include="*.js" --include="*.jsx" .
grep -r "password" --include="*.js" --include="*.jsx" .
grep -r "secret" --include="*.js" --include="*.jsx" .
grep -r "api_key" --include="*.js" --include="*.jsx" .
```

**Action:** Replace any hardcoded values with environment variables.

### ✅ Step 5: Verify Example Files

```bash
# Ensure .env.example exists and has no real credentials
cat backend/.env.example

# Should contain only placeholders like:
# JWT_SECRET=your_secret_here
# SUPABASE_URL=https://your-project-id.supabase.co
```

### ✅ Step 6: Clean Package Files

```bash
# Remove personal information from package.json
# Edit backend/package.json and frontend/package.json

# Check for author, repository, email fields
cat backend/package.json | grep -E "(author|repository|email)"
```

**Action:** Replace with generic or public information.

### ✅ Step 7: Check README Links

```bash
# Ensure README doesn't contain actual URLs
grep -E "(github\.com|supabase\.co|@.*\.com)" README.md
```

**Action:** Replace with placeholders or remove sensitive links.

### ✅ Step 8: Test Build Without Secrets

```bash
# Create minimal .env with placeholders
echo "PORT=5000" > backend/.env.test
echo "JWT_SECRET=test_secret_minimum_32_characters_long" >> backend/.env.test
echo "SUPABASE_URL=https://placeholder.supabase.co" >> backend/.env.test
echo "SUPABASE_ANON_KEY=placeholder_key" >> backend/.env.test

# Try to build
cd backend && npm install
cd ../frontend && npm install

# Remove test file
rm backend/.env.test
```

### ✅ Step 9: Review Commit History

```bash
# Check recent commits for sensitive data
git log --all --full-history --source -- "*/.env"
git log -p | grep -i "password\|secret\|key\|token"

# If found, rewrite history (nuclear option)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch **/.env" \
  --prune-empty --tag-name-filter cat -- --all
```

### ✅ Step 10: Final Verification

Run these commands before `git push`:

```bash
# 1. Check staging area
git status

# 2. Verify no .env files
git ls-files | grep "\.env$"
# Should be empty

# 3. Check for large files
git ls-files | xargs ls -lh | sort -k5 -hr | head -20

# 4. Dry run to see what will be pushed
git push --dry-run

# 5. If everything looks good
git push origin main
```

## 🛡️ After Publishing

### Monitor Your Repository

1. **GitHub Security Alerts:**
   - Enable Dependabot alerts
   - Review security advisories
   - Keep dependencies updated

2. **Secret Scanning:**
   - GitHub automatically scans for exposed secrets
   - Act immediately if alerts appear
   - Rotate compromised credentials

3. **Regular Audits:**
   ```bash
   # Weekly security check
   npm audit
   
   # Update dependencies
   npm update
   
   # Check for outdated packages
   npm outdated
   ```

## 🚨 If You Accidentally Exposed Secrets

### Immediate Actions:

1. **Rotate All Credentials:**
   ```bash
   # Generate new JWT secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   
   # Create new Supabase project or rotate keys
   # Update all environment variables
   ```

2. **Remove from Git History:**
   ```bash
   # Use BFG Repo-Cleaner (recommended)
   brew install bfg  # or download from bfg-repo-cleaner
   
   bfg --delete-files .env
   bfg --replace-text passwords.txt  # File with secrets to replace
   
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   
   git push --force
   ```

3. **Notify Users:**
   - Post security notice if data was compromised
   - Force password resets if necessary
   - Update documentation

4. **Review and Learn:**
   - Document what went wrong
   - Update security procedures
   - Add pre-commit hooks to prevent future issues

## 🔧 Setup Pre-commit Hooks

Install git-secrets to prevent committing credentials:

```bash
# Install git-secrets
brew install git-secrets  # macOS
# or
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
make install

# Setup in your repo
cd /path/to/bus-reservation-system
git secrets --install

# Add patterns to prevent
git secrets --register-aws
git secrets --add 'password\s*=\s*["\047]?[^\s]*'
git secrets --add 'secret\s*=\s*["\047]?[^\s]*'
git secrets --add 'api[_-]?key\s*=\s*["\047]?[^\s]*'
git secrets --add 'supabase\.co'

# Scan current repo
git secrets --scan
```

## 📚 Additional Tools

- **truffleHog:** Scan git history for secrets
- **GitGuardian:** Automated secret detection
- **git-crypt:** Encrypt sensitive files in repo
- **Vault by HashiCorp:** Manage secrets centrally

---

**Remember:** It's better to be paranoid about security than to deal with a breach!

✅ **Checklist complete? Time to push!**

```bash
git add .
git commit -m "Initial commit - secure configuration"
git push origin main
```
