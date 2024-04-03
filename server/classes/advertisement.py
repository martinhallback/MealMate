class Advertisement(object):
    
    
    def __init__(self, objID=None, dishName=None, description=None, cookDate=None, quantity=None, 
                 portionPrice=None, imagePath=None ,sellerID=None):
        self.id = objID
        self.dish_name = dishName
        self.desc = description
        self.cook_date = cookDate
        self.quantity = quantity
        self.portion_price = portionPrice
        self.image_path = imagePath
        self.seller_id = sellerID
    
    def serialise_existing(self):
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
