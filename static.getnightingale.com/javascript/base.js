function show(nodeId) {
    document.getElementById(nodeId).style.display = "block";
    document.getElementById(nodeId).style.visibility = "visible";
}

function hide(nodeId) {
    document.getElementById(nodeId).style.display = "";
    document.getElementById(nodeId).style.visibility = "";
}
function toggleNav() {
    if(document.getElementById("ngalenavlist").style.display === "block")
        hide("ngalenavlist");
    else
        show("ngalenavlist");
}

function addEventListenerLegacy(obj, evt, func) {
    if(document.addEventListener) {
        obj.addEventListener(evt, func, false);
    }
    else {
        obj.attachEvent(evt, func);
    }
}
function removeEventListenerLegacy(obj, evt, func) {
    if(document.removeEventListener) {
        obj.removeEventListener(evt, func, false);
    }
    else {
        obj.detachEvent(evt, func);
    }
}

function containsLanguage(options, lang) {
    for(var o = 0; o < options.length; o++) {
        if(options.item(o).value === lang) {
            return true;
        }
    }
    return false;
}

function hideOverlay() {
    hide("overlay");
    hide("instructions");
    removeEventListenerLegacy(document.getElementById("overlay"),"click",hideOverlay);
    if(!('pointerEvents' in document.body.style))
        removeEventListenerLegacy(document.getElementById("instructions"),"click",hideOverlay);
}

function initl10n() {
    if(!selectLoaded) {
        var l10n = document.webL10n;
        
        // add the languages to the dropdown
        var langs = l10n.getLanguages(),
            select = document.getElementById('l10nselect'), n;
        for(var l = 0;l<langs.length;l++) {
            if(typeof l !== 'function' && !containsLanguage(select.options,langs[l])) {
                n = document.createElement("option");
                n.text = l10n.get(langs[l]+'Name');
                n.value = langs[l];
                select.appendChild(n);
            }
        }
        
        // set current language
        select.value = l10n.getLanguage(); // not working with IE<9
        
        // chane document language when selection is changed
        select.onchange = function() {
            l10n.setLanguage(this.value);
        };
        
        selectLoaded = true;
    }
}

var selectLoaded = false,
    hasPiwik = false;

addEventListenerLegacy(document, "localized", initl10n, false);

addEventListenerLegacy(window, 'load', init, false);

function init() {
    hasPiwik = "_paq" in window;
    var download = document.getElementsByClassName('download'),
        hasDataset = document.dataset;
    if(download) {
        for(var i = 0; i < download.length; i++) {
            if(hasDataset?download[i].dataset.hasOwnProperty("popup"):download[i].attributes["data-popup"]) {
                addEventListenerLegacy(download[i],"click",function(e) {
                    if(hasPiwik) {
                        _paq.push(['trackEvent', 'Download', 'overlay']);
                    }
                    e.preventDefault();
                    document.getElementById("ubuntuInstallCode").dataset.l10nArgs = '{"name":"'+e.currentTarget.dataset.popupName+'"}';

                    // update the contents
                    document.webL10n.translate(document.getElementById("ubuntuInstallCode"));
                    
                    show("overlay");
                    show("instructions");
                    addEventListenerLegacy(document.getElementById("overlay"),"click",hideOverlay);
                    if(!('pointerEvents' in document.body.style))
                        addEventListenerLegacy(document.getElementById("instructions"),"click",hideOverlay);
                });
            }
            else {
                addEventListenerLegacy(download[i],"click",function(e) {
                    if(hasPiwik) {
                        _paq.push(['trackEvent', 'Download', e.currentTarget.dataset.url]);
                    }
                    
                    window.open(e.currentTarget.dataset.url);
                    e.preventDefault();
                }
                );
            }
        }
        
        if(hasPiwik) {
             _paq.push(['setDownloadClasses', "piwik_download"]);
        }
    }

    addEventListenerLegacy(document.getElementById("expandngalenav"),"click",toggleNav);
    
    //lazyload hiDPI images
    if(window.devicePixelRatio && window.devicePixelRatio > 1.3) {
        if(hasPiwik) _paq.push(['track', 'HiDPI', 'Yes'])
        var imgs = document.getElementsByTagName("img");
        for(var i = 0; i < imgs.length; i++) {
            if(imgs[i].src && imgs[i].dataset.hasOwnProperty("hdpi") && !imgs[i].src.match(/-hidpi/i)) {
                imgs[i].src = imgs[i].src.replace(/(?!-hidpi)\.(png|jpg)$/i, function(str) {
                    return "-hidpi"+str;
                });
            }
        }
    }
}
