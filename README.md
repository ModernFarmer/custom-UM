**`>>>  custom-UM 基于 UM库, 在引入 custom-UM 之前必须先引入 UM库  <<<`**</br></br></br>
# _MovingScroll()
　　　**自定义滚动条 及 自定义锚记导航**
#
基本用法API :
```javascript
_MovingScroll({　　　//滚动条插件    参数：json
    box:_('.box', 0),                   //容器盒子选择器　　element　　容器盒子不能加任何border、padding和margin相关的任何样式，如有需要可在容器盒子再套一个div来添加样式
    contentBox:_('.content', 0),　　　//滚动内容盒子选择器　　element
    scrollBox:_('.scroll', 0),　　　//滚动条盒子选择器　　element
    speed:50,　　　//滚动速度　　number
    position:[　　　//锚记定位　　array　　*数组内是各个json对象[json, json, ...]，json内是{clickObj:锚记链接元素，targetObj:锚记书签元素}
　　　　　　　　　　　//可选项,  默认null
        {clickObj:_('.c1', 0), targetObj:_('.t1', 0)},
        {clickObj:_('.c2', 0), targetObj:_('.t2', 0)},
        {clickObj:_('.c3', 0), targetObj:_('.t3', 0)},
        {clickObj:_('.c4', 0), targetObj:_('.t4', 0)},
        {clickObj:_('.c5', 0), targetObj:_('.t5', 0)},
        ...
    ],
    watch_keyup:false,　　　//当页面上按键抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false
    watch_mouseup:false,　　　//当页面上鼠标抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false
    watch_el:{　　　//当点击某个h5元素时, 执行滚动条高度自动变化,可选项,默认false (主要用于配合下拉插件, 点击下拉的caption元素时, 延时执行滚动条变化, 由于caption元素已经阻止了冒泡, 故而增加该选项)
        el:_('.element', 0),　　　//被点击的元素
        timeout:1000　　　//执行延时
    }
});
```
基础效果 :</br>
![image](https://github.com/ModernFarmer/custom-UM/blob/master/image/_MovingScroll.gif)
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
