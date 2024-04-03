from main import bcrypt

class Allergy(object):
    def __init__(self, objID=None, type=None):
        self.id = objID
        self.type = type

    def __repr__(self):
        return '<allergy {}: {}>'.format(self.id, self.type)
    


    def serialise_existing(self):
        full_serialised = self.serialize()
        retDict = {}
        for key in full_serialised:
            if full_serialised[key] is not None:
                retDict[key] = full_serialised[key]
        return retDict
        
    def serialize(self):
        #OBS!!!! _id = self.id, is not included in the serialisation of the object
        return dict(id = self.id,type=self.type)