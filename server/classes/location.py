from main import bcrypt

class Location(object):
    
    _id = None
    area = None
    city = None

    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)

    def __repr__(self):
        return '<location {}: {}>'.format(self.id, self.area, self.city)
    

    def serialise_client(self):
        obj = self.__dict__
        obj['_id'] = str(self._id)
        return self.remove_nulls(obj)
        
    def serialise_db(self):
        obj = self.__dict__
        return self.remove_nulls(obj)

    def serialise(self):
        return self.__dict__()
    

    def remove_nulls(self, inDict):
        #Removes nullvalues from inarg
        retDict = {}
        for key in inDict:
            if inDict[key] is not None:
                retDict[key] = inDict[key]
        return retDict
