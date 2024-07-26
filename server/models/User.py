# User Model

# Import Dependencies
from connection.database import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    saved_palettes = db.Column(db.JSON, nullable=False)
    saved_colors = db.Column(db.JSON, nullable=False)

    # Init Method: Initialize the User Model
    def __init__(self, email, saved_palettes, saved_colors):
        self.email = email
        self.saved_palettes = saved_palettes if saved_palettes else []
        self.saved_colors = saved_colors if saved_colors else []

    # Serialize Method: Return the User Model as a Dictionary
    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'saved_palettes': self.saved_palettes,
            'saved_colors': self.saved_colors
        }