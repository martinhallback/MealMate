from main import bcrypt

class User(object):

    def __init__(self, objID, email=None, pwHash=None, phoneNumber=None, fullName=None, 
                 PNumber=None, isVerified=None, uni=None, studentID=None, homeAddress=None, 
                 sellLocation=None, isAdmin=None):
        self.id = objID
        self.password_hash = pwHash
        self.name = fullName
        self.phone_number = phoneNumber
        self.personal_number = PNumber
        self.is_verified = isVerified
        self.university = uni
        self.student_id = studentID
        self.address = homeAddress
        self.location = sellLocation
        self.is_admin = isAdmin

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<user {}: {}, email: {}, is_admin: {}>'.format(self.id, self.name, self.email, self.is_admin)
   
    def serialize(self):
        return dict(id = self.id, pw_hash = self.pw_hash, name = self.name, 
                    phone_number = self.phone_number, personal_number = self.personal_number, is_verified = self.is_verified, 
                    university = self.university, student_id = self.student_id, address = self.address, location = self.location,
                    is_admin = self.is_admin)
