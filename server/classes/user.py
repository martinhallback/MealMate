from main import bcrypt

class User(object):

    _id = None
    email = None
    pwHash = None
    fullName = None
    phone_number = None
    PNumber = None
    isVerified = None
    university = None
    studentID = None
    address = None
    location = None
    isAdmin = None

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