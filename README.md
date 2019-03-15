**`>>>  custom-UM 基于 UM库, 在引入 custom-UM 之前必须先引入 UM库  <<<`**</br>
# _MovingScroll()
　　　**自定义滚动条 及 自定义锚记导航**
#
基本用法API :</br>
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
　　　　{clickObj:_('.c5', 0), targetObj:_('.t5', 0)}
　　],
　　watch_keyup:false,　　　//当页面上按键抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false
　　watch_mouseup:false,　　　//当页面上鼠标抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false
　　watch_el:{　　　//当点击某个h5元素时, 执行滚动条高度自动变化,可选项,默认false (主要用于配合下拉插件, 点击下拉的caption元素时, 延时执行滚动条变化, 由于caption元素已经阻止了冒泡, 故而增加该选项)
　　　　el:_('.element', 0),　　　//被点击的元素
　　　　timeout:1000　　　//执行延时
　　}
});
```
