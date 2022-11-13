import cloudinary
import cloudinary.uploader
import cloudinary.api
import json
import time

cloudinary.config( 
  cloud_name = "dn7jk2swt", 
  api_key = "231912914449568", 
  api_secret = "8E5z7c_lJ89ebrAqcpfUaz8ZRUw" 
)

#action_list = ["add", "heat", "filter"]

# with open("data.json") as json_file:
#     data = json.load(json_file)

def action_place(d, stepnum):
    img = d[0]
    path = list(img.keys())[0]
    if path=="memory":
      #time.sleep(3)
      p = "memory/" + str(stepnum-1) + ".png"
    else:
      p = "objects/" + path + "/" + list(img.values())[0] + ".png"
    print(p)
    img = cloudinary.CloudinaryImage(p).image()
    memorynum = "memory/" + str(stepnum)
    stepnum = "steps/" + str(stepnum)
    step = cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)
    cloudinary.uploader.upload(img[10:-3], public_id =  memorynum)
    return step['url']


def action_heat(d, stepnum):
  burner = "objects/apparatus/bunsen_burner.jpg"
  o_img = d[1]  # this is the overlay image
  o_path = list(o_img.keys())[0]
  if(o_path == "memory"):
    #time.sleep(3)
    p2 = "!memory:" + str(stepnum-1) + "!"
    memory_path = "memory/"+str(stepnum-1)+".png"
  else:
    memory_path = "objects/"+o_path+"/" + list(o_img.values())[0] + ".png"
    o_path = o_path.replace("/", ":")
    p2 = "!objects:" + o_path + ":" + list(o_img.values())[0] + "!"
  print(p2)
  print()
  img = cloudinary.CloudinaryImage(burner).image(transformation=[
      {'variables': [["$p", p2]]},
      {'overlay': "$p"},
      {'flags': "layer_apply", 'y': -110}
      #was -250
  ])
  memory_img = cloudinary.CloudinaryImage(memory_path).image()
  memorynum = "memory/" + str(stepnum)
  stepnum = "steps/" + str(stepnum)
  step = cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)
  cloudinary.uploader.upload(memory_img[10:-3], public_id =  memorynum)
  return step['url']

def action_filter(d, stepnum):
  filter_flask="objects/apparatus/filter.jpg"
  o_img = d[1] #this is the overlay image
  o_path = list(o_img.keys())[0]
  if(o_path == "memory"):
    #time.sleep(3)
    p2 = "!steps:" + str(stepnum-1) + "!"
    memory_path = "memory/"+str(stepnum-1)+".png"
  else:
    memory_path = "objects/"+o_path+"/" + list(o_img.values())[0] + ".png"
    o_path = o_path.replace("/", ":")
    p2 = "!objects:" + o_path + ":" + list(o_img.values())[0] + "!" 
  
  memory_img = cloudinary.CloudinaryImage(memory_path).image()
  img = cloudinary.CloudinaryImage(filter_flask).image(transformation=[
  {'variables': [["$p", p2]]},
  {'overlay': "$p"},
  {'angle' : 225},
  {'flags': "layer_apply", 'y': -185},
  ])
  memorynum = "memory/" + str(stepnum)
  stepnum = "steps/" + str(stepnum)
  res = cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)
  cloudinary.uploader.upload(memory_img[10:-3], public_id =  memorynum)
  return res['url']

def action_add(d, stepnum):
    print(d,stepnum)
    b_img = d[2] #this is the base image
    o_img = d[1] #this is the overlay image
    o_path = list(o_img.keys())[0]
    if(o_path == "memory"):
      #time.sleep(3)
      p1 = "!memory:" + str(stepnum-1) + "!"
    else:
      o_path = o_path.replace("/", ":")
      p1 = "!objects:" + o_path + ":" + list(o_img.values())[0] + "!"
    
    b_path = list(b_img.keys())[0]
    if b_path=="memory":
      p2 = "memory/" + str(stepnum-1) + ".png"
    else:
      p2 = "objects/" + b_path + "/" + list(b_img.values())[0] + ".png"

    memory_img =  cloudinary.CloudinaryImage(p2).image()
    #o_path = o_path.replace("/", ":")
    print("MEMORY IMAGE:", memory_img)
    print(p1)
    print(p2)

    img=cloudinary.CloudinaryImage(p2).image(transformation=[
  {'variables': [["$p", p1]]},
  {'overlay': "$p"},
  {'angle' : 225},
  {'flags': "layer_apply", 'y': -120, 'x': 30},
  ])
    print(img)
    memorynum = "memory/" + str(stepnum)
    stepnum = "steps/" + str(stepnum)
    res = cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)
    re = cloudinary.uploader.upload(memory_img[10:-3], public_id =  memorynum)
    print("MEMORY URL",re['url'])
    return res['url']


# func_mapping = {
#     'add' : action_add,
#     'heat' : action_heat,
#     'filter': action_filter
# }
# for step in data:
#     stepnum = step[0]
#     p = data[stepnum][0]
#     #print(p)
#     action = list(p.keys())[0]
#     if action in action_list:
#         func = func_mapping[action]
#         func(data[step], int(stepnum))
#     else:
#         action_place(data[step], int(stepnum))

def cgi():
  func_mapping = {
    'add' : action_add,
    'heat' : action_heat,
    'filter': action_filter
  }
  action_list = ["add", "heat", "filter"]
  with open("tagged_text.json") as json_file:
    data = json.load(json_file)
  urls=[]
  for step in data:
    stepnum = step[0]
    p = data[stepnum][0]
    #print(p)
    action = list(p.keys())[0]
    if action in action_list:
        func = func_mapping[action]
        stepURL=func(data[step], int(stepnum))
    else:
        stepURL=action_place(data[step], int(stepnum))
    urls.append(stepURL)
  #print(urls)
  return urls
