#!/bin/bash

echo "🚀 Starting QuoteRight ZA Application..."

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check if ports are available
echo "Checking ports..."
if ! check_port 8000; then
    echo "❌ Port 8000 (backend) is already in use. Please stop the process using that port."
    exit 1
fi

if ! check_port 3000; then
    echo "❌ Port 3000 (frontend) is already in use. Please stop the process using that port."
    exit 1
fi

echo "✅ Ports are available"

# Start backend server
echo "🔧 Starting backend server..."
cd quoteright-za/backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt > /dev/null 2>&1

echo "Starting FastAPI server on http://localhost:8000"
python main.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd ../frontend
npm install > /dev/null 2>&1

echo "Starting React development server on http://localhost:3000"
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 QuoteRight ZA is starting up!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servers stopped"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait 