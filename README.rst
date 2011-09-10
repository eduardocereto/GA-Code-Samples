.. -*- restructuredtext -*-

.. _README:

===============
GA Code Samples
===============

.. _synopsis:

Synopsis
--------

This is a collection of scripts to help tracking with Google Analytics

.. _doc:

Documentation
-------------

Vimeo Video Tracking
~~~~~~~~~~~~~~~~~~~~
vimeo.js


Implements Google analytics tracking for Vimeo_ Videos.

Will add the following events.

===========  ======  ===========
 Category    Action     Label
===========  ======  ===========
Vimeo Video  play    <video url>
Vimeo Video  pause   <video url>
Vimeo Video  finish  <video url>
===========  ======  ===========

Works only on Vimeo videos that were embeded using the `<iframe>` code. 
So if you still using the old embed/object method you should consider updating
 the video embed code before implementing with script.

Won't work for ie6 or ie7.

.. _Vimeo: http://www.vimeo.com/

YouTube Video Tracking
~~~~~~~~~~~~~~~~~~~~~~
youtube.js

Implements Google analytics tracking for YouTube_ Videos.

Will add the following events.

=============  ====================  ===========
   Category           Action            Label
=============  ====================  ===========
YouTube Video  play                  <video url>
YouTube Video  pause                 <video url>
YouTube Video  finish                <video url>
YouTube Video  error (<error code>)  <video url>
=============  ====================  ===========

Works only on Youtube videos that were embeded using the `<iframe>` code. 
So if you still using the old embed/object method you should consider updating
 the video embed code before implementing with script.

.. _YouTube http://www.youtube.com/

HTML5 Media Tracking
~~~~~~~~~~~~~~~~~~~~
html5_media.js

Will track interactions for `<video>` and `<audio>` tags.

Of course it only works for browsers that support the html5 `<audio>` and 
`<video>` tags.

===========  ========  ===========
 Category     Action      Label
===========  ========  ===========
 AUDIO        play     <video url>
 AUDIO        pause    <video url>
 AUDIO        ended    <video url>
 VIDEO        play     <video url>
 VIDEO        pause    <video url>
 VIDEO        ended    <video url>
===========  ========  ===========

.. _license:

License
-------

Copyright (C) 2011 by Cardinal Path

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

