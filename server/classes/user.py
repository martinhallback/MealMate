from main import bcrypt

class User(object):

    def __init__(self, objID=None, email=None, pwHash=None, phoneNumber=None, fullName=None, 
                 PNumber=None, isVerified=None, uni=None, studentID=None, homeAddress=None, 
                 sellLocation=None, isAdmin=None):
        self._id = objID
        self.email = email
        self.pwHash = pwHash
        self.fullName = fullName
        self.phone_number = phoneNumber
        self.PNumber = PNumber
        self.isVerified = isVerified
        self.university = uni
        self.studentID = studentID
        self.address = homeAddress
        self.location = sellLocation
        self.isAdmin = isAdmin

    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)


    def set_password(self, password):
        self.pwHash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.pwHash, password)

    def __repr__(self):
        return '<user {}: {}, email: {}, is_admin: {}>'.format(str(self._id), self.fullName, self.email, self.isAdmin)
    
    def serialise_client(self):
        obj = self.__dict__
        obj['_id'] = str(self._id)
        return self.remove_nulls(obj)
        
    def serialise_db(self):
        obj = self.__dict__
        return self.remove_nulls(obj)

    def serialise(self):
        return self.__dict__()
    
    #Helper functions
    def remove_nulls(self, inDict):
        #Removes nullvalues from inarg
        retDict = {}
        for key in inDict:
            if inDict[key] is not None:
                retDict[key] = inDict[key]
        return retDict




    """
    def serialise_existing(self):
        full_serialised = self.serialize()
        retDict = {}
        for key in full_serialised:
            if full_serialised[key] is not None:
                retDict[key] = full_serialised[key]
        return retDict
        
    def serialize(self):
        #OBS!!!! _id = self.id, is not included in the serialisation of the object
        return dict(email=self.email, pwHash = self.pwHash, name = self.name, 
                    phoneNumber = self.phone_number, personalNumber = self.personal_number, isVerified = self.is_verified, 
                    university = self.university, studentID = self.student_id, address = self.address, location = self.location,
                    isAdmin = self.is_admin)
    """