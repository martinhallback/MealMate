from main import bcrypt

class Protein(object):
    def __init__(self, objID=None, type=None, source=None):
        self._id = objID
        self.type = type
        self.source = source

    def __repr__(self):
        return '<protein {}: {}>'.format(self.source, self.type)
    

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
        return dict(type=self.type, class_=self.source)"""