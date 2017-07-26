<template>
  <ul class="mytooltip-wrapper">
    <li>
      <span class="mytooltip mytooltip-top"
      :data-mytooltip="text">
      <slot></slot>
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'tooltip',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

.mytooltip-wrapper {
	padding: initial !important;
  line-height: initial !important;
  margin: initial !important;
	/*padding: 160px 0;*/
	/*text-align: center;*/
}
.mytooltip-wrapper li {
	list-style: none;
	/*display: inline-block;*/
	/*margin: 0 10px;*/
}
.mytooltip-wrapper li a {
	/*color: #fff;*/
	/*text-decoration: none;*/
}

/**
 * Tooltips
 */

.mytooltip {
	position: relative;
}
.mytooltip:after {
	position: absolute;
	padding: 8px;
	border: 3px solid #d1d1d1;
	border-radius: 8px;
	background-color: #f8f8f8;
	font-size: .9em;
	font-weight: bold;
	color: #000;
	content: attr(data-mytooltip);
	min-width: 80px;
	width: 320px;
	// width: -moz-max-content;
	// width: -webkit-max-content;
	opacity: 0;
	transition: all .2s ease-in-out .25s;
	visibility: hidden;
	z-index: 2;
  text-align: center;
}
.mytooltip:hover:after {
	opacity: 1;
	visibility: visible;
}

/*Tooltip starting positions*/

.mytooltip-top:after {
	bottom: 150%;
	left: 0;
}
.mytooltip-bottom:after {
	top: 155%;
	left: 0;
}
.mytooltip-left:after {
	right: 130%;
	min-width: 100px;
}
.mytooltip-right:after {
	left: 130%;
	min-width: 100px;
}

/*Tooltip final positions*/

.mytooltip-top:hover:after {
	bottom: 120%;
}
.mytooltip-bottom:hover:after {
	top: 125%;
}
.mytooltip-left:hover:after {
	right: 110%;
}
.mytooltip-right:hover:after {
	left: 110%;
}

/**
 * Triangles
 */

.mytooltip-top:before,
.mytooltip-bottom:before,
.mytooltip-left:before,
.mytooltip-right:before {
	content: "";
	display: block;
	position: absolute;
	border-width: 7px;
	border-style: solid;
	border-color: rgba(0, 0, 0, 0);
	opacity: 0;
	transition: all .2s ease-in-out .25s;
	visibility: hidden;
}
.mytooltip-top:hover:before,
.mytooltip-bottom:hover:before,
.mytooltip-left:hover:before,
.mytooltip-right:hover:before {
	opacity: 1;
	visibility: visible;
}

/*Triangle starter positions*/

.mytooltip-top:before {
	top: -51%;
	left: 50%;
	transform: translateX(-50%);
	border-top-color: #fff;
}
.mytooltip-bottom:before {
	bottom: -56%;
	left: 50%;
	transform: translateX(-50%);
	border-bottom-color: #fff;
}
.mytooltip-left:before {
	left: -31%;
	top: 15%;
	border-left-color: #fff;
}
.mytooltip-right:before {
	right: -31%;
	top: 15%;
	border-right-color: #fff;
}

/* Triangle final positions */

.mytooltip-top:hover:before {
	top: -21%;
}
.mytooltip-bottom:hover:before {
	bottom: -26%;
}
.mytooltip-left:hover:before {
	left: -11%;
}
.mytooltip-right:hover:before {
	right: -11%;
}

</style>
