QR Menu System (Dynamic IP Server)
This project provides a lightweight server solution for digital menus, allowing businesses to manage their menus via a local network without the need for a static IP address.

Features
Portable Server: A packaged executable that starts the backend services with a single click.

Network Independence: Integrated support for tunneling services (e.g., Ngrok) to bypass static IP requirements and CGNAT issues.

Management Panel: Full-featured Django administration for real-time updates to items, prices, and categories.

Responsive Frontend: Fast and mobile-optimized React-based interface for customers.

Technical Architecture
The system functions by creating a secure tunnel from a local machine to the internet:

Backend: Django REST Framework (Python).

Frontend: React.js.

Tunneling: Layer providing external access to the local dynamic IP.

Database: SQLite for portability.

Installation and Setup
For Developers
Clone the repository:

Bash

git clone https://github.com/103105116107/QR-Menu-2.git
cd QR-Menu-2
Setup Backend:

Bash

cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
Start Tunnel:

Bash

ngrok http 8000
For Administrators (Using the EXE)
Run qr_server.exe located in the dist/ directory.

The application will automatically initialize the server and provide a public URL.

Access the management dashboard by appending /admin to the provided URL.

Packaging
The server executable is generated using PyInstaller:

Bash

pyinstaller --onefile --noconsole run_server.py
License
This project is licensed under the MIT License - see the LICENSE file for details.
