$(document).ready(function(){
	// =====Program Startup=========
	function JukeBox(){
		this.library = [];
		this.activeSong = null;
		this.playSong = function(){
			this.activeSong.source.play();
		};
		this.pauseSong = function(){
			this.activeSong.source.pause();
		};
		this.stopSong = function(){
			this.activeSong.source.pause();
		};
		this.load = function(song){
			if(song instanceof Song){
				var juke = this;
				song.source.addEventListener("ended", function(){
					// juke.stopSong();
					var n = juke.getIndex()+1 > juke.library.length -1 ? 0 : juke.getIndex()+1;
					juke.activeSong = juke.library[n]
					juke.playSong();
					loadElements();			
				});
				this.library.push(song);
			}else{
				console.log('Please enter a song.');
			}
		};
		this.getIndex = function(){
			for(var i =0; i < this.library.length; i++){
				if(this.activeSong == this.library[i]){
					return i;
				};
			};
		};
	};

	function Song(name,source, image){
		this.name = name;
		this.source = new Audio(source);
		this.image = image || 'images/default.png' 
	};

	function PlayList(name){
		this.name = name;
		this.songs = [];
	};
	//========================================
	//=Z========Helper Functions===============
	function loadElements(){
		$('#title').html(juke.activeSong.name);
		$('#shown-list').html('');
		for(var i = 0; i < juke.library.length; i++){
			$('#shown-list').append('<li id="changeme">'+ juke.library[i].name +'</li>');
			$('#changeme').attr('id', 'song-' + i )
		};
	};

	function songTime(){
		var secs = Math.round(juke.activeSong.source.currentTime);
		var tmp = secs/60;
		var min = parseInt(tmp);
		var sec = ("0" + Math.round((tmp%1) * 60)).slice(-2);
		return min + ":" + sec
	};

	function songProgress(){
		trackW = parseInt($('#tracker-container').css('width')) - 20;
		multi = juke.activeSong.source.currentTime/juke.activeSong.source.duration;
		return trackW * multi
	};
	//===============================

	//========== Load Songs =========
	juke = new JukeBox();

	juke.load(new Song('Cow Boy Bebop - Tank', 'http://66.90.91.26/ost/cowboy-bebop-original-soundtrack-1/arqilhpcfm/01-tank-.mp3'));
	juke.load(new Song('Super Mario - Super Mario Theme', 'http://216.227.134.162/ost/super-mario-bros/gipwwbutdn/01-super-mario-bros.mp3'));
	juke.load(new Song('Donkey Kong - Main Theme','http://66.90.91.26/ost/donkey-kong/cfvlgywjmy/01-donkey-kong-main-theme.mp3'));
	juke.load(new Song('Legend Of Zelda - Hyrule','http://66.90.91.26/ost/the-legend-of-zelda-ocarina-of-time/isypfqxutb/05-hyrule.mp3'));
	juke.load(new Song('Pokemon R/B/Y - Opening 02','http://216.227.134.162/ost/pokemon-yellow-blue-red-gb-/anzxhdjify/02-opening-part-2-.mp3'));
	juke.load(new Song('Pokemon R/B/Y - Pallet Town', 'http://216.227.134.162/ost/pokemon-yellow-blue-red-gb-/enbncmjnbz/03-pallet-town-s-theme.mp3'))
	juke.load(new Song('Pokemon R/B/Y - Pokemon Center', 'http://216.227.134.162/ost/pokemon-yellow-blue-red-gb-/cfiwmzorbz/11-pokemon-center.mp3'))
	juke.load(new Song('Contra - Battle in the jungle','http://66.90.91.26/ost/contra-arcade-/mncykvgimj/03-battle-in-the-jungle.mp3'));
	juke.load(new Song('Metroid - Zero Mission', 'http://216.227.134.162/ost/metroid-zero-mission/oryzpqxvxa/39-fully-powered-suit.mp3'))
	juke.load(new Song('Mega-man(NES) - Enemy Chosen','http://216.227.134.162/ost/mega-man-nes-/rtuxcyfckh/02-enemy-chosen.mp3'))
	juke.load(new Song('Mega-man(NES) - Ice Man','http://216.227.134.162/ost/mega-man-nes-/hmgsoamvhp/03-ice-man.mp3'))

	juke.activeSong = juke.library[0]
	//==================================

	//========= Load Jukebox elements========
	loadElements();

	//=======================================
	juke.playSong();




	//============ Event Listeners ============
	$('#pause').on('click',function(){
		juke.pauseSong();
	});
	$('#play').on('click',function(){
		juke.playSong();
	});
	$('#prev').on('click', function(){
		juke.stopSong();
		juke.activeSong.source.load();
		var n = juke.getIndex()-1 < 0 ? juke.library.length - 1: juke.getIndex()-1;
		juke.activeSong = juke.library[n]
		juke.playSong();
	});
	$('#next').on('click', function(){
		juke.stopSong();
		juke.activeSong.source.load();
		var n = juke.getIndex()+1 > juke.library.length -1 ? 0 : juke.getIndex()+1;
		juke.activeSong = juke.library[n]
		juke.playSong();
	});
	$(document).on('click',function(event){
		loadElements();
	});
	$('#tracker-container').on('click',function(event){
		console.log(event.offsetX)
		var playhead = $('#playhead')
		playhead.attr('style',
		 playhead.attr('style') + 'margin-left: '+ event.offsetX+ 'px;');
	});
	//=================================================
	//================== Animation ====================
	$('#playhead-img').animate
	//=================================================	
	//====== Run things that update every second ======
	setInterval(function(){
		$('#time').children('p').html(songTime());
		var playhead = $('#playhead');
		playhead.css('margin-left', songProgress());
	},20);
	//=================================================
});