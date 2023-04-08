var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            banner: "assets/banner.png",
            // TODO 切换图片
            ticketMaker: "assets/ticketMaker1.png",
            // ticketMaker: "assets/ticketMaker2.png",
            action: '/image/upload',
            showCut: false,
            form: {
                storeName: '水之梦（黄浦店）',
                // storeName: '水之梦（CBD店）',
                // storeName: '潮TOWN（卓刀泉店）',
                // storeName: '潮TOWN（黄石店）',
                time: '',
                playerName: '',
                buddyName: '',
                message: '',
            },
            rules: {
                // time:  { required: true, message: '请选择日期时间', trigger: 'blur' },
                playerName: [{required: true, message: '请输入玩家名称', trigger: 'blur'}, {
                    min: 1,
                    max: 17,
                    message: '长度在 1 到 17 个字符',
                    trigger: 'blur'
                }],
                buddyName: [{required: true, message: '请输入同伴名称', trigger: 'blur'}, {
                    min: 1,
                    max: 17,
                    message: '长度在 1 到 17 个字符',
                    trigger: 'blur'
                }],
                message: [{required: true, message: '请输入寄语', trigger: 'blur'}, {
                    min: 1,
                    max: 34,
                    message: '长度在 1 到 34 个字符',
                    trigger: 'blur'
                }],
            },
            imageUrl: '',
            imgMaxSize: 50,
            fileData: {   // 接口需要的额外参数
            },
            headers: {  // 请求头部参数
            },
            //    截图使用参数
            model: false,
            modelSrc: '',
            crap: false,
            previews: {},
            option: {
                img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4',
                size: 1,
                full: false,
                outputType: 'png',
                canMove: true,
                fixedBox: true,
                original: false,
                canMoveBox: false,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                // autoCropWidth: 80%,
                // autoCropHeight: 340,
                centerBox: true,
                high: true,
                max: 99999
            },
            show: true,
            fixed: true,
            fixedNumber: [7, 10]
        };
    },
    mounted: function () {
        const url = window.location.search;
        // this.getParams(url)
        this.form.time = this.getDate()
        this.$refs.cropper.cropX -= 20
    },
    methods: {
        // 开始截图
        confirmCut() {
            this.$refs.cropper.getCropBlob(data => {
                // do something
                console.log(data)
                var img = window.URL.createObjectURL(data)
                this.imageUrl = img
                this.showCut = false
            })
        },
        cancelCut() {
            this.showCut = false
        },
        // 图片裁剪
        startCrop() {
            // start
            this.crap = true
            this.$refs.cropper.startCrop()
        },
        stopCrop() {
            //  stop
            this.crap = false
            this.$refs.cropper.stopCrop()
        },
        clearCrop() {
            // clear
            this.$refs.cropper.clearCrop()
        },
        refreshCrop() {
            // clear
            this.$refs.cropper.refresh()
        },
        changeScale(num) {
            num = num || 1
            this.$refs.cropper.changeScale(num)
        },
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        finish(type) {
            // 输出
            // var test = window.open('about:blank')
            // test.document.body.innerHTML = '图片生成中..'
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    console.log(data);
                    var img = window.URL.createObjectURL(data)
                    this.model = true
                    this.modelSrc = img
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    this.model = true
                    this.modelSrc = data
                })
            }
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
            console.log(data)
        },

        finish2(type) {
            this.$refs.cropper2.getCropData((data) => {
                this.model = true
                this.modelSrc = data
            })
        },
        finish3(type) {
            this.$refs.cropper3.getCropData((data) => {
                this.model = true
                this.modelSrc = data
            })
        },
        down(type) {
            // event.preventDefault()
            var aLink = document.createElement('a')
            aLink.download = 'demo'
            // 输出
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    this.downImg = window.URL.createObjectURL(data)
                    aLink.href = window.URL.createObjectURL(data)
                    aLink.click()
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    this.downImg = data
                    aLink.href = data
                    aLink.click()
                })
            }
        },

        uploadImg(e, num) {
            //上传图片
            // this.option.img
            var file = e.target.files[0]
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                return false
            }
            var reader = new FileReader()
            reader.onload = (e) => {
                let data
                if (typeof e.target.result === 'object') {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]))
                } else {
                    data = e.target.result
                }
                if (num === 1) {
                    this.option.img = data
                } else if (num === 2) {
                    this.example2.img = data
                }
            }
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file)
        },
        imgLoad(msg) {
            console.log(msg)
        },
        cropMoving(data) {
            console.log(data, '截图框当前坐标')
        },
        //-----------------------------------
        getDate: function () {
            var myDate = new Date();	//创建Date对象
            var Y = myDate.getFullYear() + "";   //获取当前完整年份
            var M = myDate.getMonth() + 1;  //获取当前月份
            var D = myDate.getDate();   //获取当前日1-31
            var H = myDate.getHours();  //获取当前小时
            var i = myDate.getMinutes();    //获取当前分钟
            var s = myDate.getSeconds();    //获取当前秒数

            Y = Y.substring(2, 4)
            console.log(Y)
            // 月份不足10补0
            if (M < 10) {
                M = '0' + M;
            }
            // 日不足10补0
            if (D < 10) {
                D = '0' + D;
            }
            // 小时不足10补0
            if (H < 10) {
                H = '0' + H;
            }
            // 分钟不足10补0
            if (i < 10) {
                i = '0' + i;
            }
            // 秒数不足10补0
            if (s < 10) {
                s = '0' + s;
            }
            // 拼接日期分隔符根据自己的需要来修改
            var nowDate = Y + '-' + M + '-' + D + '  ' + H + ':' + i;
            return nowDate;
        },
        getParams: function (searchUrl) {
            var index = searchUrl.indexOf('?');
            if (index == -1) {
                return;
            }
            searchUrl = searchUrl.substr(index + 1);
            var obj = new Object();
            var params = searchUrl.split('&');
            for (var i = 0; i < params.length; i++) {
                var item = params[i].split('=');
                obj[item[0]] = decodeURI(item[1]);
            }
            console.log(obj)
            // this.form.storeName = obj.storeName
            console.log(this.from)
            return obj;
        },
        // 图片上传成功的操作
        handleAvatarSuccess(res, file) {
            console.log(res)
            // res.imgUrl 1679646637542storm-clouds-hole-background.jpg
            if (res.code === 200) {
                this.imageUrl = URL.createObjectURL(file.raw)
                this.option.img = URL.createObjectURL(file.raw)
                console.log(file.raw)
                console.log(this.imageUrl)
                this.showCut = true
            } else {
                this.$message.error("图片上传失败...")
            }
        }, // 图片上传前的判断
        beforeAvatarUpload(file) {
            const isLtM = file.size / 1024 / 1024
            if (isLtM > this.imgMaxSize) {
                this.$message.error('上传头像图片大小不能超过' + imgMaxSize + 'MB')
            }
            return isLtM
        },
        onSubmit(formName) {
            console.log(formName)
            console.log(this.form)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const url = 'ticket.html?storeName' + '=' + this.form.storeName
                        + "&time" + '=' + this.form.time
                        + "&playerName" + '=' + this.form.playerName
                        + "&buddyName" + '=' + this.form.buddyName
                        + "&message" + '=' + this.form.message
                        + "&imageUrl" + '=' + this.imageUrl
                    window.location.href = url;//跳转
                } else {
                    // alert('请输入信息哦!!');
                    this.$message.error('请填写完整信息！昵称最多17个字符,寄语最多34个字符！');
                    return false;
                }
            });

        }
    }
});