@echo off
echo 🚀 Starting QuoteRight ZA Application...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo ✅ Dependencies found

REM Start backend server
echo 🔧 Starting backend server...
cd quoteright-za\backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat
pip install -r requirements.txt >nul 2>&1

echo Starting FastAPI server on http://localhost:8000
start "Backend Server" python main.py

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server
echo 🎨 Starting frontend server...
cd ..\frontend
npm install >nul 2>&1

echo Starting React development server on http://localhost:3000
start "Frontend Server" npm start

echo.
echo 🎉 QuoteRight ZA is starting up!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
echo Press any key to stop servers...
pause >nul

REM Kill the processes (this is a simple approach)
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im node.exe >nul 2>&1

echo ✅ Servers stopped
pause 