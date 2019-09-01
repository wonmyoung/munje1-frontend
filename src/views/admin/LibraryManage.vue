<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          data =>
            !search ||
            data.title.toLowerCase().includes(search.toLowerCase()) ||
            data.category.toLowerCase().includes(search.toLowerCase())
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
      <el-table-column label="카테고리" prop="category"></el-table-column>
      <el-table-column label="이미지" prop="image" width="140">
        <!-- <img :src="tableData[index].image" class="image" /> -->
      </el-table-column>
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
          category: null,
          image: null
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
  },
  methods: {
    handleEdit(index, row) {
      console.log(row);
      this.$router.push({ name: "editLibrary", params: { id: row.id } });
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
      axios.get(BASE_URL + `/admin/library/delete/${id}`, config).then(res => {
        console.log("res.data> ", res.data);
        if (res.status == 200) {
          this.getUserlist();
          // this.total = res.data.imageInfo.length;
          // this.data = res.data.imageInfo.map((imageInfo, i) => {
          //   console.log("imageInfo._id > ", imageInfo._id);

          //   let data = {
          //     id: imageInfo._id,
          //     index: i + 1,
          //     date: moment(imageInfo.created_at).format("YYYY-MM-DD"),
          //     author: imageInfo.author.username,
          //     rating: imageInfo.rating,
          //     description: imageInfo.description,
          //     title: imageInfo.title
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
      axios.get(BASE_URL + "/library/", config).then(res => {
        console.log("res > ", res);

        this.total = res.data.imageInfo.length;
        let libInfo = JSON.parse(JSON.stringify(res.data.imageInfo));

        this.tableData = libInfo.map((imageInfo, i) => {
          console.log("imageInfo.author.username > ", imageInfo.author);

          let data = {
            id: imageInfo._id,
            index: i + 1,
            date: moment(imageInfo.created_at).format("YYYY-MM-DD"),
            author:
              imageInfo.author == undefined ? null : imageInfo.author.username,
            category: imageInfo.category,
            title: imageInfo.title,
            image: imageInfo.file[0]
          };
          return data;
        });
        // this.tableData = this.data.slice(0, 5);
      });
    }
    // handleSizeChange(val) {
    //   console.log(`${val} items per page`);
    // },
  }
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background: #fff;
}
.image {
  width: 100%;
  height: 80px;
  border: 1px solid #e8e8e8;
  border-radius: 9px;
  max-width: 50px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: all 0.5s;
  box-shadow: 0 5px 11px 0 rgba(197, 197, 197, 0.1);
}

.pagenation {
  margin-top: 50px;
}
</style>
