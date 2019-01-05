<template>
    <div>
        我要去使用轮播图<br/><br/><br/>
        <!-- <my-slot>
            <h3>让我轮播吧</h3>
        </my-slot> -->

        <!-- <my-slot>
            <img width="300" height="300" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545825385938&di=35abbe794f271e1b791e4ca28ef4d6f7&imgtype=0&src=http%3A%2F%2Fimgcache.cjmx.com%2FComment%2F201605%2F20160513150402503.jpg" alt="">
        </my-slot> -->

        <my-button>提交</my-button>
    </div>
</template>

<script>
    import mySlot from './slot'

    import myButton from './slot-button'

    export default {
        components:{
            mySlot,
            myButton
        }
    }
</script>