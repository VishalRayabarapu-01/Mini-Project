from django.db import models

import tensorflow as tf
import numpy as np 
import matplotlib.pyplot as plt 
from keras.layers import Lambda, Input, GlobalAveragePooling2D,BatchNormalization
from keras.applications.inception_v3 import InceptionV3, preprocess_input
from keras.applications.xception import Xception, preprocess_input
from tensorflow.keras.preprocessing.image import load_img
from tensorflow.keras.models import Model
from tensorflow.keras.models import load_model
import pickle

class Prediction:
        
    def images_to_array_Multiple(self,test_path, img_size = (331,331)):
        test_filenames = [test_path + fname for fname in os.listdir(test_path)]

        data_size = len(test_filenames)
        images = np.zeros([data_size, img_size[0], img_size[1], 3], dtype=np.uint8)
        
        
        for ix,img_dir in enumerate(test_filenames):
            img = load_img(img_dir, target_size = img_size)
            images[ix]=img
            del img
        print('Ouptut Data Size: ', images.shape)
        return images
    
    def  images_to_array_single(self,img_path,img_size=(331,331)):
         image=load_img(img_path,target_size=img_size)
         image=np.array(image)
         image = np.expand_dims(image, axis=0)
         return image
    
    def get_features(self,model_name, model_preprocessor, input_size, data):

        input_layer = Input(input_size)
        preprocessor = Lambda(model_preprocessor)(input_layer)
        base_model = model_name(weights='imagenet', include_top=False,
                                input_shape=input_size)(preprocessor)
        avg = GlobalAveragePooling2D()(base_model)
        feature_extractor = Model(inputs = input_layer, outputs = avg)
        
        #Extract feature.
        feature_maps = feature_extractor.predict(data, verbose=1)
        print('Feature maps shape: ', feature_maps.shape)
        return feature_maps
    
    def extact_features(self,data):
        img_size=(331,331,3)
        inception_features = self.get_features(InceptionV3, preprocess_input, img_size, data)
        xception_features =self.get_features(Xception, preprocess_input, img_size, data)
        final_features = np.concatenate([inception_features,
                                        xception_features,
                                        ],axis=-1)
       # print('Final feature maps shape', final_features.shape)
        return final_features

    def load_data(self):
        with open('DogPrediction/model/labels.pickle', 'rb') as f:
            loaded_data = pickle.load(f)
        return loaded_data
    
    def Predict(self,img_path,imag_paths=None):
        if imag_paths is not None :
            pred_images = self.images_to_array_Multiple(imag_paths)
        else:
            pred_images=self.images_to_array_single(img_path)

        model=load_model('DogPrediction/model/DogPred_Model.h5')
        features=self.extact_features(pred_images)
        #features=tf.expand_dims(features,axis=0)
        prediction=model.predict(features)  

        label=np.argmax(prediction)
        #print(label)
        # print(prediction.shape)
        # print(label)
        # print(prediction)
        
        class_labels=self.load_data()
       # print(class_labels)
        class_label=class_labels[label]      
        probabilities=prediction*100
        return class_label ,probabilities