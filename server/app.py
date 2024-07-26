# Import Dependencies
from flask import Flask
from flask_cors import CORS

# Import Database
from connection.database import db

# Import Seed Data
from seed_data import seedUsers


# Create an instance of Flask
def create_app():
    app = Flask(__name__, static_folder='client')
    CORS(app)

    # Configure the DB
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize the DB
    db.init_app(app)

    # Import Routes
    from routes.user import user

    # Register Blueprints
    app.register_blueprint(user, url_prefix='/users')


    with app.app_context():
        db.create_all()
        seedUsers()

    return app


# Database Setup
app = create_app()


# Run the Application
if __name__ == '__main__':
    app.run(debug=True)