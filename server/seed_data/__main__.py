from models.User import User
import json 
from connection.database import db

def seedUsers():
    db.session.query(User).delete()

    with open('server/seed_data/seedUsers.json') as f:
        data = json.load(f)

        for user in data:
            new_user = User(
                email=user['email'],
                saved_palettes=user['saved_palettes'],
                saved_colors=user['saved_colors']
            )
            db.session.add(new_user)
            db.session.commit()

        print("Data Seeded Successfully")