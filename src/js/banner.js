document.addEventListener('DOMContentLoaded',function(){

    let focus = document.querySelector('#w_banner');
    let ul = focus.querySelector('ul');
    let img = ul.querySelectorAll('img');
    let imgWidth = focus.clientWidth;
    for(let i=0;i<img.length;i++){
       img[i].style.width = imgWidth + 'px';
   
    }
     // 把第一张复制到最后
    ul.appendChild(ul.children[0].cloneNode(true));
    let len = ul.children.length;//10

     // 索引值
     let index = 0;

     
     // 1）设置ul宽度，达到水平排列的效果
     ul.style.width = imgWidth*len + 'px';


     // 生成页码
     let page = document.createElement('div');
     page.classList.add('page');
     for(let i=1;i<len;i++){
         let span = document.createElement('span');
         span.innerText = i;
         if(i===1){
             span.classList.add('active');
         }
         page.appendChild(span);
     }
     focus.appendChild(page);

    // 2）水平轮播效果
    /*
        index       left
        0           0
        1           -810
        2           -1620
        3           -2430

        推导公式：left = index*width
     */
    let timer = setInterval(autoPlay,3000);


    // 鼠标移入移出
    focus.onmouseenter = ()=>{
        clearInterval(timer);
        page.style.display = 'block';
    }

    focus.onmouseleave = ()=>{
        timer = setInterval(autoPlay,3000);
        // page.style.display = 'none';
    }

    focus.onclick = e=>{
        if(e.target.parentNode.className === 'page'){
            // 把index改成当前页码对应的索引值
            index = e.target.innerText-1;

            show();
        }
    }

    function autoPlay(){
        index++;

        show();
    }

    function show(){
        if(index>=len){//0,1,2,3,4
            ul.style.left = 0;
            index = 1;
        }
        animate(ul,{left:-index*imgWidth});

        // 页码高亮
        // 先清除所有高亮
        for(var i=0;i<len-1;i++){
            page.children[i].className = '';
        }

        if(index==len-1){
            page.children[0].classList.add('active')
        }else{
            page.children[index].classList.add('active');
        }
    }
});
