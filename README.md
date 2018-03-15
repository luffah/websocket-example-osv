# WebSocket example for an open source vehicle
An example of representation of vehicles datas sent with websockets. 
Currently it only show speed of a vehicle using network (Wifi - intended to be used with LoRa with some adaptations).

# Usage example

* Client side : The vehicle serve the data

    BMS Signal -> RaspberryPi (server) -> Network
    
* Server side :
 
    Internet -> WebBrowser (clientw)

# Start the server

It requires WebSocket with Node.js (https://nodejs.org/en/) (On Raspbian : `sudo apt install -y nodejs`).
```
npm install websocket
```

Start the server :
```
nodejs websocket-server.js  
```

# Links
https://www.flossmanualsfr.net/camposv18 : Global documentation of the event which hosted the project
https://elinux.org/OSVehicle : 
https://github.com/rzr/rzr-example/tree/sandbox/rzr/devel/ws/master : code which serve as a basis for the client <-> server 


