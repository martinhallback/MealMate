

class Purchase(object):
    _id = None
    sellerRating = None
    reviewText = None
    date = None
    quantity = None
    totalPrice = None
    advertisement = None
    buyer = None
    seller = None


    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)


    def __repr__(self):
        return '<purchase {}: {}>'.format(self._id, self.advertisement, 
                                          self.buyer, self.seller, self.date, 
                                          self.quantity, self.totalPrice, 
                                          self.sellerRating, self.reviewText)   

    def serialise_client(self):
        obj = self.__dict__
        obj['_id'] = str(self._id)
        obj['buyer'] = str(self.buyer)
        obj['seller'] = str(self.seller)
        obj['advertisement'] = str(self.advertisement)
        return self.remove_nulls(obj)
        
    def serialise_db(self):
        obj = self.__dict__
        return self.remove_nulls(obj)

    def serialise(self):
        return self.__dict__()
    
    #Helper functions
    def remove_nulls(self, inDict):
        #Removes nullvalues from inarg
        retDict = {} #retDict is a dictionary that will be returned
        for key in inDict:
            if inDict[key] is not None: #If the value of the key is not None
                retDict[key] = inDict[key] #Add the key and value to the retDict
        return retDict