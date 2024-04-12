class University(object):

    _id = None
    name = None

    def __init__(self, objID=None, name=None):
        self._id = objID
        self.name = name

    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)

    def __repr__(self):
        return '<university {}: {}>'.format(self._id, self.name)
    

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