<template>
  <div id="app">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(img, index) in imgUrl" :key="index" >
            <div class="img-container">
              <img :src="img"/>
            </div>
          </el-col>
        </el-row>
        <div class="btn-container">
          <el-button type="primary" @click="post(1)">异步请求1</el-button>
          <el-button type="primary" @click="post(2)">异步请求2</el-button>
          <el-button type="primary" @click="post(3)">异步请求3</el-button>
        </div>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :span="8" >
            <h2>页面加载各个耗时阶段</h2>
            <el-table
              :data="netStage"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="duration"
                label="耗时(毫秒)"
                :formatter="formatter"
                >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8" >
            <h2>页面静态资源耗时</h2>
            <el-table
              :data="staticSource"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="url"
                label="链接"
                >
              </el-table-column>
              <el-table-column
                prop="duration"
                label="耗时(毫秒)"
                :formatter="formatter"
                >
              </el-table-column>
            </el-table>
          </el-col>
          <el-col :span="8" >
            <h2>页面异步请求耗时</h2>
            <el-table
              :data="xhrSource"
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                >
              </el-table-column>
              <el-table-column
                prop="duration"
                label="耗时(毫秒)"
                :formatter="formatter"
                >
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

import axios from "axios";

axios.interceptors.request.use(function(config) {
  performance.mark(`start-${config.url}`)
  return config;
});

axios.interceptors.response.use(function(config) {
  let url = config.config.url
  performance.mark(`end-${url}`);
  performance.measure(`请求${url}`, `start-${url}`, `end-${url}`);
  return config;
});

export default {
  name: 'App',
  data: function() {
    return {
      imgUrl: [
        'https://imagelx.yidianzixun.com/static/CmcRYlvqLAeAERm6AAGAZlb_8-M264/33547988.jpg',
        'https://imagelx.yidianzixun.com/static/CmcRYlvqkEeAFE4HAAIyOsM4Dg8703/76070932.jpg',
        'https://imagelx.yidianzixun.com/static/CmcRYlwNyfeAJKw2AAGf1dZmqqY230/12646955.jpg',
        'https://imagelx.yidianzixun.com/static/CmcRYVwGOtCAKxjEAAI2Fo-7iXM374/31384280.jpg'
      ],
      netStage: [],
      staticSource: [],
      xhrSource: []
    }
  },
  methods: {
    
    getSourceTiming() {
      var time = performance.timing;
      var timingArray = [];
      timingArray.push({
        name: '重定向时间',
        duration: (time.redirectEnd - time.redirectStart) 
      }, {
        name: 'DNS解析时间',
        duration: (time.domainLookupEnd - time.domainLookupStart) 
      }, {
        name: 'TCP完成握手时',
        duration: (time.connectEnd - time.connectStart)
      }, {
        name: 'HTTP请求响应完成时间',
        duration: (time.responseEnd - time.requestStart)
      }, {
        name: 'DOM开始加载前所花费时间',
        duration: (time.responseEnd - time.navigationStart) 
      }, {
        name: 'DOM加载完成时间',
        duration: (time.domComplete - time.domLoading) 
      }, {
        name: 'DOM结构解析完成时间',
        duration: (time.domInteractive - time.domLoading) 
      }, {
        name: '脚本加载时间',
        duration: (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) 
      });
      return timingArray;
    },

    getStaticTiming() {
      var timingArray = [];
      var sourceEntries = performance.getEntriesByType('resource');
      return sourceEntries.map(item => {
        return {
          name: item.initiatorType,
          url: item.name,
          duration: item.duration
        }
      });
      
    },

    formatter(row, column) {
      if (row.duration !== 0) {
        return row.duration.toFixed(4);
      } 
      return row.duration;
    },

    post(type) {
      let url = `/api/test${type}`;
      axios.get(url).then(ret => {
        this.$message({
          message: '请求成功',
          type: 'success',
          duration: 800
        });
      })
    }
  },

  mounted: function() {
    let _this = this;

    window.onload = function() {
      _this.netStage = _this.getSourceTiming();
      _this.staticSource = _this.getStaticTiming();
    }

    const obs = new PerformanceObserver((items) => {
      _this.xhrSource.push(items.getEntries()[0]);
      // performance.clearMarks();
    });

    obs.observe({ entryTypes: ['measure'] });
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img-container {
  width: 300px;
  height: 150px;
}
.img-container img {
  width: 100%;
}
.el-col {
  padding: 0 5px;
}
.btn-container {
  padding: 20px 20px;
  text-align: left;
}

</style>
