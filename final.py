from urllib.request import urlopen
import urllib
import requests
import cssutils
from bs4 import BeautifulSoup
import pyrebase
import sys
config = {
  "apiKey": "AIzaSyCy8iaGm3ewx4SPd-QmYRoBNl91Nr6vbFI",
   "authDomain": "badhusha-project.firebaseapp.com",
    "databaseURL": "https://badhusha-project.firebaseio.com",
    "projectId": "badhusha-project",
    "storageBucket": "badhusha-project.appspot.com",
    "messagingSenderId": "605385137665"
 }
firebase=pyrebase.initialize_app(config)
db=firebase.database()
class FoodFetch:
    global soup
    global title
    dis=input("Enter the URL ")
    if "www.allrecipes.com" not in dis:
        print("Not valid url")
        sys.exit()
    source=requests.get(dis).text
    soup=BeautifulSoup(source,'lxml')
    title=soup.find('h1',{"class":"recipe-summary__h1"}).text ##This gets the title of recipe
    data={"dishName": title}
    db.child('foods').child(title).set(data)
    def ingredient(self):
        contents=soup.find_all('ul',{"class":"dropdownwrapper"})
        for content in contents:
            lsts=content.find_all('li',{"class":"checkList__line"})
            for lst in lsts:
                try:
                    itm=lst.find('span',{"class":"recipe-ingred_txt added"}).text
                    ing={"ingredient": itm}
                    db.child("foods").child(title).child("ingredients").push(ing)
                except AttributeError:
                    continue

    def making(self):
        tils=soup.find('ol',{"class":"list-numbers recipe-directions__list"})
        liss=tils.find_all('li',{"class":"step"})
        for li in liss:
            span=li.find('span',{"class":"recipe-directions__list--item"}).text
            steps={"steps": span}
            db.child("foods").child(title).child("method").push(steps)


    def img_ret(self):
        img_item=soup.find('ul',{"class":"photo-strip__items"})
        img_lis=img_item.find('li')
        img_a=img_lis.img['src']
        Urls={"imgURL": img_a}
        db.child("foods").child(title).child("imgURL").push(Urls)
        print('Done')

sc_obj=FoodFetch()
sc_obj.ingredient()
sc_obj.making()
sc_obj.img_ret()

