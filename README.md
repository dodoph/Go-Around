# Go-Around

[Project DEMO](https://recordit.co/Ecbl4y53gz)

![](around.gif)

## Brief Summary

Go-Around is an geo-based social network application which provides interesting services. Our registered users can post their images, search nearby posts and

## Backend

* Built a scalable web service in Go to handle posts and deployed to Google Cloud (GKE) for better scaling
* Utilized ElasticSearch (GCE) to provide geo-location based search functions such that users can search nearby posts within a distance (e.g. 200km)
* Used Google Vision API to annotate images for analysis and clustering
* Used JSON Web Token(JWT) for user authentication

## Frontend

* Built a geo-based social network web application with React JS.
* Implemented basic token based registration/login/logout flow with React Router v4 and server-
side user authentication with JWT.
* Implemented features such as "Create Post", "Nearby Posts As Gallery" and "Nearby Posts In Map"
with Ant Design, GeoLocation API and Google Map API.

## Project Structure

![](structure.png)

## Implemention

1. Implement Authentication with JSON Web Token(JWT)


## References

* [Example of generate token based on jwt-go library](https://godoc.org/github.com/dgrijalva/jwt-go#example-New--Hmac)
