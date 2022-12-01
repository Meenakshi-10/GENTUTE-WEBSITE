from PIL import Image


def convertImage(pic):
     img = Image.open(pic)
     img = img.convert("RGBA")

     datas = img.getdata()

     newData = []

     for item in datas:
         if item[0] == 255 and item[1] == 255 and item[2] == 255:
             newData.append((255, 255, 255, 0))
         else:
             newData.append(item)

     img.putdata(newData)
     print("Successful")
     return img


pic =r"/Users/samhitharao/Downloads/objects/litmus/red.png"



image=convertImage(pic)
image.save(r"/Users/samhitharao/Downloads/objects/litmus/red","PNG") 