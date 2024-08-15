from flask import Blueprint, request, jsonify
from sqlalchemy.orm.attributes import flag_modified
from connection.database import db

# Import User Model
from models.User import User

# Create a Blueprint
user = Blueprint('users', __name__)


# Get A User
@user.route('/', methods=['POST'])
def get_all_saves():
    try:
        # Get Request Data
        data = request.get_json()
        if not 'email' in data:
            return jsonify({'message': 'No email provided'}), 400

        # Get User
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            user = User(
                email=data['email'],
                saved_palettes=[],
                saved_colors=[]
            )
        db.session.add(user)
        db.session.commit()
        user = User.query.filter_by(email=data['email']).first()

        return jsonify(user.serialize()), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    


# Get All Users (Testing Purposes)
@user.route('/all', methods=['GET'])
def get_all_users():
    try:
        # Get All Users
        users = User.query.all()
        return jsonify([user.serialize() for user in users]), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Save a Palette 
@user.route('/save-palette', methods=['POST'])
def save_palette():
    try:
        # Get Request Data
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400

        # Get User
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Check if Palette is provided
        if 'palette' not in data:
            return jsonify({'message': 'No palette provided'}), 400

        new_palette = data['palette']

        # Check if Palette is already saved
        for palette in user.saved_palettes:
            if palette == new_palette:
                return jsonify({'message': 'Palette already saved'}), 400
            
        # Add Palette to User List
        user.saved_palettes.insert(0,new_palette)

        # Flag as Modified to Reflect Changes, and Commit
        flag_modified(user, 'saved_palettes')
        db.session.commit()

        return jsonify({'message': 'Palette saved successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

# Save a Color
@user.route('/save-color', methods=['POST'])
def save_color():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        user = User.query.filter_by(email=data['email']).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        if 'color' not in data:
            return jsonify({'message': 'No color provided'}), 400
        
        new_color = data['color']

        for color in user.saved_colors:
            if color == new_color:
                return jsonify({'message': 'Color already saved'}), 400
            
        user.saved_colors.insert(0, new_color)

        flag_modified(user, 'saved_colors')
        db.session.commit()

        return jsonify({'message': 'Color saved successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
