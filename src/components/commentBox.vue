<template>
  <div class="diskaform">
    <ol>
      <li>
        <article>
          <div class="diskameta">
            <div class="author">
						<span class="diskathumb">
							<img :src="useravatar" alt="author"/>
						</span>
              <span class="diskaauthorname">{{username}}</span>
              <a href="#" class="diskadate">{{commenttime}}</a>
            </div>
          </div>
          <div class="diskanumber">{{number}}L</div>
          <div class="diskacontent">
            {{commentcontent}}
          </div>
        </article>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "commentBox",
  props:['useravatar','commentcontent','commenttime','username','number']
}
</script>

<style scoped>
.diskaform ol{
  clear: both;
  overflow: hidden;
  margin:0 auto;
  padding:0;
  width: 90%;
}
.diskaform ol li, .diskameta .diskathumb {
  background-color: #FFFFFF;
  border: 1px solid #dfdfdf;
  list-style: none outside none;
  margin: 0 0 20px 35px;
  padding: 4px;
}
.diskaform article {
  position: relative;
}
.diskameta {
  background: none repeat scroll 0 0 #c9c9c9;
  height: auto;
  line-height: 37px;
  min-height: 37px;
  padding-left: 10px;
  position: relative;
}
.diskameta .diskathumb {
  display: block;
  left: -40px;
  margin: 0;
  position: absolute;
  top: 50px;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
}

.diskameta .diskathumb img {
  display: block;
  cursor:pointer;
  height: 50px;
  max-width: 100%;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
}

.diskameta .diskathumb img:hover{
  opacity: .7;
  transform:scale(1.2);
  -ms-transform:scale(1.2); /* IE 9 */
  -moz-transform:scale(1.2); /* Firefox */
  -webkit-transform:scale(1.2); /* Safari and Chrome */
  -o-transform:scale(1.2); /* Opera */
  -webkit-transition: 0.5s;
  -moz-transition: 0.5s;
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  transition: 0.5s;
}

.diskaauthorname {
  float: left;
  color: #333333;
  font-size: 16px;
  font-weight: 700;
  line-height: 37px;
}

.diskadate {
  display: inline;
  float: right;
  font-size: 12px;
  margin-right: 10px;
  text-transform: uppercase;
}

.diskadate:hover{ background:none !important;}

.diskanumber {
  bottom: 23px;
  color:#c9c9c9;
  font-size: 36px;
  line-height: 36px;
  position: absolute;
  right: 10px;
}

.diskacontent{
  font-size: 0.95em;
  line-height: 1.5;
  padding: 20px 55px 30px 45px;
  position: relative;
  color:#333333;
}

.diskareply a {
  bottom: 3px;
  display: block;
  font-size: 12px;
  position: absolute;
  right: 12px;
  text-transform: uppercase;
}

.diskareply a:hover{
  background:none !important;
}



</style>