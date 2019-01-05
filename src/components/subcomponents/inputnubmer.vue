<template>
    <div>
        <div @click="substrict" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
    </div>
</template>

<style scoped>
    .left,.middle,.right{
        display: inline-block;
        height: 30px;
        width:30px;
        border: 1px solid rgba(92,92,92,0.3);
        line-height: 30px;
        text-align: center;
    }
</style>

<script>
    export default {
        data(){
            return {
                count:1
            }
        },
        props:{
            initCount:Number,
            goodsId:Number
        },
        created() {
            this.count = this.initCount
        },
        methods:{
            substrict(){
                if(this.count<=1) return

                this.count--

                this.nofity()
            },
            add(){
                this.count++

                this.nofity()
            },
            nofity(){
                // 子组件传值给父组件
                this.$emit('countChange',{
                    goodsId:this.goodsId,
                    count:this.count
                })
            }
        }
    }
</script>