

let audio,playbtn,title,poster,artists,mutebtn,seekslider,volumeslider;
let seeking=false;
let seekto,curtimetext,durtimetext,palylist_status,dir,playlist,
ext,agent,playlist_artist,repeat,randomSong;

dir="music/";
playlist=["Zight-Summer(Piano)","hometown-northwestern","tides-arend","happy-happy-days-simon-folwar-","silhouette-danijel-zambo"];
title=["Summer(Piano)","Hometown","Tides","Happy Days","Silhouette"];
artists=["Zight","Northwestern","Arend",
"Simon Folwar","Danijel Zambo"];
poster=["img/Zight.png","img/hometown.png","img/tides.png","img/happy-days.png","img/silhouette.png"];


ext=".mp3";
agent=navigator.userAgent.toLowerCase();
if(agent.indexOf('firefox')!= -1 || agent.indexOf('opera')!= -1){
    ext=".ogg";
} 

playbtn=document.getElementById("playpausebtn");
nextbtn=document.getElementById("nextbtn");
prevbtn=document.getElementById("prevbtn");
mutebtn=document.getElementById("mutebtn");
seekslider=document.getElementById("seekslider");
volumeslider=document.getElementById("volumeslider");
curtimetext=document.getElementById("curtimetext");
durtimetext=document.getElementById("durtimetext");
playlist_status=document.getElementById("playlist_status");
playlist_artist=document.getElementById("playlist_artist");
repeat=document.getElementById("repeat");
randomSong=document.getElementById("random"); 
playlist_index=document.getElementById("select").selectedIndex;


audio=new Audio();
audio.src=dir+playlist[0]+ext;
audio.loop=false;



playlist_status.innerHTML=title[playlist_index];
playlist_artist.innerHTML=artists[playlist_index];

document.getElementById("select").addEventListener('change',playMenue);
playbtn.addEventListener("click",playPause);
nextbtn.addEventListener("click",nextSong);
prevbtn.addEventListener("click",prevSong);
mutebtn.addEventListener("click",mute);
seekslider.addEventListener("mousedown",function(event){ seeking=true;
seek(event);});
seekslider.addEventListener("mousemove",function(event){seek(event);});
seekslider.addEventListener("mouseup",function(){seeking=false;});
volumeslider.addEventListener("mousemove",setvolume);
audio.addEventListener("timeupdate",function(){seektimeupdate();});
audio.addEventListener("ended",function(){switchTrack(); });
repeat.addEventListener("click",loop);
randomSong.addEventListener("click",random);

function fetchMusicDetails(){
    
    $("#playpausebtn img").attr("src", "img/pause-red.png");
    $("#bigImage").attr("src",poster[playlist_index]);
    $("#cImage").attr("src",poster[playlist_index]);
    document.getElementById("select").selectedIndex = playlist_index;
  
    playlist_status.innerHTML=title[playlist_index];
    playlist_artist.innerHTML=artists[playlist_index];
    
    audio.src=dir+playlist[playlist_index]+ext;
  
    audio.play();

}
function playMenue(){
    playlist_index=document.getElementById("select").selectedIndex;
    fetchMusicDetails();

}
function playPause(){
    if(audio.paused){
        audio.play();
        $("#playpausebtn img").attr("src","img/pause-red.png");
    }else{
        audio.pause();
        $("#playpausebtn img").attr("src","img/play-red.png");
        
    }
}
function nextSong(){
    playlist_index++;
    if(playlist_index > playlist.length -1){
        playlist_index=0;
    }
    fetchMusicDetails();
    
}
function prevSong(){
    playlist_index --;
    if(playlist_index<0){
        playlist_index=playlist.length -1;
    }
    fetchMusicDetails();
}
function mute(){
    if(audio.muted){
        audio.muted=false;
        $("#mutebtn img").attr("src","img/speaker.png");
    }else{
        audio.muted=true;
        $("#mutebtn img").attr("src","img/mute.png");

    }
}
function seek(event){
    if(audio.duration ==0){
        null;
    }else{
        if(seeking){
            seekslider.value=event.clientX - seekslider.offsetLeft;
            seekto=audio.duration * (seekslider.value /100);
            audio.currentTime= seekto;
        }
    }

}
function setvolume(){
    audio.volume=volumeslider.value/100;
}

function seektimeupdate(){
    if(audio.duration){
        let nt=audio.currentTime * (100/audio.duration);
        seekslider.value=nt;
        var curmins =Math.floor(audio.currentTime/60);
        var cursecs=Math.floor(audio.currentTime - curmins * 60);
        var durmins=Math.floor(audio.duration /60);
        var dursecs=Math.floor(audio.duration -durmins *60);
        if(cursecs<10){cursecs="0" +cursecs}
        if(dursecs<10){cursecs="0" +dursecs}
        if(curmins<10){cursecs="0" +curmins}
        if(durmins<10){cursecs="0" +durmins}
        curtimetext.innerHTML=curmins+":"+cursecs;
        durtimetext.innerHTML=durmins+":"+dursecs;
    }else{
        curtimetext.innerHTML="00"+":"+"00";
        durtimetext.innerHTML="00"+":"+"00";

    }
}
function switchTrack(){
    if(playlist_index ==(playlist.length -1)){
        playlist_index=0;
    }else{
        playlist_index++;
    }
    fetchMusicDetails();
}
function loop(){
    if(audio.loop){
        audio.loop=false;
        $("#repeat img").attr("src","img/rep.png");
    }else{
        audio.loop=true;
        $("#repeat img").attr("src","img/rep1.png");
    }
}
function getRandomNumber(min,max){
    let step1= max-min+1;
    let step2=Math.random() * step1;
    let result=Math.floor(step2) + min;
    return result;
}
function random(){
    let randomIndex =getRandomNumber(0,playlist.length -1);
    playlist_index=randomIndex;
    fetchMusicDetails();
}

