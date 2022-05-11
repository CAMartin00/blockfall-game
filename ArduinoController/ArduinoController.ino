/*
Youtube Link: https://youtube.com/shorts/zCrc_85fgvE?feature=share

Cameron Martin, April 2022
Controller Assigment
*/

#include "PDMSerial.h"

PDMSerial pdm;

const int xPin = A0;  // Analog input for Potentiometer for Joystick x value
const int yPin = A1;  // Analog input for Potentiometer for Joystick y value
const int clickPin = 12; // Digital input for Joystick Click
const int buzzPin = 3; // PWM enabled output for Buzzer

int xVal = 0; // Unmapped Potentiometer for Joystick x value, start at 0 (77-507)
int xOut = 0; // Mapped Potentiometer for Joystick x value, start at 0 (-10 - 10)

int yVal = 0; // Unmapped Potentiometer for Joystick y value, start at 0 (77-507)
int yOut = 0; // Mapped Potentiometer for Joystick y value, start at 0 (-10 - 10)

int lastClick = 1; // Current value of Joystick switch
int curClick = 1; // Temporary storage for Joystick switch
int toClick = false; // Whether Joystick was clicked

// Set up analogPin as input and ledPin as output, begin Serial communication
void setup() {
  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  pinMode(clickPin, INPUT_PULLUP);
  pinMode(buzzPin, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, LOW);
  Serial.begin(9600);
}

// Read in potentiometer values, map them, then transmit them and whether to click. 
// If new serial communication has occured with the name "squish", turn on the buzzer
void loop() {
  toClick = false;

  // Read in potentiometer values, map them to -10 - 10 for use as a movement value
  xVal = analogRead(xPin);
  xOut = map(xVal, 0, 496, -1, 1);

  yVal = analogRead(yPin);
  yOut = map(yVal, 0, 504, -1, 1);

  // Read in the Joystick switch value
  curClick = digitalRead(clickPin);

  // If curClick is different from lastClick, report a click and update lastClick
  if(lastClick != curClick)
  {
    toClick = true;
    lastClick = curClick;
  }
  
  // Transmit xOut and yOut
  pdm.transmitSensor("joyX", xOut);
  pdm.transmitSensor("joyY", yOut);

  // Transmit whether a click occurred
  pdm.transmitSensor("click", toClick);
  pdm.transmitSensor("end");

  // If new data comes in with the name "squish", turn on the buzzer
  boolean newData = pdm.checkSerial();
  if(newData) {
    if(pdm.getName().equals(String("squish"))) {
      // Buzz for .333 seconds (light LED as well)
      noTone(buzzPin);
      digitalWrite(LED_BUILTIN, HIGH);
      delay(333);
      noTone(buzzPin);
      digitalWrite(LED_BUILTIN, LOW);
    }
  }
}
