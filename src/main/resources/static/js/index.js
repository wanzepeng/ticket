var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            banner: "assets/banner.png",
            action:'/image/upload',
            form: '',
            imageUrl: '',
            imgMaxSize: 50,
            fileData: {   // 接口需要的额外参数
                category: 12
            }, headers: {  // 请求头部参数
                accessToken: ''
            }
        };
    },
    mounted: function () {
    },
    methods: {
        // 图片上传成功的操作
        handleAvatarSuccess(res, file) {
            if (res.msgCode === 200) {
                this.imageUrl = URL.createObjectURL(file.raw)
            } else {
                this.$message.error(res.msgContent)
            }
        }, // 图片上传前的判断
        beforeAvatarUpload(file) {
            const isLtM = file.size / 1024 / 1024
            if (isLtM > this.imgMaxSize) {
                this.$message.error('上传头像图片大小不能超过' + imgMaxSize + 'MB')
            }
            return isLtM
        }
    }
});