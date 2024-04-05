class Advertisement(object):
    
    _id = None
    dishName = None
    description = None
    cookDate = None
    quantity = None
    portionPrice = None
    imagePath = None
    sellerID = None
    protein = None
    allergy = None
    

    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)
            
    
    def serialise_client(self):
        obj = self.__dict__
        obj['_id'] = str(self._id)
        obj['sellerID'] = str(self.sellerID)
        for prot in obj['protein']:
            prot = str(prot)
        for aller in obj['allergy']:
            aller = str(aller)
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