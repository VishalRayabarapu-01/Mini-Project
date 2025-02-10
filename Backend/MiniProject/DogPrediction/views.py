from django.shortcuts import render
from DogPrediction.models import Prediction
from django.views.decorators.http import require_http_methods
from django.template import loader
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt

import os

@csrf_exempt
@require_http_methods(['POST'])
def predict(request):

    if request.method=="POST":
       # Get the data from the POST request
        image=request.FILES['image']
        path='DogPrediction/static/Images'
        with open(os.path.join(path, image.name), 'wb+') as destination:
                for chunk in image.chunks():
                    destination.write(chunk)
        filename=path+ "/"+str(image)

        URL='http://localhost:8000'
        # img_path='DogPrediction/static/Images/varun_dog.jpg'
        img_URl=URL+'/static/Images/'+str(image)
        obj=Prediction()
        label=obj.Predict(filename)
        return JsonResponse({'breed': label[0],'image':img_URl}, status=200)