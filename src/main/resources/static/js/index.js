var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            banner: "assets/banner.png",
            action: '/image/upload',
            form: {
                storeName: '',
                time: '',
                playerName: '',
                buddyName: '',
            },
            rules:{
                time:  { required: true, message: '请选择日期时间', trigger: 'blur' },
                playerName:  [{ required: true, message: '请输入玩家名称', trigger: 'blur' }],
                buddyName:  { required: true, message: '请输入同伴名称', trigger: 'blur' },
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
        this.getParams(url)
    },
    methods: {
        getParams: function(searchUrl) {
            var index = searchUrl.indexOf('?');
            if(index == -1){
                return;
            }
            searchUrl = searchUrl.substr(index + 1);
            var obj = new Object();
            var params = searchUrl.split('&');
            for(var i = 0; i < params.length; i++){
                var item = params[i].split('=');
                obj[item[0]] = decodeURI(item[1]);
            }
            console.log(obj)
            this.form.storeName = obj.storeName
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
                        + "&imageUrl" + '=' + this.imageUrl
                    window.location.href = url;//跳转
                } else {
                    // alert('请输入信息哦!!');
                    return false;
                }
            });

        }
    }
});