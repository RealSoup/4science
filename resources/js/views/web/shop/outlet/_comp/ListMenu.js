const menu = [
    { kor: '피펫관',          eng:  'pipette', },
    { kor: '환경측정기관',    eng:  'measure', },
    { kor: '트위져관',        eng:  'tweezer', },
    { kor: '핫플레이트관',    eng:  'hotplate', },
    { kor: '광파워미터관',    eng:  'meter', },
];

export { menu    };


/*
<nav class="type">
    <a class="bt" :class="{ 'active': type==1 }" @click="type=1"><span>브랜드별</span><div class="liquid"></div></a>
    <a class="bt" :class="{ 'active': type==2 }" @click="type=2"><span>종류별</span><div class="liquid"></div></a>
</nav>




nav.type { display:flex; justify-content:center; align-items:center; background:#0c0c0c; width:50%; margin:auto; }
nav.type .bt { position:relative; display:block; padding:20px 50px; width:210px; margin:1rem 3rem; text-align:center; overflow:hidden; cursor:pointer; transition-duration:.3s; transition: all 2s}
nav.type .bt:active { box-shadow: 0 0 10px #4073ff, 0 0 50px #4073ff, 0 0 100px #4073ff; transition: 0s; }
nav.type .bt span { position:relative;z-index:1; color:#fff; font-size:20px; letter-spacing:8px; font-weight:bold; cursor:pointer; }
nav.type .bt .liquid { position:absolute; left:0; top:-80px; width:210px; height:210px; background:#4073ff; box-shadow:inset 0 0 50px rgba(0,0,0.5); transition:.5s; }
nav.type .bt:hover .liquid,
nav.type .bt.active .liquid { top:-120px; }
nav.type .bt .liquid:before,
nav.type .bt .liquid:after { content:''; position:absolute; width: 200%; height: 200%; top:0; left:50%; transform:translate(-50%, -75%); background:#000; }
nav.type .bt .liquid:before { border-radius:45%; background:rgba(20,20,20,1); animation: animate 5s linear infinite; }
nav.type .bt .liquid:after { border-radius:40%; background:rgba(20,20,20,.5); animation: animate 10s linear infinite; }
@keyframes animate {
    0% { transform:translate(-50%, -75%) rotate(0deg); }
    100% { transform:translate(-50%, -75%) rotate(360deg); }
}
*/
