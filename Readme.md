**Xendit Coding Exercise**
Provided exercise is an example implementation of API based on NodeJS. This API allows to store and read Rides.
To get started simply ensure you are running nodeJS >=8.6 but <=10. However, development was done under the 10.13.0 LTS, so keep that in mind.
To install dependencies use

> npm ci

or you also free to use

> npm install

Once done just simply run

> npm start

or dev runs use

> npm run dev

to get the server up and running on the port specified in the PORT env variable or on the 8010 port as a fallback if none is specified.

Also you can use debug mode. Debugging profile is set.

Once you are live you can use your favorite tool to access the API

API is documented with Swagger and is available on the `/api-docs`.

Use GET `/health`route for liveness check. 200 status is expected.
Use POST `/rides` with JSON body, containing fields:

     startLat: decimal >=-90 and <=90;
     startLong: decimal >=-180 and <=180;
     endLat: decimal >=-90 and <=90;
     endLong: decimal >=-180 and <=180;
     riderName: string with >1 chars;
     driverName: string with >1 chars;
     driverVehicle: string with >1 chars

in respose you will get created Ride object witl auto-generated

    id: string
    created: date

and fields you passed in.

Use GET `/rides` route for a list of existing rides. An array of Rides is expected to be returned.
Use GET `/rides/{id}` route for an existing ride. Rides object is expected to be returned.
