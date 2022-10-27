import cloudinary
import cloudinary.uploader
import cloudinary.api
import json

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
      p = "steps/" + str(stepnum-1) + ".png"
    else:
      p = "objects/" + path + "/" + list(img.values())[0] + ".png"
    print(p)
    img = cloudinary.CloudinaryImage(p).image()
    stepnum = "steps/" + str(stepnum)
    cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)

def action_heat(d, stepnum):
  burner = "objects/apparatus/bunsen_burner.jpg"
  o_img = d[1]  # this is the overlay image
  o_path = list(o_img.keys())[0]
  if(o_path == "memory"):
    p2 = "!steps:" + str(stepnum-1) + "!"
  else:
    o_path = o_path.replace("/", ":")
    p2 = "!objects:" + o_path + ":" + list(o_img.values())[0] + "!"
  print(p2)
  print()

  img = cloudinary.CloudinaryImage(burner).image(transformation=[
      {'variables': [["$p", p2]]},
      {'overlay': "$p"},
      {'flags': "layer_apply", 'y': -250}
  ])
  stepnum = "steps/" + str(stepnum)
  cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)

def action_filter(d, stepnum):
  filter_flask="objects/apparatus/filter.jpg"
  o_img = d[1] #this is the overlay image
  o_path = list(o_img.keys())[0]
  if(o_path == "memory"):
    p2 = "!steps:" + str(stepnum-1) + "!"
  else:
    o_path = o_path.replace("/", ":")
    p2 = "!objects:" + o_path + ":" + list(o_img.values())[0] + "!" 
  img = cloudinary.CloudinaryImage(filter_flask).image(transformation=[
  {'variables': [["$p", p2]]},
  {'overlay': "$p"},
  {'angle' : 225},
  {'flags': "layer_apply", 'y': -185},
  ])
  stepnum = "steps/" + str(stepnum)
  cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)

def action_add(d, stepnum):
    print(d,stepnum)
    b_img = d[2] #this is the base image
    o_img = d[1] #this is the overlay image
    o_path = list(o_img.keys())[0]
    if(o_path == "memory"):
      p1 = "!steps:" + str(stepnum-1) + "!"
    else:
      o_path = o_path.replace("/", ":")
      p1 = "!objects:" + o_path + ":" + list(o_img.values())[0] + "!"
    
    b_path = list(b_img.keys())[0]
    if b_path=="memory":
      p2 = "steps/" + str(stepnum-1) + ".png"
    else:
      p2 = "objects/" + b_path + "/" + list(b_img.values())[0] + ".png" 
    #o_path = o_path.replace("/", ":")
    print(p1)
    print(p2)

    img=cloudinary.CloudinaryImage(p2).image(transformation=[
  {'variables': [["$p", p1]]},
  {'overlay': "$p"},
  {'angle' : 225},
  {'flags': "layer_apply", 'y': -185, 'x': 60},
  ])
    print(img)
    stepnum = "steps/" + str(stepnum)
    cloudinary.uploader.upload(img[10:-3], public_id =  stepnum)


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
  for step in data:
    stepnum = step[0]
    p = data[stepnum][0]
    #print(p)
    action = list(p.keys())[0]
    if action in action_list:
        func = func_mapping[action]
        func(data[step], int(stepnum))
    else:
        action_place(data[step], int(stepnum))