// https://autumnfish.cn/ 歌曲id
var app = new Vue({
    el:".bigbox",
    data:{
        allShow:true,
        misShow:false,
        isShow:false,
        isPlay:false,
        PicSrc:"",
        MusicSrc:"",
        MvSrc:"",
        query:"",
        list:[],
        comments:[]
    },
    methods:{
        search:function(){
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                console.log(response.data.result.songs);
                that.list = response.data.result.songs;
            },function(err){

            });
        },
        play:function(MusicId){
            var that = this;
            axios.get("https://autumnfish.cn/song/url?id="+MusicId)
            .then(function(response){
                // console.log(response);
                that.MusicSrc = response.data.data[0].url;
            },function(err){})
            axios.get("https://autumnfish.cn/song/detail?ids="+MusicId)
            .then(function(response){
                that.PicSrc =response.data.songs[0].al.picUrl;
                that.isShow=true;
            },function(err){})
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+MusicId)
            .then(function(response){
                that.comments=response.data.hotComments;
                console.log(response.data.hotComments);
            },function(err){})
            that.misShow=false;
            that.allShow=true;
        },
        action:function(){
            console.log("action");
            this.isPlay=true;
        },
        pause:function(){
            console.log("pause");
            this.isPlay=false;
        },
        mvPlay:function(mvid){
            this.MusicSrc="";
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                that.MvSrc = response.data.data.url;
                that.misShow=true;
                that.allShow=false;
            },function(err){})
        },
        closeMv:function(){
            this.misShow=false;
            this.MvSrc="";
        }
        }
})
// https://autumnfish.cn/song/url/  歌曲资源
// https://autumnfish.cn/song/detail/  专辑封面
// https://autumnfish.cn/mv/url/  mv地址