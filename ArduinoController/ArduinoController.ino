/*
Youtube Link: https://youtube.com/shorts/oX35Qakjlhs?feature=share

Cameron Martin, May 2022
Final Integration Project
*/

#include "PDMSerial.h"

PDMSerial pdm;

const int clickUpPin = 8; // Digital input for Top Button
const int clickDownPin = 7; // Digital input for Bottom Button

int lastClickUp = 1; // Current value of Top Button
int curClickUp = 1; // Temporary storage for Top Button
int toClickUp = false; // Whether Top Button was clicked

int lastClickDown = 1; // Current value of Bottom Button
int curClickDown = 1; // Temporary storage for Bottom Button
int toClickDown = false; // Whether Bottom Button was clicked

// Set up analogPin as input and ledPin as output, begin Serial communication
void setup() {
  pinMode(clickUpPin, INPUT);
  pinMode(clickDownPin, INPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

// Read in potentiometer values, map them, then transmit them and whether to click. 
// If new serial communication has occured with the name "squish", turn on the buzzer
void loop() {
//  toClickUp = 0;

  // Read in the Top Button value
  curClickUp = digitalRead(clickUpPin);

//  // If curClick is different from lastClick, report a click and update lastClick
//  if(lastClickUp != curClickUp)
//  {
//    toClickUp = 1;
//    lastClickUp = curClickUp;
//  }
  
//  toClickDown = 0;

  // Read in the Bottom Button value
  curClickDown = digitalRead(clickDownPin);

//  // If curClick is different from lastClick, report a click and update lastClick
//  if(lastClickDown != curClickDown)
//  {
//    toClickDown = 1;
//    lastClickDown = curClickDown;
//  }

  // Transmit whether a click occurred
  pdm.transmitSensor("clickUp", toClickUp);
  pdm.transmitSensor("clickDown", toClickDown);
  pdm.transmitSensor("end");
//  Serial.print("clickUp:");
//  Serial.print(curClickUp);
//  Serial.print(",");
//  Serial.print("clickDown:");
//  Serial.print(curClickDown); 
//  Serial.println();

  // If new data comes in with the name "fill", turn on the LED
  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("fill"))) {
      // Light LED for 1 second when an enemy fills a line
      digitalWrite(LED_BUILTIN, HIGH);
      delay(1000);
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}
