@echo off
echo.
echo ============================================
echo   Testing Forgot Password Feature
echo ============================================
echo.

REM Step 1: Request reset code
echo Step 1: Requesting reset code for test@example.com...
curl -X POST http://localhost:5000/api/auth/forgot-password -H "Content-Type: application/json" -d "{\"email\":\"test@example.com\"}" > temp_response.txt 2>&1

echo.
echo Response:
type temp_response.txt
echo.
echo.

REM Extract reset code (manual step - show the response)
echo ============================================
echo   Copy the resetCode from above response
echo   Then run the reset command manually:
echo.
echo   curl -X POST http://localhost:5000/api/auth/reset-password ^
echo        -H "Content-Type: application/json" ^
echo        -d "{\"email\":\"test@example.com\",\"resetCode\":\"YOUR_CODE\",\"newPassword\":\"newpass123\"}"
echo.
echo ============================================

del temp_response.txt 2>nul
pause
