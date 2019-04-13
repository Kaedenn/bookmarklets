/** Beautify Bookmarklet Source (for Mozilla Firefox)
 * Author: Kaedenn
 * Date: 13 April 2019
 *
 * To use this bookmarklet, add the following bookmark to your browser:
javascript:(function b(){let d=document,s=d.createElement('script');s.setAttribute('src','https://kaedenn.github.io/bookmarklets/beautify-bookmark.js');d.head.appendChild(s);})()
 * You can just drag that text to your bookmark toolbar.
 *
 * Then, nagivate to a JavaScript file (for example, go to
 * https://code.jquery.com/jquery-3.4.0.min.js) and click on the bookmark
 * you just created. The page will be formatted with line numbers.
 */

/** Technical Information
 *
 * Mozilla renders .js and other plain-text files as such:
 * <html>
 *  <head>
 *   <link rel="alternate stylesheet" type="text/css" href="resource://content-accessible/plaintext.css" title="Wrap Long Lines">
 *  </head>
 *  <body>
 *   <pre>{{ TEXT }}</pre>
 *  </body>
 * </html>
 *
 * This script removes the <pre> element and replaces it with something like:
 *  <span>
 *   <code><pre class="line" linenr="01">function sample() {</pre></code>
 *   <code><pre class="line" linenr="02">  let e = 1;</pre></code>
 *   ... and so on ...
 *  </span>
 *
 * This script also adds CSS which prepends each line with the line number as
 * defined in the "linenr" attribute of each of the <pre> elements.
 *
 */

(function beautify_js_page() {
  NewElem = (e) => document.createElement(e);
  document.addEventListener('doc-ready', function() {
    var $p = document.getElementsByTagName("pre")[0];
    var js = $p.innerText;
    document.body.removeChild($p);
    $p = NewElem('span');
    document.body.appendChild($p);

    var lines = js_beautify(js).split(/[\r]?\n/g);
    var pad = `${lines.length}`.length;
    for (var lineno = 0; lineno < lines.length; lineno += 1) {
      let $c = NewElem('code');
      let $l = NewElem('pre');
      $l.setAttribute('class', 'line');
      $l.setAttribute('linenr', (new Number(lineno+1)).toString(10).padStart(pad, " "));
      $l.innerText = lines[lineno];
      $c.appendChild($l);
      $p.appendChild($c);
    }
  });
  let css = `
pre { margin-top: 0px; margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px; }
.line:before { content: attr(linenr) " "; -webkit-user-select: none; -moz-user-select: none; user-select: none; }
  `;
  var $css = NewElem('style');
  $css.setAttribute('type', 'text/css');
  $css.innerHTML = css;
  document.head.appendChild($css);
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function() { eval(this.responseText); document.dispatchEvent(new Event("doc-ready")); });
  xhr.open("GET", "https://beautifier.io/js/lib/beautify.js");
  xhr.send();
})();
