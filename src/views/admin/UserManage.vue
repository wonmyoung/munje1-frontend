<template>
  <div class="container">
    <h2>회원관리</h2>
    <el-table
      :data="tableData.filter(data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.date.toLowerCase().includes(search.toLowerCase()) ||
            data.email.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column border center label="번호" prop="index" width="70"></el-table-column>
      <el-table-column sortable label="가입일" prop="date" width="120"></el-table-column>
      <el-table-column sortable label="이름" prop="name"></el-table-column>
      <el-table-column sortable label="이메일" prop="email"></el-table-column>
      <el-table-column sortable label="푼문제수" prop="examNum" width="140"></el-table-column>
      <el-table-column sortable label="만든문제수" prop="mngNum" width="140"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleSearch(scope.$index, scope.row)">상세보기</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :pager-count="7"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { BASE_URL } from "../../config/env";
import moment from "moment";
import vueMomentJs from "vue-momentjs";
const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1"
};

export default {
  data() {
    return {
      tableData: [
        {
          index: null,
          date: null,
          name: null,
          email: null,
          examNum: 0,
          mngNum: 0
        }
      ],
      search: "",
      total: null,
      pageSize: 10,
      currentPage: 1,
      data: []
    };
  },
  created() {
    this.getUserlist();
    this.handleCurrentChange(1);
  },
  methods: {
    handleSearch(index, row) {
      this.$router.push({ name: "userProfile", query: { id: row.id } });
    },
    getUserlist() {
      let accessToken = localStorage.getItem("accessToken");

      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios.get(BASE_URL + "/admin/userlist", config).then(res => {
        this.total = res.data.userlist.length;
        this.data = res.data.userlist.map((user, i) => {
          let data = {
            id: user._id,
            index: i + 1,
            date: moment(user.created_at).format("YYYY-MM-DD"),
            name: user.username,
            email: user.email,
            examNum: user.resultData.length,
            mngNum: user.myExam.length
          };
          return data;
        });
        this.tableData = this.data.slice(0, 10);
      });
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`${val} handleCurrentChange`);

      let index = this.pageSize * (val - 1);
      this.tableData = this.data.slice(index, index + 10);
    }
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #fff;
}
h2 {
  text-align: left;
  margin: 30px 0 20px 5px;
  font-size: 22px;
  font-weight: bold;
}
.pagenation {
  margin-top: 50px;
}
</style>
