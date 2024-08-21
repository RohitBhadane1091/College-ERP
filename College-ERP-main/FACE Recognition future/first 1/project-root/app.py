from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for attendance (for demonstration purposes)
attendance_records = []

@app.route('/attendance', methods=['POST'])
def record_attendance():
    data = request.get_json()
    username = data.get('username')
    date = data.get('date')
    status = data.get('status')
    
    record = {
        'username': username,
        'date': date,
        'status': status
    }
    attendance_records.append(record)
    return jsonify({'message': 'Attendance recorded'}), 201

@app.route('/attendance', methods=['GET'])
def get_attendance():
    username = request.args.get('username')
    user_records = [record for record in attendance_records if record['username'] == username]
    return jsonify(user_records), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
