---
title: Symmetric Encryption in Python
author: Joseph Rex
layout: post
permalink: /symmetric-encryption-in-python/
categories:
  - python
tags:
  - cryptography
  - encryption
  - python
---
[<img class="aligncenter size-large wp-image-403" src="http://josephrex.me/wp-content/uploads/2014/12/e58f4d1b84ba062ca18a724ed9ea82af_large-1-1024x576.jpeg" alt="e58f4d1b84ba062ca18a724ed9ea82af_large (1)" width="634" height="356" />][1]

In the middle of a project I&#8217;m presently working on, I needed to make use of a Symmetric encryption based on the workflow of my software. A key is required by users to encrypt data and the same key will be needed to decrypt data. My first thoughts were on PyCrypto so I went ahead doing this

<pre class="lang:python decode:true">from Crypto.Cipher import AES
from Crypto import Random
text = 'The quick brown fox jumped over the dog'
iv = Random.new().read(AES.block_size)
cipher = AES.new(key, AES.MODE_CFB, iv)
ctext = iv + cipher.encrypt(text)</pre>

This was totally fine but when I tried decrypting the ctext data, I got something entirely different from what my input was.

<pre class="lang:python decode:true ">decrypted = cipher.decrypt(ctext)</pre>

Strange behaviour from MODE\_CFB made me try MODE\_CBC. Just the exact same way, I went ahead to just change to MODE_CBC

<pre class="lang:default decode:true ">from Crypto.Cipher import AES
from Crypto import Random
text = 'The quick brown fox jumped over the dog'
iv = Random.new().read(AES.block_size)
cipher = AES.new(key, AES.MODE_CBC, iv)
ctext = iv + cipher.encrypt(text)</pre>

This mode just fails right away with a warning that the message must be a multiple of 16. I expect any length of message from the users of my program and this didn&#8217;t seem like a good idea. While searching the web, I came across a solution that was nice but not what I wanted

<a href="http://www.codekoala.com/posts/aes-encryption-python-using-pycrypto/" target="_blank">http://www.codekoala.com/posts/aes-encryption-python-using-pycrypto/</a>

I wrote my own little function for that

<pre class="lang:python decode:true ">def AEScrypt(action, string):
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
	return result</pre>

This seem like the best way to use PyCrypto AES encryption but it wasn&#8217;t symmetric. It&#8217;s not in a PKI format (no key is required to unlock the message).

I still keep that function but it was of no use in my case. Finally I thought of the gnupg module and installed it for my python2

<pre class="lang:default decode:true ">sudo apt-get install python-gnupg</pre>

I was able to encrypt this way:

<pre class="lang:python decode:true">import gnupg,base64
gpg = gnupg.GPG()
def encrypt(passphrase, message):
   cipher = gpg.encrypt(message, recipients=None, symmetric='AE256', passphrase=passphrase, armor=True)
   return base64.b64encode( str(cipher) )</pre>

I had to encode with base64 because I don&#8217;t want my encrypted data to have the regular start and end of a GPG encrypted data i.e

<pre class="lang:default decode:true ">----- BEGIN PGP KEY -----

----- END PGP KEY -------</pre>

To decrypt the encrypted data, I use this:

<pre class="lang:default decode:true">def decrypt(cipher, passphrase):
   deciphered = str( gpg.decrypt( base64.b64decode(cipher), passphrase ) )
   return deciphered if deciphered is True else 'Incorrect passphrase'
</pre>

When a wrong passphrase is used gpg.decrypt() returns an empty string &#8216; &#8216; which is False. If it is true we get our deciphered text.

 [1]: http://josephrex.me/wp-content/uploads/2014/12/e58f4d1b84ba062ca18a724ed9ea82af_large-1.jpeg