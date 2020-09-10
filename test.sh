#!/bin/bash

curl -s -X POST -H "Content-Type: application/json" -d '{ "url": "http://localhost:8000/event"}' http://localhost:8000/subscribe/topic1
curl -s -X POST -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:8000/publish/topic1
