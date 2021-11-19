---
author: Joseph Rex
comments: true
date: 2014-12-02T00:00:00Z
title: Symmetric Encryption in Python
permalink: /symmetric-encryption-in-python/
tags:
  - cryptography
  - encryption
  - python
---

In the middle of a project I'm presently working on, I needed to make use of a Symmetric encryption based on the workflow of my software. A key is required by users to encrypt data and the same key will be needed to decrypt data. My first thoughts were on PyCrypto so I went ahead doing this
<!--more-->

```py
from Crypto.Cipher import AES
from Crypto import Random
text = 'The quick brown fox jumped over the dog'
iv = Random.new().read(AES.block_size)
cipher = AES.new(key, AES.MODE_CFB, iv)
ctext = iv + cipher.encrypt(text)
```

This was totally fine but when I tried decrypting the ctext data, I got something entirely different from what my input was.

```py
decrypted = cipher.decrypt(ctext)
```

Strange behaviour from MODE_CFB made me try MODE_CBC. Just the exact same way, I went ahead to just change to MODE_CBC

```py
from Crypto.Cipher import AES
from Crypto import Random
text = 'The quick brown fox jumped over the dog'
iv = Random.new().read(AES.block_size)
cipher = AES.new(key, AES.MODE_CBC, iv)
ctext = iv + cipher.encrypt(text)
```

This mode just fails right away with a warning that the message must be a multiple of 16. I expect any length of message from the users of my program and this didn't seem like a good idea. While searching the web, I came across a solution that was nice but not what I wanted

<a href="http://www.codekoala.com/posts/aes-encryption-python-using-pycrypto/" target="_blank">http://www.codekoala.com/posts/aes-encryption-python-using-pycrypto/</a>

I wrote my own little function for that

```py
def AEScrypt(action, string):
	"""
	Solution by codekoala (http://www.codekoala.com/posts/aes-encryption-python-using-pycrypto/)
	Requires base64, os, and AES in Crypto.Cipher
	@param action string :encrypt or decrypt
	@param string string :cipher or plain text
	"""
	BLOCK_SIZE = 32
	PADDING = '{'
	pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * PADDING
	EncodeAES = lambda c, s: base64.b64encode(c.encrypt(pad(s)))
	DecodeAES = lambda c, e: c.decrypt(base64.b64decode(e)).rstrip(PADDING)
	secret = os.urandom(BLOCK_SIZE)
	cipher = AES.new(secret)
	result = EncodeAES(cipher, string) if action == 'encrypt' else DecodeAES(cipher, string)
	return result
```

This seem like the best way to use PyCrypto AES encryption but it wasn't symmetric. It's not in a PKI format (no key is required to unlock the message).

I still keep that function but it was of no use in my case. Finally I thought of the gnupg module and installed it for my python2

```
sudo apt-get install python-gnupg
```

I was able to encrypt this way:

```py
import gnupg,base64
gpg = gnupg.GPG()
def encrypt(passphrase, message):
   cipher = gpg.encrypt(message, recipients=None, symmetric='AE256', passphrase=passphrase, armor=True)
   return base64.b64encode( str(cipher) )
```

I had to encode with base64 because I don't want my encrypted data to have the regular start and end of a GPG encrypted data i.e

<pre class="lang:default decode:true ">
----- BEGIN PGP KEY -----

----- END PGP KEY -------
</pre>

To decrypt the encrypted data, I use this:

```py
def decrypt(cipher, passphrase):
   deciphered = str( gpg.decrypt( base64.b64decode(cipher), passphrase ) )
   return deciphered if deciphered is True else 'Incorrect passphrase'
```

When a wrong passphrase is used gpg.decrypt() returns an empty string \` \` which is False. If it is true we get our deciphered text.
