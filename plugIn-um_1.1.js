function _MovingScroll(obj){                          //滚动条插件
    let UM_MovingScroll={
        box:obj.box,                            
        contentBox:obj.contentBox,           
        scrollBox:obj.scrollBox,            
        speed:obj.speed,
        position:obj.position || null,
        watch_keyup:obj.watch_keyup || false,                    
        height_box(){
            return parseInt(this.box.getStyle('height'));
        },
        height_content(){
            return parseInt(this.contentBox.el.offsetHeight);
        },
        height_scroll(){
            return this.height_content()<=this.height_box()?0:Math.ceil((this.height_box()/this.height_content())*this.height_box());
        }
    }; 
    UM_MovingScroll.contentBox.transition('.5s ease-out');
    setTimeout(function(){
        UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'cursor':'pointer'});       //初始化滚动条高度，必要时需要加定时器
    },500);        
    UM_MovingScroll.box.mousewheel(function(){
        //滚动条跟着内容box走 ↓↓↓
        let top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) + UM_MovingScroll.speed;
        if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
        if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
        UM_MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
        let top_scrollBox=-Math.ceil(top_contentBox / UM_MovingScroll.height_box() * UM_MovingScroll.height_scroll());
        UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});

        //内容box跟着滚动条走 ↓↓↓
/*        let top_scrollBox=parseInt(UM_MovingScroll.scrollBox.getStyle('top')) - UM_MovingScroll.speed;
        if(top_scrollBox<0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_scrollBox=0;
        UM_MovingScroll.scrollBox.transition('.1s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        let top_contentBox=-Math.ceil(top_scrollBox / UM_MovingScroll.height_scroll() * UM_MovingScroll.height_box());
        UM_MovingScroll.contentBox.transition('.5s ease-out').css('top', top_contentBox+'px');*/
    }, function(){
        //滚动条跟着内容box走 ↓↓↓
        let top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) - UM_MovingScroll.speed;
        if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box()))top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
        if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
        UM_MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
        let top_scrollBox=-Math.ceil(top_contentBox / UM_MovingScroll.height_box() * UM_MovingScroll.height_scroll());
        UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});

        //内容box跟着滚动条走 ↓↓↓
/*        let top_scrollBox=parseInt(UM_MovingScroll.scrollBox.getStyle('top')) + UM_MovingScroll.speed;
        if(top_scrollBox>(UM_MovingScroll.height_box()-UM_MovingScroll.height_scroll()))top_scrollBox=UM_MovingScroll.height_box()-UM_MovingScroll.height_scroll();
        if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_scrollBox=0;
        UM_MovingScroll.scrollBox.transition('.1s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        let top_contentBox=-Math.ceil(top_scrollBox / UM_MovingScroll.height_scroll() * UM_MovingScroll.height_box());
        UM_MovingScroll.contentBox.transition('.5s ease-out').css('top', top_contentBox+'px');*/
    });
    UM_MovingScroll.box.BD({mouseenter(){
        UM_MovingScroll.scrollBox.transition('1s ease-out').css('opacity', 1);
    }, mouseleave(){
        UM_MovingScroll.scrollBox.transition('1s ease-out').css('opacity', .3);
    },click(){                                    //默认当点击容器盒子时，执行滚动条盒子的高度自动变化
        setTimeout(function() {
            let top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top'));
            if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box()){
                top_contentBox=0;
            }else if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())){
                top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
            }
            if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
            UM_MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
            let top_scrollBox=-Math.ceil(top_contentBox / UM_MovingScroll.height_box() * UM_MovingScroll.height_scroll());
            UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
        }, 500);
    }});
    if(obj.watch_keyup===true){                  //当页面上按键抬起时，是否执行滚动条盒子的高度自动变化，根据需要添加该选项
        _(document).BD('keyup', function(){         
            setTimeout(function() {
                let top_contentBox=parseInt(UM_MovingScroll.contentBox.getStyle('top')) + UM_MovingScroll.speed;
                if(top_contentBox>0 || UM_MovingScroll.height_content()<UM_MovingScroll.height_box()){
                    top_contentBox=0;
                }else if(top_contentBox<-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())){
                    top_contentBox=-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box());
                }
                if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())top_contentBox=0;
                UM_MovingScroll.contentBox.transition('.1s ease-out').css('top', top_contentBox+'px');
                let top_scrollBox=-Math.ceil(top_contentBox / UM_MovingScroll.height_box() * UM_MovingScroll.height_scroll());
                UM_MovingScroll.scrollBox.transition('.5s ease-out').css({'height':UM_MovingScroll.height_scroll()+'px', 'top':top_scrollBox+'px'});
            }, 500);        
        })        
    }
    UM_MovingScroll.scrollBox.BD('mousedown', function(event){
        _stopPropagation(event);
        _preventDefault(event);
        let cursor=getClient(event).y;
        let L=cursor-parseInt(UM_MovingScroll.scrollBox.getStyle('top'));
        let runner=function(event){
            let cursor=getClient(event).y;
            let s=cursor-L;
            if(s<0)s=0;
            if(s>parseInt(UM_MovingScroll.box.getStyle('height'))-parseInt(UM_MovingScroll.scrollBox.getStyle('height')))s=parseInt(UM_MovingScroll.box.getStyle('height'))-parseInt(UM_MovingScroll.scrollBox.getStyle('height'));
            let S=Math.floor(-s*parseInt(UM_MovingScroll.box.getStyle('height'))/parseInt(UM_MovingScroll.scrollBox.getStyle('height')));
            UM_MovingScroll.scrollBox.transition('').css('top', s+'px');
            UM_MovingScroll.contentBox.transition('').css('top', S+'px');
        };
        let stopRun=function(){
            _(document).unBD({mousemove:runner, mouseup:stopRun});
        };
        _(document).BD('mousemove', runner);
        _(document).BD('mouseup', stopRun); 
    });
    if(isArray(UM_MovingScroll.position) && UM_MovingScroll.position.length>0){
        for(let i=0; i<UM_MovingScroll.position.length; i++){
            UM_MovingScroll.position[i].clickObj.el.setAttribute('UM_MovingScrollPlugIn', i);
            UM_MovingScroll.position[i].clickObj.BD('click', function(){
                let mark= UM_MovingScroll.position[this.getAttribute('UM_MovingScrollPlugIn')].targetObj.el.offsetTop>(UM_MovingScroll.height_content()-UM_MovingScroll.height_box())?-(UM_MovingScroll.height_content()-UM_MovingScroll.height_box()):-(UM_MovingScroll.position[this.getAttribute('UM_MovingScrollPlugIn')].targetObj.el.offsetTop);
                if(UM_MovingScroll.height_content()<UM_MovingScroll.height_box())mark=0;
                UM_MovingScroll.contentBox.transition('.5s ease-out').css('top', mark+'px');
                UM_MovingScroll.scrollBox.transition('.5s ease-out').css('top', Math.ceil(-mark*UM_MovingScroll.height_scroll()/UM_MovingScroll.height_box())+'px');
            })
        };
    }
};

/*_MovingScroll({                          //滚动条插件    参数：json
    box:_('.box', 0),                   //容器盒子选择器  element       容器盒子不能加任何border、padding和margin相关的任何样式，如有需要可在容器盒子再套一个div来添加样式
    contentBox:_('.content', 0),        //滚动内容盒子选择器  element
    scrollBox:_('.scroll', 0),          //滚动条盒子选择器  element     滚动条盒子不能加任何border、padding和margin相关的任何样式
    speed:50,                           //滚动速度  number 
    position:[                          //锚记定位  array   *数组内是各个json对象[json, json, ...]，json内是{clickObj:锚记链接元素，targetObj:锚记书签元素}
                                        //可选项,  默认null
        {clickObj:_('.c1', 0), targetObj:_('.t1', 0)},
        {clickObj:_('.c2', 0), targetObj:_('.t2', 0)},
        {clickObj:_('.c3', 0), targetObj:_('.t3', 0)},
        {clickObj:_('.c4', 0), targetObj:_('.t4', 0)},
        {clickObj:_('.c5', 0), targetObj:_('.t5', 0)}
    ],
    watch_keyup:false                  //当页面上按键抬起时,是否执行滚动条盒子的高度自动变化,可选项,默认false       
});*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _PullDown(obj){                           //下拉内容过渡插件
    let UM_PullDown={
        caption:obj.caption,
        down:obj.down,
        speed:obj.speed || 0.5,
        now:obj.now || false,
        select:obj.select || false,
        D_click:obj.D_click || false,
        choosable:obj.choosable || false,
        height(){
            let result=0;
            for(let i=0; i<UM_PullDown.down.el.children.length; i++){
                result+=UM_PullDown.down.el.children[i].offsetHeight;
            };
            return result+'px';
        },
        padding_top(){
            return this.down.getStyle('paddingTop');
        },
        padding_bottom(){
            return this.down.getStyle('paddingBottom');
        },
        margin_top(){
            return this.down.getStyle('marginTop');
        },
        margin_bottom(){
            return this.down.getStyle('marginBottom');
        }
    };

    let top_p=UM_PullDown.padding_top();
    let bottom_p=UM_PullDown.padding_bottom();
    let top_m=UM_PullDown.margin_top();
    let bottom_m=UM_PullDown.margin_bottom();

    if(UM_PullDown.now===true)UM_PullDown.down.css({opacity:1, height:UM_PullDown.height(), overflow:'hidden'});
    if(UM_PullDown.now===false)UM_PullDown.down.css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0, overflow:'hidden'});
    if(UM_PullDown.choosable===false)UM_PullDown.caption.choosable(false);
    UM_PullDown.caption.css('cursor', 'pointer');
    UM_PullDown.caption.BD('click', function(event){
        _stopPropagation(event);
        if(UM_PullDown.now===false){
            UM_PullDown.down.transition(UM_PullDown.speed+'s ease', 'center top').css({opacity:1, height:UM_PullDown.height(), paddingTop:top_p, paddingBottom:bottom_p, marginTop:top_m, marginBottom:bottom_m});
        }else{
            UM_PullDown.down.transition(UM_PullDown.speed+'s ease', 'center top').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
        };
        UM_PullDown.now=!UM_PullDown.now;
    });
    if(UM_PullDown.D_click===false){
        _(document).BD('click', function(){
            UM_PullDown.down.transition(UM_PullDown.speed+'s ease', 'center top').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            UM_PullDown.now=false;
        });
    }
    if(UM_PullDown.select===false){
        UM_PullDown.down.BD('click', function(event){
            _stopPropagation(event);
            UM_PullDown.down.transition(UM_PullDown.speed+'s ease', 'center top').css({opacity:0, height:0, paddingTop:0, paddingBottom:0, marginTop:0, marginBottom:0});
            UM_PullDown.now=false;
        })
    }  
};

/*_PullDown({                               //下拉内容过渡插件  参数：json
    caption:_('.caption', 0),             //标题选择器                                         element
    down:_('.down', 0),                   //下拉内容选择器                                     element
    speed:1,                              //速度(在几秒内完成过渡)                             number      [可选, 默认0.5]
    now:false,                            //下拉内容初始状态(false隐藏或者true显示)            boolean     [可选, 默认false]
    select:false,                         //点击下拉框是否隐藏下拉框(false隐藏或者true不隐藏)  boolean     [可选, 默认false]
    D_click:false,                        //点击背景是否隐藏下拉框(false隐藏或者true不隐藏)    boolean     [可选，默认false]
    choosable:false                       //标题选择器内的文字是否可被选中(false不可被选中)    boolean     [可选, 默认false]
});*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _PullLeft(obj){                           //左拉内容过渡插件
    let UM_PullLeft={
        caption:obj.caption,
        left:obj.left,
        speed:obj.speed || 0.5,
        now:obj.now || false,
        select:obj.select || false,
        D_click:obj.D_click || true,
        choosable:obj.choosable || false,
        width(){
            let result=0;
            for(let i=0; i<UM_PullDown.down.el.children.length; i++){
                result+=UM_PullDown.down.el.children[i].offsetWidth;
            };
            return result+'px';
        },
        padding_left(){
            return this.left.getStyle('paddingLeft');
        },
        padding_right(){
            return this.left.getStyle('paddingRight');
        },
        margin_left(){
            return this.left.getStyle('marginLeft');
        },
        margin_right(){
            return this.left.getStyle('marginRight');
        }
    };
    let left_p=UM_PullLeft.padding_left();
    let right_p=UM_PullLeft.padding_right();
    let left_m=UM_PullLeft.margin_left();
    let right_m=UM_PullLeft.margin_right();
    if(UM_PullLeft.now===true)UM_PullLeft.left.css({opacity:1, width:UM_PullLeft.width(), overflow:'hidden'});
    if(UM_PullLeft.now===false)UM_PullLeft.left.css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0, overflow:'hidden'});
    if(UM_PullLeft.choosable===false)UM_PullLeft.caption.choosable(false);
    UM_PullLeft.caption.css('cursor', 'pointer');
    UM_PullLeft.caption.BD('click', function(event){
        _stopPropagation(event);
        if(UM_PullLeft.now===false){
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s ease', 'left center').css({opacity:1, width:UM_PullLeft.width(), paddingLeft:left_p, paddingRight:right_p, marginLeft:left_m, marginRight:right_m});
        }else{
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s ease', 'left center').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
        }
        UM_PullLeft.now=!UM_PullLeft.now;
    });
    if(UM_PullLeft.D_click===true){
        _(document).BD('click', function(){
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s ease', 'left center').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            UM_PullLeft.now=false;
        });
    }
    if(UM_PullDown.select===true){
        UM_PullDown.down.BD('click', function(event){
            _stopPropagation(event);
            UM_PullLeft.left.transition(UM_PullLeft.speed+'s ease', 'left center').css({opacity:0, width:0, paddingLeft:0, paddingRight:0, marginLeft:0, marginRight:0});
            UM_PullLeft.now=false;
        })
    }   
};

/*_PullLeft({                               //左拉内容过渡插件  参数：json
    caption:_('.caption', 0),             //标题选择器                                         element
    left:_('.left', 0),                   //左拉内容选择器                                     element
    speed:1,                              //速度(在几秒内完成过渡)                             number      [可选, 默认0.5]
    now:false,                            //左拉内容初始状态(false隐藏或者true显示)            boolean     [可选, 默认false]
    select:false,                         //点击左拉框是否隐藏左拉框(false隐藏或者true不隐藏)  boolean     [可选, 默认false]
    D_click:false,                        //点击背景是否隐藏左拉框(false隐藏或者true不隐藏)    boolean     [可选，默认false]
    choosable:false                       //标题选择器内的文字是否可被选中(false不可被选中)    boolean     [可选, 默认false]
});*/

//-----------------------------------------------------------------------------------------------------------------------------------------------------------

function _Drag(obj){                        //拖拽插件
  let UM_Drag={
    mousedownBox:obj.mousedownBox,
    dragBox:obj.dragBox || obj.mousedownBox,
    parent:obj.parent || _('body', 0)
  };

  UM_Drag.mousedownBox.BD('mousedown', function(event){
    let Drag_S_left=getClient(event).x-UM_Drag.dragBox.el.offsetLeft;
    let Drag_S_top=getClient(event).y-UM_Drag.dragBox.el.offsetTop;

    let _mousemove=function(event){
      let Drag_left=getClient(event).x-Drag_S_left;
      let Drag_top=getClient(event).y-Drag_S_top;
      if(Drag_left<0){
        Drag_left=0;
      }else if(Drag_left>(UM_Drag.parent.el.offsetWidth-UM_Drag.dragBox.el.offsetWidth)){
        Drag_left=UM_Drag.parent.el.offsetWidth-UM_Drag.dragBox.el.offsetWidth;
      }
      if(Drag_top<0){
        Drag_top=0;
      }else if(Drag_top>(UM_Drag.parent.el.offsetHeight-UM_Drag.dragBox.el.offsetHeight)){
        Drag_top=UM_Drag.parent.el.offsetHeight-UM_Drag.dragBox.el.offsetHeight;
      }
      UM_Drag.dragBox.el.style.left=Drag_left+'px';
      UM_Drag.dragBox.el.style.top=Drag_top+'px';
    };

    let _mouseup=function(){
      _(document).unBD({mousemove:_mousemove, mouseup:_mouseup});
    };

    _(document).BD('mousemove', _mousemove);
    _(document).BD('mouseup', _mouseup);
  });
};

/*_Drag({               //拖拽插件，参数:json
  mousedownBox:_('.aaa', 0),                //被鼠标左键按下后发生拖拽的选择器      element
  dragBox:_('.box', 0),                     //被拖拽主体的选择器                    element       [可选, 默认为mousedownBox]
  parent:_('.bigbox', 0)                    //被拖拽元素的父级选择器                element       [可选, 默认为_('body',0)]
});*/