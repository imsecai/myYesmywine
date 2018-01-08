document.addEventListener('DOMContentLoaded',function(){
   
    // 获取数据
    // 创建异步请求对象得到数据
    var status = [200,304];
    var goodlist;
    var xhr=new XMLHttpRequest();
    xhr.onload=function(){
            if(status.includes(xhr.status)){
                goodlist=JSON.parse(xhr.responseText);
                console.log(goodlist);
                ls_goods.innerHTML=addGoodlist(goodlist);
                EventBinding();
            }
        }
    xhr.open('get',"../api/data/goodlist.json");
    xhr.send();


    var goods=document.getElementById("goods");

   function addGoodlist(arr){
        var res="";
        for(var i=0;i<arr.length;i++){
            var goods=arr[i];//创建一个对象
            res+='<dl data-id='+goods.id+' class="goodlist_idx"><dt><img src="'+goods.imgurl+'"/></dt><dd><input type="checkbox" /><b>'+goods.details+'</b><h3><s>'+goods.firstprice+'</s> <span>'+goods.nowprice+'</span></h3><p>'+goods.save+'</p><a href="#">wholesalles<i></i></a></dd></dl>'
        }
        return res;
    }
    function goodascending(arr){
        for(var i=0;i<arr.length-1;i++){
            for(var j=i+1;j<arr.length;j++){
                if(arr[i].nowprice<arr[j].nowprice){
                    var warp=arr[i];
                    arr[i]=arr[j];
                    arr[j]=warp;
                }
            }
        }
        return arr;
        // addGoodlist(arr);
        // console.log(arr);
    }
    var ascending=document.getElementById("ascending");
    var descending=document.getElementById("descending");
    ascending.onclick=function(){
        var asclist=goodascending(goodlist);
        console.log(asclist);
        ls_goods.innerHTML=addGoodlist(asclist);
        EventBinding();

    }
    descending.onclick=function(){
        var asclist=goodascending(goodlist);
        ls_goods.innerHTML=addGoodlist(asclist.reverse());
        EventBinding();
        
    }
    
   
 var datalist =document.getElementById('datalist');
 // console.log(datalist);
    datalist.innerHTML  = goodslist.map(function(goods){
        return '<li data-id="'+ goods.id+'"><img src="'+ goods.imgurl +'"><p>'+goods.name +'</p><p>list price:'+ goods.listprice +'</p><p>ourprice:'+ goods.ourprice+'</p><p class="datalist_save">'+goods.save+'</p></li>'
    }).join(''); 
        // console.log(res);
        // ------------------------------
       
    function EventBinding(){
        var goods_list = document.getElementsByClassName('goodlist_idx');
        for(var i=0;i<goods_list.length;i++){
            goods_list[i].idx = i;

            goods_list[i].onclick = function(){
                // 点击后将当前对象的信息转成字符串
                // console.log(666);
                var params = '?';
                for(var attr in goodlist[this.idx]){
                    params += attr+'='+ goodlist[this.idx][attr] +'$';
                }
                //删除最后一个&
                params = params.slice(0,-1);

                //将数据转码
                params = encodeURI(params);

                //将数据传到goodlist_data页面地址栏
                location.href = 'detail.html'+params;

            }
        }
    }
    
})

