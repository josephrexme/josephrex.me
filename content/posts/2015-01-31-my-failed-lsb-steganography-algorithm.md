---
author: Joseph Rex
comments: true
date: 2015-01-31T00:00:00Z
title: My failed LSB steganography algorithm
url: /my-failed-lsb-steganography/
tags:
  - experiment
  - steganography
  - cryptography
  - security
---

Last month (December 2014), I started developing a new GUI steganography software after building a [simple steganography tool][1] for my [post at Infosec Institue][2]. The simple tool (stegman) used a really simple approach that can be thought of and implemented by anyone in few minutes.
<!--more-->

<figure class="figure--fullwidth">
<img src="https://res.cloudinary.com/strich/image/upload/v1497699088/failed-stego_ljqwy6.jpg" class="image" alt="stego girl">
</figure>

Image exif data is stored in about the first 30 hex values of the image hexadecimal data. The number may not be accurate enough but the point remains exif data is stored at the top of the image at it should be kept untampered with to retain a proper and valid image format. The software appends data to the end of image files.

From my analysis as done on the infosec [article][2], most JPEG file formats have a hexadecimal tail of `0xFFD9` and PNG images have `0x426082`. I couldn't play around with GIF or BMP as there was inconsistency with the hexadecimal structure of most of them I had examined. The tool had a little function to grab hexadecimal values with the [binascii][3] module:

{{< highlight python >}}
import sys, re, binascii, string
def gethex(image):
  f = open(image, 'rb')
  data = f.read()
  f.close()
  hexcode = binascii.hexlify(data)
  return hexcode
{{< / highlight >}}

Every steganography tool performs two main functions which are **embed** and **extract**. Before file is embeded, it checks to see if there is any extra data after the usual JPEG or PNG tail hex values

{{< highlight python >}}
def extradatacheck(data, type):
  if type == 'png':
    pattern = r'(?<=426082)(.*)'
  elif type == 'jpg':
    pattern == r'(?<=FFD9)(.*)'
  match = re.search(pattern, data)
  if match:
    return match.group(0)
  else:
    false
{{< / highlight >}}

The embed function

{{< highlight python >}}
def embed(embedFile, coverFile, stegFile):
  filetype = coverFile[-3:]
  stegtype = stegFile[-3:]
  if filetype != 'png' and filetype != 'jpg':
    print 'Invalid format'
  elif filetype != stegtype:
    print 'Output file has to be in the same format as cover image (%s)' % string.swapcase(filetype)
  else:
    data = open(embedFile, 'r').read()
    info = gethex(coverFile)
    if extradatacheck(info, filetype):
      print 'File already contains embedded data'
    else:
      info += data.encode('hex')
      f = open(stegFile, 'w')
      f.write(binascii.unhexlify(info))
      f.close()
      print 'Storing data to', stegFile
{{< / highlight >}}

The function ends up converting the manipulated hex back to ASCII and writes to the new output file. The extract function performs the same check for appended data after regular tails and converts found data to ASCII if found

{{< highlight python >}}
def extract(stegFile, outFile):
  filetype = stegFile[-3:]
  data = gethex(stegFile)
  if extradatacheck(data, filetype):
    store = open(outFile, 'w')
    store.write( binascii.unhexlify(extradatacheck(data, filetype)) )
    store.close()
    print 'Extracted data stored to', outFile
  else:
    print 'File has no embedded data in it'
{{< / highlight >}}

The program achieved its objective which is the Steganography process but the sophistication level was 10%. Not good enough I thought. Oh! It wasn't just me, [Daniel Lerch][4] thought the same too

<blockquote class="twitter-tweet" lang="en"><p><a href="https://twitter.com/joerex101">@joerex101</a> Sorry but I&#39;m looking for something more sophisticated :)</p>&mdash; Daniel Lerch (@Daniel_Lerch) <a href="https://twitter.com/Daniel_Lerch/status/542777726491324416">December 10, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<hr>

I explored [Oni49][5]'s [stegoBlue][6] and created a [fork][7] to understand how it worked and see how I could derive a new implementation from it. Took a while but I later found how he used the [PIL (Python Imaging Library)][8] to list image data in RGB tuples. StegoBlue is a manipulation of the blue pixels in a pixel list.

{{< highlight python >}}
from PIL import Image
img = Image.open('cool.bmp')
pixelList = list(img.getdata())
{{< / highlight >}}

The image data in RGB tuples were so much in the list but I managed to grab a few from the bottom to show what the data looked like.

{{< highlight python >}}
[(14, 16, 15), (14, 16, 15), (11, 15, 14), (13, 17, 16), (13, 17, 16), (13, 17, 16), (15, 16, 18), (14, 15, 17), (13, 13, 15), (15, 15, 17), (16, 16, 16), (17, 17, 17), (18, 20, 19), (15, 17, 16), (13, 17, 18), (14, 18, 19), (16, 20, 21), (17, 21, 22), (17, 21, 20), (15, 19, 18), (16, 18, 13), (18, 20, 15), (18, 23, 19), (18, 23, 19), (20, 24, 23), (22, 26, 25), (23, 27, 26), (24, 28, 27), (25, 29, 28), (23, 27, 26), (26, 30, 29), (26, 30, 29), (26, 28, 27), (27, 29, 28), (29, 29, 29), (33, 33, 33), (33, 31, 32), (31, 31, 31), (28, 30, 29), (27, 31, 30), (26, 28, 27), (27, 29, 28), (26, 28, 27), (27, 29, 28), (23, 29, 27), (24, 30, 28), (20, 31, 27), (19, 30, 26), (19, 31, 27), (19, 30, 26), (15, 24, 21), (14, 18, 17), (14, 18, 17), (18, 20, 19), (21, 21, 23), (19, 19, 21), (18, 16, 19), (17, 15, 18), (18, 16, 19), (17, 15, 18), (17, 15, 20), (17, 15, 20), (17, 15, 18), (17, 15, 18), (15, 13, 16), (15, 13, 16), (14, 14, 14), (13, 13, 13), (11, 11, 11), (12, 12, 12)]
{{< / highlight >}}

That's just about 5% of the whole data from a 5M BMP image. I was digging his approach even though it breaks sometimes. I tried with JPGs and PNGs and it passed with some of the files that were tested.

###My New Algorithm
{{< highlight python >}}
#!/usr/bin/env python
import binascii, os, base64, gnupg, hashlib
from Crypto.Cipher import AES
from Crypto import Random

def embed(file, text, key, output = 'output.jpg'):
  #==== Using GPG  ====
  gpg = gnupg.GPG()
  cipher = gpg.encrypt(text, recipients=None, symmetric='AES256', passphrase=key, armor=True)
  ctext = hashlib.md5( str(cipher) ).hexdigest()
  #==== Using AES ====
  #iv = Random.new().read(AES.block_size)
  #cipher = AES.new(key, AES.MODE_CFB, iv)
  #ctext = hashlib.md5( iv + cipher.encrypt(text) ).hexdigest()

  ctexthex = binascii.hexlify( ctext )
  ctextbin = bin( int(ctexthex, 16) )[2:]
  print len(ctextbin)
  try:
    f = open(file, 'r')
    filebin = f.read()
    hexdata = binascii.hexlify(filebin)
    # tuples of each byte in hex
    bytesTuple = zip(hexdata[::2], hexdata[1::2])
    # list of every byte in hexadecimal
    bytes = [''.join(tuple) for tuple in bytesTuple]
    # split bytes into two keeping first segment untouched to avoid metadata tampering
    byteDivisor = len(bytes) / 2
    byteSegment1, byteSegment2 = bytes[:byteDivisor], bytes[byteDivisor:]
    print 'Segment 2 length: '+ str(len(byteSegment2))
    for i in range( len(ctextbin) ):
      # modifying the LSB
      binary = bin(int( byteSegment2[i], 16) )[:-1] + ctextbin[i]
      hexback = hex(int(binary, 2))[2:] if len(hex(int(binary, 2))[2:]) == 2 else '0' + hex(int(binary, 2))[2:]
      byteSegment2[i] = hexback
    # rejoin both byte segments
    bytes = byteSegment1 + byteSegment2
    # converting bytes list back to string
    mergehex = ''
    for byte in bytes:
      mergehex += byte
    rawbin = binascii.unhexlify(mergehex)
    outdata = open(output, 'w')
    outdata.write(rawbin)
  except IOError:
    print "Failed to locate file"

def extract(file, key, output = 'output.txt'):
  try:
    f = open(file, 'r')
    filebin = f.read()
    hexdata = binascii.hexlify(filebin)
    bytesTuple = zip(hexdata[::2], hexdata[1::2])
    bytes = [''.join(tuple) for tuple in bytesTuple]
    byteDivisor = len(bytes) / 2
    byteSegment1, byteSegment2 = bytes[:byteDivisor], bytes[byteDivisor:]
    dataBytes = byteSegment2[:32] # md5 data occupied 32 chars
    mergehex = ''
    for byte in dataBytes:
      mergehex += byte
    f = open(output, 'w')
    f.write( binascii.unhexlify(mergehex) )
  except IOError:
    print 'Failed to locate file'


filename = raw_input("Enter the name of the file:")
embed(filename, 'some awesome stuff', 'abcdefghijklmnop', 'output.png')
#extract(filename, 'abcdefghijklmnop')
{{< / highlight >}}

What the heck is going on here? I know that's like bunch of crap but it seemed like a nice idea to me. Let me explain:

I built a GUI already with PyQt4 with hopes that the logic will work just as I'd thought it would. On completion of a functionless nice GUI, I thought it will be nice to create a separate module to handle the logic of the software implementation.

When I wrote about [symmetric encryption in python][9], I mentioned how I had used AES from the Crypto module to try achieving a symmetric encryption. I might have not been at my best with that module but it didn't seem to work fine enough for me. I had resorted to the GPG module which stored the characters

{{< highlight text >}}
some awesome stuff
{{< / highlight >}}

with the cover image file as this

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497699091/stegoBlackhat_rpktki.png" class="image" alt="Steganography input">
</figure>

The resulting output has had some major pixels tampered with

<figure>
<img src="https://res.cloudinary.com/strich/image/upload/v1497700190/stegoOutput_ytlekg.png" class="image" alt="Steganography output">
</figure>

The distortion is from the middle to the bottom only because I splitted the image hex into two to leave the first half containing EXIF data untampered with. The other half whose LSB was modified now produces a malformed image output.

A steganography software is to modify the media file with no obvious changes but I have a modification with a way too obvious change. I've had to put this aside for a while to get on with other work. If you have any suggestions to this algorithm, I'll appreciate them

[1]: https://github.com/bl4ckdu5t/stegman
[2]: http://resources.infosecinstitute.com/steganalysis-x-ray-vision-hidden-data/
[3]: https://docs.python.org/2/library/binascii.html
[4]: https://twitter.com/Daniel_Lerch
[5]: http://www.twitter.com/oni_49
[6]: https://github.com/oni49/stegoBlue
[7]: https://github.com/bl4ckdu5t/stegoBlue
[8]: http://www.pythonware.com/products/pil/
[9]: /symmetric-encryption-in-python
