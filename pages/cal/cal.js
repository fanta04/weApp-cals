// pages/cal/cal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      idb:"back",
      idc:"clear",
      idt:"toggle",
      idadd:"+",
      id9:"9",
      id8:"8",
      id7:"7",
      idj:"-",
      id6:"6",
      id5:"5",
      id4:"4",
      idx:"x",
      id3:"3",
      id2:"2",
      id1:"1",
      iddiv:"/",
      id0:"0",
      idd:".",
      ide:"=",
      screenData:"0",
      lastOperaSymbo:false,
      iconType:"waiting_circle",
      iconColor:"white",
      arr:[],
      logs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //按键处理函数
  clickBtn:function(event){
    var id = event.target.id;
    //退格键
    if(id == this.data.idb){
      var data = this.data.screenData;
      if(data == "0"){
        return;
      }
      data = data.substring(0,data.length-1);
      if(data == ""||data == "-"){
        data = 0;
      }
      //显示退格后的内容，并把arr弹出一个元素
      this.setData({"screenData":data});
      this.data.arr.pop();
    }
    //清空键
    else if(id == this.data.idc){
      this.setData({"screenData":"0"});
      this.data.arr.length = 0;
    }
    //等于键
    else if(id == this.data.ide){
      var data = this.data.screenData;
      if(data == "0"){
        return;
      }
      
      var lastWord = data.charAt(data.length);
      if(isNaN(lastWord)){
        return ;
      }
      //放入需要计算的数字
      var num = "";
      var lastOperator = "";
      var arr = this.data.arr;
      //需要计算的数字列表
      var optarr = [];
      for(var i in arr){
        //只要是0~9和小数点都放入num中
        if(isNaN(arr[i])==false || arr[i]==this.data.idd){
          num += arr[i];
          console.log(num);
        }
        //把num和操作符放入数字列表，清空num
        else {
          lastOperator = arr[i];
          optarr.push(num);
          optarr.push(arr[i]);
          num = "";
        }
      }
      //将num转换从字符串型转换为浮点数字型存入res中
      optarr.push(Number(num));
      var res = Number(optarr[0])*1.0;
      console.log(arr.length);
      
      //开始计算
      for(var i = 1;i<optarr.length;i++){
        if(isNaN(optarr[i])){
          //加法
          if(optarr[1] == this.data.idadd){
            res += Number(optarr[i+1]);
          }
          //减法
          else if(optarr[1] == this.data.idj){
            res -= Number(optarr[i+1]);
          }
          //乘法
          else if(optarr[1] == this.data.idx){
            res *= Number(optarr[i+1]);
          }
          //除法
          else if(optarr[1] == this.data.iddiv){
            res /= Number(optarr[i+1]);
          }
        }
      }
      //存储历史记录
      this.data.logs.push(data + res);
      wx.setStorageSync("calclogs",this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(res);//结果加入数字队列成为新的计算数

      this.setData({"screenData":res+""});//显示结果
    }
      //记录按键
      else{
        //不让重复多次显示操作符，例如：87+++、98+45---
        if(id == this.data.idadd ||id == this.data.idj ||id == this.data.idx ||id == this.data.iddiv){
          if(this.data.lastOperaSymbo || this.data.screenData=="0"){
            return ;
          }
        }
        
        //显示正在输入的数字或符号
        var sd = this.data.screenData;
        var data;
        if(sd == 0){
          data = id;
        }
        else {
          data = sd + id;
        }
        this.setData({"screenData":data});
        
        this.data.arr.push(id);//记录按键
        console.log(id);

        if(id == this.data.idadd ||id == this.data.idj ||id == this.data.idx ||id == this.data.iddiv){
          this.setData({"lastOperaSymbo":true});
        }else {
          this.setData({"lastOperaSymbo":false});
        }
      }
    },
    history:function(){
      wx.navigateTo({
        url:'../history/history'
      })
    }
})