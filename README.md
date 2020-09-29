<!-- PROJECT LOGO -->
<br />
<p align="center">

  <h1>🔒 Steganography tool</h1>


<!-- ABOUT THE PROJECT -->
## :question:About The Project

What is Steganography?
Check out [here](https://en.wikipedia.org/wiki/Steganography), I'm too lazy to explain 😅

**What It can do?:**
* It hides a message/text inside an image.
* It can also extract message/text from an image (although Limitations are there).

**How to use?:**
* Just follow this [website](website.com) and play around.

* There are two section in the website: *Hide* & *extract*.
    * Encode: Upload image and write a message and you'll get two images in return (original and the one with msg hidden inside it)
    * Decode: Upload image and It returns you the message.

### :hammer:Built With
* The working of this project is writter in pure or vanilla JS (JavaScript) with no external libraries.
* [Bootstrap](https://bootstrap.com)
    Despite of using bootstrap the website is not visually pleasing so 😬.

### :gear:Working
This project uses LSB (least significant bit) method to hide text messages inside an image.

**Pre-requisite:**

Every image is made up of numerous pixels. Each pixel is made up of 4 parts R,G,B,A (Red, Green, Blue, Alpha).
value of each pixel components(R,G,B.A) varies from 0-255. Here in this project we only need to tweak/manipulate R,G,B of the image.

If I change the value of pixel components by 1 there resultant value makes difference to the image but the change is so minute that a human eye can't figure it out. 
Ex- if R=255 changing it's value to R=254 won't make any diffrence.

**What is LSB?**
Let *R=255* if we convert this to 8bits binary from it'll be *11111111* the last bit in this 8 bits is the least significant bit and changing it won't make much diffrence in the image.

So If I change The *11111111* --> *11111110* this and the convert it back to decimal form i'll be *254*.

**Steps:**

* **Encoding part**:
    * It takes image as input and stores it's pixle data and converts each pixel component (RGBA) into it's 8 bit binary form.
    * Takes message as  input and attaches a delimiter at the end of it (helps in extracting msg from the pixel data) indicating that this is the end of the message. In This project the delimiter is *$t3g0*.
    * Converts message into binary from and then replaces LSB of R,G,B of every pixel in The image with each bits of the message.
    * Then converts the modified pixel data to decimal values and then displays the new image.

* **Decoding part:**
    * It just goes the reverse of the hiding part.
    * We iterate through every pixel and extract LSB from it and then combine the each bits to 8bits binary form and then converts it to the decimal and from decimal to corresponding character.
    * Since the extracted message contains a lots of garbage(from other pixles) so the delimiter helps us to identify our message in a pile of garbage value.
    :tada: Our message is extracted



<!-- CONTRIBUTING -->
## 💁‍♂️Contributing

I know this project is not optimised and uses a lot of workarounds because I made it in 1 day.
So any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- Limitation -->
## :construction:Limitations

* Only works with PNG files because for other files like JPEG/JPG the lossy compression changes the pixel data which makes message extraction difficult.
* Not secure as generally in steganography the message is encrypted and then hidden inside the image/sounds/videos. This project is the super basic implimentation of the concept so no encryption of message is done.
* Can only extract message out of image which is encrypted by this project because of the delimiter used.
* Not tested properly so there may be some underlying bugs which I may fix if I come across some.

<!-- Mentions -->
## 🙏Mentions
* [README TEMPLATE](https://github.com/othneildrew/Best-README-Template)