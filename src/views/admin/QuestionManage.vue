<template>
  <div class="container">
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
      <el-table-column
        border
        center
        label="번호"
        prop="index"
        width="70"
      ></el-table-column>
      <el-table-column label="작성일" prop="date" width="120"></el-table-column>
      <el-table-column label="저자" prop="author"></el-table-column>
      <el-table-column label="제목" prop="title"></el-table-column>
      <el-table-column
        label="설명"
        prop="description"
        width="140"
      ></el-table-column>
      <el-table-column
        label="Rating"
        prop="rating"
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
          id: null,
          index: null,
          date: null,
          author: null,
          title: null,
          description: 0,
          rating: 0
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
      console.log(row);
      this.$router.push({ name: "editExam", params: { id: row.id } });
    },
    handleDelete(index, row) {
      console.log(index, row);
      confirm("해당 컨텐츠를 삭제 하시겠습니까?");
      this.removeData(row.id);
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
          this.getUserlist();
          // this.total = res.data.exam.length;
          // this.data = res.data.exam.map((exam, i) => {
          //   console.log("exam._id > ", exam._id);

          //   let data = {
          //     id: exam._id,
          //     index: i + 1,
          //     date: moment(exam.created_at).format("YYYY-MM-DD"),
          //     author: exam.author.username,
          //     rating: exam.rating,
          //     description: exam.description,
          //     title: exam.title
          //   };
          //   return data;
          // });
        }

        // this.tableData = this.data.slice(0, 5);
      });
    },
    getUserlist() {
      let accessToken = localStorage.getItem("accessToken");

      let config = {
        headers: {
          accessToken: accessToken
        }
      };
      axios.get(BASE_URL + "/admin/examList", config).then(res => {
        console.log("res.data.exam.length > ", res.data.exam.length);

        this.total = res.data.exam.length;
        this.tableData = res.data.exam.map((exam, i) => {
          console.log("exam._id > ", exam._id);

          let data = {
            id: exam._id,
            index: i + 1,
            date: moment(exam.created_at).format("YYYY-MM-DD"),
            author: exam.author.username,
            rating: exam.rating,
            description: exam.description,
            title: exam.title
          };
          return data;
        });
        // this.tableData = this.data.slice(0, 5);
      });
    }
    // handleSizeChange(val) {
    //   console.log(`${val} items per page`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`${val} handleCurrentChange`);
    //   let index = this.pageSize * (val - 1);
    //   this.tableData = this.data.slice(index, index + 5);
    // }
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
