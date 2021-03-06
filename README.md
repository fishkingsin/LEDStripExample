Digitizing ideas - electronic integration
===============

Introduction
===============
SCM 2014 OWeek Workshop
This repo is simple demostarte a concept of digital media and electronic integration 

* Duration is a timeline for creative coding. Create live performances, interactive installations, and music visualizations by synchronously composing servos, lighting, and projection. [duration.cc](http://www.duration.cc/). This time Duration help you to plan your color changes.
* Processing is a programming language, development environment, and online community. Java base. This time processing helps you to transform data to controller broad.
* Arduino is an open-source electronics platform based on easy-to-use hardware and software. It's intended for anyone making interactive projects. This time arduino helps you control LED Strip.



Installation
===============
1. Install Duration
2. Install Processing
3. Install Arduino
4. update Arduino Source Code
5. wiring up
6. run processing project
7. run duration project

Tutorial
===============
go to [Tutorial](https://github.com/fishkingsin/Digitizing_ideas-electronic_integration/wiki/Tutorial) for more information

Duration 
===============
http://www.duration.cc/

Processing 
===============
http://processing.org/

Arduino 
===============
http://arduino.cc/en/Main/Software

**Arduino Installation**

http://arduino.cc/en/Guide/Windows#toc4

Node
==============

http://nodejs.org/download/

Wiring 
===============
http://www.seeedstudio.com/wiki/Grove_-_LED_Strip_Driver

- PIN 2 -> CLK
- PIN 3 -> DIO
- GND -> GND

* ![arduino to LED Strip Driver](screen_01.JPG)
* ![LED Strip Driver to LED Strip Driver](screen_03.JPG)
* ![LED Strip Driver to LED Strip ](screen_04.JPG)
* ![Power Source to LED Strip Driver](screen_05.JPG)

Processing Project 
===============

launch Processing

File->Open->"path_to"/Digitizing_ideas-electronic_integration/Processing/DurationSerialBridge/DurationSerialBridge.pde


Duration Project 
===============

launch Duration

![launch Duration](screen_06.png)

"Open Project"->"path_to"/Digitizing_ideas-electronic_integration/Duration/SCM_OWeek_DurationProject->open

![Open Project](screen_07.png)

**enssential track name**

    * channel0
    * channel1
    * audio

more detail goges to 

[![Duration] (https://i.vimeocdn.com/video/433198988.webp?mw=960)](https://vimeo.com/59654979)

Node Project
===============


[OSC to Websocket ](Node/oscToWebsocketBridge)

**Video Demo**

[![Demo](https://i.vimeocdn.com/video/485993848.webp?mw=960)](https://vimeo.com/103685129/)
