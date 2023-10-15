from flask import Flask, render_template, request, redirect, url_for, session
from flask_bcrypt import Bcrypt

app = Flask(__name__)
bcrypt = Bcrypt(app)
app.secret_key = "your_secret_key"  # Change this to a strong secret key

users = {}  # A dictionary to store user data

@app.route('/')
def home():
    if 'username' in session:
        return render_template('secured_page.html', username=session['username'])
    return render_template('index.html')

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if username in users:
            return 'Username already exists. Choose another username.'
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        users[username] = {'username': username, 'password': hashed_password}
        return redirect(url_for('home'))

    return render_template('register.html')

@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if username in users and bcrypt.check_password_hash(users[username]['password'], password):
            session['username'] = username
            return redirect(url_for('home'))
        else:
            return 'Invalid username or password. Please try again.'

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
