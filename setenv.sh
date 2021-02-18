#!/bin/bash

MONGO_HOST=$(kubectl -n dev describe svc/mongodb | grep IP: | awk '{print $2;}')
MONGO_URI="mongodb:\/\/$MONGO_HOST\/shop"
echo $MONGO_URI
sed -i "s/MONGO_URI=.*/MONGO_URI=$MONGO_URI/g" .env