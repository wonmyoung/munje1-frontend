<template>
  <div>
    <div class="container">
      <div id="mypage" class="pageWrap">
        <section class="mypageInfo">
          <article class="profile">
            <h3>기본정보</h3>
            <div class="photo">
              <img
                src="../assets/images/avatar/page2_profile_m.png"
                alt="photo"
              />
            </div>
            <!-- 프로필 사진 -->
            <p class="name">홍길동</p>
            <p class="type">수강생</p>
            <dl class="birth">
              <dt>생년월일</dt>
              <dd>1994-07-10</dd>
            </dl>
            <dl>
              <dt>핸드폰</dt>
              <dd>010-2222-2222</dd>
            </dl>
          </article>
          <article class="examInfo">
            <h3>나의 문제</h3>
            <ul>
              <li>1</li>
              <li>2</li>
              <li>3</li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentComponent: null,
      displayBackground: false,
      displayCenterModal: false
    };
  },
  methods: {
    viewComponent(view) {
      this.currentComponent = view;
      this.displayBackground = true;

      if (view == "Signature" || view == "Upload") {
        this.displayCenterModal = true;
      } else {
        this.displayCenterModal = false;
      }
    },
    closeModal() {
      this.currentComponent = null;
      this.displayBackground = false;
    }
  }
};
</script>

<style scoped>
#mypage {
  margin: 0 auto;
  max-width: 1000px;
}
#mypage .mypageInfo {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.profile {
  width: 270px;
  border: 1px solid #e8e8e8;
  padding: 20px;
  box-sizing: border-box;
}

.examInfo {
  width: 700px;
  border: 1px solid #e8e8e8;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

#mypage .mypageInfo > article h3 {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -1px;
  position: relative;
  margin-bottom: 20px;
  text-align: center;
}

#mypage .mypageInfo > article h3:after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: #ddd;
  position: absolute;
  left: 0;
  bottom: -10px;
}

#mypage .mypageInfo .profile {
  text-align: center;
  background: #fff;
  height: 400px;
}

#mypage .mypageInfo .profile .photo {
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  margin: 10px auto;
}

#mypage .mypageInfo .profile .photo img {
  max-width: 100%;
  height: 100%;
}

#mypage .mypageInfo .profile .name {
  font-size: 25px;
}

#mypage .mypageInfo .profile .name:after {
  content: "님";
  font-size: 12px;
  color: #555;
}

#mypage .mypageInfo .type {
  background: #e8e8e8;
  border-radius: 30px;
  display: inline-block;
  padding: 2px 10px;
}

#mypage .mypageInfo .birth {
  margin-top: 30px;
}

#mypage .mypageInfo .profile > dl {
  display: flex;
}

#mypage .mypageInfo .profile > dl dt {
  flex: 0 1 auto;
  width: 30%;
  text-align: left;
}

#mypage .mypageInfo .profile > dl dd:before {
  content: ":";
  padding-right: 8px;
}

#mypage .mypageInfo .profile .btns a {
  display: block;
  border-top: 1px solid #e8e8e8;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50%;
  box-sizing: border-box;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  transition: all 0.5s;
}

#mypage .mypageInfo .profile .btns a:hover {
  color: #80629c;
  background: #e8e8e8;
}

#mypage .mypageInfo .profile .btns a:last-child {
  left: auto;
  right: 0;
  border-left: 1px solid #e8e8e8;
}
</style>
