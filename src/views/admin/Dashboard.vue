<template>
  <div class="container">
    <div id="page1" class="pageWrap">
      <h2>관리자 페이지</h2>

      <article class="outLinks">
        <ul>
          <li>
            <a @click="$router.push({ name: 'userManage' })">
              <img
                src="../../assets/images/dashboard/page1_ico1.png"
                alt="icon"
              />
              <b>회원 관리</b>
            </a>
          </li>
          <li>
            <a @click="$router.push({ name: 'questionManage' })">
              <img
                src="../../assets/images/dashboard/page1_ico2.png"
                alt="icon"
              />
              <b>문제집 관리</b>
            </a>
          </li>
          <li>
            <a @click="$router.push({ name: 'libraryManage' })">
              <img
                src="../../assets/images/dashboard/page1_ico3.png"
                alt="icon"
              />
              <b>라이브러리 관리</b>
            </a>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      title: "교육원설정",

      subMenu: 1,
      show: true,
      displayBackground: false
    };
  },
  methods: {
    setDashboard(value) {
      this.title = value;
      this.subMenu = value;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
}
.pageWrap {
  width: 100%;
  padding: 2em 0;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 114px;
  background: #fff;
  padding: 20px;
}
.pageWrap > h2 {
  font-size: 25px;
  text-align: left;
  margin: 30px 0 0 0;
}

.centerModal > h3 {
  font-size: 20px;
  text-align: left;
  margin: 10px 0 30px 0;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
// .pageWrap h2 {
//   font-size: 20px;
//   font-weight: 600;
// }
.dashboard {
  cursor: pointer;
  widows: 100%;
  height: 100%;
}
.gallery {
  height: 70% !important;
  width: 100%;
}

#page1 .outLinks > ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  // margin: 0 -100px;
  border: 1px solid #fafafa;
  border-radius: 4px;
  // outline: 1px solid #ccc;
  background: #f9f9f9;
  padding: 20px;
}

#page1 .outLinks li {
  border: 1px solid #e8e8e8;
  background: #fff;
  flex: 0 1 auto;
  width: 130px;
  margin: 10px;
  padding: 15px 0;
  transition: all 0.5s;
  box-shadow: 0 5px 7px 0 rgba(105, 105, 105, 0.1);
}

#page1 .outLinks li:hover {
  border-color: #80629c;
  color: #80629c;
  cursor: pointer;
}

#page1 .outLinks li > a {
  display: block;
  text-align: center;
  color: #777;
}

#page1 .outLinks li > a img {
  width: 50%;
  max-width: 50px;
  transition: all 0.5s;
}

#page1 .outLinks li:hover > a img {
  opacity: 0.5;
}

#page1 .outLinks li > a b {
  display: block;
  position: relative;
}

#page1 .outLinks li b:after {
  content: ">";
  color: transparent;
  transition: all 0.5s;
  padding-left: 0;
}

#page1 .outLinks li:hover > a b:after {
  padding-left: 10px;
  color: #80629c;
}
.centerModal {
  position: absolute;
  right: calc(50% - 225px);
  top: 20%;
  width: 500px;
  height: 500px;
  /* overflow-y: scroll; */
  /* z-index: 12; */
  background: #fff;
  padding: 30px;
}
@media all and (max-width: 1490px){
  // .pageWrap{
  //   width:90%;
  // }
}
@media all and (max-width: 660px){
  #page1 .outLinks ul{
    display: block;
  }
  #page1 .outLinks ul li{
    width:auto;
  }
}
</style>
