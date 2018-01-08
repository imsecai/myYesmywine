window.onload = function(){
    render();

    //把商品信息写入页面,封装
    function render(){
        // var datalist=JSON.parse(Cookie.get('datalist'));
        // 下面所有的datalist==>carlist
        var carlist=[];
        var cookies = document.cookie;
        console.log(cookies);

        if(cookies.length){
            cookies = cookies.split('; ');//['carlist=[{},{}]','username=xxx']
            cookies.forEach(function(item){
                var arr = item.split('=');
                if(arr[0] === 'carlist'){
                    carlist = JSON.parse(arr[1]);
                }
            });
        }


        var total=0;
        var save=0;
        var allTotal =0;
        var allSave=0;
        var carTable=document.getElementById('carTable');
        var tbody=document.getElementsByTagName('tbody')[0];

        //cookie生成html
        tbody.innerHTML=carlist.map(function(goods){
            // total=goods.qty*goods.price;
            // save=goods.qty*goods.yuanjia-total;
            var price = goods.ourprice.split(" ")[1];
            total = goods.number * price;
            save = goods.number * goods.listprice.split(" ")[1]-total;
            allTotal+=total;
            allSave+=save;
            return `
            <tr data-guid='${goods.id}'>
                <td class="goods" ><img src=${goods.imgurl} alt="" />
                <span>${goods.color}</span>
                <p>ID:<span>${goods.id}</span></p><br />
                <p>Size:<span>${goods.size}</span></p>
                </td>
                <!-- 加减数量 -->
                <td class="count">
                    <span class="reduce">-</span>
                    <input type="text" class="count-input" value="${goods.number}" />
                    <span class="add">+</span>
                </td>

                <td class="price">
                <span>${goods.listprice}</span>py6.<br />
                    <span>${goods.ourprice}</span>py6.
                </td>
                <!-- Total price -->
                <td class="subtotal">
                    <span>${total}</span>py6.<br />
                    You save <span>${save}</span>py6.
                </td>
                <!-- remove删除 -->
                <td class="operation">
                    <span class="delete">
                        <button class="delete">&times;</button>
                    </span>
                </td>
            </tr>
            `
        }).join('');

        if(tbody.children.length>0){
           document.getElementsByClassName('checkout')[0].className='aaa checkout';
        }else{
             
             document.getElementsByClassName('checkout')[0].className='checkout';
        }
        

        document.getElementById('priceTotal').innerHTML=allTotal;
        document.getElementById('saveTotal').innerHTML=allSave;

    document.onclick=function(e){

        var e =e||window.event;
        var target=e.target||e.srcElement;
        var countinput = document.getElementsByClassName('count-input');
       
        //单行删除
        if(target.className=='delete'){
           
            var currentLi=target.parentNode.parentNode;

            var id=currentLi.parentNode.getAttribute('data-guid');
            console.log(id);
            //得到cookie
            // var lis=carlist;
            // console.log(lis);
            
            for(var i=0;i<carlist.length;i++){
                if(carlist[i].id==id){
                   
                    //删除这个对象
                    carlist.splice(i,1);
                    break;
                }
            }
            //重写cookie
            // Cookie.set('carlist',JSON.stringify(lis));
            document.cookie = 'carlist=' + JSON.stringify(carlist);

            render();
        }
        //一键清空
        // else if(target.className=='esc'){

        //     Cookie.remove('carlist');

        //     document.getElementsByTagName('tbody')[0].innerHTML=''; 
        //     document.getElementsByClassName('checkout')[0].className='checkout';
        //     document.getElementById('priceTotal').innerHTML='0.00';
        //     document.getElementById('saveTotal').innerHTML='0.00';
        // }
        //数量的加减
        if(target.className=='add'){

            var currentLi=target.parentNode.parentNode;

            var id=currentLi.getAttribute('data-guid');
             console.log(id)

             var countinput = countinput.value;
            //得到cookie
            // var lis=JSON.parse(Cookie.get('carlist',''));
            
            for(var i=0;i<carlist.length;i++){
                if(carlist[i].id==id){
                   
                    //qty++
                    countinput++;
                    carlist[i].number++;
                    break;
                }
            }
            //重写cookie
            // Cookie.set('carlist',JSON.stringify(lis));
            document.cookie = 'carlist=' + JSON.stringify(carlist);
            

            render();
        }
        if(target.className=="reduce"){
            var currentLi=target.parentNode.parentNode;

            var id=currentLi.getAttribute('data-guid');
            
            //得到cookie
            // var lis=JSON.parse(Cookie.get('carlist',''));
            
            for(var i=0;i<carlist.length;i++){
                if(carlist[i].id==id){
                   
                    //qty--
                    countinput--;
                    carlist[i].number--;
                    if( carlist[i].number<=0){
                        return;
                    }
                    break;
                }
            }
            //重写cookie
            // Cookie.set('carlist',JSON.stringify(lis));
            document.cookie = 'carlist=' + JSON.stringify(carlist);
            

            render();
        }

    }
        
    }
    // render();
}