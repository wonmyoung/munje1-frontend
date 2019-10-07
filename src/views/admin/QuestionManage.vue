<template>
  <div class="container">
    <h2>문제관리</h2>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search ||
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.author.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column border center label="번호" prop="index" width="70"></el-table-column>
      <el-table-column sortable label="작성일" prop="date" width="120"></el-table-column>
      <el-table-column sortable label="저자" prop="author"></el-table-column>
      <el-table-column label="제목" prop="title"></el-table-column>
      <el-table-column label="설명" prop="description" width="140"></el-table-column>
      <el-table-column label="상태" prop="status" width="140" sortable></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            v-if="scope.row.status !== 'DELETE'"
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
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
          id: null,
          index: null,
          date: null,
          author: null,
          title: null,
          description: 0,
          status: null
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
    this.getExamlist();
    this.handleCurrentChange(1);
  },
  methods: {
    handleEdit(index, row) {
      console.log("111", row);
      this.$router.push({ name: "editExam", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      let result = confirm("해당 컨텐츠를 삭제 하시겠습니까?");
      if (result == true) {
        this.removeData(row.id);
      }
    },
    removeData(id) {
      let accessToken = localStorage.getItem("accessToken");

      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios.get(BASE_URL + `/exam/delete/${id}`, config).then(res => {
        console.log("res.data> ", res.data);
        if (res.status == 200) {
          this.getExamlist();
        }
      });
    },
    getExamlist() {
      let accessToken = localStorage.getItem("accessToken");

      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios.get(BASE_URL + "/admin/examList", config).then(res => {
        console.log("res.data.exam.length > ", res.data.exam.length);

        this.total = res.data.exam.length;
        this.data = res.data.exam.map((exam, i) => {
          console.log("exam._id > ", exam._id);

          let data = {
            id: exam._id,
            index: i + 1,
            date: moment(exam.created_at).format("YYYY-MM-DD"),
            author: exam.author == undefined ? null : exam.author.username,
            status: exam.status,
            description: exam.description,
            title: exam.title
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
button {
  display: block;
  width: 80px;
}
.el-button + .el-button {
  margin: 10px 0 0 0;
}
</style>
