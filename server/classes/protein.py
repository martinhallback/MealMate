from main import bcrypt

class Protein(object):
    def __init__(self, type = None, class_ = None):
        self.type = type
        self.class_ = class_
       

    def __repr__(self):
        return '<protein {}: {}>'.format(self.class_, self.type)
    


    def serialise_existing(self):
        full_serialised = self.serialize()
        retDict = {}
        for key in full_serialised:
            if full_serialised[key] is not None:
                retDict[key] = full_serialised[key]
        return retDict
        
    def serialize(self):
        #OBS!!!! _id = self.id, is not included in the serialisation of the object
        return dict(type=self.type, class_=self.class_)