<template>
    <div class="container">
        <section class="profile">
            <a href="#">x</a>
            <h1>프로필 편집</h1>
            <div class="circle_img">
                <img src="@/assets/images/home/스마트폰-사진.jpg">
            </div>
            <div class="article">
                <ul class="no_write">
                    <li>이름 :</li>
                    <li>이메일 :</li>
                    <li>비번 :</li>
                    <li>비번확인 :</li>
                </ul>
                <ul class="write">
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                    <li><input type="text"></li>
                </ul>
            </div>
            <div class="btns">
                <md-button class="md-raised md-primary">확인</md-button>
                <md-button class="md-raised md-accent">취소</md-button>
            </div>
        </section>
        <div class="b">
        </div>
    </div>
</template>
<style scoped>
    .container{
        position: relative;
        width:100%;
        height: 100%;
    }
    .container .profile{
       position: fixed;
       width:455px;
       height: 670px;
       background: white;
       top:calc(50% - 335px);
       left:calc(50% - 250px);
       border:2px solid #ccc;
       text-align: center;
       z-index: 99;
       padding:30px;
       box-sizing: border-box;
    }
    .container .profile a{
        position: absolute;
        right:20px;
        top:20px;
    }
    .container .profile h1{
        font-size: 30px;
        padding:40px 0 20px;
    }
    .container .profile .circle_img{
        width:200px;
        height: 200px;
        border-radius: 50%;
        margin:0 auto;
    }
    .container .profile .circle_img img{
        width:100%;
        height: 100%;
        border-radius: 50%;
    }
    .container .article{
        display: flex;
        width:90%;
        margin:30px auto;
        justify-content: space-between;
    }
    .container .article .no_write{
        width:20%;
        padding:0;
    }
    .container .article .no_write li{
        text-align: right;
        height: 30px;
        margin-bottom: 10px;
    }
    .container .article .write{
        width:75%;
        padding:0;
    }
    .container .article .write li{
        width:100%;
        height: 30px;
        border:1px solid black;
        margin-bottom:10px;
    }
     .container .article .write li input{
         width:100%;
         height: 100%;
         display: block;
         font-size: 19px;
     }
    .container .btns{
        width:50%;
        margin:0 auto;
        display: flex;
        justify-content: space-between;
    }
    @media all and (max-width:700px){
        .container{
            width:auto;
        }
    }
</style>