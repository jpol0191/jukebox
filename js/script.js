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

	function Song(name,source,image){
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
		// Show active song title
		$('#title').html(juke.activeSong.name);
		// List out songs in library
		$('#shown-list').html('');
		for(var i = 0; i < juke.library.length; i++){
			$('#shown-list').append('<li id="changeme" class="song-selector">'+ juke.library[i].name +'</li>');
			if (juke.library[i].name == juke.activeSong.name){
				$('#changeme').css('background-color', '#1e90ff');
				$('#changeme').css('color', 'black')
			}
			$('#changeme').attr('id', 'song-' + i )
		};
		// Load song image to gba screen
		$('#gba-screen').html('<img id="song-image"></img>');
		$('#song-image').attr('src', juke.activeSong.image);
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

	juke.load(new Song('Super Mario - Super Mario Theme', 'http://216.227.134.162/ost/super-mario-bros/gipwwbutdn/01-super-mario-bros.mp3','http://wiiudaily.com/wp-content/uploads/2016/04/super_mario_bros.0.png'));
	juke.load(new Song('Donkey Kong - Main Theme','http://66.90.91.26/ost/donkey-kong/cfvlgywjmy/01-donkey-kong-main-theme.mp3','http://thedoteaters.com/tde/wp-content/uploads/2013/06/fc-donkey-kong-snap-1024x960.png'));
	juke.load(new Song('Legend Of Zelda - Hyrule','http://66.90.91.26/ost/the-legend-of-zelda-ocarina-of-time/isypfqxutb/05-hyrule.mp3','http://www.classic-retro-games.com/_shots/95/legend_of_zelda_remake_03.jpg'));
	juke.load(new Song('Pokemon R/B/Y - Opening 02','http://216.227.134.162/ost/pokemon-yellow-blue-red-gb-/anzxhdjify/02-opening-part-2-.mp3','https://i.ytimg.com/vi/h6jUSIxCx-k/maxresdefault.jpg'));
	juke.load(new Song('Pokemon R/B/Y - Pallet Town', 'http://216.227.134.162/ost/pokemon-yellow-blue-red-gb-/enbncmjnbz/03-pallet-town-s-theme.mp3','https://i.ytimg.com/vi/h6jUSIxCx-k/maxresdefault.jpg'))
	juke.load(new Song('Pokemon R/B/Y - Pokemon Center', 'http://216.227.134.162/ost/pokemon-yellow-blue-red-gb-/cfiwmzorbz/11-pokemon-center.mp3','images/pika.gif'))
	juke.load(new Song('Contra - Battle in the jungle','http://66.90.91.26/ost/contra-arcade-/mncykvgimj/03-battle-in-the-jungle.mp3','http://a5.phobos.apple.com/us/r1000/032/Purple/ba/09/c7/mzl.ttagqhaa.320x480-75.jpg'));
	juke.load(new Song('Metroid - Zero Mission', 'http://216.227.134.162/ost/metroid-zero-mission/oryzpqxvxa/39-fully-powered-suit.mp3','https://i.ytimg.com/vi/XMdaXeKtuaA/maxresdefault.jpg'))
	juke.load(new Song('Mega-man(NES) - Enemy Chosen','http://216.227.134.162/ost/mega-man-nes-/rtuxcyfckh/02-enemy-chosen.mp3','http://www.blogcdn.com/www.joystiq.com/media/2008/09/mm9screen01.jpg'))
	juke.load(new Song('Mega-man(NES) - Ice Man','http://216.227.134.162/ost/mega-man-nes-/hmgsoamvhp/03-ice-man.mp3','http://www.blogcdn.com/www.joystiq.com/media/2008/09/mm9screen01.jpg'))

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
	// $('#playhead-img').animate
	//=================================================	
	//====== Run things that update every second ======
	setInterval(function(){
		$('#time').children('p').html(songTime());
		var playhead = $('#playhead');
		playhead.css('margin-left', songProgress());
	},20);
	//=================================================
});