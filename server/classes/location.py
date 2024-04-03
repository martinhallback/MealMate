from main import bcrypt

class Location(object):
    def __init__(self, objID=None, area=None, city=None):
        self.id = objID
        self.area = area
        self.city = city

    def __repr__(self):
        return '<location {}: {}>'.format(self.id, self.area, self.city)
    
    def serialise_existing(self):
        full_serialised = self.serialize()
        retDict = {}
        for key in full_serialised:
            if full_serialised[key] is not None:
                retDict[key] = full_serialised[key]
        return retDict
        
    def serialize(self):
        #OBS!!!! _id = self.id, is not included in the serialisation of the object
        return dict(area=self.area, city=self.city)