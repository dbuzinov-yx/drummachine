
var Instrument = function(selector, sample){
    var _this = this;
    this.play = function(){
        if(this.dom.hasAttribute('data-active')){
            this.sound.play();
        }
    };
    this.dom = document.querySelector(selector);
    this.sound = new Howl({
        src: [sample],
        //autoplay: true,
        //loop: true,
        volume: 0.5,
        onplay: function () {
            
            var attrClass = _this.dom.getAttribute('class').split(' ');
            if (attrClass.indexOf('play') === -1) {
                attrClass.push('play');
                _this.dom.setAttribute('class', attrClass.join(' '));
            }
        },
        onend: function () {
            var attrClass = _this.dom.getAttribute('class').split(' ');
            if (attrClass.indexOf('play') !== -1) {
                delete attrClass[attrClass.indexOf('play')];
                setTimeout(function(){
                    _this.dom.setAttribute('class', attrClass.join(' '));
                },200);
            }
        }
    });
    this.interval = function(int) {
        
        setTimeout(function(){
            _this.play();
        }, int);
    };

    this.dom.onclick = function(){
        if(_this.dom.hasAttribute('data-active')){
            _this.dom.removeAttribute('data-active');
            return;
        }
        _this.dom.setAttribute('data-active','data-active');
    }

    return this;
}

var bars = 8;
var tempo = 214;
var kick = [];
var hithat = [];
var tom = [];

for (var i = 1; i <= bars; i++) {
    kick[i] = new Instrument('.kicks .kick:nth-child(' + i + ')','samples/kick-classic.wav');
    hithat[i] = new Instrument('.hithats .hithat:nth-child(' + i + ')','samples/hihat-electro.wav');
    tom[i] = new Instrument('.toms .tom:nth-child(' + i + ')','samples/tom-acoustic01.wav');
}
var melody = new Instrument('.melody .bar','looperman-l-1951920-0106474-tofcix-piano-1.wav');

var playset = [];



document.querySelector('#play').onclick = function(){
    function playKick() {
        for (var i = 1; i <= bars; i++) {    
            kick[i].interval(tempo*i);
            hithat[i].interval(tempo*i);
            tom[i].interval(tempo*i);
        }
    }
    playset[0] = setInterval(function(){
        playKick();
    },tempo*bars);
    melody.interval(tempo*32);
    playset[1] = setInterval(function(){
        melody.interval(tempo*32);
    },tempo*32);
};

document.querySelector('#stop').onclick = function(){
    try {
        playset.forEach(function(v){
            clearInterval(v);
        });
    }
    catch(e){}
};

document.querySelector('body').onkeydown = function (e) {
    switch (e.keyCode) {
        case 49:
            kick[1].sound.play();
            break;
        case 50:
            hithat[1].sound.play();
            break;
    }
};