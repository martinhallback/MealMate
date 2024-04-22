from main import bcrypt
from bson import ObjectId

class User(object):

    _id = None
    email = None
    pwHash = None
    name = None
    phoneNumber = None
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

    def set_all_attributes(self, inDict):
        attributes_to_remove = ['_id', 'email', 'pwHash', 'isVerified', 'isAdmin']
        for item in inDict:
            if item in attributes_to_remove:
                inDict.pop(item)
        if 'password' in inDict:
            self.set_password((inDict['password']))
            inDict.pop('password')
        for k,v in inDict.items():
            self.__setattr__(k,v)

    def set_password(self, password):
        self.pwHash = bcrypt.generate_password_hash(password).decode('utf8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.pwHash, password)

    def verify(self):
        self.isVerified = True

    def __repr__(self):
        return '<user {}: {}, email: {}, is_admin: {}>'.format(str(self._id), self.fullName, self.email, self.isAdmin)
    
    def serialise_client(self):
        obj = self.__dict__
        obj['_id'] = str(self._id)
        if self.university is not None:
            obj['university'] = str(self.university)
        if self.location is not None:
            obj['location'] = str(self.location)
        return self.remove_nulls(obj)
    
    def unserialise_from_client(self):
        if self._id is not None:
            self._id = ObjectId(self._id)
        if self.university is not None:
            self.university = ObjectId(self.university)
        if self.location is not None:
            self.location = ObjectId(self.location)
        
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