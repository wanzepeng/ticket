var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            banner: "assets/banner.png",
            ticketMaker: "assets/ticketMaker1.png",
            action: '/image/upload',
            form: {
                storeName: '水之梦黄浦旗舰店',
                // storeName: '潮TOWN卓刀泉店',
                time: '',
                playerName: '',
                buddyName: '',
                message: '',
            },
            rules: {
                // time:  { required: true, message: '请选择日期时间', trigger: 'blur' },
                playerName: [{required: true, message: '请输入玩家名称', trigger: 'blur'}, { min: 1, max: 17, message: '长度在 1 到 17 个字符', trigger: 'blur' }],
                buddyName: [{required: true, message: '请输入同伴名称', trigger: 'blur'} , { min: 1, max: 17, message: '长度在 1 到 17 个字符', trigger: 'blur' }],
                message: [{required: true, message: '请输入寄语', trigger: 'blur'}, { min: 1, max: 34, message: '长度在 1 到 34 个字符', trigger: 'blur' }],
            },
            imageUrl: '',
            imgMaxSize: 50,
            fileData: {   // 接口需要的额外参数
            }
            , headers: {  // 请求头部参数
            }
        };
    },
    mounted: function () {
        const url = window.location.search;
        // this.getParams(url)
        this.form.time = this.getDate()
    },
    methods: {
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
                console.log(file.raw)
                console.log(this.imageUrl)
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