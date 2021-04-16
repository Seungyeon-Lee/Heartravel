<template>
  <div class="footer">
    <div class="col_black"><b>HERATRAVEL</b></div>
    <p>LEE SEUNGA | LEE EUN SOL</p>
    <p>사업자번호 (하트래블)</p>
    <p>ACCOUNT NUMBER : WOORI 1005 303 304033 (하트래블)</p>
  </div>
</template>

<script>
  export default {
    name: 'TheFooter',
    mounted() {

    }
  }
</script>

<style>
  .footer{
    width: 100%;
    bottom: 0;
    background-color: #fff;
    text-align: center;
    font-size: 11px;
    color: #707070;
    padding: 60px 0;
    font-weight: 500;
    font-family: 'Roboto', sans-serif;
  }
  .footer p{
    font-size: 10px;
    margin: 2px 0 0 0;
    font-weight: 500;
  }
</style>
