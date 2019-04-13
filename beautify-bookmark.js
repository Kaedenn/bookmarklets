(function f() {
  function code_line(line, line_nr) {
    var $c = document.createElement('code');
    var $p = document.createElement('pre');
    $p.setAttribute("class", "line");
    $p.setAttribute("linenr", line_nr);
    $p.innerText = line;
    $c.appendChild($p);
    return $c;
  }
  document.addEventListener('doc-ready', function() {
    var $p = document.getElementsByTagName("pre")[0];
    var js = $p.innerText;
    document.body.removeChild($p);
    $p = document.createElement('span');
    document.body.appendChild($p);

    var lines = js_beautify(js).split(/[\r]?\n/g);
    var pad = `${lines.length}`.length;
    for (var lineno = 0; lineno < lines.length; lineno += 1) {
      $p.appendChild(code_line(lines[lineno], (new Number(lineno)).toString(10).padStart(pad, "0")));
    }
  });
  function loadScript(src) {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function() { eval(this.responseText); document.dispatchEvent(new Event("doc-ready")); });
    xhr.open("GET", src);
    xhr.send();
  }
  let css = `
span { counter-reset: line; }
code { }
pre { counter-increment: line; margin-top: 0px; margin-bottom: 0px; padding-top: 0px; padding-bottom: 0px; }
.line:before { content: attr(linenr) " "; }
.line:before { -webkit-user-select: none; }
  `;
  var $css = document.createElement('style');
  $css.setAttribute('type', 'text/css');
  $css.innerHTML = css;
  document.head.appendChild($css);
  loadScript("https://beautifier.io/js/lib/beautify.js");
})();
