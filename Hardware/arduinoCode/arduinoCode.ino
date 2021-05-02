//Tanish Shah
//Arduino Code for SecureAndSafe

#include <HCSR04.h>
//https://github.com/gamegine/HCSR04-ultrasonic-sensor-lib

//setup
const int echoPin = 6;
const int trigPin = 7;
const int tiltPin = 13;
const int ledPin = 9;
const int buzzPin = 8;
const int lPin = A0;
int distance, lVal = 0;
int tVal = 1; //This is based on how you set up your testing
HCSR04 hc(trigPin,echoPin);

//physical outputs
void triggerAlarm(){
  digitalWrite(ledPin,HIGH);
  digitalWrite(buzzPin,HIGH);
  delay(1000);
  digitalWrite(ledPin,LOW);
  digitalWrite(buzzPin,LOW);
}

//change sensitivity as needed
void distMeasure(){
  int nDistance = hc.dist();
  if(nDistance <=distance - 1.5)
    {
      Serial.println("dcr");
      triggerAlarm();
    }
  distance = nDistance;
}

//set initial tval based on how it is connected
void tChange(){
  int t = digitalRead(tiltPin);
  if(t != tVal)
    {
      Serial.println("tsc");
      triggerAlarm();
    }
  tVal = t;
}

//change sensitivity as needed
//assuming that if someone to walk infront of the sensor it would always detect less light
void lChange(){
  int l = analogRead(lPin);
  if(l<lVal-50)
    {
      Serial.println("lc");
      triggerAlarm();
      }
  lVal = l;
}
//setup the pings
void setup()
{ 
  Serial.begin(9600);
  pinMode(tiltPin, INPUT); 
  pinMode(ledPin, OUTPUT);
  pinMode(tonePin,OUTPUT);
}

//the main loop that repeats
void loop()
{ 
  distMeasure();
  tChange();
  lChange();
  delay(500); //this delay is for the ultrasonic sensor
}
