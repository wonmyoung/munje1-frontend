<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column
        border
        center
        label="번호"
        prop="index"
        width="70"
      ></el-table-column>
      <el-table-column label="가입일" prop="date" width="120"></el-table-column>
      <el-table-column label="이름" prop="name"></el-table-column>
      <el-table-column label="이메일" prop="email"></el-table-column>
      <el-table-column
        label="푼문제수"
        prop="examNum"
        width="140"
      ></el-table-column>
      <el-table-column
        label="만든문제수"
        prop="mngNum"
        width="140"
      ></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="Type to search" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
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
      pageSize: 5,
      currentPage: 1,
      data: []
    };
  },
  created() {
    this.getUserlist();
    this.handleCurrentChange(1);
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
            index: i + 1,
            date: moment(user.created_at).format("YYYY-MM-DD"),
            name: user.username,
            email: user.email,
            examNum: user.resultData.length,
            mngNum: user.myExam.length
          };
          return data;
        });
        this.tableData = this.data.slice(0, 5);
      });
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`);
    },
    handleCurrentChange(val) {
      console.log(`${val} handleCurrentChange`);

      let index = this.pageSize * (val - 1);
      this.tableData = this.data.slice(index, index + 5);
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
.pagenation {
  margin-top: 50px;
}
</style>
