<template>
  <div class="container">
    <div class="info">
      <!-- 작품 기본 정보 좌측 -->
      <div class="info-left">
        <div class="label">{{ info.status }}</div>
        <div class="title">{{ info.title }}</div>
        <div class="author">{{ info.author }}</div>
        <!-- 좋아요 버튼 -->
        <div class="btn-like" @click="clickLike">
          <svg viewBox="0 0 22.967 21.025">
            <g transform="translate(0 -1028.4)">
              <path
                :class="like ? 'on' : 'default'"
                d="M6.483,1028.925c-1.536,0-3.078,0.5-4.25,1.7c-2.343,2.4-2.279,6.1,0,8.5l9.25,9.8l9.25-9.8
                                    c2.279-2.4,2.343-6.1,0-8.5c-2.343-2.3-6.157-2.3-8.5,0l-0.75,0.8l-0.75-0.8C9.561,1029.425,8.019,1028.925,6.483,1028.925z"
              />
            </g>
          </svg>
          <div class="num">{{ info.like_cnt }}</div>
        </div>
        <img
          class="thumbnail"
          src="https://img.ridicdn.net/cover/3049005908/xxlarge"
        />
      </div>
      <!-- 작품 기본 정보 우측 -->
      <div class="info-right">
        <div class="description">{{ info.description }}</div>
        <div class="keyword">
          <div v-for="(k, i) in info.keyword.split(',').slice(1, -1)" :key="i">
            #{{ k }}
          </div>
        </div>
      </div>
      <!-- 회차 리스트 -->
      <div class="series">
        <table class="series-list">
          <thead>
            <td>No.</td>
            <td>제목</td>
            <td>조회수</td>
            <td>추천수</td>
            <td>작성일</td>
          </thead>
          <tbody>
            <!-- 1. 서버로 부터 받은 데이터를 통해 회차 리스트를 구성하세요.  -->
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import ax from "axios";
// 로컬 테스트 서버와 통신을 위한 설정
const axios = ax.create({ baseURL: "http://localhost:4000/" });

export default {
  // Variables
  data: () => ({
    id: 1,
    info: null,
    series: null,
    like: false
  }),
  // Created
  async created() {
    // 기본 작품 정보 호출
    let raw_info = await this.apiService("/getInfo", { id: this.id });
    this.info = raw_info[0];
    // 회차 리스트 호출
    this.series = await this.apiService("/getSeries", { book_id: this.id });
  },
  // Methods
  methods: {
    // API Service
    async apiService(url, params) {
      return new Promise((resolve, reject) => {
        axios
          .post(url, params)
          .then(res => resolve(res.data))
          .catch(err => reject(err));
      });
    },
    clickLike() {
      // 2. 좋아요 버튼을 클릭시 작동할 기능을 추가하세요.
    }
  },
  filters: {
    date: v => {
      // 3. 해당 필터 가능을 완성하여 날짜가 2020.XX.XX 형태로 표현되도록 하세요.
      return v;
    }
  }
};
</script>

<style lang="scss">
$color-purple: #b63dff;
$color-gold: #b2876f;
$color-white: #ffffff;
$color-black: #222222;
$color-darkgray: #777777;
$color-lightgray: #dddddd;
.container {
  padding: 0 50px;
}
.info {
  padding-top: 60px;
  display: flex;
  flex-wrap: wrap;
  .info-left {
    width: 50%;
    font-weight: 300;
    .label {
      display: inline-block;
      color: $color-white;
      background-color: $color-purple;
      border-radius: 30px;
      padding: 2px 10px;
      font-size: 12px;
      margin: 0;
    }
    .title {
      font-size: 38px !important;
      margin-top: 10px;
    }
    .author {
      font-size: 38px !important;
      margin-top: 5px;
    }
    .btn-like {
      display: flex;
      justify-content: space-between;
      padding: 0px 10px;
      align-items: center;
      width: 50px;
      border: 1px solid $color-lightgray;
      border-radius: 5px;
      margin-top: 10px;
      cursor: pointer;
      svg {
        width: 20px;
        .default {
          fill: none;
          stroke: $color-darkgray;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 10;
        }
        .on {
          fill: $color-purple;
          stroke: $color-purple;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-miterlimit: 10;
        }
      }
      .num {
        font-size: 22px;
        font-weight: 300;
      }
    }
    .thumbnail {
      width: 230px;
      margin-top: 40px;
    }
  }
  .info-right {
    width: 50%;
    .description {
      margin-top: 60px;
      font-size: 16px;
      color: $color-darkgray;
      // 4. 작품 설명이 세줄만 되도록 스타일문을 추가해주세요.
    }
    .keyword {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      transition: 0.3s;
      cursor: pointer;
      div {
        font-size: 14px;
        color: $color-gold;
        border: 1px solid $color-gold;
        border-radius: 5px;
        padding: 4px;
        margin-right: 5px;
        margin-bottom: 5px;
        background-color: $color-white;
      }
    }
    .keyword:hover {
      opacity: 0.8;
    }
  }
  .series {
    width: 100%;
    margin-top: 30px;
    .series-list {
      width: 100%;
      font-weight: 300;
      border-collapse: collapse;
      thead {
        border-bottom: 1px solid $color-lightgray;
        width: 100%;
        td {
          padding: 10px;
          font-size: 16px;
        }
      }
      tbody {
        tr {
          border-bottom: 1px solid $color-lightgray;
          cursor: pointer;
          td {
            font-size: 20px;
            padding: 10px;
          }
        }
        tr:hover {
          color: $color-purple;
        }
      }
    }
  }
}
</style>
