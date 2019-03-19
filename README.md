**`>>>  custom-UM 基于 UM库, 在引入 custom-UM 之前必须先引入 UM库  <<<`**</br></br></br>
# _MovingScroll()
　　　***`自定义滚动条 及 自定义锚记导航插件`***
#
基本用法API :
```javascript
_MovingScroll({　　　//　滚动条插件    参数：json
    box:_('.box', 0),                   //　容器盒子选择器　　selector　　容器盒子不能加任何border、padding和margin相关的任何样式，如有需要可在容器盒子再套一个div来添加样式
    contentBox:_('.content', 0),　　　//　滚动内容盒子选择器　　selector
    scrollBox:_('.scroll', 0),　　　//　滚动条盒子选择器　　selector
    speed:50,　　　//　滚动速度　　number
    position:[　　　//　锚记定位　　array　　*数组内是各个json对象[json, json, ...]，json内是{clickObj:锚记链接元素，targetObj:锚记书签元素}
　　　　　　　　　　　//　可选项,  默认null
        {clickObj:_('.c1', 0), targetObj:_('.t1', 0)},
        {clickObj:_('.c2', 0), targetObj:_('.t2', 0)},
        {clickObj:_('.c3', 0), targetObj:_('.t3', 0)},
        {clickObj:_('.c4', 0), targetObj:_('.t4', 0)},
        {clickObj:_('.c5', 0), targetObj:_('.t5', 0)},
        ...
    ],
    watch_keyup:false,　　　//　当页面上按键抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false　　boolean
    watch_mouseup:false,　　　//　当页面上鼠标抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false　　boolean
    watch_el:{　　　//　当点击某个h5元素时, 执行滚动条高度自动变化,可选项,默认false (主要用于配合下拉插件, 点击下拉的caption元素时, 延时执行滚动条变化, 由于caption元素已经阻止了冒泡, 故而增加该选项)　　json
        el:_('.selector', 0),　　　//　被点击的元素　　selector
        timeout:1000　　　//　执行延时　　number
    }
});
```
基础效果 :</br>
![image](https://github.com/ModernFarmer/custom-UM/blob/master/image/_MovingScroll.gif)</br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; padding:0; margin:0;}
    #box {width:60%; height:60%; overflow:hidden; background:gray; position:absolute; left:20%; top:20%;}
    #scrollBox {width:2%; height:0; background:#3D3D3D; border-radius:5px; cursor:pointer; position:absolute; right:.5%; top:0; z-index:10;}
    #listBox {width:25%; height:100%; background:#3D3D3D; position:absolute; left:0; top:0;}
    #contentBox {width:75%; position:absolute; right:0; top:0;}
    .listText {width:100%; text-align:center; line-height:40px; color:white; cursor:pointer;}
    .listText:hover {background:#020202;}
    .moduleName {font-size:26px; font-weight:900; line-height:50px;}
    .moduleContent {width:90%; height:150px; background:#DDDDDD; position:relative; left:5%;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
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
</html>

<script>
_MovingScroll({
    box:_(box),　　//　容器盒子选择器
    contentBox:_(contentBox),　　//　滚动内容盒子选择器
    scrollBox:_(scrollBox),　　//　滚动条盒子选择器
    speed:150,　　//　滚动速度
    position:[　　//　锚记定位
        {clickObj:_('.title1', 0), targetObj:_('.option1', 0)},
        {clickObj:_('.title2', 0), targetObj:_('.option2', 0)},
        {clickObj:_('.title3', 0), targetObj:_('.option3', 0)},
        {clickObj:_('.title4', 0), targetObj:_('.option4', 0)},
        {clickObj:_('.title5', 0), targetObj:_('.option5', 0)},
        {clickObj:_('.title6', 0), targetObj:_('.option6', 0)},
        {clickObj:_('.title7', 0), targetObj:_('.option7', 0)},
        {clickObj:_('.title8', 0), targetObj:_('.option8', 0)},
        {clickObj:_('.title9', 0), targetObj:_('.option9', 0)},
        {clickObj:_('.title10', 0), targetObj:_('.option10', 0)}
    ]
});
</script>
```
# _PullDown()
　　　***`下拉选择框插件`***
#
基本用法API :
```javascript
_PullDown({　　　//　下拉选择框插件  参数：json
    caption:_('.caption', 0),　　　//　标题选择器　　selector
    down:_('.down', 0),　　　//　下拉内容选择器　　selector
    speed:1,　　　//　速度(在几秒内完成过渡)　　number　[可选, 默认0.5]
    now:false,　　　//　下拉内容初始状态(false隐藏或者true显示)　　boolean　[可选, 默认false]
    select:false,　　　//　点击下拉框是否隐藏下拉框(false隐藏或者true不隐藏)　　boolean　[可选, 默认false]
    D_click:false,　　　//　点击背景是否隐藏下拉框(false隐藏或者true不隐藏)　　boolean　[可选，默认false]
    choosable:false　　　//　标题选择器内的文字是否可被选中(false不可被选中)　　boolean　[可选, 默认false]
});
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/custom-UM/blob/master/image/_PullDown.gif)</br></br>
基础效果源代码 :
```javascript
<style>
    html, body {width:100%; height:100%; padding:0; margin:0;}
    #titleBtn {width:200px; height:40px; line-height:40px; text-align:center; cursor:pointer; border:1px solid #0000FF; border-radius:10px; position:absolute; left:20%; top:10%;}
    #contentBox {width:250px; border:1px solid #FF8000; border-radius:10px; position:absolute; left:20%; top:calc(10% + 50px);}
    .listOpt {width:85%; height:30px; line-height:30px; border:1px solid gray; border-radius:5px; margin-left:5%; margin-top:5px;}
    .listOpt_last {margin-bottom:5px;}
</style>

<script src="UM-1.0.0.js"></script>
<script src="custom-UM-1.0.0.js"></script>

<html>
<div id="titleBtn">_PullDown</div>　　　<!--标题div-->
<div id="contentBox">　　　<!--下拉内容div-->
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option1</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option2</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option3</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option4</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option5</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option6</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option7</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option8</div>
    <div class="listOpt">&nbsp;&nbsp;&nbsp;&nbsp;option9</div>
    <div class="listOpt listOpt_last">&nbsp;&nbsp;&nbsp;&nbsp;option10</div>
</div>
</html>

<script>
_PullDown({
    caption:_(titleBtn),　　　//　标题选择器　　selector
    down:_(contentBox),　　　//　下拉内容选择器　　selector
    speed:.5　　　//　速度(在几秒内完成过渡)
});
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
![image](https://github.com/ModernFarmer/custom-UM/blob/master/image/_PullLeft.gif)</br></br>
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
![image](https://github.com/ModernFarmer/custom-UM/blob/master/image/_Drag.gif)</br></br>
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
<div id="Box">
    <div id="dragBox_1">
        <div id="dragBtn">拖 我</div>
    </div>
    <div id="dragBox_2"></div>
</div>
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
    frame:_('#box', 0),　　　//　<input type="file">表单的选择器
    imgBox:_('.box', 0),　　　//　显示图片的容器的选择器
    isNotImg:function(){　　　//　如果所选的不是图片类型的文件的回调函数[可选]　　默认为null
        //todo...
    }
});
```
基础效果 :</br></br>
![image](https://github.com/ModernFarmer/custom-UM/blob/master/image/_showInputImg.gif)</br></br>
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
<input type="file" id="inputId">
<div id="imgBoxId"></div>
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
