from main import bcrypt

class User(object):

    def __init__(self, objID=None, email=None, pwHash=None, phoneNumber=None, fullName=None, 
                 PNumber=None, isVerified=None, uni=None, studentID=None, homeAddress=None, 
                 sellLocation=None, isAdmin=None):
        self.id = objID
        self.email = email
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
    
    def serialise_existing(self):
        full_serialised = self.serialize()
        retDict = {}
        for key in full_serialised:
            if full_serialised[key] is not None:
                retDict[key] = full_serialised[key]
        return retDict
        
    def serialize(self):
        #OBS!!!! _id = self.id, is not included in the serialisation of the object
        return dict(email=self.email, pwHash = self.password_hash, name = self.name, 
                    phoneNumber = self.phone_number, personalNumber = self.personal_number, isVerified = self.is_verified, 
                    university = self.university, studentID = self.student_id, address = self.address, location = self.location,
                    isAdmin = self.is_admin)
