class Advertisement(object):
    
    
    def __init__(self, objID=None, dishName=None, description=None, cookDate=None, quantity=None, 
                 portionPrice=None, imagePath=None ,sellerID=None):
        self._id = objID
        self.dish_ndishNameame = dishName
        self.description = description
        self.cookDate = cookDate
        self.quantity = quantity
        self.portionPrice = portionPrice
        self.imagePath = imagePath
        self.sellerID = sellerID

    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)
            
    
    def serialise_client(self):
        obj = self.__dict__
        obj['_id'] = str(self._id)
        obj['sellerID'] = str(self.sellerID)
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


    """
    def serialise_client(self):
        full_serialised = self.serialize()
        retDict = {}
        for key in full_serialised:
            if full_serialised[key] is not None:
                retDict[key] = full_serialised[key]
        return retDict
    
    def serialize(self):
        #Currently does not include IDs, wait until DB sprint to implement
        return dict(dishName=self.dish_name, description=self.dish_name, cookDate=self.cook_date,
                    quantity=self.quantity, portionPrice=self.portion_price, imagePath=self.image_path)
    
    def serialise_db(self):
        return None"""