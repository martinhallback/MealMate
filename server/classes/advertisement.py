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
        if 'protein' in obj:
            for i in range(0,len(obj['protein'])):
                obj['protein'][i] = str(obj['protein'][i])
        if 'allergy' in obj:
            for i in range(0,len(obj['allergy'])):
                obj['allergy'][i] = str(obj['allergy'][i])
        print("Done with serialisations of: ", obj['dishName'])
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