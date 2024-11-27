int redPin= 11;
int greenPin = 10;
int bluePin = 9;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
}

void loop() {
  setColor(255, 0, 0); // Red Color
  delay(100);
  
  setColor(0, 255, 0); // Green Color
  delay(100);
  
  setColor(0, 0, 255); // Blue Color
  delay(100);
  
  setColor(255, 255, 0); // Yellow Color
  delay(100);

  setColor(0, 255, 255); // Cyan Color
  delay(100);
  
  setColor(255, 0, 255); // Magenta Color
  delay(100);
  
  setColor(255, 165, 0); // Orange Color
  delay(100);
  
  setColor(128, 0, 128); // Purple Color
  delay(100);
  
  setColor(255, 255, 255); // White Color
  delay(100);
}

void setColor(int redValue, int greenValue, int blueValue) {
  analogWrite(redPin, 255 - redValue);
  analogWrite(greenPin, 255 - greenValue);
  analogWrite(bluePin, 255 - blueValue);
}