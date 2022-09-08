const   $ = document.querySelector.bind(document)
        const   $$ = document.querySelectorAll.bind(document)

        const   playList = $('#songs')
        const   timePlay = $('#song-time button')
        const   songTime = $('#song-time')
        const   heading = $('#song h2')
        const   singer = $('#song p')
        const   cdThumb = $('#song img')
        const   audio   = $('#audio')
        const   playButton = $('.ti-control-play')
        const   rootX = $('#song').offsetLeft + songTime.offsetLeft
        const   nextButton = $('.ti-control-skip-forward')
        const   prevButton = $('.ti-control-skip-backward')
        const   autoButton = $('.ti-control-shuffle')
        const   loopButton = $('.ti-loop')
        const   PLAYER_STORAGE_KEY = 'DINHTHE'
        console.log(timePlay.getBoundingClientRect().left);
        console.log(songTime.getBoundingClientRect().left);
        console.log(rootX);

    
        const app = {
                    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
                    getIndex: 0,
                    isPlaying: false,
                    isAuto: false,
                    isLoop: false,
                    currentIndex: 0,
                    songs: [
                        {
                            name: 'Buông Đôi Tay Nhau Ra',
                            singer: 'Sơn Tùng M-TP',
                            adds:   './music/BuongDoiTayNhauRa-SonTungMTP-4184408.mp3',
                            img: './img/buông đôi tay nhau ra.jpg'

                        },
                        {
                            name: 'Chúng Ta Không Thuộc Về Nhau',
                            singer: 'Sơn Tùng M-TP',
                            adds: './music/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3',
                            img: './img/chúng ta không thuộc về nhau.jpg'
                        },
                        {
                            name: 'Hai Mươi Hai',
                            singer: 'Amee X Hứa Kim Tuyền',
                            adds: './music/HaiMuoiHai22-HuaKimTuyenAMEE-7231237.mp3',
                            img: './img/hai mươi hai.jpg'
                        },
                        {
                            name: 'Hóa Tương Tư',
                            singer: 'Anh Dragon',
                            adds: './music/HoaTuongTu-AnhRong-6860990.mp3',
                            img: './img/hóa tương tư.jpg'
                        },
                        {
                            name: 'Mặt Mộc',
                            singer: 'Phạm Nguyên Ngọc X VANH',
                            adds: './music/MatMoc-PhamNguyenNgocVAnhAnNhi-7793420.mp3',
                            img: './img/mặc mộc.jpg'
                        },
                        {
                            name: 'Rồi Tới Luôn',
                            singer: 'Không Biết',
                            adds: './music/RoiToiLuon-Nal-7064237.mp3',
                            img: './img/rồi tới luôn.jpg'
                        },
                        {
                            name: 'Vệ Tinh',
                            singer: 'Hieuthuhai',
                            adds: './music/VeTinh-HIEUTHUHAIHoangTonKewtiie-7730914.mp3',
                            img: './img/vệ tinh.jpg'
                        },
                        {
                            name: 'Ai Muốn Nghe Không',
                            singer: 'Đen Vâu',
                            adds: './music/den_ai_muon_nghe_khong_m_v_-4930333889244350861.mp3',
                            img: './img/ai-muon-nghe-khong-Den-Vau.jpg'
                        },
                        {
                            name: 'Chờ Anh Nhé',
                            singer: 'Hoàng Dũng if Hoàng ROB',
                            adds: './music/ChoAnhNhe-HoangDungHoangRob-4475500.mp3',
                            img: './img/chờ anh nhé.jpg'
                        },
                        {
                            name: 'Lạc Đường',
                            singer: 'Phạm Trưởng',
                            adds: './music/LacDuong-PhamTruong-3025698.mp3',
                            img: './img/lạc đường.jpg'
                        },
                        {
                            name: 'Hãy Ôm Con',
                            singer: 'Angelo Band',
                            adds: './music/Ha-y-O-m-Con-Angelo-Band-Lyrics-Video.mp3',
                            img: './img/hãy ôm con.jpg'
                        },
                    ],
                    
                    setConfig: function(key, value){
                        this.config[key] = value;
                        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
                    },
                    
                    
                    
                    render: function(){
                        
                        const htmls = this.songs.map((song, index) => {                            
                            return `
                                    <div key=${index} class="songs-song ${index === this.currentIndex ? 'active' : ""}">
                                        <img src="${song.img}" alt="">
                                        <div>
                                            <h3 style="margin-bottom: 5px">${song.name}</h3>
                                            <p>${song.singer}</p>
                                        </div>
                                    </div>
                                    `
                            })
                            $('#songs').innerHTML = htmls.join('');
                    },
                    loadCurrentSong: function (){
                        heading.textContent = this.currentSong.name;
                        cdThumb.src = this.currentSong.img;
                        audio.src = this.currentSong.adds;
                        singer.textContent = this.currentSong.singer;                        
                    },
                    loadConfig: function(){
                        this.isAuto = this.config.isAuto;
                        this.isLoop = this.config.isLoop;

                    },


                    defineProperties: function(){
                        Object.defineProperty(this, 'currentSong', {
                            get: function(){
                                return this.songs[this.currentIndex]
                            }
                        })
                    },

                    nextSong: function(){
                        this.currentIndex++;
                        if (this.currentIndex >= this.songs.length) this.currentIndex = 0;
                        this.loadCurrentSong();
                    },

                    prevSong: function(){
                        this.currentIndex--;
                        if (this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
                        this.loadCurrentSong();
                    },

                    autoSong: function(){
                        let ramdom;
                        do 
                        {
                            random = Math.floor(Math.random() * this.songs.length);
                        }
                        while (random === this.currentIndex)
                        this.currentIndex = random;
                        this.loadCurrentSong();                        
                    },
                    scrollToActiveSong: function(){
                        setTimeout(() => {
                            $('.active').scrollIntoView();
                        }, 500)
                    },
                    handleEvent: function(){
                        const _this = this;
                        const cdThumbAnimate = cdThumb.animate([
                            {transform: 'rotate(360deg)'}
                        ], {
                            duration: 10000,
                            iterations: Infinity
                        })
                        cdThumbAnimate.pause();


                        window.onresize = function(){
                            location.reload()
                        }


                        //xử lý khi click play
                        playButton.onclick = function(){
                            _this.isPlaying ? audio.pause() : audio.play();
                        }
                        audio.onplay = function(){
                            _this.isPlaying = true;
                            playButton.classList.add('ti-control-pause')
                            cdThumbAnimate.play();
                        }
                        audio.onpause = function(){
                            _this.isPlaying = false;
                            playButton.classList.remove('ti-control-pause');
                            cdThumbAnimate.pause();
                        }

                        //khi hết bài hát
                        audio.onended = function(){
                            (_this.isLoop) ? audio.play() : nextButton.onclick();
                        }



                        // thời gian của bài hát
                        audio.ontimeupdate = function(){
                            if (audio.duration) timePlay.style.width = (audio.currentTime / audio.duration) * songTime.offsetWidth;                           
                        }
                        songTime.onclick = function(e){
                            timePlay.style.width = (e.pageX - rootX);
                            const seekTime = (e.pageX - rootX) / songTime.offsetWidth * audio.duration;
                            audio.currentTime = seekTime;
                        }

                        //khi bấm nút next
                        nextButton.onclick = function(){
                            (_this.isAuto) ? _this.autoSong() : _this.nextSong();
                            audio.play();
                            _this.render();
                            _this.scrollToActiveSong()
                        }

                        //khi bấm nút lùi
                        prevButton.onclick = function(){
                            (_this.isAuto) ? _this.autoSong() : _this.prevSong();
                            audio.play();
                            _this.render();
                            _this.scrollToActiveSong();
                        }

                        //khi bấm nút auto
                        autoButton.onclick = function(){
                            if (_this.isAuto)
                            {
                                this.classList.remove('red-color');
                                _this.isAuto = false;
                            }
                            else
                            { 
                                    this.classList.add('red-color')
                                    _this.isAuto = true;                    
                            }  
                            _this.setConfig('isAuto', _this.isAuto)                          
                        }

                        //khi bấm nút phát lại 1 bài hát
                        loopButton.onclick = function(){
                            if (_this.isLoop)
                            {
                                this.classList.remove('red-color')
                                _this.isLoop = false;
                            }
                            else
                            {
                                this.classList.add('red-color')
                                _this.isLoop = true
                            }
                            _this.setConfig('isLoop', _this.isLoop)                          

                        }

                        //bấm sang bài hát khác
                        playList.onclick = function(e){
                            const songNode = e.target.closest('.songs-song:not(.active)');
                            if (songNode)
                            {
                                _this.currentIndex = Number(songNode.getAttribute('key'))
                                _this.loadCurrentSong();
                                _this.render();
                                audio.play();
                            }

                        }
                    },

                    start: function(){
                        this.loadConfig();


                        //Định nghĩ các thuộc tính cho object
                        this.defineProperties()



                        //lắng nghe các sự kiện
                        this.handleEvent()


                        //tải thông tin bài hát đầu tiên
                        this.loadCurrentSong();

                        autoButton.classList.toggle('red-color', this.isAuto)
                        loopButton.classList.toggle('red-color', this.isLoop)


                        //render playlist
                        this.render();                        
                    }
        }          
        app.start();