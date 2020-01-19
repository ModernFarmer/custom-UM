**`>>>  custom-UM 基于 UM库, 在引入 custom-UM 之前必须先引入 UM库  <<<`**</br></br></br>
# _MovingScroll()
　　　***`自定义滚动条 及 自定义锚记导航插件`***
#
基本用法API :
```javascript
_MovingScroll({
    box:'#box',　　　//　总容器元素的class或id　　string  必须  !*注: 插件将会以当前id或者class的第一个元素作为总容器元素
    contentBox:'#contentBox',　　　//　内容容器元素的class或id　　string  必须  !*注: 插件将会以当前id或者class的第一个元素作为内容容器
    scrollBox:'#scrollBox',　　　//　滚动条元素的class或id　　string  必须  !*注: 插件将会以当前id或者class的第一个元素作为滚动条元素
    speed:150,    //  内容滚动速度  number  [可选, 默认150]  *注: 每次鼠标滚轮滚动时内容容器移动的距离, 单位为'px'
    navigation:[　　　//　锚记定位　　array　[可选, 默认null]　*数组内是各个json对象[json, json, ...]，json内是{clickSelector:[string](锚记链接元素选择器)，targetSelector:[string](锚记书签元素选择器)}
        {clickSelector:'#c1', targetSelector:'#t1'},
        {clickSelector:'#c2', targetSelector:'#t2'},
        {clickSelector:'#c3', targetSelector:'#t3'},
        {clickSelector:'#c4', targetSelector:'#t4'},
        {clickSelector:'#c5', targetSelector:'#t5'},
        ...
    ]
});

**!注意: 从custom-UM-1.2.0开始, _MovingScroll()将是一个对象, 它身上有.adaptive(ms, bl)方法和setNav(arr)方法, 可以手动自适应滚动条高度和修改锚记导航设置

MovingScrollObject.adaptive(ms, bl):  
    ms:多少毫秒后执行自适应滚动条高度  number  必须;
    bl:是否立即关闭自适应定时器  boolean  [可选, 默认true]  *注:true: 继续执行,不关闭定时器; false:立即终止执行并立即关闭定时器 

MovingScrollObject.setNav(arr):
    arr:锚记定位数组,格式同_MovingScroll()方法的navigation参数  必须  array
```
基础效果 :</br>
![image](https://github.com/ModernFarmer/Image/blob/master/MovingScroll.gif)</br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; padding:0; margin:0;}
    #box {width:60%; height:60%; border:10px solid black; padding-left:0; padding-right:0; background:gray; position:absolute; left:10%; top:5%;}
    #scrollBox {width:2%; height:0; background:#3D3D3D; border-radius:5px; cursor:pointer; position:absolute; right:.5%; top:0; z-index:10;}
    #listBox {width:25%; height:100%; background:#3D3D3D; position:absolute; left:0; top:0;}
    #contentBox {width:75%; position:absolute; right:0; top:0;}
    .listText {width:100%; text-align:center; line-height:40px; color:white; cursor:pointer;}
    .listText:hover {background:#020202;}
    .moduleName {font-size:18px; font-weight:900; line-height:30px;}
    .moduleContent {width:90%; height:100px; background:#DDDDDD; position:relative; left:5%;}
    #btn {width:300px; height:40px; position:absolute; top:70%; left:50%;}
</style>

<script src="./UM-1.3.5.js"></script>
<script src="./custom-demo.js"></script>

<html>
<body>
    <div id="box">    <!-- 总容器div -->
        <div id="listBox">
            <div class="listText title1">001&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title2">002&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title3">003&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title4">004&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title5">005&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title6">006&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title7">007&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title8">008&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title9">009&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
            <div class="listText title10">010&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
        </div>

        <div id="scrollBox"></div>    <!-- 滚动条div -->

        <div id="contentBox">    <!-- 内容div -->
            <div class="option1">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;001</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option2">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;002</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option3">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;003</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option4">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;004</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option5">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;005</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option6">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;006</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option7">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;007</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option8">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;008</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option9">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;009</div>
                <div class="moduleContent"></div>
            </div>
            <div class="option10">
                <div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;010</div>
                <div class="moduleContent"></div>
            </div>
        </div>
    </div>
    <button id="btn">修改锚记导航设置</button>
</body>
</html>

<script>
var OBJECT_MS=_MovingScroll({
    box:'#box',　　//　容器盒子选择器
    contentBox:'#contentBox',　　//　滚动内容盒子选择器
    scrollBox:'#scrollBox',　　//　滚动条盒子选择器
    speed:150,　　//　滚动速度
    navigation:[　　//　锚记定位
        {clickSelector:'.title1', targetSelector:'.option1'},
        {clickSelector:'.title2', targetSelector:'.option2'},
        {clickSelector:'.title3', targetSelector:'.option3'},
        {clickSelector:'.title4', targetSelector:'.option4'},
        {clickSelector:'.title5', targetSelector:'.option5'},
        {clickSelector:'.title6', targetSelector:'.option6'},
        {clickSelector:'.title7', targetSelector:'.option7'},
        {clickSelector:'.title8', targetSelector:'.option8'},
        {clickSelector:'.title9', targetSelector:'.option9'},
        {clickSelector:'.title10', targetSelector:'.option10'}
    ]
});

var num=10;

btn.onclick=function(){
    num+=1;
    var numStr=num<100?'0'+num:''+num;

    // 添加标题子选项
    var dom1=document.createElement('div');
    dom1.innerHTML=numStr+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    dom1.className='listText title'+num;
    listBox.appendChild(dom1);

    // 添加内容子选项
    var dom2=document.createElement('div');
    dom2.innerHTML='<div class="moduleName">&nbsp;&nbsp;&nbsp;&nbsp;'+numStr+'-新添加的子元素</div><div class="moduleContent"></div>';
    dom2.className='option'+num;
    contentBox.appendChild(dom2);

    // 生成新锚记定位数组
    var navigation=JSON.parse(JSON.stringify(OBJECT_MS.navigation));
    navigation.push({
        clickSelector:'.title'+num,
        targetSelector:'.option'+num
    });

    OBJECT_MS.setNav(navigation);  // 设置锚记导航
    OBJECT_MS.adaptive(500);  // 自适应滚动条高度
};
</script>
```
# _PullDown()
　　　***`下拉选择框插件`***
#
基本用法API :
```javascript
_PullDown({
    caption:'#titleBtn',　　　//　标题元素的class或id　　string  必须  !*注: 插件将会以当前id或者class的第一个元素作为标题元素
    down:'#contentBox',　　　//　下拉框元素的class或id　　string  必须  !*注: 插件将会以当前id或者class的第一个元素作为下拉框元素
    speed:.2,　　　//　速度(在几秒内完成过渡)   number  [可选, 默认0.5]  *!注: 最大可设置为0.5
    maxHeight:'300px',   //  下拉框体最大高度   string  [可选, 默认null]   !*注: 必须带上单位,否则报错
        //  **如果有maxHeight参数, 需要在当前页面添加一个名为.UM_PullDown_scrollClassName的样式, 它是生成的滚动条的样式, 具体用法请看基础效果源码
    now:false,    //  下拉框初始状态   boolean  [可选, 默认false]  *注: true:下拉框初始展开; false:下拉框初始折叠
    root:null,    //  嵌套插件的根插件  object  [可选, 默认null]  !!*注: 该属性为嵌套插件的关键属性, 具体用法看基础案例
    select:false,   //  当点击选项时是否折叠下拉框   boolean  [可选, 默认false]  *注: true:点击选项时不折叠下拉框; false:点击选项时折叠下拉框
    D_click:false,   //  当点击页面背景时是否折叠下拉框   boolean  [可选, 默认false]  *注: true:点击背景不折叠下拉框; false:点击背景折叠下拉框
    choosable:false,  //  标题元素的文字内容是否可被选中   boolean  [可选, 默认false]  *注: true:可被选中; false:不可被选中
    scrollClassName:'UM_PullDown_scrollClassName'  // 当存在滚动条时滚动条的className  string  [可选, 默认'UM_PullDown_scrollClassName']  !*注: 如果需要给不同的插件定制不同的滚动条样式, 那么可以设置scrollClassName参数, 然后再在<style>里面添加相应className的css样式
}, movingObj, fn); // movingObj  外挂式_MovingScrill插件对象, 用于创建_PullDown对象后有添加或减少下拉选项的场景. [可选]
        //(*如果创建_PullDown对象后有添加或减少下拉选项的需求, 必须有movingObj参数, 否则增加或减少下拉选项后将可能无法正常使用_PullDoen插件功能)
        // fn 点击caption元素的回调方法 [function] 该回调会在_MovingScrill插件的now参数改变之后执行, 该回调自带参数:_MovingScrill插件对象 (1.2.4新增)

**!注意: 从custom-UM-1.2.0开始, _PullDown()将是一个对象, 它身上有.unfold()和.fold()两个方法, 可以手动展开和折叠下拉框.

PullDownObject.unfold():  展开下拉框

PullDownObject.fold():  折叠下拉框

PullDownObject.reBind():  可以重新给选项绑定内部事件(场景: 比如下拉选项增加后, 增加的选项dom应该执行该方法, 否则增加的选项被点击后不能正常隐藏下拉框)
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/Image/blob/master/PullDown.gif)</br></br>
基础效果源代码 :
```javascript
<style>
        html, body {width:100%; height:100%; padding:0; margin:0;}
        #titleBtn {width:200px; height:40px; line-height:40px; text-align:center; cursor:pointer; border:1px solid #0000FF; border-radius:10px; position:absolute; left:20%; top:10%;}
        #contentBox {width:250px; padding-top:20px; padding-bottom:20px; border:1px solid gray; border-radius:3px; position:absolute; left:20%; top:calc(10% + 50px);}
        .listOpt {width:85%; line-height:30px; border:1px solid gray; border-radius:5px; margin-left:5%; margin-top:5px;}
        .listOpt_last {margin-bottom:5px;}
        #childCaption {position:relative;}
        .childList {width:85%; font-size:12px; line-height:20px; border:1px solid #DFDFDF; border-radius:5px; margin-left:10%; margin-top:5px;}
        .smallList {width:75%; line-height:16px; font-size:12px; border:1px solid #3BCBCA; border-radius:3px; margin-left:20%; margin-top:5px;}
        
        #btn1 {width:200px; height:30px; line-height:30px; border-radius:3px; border:1px dashed salmon; text-align:center; cursor:pointer; background:#e9e9e9; position:absolute; left:40%; top:20%;}
        #btn2 {width:200px; height:30px; line-height:30px; border-radius:3px; border:1px dashed salmon; text-align:center; cursor:pointer; background:#e9e9e9; position:absolute; left:40%; top:calc(20% + 35px);}
        #btn3 {width:200px; height:30px; line-height:30px; border-radius:3px; border:1px dashed salmon; text-align:center; cursor:pointer; background:#e9e9e9; position:absolute; left:40%; top:calc(20% + 70px);}
        #btn4 {width:200px; height:30px; line-height:30px; border-radius:3px; border:1px dashed salmon; text-align:center; cursor:pointer; background:#e9e9e9; position:absolute; left:40%; top:calc(20% + 105px);}
        #btn5 {width:200px; height:30px; line-height:30px; border-radius:3px; border:1px dashed salmon; text-align:center; cursor:pointer; background:#e9e9e9; position:absolute; left:40%; top:calc(20% + 140px);}
        #btn6 {width:200px; height:30px; line-height:30px; border-radius:3px; border:1px dashed salmon; text-align:center; cursor:pointer; background:#e9e9e9; position:absolute; left:40%; top:calc(20% + 175px);}
        #btn1:hover,#btn2:hover,#btn3:hover,#btn4:hover,#btn5:hover,#btn6:hover {background:#71BEE8; color:white;}
        /* 固定名称为 .UM_PullDown_scrollClassName 的样式代表产生的滚动条的样式, 默认滚动条是没有宽度的, 所以在没有设置.UM_PullDown_scrollClassName的情况下下拉框体式看不到滚动条的(鼠标滚轮滚动功能还是可以正常使用的)*/
        .UM_PullDown_scrollClassName {width:5px; border-radius:3px; background:#B0B0B0;}
</style>

<script src="./UM-1.3.5.js"></script>
<script src="./custom-UM-1.2.0.js"></script>

<html>
<body>
    <div id="titleBtn">_PullDown</div>　　　<!--标题div-->
    <div id="contentBox">      <!--下拉内容div-->
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option1</div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option2</div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option3</div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option4</div>
        <div isUmCaption="on">  <!-- 该元素是嵌套插件的caption元素, 如果给它加 isUmCaption="on" 属性, 则可以让它在被点击的时候不折叠父插件 -->
            <div class="listOpt" id="childCaption">&nbsp;&nbsp;&nbsp;&nbsp;option5 - 2级嵌套</div>
            <div class="listOpt" id="childContent">
                <div class="childList">&nbsp;&nbsp;&nbsp;&nbsp;childOption1</div>
                <div class="childList">&nbsp;&nbsp;&nbsp;&nbsp;childOption2</div>
                <div isUmCaption="on">
                    <div class="childList" id="smallCaption">&nbsp;&nbsp;&nbsp;&nbsp;childOption3 - 3级嵌套</div>
                    <div class="childList" id="smallContent">
                        <div class="smallList">smallOption1</div>
                        <div class="smallList">smallOption2</div>
                        <div class="smallList">smallOption3</div>
                        <div class="smallList">smallOption4</div>
                        <div class="smallList listOpt_last">smallOption5</div>
                    </div>
                </div>
                <div class="childList">&nbsp;&nbsp;&nbsp;&nbsp;childOption6</div>
                <div class="childList listOpt_last">&nbsp;&nbsp;&nbsp;&nbsp;childOption7</div>
            </div>
        </div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option6</div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option7</div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option8</div>
        <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option9</div>
        <div class="listOpt listOpt_last">&nbsp;&nbsp;&nbsp;&nbsp;option10</div>
    </div>
    
    <div id="btn1">展开父插件</div>
    <div id="btn2">折叠父插件</div>
    <div id="btn3">展开2级嵌套插件</div>
    <div id="btn4">折叠2级嵌套插件</div>
    <div id="btn5">展开3级嵌套插件</div>
    <div id="btn6">折叠3级嵌套插件</div>
</body>
</html>

<script>
let OBJECT_PARENT=_PullDown({
    caption:'#titleBtn',　　　//　标题选择器　　selector
    down:'#contentBox',　　　//　下拉内容选择器　　selector
    speed:.2,　　　//　速度(在几秒内完成过渡)
    maxHeight:'300px',
    now:false
});

let OBJECT_CHILD_1=_PullDown({
    caption:'#childCaption',　　　//　标题选择器　　selector
    down:'#childContent',　　　//　下拉内容选择器　　selector
    root:OBJECT_PARENT,　　　//　嵌套的父元素选择器　　selector
    now:true,
    speed:.2　　　//　速度(在几秒内完成过渡)
});

let OBJECT_CHILD_2=_PullDown({
    caption:'#smallCaption',　　　//　标题选择器　　selector
    down:'#smallContent',　　　//　下拉内容选择器　　selector
    root:OBJECT_PARENT,　　　//　嵌套的父元素选择器　　selector
    now:true,
    speed:.2　　　//　速度(在几秒内完成过渡)
});

btn1.onclick=function(){
    _stopPropagation(event);  // 阻止事件冒泡
    OBJECT_PARENT.unfold(); // 展开父插件  **! 插件对象上的unfold()方法用法
};
btn2.onclick=function(){
    _stopPropagation(event);  // 阻止事件冒泡
    OBJECT_PARENT.fold(); // 折叠父插件  **! 插件对象上的fold()方法用法
};
btn3.onclick=function(){
    _stopPropagation(event);  // 阻止事件冒泡
    OBJECT_CHILD_1.unfold(); // 展开2级嵌套插件
};
btn4.onclick=function(){
    _stopPropagation(event);  // 阻止事件冒泡
    OBJECT_CHILD_1.fold(); // 折叠2级嵌套插件
};
btn5.onclick=function(){
    _stopPropagation(event);  // 阻止事件冒泡
    OBJECT_CHILD_2.unfold(); // 展开3级嵌套插件
};
btn6.onclick=function(){
    _stopPropagation(event);  // 阻止事件冒泡
    OBJECT_CHILD_2.fold(); // 折叠3级嵌套插件
};
</script>
```
# _PullLeft()
　　　***`左拉选择框插件`***
#
基本用法API :
```javascript
_PullLeft({　　　//　左拉内容过渡插件  参数：json
    caption:_('.caption', 0),　　　//　标题选择器　　selector
    left:_('.left', 0),　　　//　左拉内容选择器　　selector
    speed:1,　　　//　速度(在几秒内完成过渡)　　number　[可选, 默认0.5]
    now:false,　　　//　左拉内容初始状态(false隐藏或者true显示)　　boolean　[可选, 默认false]
    select:false,　　　//　点击左拉框是否隐藏左拉框(false隐藏或者true不隐藏)　　boolean　[可选, 默认false]
    D_click:false,　　　//　点击背景是否隐藏左拉框(false隐藏或者true不隐藏)　　boolean　[可选，默认false]
    choosable:false　　　//　标题选择器内的文字是否可被选中(false不可被选中)　　boolean　[可选, 默认false]
});
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/Image/blob/master/_PullLeft.gif)</br></br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; padding:0; margin:0;}
    #titleBtn {width:40px; height:200px; line-height:50px; text-align:center; cursor:pointer; border:1px solid #0000FF; border-radius:10px; position:absolute; left:20%; top:10%;}
    #contentBox {height:200px; border:1px solid #FF8000; border-radius:10px; position:absolute; left:calc(20% + 50px); top:10%;}
    .listOpt {width:30px; height:180px; line-height:36px; text-align:center; border:1px solid gray; border-radius:5px; float:left; margin-left:10px; margin-top:10px;}
    .listOpt_last {margin-right:10px;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
<body>
    <div id="titleBtn"></br>点</br>我</br></div>
    <div id="contentBox">
        <div class="listOpt"></br>选</br>项</br>1</br></div>
        <div class="listOpt"></br>选</br>项</br>2</br></div>
        <div class="listOpt"></br>选</br>项</br>3</br></div>
        <div class="listOpt"></br>选</br>项</br>4</br></div>
        <div class="listOpt"></br>选</br>项</br>5</br></div>
        <div class="listOpt"></br>选</br>项</br>6</br></div>
        <div class="listOpt"></br>选</br>项</br>7</br></div>
        <div class="listOpt"></br>选</br>项</br>8</br></div>
        <div class="listOpt"></br>选</br>项</br>9</br></div>
        <div class="listOpt listOpt_last"></br>选</br>项</br>10</br></div>
    </div>
</body>
</html>

<script>
_PullLeft({
    caption:_(titleBtn),　　//　标题选择器
    left:_(contentBox),　　//　左拉内容选择器
    speed:.5　　//　速度(在几秒内完成过渡)
});
</script>
```
# _Drag()
　　　***`拖拽插件`***
#
基本用法API :
```javascript
_Drag({　　　//　拖拽插件，参数:json
    mousedownBox:_('.aaa', 0),　　　//　被鼠标左键按下后发生拖拽的选择器(即触发器)　　selector
    dragBox:_('.box', 0),　　　//　被拖拽主体的选择器　　selector　[可选, 默认为mousedownBox]
    axis:'x'　　　//　被拖拽元素沿哪个轴运动　　string('x'或者'y')　[可选, 默认为 null (即同时沿x轴和y轴)]
});

***注: 被拖拽主体元素必须设置 position:absolute|relative; 样式 和 top:xxx 样式
***注: 被拖拽主体元素的拖拽范围会被限制在 [用于定位它的元素] 的宽高范围内(通俗地说, 就是被拖拽主体的第一个有 position:absolute|relative|fixed; 属性的父元素)
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/Image/blob/master/_Drag.gif)</br></br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; padding:0; margin:0;}
    #Box {width:60%; height:60%; min-width:300px; min-height:200px; background:gray; position:absolute; left:20%; top:15%;}
    #dragBox_1 {width:30%; height:30%; background:salmon; position:absolute; left:20%; top:20%; z-index:10;}
    #dragBtn {width:30%; height:30%; background:black; cursor:pointer; text-align:center; color:white; position:absolute; right:0; top:0;}
    #dragBox_2 {width:20%; height:10%; background:yellow; cursor:pointer; position:absolute; left:0; bottom:0;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
<body>
    <div id="Box">
        <div id="dragBox_1">
            <div id="dragBtn">拖 我</div>
        </div>
        <div id="dragBox_2"></div>
    </div>
</body>
</html>

<script>
_(dragBtn).setH(dragBtn, {fontSize:.5, lineHeight:1});　　//　div#dragBtn的字体行高根据div#dragBtn的高度变化

_Drag({
    mousedownBox:_(dragBtn),　　//　被鼠标左键按下后发生拖拽的选择器(即触发器)
    dragBox:_(dragBox_1)　　//　被拖拽主体的选择器
});

_Drag({
    mousedownBox:_(dragBox_2),　　//　被鼠标左键按下后发生拖拽的选择器(即触发器)
    dragBox:_(dragBox_2),　　//　被拖拽主体的选择器
    axis:'x'　　//　被拖拽元素沿哪个轴运动
});
</script>
```
# _showInputImg()
　　　***`将文本域表单所选择的图片按比例显示到指定的元素上`***
#
基本用法API :
```javascript
_showInputImg({　　　//　按比例显示文本域图片插件
    frame:_('#box', 0),　　　//　<input type="file">表单的选择器　　selector
    imgBox:_('.box', 0),　　　//　显示图片的容器的选择器　　selector
    isNotImg:function(){　　　//　如果所选的不是图片类型的文件的回调函数[可选]　　function　　默认为null
        //todo...
    }
});

***注: 显示图片的容器的选择器(即imgBox)所选的元素必须设置 position:absolute|relative|fixed; 否则无法正确显示图片
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/Image/blob/master/_showInputImg.gif)</br></br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; padding:0; margin:0;}
    #inputId {position:absolute; left:50px; top:30px;}
    #imgBoxId {width:20%; height:20%; border:1px solid black; border-radius:15px; overflow:hidden; position:absolute; left:50px; top:80px;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
<body>
    <input type="file" id="inputId">
    <div id="imgBoxId"></div>
</body>
</html>

<script>
_showInputImg({
    frame:_(inputId),　　//　<input type="file">表单的选择器
    imgBox:_(imgBoxId),　　//　显示图片的容器的选择器
    isNotImg:function(){　　//　如果所选的不是图片类型的文件的回调函数
        alert('丫的, 这货不是图片!')
    }
});
</script>
```
# _showingImg()
　　　***`按比例将图片显示到指定元素上`***
#
基本用法API :
```javascript
_showingImg(imgBox, url);

    参数 :  imgBox :       图片容器选择器　　selector
            url :          图片路径　　path
***注: 显示图片的容器的选择器(即imgBox)所选的元素必须设置 position:absolute|relative|fixed; 否则无法正确显示图片
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/Image/blob/master/_showingImg.gif)</br></br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; background:#C0C0C0; padding:0; margin:0;}
    #btn1 {width:100px; margin-left:30px; margin-top:20px;}
    #btn2 {width:100px; margin-left:20px;}
    #btn3 {width:100px; margin-left:20px;}
    #imgBox {width:30%; height:35%; border:1px solid #FF8000; border-radius:10px; position:relative; left:30px; top:20px;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
<body>
    <button id="btn1">图 1</button>
    <button id="btn2">图 2</button>
    <button id="btn3">图 3</button>

    <div id="imgBox"></div>    <!--图片容器-->
</body>
</html>

<script>
btn1.onclick = function(){
    _showingImg(_(imgBox), 'https://github.com/ModernFarmer/Image/blob/master/img1_showingImg.gif');
};

btn2.onclick = function(){
    _showingImg(_(imgBox), 'https://github.com/ModernFarmer/Image/blob/master/img2_showingImg.gif');
};

btn3.onclick = function(){
    _showingImg(_(imgBox), 'https://github.com/ModernFarmer/Image/blob/master/img3_showingImg.gif');
};
</script>
```
# _clickCopy()
　　　***`通过点击拷贝一个元素内的内容`***
#
基本用法API :
```javascript
_clickCopy(entry, target, method);

    参数 :  entry :       被点击的元素　　         selector
            target :      被拷贝内容的元素[可选]　　selector  如果不写该参数则默认为和entry参数一样
            method :      拷贝方法[可选]　　       ['textContent'|'innerHTML'|'outerHTML']   如果不写或者写错则默认为 'textContent'
              *注:* entry参数的元素绝对不能是<button></button>和<input type="button">, 因为这两个元素的点击事件只能追踪到 '有选中内容的复制'
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/Image/blob/master/_clickCopy.gif)</br></br>
基础效果源代码 :
```javascript
<style>
    #div1,#div2,#div3,#btn {width:200px; line-height:30px; text-align:center; border:1px solid gray; border-radius:5px; margin-top:30px; margin-left:100px; cursor:pointer; background:#FAFFEB;}
    #div3 {cursor:default; background:white;}
    #btn {color:#FFF8E4; background:#505050;}
    .textDiv {width:500px; height:300px; resize:none; border-radius:5px; position:absolute; left:400px; top:30px;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
<body>
    <div id="div1">Oh! How do you do!</div>
    <div id="div2">
        I'm good!
        </br>
        <span>Very good!</span>
    </div>
    <div id="div3">我是div3的文字</div>
    <div id="btn">点我复制div3的文字</div>

    <textarea class="textDiv"></textarea>
</body>
</html>

<script>
_clickCopy('#div1');
_clickCopy(div2, div2, 'outerHTML');
_clickCopy(btn, div3);
</script>
```
