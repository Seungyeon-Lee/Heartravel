<template>
  <div class="footer">
    <div class="col_black"><b>SHOPPING MALL</b></div>
    <p>LEE SEUNG YEON | LEE HAE EUN | JOO SE IN </p>
    <p>BUSINESS LICENSE <br>: 000-00-00000</p>
    <p>ACCOUNT NUMBER <br>: WOORI 1234 567 891011 (ZZIBU) </p>
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
