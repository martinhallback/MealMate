from bson import ObjectId
from datetime import datetime

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
    address = None
    

    def __init__(self, inDict):
        for k,v in inDict.items():
            self.__setattr__(k,v)
            

    def set_seller_id(self, seller_id):
        self.sellerID = seller_id

    def decode_object_list_from_aggregate(self, protein_docs=True):
        new_list=[]
        if protein_docs:
            for i in range(len(self.protein)):
                protein_obj = dict(self.protein[i])
                new_list.append(protein_obj["_id"])
                print(protein_obj['source'])
            self.protein = new_list
        else:
            return False

    def unserialise_from_client(self):
        self._id = ObjectId(self._id)
        if self.sellerID is not None:
            self.sellerID = ObjectId(self.sellerID)
        if self.protein is not None:
            for i in range(len(self.protein)):
                self.protein[i] = ObjectId(self.protein[i])
        if self.allergy is not None:
            for i in range(len(self.allergy)):
                self.allergy[i] = ObjectId(self.allergy[i])
        if self.cookDate is not None:
            print(self.cookDate)
            try:
                self.cookDate=datetime.fromisoformat(self.cookDate)
            except ValueError:
                self.cookDate = datetime.strptime(self.cookDate, "%Y-%m-%dT%H:%M:%S.%fZ")
            except:
                print("Date not updating")
    

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