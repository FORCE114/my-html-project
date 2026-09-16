window.__SECTION_ASSETS={"scene":{"size":11423577,"parts":["assets/models/section2/scene.gz.000"]},"part":{"size":10298871,"parts":["assets/models/section2/part.gz.000"]},"fire":{"size":48139778,"parts":["assets/models/section2/fire.gz.000","assets/models/section2/fire.gz.001","assets/models/section2/fire.gz.002"]},"ph":{"size":7448209,"parts":["assets/models/section2/ph.gz.000"]}};
(function(){
  'use strict';
  var M = window.__SECTION_ASSETS;
  function fmt(b){ return (b/1048576).toFixed(1); }
  window.__loadSectionAsset = async function(key){
    var spec = M[key];
    if(!spec) throw new Error('Unknown asset: ' + key);
    var status = document.getElementById('loadstatus');
    var base = status ? status.textContent : '';
    var out = new Uint8Array(spec.size), pos = 0;
    for (var i = 0; i < spec.parts.length; i++) {
      var url = spec.parts[i];
      var res = await fetch(url, {cache: 'force-cache'});
      if (!res.ok) throw new Error('HTTP ' + res.status + ' while loading ' + url);
      var reader = res.body.getReader();
      while (true) {
        var r = await reader.read();
        if (r.done) break;
        if (pos + r.value.length > out.length) throw new Error('Asset larger than manifest: ' + key);
        out.set(r.value, pos); pos += r.value.length;
        if (status) status.textContent = base + ' (' + fmt(pos) + ' / ' + fmt(spec.size) + ' MB)';
      }
    }
    if (pos !== spec.size) throw new Error('Incomplete asset ' + key + ': ' + pos + ' of ' + spec.size + ' bytes');
    if (status) status.textContent = base;
    return out;
  };
})();
